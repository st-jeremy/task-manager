"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTask, fetchTasks } from "@/utils/api";

interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  modified_at: string;
}

const Tasks: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  // Fetch existing tasks
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Mutation for adding a new task
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh task list after adding
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent submitting empty titles
    addTaskMutation.mutate({ title, description });
    setTitle("");
    setDescription("");
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <div className="p-4 bg-white rounded shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Add a new task"
            className="p-2 border border-gray-300 rounded-md text-black w-full"
            required
          />
        </label>
        <label>
          <span>Description</span>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description of the new task"
            className="p-2 border border-gray-300 rounded-md text-black w-full"
          />
        </label>
        <button
          type="submit"
          disabled={addTaskMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addTaskMutation.isPending ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <ul className="mt-6 space-y-2">
        {tasks?.length === 0 ? (
          <li>No Task Added</li>
        ) : (
          tasks?.map((t: ITask) => (
            <li key={t.id} className="p-2 bg-gray-100 rounded">
              <strong>{t.title}</strong> - {t.description}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Tasks;
