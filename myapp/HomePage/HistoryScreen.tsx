import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchOrderData } from '../service/history'; 
import { useNavigation } from '@react-navigation/native';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Gọi API khi component được tạo
    fetchOrderData()
      .then(data => {
        setOrders(data);
        setLoading(false); // Đã nhận dữ liệu, ẩn loading
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false); // Xảy ra lỗi, ẩn loading
      });
  }, []); // Dependency array trống đảm bảo useEffect chỉ gọi một lần khi component được tạo

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOrderPress(item.orderId)}>
      <View style={styles.orderItem}>
        <Text>{`${item.orderStatus}`}</Text>
        <Text>{`${item.orderDate}`}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleOrderPress = (orderId) => {
    // Chuyển sang màn hình DetailHistoryScreen và truyền orderId
    navigation.navigate('DetailHistory', { orderId });
  };
  
  return (
    <View style={styles.container}>
      <AppBar 
        style={{ 
          backgroundColor: 'transparent',
          elevation: 0,
          marginTop: 20,
        }}
        title="Lịch Sử"
        tintColor="Black"
        centerTitle={true}
        leading={props => (
          <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000" onPress={() => navigation.goBack()} />
        )}
      />
      {loading ? (
        // Hiển thị loading khi đang tải dữ liệu
        <ActivityIndicator size="large" color="#000" style={styles.loadingIndicator} />
      ) : (
        // Hiển thị dữ liệu sau khi tải xong
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={renderOrderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryScreen;
