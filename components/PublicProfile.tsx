"use client";

import { getPublicEvents, PublicEvent } from "@/server/actions/events";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Copy, Eye, Calendar, Clock, Users } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { toast } from "sonner";
import PublicEventCard from "./PublicEventCard";

// Define types for the props that PublicProfile component will receive
type PublicProfileProps = {
  userId: string; // The user ID for the profile
  fullName: string | null; // User's full name
};

export default function PublicProfile({
  userId,
  fullName,
}: PublicProfileProps) {
  // State to store events and loading state
  const [events, setEvents] = useState<PublicEvent[] | null>(null);
  const { user } = useUser();

  const copyProfileUrl = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/book/${userId}`
      );
      toast("Profile URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getPublicEvents(userId); // Call the action to get public events
        setEvents(fetchedEvents); // Set the events state
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Optionally, set an empty array in case of an error
      }
    };

    fetchEvents(); // Fetch events on component mount
  }, [userId]); // Only refetch events when userId changes

  // Render loading component if events are not yet fetched
  if (events === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8">
      {user?.id === userId && (
        // Info message with Eye icon (for profile owner only)
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 shadow-lg flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <p className="text-gray-700 font-semibold">
              This is how people will see your public profile
            </p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in">
        {/* User's name with gradient effect */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {fullName}
          </h1>

          {/* Copy Public Profile URL Button */}
          {user?.id === userId && (
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <Button
                  className="relative bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  variant="outline"
                  onClick={copyProfileUrl}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Public Profile URL
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Welcome message */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Time to meet! 🧑‍🤝‍🧑
            </h2>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Pick an event and let's make it official by booking a time.
          </p>
        </div>
      </div>

      {/* Events Section */}
      {events.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-xl max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full">
                  <Calendar className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No events available
            </h3>
            <p className="text-xl text-gray-600">
              No events available at the moment.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {events.map((event, index) => (
            <div key={event.id}>
              <PublicEventCard {...event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
