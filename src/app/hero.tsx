"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Typography } from "@material-tailwind/react";

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
    }, 5000); // Change toutes les 5 secondes

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
          style={{ backgroundImage: `url(${images[index]})` }} // Corrected interpolation
        />
      </AnimatePresence>

      {/* Overlay sombre */}
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />

      {/* Contenu du Hero */}
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto flex flex-col justify-start items-start text-left"> {/* Changed text alignment */}
          <Typography
            variant="h1"
            color="white"
            className="md:max-w-full lg:max-w-3xl font-bold text-4xl sm:text-5xl"
          >
            RSE : tous les articles présents sur le site
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-6 mb-10 w-full md:max-w-full lg:max-w-3xl text-lg sm:text-xl"
          >
            La Responsabilité Sociétale des Entreprises est une politique qui 
            intègre volontairement des préoccupations sociales et 
            environnementales à l'activité commerciale et aux relations avec 
            les parties prenantes.
          </Typography>

          {/* Bouton d'exploration */}
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
          >
            Explorer les articles
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
