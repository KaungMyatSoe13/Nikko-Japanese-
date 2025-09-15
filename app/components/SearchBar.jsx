import React from "react";

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
