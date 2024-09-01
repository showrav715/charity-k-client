import React from 'react';

interface CustomArrowProps {
  onClick?: () => void;
}

const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <button className="next-arrow" onClick={onClick}>
      <i className="fas fa-arrow-right"></i>
    </button>
  );
};

export default CustomNextArrow;
