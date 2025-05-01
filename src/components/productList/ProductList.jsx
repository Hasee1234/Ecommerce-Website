import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, deleteProductApiAction, fetchProducts, updateProduct } from '../../store/slices/productSlice'
import { useNavigate } from 'react-router-dom'




const ProductList = () => {
  const navigate=useNavigate()
    useEffect(() => {
        if(products.length === 0)
      dispatch(fetchProducts())
    }, [])
    
  const products = useSelector((state) => state.product.products); //product is the slice name that we write in store for importing it in store and
  //products is the initial state where we written as products are emptty[]
  // Access products correctly
  // const products=useSelector(store=>store.productslice.products)
  console.log("products in component",products)
  const dispatch= useDispatch();
  //it gets the actions from productSllice and then we use dispatch() in functions and pass that specific function in paramter of dispatch call
  const onClickDeleteProduct=(id)=>{//we first make the action in slice of delete then dispatch here
    console.log("delete product id",id)
    dispatch(deleteProduct(id))
  }
  const onClickDeleteProductApi=(id)=>{//this delete will delete product from API
    console.log("delete product id",id)
    dispatch(deleteProductApiAction(id))
  }

  const onClickUpdateProduct=(id)=>{
    console.log("update product id",id);

    // dispatch(updateProduct(id))
    navigate(`/products/${id}`)//this will navigate to the products page and then we will get the id in that page and then we will use it to get the data from API and then we will update it
  }

  const onClickGetProducts=()=>{
    dispatch(fetchProducts())
  }
  return (
    <div>
      {/* <button onClick={onClickGetProducts}>Get products</button> */}
      {products.map(product=>{
        return (

          <div key={product.id} style={{display:'flex',flexDirection:'row'}}>
            <div>
          <img style={{width:100,padding:10}} src={product.image} alt="image" />
            </div>
            <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button style={{backgroundColor:'gray',margin:5}} onClick={()=>onClickDeleteProduct(product.id)}>Delete</button>
          <button style={{backgroundColor:'gray',margin:5}} onClick={()=>onClickDeleteProductApi(product.id)}>Delete from API</button>
          <button style={{backgroundColor:'gray'}} onClick={()=>onClickUpdateProduct(product.id)}>Update</button>
          <hr />
          
            </div>
        </div>
        )
      })}

    </div>
  )
}

export default ProductList
