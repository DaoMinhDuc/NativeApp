
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface MenuProps {
  items: string[];
  onItemClick: (item: string) => void;
}

const HorizontalMenu: React.FC<MenuProps> = ({ items, onItemClick }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onItemClick(item);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft:70 }}>
      {items.map((item, index) => (
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
        color: '#9A9A9D', // Màu chữ trước khi bấm
        textDecorationLine: 'none', // Loại bỏ gạch chân
        fontSize: 17, // Kích thước font
    fontStyle: 'normal', // Kiểu font: bình thường
    fontWeight: '400', // Độ đậm của font
  
      
      },
      menuItemSelected: {
        backgroundColor: '#ADADAF', // Màu nền khi được chọn
        borderBottomColor: '#FA4A0C', // Màu border-bottom khi được chọn
        borderBottomWidth: 2, // Độ dày của border-bottom khi được chọn
      },
      menuItemTextSelected: {
        color: '#FA4A0C', // Màu chữ khi được chọn
        textDecorationLine: 'underline', // Gạch chân khi được chọn
        textDecorationColor: '#FA4A0C', // Màu gạch chân khi được chọn
      },
  });