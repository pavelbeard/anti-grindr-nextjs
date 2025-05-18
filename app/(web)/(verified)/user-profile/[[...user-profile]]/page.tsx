"use client";

import { UserProfile } from "@clerk/nextjs";

import "@/components/web/user-profile/style.css"

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const CustomPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p className="text-gray-600">This is a custom user profile page.</p>
    </div>
  );
};

const UserProfilePage = () => (
  <UserProfile
    path="/user-profile"
    routing="path"
    appearance={{
      elements: {
        rootBox: "w-full",
      },
    }}
  >
    <UserProfile.Page
      label="Custom Page"
      labelIcon={<DotIcon />}
      url="custom-page"
    >
      <CustomPage />
    </UserProfile.Page>
  </UserProfile>
);

export default UserProfilePage;
