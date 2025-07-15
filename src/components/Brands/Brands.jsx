import { useState } from "react";
import Spinners from "../spinners/spinners";
import UseToGetData from "../UseToGetData/UseToGetData";
import Helmet from "react-helmet";

export default function Brands() {
  const { data, isLoading, error, isFetching } = UseToGetData("brands");
  const [selectedBrand, setSelectedBrand] = useState(null);
  window.scrollTo(0, 0); // Scroll to top

  if (isLoading || (isFetching && !data)) {
    return <Spinners />;
  }
  if (error) return <p>Error loading data</p>;

  // Modal close handler
  const closeModal = () => {
    setSelectedBrand(null);
  };

  return (
    <>
      <div className="application">
        <Helmet>
          <title>Brands</title>
        </Helmet>
      </div>
      <section className="px-24 pb-10">
        <div className="px-4 sm:px-10 pb-10 max-w-[1400px] mx-auto">
          <h2 className="text-4xl sm:text-5xl text-green-500 text-center my-6">
            All Brands
          </h2>

          {data.length > 0 ? (
            <div className="flex flex-wrap -mx-2">
              {data?.map((element) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 cursor-pointer my-3"
                  key={element?._id}
                  onClick={() => {
                    setSelectedBrand(element);
                  }}
                >
                  <div className="bg-white border py-10 border-gray-200 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300">
                    <img
                      className="mx-auto h-24 object-contain"
                      src={element?.image}
                      alt={element?.name}
                    />
                    <h4 className="text-center mt-3 text-lg font-semibold text-gray-800">
                      {element?.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Spinners />
          )}
        </div>
      </section>
      {/* Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 bg-[#00000026] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-green-600 text-xl hover:text-green-600"
              onClick={closeModal}
            >
              &times;
            </button>

            <h3 className="text-3xl font-bold text-green-600 mb-1">
              {selectedBrand?.name}
            </h3>
            <p className="mb-3 text-gray-600 lowercase">{selectedBrand.slug}</p>

            <img
              src={selectedBrand?.image}
              alt={selectedBrand?.name}
              className="w-full h-40 object-contain"
            />

            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
