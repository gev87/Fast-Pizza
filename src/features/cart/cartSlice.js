import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      console.log('Adding item to cart', action.payload, state.cart);
      // payload= newItem
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      } else {
        const newItem = {
          ...action.payload,
          totalPrice: action.payload.unitPrice,
        };
        state.cart.push(newItem);
      }
    },
    deleteItem(state, action) {
      //payload = id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      } else {
        state.cart = state.cart.filter((i) => i.pizzaId !== action.payload);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state) => state.cart.cart;

export const selectCartTotals = createSelector([selectCart], (cart) =>
  cart.reduce(
    (totals, item) => {
      totals.totalQuantity += item.quantity;
      totals.totalPrice += item.totalPrice;
      return totals;
    },
    { totalQuantity: 0, totalPrice: 0 },
  ),
);
