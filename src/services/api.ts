import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'http://localhost:5000/api/products'; // Updated to use the same endpoint for all operations

export const productApi = {
    getAllProducts: async (): Promise<Product[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    createProduct: async (product: Product): Promise<Product> => {
        const response = await axios.post(API_URL, product);
        return response.data;
    },

    updateProduct: async (id: number, product: Product): Promise<Product> => {
        const response = await axios.put(`${API_URL}/${id}`, product);
        return response.data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
}; 