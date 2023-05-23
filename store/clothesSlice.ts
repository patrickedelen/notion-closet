// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const CLOTHES_TYPES = { top: 'TOP', bottom: 'BOTTOM', outer: 'OUTER', shoe: 'SHOE', other: 'OTHER' }

const initialState = {
    loading: true,
    data: [],
    error: '',
    formOpen: false,
    formType: '',
    newItem: {
        name: '',
        price: null,
        type: null,
        purchaseDate: null,
        photoB64: null
    }
}

export const getClothes = createAsyncThunk(
    'clothes/getClothes',
    async () => {
        console.log('Getting clothes')
        // return ["test"]
        // try {
        const data = await axios.get(
            `/api/getClothes`
        )
        return data.data
        // .then((clothes) => {
        //     console.log(clothes)
        //     return clothes.data
        // })
        // } catch (err: any) {
        // console.error("could not execute get clothes endpoint, here you go", err);
        // }
    }
)



// actions
// addToOutfit
// removeFromOutfit
// outfitToggleOpen
// submitOutfit
// clearOutfit

// add new clothes actions
// addLocalImage
// openPicker -> type
// closePicker
// setTitle
// setType
// setPurchaseDate
// setPrice
// uploadClothes



export const clothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        setClothes: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        setError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        setFormState: (state, action) => {
            state.formOpen = action.payload.formOpen
            state.formType = action.payload?.formType || null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClothes.pending, state => {
                state.loading = true
            })
            .addCase(getClothes.fulfilled, (state, action) => {
                console.log('getClothes fulfilled', action)
                state.loading = false
                state.data = action.payload
            })
    }
})

export const selectClothes = (state) => state.clothes.data
export const selectLoading = (state) => state.clothes.loading
export const selectError = (state) => state.clothes.error
export const selectItem = (state) => state.clothes.newItem
export const selectFormOpen = (state) => state.clothes.formOpen
export const selectFormType = (state) => state.clothes.formType

export const { setFormState } = clothesSlice.actions

export default clothesSlice.reducer