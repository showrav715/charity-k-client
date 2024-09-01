import React from 'react';

interface CustomArrowProps {
  onClick?: () => void;
}

const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <button className="prev-arrow" onClick={onClick}>
      <i className="fas fa-arrow-left"></i>
    </button>
  );
};

export default CustomPrevArrow;
