import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, TextInput, Button , StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar, IconButton } from "@react-native-material/core";
const SearchScreen: React.FC = () => {
  const textInputRef = useRef<TextInput | null>(null); // Tạo một ref cho TextInput
  const navigation = useNavigation();
  
  const focusSearchInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus(); // Tập trung vào TextInput
    }
  };

  return (
    <SafeAreaView>
       <View style={styles.container}>
      <View style={{flex: 2}}>
        <AppBar 
          style={{ backgroundColor: 'transparent',
          elevation: 0,
          marginTop: 20,
          }}
          leading={props => (
            <IconButton icon={props => <Icon name="chevron-left" {...props} />} {...props} color="#000" onPress={() => navigation.goBack()} />
          )}
        />
      </View>
      <TextInput
        ref={textInputRef} // Gán ref cho TextInput
        placeholder="Search"
        // Các thuộc tính TextInput khác
      />
      {/* Nút để chuyển từ HomeScreen và tập trung vào TextInput */}
      <Button title="Go to Search" onPress={focusSearchInput} />
    </View>
    </SafeAreaView>
    
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },});