import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import Cardfeatures from "../component/Cardfeatures";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import Allproduct from "../component/Allproduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(0, 4);

 

  const homeProductCartListLunch = productData.filter(
    (el) => el.category === "lunch",
    []
  );
  // console.log(homeProductCartListLunch);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };
  
  // filter data display 

  return (
    <div className="p-1 md:p-4 ml-2">
      <div className="md:flex gap-6 py-1">
        <div className="md:w-1/2 mr-10 py-1">
          <div className="flex gap-3 bg-yellow-300 w-32 pl-4 font-medium italic items-center rounded  ">
            <p className="text-sm">Yummy Food</p>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRawWVLWPuSrDyFeGHFG7luB0d-7NSr5E5clw&usqp=CAU"
              className="w-10 h-10"
            ></img>
          </div>
          <h2 className="text-5xl py-2 mb-3 font-bold md:text-7xl">
            Deliver Yummy,<span className="text-yellow-300 ">Eat Happy.</span>{" "}
          </h2>
          <p className="text-large italic max-w-lg">
            "Yummify, your ultimate destination for delightful dining
            experiences! We bring the world of culinary delights to your
            fingertips with our user-friendly food ordering website. Discover a
            diverse range of scrumptious dishes from local favorites to
            international cuisines, all curated for your discerning taste buds.
            With Yummify, enjoy the convenience of swift delivery and relish the
            promise of every meal being a delicious adventure. Elevate your
            dining journey – easy, quick, and always Yummified!"
          </p>
          <button className="mt-2  font-medium bg-red-600 text-yellow-300 px-2 py-2 rounded-full ml-0">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center ">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                );
              })}
        </div>
      </div>
      <div>
        <div className="flex  w-full items-center ">
          <h2 className="font-bold text-2xl text-yellow-400 my-1 mb-4">
            Special Lunch - Get it now while it's hot!
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={prevProduct}
              className="bg-yellow-300 hover:bg-yellow-300 text-lg p-1 rounded"
            >
              <GrCaretPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-yellow-300 hover:bg-yellow-300 text-lg p-1 rounded"
            >
              <GrCaretNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-aall"
          ref={slideProductRef}
        >
          {homeProductCartListLunch[0]
            ? homeProductCartListLunch.map((el) => {
                return (
                  <Cardfeatures
                    key={el._id +"lunch"}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <Cardfeatures loading="Loading..."key={index + "cart"} />
              ))}
        </div>
      </div>
      <div>
        <Allproduct heading={"Our categories"}/>
      </div>
    </div>
  );
};

export default Home;
