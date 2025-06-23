// gameAPI.js
import axios from "axios";

const BASE_URL = "https://jsonfakery.com/games";

export const fetchGames = async (url = "https://jsonfakery.com/games/infinite-scroll") => {
  try {
    const response = await axios.get(url);
    return {
      games: response.data.data,
      nextPage: response.data.next_page_url
    };
  } catch (error) {
    console.error(`Error fetching games:`, error);
    return { games: [], nextPage: null };
  }
};
