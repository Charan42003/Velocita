import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    originn: {},
    destinationn: {},
    travelTimeInformation: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOriginn: (state, action) => {
            state.originn = action.payload;
        },
        setDestinationn: (state, action) => {
            state.destinationn = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    }
})

export const { setOriginn, setDestinationn, setTravelTimeInformation } = navSlice.actions;

//Selectors
export const selectOriginn = (state) => state.nav.originn;
export const selectDestinationn = (state) => state.nav.destinationn;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer