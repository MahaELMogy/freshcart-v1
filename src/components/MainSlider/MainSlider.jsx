import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/images/slider-image-1.jpeg";
import img2 from "../assets/images/slider-image-2.jpeg";
import img3 from "../assets/images/slider-image-3.jpeg";
import img4 from "../assets/images/Mix Fruit Image.jpg";
import img5 from "../assets/images/grocery-banner-2.jpeg";

import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    autoplaySpeed: 3000,
  };

  return (
    <>
      <section className="mt-14 sm:mt-2 mb-10">
        <div className="flex mt-[8px] ">
          <div className="w-3/4 h-full">
            <Slider {...settings}>
              <img className="w-full" src={img1} alt="" />
              <img className="w-full" src={img2} alt="" />
              <img className="w-full" src={img3} alt="" />
            </Slider>
          </div>
          <div className="w-1/4 flex flex-col gap-4">
            <img className="	max-w-full h-auto " src={img4} alt="" />
            <img className="	max-w-full h-auto " src={img5} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
