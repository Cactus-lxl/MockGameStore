import axios from "axios";

const BASE_URL = "https://jsonfakery.com/games";

export const fetchGames = async (pageNumber = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/infinite-scroll`);
    return response.data.data; // array of games on that page
  } catch (error) {
    console.error(`Error fetching page ${pageNumber}:`, error);
    return [];
  }
};

