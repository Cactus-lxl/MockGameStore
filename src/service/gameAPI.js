// gameAPI.js
import axios from "axios";

const BASE_URL = "https://jsonfakery.com/games/paginated";

export const fetchGames = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}`);
    return {
      games: response.data.data,
      hasNextPage: !!response.data.next_page_url
    };
  } catch (error) {
    console.error(`Error fetching games on page:${page}:`, error);
    return { games: [], hasNextPage: false };
  }
};
