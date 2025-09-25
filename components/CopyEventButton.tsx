"use client";
// Marks this file for client-side rendering (required for hooks like useState)

import { VariantProps } from "class-variance-authority";
// VariantProps is a TypeScript utility type from the class-variance-authority (CVA) library. It's used to type the props for variants (like size, color, style, etc.)
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Copy, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Define the possible visual states for the copy action
type CopyState = "idle" | "copied" | "error";

// Define the props for the CopyEventButton component
interface CopyEventButtonProps
  extends Omit<React.ComponentProps<"button">, "children" | "onClick">, // Inherit all native button props except children & onClick
    VariantProps<typeof buttonVariants> {
  // Allow variant and size props from button styling
  eventId: string; // Required: event ID for the booking link
  clerkUserId: string; // Required: user ID for the booking link
}

// Returns the appropriate button label and icon based on the current copy state
function getCopyContent(state: CopyState) {
  switch (state) {
    case "copied":
      return {
        label: "Copied!",
        icon: Check,
        className: "text-green-600",
      };
    case "error":
      return {
        label: "Error",
        icon: X,
        className: "text-red-600",
      };
    case "idle":
    default:
      return {
        label: "Copy Link",
        icon: Copy,
        className: "",
      };
  }
}

// Reusable button component that copies a URL to clipboard
export function CopyEventButton({
  eventId,
  clerkUserId,
  className,
  variant = "outline",
  size,
  ...props // Any other button props like disabled, type, etc.
}: CopyEventButtonProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle"); // Manage the copy feedback state

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event bubbling

    const url = `${location.origin}/book/${clerkUserId}/${eventId}`; // Construct the booking URL

    try {
      await navigator.clipboard.writeText(url); // Try to copy the URL
      setCopyState("copied"); // On success, show "Copied!" state
      toast("Link copied successfully.", {
        duration: 3000,
      });
      setTimeout(() => setCopyState("idle"), 2000); // Reset after 2 seconds
    } catch (error) {
      setCopyState("error"); // On failure, show "Error" state
      toast("Failed to copy link", { duration: 3000 });
      setTimeout(() => setCopyState("idle"), 2000); // Reset after 2 seconds
    }
  };

  const {
    label,
    icon: Icon,
    className: stateClassName,
  } = getCopyContent(copyState);

  return (
    <Button
      onClick={handleCopy}
      className={cn(
        "relative z-10 cursor-pointer transition-all duration-200 hover:scale-105",
        stateClassName,
        className
      )}
      variant={variant}
      size={size}
      disabled={copyState === "copied" || copyState === "error"}
      {...props}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}
