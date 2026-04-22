import { Text, TextInput, View } from "react-native";

type Props = {
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
    error?: string;
};

export function FormInput({ placeholder, value, onChange, error }: Props) {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                className={`border rounded-full py-3 px-6 ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
                value={value}
                onChangeText={onChange}
            />

            {error && (
                <Text className="text-red-500">
                    {error}
                </Text>
            )}
        </View>
    );
}