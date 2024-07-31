
// src/StarRating.js
import React, { useState } from 'react';
import axios from 'axios';
import './starrating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const apiUrl = null;

  const handleRating = (value) => {
    setRating(value);
    axios.post(apiUrl, { rating: value })
      .then(response => {
        console.log('Rating submitted:', response.data);
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
      });
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
            />
            <svg
              className="star"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              viewBox="0 0 20 20"
              fill={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              height="25"
              width="25"
            >
              <polygon points="9.9,1.1 3.3,19.6 19.8,7.6 0,7.6 16.5,19.6 "/>
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;

