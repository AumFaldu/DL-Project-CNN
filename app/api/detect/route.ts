import { Client } from "@gradio/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const blob = await (await fetch(image)).blob();
    const file = new File([blob], "image.png");

    const client = await Client.connect("AumFaldu/traffic-sign-recognition-backend");

    const result = await client.predict("/run/predict", {
      image: file,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
