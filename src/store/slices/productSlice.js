import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
//createSlice is a defined function of redux that we use to make slice
//create async thunk to make action fror extra reducer

// createAsyncThunk is a function
export const fetchProducts= createAsyncThunk(
    "product/fetchProducts",//this is the name of action which is first parameter of function
    async () =>{//this is 2nd parameter which is a function async function coz it will take time to take time from internet
        const response = await fetch("https://fakestoreapi.com/products")//fetch is a function of js which gets the data from API url or from internet
        const data= await response.json();//here from response we will read json and then json  will getsinto  data
        console.log("data in fetchproducts action",data)
        return data;//here the data returns
        // now the whole data is in fetchProducts
    }
)
//new action to delete product from APi
export const deleteProductApiAction=createAsyncThunk(
    "product/delete Product",
    async(id)=>{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`,{//it will pass that id of product that we want to delete
            method: "DELETE",//this will delete
        });
        const data=await response.json();
        console.log("data in deleteProduct action",data)
        // return id;
        return data;
        // now add this in extra reducer as new builder
    }
)

export const addProductAPIaction = createAsyncThunk(
    "product/addProduct",
    async (product) => {
        const response = await fetch("'https://fakestoreapi.com/products/1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product), // Convert product object to JSON string
        });
        const data = await response.json();
        console.log("data in addProduct action", data);
        return data;
    }
);

export const updateProductAPIaction = createAsyncThunk(
    "product/updateProduct",
    async (product) => {
        const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product), // Convert product object to JSON string
        });
        const data = await response.json();
        console.log("data in updateProduct action", data);
        return data;
    }
)


const productSlice=createSlice({
    //here name and initialstate are parameters
    name:"product",
    initialState:{//initial state is the state that is at start like in a counter it is zero
        products:[],
    },
    reducers:{//this reducer is function that will handle function of that particular slice
        deleteProduct:(state,action)=>{//state is current value like initial value that is not changed still then you will perfform action on it and you have passed it in parameter of function in app.jsx or any other comp
            // state.products=state.products.filter(
            //     product=>product.id !== action.payload
            // )
            let id=action.payload;
            console.log("id in delete product",id)

            let filteredProducts=state.products.filter(product=>product.id !== id)

            state.products=filteredProducts;
        },
        updateProduct: (state, action) => {
            const { id, title, price, description, categories, image } = action.payload; // Destructure the payload
            const existingProduct = state.products.find((product) => product.id === id); // Find the product by id
        
            if (existingProduct) {
                // Update the product fields if it exists
                existingProduct.title = title;
                existingProduct.price = price;
                existingProduct.description = description;
                existingProduct.categories = categories;
                existingProduct.image = image;
            }
        },
        addProduct:(state,action)=>{
            console.log("action in addProduct",action.payload)
            state.products=[action.payload,...state.products]
        }
        ,
        
        // to  use data from component,make action and reducer itself and we have exported down
        setProducts:(state,action)=>{//setproducts is name of action
            // state will give the state of that particular slice
            // action will give the data from component here 
            state.products=action.payload
        },
    },
    extraReducers:builder=>{
        //add extra reducer here,have to make 
        // now data is given to this extra reducer in the fetchProducts that we made up
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            // builder.addCase to add cases 
            // [fetchProducts.fulfilled] this is also the name of action but it acts like key of object 
            // state will give the state of that particular slice
            // action will give the data from internet here 
            console.log("fetch products in reducer",action.payload)
            state.products=action.payload;

        },)
        builder.addCase(deleteProductApiAction.fulfilled,(state,action)=>{
            console.log("delete product from API in reducer",action.payload)
            
            let id=action.payload.id;
            let filteredProducts=state.products.filter(product=>product.id !== id)
            state.products=filteredProducts;
        },)
        builder.addCase(addProductAPIaction.fulfilled, (state, action) => {
            console.log("add Product in reducer", action.payload);
            state.products = [action.payload, ...state.products];
        },)
        builder.addCase(updateProductAPIaction.fulfilled,(state,action)=>{
            const updated=action.payload;
            const index=state.products.findIndex(product=>product.id===updated.id)
            if(index!==-1){
                state.products[index]=updated;
            }
        });
        
    }
      
})

export const {setProducts,deleteProduct,updateProduct,addProduct} = productSlice.actions//here we are exporting the actions(which are said events by events) of this slice that is setproducts like in a counter app we will export the increment and decrement and write them in that curly bracket
export default productSlice.reducer//here we are exporting the reducer this is not that parameter reducers