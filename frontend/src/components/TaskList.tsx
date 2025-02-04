"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../utils/api";
import { ITask } from "@/types";



export default function TaskList() {
  const { data: tasks, isLoading, error } = useQuery({queryKey: ["tasks"], queryFn: fetchTasks});

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task: ITask) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.completed ? "✅ Done" : "❌ Not Done"}
          </li>
        ))}
      </ul>
    </div>
  );
}
