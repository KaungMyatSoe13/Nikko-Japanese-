"use client";
import Image from "next/image";
import { useInView } from "../hooks/useInView";

export default function About() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id="about"
      className={`py-12 sm:py-16 lg:py-20 bg-white w-full transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
        {/* Image */}
        <div className="w-full lg:w-1/2 relative h-64 sm:h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <Image
            src="/assets/images/logoWhite.png"
            alt="About Nikko Japanese Language School"
            fill
            className="object-cover "
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
            About Nikko Japanese Language School
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
            At Nikko, we help students master Japanese from N5 to N1 through
            interactive lessons, practical conversation practice, and cultural
            immersion.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Our expert instructors focus on personalized learning, whether in
            one-to-one classes or group sessions, making language learning
            effective and enjoyable.
          </p>

          {/* Features / Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-red-600 text-lg sm:text-xl">🎓</span>
              <p className="text-sm sm:text-base font-medium">
                Experienced Instructors
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-red-600 text-lg sm:text-xl">📚</span>
              <p className="text-sm sm:text-base font-medium">
                Structured Curriculum N5→N1
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-red-600 text-lg sm:text-xl">📝</span>
              <p className="text-sm sm:text-base font-medium">
                Interactive Lessons & Practice
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-red-600 text-lg sm:text-xl">🌏</span>
              <p className="text-sm sm:text-base font-medium">
                Cultural Immersion Activities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
