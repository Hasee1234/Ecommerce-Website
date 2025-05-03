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

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    category: ''
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        title: existingProduct.title || '',
        price: existingProduct.price || '',
        description: existingProduct.description || '',
        image: existingProduct.image || '',
        category: existingProduct.category || ''
      });
    }
  }, [existingProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      ...formData,
      id: existingProduct?.id,
      price: parseFloat(formData.price) || 0
    };

    if (id) {
      dispatch(updateProduct(product));
      navigate('/products');
    } else {
      dispatch(addProduct(product));
      navigate('/products');
    }
  };

  const handleApiSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductAPIaction(formData));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-stone-700 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center text-amber-400 mb-6">
        {id ? 'Edit Product' : 'Add New Product'}
      </h1>
      
      <form className="space-y-4">
        <div>
          <label className="block text-stone-200 mb-1">Product Image</label>
          <input 
            type="text" 
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-stone-600 text-stone-200 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-stone-200 mb-1">Title</label>
          <input 
            type="text" 
            name="title"
            placeholder="Enter product title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-stone-600 text-stone-200 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        <div>
          <label className="block text-stone-200 mb-1">Price ($)</label>
          <input 
            type="number" 
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-stone-600 text-stone-200 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-stone-200 mb-1">Description</label>
          <textarea 
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-stone-600 text-stone-200 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-stone-200 mb-1">Category</label>
          <input 
            type="text" 
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-stone-600 text-stone-200 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-stone-900 font-medium py-2 px-4 rounded-md transition-colors"
          >
            {id ? 'Update Product' : 'Add Product'}
          </button>
          
          {!id && (
            <button
              type="button"
              onClick={handleApiSubmit}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Add to API
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Addproduct;