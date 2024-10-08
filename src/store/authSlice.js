import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState = loadState() || {
    loggedIn: false,
    userRole: null,
    userId: null,
    userName: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.userRole = action.payload.userRole;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            // Save to localStorage
            localStorage.setItem('authState', JSON.stringify(state));
        },
        logout: (state) => {
            state.loggedIn = false;
            state.userRole = null;
            state.userId = null;
            state.userName = null;
            // Clear from localStorage
            localStorage.removeItem('authState');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthenticated = (state) => state.auth.loggedIn;
export const selectUser = (state) => state.auth.userName;
export const selectUserRole = (state) => state.auth.userRole;