import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About the Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            This project uses <strong>YOLOv8</strong> for real-time traffic sign detection.
          </p>
          <p>
            The model is trained on the IDD dataset, covering 13 traffic sign classes including cars, buses, trucks, motorcycles, and more.
          </p>
          <p>
            FastAPI serves as the backend API, while this Next.js frontend handles image uploads and displays prediction results.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}