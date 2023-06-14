// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    items: [
        // { id: 1, type: 'TOP' },
    ],
    loading: false,
    submitted: false,
    outfitFormOpen: false,
}

// add thunk for dispatch create outfit

export const outfitSlice = createSlice({
    name: 'outfit',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push({
                id: action.payload.id,
                type: action.payload.type,
            })
        },
        removeItem: (state, action) => {
            console.log()
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        replaceItem: (state, action) => {
            state.items = state.items.map(item => {
                if (item.type === action.payload.type) {
                    return {
                        ...item,
                        id: action.payload.id,
                    }
                }
                return item
            })
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

export const selectOutfitIds = (state) => state.outfit.items.map(item => item.id)
export const selectWearingCount = (state) => state.outfit.items.length
export const selectShowClothesBar = (state) => state.outfit.items.length > 0
export const clothesHeaderOpen = (state) => state.outfit.headerBarOpen
export const selectOutfitFormOpen = (state) => state.outfit.outfitFormOpen

export const isWearingItem = (id) => (state) => {
    return state.outfit.items.filter(item => item.id === id).length > 0
}
export const isWearingType = (type) => (state) => {
    return state.outfit.items.filter(item => item.type === type).length > 0
}

export const { addItem, removeItem, setHeaderBarOpen, setOutfitFormOpen, resetState, replaceItem } = outfitSlice.actions

export default outfitSlice.reducer

