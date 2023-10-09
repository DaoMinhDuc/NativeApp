import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const CartScreen = () => {
  const [foodData, setFoodData] = useState([]);
  const [isSwiped, setIsSwiped] = useState([]); // Sử dụng một mảng state
  const navigation = useNavigation();
  
  useEffect(() => {
    // Lấy dữ liệu từ API và thêm thuộc tính số lượng
    axios.get('https://6511ac49b8c6ce52b394e02a.mockapi.io/test/food')
      .then((response) => {
        const foodWithQuantity = response.data.map((food) => ({
          ...food,
          quantity: 0, // Khởi tạo số lượng mặc định là 0
        }));
        setFoodData(foodWithQuantity);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API: ', error);
      });
  }, []);
  const increaseQuantity = (index) => {
    const updatedFoodData = [...foodData];
    updatedFoodData[index].quantity += 1;
    setFoodData(updatedFoodData);
  };
  const decreaseQuantity = (index) => {
    const updatedFoodData = [...foodData];
    if (updatedFoodData[index].quantity > 0) {
      updatedFoodData[index].quantity -= 1;
      setFoodData(updatedFoodData);
    }
  };

  const renderFoodItem = ({ item, index }) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => (
          <View  style={{flexDirection: 'row' }}>
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
              onPress={() => handleSwipeRight(index)}
              style={{ backgroundColor: 'red', borderRadius: 30, padding: 10}}
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
          <Text style={styles.foodName}>{item.name}</Text>
          <View style={styles.quantityContainer}>
            <View style={{ width: '60%' }}>
              <Text style={styles.foodPrice}>Giá: {item.price}</Text>
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

  // Xử lý khi swipe sang trái
  const handleSwipeLeft = (index) => {
    setIsSwiped((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  // Xử lý khi swipe sang phải
  const handleSwipeRight = (index) => {
    setIsSwiped((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <AppBar 
          style={{ backgroundColor: 'transparent',
          elevation: 0,
          marginTop: 20,
          }}
          title="Cart"
          tintColor="Black"
          centerTitle={true}
          leading={props => (
            <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000" onPress={() => navigation.goBack()} />
          )}
        />
      </View>
      <View style={{flex: 7}}>
        <FlatList
            data={foodData}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        {/* Nút Add to cart */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            // Xử lý khi nhấn vào nút Add to cart
          }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
    width: '80%',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
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
    
    alignItems: 'center',
    width: '40%', // Chiếm 40% chiều dài của quantityContainer
    justifyContent: 'flex-end', // Đặt nút tăng giảm bên phải
  },
});
