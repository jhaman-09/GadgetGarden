import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAnglesRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerAdvertiseProduct = () => {
  const [currentImg, setCurrentImg] = useState(0);

  // Importing Images Path From Public Directory
  const deskTopImages = [
    "/NewAdvertigement/l1.webp",
    "/NewAdvertigement/l2.webp",
    "/NewAdvertigement/l3.webp",
    "/NewAdvertigement/l4.webp",
    "/NewAdvertigement/l5.webp",
    "/NewAdvertigement/l6.webp",
    "/NewAdvertigement/l7.webp",
  ];

  const mobileImages = [
    "/NewAdvertigement/m1.webp",
    "/NewAdvertigement/m2.webp",
    "/NewAdvertigement/m3.webp",
    "/NewAdvertigement/m4.webp",
    "/NewAdvertigement/m5.webp",
    "/NewAdvertigement/m6.webp",
    "/NewAdvertigement/m7.webp",
    "/NewAdvertigement/m8.webp",
    "/NewAdvertigement/m9.webp",
  ];

  const prevImage = () => {
    if (currentImg > 0) {
      setCurrentImg((prev) => prev - 1);
    }
  };
  const nextImage = () => {
    if (deskTopImages.length - 1 > currentImg) {
      setCurrentImg((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (deskTopImages.length - 1 > currentImg) {
        nextImage();
      } else {
        setCurrentImg(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImg]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">

        {/** Arrow Symbol for Scrolling Image*/}
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              className="bg-white shadow-lg rounded-md p-2"
              onClick={prevImage}
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-lg rounded-md p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Banner for Desktop and laptop */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {deskTopImages.map((imgUrl, idx) => (
            <div
              className="h-full w-full min-w-full min-h-full transition-all"
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
              key={imgUrl}
            >
              <img src={imgUrl} alt="banner_image" className="h-full w-full" />
            </div>
          ))}
        </div>

        {/* Banner for Mobile Screen */}
        <div className="h-full w-full md:hidden flex overflow-hidden">
          {mobileImages.map((imgUrl, idx) => (
            <div
              className="h-full w-full min-w-full min-h-full transition-all"
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
              key={imgUrl}
            >
              <img src={imgUrl} alt="banner_image" className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerAdvertiseProduct;
