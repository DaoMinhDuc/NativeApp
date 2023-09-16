import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Danh sách món ăn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#007bff',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Header;
