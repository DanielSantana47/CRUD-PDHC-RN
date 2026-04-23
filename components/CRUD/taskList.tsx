import { PriorityFilter } from "@/components/CRUD/priorityFilter";
import { deleteTask, getTasks, toggleTaskStatus } from "@/services/taskService";
import { Task } from "@/types/TaskCard";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TaskCard } from "./taskCard";

type ListItem =
    | Task
    | { type: "HEADER_DONE" };

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState<"HIGH" | "MEDIUM" | "LOW" | null>(null);
    const [statusFilter, setStatusFilter] = useState<"ALL" | "DONE">("ALL");

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

    const filteredTasks = tasks.filter((task) => {
        if (filter && task.priority !== filter) return false;

        if (statusFilter === "DONE" && task.status !== "DONE") {
            return false;
        }

        return true;
    });

    const todoTasks =
        statusFilter === "DONE"
            ? []
            : filteredTasks.filter((task) => task.status === "TODO");

    const doneTasks = filteredTasks.filter((task) => task.status === "DONE");

    const listData: ListItem[] = [
        ...todoTasks,
        ...(doneTasks.length > 0 ? [{ type: "HEADER_DONE" as const }] : []),
        ...doneTasks
    ];

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0284c7" />
            </View>
        );
    }

    return (
        <FlatList
            data={listData}
            keyExtractor={(item, index) =>
                "type" in item ? `header-${index}` : item.id.toString()
            }
            contentContainerStyle={{
                gap: 16,
                padding: 16,
                paddingBottom: 20
            }}
            ListHeaderComponent={
                <View className="gap-4">

                    <PriorityFilter
                        selectedPriority={filter}
                        selectedStatus={statusFilter}
                        onChangePriority={setFilter}
                        onChangeStatus={setStatusFilter}
                    />

                    {tasks.length === 0 && (
                        <View className="items-center mt-10">
                            <Text>Nenhuma tarefa encontrada</Text>
                        </View>
                    )}

                </View>
            }
            renderItem={({ item }) => {

                if ("type" in item) {
                    return (
                        <Text className="text-lg font-semibold mt-4">
                            Concluídas
                        </Text>
                    );
                }

                return (
                    <TaskCard
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        dateOfCreation={item.dateOfCreation}
                        priority={item.priority}
                        status={item.status}
                        onDelete={handleDelete}
                        onDone={handleToggleStatus}
                    />
                );
            }}
        />
    );
}