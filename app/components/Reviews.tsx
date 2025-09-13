"use client";
import { useInView } from "../hooks/useInView";
import Image from "next/image";
import { useState } from "react";

export default function Reviews() {
  const { ref, isInView } = useInView();

  // State to track which reviews are expanded
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  // Function to toggle expanded state for a specific review
  const toggleExpanded = (index: number) => {
    setExpandedReviews(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Remove from expanded list
          : [...prev, index] // Add to expanded list
    );
  };

  const reviews = [
    {
      name: "Aung Min",
      feedback:
        "Nikko's one-to-one course helped me go from N5 to N3 in just 6 months. The lessons are interactive and fun! The instructors are incredibly patient and tailor each lesson to my specific needs. I particularly appreciated the conversation practice sessions which boosted my confidence significantly.",
      image: "/assets/images/logoWhite.png",
    },
    {
      name: "Thiri",
      feedback:
        "I loved the group courses! Learning with classmates made practicing conversation much easier and enjoyable.",
      image: "/assets/images/logoWhite.png",
    },
    {
      name: "Ko Ko",
      feedback:
        "The teachers are very supportive, and the cultural immersion activities made learning Japanese more meaningful. The school provides excellent study materials and the learning environment is very conducive. I've made tremendous progress in my Japanese proficiency and now feel confident communicating with native speakers.",
      image: "/assets/images/logoWhite.png",
    },
  ];

  return (
    <section
      ref={ref}
      id="reviews"
      className={`py-12 sm:py-16 lg:py-20 bg-gray-50 w-full transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
          Student Reviews
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Hear from our students who have achieved their Japanese learning
          goals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => {
            const isExpanded = expandedReviews.includes(index);
            const shouldTruncate = review.feedback.length > 120;
            const displayText =
              shouldTruncate && !isExpanded
                ? review.feedback.substring(0, 120) + "..."
                : review.feedback;

            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:scale-105 h-fit"
              >
                {review.image && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 relative rounded-full overflow-hidden shadow-md mx-auto">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 text-center">
                  {review.name}
                </h3>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                    {displayText}
                  </p>
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm mt-2 transition-colors duration-300 block mx-auto"
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
