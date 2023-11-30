// Services.ts
import { UserProfile } from '../interface/Profile';
import { customerUrl } from './api';
import axios from 'axios';


export const loadUserProfile = async () => {
  try {
    const response = await axios.get(customerUrl + 'profile');
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const saveUserProfile = async (profileData: UserProfile) => {
  try {
    const response = await axios.put(customerUrl + 'update', profileData);
    const success = response.data.success;
    return success;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

// const profileUrl = 'https://653485ade1b6f4c59046c770.mockapi.io/user/1';