
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const addItemService = async (data) => {
    const response = await axios.post(`${baseUrl}/items/addItem`, data);
    return response.data;
};

export const getAllItemsService = async () => {
    const response = await axios.get(`${baseUrl}/items/getAllItems`);
    return response.data;
};

export const deleteItemService = async (id) => {
    const response = await axios.post(`${baseUrl}/items/deleteItem/${id}`);
    return response.data;
};

export const updateItemService = async (id, data) => {

    const response = await axios.post(`${baseUrl}/items/updateItem/${id}`, data);
    return response.data;
};

export const getItemByIdService = async (id) => {
    const response = await axios.get(`${baseUrl}/items/getItemById/${id}`);
    return response.data;
};

