export async function GET(request: Request) {
  if (process.env.VERCEL_ENV === "development") {
    return new Response(JSON.stringify({ env: process.env }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response("Not allowed in production", {
    status: 403,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
