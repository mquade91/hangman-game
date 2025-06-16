import axios from 'axios';
import { Game } from '../types';

export const fetchGames = async (): Promise<Game[]> => {
  try {
    const response = await axios.get(
      'https://rr5zhoav94.execute-api.us-east-1.amazonaws.com/production/game',
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error calling Lambda function: ${error.message}`);
  }
};