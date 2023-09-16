import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import Navigator from './HomePage/Navigator';
// import Header from './HomePage/Header';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faList } from '@fortawesome/free-solid-svg-icons';
// import Feature from './HomePage/Feature'

// library.add(faList);
// const App = () => {
//   return (
    
// <Feature/>
    
//   );
// };

// export default App;

// // import { StatusBar } from "expo-status-bar";
// // import { StyleSheet, Text, View } from "react-native";
// // import AppNavigator from "./Appnavigator";
// // import React from "react";

// // export default function App() {
// // 	return (
// //   <AppNavigator />)

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./Wellcome/AppNavigator";

export default function App() {
	return <AppNavigator />;
}