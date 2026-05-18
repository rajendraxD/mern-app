
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getAllItemsService = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/items/getAllItems`);
    const data = await response.json();
    console.log(data)
    return data;
};


