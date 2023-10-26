// Services.ts
import { UserProfile } from '../interface/Profile';
import { customerUrl } from './api';



export const loadUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await fetch(customerUrl); // Sử dụng URL từ api.ts
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to load user profile');
    }
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};

export const saveUserProfile = async (userData: UserProfile): Promise<boolean> => {
  try {
    const response = await fetch(customerUrl, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      return true;
    } else {
      throw new Error('Failed to save user profile');
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
};

// const profileUrl = 'https://653485ade1b6f4c59046c770.mockapi.io/user/1';