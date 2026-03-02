import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const selectCartTotals = createSelector([getCart], (cart) =>
  cart.reduce(
    (totals, item) => {
      totals.totalQuantity += item.quantity;
      totals.totalPrice += item.totalPrice;
      return totals;
    },
    { totalQuantity: 0, totalPrice: 0 },
  ),
);

export const getCartItemQuantityById = (pizzaId) =>
  createSelector([getCart], (cart) => {
    const item = cart.find((item) => item.pizzaId === pizzaId);
    return item ? item.quantity : 0;
  });
