import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerTitle = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  const images = [
    '/public/img2.jpg',
    '/public/img3.jpg',
    '/public/img4.jpg',
    '/public/img5.jpg',
  ];

  return (
    <section className="relative h-[250px]"> 
      <div className="absolute inset-0 overflow-hidden">
        <Slider {...settings} className="h-full">
          {images.map((src, index) => (
            <div key={index} className="w-full h-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="absolute inset-0 bg-gray-900/75"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:flex lg:items-center lg:px-8 h-full flex items-center">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
            {props.title}
            <strong className="block font-extrabold text-indigo-600">{props.title2}</strong>
          </h1>
          <p className="mt-2 max-w-lg text-white sm:text-base">
            {props.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BannerTitle;