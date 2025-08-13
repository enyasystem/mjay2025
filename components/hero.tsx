"use client"
import { Navigation } from "./navigation"
import React, { useState, useEffect } from "react"

export function Hero() {
  // Always use the U-shape clipPath for all devices
  const clipPath = "path('M0,0 H350 V350 Q350,400 300,425 Q175,475 175,475 Q175,475 50,425 Q0,400 0,350 Z')";

  return (
    <section id="hero" className="min-h-screen bg-stone-50 flex flex-col items-center justify-center w-full pb-8">
      <div className="w-full max-w-4xl mx-0 text-center">
        <div className="relative mb-0 sm:mb-20 md:mb-24">
          <div className="card mx-auto flex flex-col items-center justify-center">
            <div className="card-inner flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 360 520"
                preserveAspectRatio="xMidYMid slice"
                className="u-wrap w-full h-auto"
                style={{ maxWidth: '420px', maxHeight: '600px', width: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="U-shaped masked image with floral border"
              >
                <defs>
                  <clipPath id="uClip" clipPathUnits="userSpaceOnUse">
                    <path d="M0 0 H360 V390 C360 460 300 520 180 520 C60 520 0 460 0 390 Z" />
                  </clipPath>
                  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.12"/>
                  </filter>
                </defs>
                <image
                  clipPath="url(#uClip)"
                  href="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&h=915&q=80"
                  x="0" y="0" width="360" height="520" preserveAspectRatio="xMidYMid slice"
                  className="u-img"
                  style={{ filter: 'url(#soft)' }}
                />
                <path d="M0 0 H360 V390 C360 460 300 520 180 520 C60 520 0 460 0 390 Z" fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth="6" />
              </svg><br />
              <div
                className="floral-wrap"
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: '-15px',
                  width: '80%',
                  maxWidth: '260px',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-jF13zt3mZqINQ4kvzdNdUOSp4TiMQL.svg"
                  alt="Floral decoration"
                  className="w-full h-auto object-contain"
                  style={{ maxWidth: '100%' }}
                />
              </div>
            </div>
          </div>
          {/* Removed duplicate floral decoration for desktop */}
        </div>
        {/* Remove margin above names for mobile so they sit closer to floral */}
  <div className="mt-0 pt-0 sm:mt-24 sm:pt-0 mb-10 sm:mb-20 w-full mx-0">
          <h1 className="font-serif font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl text-green-800 leading-tight mb-1 tracking-tight">
            Mary
          </h1>
          <h1 className="font-serif font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl text-green-800 leading-tight tracking-tight">
            <span className="text-stone-400 font-light text-4xl sm:text-5xl align-middle mx-2">&</span> Jideofor
          </h1>
        </div>
        {/* Navigation - will be hidden when sticky nav appears */}
        <Navigation />
      </div>
    </section>
  )
}
