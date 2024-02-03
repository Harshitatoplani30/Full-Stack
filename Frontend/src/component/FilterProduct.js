import React from 'react'
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({Category,onClick,isActive}) => {
  return (
    <div onClick={onClick} className=''>
    <div className={`text-3xl p-5 bg-red-500 rounded-full cursor-pointer ${isActive && "text-white bg-yellow-500"}`}>
        <CiForkAndKnife />
        </div>
        <p className='text-center font-medium my-1 capitalize '>{Category}</p>
    </div>
  )
}

export default FilterProduct