import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API URL:", API_URL);

export const getAllEvents = async () => {
    const res = await axios.get(`${API_URL}/event/public`);


    return res.data.data;
};