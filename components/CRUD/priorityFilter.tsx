import { FilterButton } from "@/components/CRUD/filterButton";
import { View } from "react-native";

type Priority = "HIGH" | "MEDIUM" | "LOW";
type StatusFilter = "ALL" | "DONE";

type PriorityFilterProps = {
    selectedPriority: Priority | null;
    selectedStatus: StatusFilter;
    onChangePriority: (value: Priority | null) => void;
    onChangeStatus: (value: StatusFilter) => void;
};

export function PriorityFilter({
    selectedPriority,
    selectedStatus,
    onChangePriority,
    onChangeStatus
}: PriorityFilterProps) {

    const handlePriority = (value: Priority) => {
        if (selectedPriority === value) {
            onChangePriority(null);
        } else {
            onChangePriority(value);
        }
    };

    const handleStatus = (value: StatusFilter) => {
        onChangeStatus(value); 
    };

    return (
        <View className="gap-2">

            <View className="flex-row gap-2">
                <FilterButton
                    label="Alta"
                    selected={selectedPriority === "HIGH"}
                    onPress={() => handlePriority("HIGH")}
                />

                <FilterButton
                    label="Média"
                    selected={selectedPriority === "MEDIUM"}
                    onPress={() => handlePriority("MEDIUM")}
                />

                <FilterButton
                    label="Baixa"
                    selected={selectedPriority === "LOW"}
                    onPress={() => handlePriority("LOW")}
                />
            </View>

            <View className="flex-row gap-2">
                <FilterButton
                    label="Todos"
                    selected={selectedStatus === "ALL"}
                    onPress={() => handleStatus("ALL")}
                />

                <FilterButton
                    label="Concluídas"
                    selected={selectedStatus === "DONE"}
                    onPress={() => handleStatus("DONE")}
                />
            </View>

        </View>
    );
}