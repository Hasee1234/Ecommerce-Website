import React, { useState } from 'react';
import image from '../../assets/logo.png';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../store/slices/productSlice';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const products=useSelector(state=>state.product.products)
  const dispatch=useDispatch()
  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value))
    
  }

  return (
    <nav className="bg-stone-700 text-stone-200 px-4 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <img className="h-10 w-auto mr-2" src={image} alt="Store Logo" />
          <span className="text-xl font-bold hidden sm:inline">Hasee-Store</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/">
          <a className="hover:text-amber-400">Home</a>
          </Link>
          <Link to="/products"><a className="hover:text-amber-400">Products</a></Link>
          <Link to="addproducts"><a className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-medium py-2 px-4 rounded-md">
            Add Product
          </a></Link>
        <input type="text" onChange={handleSearch} className='bg-white text-stone-600 block py-1.5 focus:shadow-lg focus:shadow-gray-900 px-4 rounded-md' placeholder='search item'/>          
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-stone-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-3">
          <Link to="/"><a className="block py-2 px-4 hover:bg-stone-600 rounded-md">Home</a></Link>
          <Link to="/products"><a  className="block py-2 px-4 hover:bg-stone-600 rounded-md">Products</a></Link>
          <input type="text" onChange={handleSearch} className='bg-white text-stone-600 block py-1.5 focus:shadow-lg focus:shadow-gray-900 px-4 rounded-md' placeholder='search item'/>          
          <Link to="/products"><a href="#add-product" className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-stone-900 font-medium py-2 px-4 rounded-md"> Add Product</a></Link>

          
        </div>
      )}
    </nav>
  );
};

export default Navbar;