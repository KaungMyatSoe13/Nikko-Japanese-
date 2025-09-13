"use client";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 text-sm">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-white font-medium text-base mb-2">Contact</h3>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="h-4 w-4 text-blue-500" />
            09-1234567
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="h-4 w-4 text-blue-500" />
            nikko@gmail.com
          </p>
          <p className="flex items-start justify-center md:justify-start gap-2">
            <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
            <span>
              Yangon, Myanmar
              <br /> Mingalardon
            </span>
          </p>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h3 className="text-white font-medium text-base mb-2">Follow Us</h3>
          <div className="flex justify-center gap-4">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="h-5 w-5 hover:text-blue-500 transition" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="h-5 w-5 hover:text-pink-500 transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="h-5 w-5 hover:text-sky-500 transition" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center md:justify-end">
          <p className="text-gray-500 text-xs">
            © 2025 Nikko. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
