import axios from "axios";
import type { UserResponse } from "../types/user";

const API = "https://dummyjson.com";

export const getUsers = async (
  limit: number,
  skip: number,
  signal?: AbortSignal
): Promise<UserResponse> => {
  const { data } = await axios.get(`${API}/users`, {
    params: { limit, skip },
    signal,
  });

  return data;
};

export const searchUsers = async (
  query: string,
  limit: number,
  skip: number,
  signal?: AbortSignal
): Promise<UserResponse> => {
  const { data } = await axios.get(`${API}/users/search`, {
    params: { q: query },
    signal,
  });

  return data;
};
