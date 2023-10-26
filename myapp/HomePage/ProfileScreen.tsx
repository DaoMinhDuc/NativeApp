import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, TextInput } from 'react-native';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Checkbox } from 'react-native-paper';
import { UserProfile } from '../interface/Profile';
import { loadUserProfile, saveUserProfile } from '../service/profile';

const ProfileScreen: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('Card');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Đọc thông tin hồ sơ người dùng từ API khi màn hình được tải
  useEffect(() => {
    loadUserProfile()
      .then((data) => {
        setUserProfile(data);
      })
      .catch((error) => {
        console.error('Failed to load user profile:', error);
      });
  }, []);

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    if (userProfile) {
      saveUserProfile(userProfile)
        .then((success) => {
          if (success) {
            setIsEditing(false);
          } else {
            console.error('Failed to save user profile');
          }
        })
        .catch((error) => {
          console.error('Failed to save user profile:', error);
        });
    }
  };

  const handleProfileChange = (key: string, value: string) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        [key]: value,
      });
    }
  };

  const paymentOptions = [
    { id: 1, label: 'Card', icon: 'credit-card' },
    { id: 2, label: 'Bank account', icon: 'bank' },
    { id: 3, label: 'PayPal', icon: 'paypal' },
  ];

  return (
    <View>
      <AppBar
        style={{
          backgroundColor: 'transparent',
          elevation: 0,
          marginTop: 20,
        }}
        title="Profile"
        tintColor="Black"
        centerTitle={true}
        leading={props => (
          <IconButton
            icon={props => <Icon name="chevron-left" {...props} />}
            {...props}
            color="#000"
          />
        )}
        trailing={isEditing ? (
          <IconButton
            icon={props => <Icon name="check" {...props} />}
            color="#000"
            onPress={handleSaveProfile}
          />
        ) : (
          <IconButton
            icon={props => <Icon name="pencil" {...props} />}
            color="#000"
            onPress={handleEditProfile}
          />
        )}
      />
      <Text style={styles.paymentLabel}>Information</Text>

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image source={require('./assets/Avatar.png')} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            {isEditing ? (
              <TextInput
                style={styles.name}
                value={userProfile?.name}
                onChangeText={(text) => handleProfileChange('name', text)}
                editable={isEditing} // Cho phép chỉnh sửa khi đang trong chế độ chỉnh sửa
              />
            ) : (
              <Text style={styles.name}>{userProfile?.name}</Text>
            )}
          </View>
          <Text style={styles.info}>
            {isEditing ? (
              <TextInput
                value={userProfile?.email}
                onChangeText={(text) => handleProfileChange('email', text)}
                editable={isEditing} // Cho phép chỉnh sửa khi đang trong chế độ chỉnh sửa
              />
            ) : (
              userProfile?.email
            )}
          </Text>
          <Text style={styles.info}>
            {isEditing ? (
              <TextInput
                value={userProfile?.phone}
                onChangeText={(text) => handleProfileChange('phone', text)}
                editable={isEditing} // Cho phép chỉnh sửa khi đang trong chế độ chỉnh sửa
              />
            ) : (
              userProfile?.phone
            )}
          </Text>
          <Text style={styles.info}>
            {isEditing ? (
              <TextInput
                value={userProfile?.address}
                onChangeText={(text) => handleProfileChange('address', text)}
                editable={isEditing} // Cho phép chỉnh sửa khi đang trong chế độ chỉnh sửa
              />
            ) : (
              userProfile?.address
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paymentLabel}>Payment Method</Text>
      <View style={styles.paymentContainer}>
        <View style={styles.paymentOptions}>
          {paymentOptions.map((option) => (
            <View key={option.id} style={styles.paymentOption}>
              <Checkbox
                status={selectedMethod === option.label ? 'checked' : 'unchecked'}
                onPress={() => handleSelectMethod(option.label)}
              />
              <Icon name={option.icon} size={30} />
              <Text style={styles.paymentOptionLabel}>{option.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    gap: 20,
    borderRadius: 20,
    width: '90%',
    marginLeft: 20,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
    marginRight: 10,
    marginTop: 10,
  },
  infoContainer: {
    flex: 4,
    marginLeft: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    gap: 30,
    width: '90%',
    marginLeft: 20,
  },
  paymentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
  },
  paymentOptions: {
    flexDirection: 'column',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentOptionLabel: {
    marginLeft: 10,
    fontSize: 18,
  },
  roundCheckbox: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'blue',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default ProfileScreen;
