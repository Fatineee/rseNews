import React from "react";
// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import OtherCourses from "./other-courses";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <OtherCourses /> 
      <Footer />
    </>
  );
}
