import React from 'react';



const About = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px', // Pushes the section down
    padding: '20px',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
     
      <p style={paragraphStyle}>
        NINFinder.com is a cutting-edge platform designed to assist Nigerians living abroad in locating reputable NIN enrolment centers in the UK and US. Our mission is to streamline the process of finding and booking appointments at these centers, making it easier for Nigerians to access essential services.
      </p>
      <p style={paragraphStyle}>
        We aim to create a community where users can share their experiences and provide honest feedback about the centers they visit. By doing so, we hope to guide others towards top-quality enrolment services and away from subpar options, ensuring a smoother and more reliable experience for everyone.
      </p>
      <p style={paragraphStyle}>
        At NINFinder.com, our ultimate goal is to simplify and enhance the process of NIN enrollment for Nigerians in the diaspora.
      </p>
    </div>
  );
};

export default About;

