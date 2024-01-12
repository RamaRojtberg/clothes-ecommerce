import { configureStore } from "@reduxjs/toolkit"
import {cartSlice} from "./slice"

export default configureStore({
    reducer:{
        cart:cartSlice.reducer,
    }
})