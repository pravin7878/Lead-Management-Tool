import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const getLeads = createAsyncThunk(
  "GET_LEADS",
  async ({ url, token, queryParams }, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: queryParams, 
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const createLead = createAsyncThunk(
  "ADD_LEADS",
  async ({ url, token, data }, { rejectWithValue ,dispatch}) => {
    try {
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getLeads())
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const deleteLead = createAsyncThunk(
  "DELETE_LEADS",
  async ({ url, token}, { rejectWithValue }) => {
    try {
      const res = await axios.delete(url,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const updateLead = createAsyncThunk(
  "UPDATE_LEADS",
  async ({ url, token, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);
