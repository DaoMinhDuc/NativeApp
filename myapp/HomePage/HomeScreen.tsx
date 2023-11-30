import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { getItemsByCategory } from '../service/category'; 
import { Card } from 'react-native-paper';
import { AppBar, HStack, IconButton, Stack, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['Food', 'Drink', 'Snack', 'Sauce'];

  const renderButton = (category) => {
    const isSelected = selectedCategory === category;

    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(category)}
      >
        <Text style={{ color: isSelected ? '#FA4A0C' : '#ADADAF', fontSize: 18, marginLeft: 20 }}>{category}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getItemsByCategory(selectedCategory)
      .then((items) => {
        setData(items);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu từ API: ', error);
      });
  }, [selectedCategory]);

  const goToSearchScreen = () => {
    navigation.navigate("Search");
  };

  const goToCartScreen = () => {
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.appBarContainer}>
          <AppBar
            style={{ backgroundColor: 'transparent', elevation: 0, marginTop: 20 }}
            leading={props => (
              <IconButton
                icon={props => <Icon name="menu" {...props} />}
                color="#000"
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

        <View style={styles.buttonContainer}>
          {categories.map((category) => (
            renderButton(category)
          ))}
        </View>

        <FlatList
          horizontal={true}
          data={data}
          keyExtractor={(item) => item.itemId.toString()}
          renderItem={({ item }) => ( 
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { itemId: item.itemId })}>
              <Card>
                <Card.Cover source={{ uri: item.imageUrl }} style={styles.cover} />
                <Card.Content>
                  <Text style={styles.foodName}>{item.itemName}</Text>
                  <Text style={styles.foodPrice}>Price: {item.cost} </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  text: {
    fontFamily: 'SF Pro Rounded',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0,
    textAlign: 'left',
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deliciousFoodContainer: {
    flex: 1,
  },
  appBarContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
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
    height: 70,
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
});
