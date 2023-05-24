// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    itemIds: [],
    loading: false,
    submitted: false,
    headerBarOpen: false,
    outfitFormOpen: false,
}

// add thunk for dispatch create outfit

export const outfitSlice = createSlice({
    name: 'outfit',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.itemIds.push(action.payload);
        },
        removeItem: (state, action) => {
            state.itemIds = state.itemIds.filter(id => id !== action.payload);
        },
        setHeaderBarOpen: (state, action) => {
            state.headerBarOpen = action.payload;
        },
        setOutfitFormOpen: (state, action) => {
            state.outfitFormOpen = action.payload;
        },
        resetState: (state) => {
            console.log('resetState');
            state.itemIds = []
            state.headerBarOpen = false
            state.outfitFormOpen = false
        }
    }
})

export const selectOutfitIds = (state) => state.outfit.itemIds
export const selectShowClothesBar = (state) => state.outfit.itemIds.length > 0
export const clothesHeaderOpen = (state) => state.outfit.headerBarOpen
export const selectOutfitFormOpen = (state) => state.outfit.outfitFormOpen

export const isWearingItem = (id) => (state) => {
    return state.outfit.itemIds.includes(id)
}

export const { addItem, removeItem, setHeaderBarOpen, setOutfitFormOpen, resetState } = outfitSlice.actions

export default outfitSlice.reducer

