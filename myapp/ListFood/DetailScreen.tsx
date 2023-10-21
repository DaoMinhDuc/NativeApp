import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AppBar, HStack, IconButton, Stack, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFoodDetail } from '../service/detail'; 
import { addToCart } from '../service/cart';
const DetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const  { foodId }  = route.params;
    const [foodData, setFoodData] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
      });
      useEffect(() => {
        // Lấy dữ liệu từ API
        getFoodDetail(foodId)
          .then((data) => {
            setFoodData(data);
          })
          .catch((error) => {
            console.error('Lỗi khi lấy dữ liệu từ API: ', error.message);
          });
      }, []);
    
      const handleAddToCart = () => {
        // Truyền thông tin vào giỏ hàng
        addToCart({
          name: foodData.name,
          price: foodData.price,
        })
          .then((response) => {
            console.log('Đã thêm vào giỏ hàng: ', response);
          })
          .catch((error) => {
            console.error('Lỗi khi thêm vào giỏ hàng: ', error.message);
          });
      };
  return (
    <View style={styles.container}>
       < View style={{flex: 2}}>
       <AppBar
            style={{ backgroundColor: 'transparent', elevation: 0, marginTop: 20 , }}
            leading={props => (
              <IconButton
                icon={props => <Icon name="chevron-left" {...props} onPress={() => navigation.goBack()} />}
                color="#000"
               
              />
            )}
            trailing={props => (
              <IconButton
                icon={props => <Icon name="heart-outline" {...props} />}
                color="#000"
              />
            )}
          />
          </View>
      <View style={{flex: 6}}>
   {/* Slide image */}
   <Image source={{ uri: foodData.imageUrl }} style={{ width: '100%', height: 200 }} />

{/* Tên món ăn */}
<Text style={styles.foodName}>{foodData.name}</Text>

{/* Giá */}
<Text style={styles.price}>{foodData.price}</Text>

{/* Mô tả */}
<View style={{marginLeft: 40, marginTop: 30}}>
<Text style={styles.BoldText}>Delivery info</Text>
<Text style={styles.description}>{foodData.description}</Text>
<Text style={styles.BoldText}>Return policy</Text>
<Text style={styles.description}>All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.</Text>
</View>

      </View>

     
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
      {/* Nút Add to cart */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default DetailScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    appBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: 'transparent',
      elevation: 0,
      marginTop: 20,
    },
    image: {
      width: '100%',
      height: 200,
    },
    foodName: {
        color: '#000',
        textAlign: 'center',
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 32, // Sửa đổi lineHeight thành kiểu số (number)
        marginVertical: 10,
        marginHorizontal: 20,
    },
    price: {
      color: '#FA4A0C',
      textAlign: 'center',
      fontSize: 22,
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 26,
      marginHorizontal: 20,
    },
    description: {
      marginHorizontal: 20,
      width: 297,
height: 77,
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
    BoldText: {
        color: '#000',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: 'bold',
      
      },
  });