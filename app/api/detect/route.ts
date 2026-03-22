import { Client } from "@gradio/client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 })
    }

    const client = await Client.connect(
      "AumFaldu/traffic-sign-recognition-backend"
    )

    const result = await client.predict("/predict", {
      image: file
    })

    return Response.json(result)

  } catch (err: any) {
    console.error(err)
    return Response.json(
      { error: "Detection failed", details: err.message },
      { status: 500 }
    )
  }
}
