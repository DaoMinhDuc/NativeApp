import React from 'react';
import { View, Text } from 'react-native';
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const FavoriteScreen: React.FC = () => {
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
    </View>
  );
};

export default FavoriteScreen;
