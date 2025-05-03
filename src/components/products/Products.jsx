import React from 'react'
import Addproduct from '../addproduct/Addproduct'
import { Link, useParams } from "react-router";
import ProductList from '../productList/ProductList';
import { useSelector } from 'react-redux';

const Products = () => {
  const {id}=useParams();
  const product=useSelector((state)=>state.product.products.find((p)=>p.id===parseInt(id)))
  return (
    <div>
      <Addproduct existingProduct={product}/>
      {/* {!id && <ProductList/>} */}
      
    </div>
  )
}

export default Products
