import { Navigation } from "./navigation"

export function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 pb-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative mb-16 sm:mb-20 md:mb-24">
          <div
            className="mx-auto overflow-hidden bg-stone-200 shadow-lg"
            style={{
              width: "min(350px, 85vw)",
              height: "min(500px, 115vw)",
              maxWidth: "350px",
              maxHeight: "500px",
              clipPath: "path('M0,0 H350 V350 Q350,400 300,425 Q175,475 175,475 Q175,475 50,425 Q0,400 0,350 Z')",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&h=915&q=80"
              alt="Mary and Jideofor"
              className="w-full h-full object-cover object-center"
            />
          </div> <br /> <br />
          <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 lg:-bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-jF13zt3mZqINQ4kvzdNdUOSp4TiMQL.svg"
              alt="Floral decoration" width = "1000"
              className="w-[280px] sm:w-[400px] md:w-[600px] lg:w-[1000px] xl:w-[1000px] h-12 sm:h-16 md:h-24 lg:h-32 xl:h-40 object-contain"
            />
          </div>
        </div>

        <div className="mb-16 sm:mb-20 mt-12 sm:mt-16 md:mt-20">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black leading-none mb-1">
            Mary
          </h1>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black leading-none">
            <span className="text-stone-400">&</span> Jideofor
          </h1>
        </div>

        {/* Navigation - will be hidden when sticky nav appears */}
        <Navigation />
      </div>
    </section>
  )
}
