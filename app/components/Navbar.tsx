"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const Categories = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Student Reviews", href: "/reviews" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/logoWhite.png" // put your logo in public folder
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="font-bold text-lg">Nikko</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {Categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {cat.name}
            </Link>
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
            <Link
              key={cat.name}
              href={cat.href}
              className="block text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
