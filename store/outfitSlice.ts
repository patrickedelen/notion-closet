// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [
        // { id: 1, type: 'TOP' },
    ],
    loading: false,
    submitted: false,
    outfitFormOpen: false,
    notionUrl: null
}

// add thunk for dispatch create outfit
export const createOutfit = createAsyncThunk(
    'outfit/createOutfit',
    async (_, { getState }) => {

        const outfitItems = getState().outfit.items
        const clothesItems = getState().clothes.data

        const req = {}

        outfitItems.forEach(item => {
            req[item.type] = {
                id: item.id,
                url: clothesItems.find(clothesItem => clothesItem.id === item.id).heroUrl
            }
        })

        console.log('in action', outfitItems, clothesItems)
        console.log('req', req)

        try {

            const data = await axios.post(
                `/api/uploadOutfit`,
                req
            )
    
            console.log('in action', data)
            return data
        } catch (err) {
            console.log('got error in action', err)
        }
        return {
            status: "ok"
        }

        // try {
        //     const response = await fetch('/api/uploadOutfit', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(payload),
        //     });
        //     const data = await response.json();
        //     return data;
        // } catch (error) {
        //     return thunkAPI.rejectWithValue(error.message);
        // }
    }
);

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
            state.items = []
            state.headerBarOpen = false
            state.outfitFormOpen = false
            state.notionUrl = null
            state.submitted = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOutfit.pending, (state) => {
                state.loading = true
            })
            .addCase(createOutfit.fulfilled, (state, action) => {
                state.loading = false
                state.notionUrl = action.payload.data.url
                console.log('got fulfilled')
            })
    }
})

export const selectOutfitIds = (state) => state.outfit.items.map(item => item.id)
export const selectWearingCount = (state) => state.outfit.items.length
export const selectShowClothesBar = (state) => state.outfit.items.length > 0
export const clothesHeaderOpen = (state) => state.outfit.headerBarOpen
export const selectOutfitFormOpen = (state) => state.outfit.outfitFormOpen
export const selectNotionUrl = (state) => state.outfit.notionUrl

export const isWearingItem = (id) => (state) => {
    return state.outfit.items.filter(item => item.id === id).length > 0
}
export const isWearingType = (type) => (state) => {
    return state.outfit.items.filter(item => item.type === type).length > 0
}

export const { addItem, removeItem, setHeaderBarOpen, setOutfitFormOpen, resetState, replaceItem } = outfitSlice.actions

export default outfitSlice.reducer

