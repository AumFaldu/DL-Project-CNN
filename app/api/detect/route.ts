import { Client } from "@gradio/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });
    }

    // 1. Connect to your specific Hugging Face Space
    // This library handles all the complex routing for you automatically
    const client = await Client.connect("AumFaldu/traffic-sign-recognition-backend");

    // 2. Run the prediction
    // We pass the base64 string directly; the client handles the conversion
    const result = await client.predict("/predict", {
      image: image,
    });

    // 3. Return the result back to your page.tsx
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
