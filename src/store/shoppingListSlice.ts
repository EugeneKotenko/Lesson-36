import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  caption: string;
  amount: number;
}

export interface ShoppingListState {
  items: Item[];
}

const initialState: ShoppingListState = {
  items: [],
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push({ ...action.payload, id: Date.now() } as Item);
    },
    editItem: (state, action: PayloadAction<Item>) => {
      const editedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (editedItemIndex !== -1) {
        state.items[editedItemIndex] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addItem, editItem, deleteItem } = shoppingListSlice.actions;

const store = configureStore({
  reducer: {
    shoppingList: shoppingListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
