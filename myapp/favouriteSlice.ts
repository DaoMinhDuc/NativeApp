import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  itemId: string;
  itemName: string;
  cost: string;
  description: string;
  imageUrl: string;
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as FavoriteItem[],
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
      // Check if the item is not already in favorites
      if (!state.some(item => item.itemId === action.payload.itemId)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      // Remove the item from favorites by itemId
      return state.filter(item => item.itemId !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
