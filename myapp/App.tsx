import React from 'react';
import AppNavigator from "./Navigation/AppNavigator";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favouriteSlice';

const store = configureStore({
	reducer: {
	  favorites: favoritesReducer,
	},
  });
  
  const App: React.FC = () => (
	<Provider store={store}>
	  <AppNavigator />
	</Provider>
  );
  
  export default App;