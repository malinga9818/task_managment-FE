"use client";

import { useEffect, useState } from "react";
import { profileUpdateAPI } from "@/lib/service/user";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface EditProfileModalProps {
  open: boolean;
  user: UserProfile | null;
  onClose: () => void;
  onUpdated: (updatedUser: UserProfile) => void;
}

export default function EditProfileModal({
  open,
  user,
  onClose,
  onUpdated,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<UserProfile | null>(user);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setFormData(user);
    setError(null);
    setSuccess(false);
    setClosing(false);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit() {
    if (!formData) return;
    setError(null);

    const result = await profileUpdateAPI({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });

    if (result.success) {
      setSuccess(true);
      onUpdated(result.user);

      setTimeout(() => {
        setClosing(true);
      }, 1000);

      setTimeout(() => {
        onClose();
      }, 1300);
    } else {
      setError("Failed to update profile. Please try again.");
    }
  }

  if (!open || !formData) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/40 z-50 transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-96">
        {success ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <p className="text-green-700 font-medium">Profile updated!</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
              placeholder="First name"
            />

            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
              placeholder="Last name"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
              placeholder="Email"
            />

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
          </>
        )}
      </div>
    </div>
  );
}