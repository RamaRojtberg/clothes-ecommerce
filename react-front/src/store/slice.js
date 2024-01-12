import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products:[]
    },
    reducers:{
        addProduct: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        updateQuantity: (state, action) => {
            const {index, newQuantity} = action.payload
            state.products[index].quantity = newQuantity
        },
        removeProduct: (state, action) => {
            const id = action.payload
            state.products = state.products.filter(valor =>
                valor.id !== id)
        }
    }
})

export const {addProduct} = cartSlice.actions
export const {updateQuantity} = cartSlice.actions
export const {removeProduct} = cartSlice.actions