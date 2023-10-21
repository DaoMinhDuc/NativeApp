import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import {Food} from '../interface/Food'
import { fetchFoodData } from '../service/fooddata'
import { FoodListProps } from '../interface/FoodListProps'

const FoodList: React.FC<FoodListProps> = ({ category, onFoodDataLoaded }) => {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFoodData(category);
        setFoodData(response.data);
        setLoading(false);
        onFoodDataLoaded(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
     fetchData();
  }, [category, onFoodDataLoaded]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={foodData}
        horizontal={true}
        keyExtractor={(item) => item.id}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -300,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    width: 220,
    height: 550,
    marginRight: 20,
  },
  cover: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -14,
  },
  foodName: {
    height: 100,
    color: '#000',
textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  foodPrice: {
    height: 30,
    color: '#FA4A0C',
    textAlign: 'center',
    fontSize: 18,
    
  },
});

export default FoodList;