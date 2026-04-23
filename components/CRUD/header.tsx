import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function Header() {
    return (
        <View className="justify-between items-center gap-6 mb-6">

            <Text className="text-2xl font-bold">
                Lista de Atividades
            </Text>
            
            <Pressable
                className="w-full items-center bg-sky-600 rounded-full py-4"
                onPress={() => router.navigate('/create-task')}
            > 
                <Text className="text-xl font-semibold text-white">
                    Adicionar nova tarefa
                </Text> 
            </Pressable>

            <Text className="text-2xl font-bold">
                Minhas Tarefas
            </Text>

        </View>
    );
}