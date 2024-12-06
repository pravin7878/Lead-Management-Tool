import { createSlice} from "@reduxjs/toolkit";

// import actions
import { registerNewUser , loginUser } from "../actions/auth";


const initialState = {
  isRegister: false,
  isLogged: JSON.parse(localStorage.getItem("isLogged")) || false, // Check if user is logged in from localStorage
  user: JSON.parse(localStorage.getItem("user")) || {}, // Retrieve user data from localStorage
  isLoading: false,
  error: "",
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: () => initialState,
    logoutUser: (state) => {
      state.isLogged = false;
      state.user = {}
      state.error = ""
      state.isRegister = ""

      // Clear user data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isLogged");
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration Thunk
      .addCase(registerNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerNewUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || "Registration failed";
      })
      .addCase(registerNewUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isRegister = true;
        state.user = payload;
        state.error = "";
      })
      // Login Thunk
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || "Login failed";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLogged = true;
        state.user = payload;
        state.error = ""

        // Save user data and isLogged state to localStorage
        localStorage.setItem("user", JSON.stringify(payload));
        localStorage.setItem("isLogged", JSON.stringify(true));
      });
  },
});

export default authSlice.reducer;
export const { resetState, logoutUser } = authSlice.actions;
