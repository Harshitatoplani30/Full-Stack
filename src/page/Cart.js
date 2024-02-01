import React from "react";
import { useSelector } from "react-redux";
import Cartproduct from "../component/Cartproduct";
import cartImage from "../Assests/cart.gif"
import toast from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  console.log(productCartItem);

  const TotalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const TotalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
    // Strip Payment Intialization
  

  const handlePayment =async()=>{
    if(user.email){
    const stripePromise= await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)
      console.log(process.env.STRIPE_PUBLIC_KEY)
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(productCartItem)
    })
    if(res.statusCode === 500) return;
    const  data= await res.json();
    console.log(data)

    toast("Redirecting for the payment")
    stripePromise.redirectToCheckout({sessionId :  data})
   }
    else{
        toast('Something went wrong , Did you signed up?')
        setTimeout(()=>{
          navigate("/login")
        },1000)
      }
    

    
  }
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-yellow-400">
          Cart Items
        </h2>
        <p>{TotalQty} Item</p>

        { productCartItem[0] ?
          <div className="my-4 flex gap-3">
            {/* display cart items */}
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <Cartproduct
                    key={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                    id={el._id}
                    qty={el.qty}
                    total={el.total}
                  />
                );
              })}
            </div>

            {/* total cart items  and price details */}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">
                Order Summary
              </h2>
              <div className="w-full py-2 text-lg border-b">
                <span className="font-semibold ml-1">Total Item :</span>
                <span className="ml-20 p-10 font-bold">{TotalQty}</span>
              </div>
              <div className="w-full py-2 text-lg border-b">
                <span className="font-semibold ml-1">Total Amount :</span>
                <span className="text-red-500 ml-20">₹</span>
                <span className=" font-bold">{TotalPrice}</span>
              </div>
              <button className="bg-yellow-500 w-full text-lg font-bold text-white border border-slate-300 shadow" onClick={handlePayment}>
                Pay Now
              </button>
            </div>
          </div>
          : <>
          <div className="flex  w-full justify-center item-center ">
            <img src={cartImage} alt=""  className='w-full max-w-sm text-center'/>
        
          </div>
          <div>
            <p className='mt text-slate-600 font-bold text-2xl text-center'>Your Cart is Empty.</p>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Cart;
