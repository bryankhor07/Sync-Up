import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { DAYS_OF_WEEK_IN_ORDER } from "@/constants";

// Define a reusable `createdAt` timestamp column with default value set to now
const createdAt = timestamp("createdAt").notNull().defaultNow();

// Define a reusable `updatedAt` timestamp column with automatic update on modification
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date()); // automatically updates to current time on update

// "events" table definition with fields like name, description, and duration
export const EventTable = pgTable(
  "events", // Table name in the database
  {
    id: uuid("id").primaryKey().defaultRandom(), // Unique ID with default UUID
    // uuid("id"): Defines a column named "id" with the UUID type.
    // .primaryKey(): Makes this UUID the primary key of the table.
    // .defaultRandom(): Automatically fills this column with a randomly generated UUID (v4) if no value is provided.

    name: text("name").notNull(), // Event name
    description: text("description"), // Optional description
    durationInMinutes: integer("durationInMinutes").notNull(), // Duration of the event
    clerkUserId: text("clerkUserId").notNull(), // ID of the user who created it (from Clerk)
    isActive: boolean("isActive").notNull().default(true), // Whether the event is currently active
    createdAt, // Timestamp when event was created
    updatedAt, // Timestamp when event was last updated
  },
  (table) => [
    index("clerkUserIdIndex").on(table.clerkUserId), // Index on clerkUserId for faster querying
  ]
);

// "schedules" table definition, one per user, with timezone and timestamps
export const ScheduleTable = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(), // Primary key with random UUID
  timezone: text("timezone").notNull(), // User's timezone
  clerkUserId: text("clerkUserId").notNull().unique(), // Unique user ID from Clerk
  createdAt, // When the schedule was created
  updatedAt, // When the schedule was last updated
});

// Define relationships for the ScheduleTable: a schedule has many availabilities
export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
  availabilities: many(ScheduleAvailabilityTable), // One-to-many relationship
}));

// PostgreSQL ENUM for the days of the week
export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK_IN_ORDER);

// "scheduleAvailabilities" table definition, which stores available time slots per day
export const ScheduleAvailabilityTable = pgTable(
  "scheduleAvailabilities",
  {
    id: uuid("id").primaryKey().defaultRandom(), // Unique ID
    scheduleId: uuid("scheduleId") // Foreign key to the Schedule table
      .notNull()
      .references(() => ScheduleTable.id, { onDelete: "cascade" }), // Cascade delete when schedule is deleted
    startTime: text("startTime").notNull(), // Start time of availability (e.g. "09:00")
    endTime: text("endTime").notNull(), // End time of availability (e.g. "17:00")
    dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(), // Day of the week (ENUM)
  },
  (table) => [
    index("scheduleIdIndex").on(table.scheduleId), // Index on foreign key for faster lookups
  ]
);

// Define the reverse relation: each availability belongs to a schedule
export const ScheduleAvailabilityRelations = relations(
  ScheduleAvailabilityTable,
  ({ one }) => ({
    schedule: one(ScheduleTable, {
      fields: [ScheduleAvailabilityTable.scheduleId], // local key
      references: [ScheduleTable.id], // foreign key
    }),
  })
);
