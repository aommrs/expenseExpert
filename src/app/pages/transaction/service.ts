import axios from 'axios';
import { API_PATHS } from './constants';

export const getTransaction = async (): Promise<any[]> => {
    try {
        const response = await axios.get(API_PATHS.GET_TRANSACTION);
        return response.data;
    } catch (error) {
        console.error('Error get transaction:', error);
        throw error;
    }
};

export const getCategoryDropdown = async (): Promise<any[]> => {
    try {
        const response = await axios.get(API_PATHS.GET_CATEGORY_DROPDOWN);
        return response.data;
    } catch (error) {
        console.error('Error get category dropdown:', error);
        throw error;
    }
};

export const addTransaction = async (transationData: any): Promise<any> => {
    try {
        const response = await axios.post(API_PATHS.SAVE_TRANSACTION, transationData);
        return response;
    } catch (error) {
        console.error('Error adding transation:', error);
        throw error;
    }
};

export const deleteTransaction = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(API_PATHS.DELETE_TRANSACTION, {
            data: { id },
        });
        return response
    } catch (error) {
        console.error('Error delete transation:', error);
        throw error;
    }
};
