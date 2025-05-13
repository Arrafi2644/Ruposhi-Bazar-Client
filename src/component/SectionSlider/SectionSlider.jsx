import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { TbCurrencyTaka } from 'react-icons/tb';
import './sectionSlider.css';

const SectionSlider = ({ products }) => {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    // Slight delay to avoid rendering issues (especially on mobile)
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
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
    <div className="w-full overflow-hidden px-2">
      {showSlider && (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product?._id} className="h-full px-2">
              <Link
                to={`/product/${product?._id}`}
                state={product}
                className="flex flex-col h-full border border-gray-200 p-2 hover:shadow-md rounded"
              >
                <img
                  src={product?.images?.[0]}
                  alt={product?.title}
                  className="h-48 w-full object-cover rounded"
                />
                <div className="flex flex-col flex-grow mt-2">
                  <h3 className="font-medium text-sm truncate">{product?.title}</h3>

                  <div className="flex items-center">
                    <TbCurrencyTaka />
                    {product?.price -
                      parseInt((product?.price * product?.discount) / 100)}
                  </div>

                  <h3 className="flex items-center gap-0.5 text-sm">
                    <del className="flex items-center text-gray-400">
                      <TbCurrencyTaka />
                      {product?.price}
                    </del>
                    <span className="ml-1">-{product?.discount}%</span>
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SectionSlider;
