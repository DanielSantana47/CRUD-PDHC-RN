import { Pressable, Text } from "react-native";

type Priority = "HIGH" | "MEDIUM" | "LOW";

type Props = {
    label: string;
    value: Priority;
    selected: Priority;
    onPress: () => void;
};

export function PriorityButton({
    label,
    value,
    selected,
    onPress
}: Props) {
    return (
        <Pressable
            onPress={onPress}
            className={`flex-1 items-center py-2 rounded-full ${
                selected === value
                    ? "bg-sky-600"
                    : "bg-gray-200"
            }`}
        >
            <Text
                className={
                    selected === value
                        ? "text-white"
                        : "text-black"
                }
            >
                {label}
            </Text>
        </Pressable>
    );
}