"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

export default function Chats() {
  const [conversations, setConversations] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the token from local storage
    const token = localStorage.getItem("token");

    // If no token is found, redirect to login page
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch conversations from the API using the token for authorization
    fetch("http://localhost:5000/api/conversations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Conversations:", data);
        setConversations(data); // Update the state with the fetched conversations
      });
  }, [router]);

  // Function to handle selecting a chat and navigating to the chat page
  const selectChat = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 text-center">
          <Button
            variant="solid"
            className="mb-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-6">
            Select a Chat
          </h1>
        </div>
        <div className="p-6 grid grid-cols-1 gap-4">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <div
                key={conversation._id}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                  {conversation.participants
                    .map((p: any) => p.username)
                    .join(", ")}
                </h3>
                <Button
                  variant="solid"
                  className="w-full mt-2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  onClick={() => selectChat(conversation._id)}
                >
                  Open Chat
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300">
              No conversations available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
