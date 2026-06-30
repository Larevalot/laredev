import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const apiKey = import.meta.env.RESEND_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!apiKey || apiKey === 're_YOUR_API_KEY_HERE') {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data: result, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['larevalot.studio@gmail.com'],
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6b7c3e; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return new Response(
        JSON.stringify({ error: error.message || 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: result?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Contact API error:', err.message || err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
