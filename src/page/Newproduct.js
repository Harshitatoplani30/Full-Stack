import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { imageupload } from "../utility/imageupload";
import toast from "react-hot-toast";
const Newproduct = () => {

const [data , setData] = useState({

  name :"",
  category :"",
  image :"",
  price:"",
  description: ""
})
const handleOnchange = (e)=>{
  const {name , value} = e.target

  setData((prev)=>{
    return{
      ...prev,
        [name]:value }
      }
  )

}
  const uploadImage = async(e)=>{
    const data = await imageupload(e.target.files[0]);
    // console.log(data)


    setData((prev)=>{
      return{...prev,"image":data}
    })
  }
const handleSubmit = async (e)=>{
  e.preventDefault()
  console.log(data)

const {name , image , category , price} = data
 if(name && image && category&&price){
  const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
      },
      body:JSON.stringify(data),
  });
  const fetchRes = await fetchData.json()
  console.log(fetchRes)
  toast(fetchRes.message)

  setData(()=>{
    return{
      name :"",
      category :"",
      image :"",
      price:"",
      description: ""
    } 
    
 })
 }
 else{
  toast("Fill the riqured fields")
  console.log("required fields are empty")
 }




}

  return (
    <div className="p-4">
      <form  className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type={"text"} name="name" className="bg-blue-200 p-1 my-2 rounded" onChange={ handleOnchange} value={data.name}></input>

        <label htmlFor="category">Category</label>
        <select className="bg-blue-400 p-1 my-2 rounded" name="category" id="category" onChange={ handleOnchange} value={data.category} >
          <option value={"other"}>Select category</option>
          <option value={"breakfast"}>Breakfast</option>
          <option value={"snack"}>Snacks</option>
          <option value={"main"}>Main</option> 
          <option value={"lunch"}>Lunch with rice</option>
          <option value={"thali"}>Thalis</option>
          <option value={"desert"}>Deserts</option>
            <option value={"salads"}>Salads</option>
        </select>
        <label htmlFor="image">Image Upload
        <div className="h-40 w-full bg-blue-200 my-3 rounded border-red-500 flex justify-center items-center cursor-pointer ">
        {
          data.image ? <img src={data.image} className=" h-full overflow-hidden"/>  :<span  className="text-5xl "><BsCloudUpload /></span>
        }
        
        
        <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden"/>
        </div>
        </label>

        <label htmlFor="price" className=""  >Price</label>
        <input type='number' min="1" name='price' className="bg-blue-200 mt-1 mb-1 rounded " onChange={ handleOnchange} value={data.price}></input>

        <label htmlFor="description"> Description</label>
        <textarea rows={2} name="description" className="bg-blue-200 mt-1 rounded resize-none"  onChange={ handleOnchange} value={data.description}></textarea>
        <button className="w-auto mt-6 text-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-black bg-blue-200 hover:bg-blue-700 hover:text-white">Save</button>
        
      </form>
    </div>
  );
};

export default Newproduct;
