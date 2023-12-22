// DetailHistoryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { confirmOrder, getDetailHistory } from '../service/history';  
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const DetailHistoryScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [detailHistory, setDetailHistory] = useState(null);

  useEffect(() => {
    getDetailHistory(orderId)
    
      .then(data => setDetailHistory(data))
      .catch(error => console.error('Error:', error));

  }, [orderId]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.cardContent}>
    <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
    <View style={styles.textContainer}>
      <Text style={styles.foodName}>{item.itemName}</Text>
      <View style={styles.quantityContainer}>
        <View style={{ width: '60%' }}>
          <Text style={styles.foodPrice}>Giá: {item.totalPrice}</Text>
        </View>
      </View>
    </View>
  </View>
  );

  const handleCompleteOrder = () => {
    // Thực hiện xác nhận đơn hàng
    confirmOrder(orderId)
      .then(() => {
        Alert.alert('Thông báo', 'Đơn hàng đã được xác nhận thành công');
        // Bạn có thể thực hiện các hành động cần thiết sau khi xác nhận đơn hàng
        // Ví dụ: làm mới dữ liệu, chuyển hướng trang, ...
      })
      .catch(error => {
        console.error('Error confirming order:', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xác nhận đơn hàng');
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
        title="Thông tin đơn hàng"
        tintColor="Black"
        centerTitle={true}
        leading={props => (
          <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000" onPress={() => navigation.goBack()} />
        )}
      />
      {detailHistory ? (
        <View>
          <Text>{`Order Status: ${detailHistory.orderStatus}`}</Text>
          <Text>{`Order Date: ${detailHistory.orderDate}`}</Text>

          <FlatList
            data={detailHistory.orderItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderOrderItem}
          />

         
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
       <View style={styles.bottomContainer}>
          <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleCompleteOrder}
        >
          <Text style={styles.addToCartText}>Complete</Text>
        </TouchableOpacity>
          </View>
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
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImage: {
    
    height: 80,
    borderRadius: 4,
    width: '20%',
  },
  textContainer: {
    paddingHorizontal: 16,
    width: 300,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
   width: 300,
  },
  foodPrice: {
    fontSize: 16,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#FA4A0C',
    borderRadius: 30,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default DetailHistoryScreen;