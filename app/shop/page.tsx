"use client";
import React, { useState } from "react";
import ShopNavbar from "../components/ShopNavbar";
import Footer from "../components/Footer";

export default function Page() {
  // Dummy book data
  const books = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    title: `Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    price: 1000 + " MMK",
    image: "/assets/images/logoWhite.png", // replace with your dummy image
  }));

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSearch, setTempSearch] = useState(""); // to hold input before search
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter books based on search
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentBooks = filteredBooks.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div>
      <ShopNavbar />

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[200px] md:h-[400px] bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center text-white mt-10">
        <div className="text-center px-6">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Find Your Next Favorite Book
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Browse thousands of books from all genres and authors
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-gray-100 py-8 flex justify-center">
        <div className="flex w-full max-w-xl justify-center">
          <input
            type="text"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)} // store input temporarily
            placeholder="Search for books..."
            className="flex px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 sm:w-[80%]"
          />
          <button
            className="bg-red-500 text-white px-4 py-3 rounded-r-lg hover:bg-red-600"
            onClick={() => {
              setSearchTerm(tempSearch); // trigger search
              setCurrentPage(1); // reset pagination
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* Book Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition flex flex-col items-center"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg text-center">{book.title}</h3>
            <p className="text-gray-500 text-sm mb-2">{book.author}</p>
            <p className="font-bold text-red-600">${book.price}</p>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mb-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Footer />
    </div>
  );
}
