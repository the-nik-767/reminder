import http from "../../utils/http";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface Customer {
  id: string;
  name: string;
  phone: string;
}

interface AddCustomerPayload {
  customer_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
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

  addCustomer = async (payload: AddCustomerPayload) => {
    try {
      console.log('payload==>', payload);
      const token = await AsyncStorage.getItem('USER_TOKEN');
      
      if (!token) {
        throw new Error('No token found. Please login again.');
      }

      const response = await http.post(
        '/customer/add-customer',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('response==>', response.data);
      
     
      return response.data.response;
    } catch (error: any) {
      console.error('Error in addCustomer:', error.response?.data || error.message);
      throw error;
    }
  };
}

export const customerService = new CustomerService(); 