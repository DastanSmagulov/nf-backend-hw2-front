"use client";

import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";

export default function Home() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-950">
      <div className="max-w-md w-full space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Welcome to Chat App
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please register, login, or go to chats to continue.
          </p>
        </div>
        <div className="flex justify-around mt-4">
          <Button
            variant="solid"
            className="w-32"
            onClick={() => navigateTo("/register")}
          >
            Register
          </Button>
          <Button
            variant="solid"
            className="w-32"
            onClick={() => navigateTo("/login")}
          >
            Login
          </Button>
          <Button
            variant="solid"
            className="w-32"
            onClick={() => navigateTo("/chats")}
          >
            Go to Chats
          </Button>
        </div>
      </div>
    </div>
  );
}
