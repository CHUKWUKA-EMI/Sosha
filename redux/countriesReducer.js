import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: null,
    selectedCountry: null,
  },
  reducers: {
    setCountries: (state, { payload }) => {
      console.log("countries", payload);
      state.countries = payload;
      state.selectedCountry = payload[0];
    },
    setSelectedCountry: (state, { payload }) => {
      state.selectedCountry = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCountries, setSelectedCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
