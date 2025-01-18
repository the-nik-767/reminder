import http from "../../utils/http";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Customer {
  id: string;
  name: string;
  phone: string;
}

class CustomerService {
  async getAllCustomers(): Promise<Customer[]> {
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN');
      console.log('token', token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await http.get('/customer/get-all-customer', {
        headers,
      });
      console.log('response', response.data.response);
      return response.data.response;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }
}

export const customerService = new CustomerService(); 