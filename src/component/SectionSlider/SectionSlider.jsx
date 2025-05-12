import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Link } from 'react-router';
import { TbCurrencyTaka } from 'react-icons/tb';
import './sectionSlider.css';

const SectionSlider = ({ products }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    centerPadding: '8px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  

  return (
    <div className="slider-container">
      <Slider className='' {...settings}>
        {products.map((product) => (
          <div key={product?._id} className="h-full">
            <Link
              className="flex flex-col h-full border border-gray-200 p-2 hover:shadow-md"
              to={`/product/${product?._id}`} state={product} // Adjust the route as needed
            >
              <img
                className="h-48 w-full object-cover"
                src={product?.images[0]}
                alt={product?.name}
              />
              <div className="flex flex-col flex-grow mt-2">
                <h3 className="font-medium text-sm truncate">{product?.title}</h3>
                <div className="flex items-center">
                  <TbCurrencyTaka />
                  <h3>{product?.price - parseInt(product.price * product?.discount / 100)}</h3>
                </div>
                <h3 className="flex items-center gap-0.5">
                  <del className="flex items-center text-gray-400">
                    <TbCurrencyTaka />
                    {product?.price}
                  </del>
                  -{product?.discount}%
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SectionSlider;