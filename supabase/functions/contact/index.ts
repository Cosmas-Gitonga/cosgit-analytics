import { createClient } from 'npm:@supabase/supabase-js@2.39.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { name, email, phone, subject, message, organization, projectType } = await req.json();

    // Store contact form submission
    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        { 
          name, 
          email, 
          phone, 
          subject, 
          message, 
          organization, 
          project_type: projectType 
        }
      ]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: 'Contact form submitted successfully' }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});