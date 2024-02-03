import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Allproduct from '../component/Allproduct'
import { addCartitem } from '../redux/productSlice'

const Menu = () => {
  const {filterby} = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector(state => state.product.productList);
  // console.log(productData)

  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  const handleaddcartProduct =(e)=>{
    dispatch(addCartitem(productDisplay));}

    const handleBuy = (e)=>{
      dispatch(addCartitem(productDisplay))
        navigate("/cart")
    
  }
  // console.log(productDisplay)
  return (
    <div className='p-2 md:p-4 '>
      <div className='w-full bg-white max-w-4xl m-auto md:flex AspectRatio="3/2" objectFit="contain"' >
        <div className='max-w-md  overflow:hidden w-full p-1'>
          <img src={productDisplay.image} className='hover:scale-95 transition-"all" h-full '/>
        </div>
        <div className='flex flex-col gap-2  '>
        <h3 className="font-semibold text-slate-600  capitalizevtext-lg text-2xl mt-1 md:text-4xl">{productDisplay.name}</h3>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider text-2xl my-1">{productDisplay.category}</p>
      <p className=" font-bold flex flex-wrap ">
      <span className="text-red-500">₹</span>
      <span className="">{productDisplay.price}</span>
      </p>
      <div className='flex gap-3 '>
      <button onClick={handleBuy} className="bg-red-500 hover:bg-red-700 rounded text-white min-w-[100px] p-1 my-2">Buy Now</button>
      <button onClick={handleaddcartProduct} className="bg-yellow-400 hover:bg-yellow-500 rounded text-white min-w-[100px] p-1 my-2">Add to cart</button>
        </div>
      <div className='flex flex-col max-w-2xl'>
        <p className='text-slate-500 font-medium '>Description:</p>
        <p className=''>{productDisplay.description}</p>
      </div>
        </div>
        {/* <h1>{productDisplay.name}</h1> */}
      </div>

      <Allproduct heading={"Related Product"}/>
    </div>
  )
}

export default Menu