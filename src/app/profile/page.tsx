"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserCircleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Mock user data - in a real app, this would come from an API or context
const MOCK_USER = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Senior Frontend Developer with 8+ years of experience building responsive web applications with React and TypeScript.",
  avatar: null,
  website: "https://johndoe.dev",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  twitter: "https://twitter.com/johndoe",
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(MOCK_USER);
  const [tempFormData, setTempFormData] = useState(MOCK_USER);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(tempFormData);
    setIsEditing(false);
    // In a real app, you would save the data to your backend here
  };

  const handleCancel = () => {
    setTempFormData(formData);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </button>
        )}
      </div>

      <div className="mb-6 flex items-center">
        {formData.avatar ? (
          <div className="relative h-24 w-24 rounded-full overflow-hidden">
            <Image
              src={formData.avatar}
              alt={formData.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
            <UserCircleIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}

        {isEditing && (
          <div className="ml-4">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Upload new photo
            </button>
            <p className="mt-1 text-xs text-gray-500">
              JPG, PNG or GIF, max 2MB
            </p>
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={tempFormData.name}
                onChange={handleChange}
                className="form-input w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={tempFormData.email}
                onChange={handleChange}
                className="form-input w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={tempFormData.phone}
                onChange={handleChange}
                className="form-input w-full"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={tempFormData.location}
                onChange={handleChange}
                className="form-input w-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Professional Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={tempFormData.bio}
              onChange={handleChange}
              className="form-input w-full"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
            >
              <XMarkIcon className="h-4 w-4 mr-1" />
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <CheckIcon className="h-4 w-4 mr-1" />
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1 text-sm text-gray-900">{formData.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Email Address
              </h3>
              <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Phone Number
              </h3>
              <p className="mt-1 text-sm text-gray-900">{formData.phone}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="mt-1 text-sm text-gray-900">{formData.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Professional Bio
            </h3>
            <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
              {formData.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
