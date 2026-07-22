// "use client";

// import { useState } from "react";
// import TaskCreatePopUp from "./components/taskCreatePopUp";

// export default function Page() {
//     const [openPopUp, setOpePopUp] = useState(false);

//     return (
//         <div>
//              <div>
//                 <button
//                     onClick={() => setOpePopUp(true)}
//                     className="w-32 hover:bg-sky-700 bg-sky-500 text-white rounded p-2"
//                 >
//                     New Task
//                 </button>


//                 <TaskCreatePopUp
//                     open={openPopUp}
//                     onClose={() => setOpePopUp(false)}
//                 />
//             </div>
           
//         </div>
//     );
// }

        
"use client";

import { useMemo, useState, useEffect } from "react";
import TasksFilter from "./components/taskFilters"
import TasksTable from "./components/taskTables";
import TaskCreatePopUp from "./components/taskCreatePopUp";
import { taskListAPI } from "@/lib/service/task";

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "Completed";
}

// export const tasks: Task[] = [
//   {
//     id: "t1",
//     title: "Set up auth flow",
//     description: "Login and register pages",
//     due_date: "2026-07-25",
//     priority: "High",
//     status: "In Progress",
//   },
//   {
//     id: "t2",
//     title: "Build task modal",
//     description: "Create/edit task popup",
//     due_date: "2026-07-27",
//     priority: "Medium",
//     status: "To Do",
//   },
//   {
//     id: "t3",
//     title: "Analytics dashboard",
//     description: "Charts and KPI cards",
//     due_date: "2026-07-30",
//     priority: "High",
//     status: "To Do",
//   },
//   {
//     id: "t4",
//     title: "Fix login validation",
//     description: "Email format check",
//     due_date: "2026-07-20",
//     priority: "Low",
//     status: "Completed",
//   },
// ];

// export interface Task {
//   title: string;
//   description: string;
//   due_date: string;
//   priority: "High" | "Medium" | "Low";
//   status: "To Do" | "In Progress" | "Completed";
// }

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [tasks, setTasks] = useState <Task[]>([]);
  
  
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

      <TasksTable filteredTasks={filteredTasks} />

      <TaskCreatePopUp
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
      />
    </div>
  );
}