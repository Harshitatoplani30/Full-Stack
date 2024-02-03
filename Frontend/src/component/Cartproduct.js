import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteCartitem ,increaseqty,decreaseqty} from "../redux/productSlice";
const Cartproduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch()
  return (
    <div className="bg-slate-200 p-2 flex gap-5 rounded border border-slate-400 ">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} alt="" className="h-40 w-40 object-cover rounded " />
      </div>
      <div className="flex flex-col gap-2 w-full  ">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalizevtext-lg text-lg mt-1 md:text- xl">
            {name}
          </h3>
          <div className="cursor-pointer text-xl text-slate-800 hover:text-yellow-300"onClick={()=> dispatch(deleteCartitem(id))} >
            <MdDelete />
          </div>
        </div>
        <p className="text-sm font-base text-gray-500 uppercase  my-1">
          {category}
        </p>
        <p className=" font-bold  text-base flex flex-wrap ">
          <span className="text-red-500">₹</span>
          <span className="">{price}</span>
        </p>
        <div className="flex items-center justify-between ">
          <div className="flex item-center gap-2 p-1 ">
            <button onClick={()=>dispatch(increaseqty(id))}
            className="bg-slate-300 hover:bg-slate-400 rounded text-white  text-center p-1 my-2"
            >
              <FaPlus />
            </button>
            <span className="mt-1 font-semibold p-1">{qty}</span>
            <button
              onClick={()=>dispatch(decreaseqty(id))}
              className="bg-slate-300 hover:bg-slate-400 rounded text-white  text-center p-1 my-2"
            >
              <FaMinus />
            </button>
          </div>
          <div className="flex item-center gap-2 font-semibold text-slate-500">
            <p>Total:</p>
            <p className="font-bold pr-1 text-md">₹{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartproduct;
