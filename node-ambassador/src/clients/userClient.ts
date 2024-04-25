import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const getUserById = async (id) => {
  const {data} = await axios.get(`${process.env.USER_SERVICE_URL}/find-by-id/${id}?authSecret=${process.env.USER_SECRET}`);
  return data;
};
