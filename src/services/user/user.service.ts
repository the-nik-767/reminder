import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../../utils/http';
import { Service } from '../Service';
import i18next from 'i18next';

export default class UserService extends Service {
  async login(phone: string, password: string) {
    try {
      const axiosResponse = await http.post('/user/login', {
        phone,
        password,
      });

      if (axiosResponse?.data?.status && axiosResponse?.data?.response) {
        // Store complete user data
        await AsyncStorage.setItem(
          'USER_DATA',
          JSON.stringify(axiosResponse.data.response),
        );

        // Store token separately
        if (axiosResponse.data.response.token) {
          await AsyncStorage.setItem(
            'USER_TOKEN',
            axiosResponse.data.response.token,
          );
        }

        return axiosResponse.data.response;
      }

      throw new Error(axiosResponse?.data?.error_message || 'Login failed');
    } catch (error: any) {
      console.error('Login error:', error.response?.data);
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const axiosResponse = await http.post('/user/forget-password', {
        email,
      });

      console.log('====================================');
      console.log('email==>', axiosResponse);
      console.log('====================================');

     
      
    } catch (error: any) {
      console.error('Forgot password error:', error.response?.data);
      return {
        status: false,
        error_message: error.response?.data?.error_message || 'Something went wrong'
      };
    }
  }

  async register(data: any) {
    try {
      // Transform the data to match API requirements exactly
      const apiData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        business_category_id: Number(data.business_category_id),
        password: data.password,
        language: 'en',
        profile_image: '',
      };

      console.log('Making register request with data:', apiData);

      const axiosResponse = await http.post('user/register', apiData);
      console.log('Register response:', axiosResponse.data.response.id);

      return axiosResponse.data.response;
    } catch (error: any) {
      console.error('Register error:', error.response?.data);
      throw error;
    }
  }

  async changeLanguage(languageCode: string) {
    console.log('user===>333axiosResponse3', languageCode);
    let token: string | null = null;

    const jsonValue = await AsyncStorage.getItem('USER_DATA');
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;

    token = data?.token || null;

    const axiosResponse = await http.post(
      '/user/changeLanguage',
      {language: languageCode},
      {
        headers: {
          token: token,
        },
      },
    );

    // console.log('====================================');
    // console.log('token==>', axiosResponse.data.data.user.languageDetails);
    // console.log('====================================');

    // console.log('====================================');
    // console.log('token==>', tempUser);
    // console.log('====================================');

    // await AsyncStorage.setItem('USER_DATA', JSON.stringify(axiosResponse.data.data));

    if (axiosResponse?.data?.data) {
      const tempUser = {
        ...data,
        user: axiosResponse.data.data.user,
      };
      i18next.changeLanguage(
        axiosResponse.data.data.user?.languageDetails?.languageCode,
      );
      // DevSettings.reload();
      await AsyncStorage.setItem('USER_DATA', JSON.stringify(tempUser));
    }

    return axiosResponse.data.data.data;
  }

  async verifyOTP(userId: number, otp: string) {
    try {
      const response = await http.post('/user/verify-otp', {
        user_id: userId,
        otp: otp,
      });

      if (response?.data?.data) {
        // Store user data if received in response
        await AsyncStorage.setItem(
          'USER_DATA',
          JSON.stringify(response.data.data),
        );
      }

      return response.data;
    } catch (error: any) {
      console.error('OTP verification error:', error.response?.data);
      throw error;
    }
  }
}
