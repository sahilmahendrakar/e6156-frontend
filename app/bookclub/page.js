'use client';

import React, { useEffect, useState } from 'react';

export default function Page() {
  const [leaveMessage, setLeaveMessage] = useState('');
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const bookclubName = queryParams.get('bookclub_name');
    const bookTitle = queryParams.get('book_title');

    // Function to fetch book club data
    const fetchBookClubData = async () => {

      // Fetch the Goodreads summary
      const summaryResponse = await fetch(`http://ec2-18-222-46-98.us-east-2.compute.amazonaws.com:5001/api/book/${bookTitle}/summary`);
      const summaryHTML = await summaryResponse.text();
      // Parse the HTML to get the content inside the <p> tag
      const parser = new DOMParser();
      const doc = parser.parseFromString(summaryHTML, 'text/html');
      const paragraphContent = doc.querySelector('p').textContent;
      // Manipulate the DOM to update the UI directly
      const summaryElement = document.getElementById('summary');
      summaryElement.textContent = paragraphContent;

      // Fetch the list of members
      const membersResponse = await fetch(`http://ec2-18-217-80-67.us-east-2.compute.amazonaws.com:8080/api/bookclub/${bookclubName}/users`);
      const membersData = await membersResponse.json();
      const memberArray = membersData.map(member => member.user);
      // Manipulate the DOM to update the UI directly
      const membersList = document.getElementById('membersList');
      memberArray.forEach(member => {
        const li = document.createElement('li');
        li.textContent = member;
        membersList.appendChild(li);
      });
      
      // Fetch the list of reviews
      const reviewsResponse = await fetch(`http://ec2-18-217-80-67.us-east-2.compute.amazonaws.com:8080/api/bookclub/${bookclubName}/reviews`);
      const reviewsData = await reviewsResponse.json();
      // Extract "review" and "user" properties into separate arrays
      const reviewArray = reviewsData.map(review => review.review);
      const userArray = reviewsData.map(review => review.user);
      // Manipulate the DOM to update the UI directly
      const reviewsList = document.getElementById('reviewsList');
      reviewArray.forEach((review, index) => {
        const li = document.createElement('li');
        li.textContent = `User: ${userArray[index]}, Review: ${review}`;
        reviewsList.appendChild(li);
      });

      // Update the book club name
      const bookclubNameElement = document.getElementById('bookclubName');
      bookclubNameElement.textContent = bookclubName;
    };

    // Check if bookclubName is available before fetching data
    if (bookclubName) {
      fetchBookClubData();
    }
  }, []);

  const removeUser = async () => {
    try { 
      const bookclubNameElement = document.getElementById('bookclubName');
      const bookclubNameText = bookclubNameElement.textContent;
      const response = await fetch(`http://ec2-18-217-80-67.us-east-2.compute.amazonaws.com:8080/api/bookclub/${bookclubNameText}/users/sc4789`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setLeaveMessage('Successfully left the bookclub');
        console.log("LEFT THE BOOKCLUB");
      } else {
        // If response is not ok (status is not in the 2xx range)
        console.error('Error removing user. Status:', response.status);
        const text = await response.text(); // Get the response as text
        console.error('Response text:', text);
        // Handle error state or display an appropriate message to the user
      }
    } catch (error) {
      console.error("Error removing user:", error);
      // Handle any other errors occurring during the request
    }
  };
  
  

  return (
    <div>
      {/* Display book club name */}
      <h1 id="bookclubName"></h1>

      {/* Display book club data */}
      <h2>Book Summary:</h2>
      <p id="summary"></p>

      <br/>

      <h2>Bookclub Members:</h2>
      <ul id="membersList"></ul>

      <br/>

      <h2>Book Reviews:</h2>
      <ul id="reviewsList"></ul>

      <br/>
      <br/>


      {leaveMessage && <p>{leaveMessage}</p>}

      <div className="md:w-2/3">
        <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={removeUser}>
          Leave Bookclub
        </button>
      </div>
    </div>
  );
}
