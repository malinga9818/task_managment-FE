"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { profileAPI } from "@/lib/service/user";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const result = await profileAPI();
      if (result.success) {
        router.push("/tasks");
      } else {
        router.push("/login");
      }
    }
    checkAuth();
  }, []);

  return <div className="p-6 text-gray-500">Loading...</div>;}