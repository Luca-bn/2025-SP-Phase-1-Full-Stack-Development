import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import CartSlice, { CartSliceState, CART_SLICE_NAME } from "./cart-slice";
import UiSlice, { UiSliceState, UI_SLICE_NAME } from "./ui-slice";

export function useSelectorCart() {
    return useSelector<{ [CART_SLICE_NAME]: CartSliceState }, CartSliceState>((state) => state[CART_SLICE_NAME]);
}

export function useSelectorUi() {
    return useSelector<{ [UI_SLICE_NAME]: UiSliceState }, UiSliceState>((state) => state[UI_SLICE_NAME]);
}

export const CartActions = CartSlice.actions;
export const UiActions = UiSlice.actions;

export default configureStore({
    reducer: {
        [CartSlice.name]: CartSlice.reducer,
        [UiSlice.name]: UiSlice.reducer,
    } as any
});