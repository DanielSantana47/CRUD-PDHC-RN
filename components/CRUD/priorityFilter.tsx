import { FilterButton } from "@/components/CRUD/filterButton";
import { View } from "react-native";

type Priority = "HIGH" | "MEDIUM" | "LOW";

type PriorityFilterProps = {
    selected: Priority | null;
    onChange: (value: Priority | null) => void;
};

export function PriorityFilter({
    selected,
    onChange
}: PriorityFilterProps) {

    return (
        <View className="flex-row gap-2">
            
            <FilterButton
                label="Todas"
                selected={selected === null}
                onPress={() => onChange(null)}
            />

            <FilterButton
                label="Alta"
                selected={selected === "HIGH"}
                onPress={() => onChange("HIGH")}
            />

            <FilterButton
                label="Média"
                selected={selected === "MEDIUM"}
                onPress={() => onChange("MEDIUM")}
            />

            <FilterButton
                label="Baixa"
                selected={selected === "LOW"}
                onPress={() => onChange("LOW")}
            />

        </View>
    );
}