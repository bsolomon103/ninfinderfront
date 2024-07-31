import React from 'react';

const Article = () => {
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

return(<div style={containerStyle}>
     
      <p style={paragraphStyle}>
          Feel free to contact us at solomon@eazibots.com
      </p>
      <p style={paragraphStyle}>
      </p>
      <p style={paragraphStyle}>
        
      </p>
    </div>
    )
};
export default Article;