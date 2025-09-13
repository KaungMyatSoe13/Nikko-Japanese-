"use client";
import { useInView } from "../hooks/useInView";
import { useState } from "react";

export default function ContactForm() {
  const { ref, isInView } = useInView();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Use relative URL instead of absolute localhost URL
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Server error:", data.message);
        setStatus("error");
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className={`py-12 sm:py-16 lg:py-20 bg-gray-50 w-full transition-all duration-700 sm:flex sm:flex-row flex flex-col items-center justify-center${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 sm:pr-6 lg:pr-8 text-center">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
              Send a Message
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-8 sm:mb-12">
              Have questions or want a quotation? Fill out the form below.
            </p>
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-24 sm:h-32 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 font-medium"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <div
                className={`mt-4 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                  status === "success"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {status === "success"
                  ? "✅ Message sent successfully!"
                  : "❌ Error sending message. Please try again."}
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="text-center w-[90%] sm:w-1/2 my-10 sm:my-0">
        <div className="sm:mr-10 bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
            Location
          </h2>
          <div className="w-full h-[150px] sm:h-[428px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.029404833197!2d96.12349287492135!3d16.824897283969474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c194cb9d22975f%3A0xb4154d22dfc05daa!2sHledan%20Rd%2C%20Yangon%2C%20Myanmar%20(Burma)!5e0!3m2!1sen!2sth!4v1757780519381!5m2!1sen!2sth"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full sm:h-full rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
