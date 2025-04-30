import { SMTPClient } from "npm:nodemailer@6.9.8";

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

    const smtp = new SMTPClient({
      host: "mail.cosgitanalytics.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@cosgitanalytics.com",
        pass: "QtXnNCDWenF9qUvRA5hX"
      },
      tls: {
        rejectUnauthorized: false
      }
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

    const info = await smtp.sendMail({
      from: '"Cosgit Analytics Website" <info@cosgitanalytics.com>',
      to: "info@cosgitanalytics.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: emailContent,
      replyTo: email
    });

    console.log("Email sent:", info.messageId);

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
      JSON.stringify({ error: "Failed to send email. Please try again later." }), 
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});