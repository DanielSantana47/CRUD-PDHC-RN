import { TaskList } from "@/components/CRUD/taskList";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-zinc-100 px-6 pt-4">
            <View className="justify-between items-center gap-6 mb-6">
                <Text className="text-2xl font-bold">
                    Lista de Atividades
                </Text>
                <Pressable className="w-full items-center bg-sky-600 rounded-full py-4" onPress={()=> router.navigate('/create-task')} > 
                    <Text className="text-xl font-semibold text-white">Adicionar nova tarefa</Text> 
                </Pressable>

                <Text className="text-2xl font-bold">
                    Minhas Tarefas
                </Text>
            </View>

            <TaskList />

        </SafeAreaView>
    );
}