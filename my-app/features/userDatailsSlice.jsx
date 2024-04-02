import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//create action

export const createUser = createAsyncThunk("createUser", async (data, {rejectWithValue})=>{
    try{
        const response = await axios.post("http://localhost:5000/singup",data);
        return response;
    }catch(error){
        return rejectWithValue(error);
    }


})

// read action
export const showUser = createAsyncThunk("showUser", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:5000/");
        return response.data; // Accessing data property directly
    } catch (error) {
        return rejectWithValue(error);
    }
});


//delete action/


export const deleteUser = createAsyncThunk("deleteUser", async(id, {rejectWithValue})=>{

    if (window.confirm("Are you sure you want to delete this item?")) {
        try {
            const response = axios.delete("http://localhost:5000/delete/"+id);
            return response;
            
        } catch (error) {
            return rejectWithValue(error);
        }
    }

    
})

// update action


export const updateUser = createAsyncThunk(
    "updateUser",
    async (data, { rejectWithValue }) => {
      // Data object ko check karein
      if (!data || typeof data.id === 'undefined') {
        console.log(data.id);
        return rejectWithValue('Invalid data provided');
      }
  
      // Aur agar data object aur id property sahi hain, to API request bhejein
      if (window.confirm("Are you sure want to update this message ")) {
        try {
          const response = await axios.put(`http://localhost:5000/update/${data.id}`, data);
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }
    }
  );
  

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        user: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
             .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const  id  = action.payload;
                if(id){
                    state.user = state.user.filter((d)=>d.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.user)) {
                    state.user = state.user.map((d) =>
                        d.id === action.payload.id ? action.payload : d
                    );
                } else {
                    // Handle the case where state.user is not an array
                    console.error("state.user is not an array");
                }
            })
            
            
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export default userDetail.reducer;