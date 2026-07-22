"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
    const pathname = usePathname();

    const sideItem = [
        {
            label: "Overview",
            href: "/overview"
        },
        {
            label: "Tasks",
            href: "/task"
        }
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 p-6">
            <h1 className="text-xl font-bold text-blue-400">
                TaskFlow
            </h1>

            <nav className="mt-8 space-y-2">
                {sideItem.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`block w-full rounded-lg px-4 py-3 text-left ${
                            pathname === item.href
                                ? "bg-blue-400 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}