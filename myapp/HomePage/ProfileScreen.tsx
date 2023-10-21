import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AppBar,  IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Checkbox } from 'react-native-paper';

const ProfileScreen: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('Card'); // Mặc định là lựa chọn Card

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };
  const paymentOptions = [
    { id: 1, label: 'Card', icon: 'credit-card' },
    { id: 2, label: 'Bank account', icon: 'bank' },
    { id: 3, label: 'PayPal', icon: 'paypal' },
  ];
  return (
    <View>
    <AppBar 
    style={{ backgroundColor: 'transparent',
    elevation: 0,
   marginTop: 20,
  }}
 title="Profile"
 tintColor="Black"
 centerTitle={true}
 leading={props => (
   <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000"  />
 )}
/>
<Text style={styles.paymentLabel}>Information</Text>

<View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
        <Image source={require('./assets/Avatar.png')} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoHeader}>
          <Text style={styles.name}>John Doe</Text>
          <IconButton
            icon={() => <Icon name="pencil" size={24} color="black" />}
            onPress={() => {
              // Xử lý sự kiện khi nút bút chì được nhấn
            }}
          />
        </View>
        <Text style={styles.info}>johndoe@example.com</Text>
        <Text style={styles.info}> 123-456-7890</Text>
        <Text style={styles.info}>No 15 uti street off ovie palace road effurun delta state</Text>
        {/* Thêm các thông tin cá nhân khác ở đây */}
      </View>
    </View>
     <Text style={styles.paymentLabel}>Payment Method</Text>
    <View style={styles.paymentContainer}>
       
        <View style={styles.paymentOptions}>
          {paymentOptions.map((option) => (
            <View key={option.id} style={styles.paymentOption}>
              <Checkbox
                status={selectedMethod === option.label ? 'checked' : 'unchecked'}
                onPress={() => handleSelectMethod(option.label)}

              />
              <Icon name={option.icon} size={30} />
              <Text style={styles.paymentOptionLabel}>{option.label}</Text>
              
            </View>
          ))}
        </View>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    gap: 20,
    borderRadius: 20,
    width: '90%',
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
    marginRight: 10,
    marginTop: 20,
    // Đặt hình đại diện ở đây
  },
  infoContainer: {
    flex: 4,
    marginLeft: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    gap: 30,
    width: '90%',
  },
  paymentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'column',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentOptionLabel: {
    marginLeft: 10,
    fontSize: 18,
  }, 
   roundCheckbox: {
    borderRadius: 50, // Làm cho checkbox tròn
    borderWidth: 2, // Độ rộng của viền
    borderColor: 'blue', // Màu của viền khi chọn
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default ProfileScreen;
