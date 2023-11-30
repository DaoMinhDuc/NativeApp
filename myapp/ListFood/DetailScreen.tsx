import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AppBar, HStack, IconButton, Stack, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDetailItem } from '../service/detail'; 
import { addToCart } from '../service/cart';
import { addToFavorites, removeFromFavorites } from '../favouriteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';

const DetailScreen= ({ navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const route = useRoute();
  const  { itemId }  = route.params;
  const [foodData, setFoodData] = useState({
    itemId: '',
    itemName: '',
    cost: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    getDetailItem(itemId)
      .then((data) => {
        setFoodData(data);
      })
      .catch((error) => {
        console.error('Error fetching food details: ', error);
      });
  }, [itemId]);

  const handleAddToCart = () => {
    addToCart({ itemId: foodData.itemId }) // Truyền itemId vào hàm addToCart
      .then((response) => {
        console.log('Đã thêm vào giỏ hàng: ', response);
      })
      .catch((error) => {
        console.error('Lỗi khi thêm vào giỏ hàng: ', error.message);
      });
  };
 
  const handleToggleFavorite = () => {
    const isFavorite = favorites.some(item => item.itemId === foodData.itemId);

    if (isFavorite) {
      // Show alert or handle it as you want
      alert('This item is already in favorites!');
    } else {
      // Dispatch action to add to favorites
      dispatch(addToFavorites(foodData));
    }
  };

  return (
    <View style={styles.container}>
       < View style={{flex: 1}}>
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
                onPress={handleToggleFavorite}
              />
            )}
          />
          </View>
      <View style={{flex: 7}}>
   {/* Slide image */}
   <Image source={{ uri: foodData.imageUrl }} style={{ width: '100%', height: 200 }} />

{/* Tên món ăn */}
<Text style={styles.foodName}>{foodData.itemName}</Text>

{/* Giá */}
<Text style={styles.price}>{foodData.cost}</Text>

{/* Mô tả */}
<ScrollView style={{marginLeft: 20, marginTop: 30}}>
<Text style={styles.BoldText}>Thông tin mô tả</Text>
<Text style={styles.description}>{foodData.description}</Text>
<Text style={styles.BoldText}>Delivery info</Text>
<Text style={styles.description}>Shipper sẽ giao đến tận nơi giúp bạn hoặc bạn có thể tới nhận hàng</Text>
<Text style={styles.BoldText}>Return policy</Text>
<Text style={styles.description}>All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.</Text>
</ScrollView>

      </View>

     
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 10}}>
      {/* Nút Add to cart */}
      <TouchableOpacity 
        style={[styles.addToCartButton ,{ marginRight: 10 }]}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText }>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          handleAddToCart();
          navigation.navigate('Cart');
        }}
      >
        <Text style={styles.addToCartText}>Buy Now</Text>
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
      height: 300,
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
      marginHorizontal: 10,
      width: 300,
height: 90,
    },
    addToCartButton: {
      backgroundColor: '#FA4A0C',
      borderRadius: 30,
      width: '40%',
      height: 50,
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