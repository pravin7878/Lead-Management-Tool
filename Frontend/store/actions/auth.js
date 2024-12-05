import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit"


// hendel registeration
export const registerNewUser = createAsyncThunk(
  "auth/registerNewUser",
  async ({ url, userData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(url, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// hendel login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ url, userData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(url, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const loginAdmin = createAsyncThunk("auth/loginAdmin" , async ({url , adminData} , {rejectWithValue}) => {
  try {
    const res = await axios.post(url, adminData)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : err.message);
  }
})
