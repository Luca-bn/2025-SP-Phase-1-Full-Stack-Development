import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Notification = { status: string, title: string, message: string };
export type UiSliceState = {
    showCart: boolean,
    notification?: Notification,
}

export const UI_SLICE_NAME = "UI_STATE";
const UI_SLICE_INITIAL_STATE = {
    showCart: false,
}
const UI_SLICE_REDUCERS = {
    /* I can mutate state because toolkit uses immer internally */
    toggleCart: (state: UiSliceState) => {
        state.showCart = !state.showCart;
        return state;
    },

    notify: (state: UiSliceState, action: PayloadAction<Notification>) => {
        state.notification = action.payload;
        return state;
    }
}

const UI_SLICE_OPTIONS = {
    name: UI_SLICE_NAME,
    initialState: UI_SLICE_INITIAL_STATE,
    reducers: UI_SLICE_REDUCERS,
}

const uiSlice = createSlice(UI_SLICE_OPTIONS);

export default { slice: uiSlice, name: uiSlice.name, actions: uiSlice.actions, reducer: uiSlice.reducer };