import axios from "axios";

const API_URL = "http://localhost:3000/fights";

export const getFights = async (): Promise<any> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createFight = async (fight: any): Promise<any> => {
  const response = await axios.post(API_URL, fight);
  return response.data;
};

export const updateFight = async (id: number, fight: any): Promise<any> => {
  const response = await axios.patch(`${API_URL}/${id}`, fight);
  return response.data;
};

export const deleteFight = async (id: number): Promise<any> => {
  await axios.delete(`${API_URL}/${id}`);
};
