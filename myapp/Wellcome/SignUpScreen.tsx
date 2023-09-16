import React from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from 'axios';

const schema = Yup.object().shape({
    name: Yup.string().required("Tên là trường bắt buộc"),
    phone: Yup.string()
      .required("Số điện thoại là trường bắt buộc")
      .matches(/^\d+$/, "Số điện thoại chỉ chứa số"),
    email: Yup.string().required("Email là trường bắt buộc").email("Email không hợp lệ"),
    password: Yup.string().required("Mật khẩu là trường bắt buộc").min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu không khớp"),
  });

const SignUpScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  

  const onSubmit = async (data) => {
    try {
      // Gửi dữ liệu đăng ký đến API
      const response = await axios.post('http://localhost:8080/api/auth/signup', data);
  
      // Kiểm tra phản hồi từ API
      if (response.status === 200) {
        // Đăng ký thành công, bạn có thể thực hiện các tác vụ khác ở đây nếu cần
        console.log('Đăng ký thành công');
        
        // Sau khi đăng ký thành công, bạn có thể điều hướng về trang đăng nhập
        navigation.navigate('Login');
      } else {
        // Xử lý lỗi hoặc thông báo lỗi đăng ký không thành công
        console.error('Đăng ký không thành công:', response.data);
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu đến API
      console.error('Lỗi khi gửi yêu cầu đăng ký:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Text style={styles.header}>Đăng ký</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder="Tên"
            style={styles.input}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder="Số điện thoại"
            style={styles.input}
          />
        )}
        name="phone"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder="Email"
            style={styles.input}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder="Mật khẩu"
            secureTextEntry
            style={styles.input}
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            style={styles.input}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
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
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FA4A0C',
    borderRadius: 30,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
