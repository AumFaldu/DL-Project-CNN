import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image");

  if (!image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

  const backendRes = await fetch("https://dl-project-cnn-backend.onrender.com/predict", {
    method: "POST",
    body: formData,
  });

  const data = await backendRes.json();
  return NextResponse.json(data);
}