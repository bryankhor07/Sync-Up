import { formatEventDescription } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Type definition for event card props
type PublicEventCardProps = {
  id: string;
  name: string;
  clerkUserId: string;
  description: string | null;
  durationInMinutes: number;
};

// Component to display a single event card
export default function PublicEventCard({
  id,
  name,
  description,
  clerkUserId,
  durationInMinutes,
}: PublicEventCardProps) {
  return (
    <div className="group relative transform transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1">
      {/* Glow effect - simplified and stabilized */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-15 transition-opacity duration-500 ease-out"></div>

      <Card className="relative bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl rounded-2xl transition-shadow duration-300 ease-out overflow-hidden">
        {/* Card header */}
        <CardHeader className="pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-sm shrink-0 transition-transform duration-200 group-hover:scale-105">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl font-bold text-gray-800 truncate mb-2 transition-colors duration-200 group-hover:text-indigo-700">
                {name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-gray-600 transition-colors duration-200">
                <Clock className="w-4 h-4" />
                {formatEventDescription(durationInMinutes)}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Description */}
        {description && (
          <CardContent className="pt-0 pb-4">
            <p className="text-gray-600 leading-relaxed line-clamp-3 transition-colors duration-200">
              {description}
            </p>
          </CardContent>
        )}

        {/* Footer with select button */}
        <CardFooter className="pt-4 border-t border-gray-100/50">
          <div className="w-full relative overflow-hidden">
            <Button
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-xl transition-all duration-300 ease-out border-0 text-lg font-semibold py-3 rounded-xl relative overflow-hidden group/btn"
              asChild
            >
              <Link
                href={`/book/${clerkUserId}/${id}`}
                className="flex items-center justify-center gap-2 relative z-10"
              >
                Select Event
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                {/* Simplified shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full transition-transform duration-700 ease-out"></div>
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
