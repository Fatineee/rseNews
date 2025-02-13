"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/image/rse2.jpeg",
  "/image/rse1.jpeg",
  "/image/rse3.jpeg",
];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Carrousel des images */}
      <AnimatePresence>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>

      {/* Overlay sombre */}
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />

      {/* Contenu du Hero */}
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto flex flex-col justify-start items-start text-left">
          {/* Replaced Typography with h1 */}
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:max-w-full lg:max-w-3xl">
            RSE : tous les articles présents sur le site
          </h1>

          {/* Replaced Typography with p */}
          <p className="text-white mt-6 mb-10 w-full md:max-w-full lg:max-w-3xl text-lg sm:text-xl">
            La Responsabilité Sociétale des Entreprises est une politique qui 
            intègre volontairement des préoccupations sociales et 
            environnementales à L&apos;activité commerciale et aux relations avec 
            les parties prenantes.
          </p>

          {/* Replaced Button with a regular button */}
          <button
            className="bg-white hover:bg-white text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
          >
            Explorer les articles
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
