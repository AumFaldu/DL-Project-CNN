export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const hfRes = await fetch(
      "https://aumfaldu-traffic-sign-recognition-backend.hf.space/api/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [image], // Sending the full dataURI is usually more reliable for Gradio
        }),
      }
    );

    const result = await hfRes.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Detection failed", details: err }),
      { status: 500 }
    );
  }
}
