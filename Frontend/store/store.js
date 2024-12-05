import {configureStore} from "@reduxjs/toolkit"
import authReduser from "./slices/authSlice"
import leadReduser from "./slices/leadSlice"

const store = configureStore({
  reducer: {
    auth: authReduser,
    leads: leadReduser,
  },
});

export default store