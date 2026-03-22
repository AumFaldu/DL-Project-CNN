import { Client } from "@gradio/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // ⭐ Get FormData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // ⭐ Connect to HuggingFace Space
    const client = await Client.connect(
      "AumFaldu/traffic-sign-recognition-backend"
    );

    // ⭐ Run prediction
    const result = await client.predict("/run/predict", {
      image: file,
    });

    // ⭐ Return HF response directly
    return Response.json(result);

  } catch (err: any) {
    console.error("Detection API Error:", err);

    return Response.json(
      { error: "Detection failed", details: err?.message },
      { status: 500 }
    );
  }
}
