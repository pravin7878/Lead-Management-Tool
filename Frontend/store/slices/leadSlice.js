import { createSlice } from "@reduxjs/toolkit";
import { createLead, deleteLead, getLeads, updateLead } from "../actions/lead";

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
      // tunk for gating leads
      .addCase(getLeads.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(getLeads.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.Error = { isErr: false, message: "" }),
          (state.result = payload);
      })
      .addCase(getLeads.rejected, (state, payload) => {
        (state.isLodding = false),
          (state.Error.isErr = true),
          (state.Error.message = payload || "something went wrong");
      })

      // tunk for adding leads
      .addCase(createLead.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(createLead.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.Error = { isErr: false, message: "" }),
          (state.result = payload);
      })
      .addCase(createLead.rejected, (state, payload) => {
        (state.isLodding = false), (state.result = {});
        (state.Error.isErr = true),
          (state.Error.message = payload || "something went wrong");
      })

      // tunk for update leads
      .addCase(updateLead.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(updateLead.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.Error = { isErr: false, message: "" }),
          (state.result = payload);
      })
      .addCase(updateLead.rejected, (state, payload) => {
        (state.isLodding = false), (state.result = []);
        (state.Error.isErr = true),
          (state.Error.message = payload || "something went wrong");
      })

      // tunk for remove lead
      .addCase(deleteLead.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(deleteLead.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.Error = { isErr: false, message: "" }),
          (state.result = payload);
      })
      .addCase(deleteLead.rejected, (state, payload) => {
        (state.isLodding = false), (state.result = []);
        (state.Error.isErr = true),
          (state.Error.message = payload || "something went wrong");
      });
  }
});


export default leadSlices.reducer
