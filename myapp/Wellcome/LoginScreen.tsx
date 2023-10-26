import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Thực hiện xử lý đăng nhập
    try {
      // Gửi yêu cầu đăng nhập đến máy chủ với thông tin email và password
      const response = await axios.post('YOUR_LOGIN_ENDPOINT', {
        email: email,
        password: password,
      });

      // Kiểm tra phản hồi từ máy chủ
      if (response.data.success) {
        // Lưu thông tin đăng nhập, ví dụ: token
        await AsyncStorage.setItem('userToken', response.data.token);

        // Chuyển đến trang chính hoặc trang bạn muốn
        navigation.navigate('Home'); 
      } else {
        Alert.alert('Đăng nhập không thành công', 'Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng nhập.');
    }
    // navigation.navigate('HomeTabs')
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.4 }}>
        <View style={styles.container}>
          <Image
            source={require("./assets/logo-wellcome.png")}
            style={styles.image}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.buttonText}>Sign-up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
      </View>
      <View style={{ flex: 0.45 }}>
        <View style={styles.login}>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.15, alignItems: 'center' }}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 140,
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'rgba(0, 0, 0, 0.79)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingLeft: 10,
  },
  forgotPasswordButton: {
    marginRight: '40%',
  },
  forgotPasswordText: {
    marginTop: 30,
    color: '#FA4A0C',
  },
  loginButton: {
    backgroundColor: '#FA4A0C',
    borderRadius: 30,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
