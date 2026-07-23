"use client"

import { useState, useEffect } from "react";
import "../globals.css";
import { getCurrentUser } from "@/lib/service/getCurrentUser";
import NaviBar from "@/components/common/naviBar";
import SideBar from "@/components/common/sideBar";
import { useRouter } from "next/navigation";
import { profileAPI } from "@/lib/service/user";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const result = await profileAPI();
      if (!result.success) {
        router.push("/login");
      } else {
        setChecking(false);
      }
    }
    checkAuth();
  }, []);

  if (checking) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r">
        <SideBar/>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="h-16 border-b bg-white">
          <NaviBar/>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
