export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const image = body.image;

    // Use the /run/predict endpoint (most compatible for simple POST requests)
    const hfRes = await fetch(
      "https://aumfaldu-traffic-sign-recognition-backend.hf.space/run/predict",
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

    if (!hfRes.ok) {
      const errorText = await hfRes.text();
      console.error("HF Error:", errorText);
      return new Response(JSON.stringify({ error: "HF Space returned error", details: errorText }), { status: hfRes.status });
    }

    const data = await hfRes.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Detection failed" }),
      { status: 500 }
    );
  }
}
