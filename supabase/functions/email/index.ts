import { SmtpClient } from "npm:smtp-client@0.4.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      organization,
      projectType
    } = await req.json();

    const smtp = new SmtpClient({
      host: "mail.cosgitanalytics.com",
      port: 587,
      username: "info@cosgitanalytics.com",
      password: "QtXnNCDWenF9qUvRA5hX",
      tls: true,
    });

    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Organization: ${organization || 'N/A'}
Project Type: ${projectType}

Subject: ${subject}

Message:
${message}
    `;

    await smtp.connect();
    await smtp.send({
      from: "info@cosgitanalytics.com",
      to: "info@cosgitanalytics.com",
      subject: `New Contact Form Submission: ${subject}`,
      content: emailContent,
    });
    await smtp.close();

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }), 
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Email error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});