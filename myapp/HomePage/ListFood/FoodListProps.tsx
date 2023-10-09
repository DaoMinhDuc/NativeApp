import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';
interface Food {
  id: string;
  name: string;
  price: number;
  avatarUrl: string;
}

interface FoodListProps {
  category: string;
}

const FoodList: React.FC<FoodListProps> = ({ category }) => {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let apiUrl = '';

    if (category === 'Food') {
      apiUrl = 'https://6511ac49b8c6ce52b394e02a.mockapi.io/test/food';
    } else if (category === 'Drink') {
      apiUrl = 'http://localhost:8080/api/auth/drinks';
    } else if (category === 'Snack') {
      apiUrl = 'http://localhost:8080/api/auth/snacks';
    } else if (category === 'Sauce') {
      apiUrl = 'http://localhost:8080/api/auth/sauce';
    }

    console.log('apiUrl:', apiUrl);
    axios.get<Food[]>(apiUrl)
      .then((response) => {
        setFoodData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Category: {category}</Text>
      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}> {/* Thêm Card */}
            <Card.Cover source={{ uri: item.avatarUrl }} /> {/* Sử dụng Card.Cover cho hình ảnh */}
            <Card.Content>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>Price: {item.price} $</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodItem: {
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodPrice: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FoodList;
