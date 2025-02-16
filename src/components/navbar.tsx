"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}
function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <a
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        className="font-medium text-sm"
      >
        {children}
      </a>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolling(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-4 ${isScrolling ? "bg-white" : "bg-transparent"} transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo Image */}
        <img
          src="/image/logo_hosmony.png"
          alt="Logo"
          className="h-10 w-auto"
        />

        {/* Navbar Items (Prevent Width Change) */}
        <div className="ml-10 hidden lg:flex items-center gap-6 flex-shrink-0">
          <ul
            className={`flex items-center gap-6 ${isScrolling ? "text-gray-900" : "text-white"}`}
          >
            <NavItem>Home</NavItem>
            <NavItem>About Us</NavItem>
            <NavItem>Contact Us</NavItem>
          </ul>
        </div>

        {/* Search Bar with Dynamic Icon Color */}
        <div className="ml-4 hidden lg:flex items-center relative">
          {!isSearchOpen ? (
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 transition-all ${isScrolling ? "text-gray-900 hover:bg-gray-300" : "text-white hover:bg-gray-800"}`}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          ) : (
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] md:w-[280px] flex items-center transition-all duration-300`}>
              <input
                type="text"
                placeholder="Tapez votre recherche..."
                className={`flex-grow outline-none border-none bg-transparent text-sm px-2 transition-all duration-300 ${isScrolling ? "text-gray-900 placeholder-gray-900" : "text-white placeholder-white"}`}
                autoFocus
              />
              <button
                className={`transition-all duration-300 ${isScrolling ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-gray-300"}`}
                onClick={() => setIsSearchOpen(false)}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={handleOpen}
          className={`ml-auto lg:hidden p-2 ${isScrolling ? "text-gray-900" : "text-white"}`}
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Collapse Menu */}
      {open && (
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-blue-gray-900">
            <NavItem>Home</NavItem>
            <NavItem>About Us</NavItem>
            <NavItem>Contact Us</NavItem>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;