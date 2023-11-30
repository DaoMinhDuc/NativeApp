import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllItemApi } from '../service/item';
import { Item } from '../interface/Search';

const SearchScreen = ({ navigation }) => {
  const [originalItems, setOriginalItems] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllItemApi();
      setOriginalItems(data);
      setItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const debounceSearch = (text: string) => {
    setSearchText(text);
    // Thực hiện debounce  chờ 200ms sau khi nhập xong mới gọi API
    setTimeout(() => {
      searchItemByName(text);
    }, 200);
  };

  const searchItemByName = (text: string) => {
    const filteredItems = originalItems.filter(
      (item) =>
        item.itemName.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase())
    );
    setItems(filteredItems);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          placeholder="Search Items"
          onChangeText={(text) => debounceSearch(text)}
          style={styles.searchInput}
        />
        {loading && <ActivityIndicator size="large" color="#000" />}
        
        {items.length === 0 && !loading && (
          <Text style={styles.noResultsText}>No results found.</Text>
        )}

        <FlatList
          data={items}
          keyExtractor={(item) => item.itemId.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 8, 
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default SearchScreen;
