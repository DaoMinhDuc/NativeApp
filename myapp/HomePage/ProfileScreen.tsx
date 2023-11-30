import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Checkbox } from 'react-native-paper';
import { UserProfile } from '../interface/Profile';
import { loadUserProfile, saveUserProfile } from '../service/profile';
import { removeAccessToken } from '../service/token';

const ProfileScreen = ({navigation}) => {
  const [selectedMethod, setSelectedMethod] = useState('Card');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

// Đọc thông tin hồ sơ người dùng từ API khi màn hình được tải
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadUserProfile();
        setUserProfile(data);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };
// hàm lưu thông tin profile
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
// danh sách các loại thanh toán
  const paymentOptions = [
    { id: 1, label: 'Card', icon: 'credit-card' },
    { id: 2, label: 'Bank account', icon: 'bank' },
    { id: 3, label: 'Cash', icon: 'cash-multiple' },
  ];
  const handleLogout = async () => {
    try {
      // Xóa token và chuyển đến trang đăng nhập
      await removeAccessToken();
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };
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
            onPress={handleSaveProfile}// lưu thông tin sau khi sửa
          />
        ) : (
          <IconButton
            icon={props => <Icon name="pencil" {...props} />}
            color="#000"
            onPress={handleEditProfile}// mở chức năng lưu
          />
        )}
      />
      <Text style={styles.paymentLabel}>Information</Text>

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image source={require('./assets/Avatar.png')} style={{ width: 100, height: 100 }}/>
          </View>
        </View>
        <View style={styles.infoContainer}>
  <View style={styles.infoHeader}>
    {isEditing ? (
      <TextInput
        style={styles.name}
        value={userProfile?.fullName}
        onChangeText={(text) => handleProfileChange('fullName', text)}
        editable={isEditing} // Cho phép chỉnh sửa khi đang trong chế độ chỉnh sửa
      />
    ) : (
      <Text style={styles.name}>{userProfile?.fullName}</Text>
    )}
  </View>
  {isEditing ? (
    <TextInput
      value={userProfile?.email}
      onChangeText={(text) => handleProfileChange('email', text)}
      editable={isEditing}
    />
  ) : (
    <Text style={styles.info}>{userProfile?.email}</Text>
  )}
  {isEditing ? (
    <TextInput
      value={userProfile?.phoneNumber}
      onChangeText={(text) => handleProfileChange('phoneNumber', text)}
      editable={isEditing}
    />
  ) : (
    <Text style={styles.info}>{userProfile?.phoneNumber}</Text>
  )}
  {isEditing ? (
    <TextInput
      value={userProfile?.address}
      onChangeText={(text) => handleProfileChange('address', text)}
      editable={isEditing}
    />
  ) : (
    <Text style={styles.info}>{userProfile?.address}</Text>
  )}
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
              {/* <Icon name={option.icon} size={30} /> */}
              <Icon key={option.icon} size={30} />
              <Text style={styles.paymentOptionLabel}>{option.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
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
    borderRadius: 20,
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
  logoutButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FA4A0C',
    borderRadius: 10,
    padding: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, Modal, TextInput, TouchableOpacity } from 'react-native';
// import { AppBar, IconButton } from "@react-native-material/core";
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import { Checkbox } from 'react-native-paper';
// import { UserProfile } from '../interface/Profile';
// import { loadUserProfile, saveUserProfile } from '../service/profile';
// import { removeAccessToken } from '../service/token';
// const ProfileScreen: React.FC = ({ navigation }) => {
//   const [selectedMethod, setSelectedMethod] = useState('Card');
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [formValues, setFormValues] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//   });

//   // Đọc thông tin hồ sơ người dùng từ API khi màn hình được tải
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await loadUserProfile();
//         setUserProfile(data);
//       } catch (error) {
//         console.error('Failed to load user profile:', error);
//       }
//     };
  
//     fetchData();
//   }, []);

//   const handleSelectMethod = (method: string) => {
//     setSelectedMethod(method);
//   };

// // Function to handle form submission
// const handleSubmit = async () => {
//   try {
//     // Update the user profile instead of creating a new one
//     await saveUserProfile({ ...userProfile, ...formValues });
//     // Close the modal
//     setModalVisible(false);
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//   }
// };

// // Function to handle input changes
// const handleInputChange = (key: string, value: string) => {
//   setFormValues({
//     ...formValues,
//     [key]: value,
//   });
// };


//   const paymentOptions = [
//     { id: 1, label: 'Card', icon: 'credit-card' },
//     { id: 2, label: 'Bank account', icon: 'bank' },
//     { id: 3, label: 'Cash', icon: 'cash-multiple' },
//   ];
//   const handleLogout = async () => {
//     try {
//       // Xóa token và chuyển đến trang đăng nhập
//       await removeAccessToken();
//       navigation.navigate('Login'); 
//     } catch (error) {
//       console.error('Lỗi khi đăng xuất:', error);
//     }
//   };
//   return (
//     <View>
//       <AppBar
//         style={{
//           backgroundColor: 'transparent',
//           elevation: 0,
//           marginTop: 20,
//         }}
//         title="Profile"
//         tintColor="Black"
//         centerTitle={true}
//         leading={props => (
//           <IconButton
//             icon={props => <Icon name="chevron-left" {...props} />}
//             {...props}
//             color="#000"
//           />
//         )}
//         trailing={props => (
//           <IconButton
//             icon={props => <Icon name="pencil" {...props} />}
//             color="#000"
//             onPress={() => setModalVisible(true)} // Open modal when pencil icon is pressed
//           />
//         )}
//       />
//       <Text style={styles.paymentLabel}>Information</Text>

//       <View style={styles.container}>
//         <View style={styles.avatarContainer}>
//           <View style={styles.avatar}>
//             <Image source={require('./assets/Avatar.png')} style={{ width: 100, height: 100 }}/>
//           </View>
//         </View>
//         <View style={styles.infoContainer}>
//   <View style={styles.infoHeader}>
//     <Text style={styles.name}>{userProfile?.fullName}</Text>
//   </View>
//   <Text style={styles.info}>{userProfile?.email}</Text>
//   <Text style={styles.info}>{userProfile?.phoneNumber}</Text>
//   <Text style={styles.info}>{userProfile?.address}</Text>
// </View>
// </View>
//       <Text style={styles.paymentLabel}>Payment Method</Text>
//       <View style={styles.paymentContainer}>
//         <View style={styles.paymentOptions}>
//           {paymentOptions.map((option) => (
//             <View key={option.id} style={styles.paymentOption}>
//               <Checkbox
//                 status={selectedMethod === option.label ? 'checked' : 'unchecked'}
//                 onPress={() => handleSelectMethod(option.label)}
//               />
//               <Icon name={option.icon} size={30} />
//               <Text style={styles.paymentOptionLabel}>{option.label}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//       <View style={styles.logoutButtonContainer}>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Log Out</Text>
//         </TouchableOpacity>
//       </View>
//       <Modal
//        transparent animationType="slide"
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//           <Text>Sửa thông tin</Text>
//           <Text style={styles.label}>Tên đầy đủ của bạn</Text>
//           <TextInput
//             placeholder="Full Name"
//             style={styles.input}
//             value={formValues.fullName}
//             onChangeText={(text) => handleInputChange('fullName', text)}
//           />
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             placeholder="Email"
//             style={styles.input}
//             value={formValues.email}
//             onChangeText={(text) => handleInputChange('email', text)}
//           />
//           <Text style={styles.label}>Số điện thoại</Text>
//           <TextInput
//             placeholder="Phone Number"
//             style={styles.input}
//             value={formValues.phoneNumber}
//             onChangeText={(text) => handleInputChange('phoneNumber', text)}
//           /><Text style={styles.label}>Địa chỉ</Text>
//           <TextInput
//             placeholder="Address"
//             style={styles.input}
//             value={formValues.address}
//             onChangeText={(text) => handleInputChange('address', text)}
//           />
//            <View style={styles.modalButtons}>
//           <TouchableOpacity style={styles.okButton} onPress={handleSubmit}>
//           <Text style={styles.okButtonText}>Save</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//           </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     backgroundColor: 'white',
//     gap: 20,
//     borderRadius: 20,
//     width: '90%',
//     marginLeft: 20,
//   },
//   avatarContainer: {
//     flex: 1,
//     alignItems: 'center',
//     marginLeft: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'lightgray',
//     marginRight: 10,
//     marginTop: 10,
//     borderRadius: 20,
//   },
//   infoContainer: {
//     flex: 4,
//     marginLeft: 20,
//   },
//   infoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 10,
    
//   },
//   paymentContainer: {
//     marginTop: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     gap: 30,
//     width: '90%',
//     marginLeft: 20,
//   },
//   paymentLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginLeft: 20,
//   },
//   paymentOptions: {
//     flexDirection: 'column',
//   },
//   paymentOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   paymentOptionLabel: {
//     marginLeft: 10,
//     fontSize: 18,
//   },
//   roundCheckbox: {
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: 'blue',
//   },
//   separator: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'black',
//     width: '100%',
//     marginTop: 5,
//     marginBottom: 5,
//   },
//   logoutButtonContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   logoutButton: {
//     backgroundColor: '#FA4A0C',
//     borderRadius: 10,
//     padding: 10,
//   },
//   logoutButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',

//   },
//   modalContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '80%',
//     height: '80%',
//     backgroundColor: 'white',
//     borderColor: '#FA4A0C', 
//     borderWidth: 1,
//     borderRadius: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: '#FA4A0C', 
//     borderRadius: 10,
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 8,
//     backgroundColor: 'white',
//   },
//   label: {
//     marginBottom: 5,
//     fontWeight: 'bold',
//     textAlign: 'left',  
//   width: '80%',    
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '80%',
//   },
//   okButton: {
//     backgroundColor: '#FA4A0C',
//     borderRadius: 10,
//     padding: 10,
//   },
//   okButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   cancelButton: {
//     backgroundColor: 'gray',
//     borderRadius: 10,
//     padding: 10,
//   },
//   cancelButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen;
