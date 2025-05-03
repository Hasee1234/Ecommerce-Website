// import React from 'react';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";  
// import Home from '../pages/Home/Home';
// import Products from '../components/products/Products';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <div>
//         <Home />
//       </div>
//     ),
//   },
//   {
//     path: "/products",
//     element: (
//       <div>
//         <Products />
//       </div>
//     ),
//   },
//   {
//     path: "/products/:id",
//     element: (
//       <div>
//         <Products />
//       </div>
//     ),
//   }
// ]);

// const Routing = () => {
//   return (
//     <RouterProvider router={router} />
//   );
// }

// export default Routing; // Ensure export matches the component name
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import Products from '../components/products/Products';
import ProductList from '../components/productList/ProductList';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList/>} />
      <Route path="/addproducts" element={<Products />} />
      <Route path="/products/:id" element={<Products />} />
    </Routes>
  );
}

export default Routing;