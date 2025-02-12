import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { CartActions, UiActions } from ".";
import { CartSliceState } from "./cart-slice";

export function fetchCart() {
    return async (dispatch: Dispatch<UnknownAction>) => {
        dispatch(UiActions.notify({ title: "Sending request", message: "Fetching cart from firebase", status: "PRENDING" }));
        try {
            const res = await fetch("https://test-db-b2b0f-default-rtdb.europe-west1.firebasedatabase.app/cart.json");
            if (!res.ok) {
                throw new Error;
            }
            const cart = await res.json();
            dispatch(CartActions.replaceCart(cart));
            dispatch(UiActions.notify({ title: "Success", message: "Data correctly retrived", status: "SUCCESS" }));
        } catch (error) {
            dispatch(UiActions.notify({ title: "Error", message: "Error: " + error, status: "ERROR" }));
        }
    }
}

export function putCart(state: CartSliceState) {
    return async (dispatch: Dispatch<UnknownAction>) => {
        dispatch(UiActions.notify({ title: "Sending update request", message: "Updating cart to firebase", status: "PRENDING" }));
        try {
            console.log(JSON.stringify(state))
            const res = await fetch("https://test-db-b2b0f-default-rtdb.europe-west1.firebasedatabase.app/cart.json", {
                method: "PUT",
                body: JSON.stringify(state),
                headers: {
                    "content-type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error;
            }
            dispatch(UiActions.notify({ title: "Success", message: "Data correctly retrived", status: "SUCCESS" }));
        } catch (error) {
            dispatch(UiActions.notify({ title: "Error", message: "Error: " + error, status: "ERROR" }));
        }
    }
}