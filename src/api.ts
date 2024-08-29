import axios from "axios";

const API_URL = "http://localhost:3000/fighters";

export const getFighters = async (): Promise<any> => {
  const response = await axios.get(API_URL);
  console.log("response, getFighters", response);

  return response.data;
};

export const getFighterById = async (id: number): Promise<any> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getFighterByName = async (name: string): Promise<any> => {
  const response = await axios.get(`${API_URL}/${name}`);
  return response.data;
};
export const createFighter = async (fighter: any): Promise<any> => {
  const response = await axios.post(API_URL, fighter);
  return response.data;
};

export const updateFighter = async (id: number, fighter: any): Promise<any> => {
  const response = await axios.patch(`${API_URL}/${id}`, fighter);
  return response.data;
};

export const deleteFighter = async (id: number): Promise<any> => {
  await axios.delete(`${API_URL}/${id}`);
};
