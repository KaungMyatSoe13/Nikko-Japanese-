"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Services from "./components/Services";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Reviews Section */}
      <section id="reviews">
        <Reviews />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </div>
  );
}
