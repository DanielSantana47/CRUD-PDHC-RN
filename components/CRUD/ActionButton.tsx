import { Pressable, Text } from "react-native";

type ActionButtonProps = {
    label: string;
    onPress: () => void;
    color?: string;
    disabled?: boolean;
};

export function ActionButton({
    label,
    onPress,
    color = "bg-sky-600",
    disabled = false
}: ActionButtonProps) {
    return (
        <Pressable
            className={`${color} p-4 rounded-full ${
                disabled ? "opacity-50" : ""
            }`}
            onPress={onPress}
            disabled={disabled}
        >
            <Text className="text-white text-center font-bold">
                {label}
            </Text>
        </Pressable>
    );
}