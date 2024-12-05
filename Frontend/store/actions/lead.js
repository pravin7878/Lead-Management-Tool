import {createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit"
import axios from "axios";

export const getLeads = createAsyncThunk(
  "GET_LEADS",
  async({ url, token }, { rejectWithValue })=>{
    try {
        const res = await axios(url , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        console.log(res.data);
        return res.data;
        
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);