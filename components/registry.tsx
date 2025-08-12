"use client"

import { useState } from "react"

export function Registry() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <section
        id="registry"
        className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 text-stone-100 py-16 px-4 relative overflow-hidden"
      >
        {/* Decorative Floral Elements */}
        <div className="absolute top-10 left-10 opacity-30">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-green-300">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 60 Q40 40 60 60 Q80 40 100 60 Q80 80 60 60 Q40 80 20 60" />
              <path d="M10 30 Q20 10 40 20 Q50 10 60 30 Q50 50 40 40 Q20 50 10 30" />
            </g>
          </svg>
        </div>

        <div className="absolute top-20 right-10 opacity-20">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-green-200">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M15 40 Q25 25 40 35 Q55 25 65 40 Q55 55 40 45 Q25 55 15 40" />
            </g>
          </svg>
        </div>

        <div className="absolute bottom-20 left-20 opacity-25">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-green-300">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 50 Q35 30 50 45 Q65 30 80 50 Q65 70 50 55 Q35 70 20 50" />
              <path d="M30 20 Q40 10 50 20 Q60 10 70 20 Q60 30 50 20 Q40 30 30 20" />
            </g>
          </svg>
        </div>

        <div className="absolute bottom-10 right-20 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-green-200">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M15 30 Q22 20 30 25 Q38 20 45 30 Q38 40 30 35 Q22 40 15 30" />
            </g>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-6xl mb-12 text-stone-100">The Gift Registry</h2>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl leading-relaxed">
              Your presence at the wedding was the greatest gift we could have asked for. However, if you wish to honor
              us with a gift, we have created a registry to help guide you. If you prefer, a monetary contribution
              towards our future would also be deeply appreciated.
            </p>
          </div>

          <button
            onClick={openModal}
            className="bg-stone-100 text-green-900 px-8 py-3 text-lg hover:bg-stone-200 transition-colors"
          >
            Continue with love
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-serif text-green-900 mb-6">Account Details</h3>

              <div className="space-y-4 text-left">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-green-900 mb-2">Bank Account</h4>
                  <p className="text-sm text-gray-700">
                    <strong>Account Name:</strong> Mary Barovbe & Jideofor Osu
                    <br />
                    <strong>Bank:</strong> First Bank Nigeria
                    <br />
                    <strong>Account Number:</strong> 3012345678
                    <br />
                    <strong>Sort Code:</strong> 011151003
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Mobile Money</h4>
                  <p className="text-sm text-gray-700">
                    <strong>Name:</strong> Mary Barovbe
                    <br />
                    <strong>Number:</strong> 0810 870 8064
                    <br />
                    <strong>Provider:</strong> MTN Mobile Money
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-green-900 mb-2">Alternative Contact</h4>
                  <p className="text-sm text-gray-700">
                    <strong>Name:</strong> Jideofor Osu
                    <br />
                    <strong>Number:</strong> 0803 797 5849
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 italic">Thank you for your love and generosity! 💚🧡</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
