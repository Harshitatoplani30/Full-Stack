import React from 'react'
import { Link } from 'react-router-dom';
import { addCartitem ,deleteCartitem } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
const Cardfeatures = ({image,name,price,category,loading,id}) => {
  const dispatch = useDispatch()
  const handleaddcartProduct =(e)=>{
    dispatch(addCartitem({
      _id:id,
      image:image,
      name:name,
      price:price,
      category:category.toLowerCase(),
    
    }));
    
  }
  return (
    <div className='w-full min-w-xl  max-w-[200px] bg-slate-300  drop-shadow-2xl  rounded cursor-pointer gap-2.5 flex flex-col '>
       {
        image ? (
        <>
        <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top:"0",behavior:"smooth"})}>
        <div className='h-28 w-3xl justify-center flex mt-2'>
            <img src={image} alt="lunch" className='h-full AspectRatio  objectFit="contain"' />
        </div>
        
        <div className='flex flex-col  justify-center items-center ml-2'>
      <h3 className="font-semibold text-slate-600 text-center capitalize text-wrap text-lg  ">{name}</h3>
      <p className="text-sm font-medium text-gray-500 uppercase  text-center   ">{category}</p>
      <div className='text-right my-2 '>
      <span className="text-red-500">₹</span>
      <span className="">{price}</span>
      </div>
      </div>
      </Link>
      {/* <p className="text-center font-bold flex flex-wrap "><button className="bg-red-500 rounded-full text-white p-1 ">Buy Now</button><span className="text-red-500">₹</span><span className="">{price}</span></p> */}
      <div className="text-center font-bold flex justify-center items-center gap-5" >
      <button className="bg-yellow-300 hover:bg-yellow-500 rounded text-white p-1 my-2" onClick={handleaddcartProduct}>
        Add to cart</button>
      
        </div> 
        
       
        </> 
      
       ) :  (  
       <div className='w-screen h-40 bg-blue-701 bg-white animate-pulse rounded-md flex justify-center items-center'>
        {loading}</div>
        
       
       )}
     </div>    
   
   );
};
export default Cardfeatures;
        
   