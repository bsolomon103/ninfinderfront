import React, { useState, useEffect } from 'react';
import './dropdown.css'; // Ensure you have this CSS file

const CustomDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {value ? (
          <div className="selected-option">
            <img src={value.imgSrc} alt={value.label} />
            <span>{value.label}</span>
          </div>
        ) : (
          <span>Select travel mode</span>
        )}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              <img src={option.imgSrc} alt={option.label} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
