import { Header } from "@/components/CRUD/header";
import { TaskList } from "@/components/CRUD/taskList";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-zinc-100 px-6 pt-4">

            <Header />

            <TaskList />

        </SafeAreaView>
    );
}