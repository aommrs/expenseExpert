import axios from 'axios';
import { API_PATHS } from './constans';

export const getMostExpenseType = async (monthYear: string): Promise<any[]> => {
    try {
        const response = await axios.get(API_PATHS.GET_MOST_EXPENSE_TYPE, {
            params: {
                monthYear: monthYear
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching most expense type:', error);
        throw error;
    }
};

export const getMostExpenseCategory = async (monthYear: string): Promise<any> => {
    try {
        const response = await axios.get(API_PATHS.GET_MOST_EXPENSE_CATEGORY, {
            params: {
                monthYear: monthYear
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching most expense category:', error);
        throw error;
    }
};

export const getMostIncomeCategory = async (monthYear: string): Promise<any> => {
    try {
        const response = await axios.get(API_PATHS.GET_MOST_INCOME_CATEGORY, {
            params: {
                monthYear: monthYear
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching most income category:', error);
        throw error;
    }
};

export const getExpenseInYear = async (year: number): Promise<any> => {
    try {
        const response = await axios.get(API_PATHS.GET_EXPENSE_YEAR, {
            params: {
                year: year
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching expense year:', error);
        throw error;
    }
};

export const getBalance = async (): Promise<any> => {
    try {
        const response = await axios.get(API_PATHS.GET_BALANCE);
        return response.data;
    } catch (error) {
        console.error('Error fetching expense year:', error);
        throw error;
    }
};