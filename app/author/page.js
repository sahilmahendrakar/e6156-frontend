'use client' // 👈 use it here

import React, { useState, useEffect } from "react";
import BookCard from '../widgets/book-card';
import StatsCard from '../widgets/stats-card';



export default function Page() {
  const [bookTitle, setBookTitle] = useState("");
  const [description, setBookDescription] = useState("");
  const [authorBooks, setAuthorBooks] = useState([]);
  const [authorStats, setAuthorStats] = useState([]);
  const [user, setUser] = useState(""); // Use useState for user



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_new = await fetch('https://e6156-users-402619.ue.r.appspot.com/api/current-user');
       
        if (response_new.ok) {
          const data = await response_new.json();
          console.log(data.key);
          setUser(data.key); // Use setUser to update the user state
        }
        console.log(user)
        const response_books = await fetch(`http://ec2-18-222-112-233.us-east-2.compute.amazonaws.com:8080/api/author/${data.key}/books`);
        const response_books_stats = await fetch(`http://ec2-18-222-112-233.us-east-2.compute.amazonaws.com:8080/api/author/${data.key}/total_bookclubs`);


        if (response_books.ok) {
          const data1 = await response_books.json();
          setAuthorBooks(data1);
        }

        if (response_books_stats.ok) {
          const data = await response_books_stats.json();
          setAuthorStats(data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

const handleCreateBook = async () => {
  try {
    const response = await fetch("http://ec2-18-222-46-98.us-east-2.compute.amazonaws.com:5001/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bookTitle,
        author: user,
        description: description,
      }),
    });

    if (response.ok) {
      // Fetch updated list of books after creating a new book
      const updatedBooksResponse = await fetch(`http://ec2-18-222-112-233.us-east-2.compute.amazonaws.com:8080/api/author/${user}/books`);
      const updatedStatsResponse = await fetch(`http://ec2-18-222-112-233.us-east-2.compute.amazonaws.com:8080/api/author/${user}/total_bookclubs`);

      if (updatedBooksResponse.ok && updatedStatsResponse.ok) {
        const updatedBooks = await updatedBooksResponse.json();
        const updatedStats = await updatedStatsResponse.json();

        // Update authorBooks and authorStats states with new data
        setAuthorBooks(updatedBooks);
        setAuthorStats(updatedStats);
      }
    } else {
      console.error("Error creating book:", response.status);
    }
  } catch (error) {
    console.error("Error creating book:", error);
  }
};


return (
    <div>
      <h1 className="semi-bold p-6">Hello, this is the Author page!</h1>
      <h2 className="text-xl semi-bold p-6">Here are your current books:</h2>
      {/* Loop through authorBooks to display existing books */}
      {authorBooks.map((book, index) => (
        <BookCard key={index} bookName={book.name} description={book.description} />
      ))}

      <h2 className="text-xl semi-bold p-6">Here are some stats on your books!</h2>
      {authorStats.map((book, index) => (
        <StatsCard key={index} bookName={book.book} number={book.TotalBookClubs} />
      ))}



      <h2 className="text-xl semi-bold p-6">You can publish a book here:</h2>

      <div className="flex flex-col items-center justify-center">
        {/* Wider form container */}
        <form className="w-full max-w-lg bg-white p-6 rounded-lg">
          {/* Book Title input field */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="book-title">
                Book Title
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="book-title"
                type="text"
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>
          </div>
          {/* Description input field */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="book-description">
                Description
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="book-description"
                type="text"
                onChange={(e) => setBookDescription(e.target.value)}
              />
            </div>
          </div>
          {/* Submit button */}
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleCreateBook}
              >
                Post Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
