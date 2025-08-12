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
          <div
            className="mx-auto overflow-hidden bg-stone-200 shadow-lg w-full max-w-full"
            style={{
              width: "100vw",
              height: "min(475px, 125vw)",
              clipPath,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&h=915&q=80"
              alt="Mary and Jideofor"
              className="w-full max-w-full h-full object-cover object-top"
              style={{objectPosition: 'top'}}
            />
          </div>
          {/* Floral decoration - always contained */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 sm:-bottom-8 w-full max-w-full z-10 pointer-events-none">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-jF13zt3mZqINQ4kvzdNdUOSp4TiMQL.svg"
              alt="Floral decoration"
              className="w-full max-w-full h-auto object-contain"
              style={{marginBottom: '-12px'}}
            />
          </div>
        </div>
        {/* Reduce margin above names for mobile so they sit closer to floral */}
        <br />
        <div className="mt-8 sm:mt-24 mb-10 sm:mb-20 w-full mx-0">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl text-black leading-none mb-1">
            Mary
          </h1>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl text-black leading-none">
            <span className="text-stone-400">&</span> Jideofor
          </h1>
        </div>
        {/* Navigation - will be hidden when sticky nav appears */}
        <Navigation />
      </div>
    </section>
  )
}
