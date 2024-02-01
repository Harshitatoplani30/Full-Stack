import React from "react";
import { Link } from "react-router-dom";
import { addCartitem ,deleteCartitem } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams } from "react-router-dom";


const HomeCard = ({name, image, category, price,loading,id}) => {
  const {filterby} = useParams();
  const productData = useSelector(state => state.product.productList);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  const handleBuy = ()=>{
    dispatch(addCartitem(productDisplay))
      navigate("/cart")
    };
    
  
  return (
    <div className="bg-white p-2 rounded  shadow-md min-w-[150px]">
      {
        name ? 
          <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top:"0",behavior:"smooth"})}>
          <div className="min-h-[120px] w-40">
        <img src={image} className="h-full w-full" />
        
      </div>
      <h3 className="font-semibold text-slate-600 text-center capitalize text-lg  mt-1">{name}</h3>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center my-1">{category}</p>
      <div className="text-center font-bold flex flex-wrap gap-12" >
      <button className="bg-red-500 rounded-full text-white p-1 " onClick={handleBuy}>Buy Now</button>
      <div>
      <span className="text-red-500">₹</span>
      <span className="">{price}</span>
      </div>
      
      </div>
          
      </Link>
          </>
         : (
        <div  className="flex justify-around items-center h-full ">
          
        <p>{loading}</p>
        </div>
      )}
    </div>
    
  );
;}

export default HomeCard;
