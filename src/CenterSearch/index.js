import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating';
import './search.css';

const TravelInfoBox = () => {
  const [postcode, setPostcode] = useState('');
  const [travelMode, setTravelMode] = useState('');
  const [country, setCountry] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [reviewForm, setReviewForm] = useState({});
  const [ratings, setRatings] = useState({});

  //const [commentSubmitted, setCommentSubmitted] = useState({}); // New state for tracking comment submission

  const divStyle = {
    border: 'none',
    padding: '-4px',
    margin: '10px',
    maxWidth: '600px',
    width: '520px',
    borderRadius: '15px',
    background: 'linear-gradient(to right, rgb(40, 167, 69), white, rgb(40, 167, 69))'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70px',
    textAlign: 'center',
    color: 'white'
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://18.132.243.116:8888/nin-centers', {
        country: country,
        proximity_code: postcode,
        mode: travelMode
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (event, centerPostcode, index) => {
    event.preventDefault();
    const commentText = event.target.elements.comment.value;
    const rating = ratings[index];

    try {
      await axios.post('http://18.132.243.116:8888/submit-review/', {
        center_postcode: centerPostcode,
        comment: commentText,
        rating: rating
      });

      //setCommentSubmitted((prev) => ({ ...prev, [index]: true }));
      setReviewForm((prev) => ({ ...prev, [index]: false })); // Hide the form after submission
      event.target.reset();
      //console.log(commentSubmitted)

      const response = await axios.post('http://18.132.243.116:8888/nin-centers', {
        country: country,
        proximity_code: postcode,
        mode: travelMode
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const toggleReviews = (index) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleShowReviewForm = (index) => {
    setReviewForm((prevState) => ({
      ...prevState,
      [index]: true
    }));
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={divStyle}>
          <div style={formStyles.heading}><b style={{fontSize:'15px'}}>Enter your Post/Zipcode and mode of travel to find an NIN center near you</b></div>
          <form onSubmit={handleSubmit} style={formStyles.form}>
            <label style={formStyles.label}>
              <b>Country:</b>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                style={formStyles.input}
              >
                <option value="" disabled>Select Country</option>
                <option value="uk">United Kingdom</option>
                <option value="us">USA</option>
              </select>
            </label>
            <label style={formStyles.label}>
              <b>Postcode:</b>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
                style={formStyles.input}
              />
            </label>
            <label style={formStyles.label}>
              <b>Travel Mode:</b>
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                required
                style={formStyles.input}
              >
                <option value="" disabled>Select travel mode</option>
                <option value="car">Car</option>
                <option value="walking">Walking</option>
                <option value="transit">Public Transport</option>
              </select>
            </label>
            <button type="submit" style={formStyles.button}>Submit</button>
          </form>
        </div>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div style={styles.container}>
          <b>NIN Centers Closest To You</b>
          {data.map((center, index) => (
            <div key={index} className="grid-container" style={styles.box}>
              <div style={styles.item}><strong>Name:</strong> {center.name}</div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=NdJU7uZDtxbe&format=png&color=000000' className='img-result' alt="address icon" /> {center.address}</div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=68248&format=png&color=000000' className='img-result' alt="email icon" /><a href={`mailto:${center.email}`} style={{color: '#28a745'}}>{center.email}</a></div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=124195&format=png&color=000000' className='img-result' alt="phone icon" />{center.phone_number}</div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=iJsfhyEFEIgy&format=png&color=000000' className='img-result' alt="postcode icon" />{center.postcode}</div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=ipBLdOAQ6sRn&format=png&color=000000' className='img-result' alt="website icon" /><a href={center.website} target='_blank' rel='noopener noreferrer' style={{color: '#28a745'}}>{center.website}</a></div>
              <div style={styles.item}><strong>Distance:</strong> {center.distance}</div>
        

              <div style={styles.commentitem}>
                <b>
                  <Link onClick={() => toggleReviews(index)} style={{color: '#28a745'}}>
                    {expandedReviews[index] ? "Hide Reviews" : "Show Reviews"}
                  </Link>
                </b>

                {expandedReviews[index] && (
                  <div>
                    {center.reviews.length > 0 ? (
                      <div style={{padding: '5px'}}>
                        {center.reviews.map((review, reviewIndex) => (
                          <div key={reviewIndex} style={{width: '250%'}}>
                            <p><strong>{new Date(review.created_at).toLocaleString()}:</strong> {review.comment}</p>
                          </div>
                        ))}
                        <div>
                          {reviewForm[index] ? (
                            <form onSubmit={(event) => handleReviewSubmit(event, center.postcode, index)}>
                              <label style={formStyles.label}>
                                <b>Comment:</b>
                                <textarea name="comment" required style={{width:'150%', height:'150%', marginBottom:'5px'}} />
                              </label>
                              <button type="submit" style={formStyles.button2}>Submit Review</button>
                            </form>
                          ) : (
                            <button onClick={() => handleShowReviewForm(index)} style={formStyles.button2}>
                              Add Your Comment
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>No reviews yet. Be the first to leave a review!</p>
                        {reviewForm[index] ? (
                          <form onSubmit={(event) => handleReviewSubmit(event, center.postcode, index)}>
                            <label style={formStyles.label}>
                              <b>Comment:</b>
                              <textarea name="comment" required style={{width:'350px', height:'150px'}} />
                            </label>
                        
                            <button type="submit" style={formStyles.button2}>Submit Review</button>
                          </form>
                        ) : (
                          <button onClick={() => handleShowReviewForm(index)} style={formStyles.button2}>
                            Add Your Comment
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    marginTop: '33px'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: 'black'
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '3px solid #212529',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    background: '#f8f9fa',
    color: 'rgb(33, 37, 41)',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  button2: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    background: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '5px'
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    marginTop: '15px',
    color: 'black'
  }
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
  },
  box: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
    gap: '5px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  item: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    background: '#f9f9f9',
    fontSize: '12px',
    wordWrap: 'break-word',
  },
  commentitem: {
    padding: '4px',
    fontSize: '12px',
    wordWrap: 'break-word',
  },
};

export default TravelInfoBox;


/*
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import './search.css'
import { Link } from 'react-router-dom';
import StarRating from '../StarRating';


const TravelInfoBox = () => {
  const [postcode, setPostcode] = useState('');
  const [travelMode, setTravelMode] = useState('');
  const [country, setCountry] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [reviewForm, setReviewForm] = useState({});
  const [commentSubmitted, setCommentSubmitted] = useState({}); // New state for tracking comment submission
  const [showForm, setShowForm] = useState({}); // Track visibility of the form




  
  const divStyle = {
    border: 'none',  // Border width, style, and color
    padding: '-4px',            // Optional: Add some padding
    margin: '10px',             // Optional: Add some margin
    maxWidth: '600px',          // Set a maximum width for the box
    width: '520px',       // The box will only be as wide as its content
    borderRadius: '15px',
    background: 'linear-gradient(to right, rgb(40, 167, 69), white, rgb(40, 167, 69))'
  };
  
   const containerStyle = {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',     // Center vertically (if height is specified)
    marginTop: '70px',          // Full viewport height
    textAlign: 'center',
    color: 'white'
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    

    try {
      // Replace this URL with the actual endpoint
      const response = await  axios({
                  method: 'post', // Example method, adjust as needed
                  url: 'http://18.134.10.177:8888/nin-centers',
                  mode: "cors",
                  data: {
                      country: country,
                      proximity_code: postcode,
                      mode: travelMode
                  },
                  headers: {
                    'Content-Type': 'application/json',
                    // Other headers as needed
                  },
                  credentials: "include",
                });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleReviewSubmit = async (event, centerPostcode, index) => {
    event.preventDefault();
    console.log(centerPostcode)
    //const reviewText = event.target.elements.review.value;
    const commentText = event.target.elements.comment.value;
    
    setCommentSubmitted((prev) => ({ ...prev, [index]: true })); // Set comment as submitted
    console.log(commentSubmitted);
    event.target.reset()

    try {
      await axios.post('http://18.134.10.177:8888/submit-review/', {
        center_postcode: centerPostcode,
        comment: commentText,
      });
      console.log(centerPostcode)

      // Refresh data to include the new review
      const response = await axios.post('http://18.134.10.177:8888/nin-centers', {
        country: country,
        proximity_code: postcode,
        mode: travelMode
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    }
  };
  
  const toggleReviews = (index) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };
  
  const handleShowReviewForm = (index) => {
    setReviewForm((prevState) => ({
      ...prevState,
      [index]: true
    }));
  
  };


  return (
    <>
    <div style={containerStyle}>
    <div style={divStyle}>
      <div style={formStyles.heading}><b style={{fontSize:'15px'}}>Enter your Post/Zipcode and mode of travel to find an NIN center near you</b></div>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <label style={formStyles.label}>
          <label style={formStyles.label}>
          <b>Country:</b>
           <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            style={formStyles.input}
          >
            <option value="" disabled>Select Country</option>
            <option value="uk">United Kingdom</option>
            <option value="us">USA</option>
          </select>
        </label>
          <b>Postcode:</b>
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
            style={formStyles.input}
          />
        </label>
        <label style={formStyles.label}>
          <b>Travel Mode:</b>
           <select
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
            required
            style={formStyles.input}
          >
            <option value="" disabled>Select travel mode</option>
            <option value="car">Car</option>
            <option value="walking">Walking</option>
            <option value="transit">Public Transport</option>
          </select>
        </label>
        <button type="submit" style={formStyles.button}>Submit</button>
      </form>
      </div>
    </div>
       {loading && <div>Loading...</div>}

      {error && <div>Error: {error.message}</div>}
      {data && (
        <div style={styles.container}>
          <b>NIN Centers Closest To You</b>
          
          {data.map((center, index) => (
            <div key={index} classname='.grid-container' style={styles.box}>
              <div style={styles.item}><strong>Name:</strong> {center.name}</div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=NdJU7uZDtxbe&format=png&color=000000' className='img-result' alt="address icon" /> {center.address}</div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=68248&format=png&color=000000' className='img-result' alt="email icon" /><a href={`mailto:${center.email}`} style={{color: '#28a745'}}>{center.email}</a></div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=124195&format=png&color=000000' className='img-result' alt="phone icon" />{center.phone_number}</div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=iJsfhyEFEIgy&format=png&color=000000' className='img-result' alt="postcode icon" />{center.postcode}</div>
              <div style={styles.item}><img src='https://img.icons8.com/?size=100&id=ipBLdOAQ6sRn&format=png&color=000000' className='img-result' alt="website icon" /><a href={center.website} target='_blank' rel='noopener noreferrer' style={{color: '#28a745'}}>{center.website}</a></div>
              <div style={styles.item}><strong>Distance:</strong> {center.distance}</div>
              
              
              { Button to toggle reviews }
              <div style={styles.commentitem}>
  
                <b>
                <Link onClick={() => toggleReviews(index)} style={{color: '#28a745'}}>
                  {expandedReviews[index] ? "Hide Reviews" : "Show Reviews"}
                </Link>
                </b>
              
                {expandedReviews[index] && (
                  <div>
                    
                    {center.reviews.length > 0 ? (
                      <div style={{padding: '5px'}}>
                        {center.reviews.map((review, reviewIndex) => (
                          <div key={reviewIndex} style={{width: '250%'}}>
                            <p><strong>{new Date(review.created_at).toLocaleString()}:</strong> {review.comment}</p>
                          </div>
                        ))}
                        
                        <div>
                        
                        { Review Form for centers with no reviews }
                        {reviewForm[index]  ? (
                          <form onSubmit={(event) => handleReviewSubmit(event, center.postcode)}>
                            <label styles={formStyles.label}>
                              <b>Comment:</b>
                              <textarea name="comment" required style={{width:'250%', height:'150px'}}/>
                            </label>
                            <button type="submit" style={formStyles.button2}>Submit Review</button>
                          </form>
                        ) : (
                          <button onClick={() => handleShowReviewForm(index)} style={formStyles.button2}>
                            Add Your Comment
                          </button>
                        )}
                      </div>
                      
                      </div>
                    ) : (
                      <div>
                        <p>No reviews yet. Be the first to leave a review!</p>
                        {/ Review Form for centers with no reviews /}
                        {reviewForm[index] ? (
                          <form onSubmit={(event) => handleReviewSubmit(event, center.postcode)}>
                            <label styles={formStyles.label}>
                              <b></b>
                              <textarea name="comment" required style={{width:'350px', height:'150px'}}/>
                            </label>
                            <button type="submit" style={formStyles.button2}>Submit Review</button>
                          </form>
                        ) : (
                          <button onClick={() => handleShowReviewForm(index)} style={formStyles.button2}>
                            Add Your Comment
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
            <StarRating />
                
            </div>
      ))}
      </div>
      )}
    </>
  );
};

const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    marginTop:'33px'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: 'black'
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '3px solid #212529',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    background: '#f8f9fa',
    color: 'rgb(33, 37, 41)',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
   button2: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    background: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    marginTop: '15px',
    color:'black'
}
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
  },
  box: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
    gap: '5px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    width: '100%',  // Adjust width to fill the container
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  item: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    background: '#f9f9f9',
    fontSize: '12px',
    wordWrap: 'break-word',
  },
  commentitem: {
    padding: '4px',
    fontSize: '12px',
    wordWrap: 'break-word',
  },
  
};


export default TravelInfoBox;
*/