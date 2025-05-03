import React from 'react'
import ProductList from '../../components/productList/ProductList'
import { Link } from "react-router";
import banner2 from "../../assets/banner2.jpg"
const Home = () => {
  return (
    <div>
      <div className=" shadow-stone-900 shadow-2xl  rounded-2xl w-full max-w-7xl mx-auto my-4">
        <img 
          className="w-full h-[200px] sm:h-[300px] md:h-[350px] object-cover rounded-lg shadow-2xl"
          src={banner2}
          alt="Promotional Banner"
        />
      </div>
      <ProductList/>
    </div>
  )
}

export default Home
