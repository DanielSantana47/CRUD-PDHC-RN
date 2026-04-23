import { ActionButton } from "@/components/CRUD/ActionButton";
import { FormInput } from "@/components/CRUD/formInput";
import { PriorityButton } from "@/components/CRUD/priorityButton";
import { InputSchema } from "@/libs/schema/input";
import { deleteTask, getTasks, updateTask } from "@/services/taskService";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditTask() {
    const { id } = useLocalSearchParams();

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "MEDIUM" as "HIGH" | "MEDIUM" | "LOW"
    });

    const [status, setStatus] = useState<"TODO" | "DONE">("TODO");

    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        const loadTask = async () => {
            const data = await getTasks();
            const task = data.find((t: any) => t.id === Number(id));

            if (task) {
                setForm({
                    title: task.title,
                    description: task.description,
                    priority: task.priority
                });

                setStatus(task.status);
            }
        };

        loadTask();
    }, []);

    const handleSubmit = async () => {
        const result = InputSchema.safeParse(form);

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        try {
            await updateTask(Number(id), result.data);
            router.replace("/");
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(Number(id));
            router.replace("/");
        } catch (err) {
            console.log(err);
        }
    };

    const handleToggleStatus = async () => {
        try {
            const newStatus = status === "DONE" ? "TODO" : "DONE";

            await updateTask(Number(id), { status: newStatus });

            router.replace("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView className="flex-1 p-6 gap-4">

            <Text className="text-2xl font-bold text-center">
                Editar Tarefa
            </Text>

            <FormInput
                placeholder="Título"
                value={form.title}
                onChange={(text) =>
                    setForm({ ...form, title: text })
                }
                error={errors.title?.[0]}
            />

            <FormInput
                placeholder="Descrição"
                value={form.description}
                onChange={(text) =>
                    setForm({ ...form, description: text })
                }
                error={errors.description?.[0]}
            />

            <Text className="text-xl font-semibold text-center">Defina a Prioridade da tarefa</Text>

            <View className="flex-row justify-around gap-6">
                <PriorityButton
                    label="Alta"
                    value="HIGH"
                    selected={form.priority}
                    onPress={() =>
                        setForm({ ...form, priority: "HIGH" })
                    }
                />
                <PriorityButton
                    label="Média"
                    value="MEDIUM"
                    selected={form.priority}
                    onPress={() =>
                        setForm({ ...form, priority: "MEDIUM" })
                    }
                />
                <PriorityButton
                    label="Baixa"
                    value="LOW"
                    selected={form.priority}
                    onPress={() =>
                        setForm({ ...form, priority: "LOW" })
                    }
                />
            </View>

            <ActionButton
                label="Atualizar tarefa"
                onPress={handleSubmit}
                color="bg-sky-600"
            />

            <ActionButton
                label={
                    status === "DONE"
                        ? "Marcar como a fazer"
                        : "Marcar como concluída"
                }
                onPress={handleToggleStatus}
                color={status === "DONE" ? "bg-yellow-600" : "bg-green-600"}
            />

            <ActionButton
                label="Deletar tarefa"
                onPress={handleDelete}
                color="bg-red-600"
            />

        </SafeAreaView>
    );
}