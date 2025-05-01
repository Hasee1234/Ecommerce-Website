import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice"//here productReducer is a word that we made here it refers to  default export (productSlice.reducer) from your slice file.

//store has the reducer
export const store = configureStore({
    reducer:{//reducer handles events
        product:productReducer
        // productSlice:productReducer
        // add the reducer here 
    }
})
//first we make this store than we import provider from react-redux and wrap our app.jsx in provider(work done in main.jsx)
//then we pass the store in the provider as prop