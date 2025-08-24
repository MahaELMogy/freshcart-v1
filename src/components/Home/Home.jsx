import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";

import ProductsHome from "../ProductsHome/ProductsHome";
import { Helmet } from "react-helmet";

export default function Home() {
  window.scrollTo(0, 0); // Scroll to top

  return (
    <>
      <section className="">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <MainSlider />
        <CategoriesSlider />
        <ProductsHome />
      </section>
    </>
  );
}
