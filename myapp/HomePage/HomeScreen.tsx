
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Animated, Button } from 'react-native';

import { AppBar, HStack, IconButton, Stack, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FoodListProps from '../ListFood/FoodList';
import HorizontalMenu from '../ListFood/MenuProps';
import { getCategories } from '../service/category';




const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const contentOffsetX = useRef(new Animated.Value(0)).current;
  const contentOffsetY = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(1)).current;
  const [categories, setCategories] = useState<string[]>([]);

  // Khởi tạo state để lưu dữ liệu từ FoodListProps
  const [foodData, setFoodData] = useState<any[]>([]);

  // Tạo hàm callback để nhận dữ liệu từ FoodListProps
  const onFoodDataLoaded = useCallback((data) => {
    setFoodData(data);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);

    Animated.parallel([
      Animated.timing(contentScale, {
        toValue: showSidebar ? 1 : 0.88,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentOffsetX, {
        toValue: showSidebar ? 0 : 230,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentOffsetY, {
        toValue: showSidebar ? 0 : 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  

  const goToSearchScreen = () => {
    navigation.navigate("Search");
  };

  const goToCartScreen = () => {
    navigation.navigate('Cart');
  };
  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [
              { translateX: contentOffsetX },
              { translateY: contentOffsetY },
              { scale: contentScale },
            ],
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.appBarContainer}>
          <AppBar
            style={{ backgroundColor: 'transparent', elevation: 0, marginTop: 20 }}
            leading={props => (
              <IconButton
                icon={props => <Icon name="menu" {...props} />}
                color="#000"
                onPress={toggleSidebar}
              />
            )}
            trailing={props => (
              <IconButton
                icon={props => <Icon name="cart-outline" {...props} />}
                color="#000"
                onPress={goToCartScreen}
              />
            )}
          />
          </View>
          <View style={styles.deliciousFoodContainer}>
            <Text style={styles.text}>Delicious </Text>
            <Text style={styles.text}>Food For You</Text>
          </View>

          <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.Search} onPress={goToSearchScreen}>
            <IconButton
              icon={props => <Icon name="magnify" {...props} />}
              color="#000"
            />
            <Text style={styles.textSearch}>Search</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.list}>
            
          <HorizontalMenu items={categories} onItemClick={category => setSelectedCategory(category)} />
            {selectedCategory && (
              <FoodListProps category={selectedCategory} onFoodDataLoaded={onFoodDataLoaded} />
            )}
          </View>
          
        </View>
      </Animated.View>
      {showSidebar && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="account" size={24} color="white" style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="shopping" size={24} color="white" style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="security" size={24} color="white" style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarItem}>
            <Icon name="logout" size={24} color="white" style={styles.sidebarIcon} />
            <Text style={styles.sidebarText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    fontFamily: 'SF Pro Rounded',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0,
    textAlign: 'left',
    marginLeft: 20,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 230,
    backgroundColor: '#FA4A0C',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 20,
  },
  sidebarIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  sidebarText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  Search: {
    backgroundColor: '#EFEEEE',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  textSearch: {
    color: '#000',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  list:{
    flex: 6,
  height: 300,
  },
  deliciousFoodContainer: {
    flex: 1, 
  },
  searchContainer: {
    flex: 1, 
  },
  appBarContainer: {
    flex: 2, // Chiếm 1 phần
  },
});

export default HomeScreen;