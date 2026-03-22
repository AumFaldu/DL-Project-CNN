import { Client } from "@gradio/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });
    }

    // ⭐ Convert Base64 → Blob
    const resFetch = await fetch(image);
    const blob = await resFetch.blob();

    const file = new File([blob], "image.png", { type: blob.type });

    const client = await Client.connect("AumFaldu/traffic-sign-recognition-backend");

    const result = await client.predict("/run/predict", {
      image: file,   // ⭐ VERY IMPORTANT
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("Vercel API Error:", err);
    return new Response(
      JSON.stringify({ error: "Detection failed", details: err.message }),
      { status: 500 }
    );
  }
}
