// @ts-nocheck

import { createWrapper } from "next-redux-wrapper"
import { configureStore } from "@reduxjs/toolkit"
import { clothesSlice } from './clothesSlice'

export const makeStore = () => configureStore({
    reducer: {
        [clothesSlice.name]: clothesSlice.reducer,
    },
    devTools: true
})

export const wrapper = createWrapper(makeStore)

