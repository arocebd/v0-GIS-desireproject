import { MapInterface } from "@/components/map-interface"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, LineChart, Users, Layers } from "lucide-react"

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden relative">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Link href="/analytics">
          <Button variant="secondary" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
        </Link>
        <Link href="/visualizations">
          <Button variant="secondary" className="gap-2">
            <LineChart className="h-4 w-4" />
            Charts
          </Button>
        </Link>
        <Link href="/collaborate">
          <Button variant="secondary" className="gap-2">
            <Users className="h-4 w-4" />
            Collaborate
          </Button>
        </Link>
        <Link href="/layers">
          <Button variant="secondary" className="gap-2">
            <Layers className="h-4 w-4" />
            Layers
          </Button>
        </Link>
      </div>
      <MapInterface />
    </main>
  )
}
