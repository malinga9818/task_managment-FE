"use client";

import { Fragment, useState } from "react";
import { Task } from "../page";

interface TasksTableProps {
  filteredTasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

function priorityStyle(priority: Task["priority"]) {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-600 border-red-200";
    case "Medium":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Low":
      return "bg-green-50 text-green-700 border-green-200";
  }
}

export default function TasksTable({
  filteredTasks,
  onEdit,
  onDelete,
}: TasksTableProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleRowClick(taskId: string) {
    setSelectedId((prev) => (prev === taskId ? null : taskId));
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Tasks</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="py-2 px-3">Title</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Due Date</th>
                <th className="py-2 px-3">Priority</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <Fragment key={task.id}>
                    <tr
                      onClick={() => handleRowClick(task.id)}
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        selectedId === task.id ? "bg-sky-50" : ""
                      }`}
                    >
                      <td className="py-2 px-3 font-medium">{task.title}</td>
                      <td className="py-2 px-3 text-gray-600">
                        {task.description}
                      </td>
                      <td className="py-2 px-3">{task.due_date}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`text-xs border rounded-full px-2 py-1 ${priorityStyle(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className="text-xs border border-gray-300 rounded-full px-2 py-1">
                          {task.status}
                        </span>
                      </td>
                    </tr>

                    {selectedId === task.id && (
                      <tr className="bg-sky-50 border-b border-gray-100">
                        <td colSpan={5} className="py-2 px-3">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => onEdit?.(task)}
                              className="text-xs bg-sky-500 hover:bg-sky-700 text-white rounded px-3 py-1"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete?.(task)}
                              className="text-xs bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setSelectedId(null)}
                              className="text-xs bg-gray-200 hover:bg-gray-300 rounded px-3 py-1"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}