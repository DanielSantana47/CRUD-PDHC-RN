import { PriorityFilter } from "@/components/CRUD/priorityFilter";
import { deleteTask, getTasks, toggleTaskStatus } from "@/services/taskService";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TaskCard } from "./taskCard";

export type Task = {
    id: number;
    title: string;
    description: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    status: "TODO" | "DONE";
    dateOfCreation: string;
};

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"HIGH" | "MEDIUM" | "LOW" | null>(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        fetchTasks();
    };

    const handleToggleStatus = async (id: number) => {
        await toggleTaskStatus(id);
        fetchTasks();
    };

    // 🔥 FILTRO APLICADO
    const filteredTasks = tasks.filter((task) => {
        if (filter && task.priority !== filter) return false;
        return true;
    });

    const todoTasks = filteredTasks.filter((task) => task.status === "TODO");
    const doneTasks = filteredTasks.filter((task) => task.status === "DONE");

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Ionicons name="refresh" size={32} className="animate-spin" />
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={[...todoTasks, ...doneTasks]}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
            ListHeaderComponent={
                <View className="gap-4">

                    {/* 🔹 FILTRO */}
                    <PriorityFilter
                        selected={filter}
                        onChange={setFilter}
                    />

                    {/* 🔹 EMPTY STATE */}
                    {tasks.length === 0 && (
                        <View className="items-center mt-10">
                            <Text>Nenhuma tarefa encontrada</Text>
                        </View>
                    )}

                    {/* 🔹 TÍTULO DE CONCLUÍDAS */}
                    {doneTasks.length > 0 && (
                        <Text className="text-lg font-semibold mt-4">
                            Concluídas
                        </Text>
                    )}

                </View>
            }
            renderItem={({ item }) => (
                <TaskCard
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    date={new Date(item.dateOfCreation).toLocaleDateString()}
                    priority={item.priority}
                    status={item.status}
                    onDelete={handleDelete}
                    onDone={handleToggleStatus}
                />
            )}
        />
    );
}