type Priority = "HIGH" | "MEDIUM" | "LOW";
type Status = "TODO" | "DONE";

export type TaskCardProps = {
    id: number;
    title: string;
    description: string;
    dateOfCreation: string;
    priority: Priority;
    status: Status;
    onDelete: (id: number) => void;
    onDone: (id: number) => void;
};

export type Task = {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    dateOfCreation: string;
};

export type CreateTaskDTO = {
    title: string;
    description: string;
    priority: Priority;
};

export type UpdateTaskDTO = Partial<{
    title: string;
    description: string;
    priority: Priority;
    status: Status;
}>;