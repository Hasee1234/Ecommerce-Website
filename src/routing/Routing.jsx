import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";  
import Home from '../pages/Home/Home';
import Products from '../components/products/Products';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/products",
    element: (
      <div>
        <Products />
      </div>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <div>
        <Products />
      </div>
    ),
  }
]);

const Routing = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default Routing; // Ensure export matches the component name
