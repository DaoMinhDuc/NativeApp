
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const HomeScreen: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
     
      <View style={{ flexDirection: 'row' }}>
  <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image
      source={require('./assets/Vector.png')}
      style={{ width: 15, height: 15 }}
    />
  </TouchableOpacity>
  <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Icon name="shopping-cart" style={{ width: 20, height: 20 }} />
  </TouchableOpacity>
</View>
     
      <Text style={styles.text}>Delicious Food For You</Text>

      <View style={styles.inputContainer}>
      <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.input} 
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="TÌm kiếm ..."
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  vectorIcon: {
    width: 22,
    height: 14.666666030883789,
    left: 54.59857177734375,
    borderWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:30,
    paddingLeft: 10,
    width: 304,
    height: 60,
    top:24,
    left:25,
  },
  searchIcon: {
    marginRight: 10,
  },
  CartIcon: {},
  text: {
    fontFamily: 'SF Pro Rounded',
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 100,
    letterSpacing: 0,
    textAlign: 'left',
  },
  input: {
   
  },
});

export default HomeScreen;
