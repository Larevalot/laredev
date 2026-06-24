import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();
    
    const apiKey = import.meta.env.MIMO_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured on server' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://token-plan-sgp.xiaomimimo.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mimo-v2.5-pro',
        messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ error: errorData.error?.message || `API error: ${response.status}` }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
