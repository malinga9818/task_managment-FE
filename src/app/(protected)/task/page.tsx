        
"use client";

import { useMemo, useState, useEffect } from "react";
import TasksFilter from "./components/taskFilters"
import TasksTable from "./components/taskTables";
import TaskCreatePopUp from "./components/taskCreatePopUp";
import { taskListAPI } from "@/lib/service/task";
import { taskDeleteAPI } from "@/lib/service/task";
import EditTaskModal from "./components/taskEdirPopUp";

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "Completed";
}



export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [tasks, setTasks] = useState <Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  
  useEffect(() => {
    async function fetchTasks() {
      const result = await taskListAPI();
      console.log(result);
      if (result.success) {
        console.log("This is the result", result.task);
        setTasks(result.task);
      }
    }
    fetchTasks();
  }, []); 


  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchMatch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      const statusMatch = status === "all" || task.status === status;
      const priorityMatch = priority === "all" || task.priority === priority;
      return searchMatch && statusMatch && priorityMatch;
    });
  }, [tasks, search, status, priority]);

   async function handleDelete(task: Task) {
    const result = await taskDeleteAPI(task.id);
      if (result.success) {
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
      }
    }


    function handleEdit(task: Task) {
      setEditingTask(task);
    }

  function handleUpdated(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
  }
    

  return (
    <div className="flex flex-col bg-gray-50 gap-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <TasksFilter
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
          />
        </div>

        <button
          onClick={() => setOpenPopUp(true)}
          className="w-32 hover:bg-sky-700 bg-sky-500 text-white rounded p-2 shrink-0"
        >
          New Task
        </button>
      </div>

      <TasksTable filteredTasks={filteredTasks} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TaskCreatePopUp
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
      />

      <EditTaskModal
        open={editingTask !== null}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}