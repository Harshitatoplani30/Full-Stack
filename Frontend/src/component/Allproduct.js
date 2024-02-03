import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import Cardfeatures from "./Cardfeatures";
import { useSelector } from "react-redux";

const Allproduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];
  // console.log(categoryList);

  const [filterby, setFilterby] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const loadingArrayFeature = new Array(10).fill(null);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterby(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-yellow-300  mb-4">{heading}</h2>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                Category={el}
                key={el}
                isActive={el === filterby}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="w-screen h-40 bg-blue-701 bg-white animate-pulse rounded-md flex justify-center items-center">
            Loading....
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-14 my-5 ">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <Cardfeatures
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingArrayFeature.map((el ,index) => (
              <Cardfeatures loading="Loading..."key={index + "allproduct"} />
            ))}
      </div>
    </div>
  );
};

export default Allproduct;
