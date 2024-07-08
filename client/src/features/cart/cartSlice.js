import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  amount: 0,
  total: 0,
  isLoading: true,
  data: [],
};

export const getAllProducts = createAsyncThunk(
  "cart/getAllProducts",
  async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL + "/products"
      );
      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, amount } = action.payload;
      console.log("Current data:", state.data);
      let existingItem = state.cartItems.find((item) => item._id === id);

      if (existingItem) {
        existingItem.amount += amount;
      } else {
        const newItem = state.data.find((item) => item._id === id);
        if (newItem) {
          state.cartItems.push({ ...newItem, amount });
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseItem: (state, action) => {
      const newItems = state.cartItems
        .map((item) => {
          if (item._id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0);
      state.cartItems = newItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseItem: (state, action) => {
      const newItems = state.cartItems.map((item) => {
        if (action.payload === item._id) {
          if (item.amount >= item.totalAmount) {
            toast("The selected quantity exceed your purchase limit", {
              type: "error",
              draggable: false,
            });
            return { ...item, amount: item.totalAmount };
          }
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      state.cartItems = newItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotalAmount: (state) => {
      let { amount, total } = state.cartItems.reduce(
        (a, c) => {
          a.amount += c.amount;
          a.total += a.amount * c.price;
          return a;
        },
        {
          amount: 0,
          total: 0,
        }
      );
      state.amount = amount;
      state.total = total;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.isLoading = false;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.data = [];
        state.isLoading = false;
      });
  },
});

export const {
  addItem,
  removeItem,
  decreaseItem,
  increaseItem,
  getTotalAmount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
