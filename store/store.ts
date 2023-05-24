// @ts-nocheck

import { createWrapper } from "next-redux-wrapper"
import { configureStore } from "@reduxjs/toolkit"

import { clothesSlice } from './clothesSlice'
import { outfitSlice } from "./outfitSlice"

export const makeStore = () => configureStore({
    reducer: {
        [clothesSlice.name]: clothesSlice.reducer,
        [outfitSlice.name]: outfitSlice.reducer
    },
    devTools: true
})

export const wrapper = createWrapper(makeStore)

