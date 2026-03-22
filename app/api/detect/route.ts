export const runtime = "nodejs"
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const image = body.image;

    const hfRes = await fetch(
      "https://aumfaldu-traffic-sign-recognition-backend.hf.space/api/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [image],
        }),
      }
    );

    const data = await hfRes.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Detection failed" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
