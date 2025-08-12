export function OurStory() {
  return (
    <section
      id="our-story"
      className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 text-stone-100 py-16 px-4 relative overflow-hidden"
    >
      {/* Decorative Floral Elements */}
      <div className="absolute top-10 left-10 opacity-30">
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-green-300">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="60" cy="60" r="25" />
            <path d="M35 60 Q45 40 60 50 Q75 40 85 60 Q75 80 60 70 Q45 80 35 60" />
            <path d="M20 40 Q30 20 50 30 Q40 50 20 40" />
            <path d="M70 30 Q90 20 100 40 Q80 50 70 30" />
          </g>
        </svg>
      </div>

      <div className="absolute bottom-20 right-10 opacity-30">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-green-300">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20 50 Q30 30 50 40 Q70 30 80 50 Q70 70 50 60 Q30 70 20 50" />
            <path d="M10 30 Q20 10 40 20 Q30 40 10 30" />
          </g>
        </svg>
      </div>

      <div className="absolute top-1/2 right-20 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-green-200">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M10 30 Q20 15 30 25 Q40 15 50 30 Q40 45 30 35 Q20 45 10 30" />
          </g>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-5xl md:text-6xl mb-12 text-stone-100">Our Story</h2>

        <div className="space-y-8 text-lg leading-relaxed max-w-3xl mx-auto">
          <p>
            Mary and Jideofor's love story began in the most unexpected place - a bustling Lagos bookstore in 2018. Mary
            was searching for a cookbook to impress her friends at dinner, while Jideofor was hunting for the latest
            tech magazine. When they both reached for the same book on entrepreneurship, their hands touched, and time
            seemed to pause. What started as an awkward laugh over their shared interest in business became an afternoon
            of coffee and endless conversation.
          </p>

          <p>
            Their relationship blossomed through weekend market visits, late-night phone calls about their dreams, and
            shared adventures exploring hidden gems around Lagos. Mary's infectious laughter could brighten Jideofor's
            most stressful days, while his unwavering support gave her the confidence to pursue her passion for event
            planning. They discovered they both loved sunrise walks on the beach, trying new restaurants, and planning
            surprise getaways for each other.
          </p>

          <p>
            On a magical evening in December 2024, during a romantic dinner at their favorite rooftop restaurant
            overlooking the Lagos skyline, Jideofor surprised Mary with a proposal that left her speechless. Surrounded
            by twinkling lights and the city they both loved, he asked her to be his forever partner in all of life's
            beautiful adventures. With tears of joy and an enthusiastic "Yes!", they began planning the next chapter of
            their incredible journey together.
          </p>
        </div>
      </div>
    </section>
  )
}
