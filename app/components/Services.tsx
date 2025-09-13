"use client";
import { User, Users } from "lucide-react";
import { useInView } from "../hooks/useInView";
import Link from "next/link";

export default function Services() {
  const { ref, isInView } = useInView(0.3);

  const services = [
    {
      title: "One-to-One Course",
      description:
        "Personalized lessons tailored to your pace and learning style. Ideal for focused learning and rapid progress.",
      href: "#contact",
      icon: (
        <User className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 mb-3 sm:mb-4" />
      ),
    },
    {
      title: "Group Course",
      description:
        "Interactive group lessons that build communication skills, teamwork, and motivation while learning Japanese together.",
      href: "#contact",
      icon: (
        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 mb-3 sm:mb-4" />
      ),
    },
  ];

  return (
    <section
      ref={ref}
      id="services"
      className={`transition-all duration-700 w-full py-12 sm:py-16 lg:py-20 bg-gray-250 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
          Our Courses
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Choose the course type that suits your learning style.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="border bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center transform hover:scale-105"
            >
              {service.icon}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-center text-gray-800">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 text-center leading-relaxed">
                {service.description}
              </p>
              <Link
                href="https://www.facebook.com/profile.php?id=100057643892005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
