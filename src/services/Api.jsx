import axios from "axios";

const API_URL = "https://api.unsplash.com/photos";
const ACCESS_KEY = "mWtvvNiAHVFKTVnHNtRAaaZlwsYHL_0ESYLm6cZ_OQI";

export const fetchImages = async (query, page = 1, perPage = 50) => {
    const response = await axios.get(`${API_URL}/search`, {
        params: {
            query,
            page,
            per_page: perPage,
            client_id: ACCESS_KEY,
        },
    });
    return response.data.results;
};
