// src/screens/SearchScreen.tsx

import React, { useRef, useState } from 'react';
import { View, TextInput, FlatList, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {fetchItems } from '../service/search';
import { Item } from '../interface/Search';

const SearchScreen: React.FC = () => {
  const textInputRef = useRef<TextInput | null>(null);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const handleSearch = async () => {
    try {
      const data = await fetchItems();
      const filteredItems = data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
      setItems(filteredItems);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <AppBar
            style={{
              backgroundColor: 'transparent',
              elevation: 0,
              marginTop: 20,
            }}
            leading={props => (
              <IconButton icon={props => <Icon name="chevron-left" {...props} />} color="#000" onPress={() => navigation.goBack()} />
            )}
          />
        </View>
        <TextInput
          ref={textInputRef}
          placeholder="Search"
          onChangeText={text => setSearchText(text)}
          style={styles.SearchInput}
        />
        <Button title="Search" onPress={handleSearch} />
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.name} - {item.description}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginLeft: 50,
    padding: 16,

  },
  SearchInput:{
marginTop: 40,
padding: 16,
  }
});
