import { Pressable, Text } from "react-native";

type FilterButtonProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
};

export function FilterButton({
    label,
    selected,
    onPress
}: FilterButtonProps) {

    return (
        <Pressable
            onPress={onPress}
            className={`flex-1 items-center py-2 rounded-full ${
                selected ? "bg-sky-600" : "bg-gray-200"
            }`}
        >
            <Text className={selected ? "text-white" : "text-black"}>
                {label}
            </Text>
        </Pressable>
    );
}