import React from "react";
// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import OnlineCourse from "./online-course";
import CarouselFeatures from "./carousel-features";
import Pricing from "./pricing";
import OtherCourses from "./other-courses";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <OnlineCourse /> */}
      <OtherCourses />
      {/* <CarouselFeatures /> */}
      {/* <Pricing /> */}
      
      <Footer />
    </>
  );
}
