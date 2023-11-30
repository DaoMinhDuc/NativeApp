import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


const CheckOutScreen = ({ navigation }) => {
  const [address, setAddress] = useState({
    name: 'John Doe',
    address: '123 Main St',
    phone: '123-456-7890',
  });
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('doorDelivery');

  const handleAddressChange = () => {
    // Xử lý khi người dùng muốn thay đổi địa chỉ
  };

  const handleDeliveryMethodChange = (method: string) => {
    setSelectedDeliveryMethod(method);
  };

  return (
    
    <View style={styles.container}>
         <AppBar 
          style={{ backgroundColor: 'transparent',
          elevation: 0,
          marginTop: 20,
          }}
          title="Check Out"
          tintColor="Black"
          centerTitle={true}
          leading={props => (
            <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000" onPress={() => navigation.goBack()} />
          )}
        />
        <Text style={{fontSize: 40, fontWeight: 'bold', marginTop: 30, marginBottom: 30, marginLeft: 10}}>Delivery</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.detailsLabel}>Address Details</Text>
        <TouchableOpacity onPress={handleAddressChange}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
        
      <View style={styles.addressDetails}>
        <View style={{marginLeft: 20}}>
        <Text style={styles.addressText}>
          Name: {address.name}
        </Text>
        <View style={styles.addressLine}></View>
        <Text style={styles.addressText}>Address: {address.address}</Text>
        <View style={styles.addressLine}></View>
        <Text style={styles.addressText}>Phone: {address.phone}</Text>
        </View>
      </View>

      <Text style={styles.detailsLabel}>Delivery Method</Text>
      <View style={styles.deliveryMethod}>
      <View style={{marginLeft: 20}}>
        <View style={styles.deliveryOption}>
          <Checkbox
            status={selectedDeliveryMethod === 'doorDelivery' ? 'checked' : 'unchecked'}
            onPress={() => handleDeliveryMethodChange('doorDelivery')}
          />
          <Text style={styles.optionText}>Door Delivery</Text>
        </View>
        <View style={styles.addressLine}></View>
        <View style={styles.deliveryOption}>
          <Checkbox
            status={selectedDeliveryMethod === 'pickup' ? 'checked' : 'unchecked'}
            onPress={() => handleDeliveryMethodChange('pickup')}
          />
          <Text style={styles.optionText}>Pickup</Text>
        </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => {
          navigation.navigate('Payment'); 
        }}
      >
        <Text style={styles.proceedText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    padding: 20,
  },
  addressDetails: {
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 156,
    
  },
  detailsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 18,
  },
  changeText: {
    color: '#F47B0A',
  },
  deliveryMethod: {
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: 'white',
    height: 156,
   
    width: '100%',
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  proceedButton: {
    
    backgroundColor: '#FA4A0C',
    borderRadius: 30,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedText: {
    color: 'white',
    fontSize: 18,
  },
  addressLine: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1, // Đường kẻ ngăn
    borderBottomColor: 'gray', // Màu đường kẻ
    paddingVertical: 5, // Khoảng cách giữa các dòng
   
  },
});

export default CheckOutScreen;
