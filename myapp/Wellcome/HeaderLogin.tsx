import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const HeaderLogin = ({ showLogin, showSignUp }) => {
  return (
    <View style={{ flex: 0.4 }}>
      <View style={styles.container}>
        <Image
          source={require("./assets/logo-wellcome.png")}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={showLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={showSignUp}>
            <Text style={styles.buttonText}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
     backgroundColor: '#FFF',
     justifyContent: 'center',
     alignItems: 'center',
     
   },
   image:{
     justifyContent: 'center',
     alignItems: 'center',
     width: 120,
     height: 140,
     marginTop: 50,
   },
   buttonContainer: {
     flexDirection: 'row',
 justifyContent: 'space-between', // Chia đôi chiều rộng và căn giữa
 paddingHorizontal: 20, // Khoảng cách giữa nút ở hai bên
 marginTop: 10, // Khoảng cách từ hình ảnh đến nút
     },
   button: {
    flex: 1, // Để chia đôi chiều rộng cho hai nút
 alignItems: 'center',
 backgroundColor: '#ffffff',
 paddingVertical: 10, // Khoảng cách dọc trong nút
 alignSelf: 'flex-end',
   },
   
   buttonText: {
     color: 'rgba(0, 0, 0, 0.79)',
     fontSize: 16,
     fontWeight: 'bold',
   },
});

export default HeaderLogin;
