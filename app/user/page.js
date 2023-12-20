'use client' // 👈 use it here

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import BookClubCard from '../widgets/bookclub-card';

// Define your Next.js component
export default function Page() {
  // Initialize bookClubsUsers as an empty array
  const [userBookclubs, setUserBookclubs] = useState([]);
  const [bookTitles, setBookTitles] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {


        const response = await fetch('http://ec2-3-16-14-76.us-east-2.compute.amazonaws.com:8080/sync');
        if (response.ok) {
          const data1 = await response.json();
          const data = JSON.parse(data1);
          const userBooks = data.userBookclubs;
          console.log("USER BOOKS")
          console.log(userBooks)

          const fetchBookData = async (club) => {
            try {
              const response = await fetch(`http://ec2-18-217-80-67.us-east-2.compute.amazonaws.com:8080/api/bookclub/${club.bookclub}`);
              if (response.ok) {
                const data = await response.json();
                console.log(JSON.stringify(data, null, 2));
                return data.book;
              } else {
                console.error('Failed to fetch book clubs:', response.statusText);
                return null;
              }
            } catch (error) {
              console.error('Error during fetch:', error.message);
              return null;
            }
          };

          const bookTitles = await Promise.all(userBooks.map(async (club) => {
            return await fetchBookData(club);
          }));

          setUserBookclubs(userBooks);
          setBookTitles(bookTitles);

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
      {userBookclubs.map((club, index) => (
      <BookClubCard
        key={club.bookclub}
        bookclub_name={club.bookclub}
        book_title={bookTitles[index]} // Set book_title using index to match the corresponding title
        organizer={club.title}
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
