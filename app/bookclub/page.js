'use client';

import React, { useEffect, useState } from 'react';

export default function Page() {
  const [leaveMessage, setLeaveMessage] = useState('');
  const [leaveReview, setLeaveReview] = useState('');
  const [review, setReview] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const bookclubName = queryParams.get('bookclub_name');
    const bookTitle = queryParams.get('book_title');

    // Function to fetch book club data
    const fetchBookClubData = async () => {

      // Fetch the Goodreads summary
      const response_new = await fetch('https://e6156-users-402619.ue.r.appspot.com/api/current-user');
      if (response_new.ok) {
        const data = await response_new.json();
        console.log(data.key);
        setUser(data.key); // Use setUser to update the user state
      }
      
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
      const response = await fetch(`http://ec2-18-217-80-67.us-east-2.compute.amazonaws.com:8080/api/bookclub/${bookclubNameText}/users/${user}`, {
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

  const createReview = async () => {
    try {
      const bookclubNameElement = document.getElementById('bookclubName');
      const bookclubNameText = bookclubNameElement.textContent;
  
      const response = await fetch(`http://ec2-3-146-35-34.us-east-2.compute.amazonaws.com:8080/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          review: review,
          bookclub: bookclubNameText,
        }),
      });
  
      if (response.ok) {
        setLeaveReview('Successfully posted a review');
        console.log("POSTED A REVIEW");
  
        // Fetch the updated list of reviews after posting the new review
        const updatedReviewsResponse = await fetch(`http://ec2-18-217-80-67.us-east-2.compute.amazonaws.com:8080/api/bookclub/${bookclubNameText}/reviews`);
        const updatedReviewsData = await updatedReviewsResponse.json();
  
        // Update the reviews list on the page with the newly fetched reviews
        const updatedReviewArray = updatedReviewsData.map(review => `User: ${review.user}, Review: ${review.review}`);
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = ''; // Clear existing reviews
        updatedReviewArray.forEach(updatedReview => {
          const li = document.createElement('li');
          li.textContent = updatedReview;
          reviewsList.appendChild(li);
        });
      } else {
        // Handle error state or display an appropriate message to the user
        console.error('Error posting review. Status:', response.status);
        const text = await response.text(); // Get the response as text
        console.error('Response text:', text);
      }
    } catch (error) {
      console.error("Error posting review:", error);
      // Handle any other errors occurring during the request
    }
  };

//   const createReview = async () => {
//     try { 

//       const bookclubNameElement = document.getElementById('bookclubName');
//       const bookclubNameText = bookclubNameElement.textContent;

//       console.log("FIELDS")
//       console.log(review)
//       console.log(bookclubNameText)

//       const response = await fetch(`http://ec2-3-146-35-34.us-east-2.compute.amazonaws.com:8080/api/review`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//             body: JSON.stringify({
//               user: "sc4789",
//               review: review,
//               bookclub: bookclubNameText,
//             }),
//       });
  
//       if (response.ok) {
//         setLeaveReview('Successfully posted a review');
//         console.log("POSTED A REVIEW");
//       } else {
//         // If response is not ok (status is not in the 2xx range)
//         console.error('Error posting review. Status:', response.status);
//         const text = await response.text(); // Get the response as text
//         console.error('Response text:', text);
//         // Handle error state or display an appropriate message to the user
//       }
//     } catch (error) {
//       console.error("Error posting review:", error);
//       // Handle any other errors occurring during the request
//     }
//   };
  
  

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


      {leaveReview && <p>{leaveReview}</p>}
      <div className="flex flex-col items-center justify-center">
        <form className="w-full max-w-md bg-white p-6 rounded-lg">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="bookclub-review">
                Post a new review
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="bookclub-review"
                type="text"
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={createReview}>
                Post Review
              </button>
            </div>
          </div>
        </form>
      </div>






      {leaveMessage && <p>{leaveMessage}</p>}

      <div className="md:w-2/3">
        <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={removeUser}>
          Leave Bookclub
        </button>
      </div>
    </div>
  );
}
