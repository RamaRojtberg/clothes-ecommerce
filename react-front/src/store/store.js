import { configureStore } from "@reduxjs/toolkit"
import {cartSlice} from "./slice"
import {feesSlice} from "./slice"
import {firstCategoriesSlice} from "./slice"
import {secondCategoriesSlice} from "./slice"
import {thirdCategoriesSlice} from "./slice"

export default configureStore({
    reducer:{
        cart:cartSlice.reducer,
        fees:feesSlice.reducer,
        firstCategories:firstCategoriesSlice.reducer,
        secondCategories:secondCategoriesSlice.reducer,
        thirdCategories:thirdCategoriesSlice.reducer
    }
})