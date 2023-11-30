import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { registerApi } from "../service/user";
import { validateEmail, validateFullName, validatePassword, validatePhoneNumber } from "../utils/validation";
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const handleRegister = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    const nameValidationResult = validateFullName(fullName);
    if (nameValidationResult) {
      setNameError(nameValidationResult);
      return;
    }
    const phoneValidationResult = validatePhoneNumber(phoneNumber);
    if (phoneValidationResult) {
      setPhoneNumberError(phoneValidationResult);
      return;
    }
    const emailValidationResult = validateEmail(email);
    if (emailValidationResult) {
      setEmailError(emailValidationResult);
      return;
    }

    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult) {
      setPasswordError(passwordValidationResult);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password and confirm password do not match.");
      return;
    }

    registerApi({
      fullName,
      email,
      password,
      phoneNumber
    })
      .then((response) => {
        console.log("Registration response:", response.data);
        Alert.alert(
          "Registration Success",
          "You have successfully registered."
        );
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Registration error:", error);

        Alert.alert(
          "Registration Failed",
          "An error occurred during registration. Please try again."
        );
      });
  };

  return (
    <View style={styles.container}>
        <AppBar 
        style={{ 
          backgroundColor: 'transparent',
          elevation: 0,
          marginTop: 20,
        }}
        title="Đăng kí"
        tintColor="Black"
        centerTitle={true}
        leading={props => (
          <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000" onPress={() => navigation.goBack()} />
        )}
      />
      {/* <Text style={styles.header}>Đăng ký</Text> */}
      <TextInput
        placeholder="Tên"
        style={styles.input}
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      {nameError && <Text style={styles.errorText}>{nameError}</Text>}
      <TextInput
        placeholder="Số điện thoại"
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      {phoneNumberError && <Text style={styles.errorText}>{phoneNumberError}</Text>}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <TextInput
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {confirmPasswordError && (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      )}

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 13,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#FA4A0C",
    borderRadius: 30,
    width: "80%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
