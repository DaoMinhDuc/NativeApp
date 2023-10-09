import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface Drink {
  id: number;
  name: string;
  // Định nghĩa các trường dữ liệu từ API ở đây
}

const HistoryScreen: React.FC = () => {
  const [data, setData] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Gọi API để lấy dữ liệu từ http://localhost:8080/api/auth/drinks
      const response = await fetch('http://localhost:8080/api/auth/drinks');
      const result: Drink[] = await response.json();

      // Kiểm tra nếu có dữ liệu, thì cập nhật vào state và ngừng hiển thị loading
      if (result && result.length > 0) {
        setData(result);
      } else {
        setLoading(false); // Không có dữ liệu, ngừng hiển thị loading
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
      setLoading(false); // Có lỗi xảy ra, ngừng hiển thị loading
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Text style={styles.loading}>Loading...</Text>;
    } else if (data.length === 0) {
      return (
        <View style={styles.container}>
        <View style={styles.center}>
          <Image
            source={require('./assets/a1.png')}
            style={styles.image}
          />
          <Text style={styles.Text1}>No history yet</Text>
          <Text style={styles.Text2}>
            Hit the orange button down {'\n'} below to Create an order
          </Text>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start odering</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
    } else {
      // Hiển thị dữ liệu từ API ở đây
      return (
        <View>
          {data.map((item) => (
            <View key={item.id}>
              <Text>{item.name}</Text>
              {/* Hiển thị thông tin từ dữ liệu API khác ở đây */}
            </View>
          ))}
        </View>
      );
    }
  };

  const navigateToHome = () => {
    // Thực hiện điều hướng về trang chủ
  };

  return (
    <View>
        <View>
      <AppBar 
        style={{ 
          backgroundColor: 'transparent',
          elevation: 0,
          marginTop: 20,
        }}
        title="History"
        tintColor="Black"
        centerTitle={true}
        leading={props => (
          <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000"  />
        )}
      />
      </View>
      <View>{renderContent()}</View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  center: {
    marginTop: 80,
    flex: 7,
    position: 'absolute',
    alignItems: 'center',
    top: '50%',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 110,
    marginVertical: 20,
  },
  bottom: {
    flex: 3,
    position: 'absolute',
    justifyContent: 'flex-end',
    marginTop: 20,
  
  },
  button: {
    backgroundColor: '#FA4A0C',
    padding: 15,
    borderRadius: 20,
    width: 314, 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  
  Text1: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  Text2:{
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  Text0:{
    fontWeight: 'bold',
    paddingTop:50,
    fontSize: 18,
    color: 'black',
  },
});