import React from 'react'
import successImage from "../Assests/success.gif"

const Success = () => {
  return (
    <>
    <div className="flex flex-row  w-full justify-center item-center mt-10 p-10">
        <img src={successImage} className='w-full max-w-sm text-center'></img> 
    </div>
    <div>
    <p className='mt text-green-600 font-bold text-2xl text-center'>Payment successfully</p>
    <h3 className='text-gray-700 text-lg text-center text-blue-500 font-bold'>Enjoy Your Meal!</h3>
    </div>
    </>
  )
}

export default Success