// import React,{useState,useEffect} from 'react'
// import { useDispatch } from 'react-redux'
// import { addProduct, addProductAPIaction } from '../../store/slices/productSlice'
// import { useNavigate, useParams } from 'react-router-dom'

// const Addproduct = () => {
// const dispatch=useDispatch()
// const navigate=useNavigate()
// const id=useParams()

// const existingProduct = useSelector((state) =>
//   state.product.products.find((p) => p.id === parseInt(id))
// )

//     const [title, settitle] = useState("")
//     const [price, setprice] = useState("")
//     const [description, setdescription] = useState("")
//     const [image, setimage] = useState("https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg")
//     const [category, setcategory] = useState("")

//     useEffect(() => {
//       if (existingProduct) {
//         settitle(existingProduct.title || '');
//         setprice(existingProduct.price || '');
//         setdescription(existingProduct.description || '');
//         setimage(existingProduct.image || '');
//         setcategory(existingProduct.category || '');
//       }
//     }, [existingProduct]);

//     const onclickAddProduct=()=>{
//         let product={
//           id:existingProduct?.id,
//             title,
//             price,
//             description,
//             image,
//             category
//         }
        
//     }
//     const onclickAddProductAPI=()=>{
//         let product={
//             title,
//             price,
//             description,
//             image,
//             category
//         }
//     console.log("product in API",product)   
//     dispatch(addProductAPIaction(product)) 
//     }
    
    
//   return (
//     <div>
//       <h1>Add a product</h1>
      
//         <input type="text" placeholder='title' onChange={(e)=>settitle(e.target.value)}/>
//         <input type="text" placeholder='price' onChange={(e)=>setprice(e.target.value)}/>
//         <input type="text" placeholder='description' onChange={(e)=>setdescription(e.target.value)}/>
//         <input type="text" placeholder='category' onChange={(e)=>setcategory(e.target.value)}/>
//         <button onClick={onclickAddProduct}>Add</button>
//         <button onClick={onclickAddProductAPI}>Add in API</button>
      
//     </div>
//   )
// }

// export default Addproduct
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, addProductAPIaction, updateProduct } from '../../store/slices/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const existingProduct = useSelector((state) =>
    state.product.products.find((p) => p.id === parseInt(id))
  );

  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState('https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg');
  const [category, setcategory] = useState('');

  useEffect(() => {
    if (existingProduct) {
      settitle(existingProduct.title || '');
      setprice(existingProduct.price || '');
      setdescription(existingProduct.description || '');
      setimage(existingProduct.image || '');
      setcategory(existingProduct.category || '');
    }
  }, [existingProduct]);

  const onclickAddProduct = () => {
    const product = {
      id: existingProduct?.id,
      title,
      price,
      description,
      image,
      category,
    };

    if (id) {
      console.log('Updating product:', product);
      dispatch(updateProduct(product));
      navigate('/');
    } else {
      console.log('Adding product:', product);
      dispatch(addProduct(product));
      navigate('/');

    }
  };

  const onclickAddProductAPI = () => {
    const product = {
      title,
      price,
      description,
      image,
      category,
    };
    console.log('product in API', product);
    dispatch(addProductAPIaction(product));
  };

  return (
    <div>
      <h1>{id ? 'Edit Product' : 'Add a Product'}</h1>

      <input type="text" placeholder="title" value={title} onChange={(e) => settitle(e.target.value)} />
      <input type="text" placeholder="price" value={price} onChange={(e) => setprice(e.target.value)} />
      <input type="text" placeholder="description" value={description} onChange={(e) => setdescription(e.target.value)} />
      <input type="text" placeholder="category" value={category} onChange={(e) => setcategory(e.target.value)} />
      
      <button onClick={onclickAddProduct}>{id ? 'Update' : 'Add'}</button>
      {!id && <button onClick={onclickAddProductAPI}>Add in API</button>}
    </div>
  );
};

export default Addproduct;
