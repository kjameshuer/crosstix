import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const token = localStorage.getItem('crosstixToken');
const initialState = {
  isLoggedIn: (token) ? true : false,
  token: token
};

export const signUserIn = createAsyncThunk(
  'users/signin',
  async info => {
    const { email, password } = info;
    const response = await axios.post('/api/signin', {
      email: email,
      password: password
    })
    return response.data
  }
)

export const authSlice = createSlice({
  name: 'authInfo',
  initialState,  
  reducers: {
    logUserIn: state => {
      state.isLoggedIn = true;
    },
    logUserOut: state => {
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUserIn.fulfilled, (state, action) => {
      if (action.payload.token) {
        state.isLoggedIn = true;
        localStorage.setItem('crosstixToken', action.payload.token)
      }
    })
  },
});

export const { logUserOut } = authSlice.actions;

export default authSlice.reducer;
