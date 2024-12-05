import { createSlice } from "@reduxjs/toolkit";
import { getLeads } from "../actions/lead";

const initialState = {
  isLodding: false,
  Error: {isErr : false , message : ""},
  result: [],
};

const leadSlices = createSlice({
  name: "lead",
  initialState,
  extraReducers : (bulder)=>{
    bulder
     .addCase(getLeads.pending , (state)=>{
        state.isLodding = true
     })
     .addCase(getLeads.fulfilled , (state, {payload})=>{
           state.isLodding = false,
             state.Error = { isErr: false, message: "" },
               state.result = payload
     })
     .addCase(getLeads.rejected , (state,payload)=>{
        state.isLodding = false,
        state.Error.isErr = true,
        state.Error.message = payload || "something went wrong"
     })
  }
});


export default leadSlices.reducer
