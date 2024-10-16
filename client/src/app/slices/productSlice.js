import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// get properties list
export const getProducts = createAsyncThunk('product/list', async (data) => {
    try {
        return await axios.get('https://dummyjson.com/products', { params: data }).then((res) => res.data);
    } catch (error) {
        throw error;
    }
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        status: "pending",
        loading: false,
        meta: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            console.log('pending');
            state.status = "loading"
            state.loading = true;
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.loading = true;
            state.status = "succeeded"
            state.meta = action.payload;
        }).addCase(getProducts.rejected, (state, action) => {
            console.log('rejected');
            state.loading = false;
            console.log(action);
        });
    }
});

export default productSlice.reducer;
