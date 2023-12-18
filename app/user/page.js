'use client' // 👈 use it here

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import BookClubCard from '../widgets/bookclub-card';

// Define your Next.js component
export default function Page() {
  // Initialize bookClubsUsers as an empty array
  const [bookClubs, setBookClubs] = useState([]);
  const [bookClubsUsers, setBookClubsUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ec2-18-223-255-69.us-east-2.compute.amazonaws.com:8080/sync');

        if (response.ok) {
          console.log(response);
          const data1 = await response.json();
          setBookClubs(data1);
          console.log("IT WORKED");
          console.log(data1);

          const data = JSON.parse(data1);

          // Separate arrays for books and book clubs
          const books = data.book;
          const clubs = data.bookclub;

          // Set the state for both books and book clubs
          setBookClubs(books);
          setBookClubsUsers(clubs);

          // Print the lists
          console.log("Books:");
          books.forEach(book => {
            console.log(`Name: ${book.name}, Author: ${book.author}, Description: ${book.description || 'N/A'}`);
          });

          console.log("\nBook Clubs:");
          clubs.forEach(club => {
            console.log(`Name: ${club.name}, Book: ${club.book}`);
          });

        } else {
          console.error('Failed to fetch book clubs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching book clubs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="semi-bold p-6">Hello, this is the User page!</h1>
      <h2 className="text-xl semi-bold p-6">You can see your bookclubs here:</h2>
      {bookClubsUsers.map((club) => (
        <BookClubCard
          key={club.name}
          bookclub_name={club.name}
          book_title={club.book}
          organizer="hard code"
          date="hard code"
        />
      ))}

      <div className="flex flex-col items-center justify-center">
        <Link href="/create-bookclub">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Create a Bookclub
          </button>
        </Link>
      </div>
    </div>
  );
}
