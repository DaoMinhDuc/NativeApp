import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import React from "react";

const Welcome = ({ navigation }) => {
	const handleLoginPress = () => {
	  navigation.navigate('Login'); 
	};
	return (
		
		<View style={styles.container}>
			 <View style={styles.circleContainer}>
			<Image
				source={require("./assets/logo-wellcome.png")}
				style={{ 
                    marginTop: 20,
                 }}
			/>
			</View>

			<View style={styles.foodText}>
			<Text  style={styles.text}>
				Food for Everyone
			</Text>
			</View>
			<View>
			<Image
				source={require("./assets/ToyFaces_Tansparent_BG_49.png")}
				style={styles.background1}
			/>
			<Image
				source={require("./assets/ToyFaces_Tansparent_BG_29.png")}
				style={styles.background2}
			/>
			</View>
			<View style={styles.fadeArea} />
			<View>
			<TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
			</View>
		</View>
	);
};


export default Welcome;

const styles = StyleSheet.create({

	circleContainer: {
		width: 73,
		height: 73,
		borderRadius: 73 / 2, 
		backgroundColor: 'white', 
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 56,
		marginLeft: 49,
	  },
	  image: {
		width: 50, 
		height: 50,
	  },
	  background1: {
		position: 'absolute', 
		left: 0,
		width: 200,
		height: 275,
		marginTop: 140,
		
	  },
	  background2: {
		position: 'absolute', 
		left: 170,
		width: 210,
		height: 240,
		marginTop: 190,
		resizeMode: 'contain'
		
	  },
	container: {
		flex: 1,
		backgroundColor: '#FF4B3A',
		
	  },
	  foodText:{
		position: 'absolute',
		marginTop: 160,
		height:140,
		marginLeft:51,
		marginRight:88,
		width:275,
	  },
	text: {
		// fontFamily: 'SFProRounded', 
		fontSize: 50,
		fontWeight: '800',
		lineHeight: 50, 
		letterSpacing: -1.95,
		color: 'white',
		
	  },
	   fadeArea: {
		position: 'absolute',
		width: 500,
		marginTop: 520,
    height: 45,
    backgroundColor: 'rgba(255, 71, 11, 0.51)', // Màu nền mờ với độ trong suốt
  },
	  button: {
		position: 'absolute',
		width: 314,
		height: 70,
		borderRadius: 30,
		backgroundColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center',
		left: '50%',
		marginTop: -20,
  transform: [{ translateX: -157 }],
		top: 500,
	  },
	  buttonText: {
		color: '#FF460A',
		fontSize: 20, 
	  },
});