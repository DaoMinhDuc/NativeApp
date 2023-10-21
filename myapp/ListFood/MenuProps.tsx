import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getCategories } from '../service/category';

interface MenuProps {
  onItemClick: (item: string) => void;
}

const HorizontalMenu: React.FC<MenuProps> = ({ onItemClick }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onItemClick(item);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 70 }}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleItemClick(item)}
          style={[
            styles.menuItem,
            { borderColor: selectedItem === item ? '#FA4A0C' : '#ADADAF' },
          ]}
        >
          <Text
            style={[
              styles.menuItemText,
              selectedItem === item && styles.menuItemTextSelected,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HorizontalMenu;

const styles = StyleSheet.create({
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 8,
  },
  menuItemText: {
    color: '#9A9A9D',
    textDecorationLine: 'none',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  menuItemSelected: {
    backgroundColor: '#ADADAF',
    borderBottomColor: '#FA4A0C',
    borderBottomWidth: 2,
  },
  menuItemTextSelected: {
    color: '#FA4A0C',
    textDecorationLine: 'underline',
    textDecorationColor: '#FA4A0C',
  },
});
