"use client";

import { taskUpdateAPI } from "@/lib/service/task";
import { useEffect, useState } from "react";
import { Task } from "../page";

interface EditTaskModalProps {
    open: boolean;
    task: Task | null;
    onClose: () => void;
    onUpdated: (updatedTask: Task) => void;
}

export default function EditTaskModal({
    open,
    task,
    onClose,
    onUpdated,
}: EditTaskModalProps) {
    const [formData, setFormData] = useState<Task | null>(task);
    const [error, setError] = useState<string | null>(null);

  // Whenever a different task is passed in, reset the form to match it
    useEffect(() => {
        setFormData(task);
        setError(null);
    }, [task]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (!formData) return;
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    async function handleSubmit() {
        if (!formData) return;
        setError(null);

        const result = await taskUpdateAPI(formData.id, formData);
        if (result.success) {
        onUpdated(formData);
        } else {
        setError("Failed to update task. Please try again.");
        }
    }

  if (!open || !formData) return null;

return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
          placeholder="Task title"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
          placeholder="Description"
        />
        <label className="text-sm">Due Date</label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-sky-500 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}