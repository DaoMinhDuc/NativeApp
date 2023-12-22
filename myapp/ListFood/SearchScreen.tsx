import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllItemApi } from '../service/item';
import { Item } from '../interface/Search';

const SearchScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAllItemApi();
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = data.filter(item =>
      item.itemName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { itemId: item.itemId })}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
        <View style={styles.textContainer}>
          <Text style={styles.foodName}>{item.itemName}</Text>
          <View style={styles.quantityContainer}>
            <View style={{ width: '60%' }}>
              <Text style={styles.foodPrice}>Giá: {item.cost}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa tìm kiếm"
          onChangeText={handleSearch}
          value={searchQuery}
        />
       
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  input: {
   marginLeft: 20,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    alignItems: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    borderRadius: 10,
    borderWidth: 1,
    marginRight:30,
    marginBottom: 20,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput:{}
});

export default SearchScreen;
