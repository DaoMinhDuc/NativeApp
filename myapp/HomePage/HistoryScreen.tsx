import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchOrderData } from '../service/history'; 
import { useNavigation } from '@react-navigation/native';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrderData(refresh);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefresh(prevRefresh => !prevRefresh);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const renderOrderItem = ({ item }) => (
   
      <View style={styles.orderItem}>
        <Text>{`${item.orderStatus}`}</Text>
        <Text>{`${item.orderDate}`}</Text>
        <TouchableOpacity 
      style={styles.detailsButton}
      onPress={() => handleOrderPress(item.orderId)}
    >
      <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
    </TouchableOpacity>
      </View>
  );

  const handleOrderPress = (orderId) => {
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
        <ActivityIndicator size="large" color="#000" style={styles.loadingIndicator} />
      ) : (
        <FlatList
        data={orders.reverse()}
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
  detailsButton: {
    width: '50%',
    backgroundColor: '#FA4A0C',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    marginLeft: 150,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
