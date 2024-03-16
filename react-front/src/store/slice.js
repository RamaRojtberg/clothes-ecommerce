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
            const {id, size, color} = action.payload
            let newProds = []

            state.products.forEach((value) => {
                if(value.id !== id){
                    //distinto ID
                    newProds.push(value)
                } else {
                    //mismo ID
                    if(value.size !== size){
                    //distinto SIZE
                    newProds.push(value)
                    } else {
                    //mismo SIZE
                    if(value.color !== color){
                        //distinto COLOR
                        newProds.push(value)
                    }
                    }
                }
            })

            state.products = newProds
        }
    }
})

export const feesSlice = createSlice({
    name:'fees',
    initialState: {
        fees:[{
            shipping: 0,
            tax: 0
          }]
    },
    reducers: {
        addFees: (state, action) => {
            state.fees = [action.payload]
        }
    }
})

export const firstCategoriesSlice = createSlice({
    name:'firstCategories',
    initialState: {
        firstCategories:[]
    },
    reducers: {
        addFirstCategories: (state, action) => {
            state.firstCategories = [action.payload]
        }
    }
})

export const secondCategoriesSlice = createSlice({
    name:'secondCategories',
    initialState: {
        secondCategories:[]
    },
    reducers: {
        addSecondCategories: (state, action) => {
            state.secondCategories = [action.payload]
        }
    }
})

export const thirdCategoriesSlice = createSlice({
    name:'thirdCategories',
    initialState: {
        thirdCategories:[]
    },
    reducers: {
        addThirdCategories: (state, action) => {
            state.thirdCategories = [action.payload]
        }
    }
})

export const {addProduct} = cartSlice.actions
export const {updateQuantity} = cartSlice.actions
export const {removeProduct} = cartSlice.actions

export const {addFees} = feesSlice.actions

export const {addFirstCategories} = firstCategoriesSlice.actions

export const {addSecondCategories} = secondCategoriesSlice.actions

export const {addThirdCategories} = thirdCategoriesSlice.actions