
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Animated, Button, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { AppBar, HStack, IconButton, Stack, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { getCategoryList, getCategoryItems } from '../service/category';


const HomeScreen = ({ navigation }) => {
 
  const [showSidebar, setShowSidebar] = useState(false);
  const contentOffsetX = useRef(new Animated.Value(0)).current;
  const contentOffsetY = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(1)).current;

 
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const categories = ['Food', 'Drink', 'Snack', 'Sauce'];
  const [selectedCategory, setSelectedCategory] = useState(null);
  

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
    // Get the list of categories
    getCategoryList()
      .then((categories) => {
        setData(categories);
      })
      .catch((error) => console.error(error));
  }, []);
  
  useEffect(() => {
    if (selectedCategory) {
      // Get items for the selected category
      getCategoryItems(selectedCategory)
        .then((items) => {
          setFilteredData(items);
        })
        .catch((error) => console.error(error));
    } else {
      // If no category is selected, show all data
      setFilteredData(data);
    }
  }, [selectedCategory, data]);
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

        
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft:70 , flex: 1 }}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={{
              padding: 8,
            }}
          >
           <Text style={{ color: selectedCategory === category ? '#FA4A0C' : '#ADADAF', fontSize: 20, marginLeft: 20, }}>
        {category}
      </Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
       <View style={styles.Cardcontainer}>
      <FlatList
      horizontal={true} // Sắp xếp ngang thay vì dọc
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { foodId: item.id })}>
          <Card  >
           <Card.Cover source={{ uri: item.avatarUrl }} style={styles.cover} />
            <Card.Content>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>Price: {item.price} $</Text>
            </Card.Content>
          </Card>
          </TouchableOpacity>
        )}
      />
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
    flexDirection: 'column', // Sắp xếp các phần theo cột
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
  list: {
    flex: 1, // Chiếm 1 phần
  },
  deliciousFoodContainer: {
    flex: 1, // Chiếm 2 phần
  },
  searchContainer: {
    flex: 1, // Chiếm 1 phần
  },
  appBarContainer: {
    flex: 1, // Chiếm 1 phần
  },
 
  Cardcontainer: {
    flex: 4 , // Chiếm 4 phần
   
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 40,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    elevation: 3,
    width: 200,
    height: 250,
    marginRight: 20,
  },
  cover: {
    flexDirection: 'row',
    justifyContent: 'center',
   
  },
  foodName: {
    height: 90,
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodPrice: {
    height: 30,
    color: '#FA4A0C',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HomeScreen;




