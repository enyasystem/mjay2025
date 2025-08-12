import { Hero } from "@/components/hero"
import { OurStory } from "@/components/our-story"
import { WeddingEvents } from "@/components/wedding-events"
import { Registry } from "@/components/registry"
import { Gallery } from "@/components/gallery"
import { CountdownRSVP } from "@/components/countdown-rsvp"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <OurStory />
      <WeddingEvents />
      <CountdownRSVP />
      <Registry />
      <Gallery />
    </main>
  )
}
