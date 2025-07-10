import axios from 'axios';
import { Game } from '../types';

export const fetchGames = async (id?: string): Promise<Game[] | Game> => {
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

export const getAIMove = async (board: string[]) => {
  try {
    const url =
      'https://h4kxg8lgn4.execute-api.us-east-1.amazonaws.com/ai-move';
    const response = await axios.post(url, {
      board,
    });
    console.log('response from AI:', response);
    return response.data.move;
  } catch (error: any) {
    console.log('error from AI API:', error);
    throw new Error(`Error fetching AI move: ${error.message}`);
  }
};
