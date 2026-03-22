import { Client } from "@gradio/client";
import { NextResponse } from "next/server"; // Use this

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const client = await Client.connect("AumFaldu/traffic-sign-recognition-backend");
    const result = await client.predict("/predict", { image: file });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Vercel API Error:", err);
    return NextResponse.json(
      { error: "Detection failed", details: err.message },
      { status: 500 }
    );
  }
}
