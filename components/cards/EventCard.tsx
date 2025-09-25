import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatEventDescription } from "@/lib/formatters";
import { Button } from "../ui/button";
import Link from "next/link";
import { CopyEventButton } from "../CopyEventButton";
import { Clock, Edit, Calendar } from "lucide-react";

// Type definition for event card props
type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

// Component to display a single event card
export default function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

      <Card
        className={cn(
          "relative bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1",
          "before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/20",
          !isActive && "opacity-60 hover:opacity-80"
        )}
      >
        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={cn(
              "w-3 h-3 rounded-full shadow-sm",
              isActive
                ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-green-200"
                : "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-200"
            )}
          >
            <div
              className={cn(
                "w-full h-full rounded-full animate-ping",
                isActive ? "bg-green-400" : "bg-gray-400"
              )}
            ></div>
          </div>
        </div>

        {/* Card header */}
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "p-2.5 rounded-xl shrink-0 shadow-sm",
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                  : "bg-gradient-to-r from-gray-400 to-gray-500"
              )}
            >
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-bold text-gray-800 truncate">
                {name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-gray-600 mt-1">
                <Clock className="w-4 h-4" />
                {formatEventDescription(durationInMinutes)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Description */}
        {description && (
          <CardContent className="pt-0 pb-4">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </CardContent>
        )}

        {/* Footer with actions */}
        <CardFooter className="flex justify-end gap-2 pt-4 border-t border-gray-100/50">
          {isActive && (
            <CopyEventButton
              variant="outline"
              eventId={id}
              clerkUserId={clerkUserId}
              className="bg-white/60 hover:bg-white/80 border-gray-200/50 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 transition-all duration-200 relative z-10"
            />
          )}

          <div className="relative group/button">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-0 group-hover/button:opacity-30 transition-opacity duration-200"></div>
            <Button
              className="relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border-0"
              asChild
            >
              <Link
                href={`/events/${id}/edit`}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
