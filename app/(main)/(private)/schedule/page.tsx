import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleForm } from "@/components/forms/ScheduleForm";
import { getSchedule } from "@/server/actions/schedule";
import { auth } from "@clerk/nextjs/server";

export default async function SchedulePage() {
  // Check if user is authenticated using Clerk authentication
  const { userId, redirectToSignIn } = await auth();

  // Redirect to sign-in page if user is not authenticated
  if (!userId) return redirectToSignIn();

  // Query the database to fetch the user's schedule based on the authenticated user
  const schedule = await getSchedule(userId);

  return (
    <Card className="max-w-md mx-auto border-8 border-blue-200 shadow-2xl shadow-accent-foreground">
      <CardHeader>
        <CardTitle>Schedule</CardTitle> {/* Display title for the page */}
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
        {/* Render the ScheduleForm component with the fetched schedule */}
      </CardContent>
    </Card>
  );
}
