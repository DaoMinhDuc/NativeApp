import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Swipeable } from 'react-native-gesture-handler';
import { getCartItems, removeFromCart, placeOrder } from '../service/cart';

const CartScreen = ({ navigation }) => {
  const [isSwiped, setIsSwiped] = useState([]); 
 
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        // Handle error
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

const deleteItem = async (itemId) => {
  try {
    await removeFromCart(itemId);
    const updatedCartItems = cartItems.filter((item) => item.itemId !== itemId);
    setCartItems(updatedCartItems);
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm từ giỏ hàng: ', error);
  }
};

  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 0) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };
  const handleCompleteOrder = async () => {
    try {
      // Gửi thông tin đơn hàng đến server
      await placeOrder({
        items: cartItems.map(item => ({ itemId: item.itemId, quantity: item.quantity })),
        // Thêm các thông tin khác cần thiết cho đơn hàng
        // ...
      });

      console.log('Đơn hàng đã được đặt thành công!');
      navigation.navigate('CheckOut');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  const renderCartItem = ({ item, index }) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => (
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => handleSwipeLeft(index)}
                style={{ backgroundColor: 'red', borderRadius: 30, padding: 10 }}
              >
                <Icon name="heart-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => deleteItem(item.itemId)}
                style={{ backgroundColor: 'red', borderRadius: 30, padding: 10 }}
              >
                <Icon name="trash-can-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <View style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
            <View style={styles.textContainer}>
              <Text style={styles.foodName}>{item.itemName}</Text>
              <View style={styles.quantityContainer}>
                <View style={{ width: '60%' }}>
                  <Text style={styles.foodPrice}>Giá: {item.totalPrice}</Text>
                </View>
                <View style={styles.quantityButtonsContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(index)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(index)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
       </Swipeable>
    );
  };

  const handleSwipeLeft = (index) => {
    setIsSwiped((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <AppBar
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            marginTop: 20,
          }}
          title="Cart"
          tintColor="Black"
          centerTitle={true}
          leading={(props) => (
            <IconButton
              icon={(props) => <Icon name="chevron-left" {...props} />}
              {...props}
              color="#000"
              onPress={() => navigation.goBack()}
            />
          )}
        />
      </View>
     
        <View style={{ flex: 7 }}>
         <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleCompleteOrder}
        >
          <Text style={styles.addToCartText}>Complete order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
  iconContainer: {
    backgroundColor: 'none',
    paddingHorizontal: 16,
    paddingVertical: 20,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    backgroundColor: '#FA4A0C',
    textColor: 'white',
  },
  quantity: {
    textColor: 'white',
    fontSize: 20,
    paddingHorizontal: 8,
    backgroundColor: '#FA4A0C',
  },
  quantityButtonsContainer: {
    flexDirection: 'row',
    marginLeft: -60,
    alignItems: 'center',
    width: '40%', // Chiếm 40% chiều dài của quantityContainer
    justifyContent: 'flex-end', // Đặt nút tăng giảm bên phải
  },
});
