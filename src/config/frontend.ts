import React from 'react';
import CustomPrevArrow from '../../src/app/components/slider_components/CustomPrevArrow';
import CustomNextArrow from '../../src/app/components/slider_components/CustomNextArrow';

// campaign slider settings
export const campaignSliderSettings = {
  dots: true,
  cssEase: 'ease',
  autoplay: true,
  infinite: true,
  speed: 4500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: true,
  prevArrow: React.createElement(CustomPrevArrow),
  nextArrow: React.createElement(CustomNextArrow),
  centerMode: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

// category & volunteer slider settings
export const CategoriesSliderSettings = {
  dots: true,
  cssEase: 'ease',
  autoplay: true,
  infinite: true,
  speed: 4500,
  slidesToShow: 4,
  slidesToScroll: 4,
  centerMode: false,
  arrows: true,
  prevArrow: React.createElement(CustomPrevArrow),
  nextArrow: React.createElement(CustomNextArrow),
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};
