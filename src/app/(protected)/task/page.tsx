"use client";

import { useState } from "react";
import TaskCreatePopUp from "./components/taskCreatePopUp";

export default function Page() {
    const [openPopUp, setOpePopUp] = useState(false);

    return (
        <div>
             <div>
                <button
                    onClick={() => setOpePopUp(true)}
                    className="w-32 hover:bg-sky-700 bg-sky-500 text-white rounded p-2"
                >
                    New Task
                </button>


                <TaskCreatePopUp
                    open={openPopUp}
                    onClose={() => setOpePopUp(false)}
                />
            </div>
           
        </div>
    );
}