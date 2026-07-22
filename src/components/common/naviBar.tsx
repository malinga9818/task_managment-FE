// export default function NaviBar() {
//     return(
//         <header className="flex h-16 items-center justify-end border-b border-slate-200 bg-white px-6">


//   <div className="flex items-center gap-4">
//     <h4 className="text-slate-700">Malinga</h4>

//     <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center"> <h3 className="text-white">M</h3></div>
//   </div>

// </header>
//     )
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAPI } from "@/lib/service/auth";
import { profileAPI } from "@/lib/service/user";
import EditProfileModal from "./editProfileModal"; // ← 1. import the modal

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string; // ← add this so the modal can read/show the current picture
}

export default function NaviBar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false); // ← 2. new state for the modal
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const result = await profileAPI();
      if (result.success) {
        setUser(result.user);
      }
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const result = await logoutAPI();
    if (result.success) {
      router.push("/login");
    }
  }

  function handleEditProfile() {
    setMenuOpen(false);
    setEditProfileOpen(true); // ← 3. open the modal instead of router.push
  }

  const initial = user?.firstName ? user.firstName.charAt(0).toUpperCase() : "?";

  return (
    <header className="flex h-16 items-center justify-end border-b border-slate-200 bg-white px-6">
      <div className="relative flex items-center gap-4" ref={menuRef}>
        <h4 className="text-slate-700">{user?.firstName ?? "Loading..."}</h4>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center"
        >
          <h3 className="text-white">{initial}</h3>
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-12 w-44 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-10">
            <button
              onClick={handleEditProfile}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* 4. render the modal here, outside the dropdown but still inside <header> */}
      <EditProfileModal
        open={editProfileOpen}
        user={user}
        onClose={() => setEditProfileOpen(false)}
        onUpdated={(updatedUser) => setUser(updatedUser)}
      />
    </header>
  );
}