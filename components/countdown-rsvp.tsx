"use client"

import type React from "react"

import { useState, useEffect } from "react"

export function CountdownRSVP() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set the wedding date to 15th November 2025, 12:00pm local time (Lagos, UTC+1)
    // Use UTC for consistency
    const target = new Date(Date.UTC(2025, 10, 15, 11, 0, 0)); // 12:00pm Lagos = 11:00 UTC

    const timer = setInterval(() => {
      const now = new Date();
      if (target > now) {
        let diffMs = target.getTime() - now.getTime();
        let days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [rsvpData, setRsvpData] = useState({
    name: "",
    email: "",
    attending: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setRsvpData({
      ...rsvpData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: rsvpData.name,
          email: rsvpData.email,
          attending: rsvpData.attending === "yes",
          message: rsvpData.message,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setShowSuccessModal(true)
        setRsvpData({
          name: "",
          email: "",
          attending: "",
          message: "",
        })
        setTimeout(() => {
          setShowSuccessModal(false)
        }, 4000)
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "Failed to submit RSVP")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-green-50 to-orange-50">
  <div className="w-full max-w-6xl mx-0">
        {/* Countdown Section */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 font-serif px-4">
            The families of Osu and Barovbe wish to invite you to the holy matrimony of their son and daughter
          </p>

          <div className="bg-gradient-to-r from-green-900 to-orange-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-10 sm:mb-12">
              Countdown to our Wedding
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center pt-4 sm:pt-6 w-full">
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-green-200 text-xs sm:text-sm">days</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-orange-200 text-xs sm:text-sm">hours</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-green-200 text-xs sm:text-sm">mins</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
                <div className="text-orange-200 text-xs sm:text-sm">secs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-serif text-gray-800 mb-2">
              Ceremony — <span className="font-bold">Divine Mercy Catholic Church</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-2">Mission Street, Lekki Phase 1</p>
            <div className="flex items-center justify-center gap-2 text-green-700 font-semibold mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 12h2v8h-2v-8zm-6-8l-6 4.5V20h4v-6h4v6h4V8.5L12 4zm-2 12h-2v-2h2v2zm4 0h-2v-2h2v2z" />
              </svg>
              <span>12pm</span>
            </div>
            <a
              href="https://maps.google.com/?q=Divine+Mercy+Catholic+Church+Mission+Street+Lekki+Phase+1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-700 underline hover:text-green-800 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>Open in Maps</span>
            </a>
          </div>

          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-serif text-gray-800 mb-2">
              Reception — <span className="font-bold">Red Carpet Hall 9</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-2">Chief Yesufu Abiodun, Oniru Road, Maroko Lagos</p>
            <div className="flex items-center justify-center gap-2 text-orange-700 font-semibold mb-4">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-12S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              <span>3pm</span>
            </div>
            <a
              href="https://maps.google.com/?q=Red+Carpet+Hall+9+Chief+Yesufu+Abiodun+Oniru+Road+Maroko+Lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-700 underline hover:text-orange-800 transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-12S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              <span>Open in Maps</span>
            </a>
          </div>
        </div>

        {/* Color Theme and RSVP Info */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-4 text-base sm:text-lg text-gray-700 mb-4 px-4">
            <strong>Color of the day:</strong>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-green-700"></div>
              <span className="text-green-700">olive green</span>
            </div>
            <span>and</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-400 border-2 border-orange-500"></div>
              <span className="text-orange-700">peach</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-700 px-4">
            <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44-2.83 3.76-5.14 6.67-6.27L11.93 3c-3.95 1.44-7.36 4.62-9.07 8.48l1.42.89c.64-.32 1.34-.5 2.07-.5.53 0 1.04.08 1.53.23l-.26-.31zM17.38 10.79c-.49-.15-1-.23-1.53-.23-.73 0-1.43.18-2.07.5l1.42-.89c-1.71-3.86-5.12-7.04-9.07-8.48L4.67 4.52c2.91 1.13 5.23 3.44 6.67 6.27z" />
              <path d="M12 9c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-8-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2zm16 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <strong>RSVP:</strong>
            <a href="tel:08108708064" className="text-green-700 hover:underline">
              0810 870 8064
            </a>
            <span>|</span>
            <a href="tel:08037975849" className="text-orange-700 hover:underline">
              0803 797 5849
            </a>
          </div>
        </div>

  {/* RSVP Section */}
  <div id="countdown-rsvp" className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-6 sm:mb-8 text-center">RSVP</h2>

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-medium">Error submitting RSVP</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 text-sm sm:text-base">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={rsvpData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 text-sm sm:text-base">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={rsvpData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="attending" className="block text-gray-700 mb-2 text-sm sm:text-base">
                Will you attend? *
              </label>
              <select
                id="attending"
                name="attending"
                required
                value={rsvpData.attending}
                onChange={handleInputChange}
                className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80"
              >
                <option value="">Please select</option>
                <option value="yes">Yes, I'll be there!</option>
                <option value="no">Sorry, can't make it</option>
              </select>
            </div>



            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2 text-sm sm:text-base">
                Special Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={rsvpData.message}
                onChange={handleInputChange}
                className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80"
                placeholder="Share your wishes for the happy couple..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-green-800 to-orange-800 text-white px-6 sm:px-8 py-3 rounded-lg hover:from-green-700 hover:to-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? "Sending..." : "Send RSVP"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl transform animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">
                🎉 Your RSVP has been sent to Mary & Jideofor!
              </h3>
              <p className="text-green-100 text-sm sm:text-base">
                Thank you for responding. The couple will be delighted to celebrate their special day with you.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-white text-green-700 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
