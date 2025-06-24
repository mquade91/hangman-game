import axios from 'axios';
import { Game } from '../types';

export const fetchGames = async (id?: string): Promise<Game[]> => {
  try {
    const url = id
      ? `https://rr5zhoav94.execute-api.us-east-1.amazonaws.com/production/game/?id=${id}`
      : 'https://rr5zhoav94.execute-api.us-east-1.amazonaws.com/production/game';
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching game information: ${error.message}`);
  }
};
