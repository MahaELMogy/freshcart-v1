import Slider from "react-slick";
import Spinners from "../spinners/spinners";
import UseToGetData from "../UseToGetData/UseToGetData";
// 👉 Import slick-carousel styles (required!)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider() {
  let { data, isLoading, error } = UseToGetData("Categories");
  if (isLoading) return <Spinners />;
  if (error) return <p>Error loading data</p>;

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="mb-10">
      <div className="mt-[8px]">
        <Slider {...settings} className="">
          {data?.map((cat) => (
            <div key={cat?._id} className="px-2">
              <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300">
                <img
                  src={cat?.image}
                  alt={cat?.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-3 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cat?.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
