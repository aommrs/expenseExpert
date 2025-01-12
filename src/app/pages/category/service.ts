import axios from 'axios';
import { API_PATHS } from './constants';

export const getCategory = async (): Promise<any[]> => {
    try {
        const response = await axios.get(API_PATHS.GET_CATEGORY);
        return response.data;
    } catch (error) {
        console.error('Error get category:', error);
        throw error;
    }
};

export const getType = async (): Promise<any[]> => {
    try {
        const response = await axios.get(API_PATHS.GET_TYPE);
        return response.data;
    } catch (error) {
        console.error('Error get type:', error);
        throw error;
    }
};

export const addCategory = async (categoryData: any): Promise<any> => {
    try {
        const response = await axios.post(API_PATHS.SAVE_CATEGORY, categoryData);
        return response;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

export const deleteCategory = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(API_PATHS.DELETE_CATEGORY, {
            data: { id },
        });
        return response
    }
    catch (error) {
        return error;
    }
};
