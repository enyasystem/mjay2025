"use client"

import { useState, useEffect } from "react"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isSticky, setIsSticky] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8
      setIsSticky(window.scrollY > heroHeight)
      setShowBackToTop(window.scrollY > 500)

      const sections = ["our-story", "wedding-events", "countdown-rsvp", "registry", "gallery"]
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { id: "our-story", label: "Our Story" },
    { id: "wedding-events", label: "Events" },
    { id: "countdown-rsvp", label: "RSVP" },
    { id: "registry", label: "Registry" },
    { id: "gallery", label: "Gallery" },
  ]

  return (
    <>
      <nav
        className={`flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-gray-600 px-4 ${isSticky ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
      >
        {navigationItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="hover:text-green-600 transition-colors text-sm sm:text-base md:text-lg whitespace-nowrap"
          >
            {label}
          </button>
        ))}
      </nav>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm transition-all duration-300 ${
          isSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="font-serif text-lg sm:text-xl text-green-800">Mary & Jideofor</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              {navigationItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? "bg-green-100 text-green-800"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12M4 6h16M4 12h16M4 18h16"
                  />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-green-100">
              <div className="flex flex-col space-y-2">
                {navigationItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`px-3 py-2 rounded-lg text-left text-sm font-medium transition-all duration-200 ${
                      activeSection === id
                        ? "bg-green-100 text-green-800"
                        : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 hover:shadow-xl transform transition-all duration-300 flex items-center justify-center ${
          showBackToTop ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-75"
        }`}
        aria-label="Back to top"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </>
  )
}
