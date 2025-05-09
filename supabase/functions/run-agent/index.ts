import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { OpenAI } from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get the JWT token
    const token = authHeader.replace('Bearer ', '');

    // Get the user from the token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) {
      throw new Error('Invalid token');
    }

    // Get request body
    const { agentId, input } = await req.json();

    // Get agent configuration
    const { data: agent, error: agentError } = await supabaseClient
      .from('ai_agents')
      .select('*')
      .eq('id', agentId)
      .single();

    if (agentError || !agent) {
      throw new Error('Agent not found');
    }

    // Create run record
    const { data: run, error: runError } = await supabaseClient
      .from('ai_agent_runs')
      .insert({
        agent_id: agentId,
        user_id: user.id,
        input,
        status: 'started'
      })
      .select()
      .single();

    if (runError || !run) {
      throw new Error('Failed to create run record');
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY')
    });

    // Prepare the system message based on agent type and capabilities
    const systemMessage = `You are a specialized AI agent for ${agent.type} tasks. 
Your capabilities include: ${agent.capabilities.join(', ')}. 
Use case: ${agent.use_case}`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: agent.settings.model || 'gpt-4',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: input }
      ],
      temperature: agent.settings.temperature || 0.7,
      max_tokens: agent.settings.maxTokens || 150,
      top_p: agent.settings.topP || 0.9
    });

    // Update run record with results
    const { error: updateError } = await supabaseClient
      .from('ai_agent_runs')
      .update({
        status: 'completed',
        output: completion.choices[0].message,
        completed_at: new Date().toISOString(),
        tokens_used: completion.usage?.total_tokens || 0
      })
      .eq('id', run.id);

    if (updateError) {
      throw new Error('Failed to update run record');
    }

    return new Response(
      JSON.stringify({
        success: true,
        output: completion.choices[0].message
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});