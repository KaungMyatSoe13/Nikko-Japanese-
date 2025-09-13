import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-r bg-gray-200 flex items-center justify-center text-center overflow-hidden">
      {/* Optional Background Image */}
      <Image
        src="/assets/images/japanese-hero.jpg"
        alt="Japanese Language School"
        fill
        className="absolute inset-0 object-cover object-center opacity-30"
        priority
      />

      {/* Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black drop-shadow-lg leading-tight">
          Learn Japanese the Modern Way
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-black/90 max-w-3xl mx-auto leading-relaxed">
          Nikko Japanese Language School which helps students master Japanese
          with interactive lessons, conversation practice, and cultural
          immersion.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link
            href="#services"
            className="bg-white text-red-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg  transition-all duration-300 transform hover:scale-105"
          >
            Explore Courses
          </Link>
          <Link
            href="#contact"
            className="bg-white border-2 border-white text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray hover:text-red-600 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Decorative Circles / Animation */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full animate-bounce"></div>
    </section>
  );
}
