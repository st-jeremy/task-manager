import { IAddTask, ITask } from "@/types";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchTasks = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/tasks/`);
  return data;
};

export const addTask = async (task: IAddTask ) => {
  const { data } = await axios.post(`${API_BASE_URL}/tasks/`, task);
  return data;
};

export const updateTask = async (id: string, task: string) => {
  const { data } = await axios.put(`${API_BASE_URL}/tasks/${id}/`, task);
  return data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/tasks/${id}/`);
};
