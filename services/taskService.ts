import { CreateTaskDTO, Task, UpdateTaskDTO } from "@/types/TaskCard";
import axios from "axios";

const API_URL = "https://crud-pdhc-node.vercel.app/tasks";

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
};

export const createTask = async (
    data: CreateTaskDTO
): Promise<Task> => {
    const response = await axios.post<Task>(API_URL, {
        ...data,
        status: "TODO"
    });

    return response.data;
};

export const updateTask = async (
    id: number,
    data: UpdateTaskDTO
): Promise<Task> => {
    const response = await axios.put<Task>(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const toggleTaskStatus = async (id: number): Promise<void> => {
    try {
        const response = await axios.get<Task>(`${API_URL}/${id}`);
        const task = response.data;

        const updatedStatus: Task["status"] =
            task.status === "DONE" ? "TODO" : "DONE";

        await axios.put(`${API_URL}/${id}`, {
            ...task,
            status: updatedStatus
        });

    } catch (error) {
        console.log("Erro ao alternar status:", error);
        throw error;
    }
};