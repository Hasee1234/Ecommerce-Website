import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, deleteProductApiAction, fetchProducts } from '../../store/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const search = useSelector((state) => state.product.search); // 👈 use search from redux state

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  ); // 👈 filter based on search

  const onClickDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const onClickDeleteProductApi = (id) => {
    dispatch(deleteProductApiAction(id));
  };

  const onClickUpdateProduct = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className='bg-stone-600 text-stone-200 min-h-screen p-5'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProducts.map(product => (
            <div key={product.id} className='bg-stone-700 rounded-lg overflow-hidden shadow-lg flex flex-col h-full transition-transform hover:scale-[1.02]'>
              <div className='p-4 flex justify-center bg-white'>
                <img className='object-contain h-48 w-full' src={product.image} alt={product.title} loading='lazy' />
              </div>
              <div className='p-4 flex-grow'>
                <h2 className='text-xl font-bold text-stone-100 mb-2 line-clamp-2'>{product.title}</h2>
                <p className='text-stone-300 mb-3 line-clamp-3'>{product.description}</p>
                <p className='text-amber-400 font-bold text-lg'>${product.price}</p>
              </div>
              <div className='p-4 bg-stone-800 flex flex-wrap gap-2'>
                <button onClick={() => onClickDeleteProduct(product.id)} className='bg-stone-500 hover:bg-stone-600 text-white py-2 px-4 rounded-md transition-colors flex-grow min-w-[100px]'>Delete</button>
                <button onClick={() => onClickDeleteProductApi(product.id)} className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors flex-grow min-w-[100px]'>Delete API</button>
                <button onClick={() => onClickUpdateProduct(product.id)} className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex-grow min-w-[100px]'>Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
