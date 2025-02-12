import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartSliceStateItem = {
    id: string,
    name: string,
    unitPrice: number,
    quantity: number,
};

export type CartSliceState = {
    items: Array<CartSliceStateItem>,
    totalQuantity: number,
    totalPrice: number,
};

export const CART_SLICE_NAME = "CART_STATE";
const CART_SLICE_INITIAL_STATE: CartSliceState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
}
const CART_SLICE_REDUCERS = {
    /* I can mutate state because toolkit uses immer internally */
    addItemToCart: (state: CartSliceState, action: PayloadAction<CartSliceStateItem>): CartSliceState => {

        const found = state.items.find(item => item.id === action.payload.id);
        if (found) {
            found.quantity++;
            state.totalQuantity++;
            state.totalPrice += found.unitPrice;
            return state;
        }
        return {
            items: [...state.items, action.payload],
            totalQuantity: state.totalQuantity + 1,
            totalPrice: state.totalPrice + action.payload.unitPrice,
        }
    },

    removeItemFromCart: (state: CartSliceState, action: PayloadAction<CartSliceStateItem>): CartSliceState => {
        const found = state.items.find(item => item.id === action.payload.id);
        if (!found) return state;
        return {
            items: state.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0),
            totalQuantity: state.totalQuantity - 1,
            totalPrice: state.totalPrice - found.unitPrice,
        }
    },

    clearCart: (): CartSliceState => {
        return {
            items: [],
            totalPrice: 0,
            totalQuantity: 0,
        }
    },

    replaceCart: (_state: CartSliceState, action: PayloadAction<CartSliceState>) => {
        if (action.payload?.items)
            return action.payload;
        return CART_SLICE_INITIAL_STATE;
    }
}

const CART_SLICE_OPTIONS = {
    name: CART_SLICE_NAME,
    initialState: CART_SLICE_INITIAL_STATE,
    reducers: CART_SLICE_REDUCERS
};

const cartSlice = createSlice(CART_SLICE_OPTIONS);

export default { slice: cartSlice, name: cartSlice.name, actions: cartSlice.actions, reducer: cartSlice.reducer };