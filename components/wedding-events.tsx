export function WeddingEvents() {
  const events = [
    {
      title: "Traditional wedding",
      date: "Saturday, November 15, 2025",
      time: "2pm to 7pm",
      details:
        "In a beautiful blend of traditions, families gathered to witness Mary and Jideofor's traditional wedding, where Barovbe and Osu customs united in a joyous celebration",
    },
    {
      title: "Exchange of vows",
      date: "Saturday, November 15, 2025",
      time: "12pm to 2pm",
      details:
        "At Divine Mercy Catholic Church Mission Street Lekki Phase 1, surrounded by loved ones and beneath elegant floral arches, Mary and Jideofor exchanged heartfelt vows and rings, sealing their commitment before God with a kiss that marks the beginning of their forever.",
    },
    {
      title: "Reception",
      date: "Saturday, November 15, 2025",
      time: "3pm to 8pm",
      details:
        "The wedding reception at Red Carpet Hall 9, Chief Yesufu Abiodun, Oniru Road, Maroko Lagos transformed into a grand celebration of our love, filled with emotional speeches, our first dance as husband and wife, stunning decor, and the cutting of our towering wedding cake while guests enjoy a feast of Nigerian and continental delicacies.",
    },
    {
      title: "Let's party!",
      date: "Saturday, November 15, 2025",
      time: "8pm to 12am",
      details:
        "As day turns to evening, the after party came alive with pulsating afrobeats, guests showing off their best dance moves, endless photo opportunities, and the newlyweds leading the dance floor celebrations in their chic second and third outfits, creating memories that will last a lifetime.",
    },
  ]

  return (
    <section id="wedding-events" className="min-h-screen bg-stone-50 py-16 px-4 relative">
      {/* Decorative Floral Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <svg width="150" height="200" viewBox="0 0 150 200" className="text-orange-400">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20 50 Q40 30 60 50 Q80 30 100 50 Q80 70 60 50 Q40 70 20 50" />
            <path d="M30 100 Q50 80 70 100 Q90 80 110 100 Q90 120 70 100 Q50 120 30 100" />
            <path d="M10 150 Q30 130 50 150 Q70 130 90 150 Q70 170 50 150 Q30 170 10 150" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">Wedding</h2>
          <h2 className="font-serif text-5xl md:text-6xl text-gray-900">Events</h2>
          <div className="flex items-center justify-center mt-4">
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-green-600">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10 20 Q15 10 20 15 Q25 10 30 20 Q25 30 20 25 Q15 30 10 20" />
              </g>
            </svg>
            <div className="h-px bg-gray-300 w-96 mx-4"></div>
          </div>
        </div>

        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <h3 className="font-serif text-3xl text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-lg">{event.date}</p>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <p
                    className={`text-sm uppercase tracking-wide mb-1 ${index % 2 === 0 ? "text-green-600" : "text-orange-600"}`}
                  >
                    TIME
                  </p>
                  <p className="text-gray-700">{event.time}</p>
                </div>

                <div>
                  <p
                    className={`text-sm uppercase tracking-wide mb-1 ${index % 2 === 0 ? "text-green-600" : "text-orange-600"}`}
                  >
                    DETAILS
                  </p>
                  <p className="text-gray-700 leading-relaxed">{event.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
