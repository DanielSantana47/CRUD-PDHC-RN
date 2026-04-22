import { Task } from "@/components/CRUD/taskList";
import axios from "axios";

const API_URL = "https://crud-pdhc-node.vercel.app/tasks";

export const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTask = async (data: {
    title: string;
    description: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
}) => {
    const response = await axios.post(API_URL, {
        ...data,
        status: "TODO"
    });

    return response.data;
};

export const updateTask = async (
    id: number,
    data: Partial<{
        title: string;
        description: string;
        priority: "HIGH" | "MEDIUM" | "LOW";
        status: "TODO" | "DONE";
    }>
) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const toggleTaskStatus = async (id: number): Promise<void> => {
    try {
        // 🔹 pega tarefa atual
        const response = await axios.get<Task>(`${API_URL}/${id}`);
        const task = response.data;

        // 🔹 alterna status
        const updatedStatus = task.status === "DONE" ? "TODO" : "DONE";

        // 🔹 envia atualização
        await axios.put(`${API_URL}/${id}`, {
            ...task,
            status: updatedStatus
        });

    } catch (error) {
        console.log("Erro ao alternar status:", error);
        throw error;
    }
};