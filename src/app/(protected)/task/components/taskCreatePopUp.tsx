"use client";

import { taskCreateAPI } from "@/lib/service/task";
import { useState } from "react";

interface CreateTaskModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CreateTaskModal({
    open,
    onClose
}: CreateTaskModalProps) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [task, setTask] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "Medium",
        status: "To Do"
    });


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };


    async function handleSubmit(){
        setError(null)
        const result = await taskCreateAPI(task);
        if(result.success){
            setSuccess(true);
            setTimeout (() => {
                setSuccess(false),
                onClose();
            }, 1200);
        }
        else{
            setError("Failed to Create Task. Please try again");
        }
    }

    if (!open) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">
                    Create New Task
                </h2>
                <input
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                    placeholder="Task title"
                />
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                    placeholder="Description"
                />
                <label className="text-sm">
                    Due Date
                </label>
                <input
                    type="date"
                    name="due_date"
                    value={task.due_date}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                />
                <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                {success && (
                <p className="mb-3 text-sm text-green-600 font-medium">
                         ✅ Task created successfully!
                </p>
                )}
                {error && (
                    <p className="mb-3 text-sm text-red-500">{error}</p>
                )}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-sky-500 text-white rounded"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}