import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';

const FavoriteScreen: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites);
 
  return (
    <View>
       <AppBar 
       style={{ backgroundColor: 'transparent',
       elevation: 0,
      marginTop: 20,
     }}
    title="Favorite"
    tintColor="Black"
    centerTitle={true}
    leading={props => (
      <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000"  />
    )}
    
  />
   <View>
      {favorites.map(item => (
        <> 
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
        </>
      ))}
    </View>
    </View>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
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
})