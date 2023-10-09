
import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Animated, Button } from 'react-native';

import { AppBar, HStack, IconButton, Stack, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FoodList from './ListFood/FoodListProps';
import HorizontalMenu from './ListFood/MenuProps';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {


  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const contentOffsetX = useRef(new Animated.Value(0)).current;
  const contentOffsetY = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(1)).current; // Thêm contentScale

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);

    Animated.parallel([
      Animated.timing(contentScale, { // Áp dụng scale cho phần content
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
        toValue: showSidebar ? 0 : 50, // Giá trị translateY khi thu nhỏ
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const navigation = useNavigation(); // Sử dụng useNavigation để lấy đối tượng navigation

  const goToSearchScreen = () => {
    navigation.navigate('Search'); // Chuyển đến màn hình Search
  };
  const goToCartScreen = () => {
    navigation.navigate('Cart'); // Chuyển đến màn hình Search
  };
  return (
    <SafeAreaView style={styles.container}>
     
        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{ translateX: contentOffsetX },
                { translateY: contentOffsetY },
                { scale: contentScale },], // Áp dụng scale vào phần content
            },
          ]}
        >
         <View style={styles.content}>
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
          <View>
            <Text style={styles.text}>Delicious </Text>
            <Text style={styles.text}>Food For You</Text>
          </View>
          
          <TouchableOpacity style={styles.Search} onPress={goToSearchScreen}>
          <IconButton
                icon={props => <Icon name="magnify" {...props} />}
                color="#000"
              />
      <Text style={styles.textSearch}>Search</Text>
    </TouchableOpacity>
          <View>
            <HorizontalMenu
              items={['Food', 'Drink', 'Snack', 'Sauce']}
              onItemClick={handleCategorySelect}
            />
            {selectedCategory && <FoodList category={selectedCategory} />}
          </View>
          <Button
        title="Xem chi tiết"
        onPress={() => navigation.navigate('Detail')}
      />
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
    backgroundColor: '#FA4A0C',
    
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
    backgroundColor: '#EFEEEE', // Nền màu xám
    borderRadius: 30, // Để bo tròn các cạnh
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  textSearch: {
    color: '#000',
    marginLeft: 8, // Khoảng cách giữa icon và chữ Search
    fontWeight: 'bold',
  },
});

export default HomeScreen;