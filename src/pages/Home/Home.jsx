import React from 'react'
import ProductList from '../../components/productList/ProductList'
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>List of Products</h1>
      <button style={{backgroundColor:'lightgreen'}}>
      <Link to="/products">Add Product</Link>;

      </button>

      <ProductList/>
    </div>
  )
}

export default Home
