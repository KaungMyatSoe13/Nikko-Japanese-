"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const Categories = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Student Reviews", id: "reviews" },
    { name: "Contact Us", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <Image
            src="/assets/images/logoWhite.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="font-bold text-lg">Nikko</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {Categories.map((cat) => (
            <a
              key={cat.name}
              href={`#${cat.id}`}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {cat.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {Categories.map((cat) => (
            <a
              key={cat.name}
              href={`#${cat.id}`}
              className="block text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {cat.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
