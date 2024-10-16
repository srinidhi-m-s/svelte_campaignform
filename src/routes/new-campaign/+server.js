/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();
  
    console.log('Campaign Submitted:', data);
  
    return new Response(JSON.stringify({ message: 'Form data received successfully!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  