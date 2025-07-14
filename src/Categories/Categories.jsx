import Spinners from "../spinners/spinners";
import UseToGetData from "../UseToGetData/UseToGetData";
import Helmet from "react-helmet";

export default function Categories() {
  let { data, isLoading, error } = UseToGetData("Categories");
  if (isLoading) return <Spinners />;
  if (error) return <p>Error loading data</p>;
  window.scrollTo(0, 0); // Scroll to top

  return (
    <>
      <div className="application">
        <Helmet>
          <title>Categories</title>
        </Helmet>
      </div>
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 pb-10 max-w-[1400px] mx-auto">
        <h2 className="text-5xl  text-green-500 text-center my-3">
          All Categories
        </h2>
        <div className="flex flex-wrap ">
          {data.map((element) => (
            <div
              className="w-full sm:w-1/2 md:w-1/3 px-4 cursor-pointer my-4 "
              key={element._id}
            >
              <div className="bg-white border pt-10 border-gray-200 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300">
                <img
                  className="mx-auto w-full h-[350px] "
                  src={element.image}
                  alt={element.name}
                />
                <h4 className="text-center py-10 text-2xl font-semibold text-green-500 ">
                  {element.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
