import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: localStorage.getItem("isDarkMode") === "true" || false,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", state.isDarkMode);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export const selectIsDarkMode = (state) => state.theme.isDarkMode;

export default themeSlice.reducer;
