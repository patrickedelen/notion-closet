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
        cost: null,
        type: null,
        age: null,
        imageB64: null,
    },
    itemUploading: false,
    uploadData: null,
    successScreenOpen: false
}

async function urltoFile(url, filename, mimeType){
    if (url.startsWith('data:')) {
        var arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], filename, {type:mime || mimeType});
        return Promise.resolve(file);
    }

    const res = await fetch(url)
    const buff = res.arrayBuffer()
    const newFile = new File([buff], filename, { type: mimeType })

    return newFile
    // return fetch(url)
    //     .then(res => res.arrayBuffer())
    //     .then(buf => new File([buf], filename,{type:mimeType}));
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

export const addItem = createAsyncThunk(
    'clothes/addItem',
    async (_, { getState }) => {
        const { 
            name,
            cost,
            type,
            age,
            imageB64,
        } = getState().clothes.newItem

        // console.log(name, cost, type, age, imageB64)
        const imageFile = await urltoFile(imageB64, 'tmp_image.png', 'image/png')
        console.log('img', imageFile)
        // return 'test'

        const formData = new FormData();
        try {
            formData.append("photo", imageFile);
            formData.append("cost", cost);
            formData.append("name", name);
            formData.append("timesWorn", "0");
            formData.append("type", type);
            formData.append("age", age);
    
            console.log('formData', formData)

        } catch (err) {
            console.error("could not execute addItem endpoint, here you go", err);
        }

        try {
            const data = await axios.post("/api/uploadImage", formData)
            console.log('got data back', data)
            return data.data

        } catch (err) {
            console.log('error', err)
            return 'err'
        }

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
            state.formType = action.payload?.formType || state.formType
        },
        setNewName: (state, action) => {
            state.newItem.name = action.payload
        },
        setGenericNew: (state, action) => {
            state.newItem[action.payload.type] = action.payload.data
        },
        setImage: (state, action) => {
            state.newItem.imageB64 = action.payload
        },
        setSuccessScreen: (state, action) => {
            state.successScreenOpen = action.payload
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
            .addCase(addItem.pending, state => {
                state.itemUploading = true
            })
            .addCase(addItem.fulfilled, (state, action) => {
                console.log('addItem fulfilled', action)
                state.itemUploading = false
                state.uploadData = action.payload
                state.successScreenOpen = true
            })
    }
})

export const selectClothes = (state) => state.clothes.data
export const selectLoading = (state) => state.clothes.loading
export const selectError = (state) => state.clothes.error
export const selectItem = (state) => state.clothes.newItem
export const selectFormOpen = (state) => state.clothes.formOpen
export const selectFormType = (state) => state.clothes.formType
export const selectNewItem = (state) => state.clothes.newItem

export const selectItemUploading = (state) => state.clothes.itemUploading
export const selectSuccessScreenOpen = (state) => state.clothes.successScreenOpen

export const { setFormState, setNewName, setGenericNew, setImage, setSuccessScreen } = clothesSlice.actions

export default clothesSlice.reducer