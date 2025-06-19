import React, { useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import "./banner.css"
import { Link } from 'react-router';

const Banner = () => {

    let sliderRef = useRef(null);
    // const play = () => {
    //     sliderRef.slickPlay();
    // };
    // const pause = () => {
    //     sliderRef.slickPause();
    // };

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };


    return (
        <Slider className='mt-6' ref={slider => (sliderRef = slider)}  {...settings}>
            <Link className='h-auto w-full'>
                <img className='w-full h-full object-cover' src="https://i.ibb.co.com/gMqH4VQm/image.png" alt="" />
            </Link>
            <Link className='h-auto w-full '>
                <img className='w-full h-full object-cover' src="https://i.ibb.co.com/ycq2CsFW/image.png" alt="" />
            </Link>
            <Link className='h-auto w-full '>
                <img className='w-full h-full object-cover' src="https://i.ibb.co.com/BVZVL460/image.png" alt="" />
            </Link>
        </Slider>
    );
};

export default Banner;