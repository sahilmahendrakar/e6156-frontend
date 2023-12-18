'use client' // 👈 use it here
import React, { useState } from "react";

export default function Page() {
  const [clubName, setClubName] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  const handleCreateClub = async () => {
    try {
      const response = await fetch("http://ec2-18-116-201-63.us-east-2.compute.amazonaws.com:8080/api/bookclub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: clubName,
          book: bookTitle,
        }),
      });

      if (response.ok) {
        console.log("Bookclub created successfully!");
        // You can redirect or perform other actions after successful creation
      } else {
        console.error("Failed to create bookclub:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating bookclub:", error);
    }
  };

  return (
    <div>
      <h1 className="semi-bold p-6">Hello, this is the Create a bookclub page!</h1>
      <h2 className="text-xl semi-bold p-6">You can organize a bookclub here:</h2>

      <div className="flex flex-col items-center justify-center">
        <form className="w-full max-w-sm bg-white p-6 rounded-lg">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="bookclub-title">
                Club Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="bookclub-title"
                type="text"
                onChange={(e) => setClubName(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="bookclub0-members">
                Book
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="bookclub0-members"
                type="text"
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="bookclub-members">
                Members
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="bookclub-members"
                type="text"
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleCreateClub}
              >
                Create Bookclub
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
