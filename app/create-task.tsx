import { FormInput } from "@/components/CRUD/formInput";
import { PriorityButton } from "@/components/CRUD/priorityButton";
import { InputSchema } from "@/libs/schema/input";
import { createTask } from "@/services/taskService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateTask() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "MEDIUM" as "HIGH" | "MEDIUM" | "LOW"
    });

    const [errors, setErrors] = useState<any>({});

    const handleSubmit = async () => {
        const result = InputSchema.safeParse(form);

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        try {
            await createTask(result.data);
            router.replace("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView className="flex-1 p-6 gap-6">

            <View className="flex-row justify-between">
                <Pressable onPress={() => router.navigate('/')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>

                <Text className="text-2xl font-bold">
                    Nova Tarefa
                </Text>

                <View className="w-[24px]"></View>
            </View>

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

            <Pressable
                className="bg-sky-600 p-4 rounded-full"
                onPress={handleSubmit}
            >
                <Text className="text-white text-center font-bold">
                    Criar tarefa
                </Text>
            </Pressable>

        </SafeAreaView>
    );
}