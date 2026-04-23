import { TaskCardProps } from "@/types/TaskCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export function TaskCard({
    id,
    title,
    description,
    dateOfCreation,
    priority,
    status,
    onDelete,
    onDone
}: TaskCardProps) {

    const formattedDate = new Date(dateOfCreation).toLocaleDateString();

    const handlePress = () => {
        router.push({
            pathname: "/edit-task/[id]",
            params: { id }
        });
    };

    const getBackgroundColor = () => {
        if (status === "DONE") return "bg-emerald-500";

        switch (priority) {
            case "HIGH":
                return "bg-red-800";
            case "MEDIUM":
                return "bg-yellow-600";
            case "LOW":
                return "bg-sky-600";
            default:
                return "bg-gray-100";
        }
    };

    const getBadgeColor = () => {
        return "bg-black/25";
    };

    const getLabel = () => {
        if (status === "DONE") return "Tarefa Concluída";

        switch (priority) {
            case "HIGH":
                return "Alta Prioridade";
            case "MEDIUM":
                return "Média Prioridade";
            case "LOW":
                return "Baixa Prioridade";
        }
    };

    const getIconName = () => {
        if (status === "DONE") return "checkmark-circle";

        switch (priority) {
            case "HIGH":
                return "alert-circle";
            case "MEDIUM":
                return "warning";
            case "LOW":
                return "time";
        }
    };

    const renderLeftActions = () => (
        <View className="flex-1 justify-center pl-6 bg-green-200 rounded-2xl mb-4">
            <View className="w-12 h-12 rounded-full bg-green-500 items-center justify-center">
                <Ionicons name="checkmark" size={24} color="white" />
            </View>
        </View>
    );

    const renderRightActions = () => (
        <View className="flex-1 justify-center items-end pr-6 bg-red-200 rounded-2xl mb-4">
            <View className="w-12 h-12 rounded-full bg-red-500 items-center justify-center">
                <Ionicons name="trash" size={24} color="white" />
            </View>
        </View>
    );

    return (
        <Swipeable
            renderLeftActions={status === "DONE" ? undefined : renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableOpen={(direction) => {
                if (direction === "left") {
                    onDelete(id);
                } 
                
                if (direction === "right" && status !== "DONE") {
                    onDone(id);
                }
            }}
        >
            <Pressable onPress={handlePress}>
                <View className={`w-full rounded-2xl p-6 gap-4 ${getBackgroundColor()} mb-4`}>
                    
                    <View className="flex-row justify-between items-center gap-4">
                        
                        <View className="flex-1">
                            <Text className="font-semibold text-xl text-white">
                                {title}
                            </Text>
                            <Text className="text-white/80">
                                Criada em {formattedDate}
                            </Text>
                        </View>

                        <Ionicons
                            name={getIconName()}
                            size={40}
                            color="rgba(0, 0, 0, 0.25)"
                        />
                    </View>

                    <Text className="text-md text-white">
                        {description}
                    </Text>

                    <View className="items-end">
                        <View className={`px-4 py-1 rounded-full ${getBadgeColor()}`}>
                            <Text className="text-white text-sm font-semibold">
                                {getLabel()}
                            </Text>
                        </View>
                    </View>

                </View>
            </Pressable>
        </Swipeable>
    );
}