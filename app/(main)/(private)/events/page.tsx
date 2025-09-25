import EventCard from "@/components/cards/EventCard";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/server/actions/events";
import { auth } from "@clerk/nextjs/server";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";

export default async function EventsPage() {
  // Get the authenticated user's ID
  const { userId, redirectToSignIn } = await auth();

  // Redirect to sign-in page if user is not authenticated
  if (!userId) return redirectToSignIn();

  const events = await getEvents(userId);

  return (
    <div className="flex flex-col items-center gap-8 mb-16 animate-fade-in">
      {/* Page title and "Create Event" button */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <h1 className="text-5xl xl:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
          Events
        </h1>

        {/* Create Event Button */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <Button
            className="relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 text-xl font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
            asChild
          >
            <Link href="/events/new" className="flex items-center gap-3">
              <CalendarPlus className="w-7 h-7" />
              Create Event
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700 transform skew-x-12"></div>
            </Link>
          </Button>
        </div>
      </div>
      {/* Show event cards if any exist, otherwise show empty state */}
      {events.length > 0 ? (
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center gap-8 animate-fade-in">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-xl max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full">
                  <CalendarRange className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No events yet
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              You do not have any events yet. Create your first event to get
              started!
            </p>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <Button
                className="relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 text-xl font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
                asChild
              >
                <Link href="/events/new" className="flex items-center gap-3">
                  <CalendarPlus className="w-7 h-7" />
                  New Event
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700 transform skew-x-12"></div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
