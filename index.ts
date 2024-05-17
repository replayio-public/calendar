import assert from "assert";

import { google } from "googleapis";

import { authorize } from "./auth";
import { CalendarId, StartDate, TeamMembers, WeeksCount } from "./config";

async function main() {
  assert(CalendarId, "CALENDAR_ID is required.");
  assert(
    TeamMembers.length > 0,
    "CALENDAR_TEAM_MEMBERS must contain at least 1 team member.",
  );

  const calendarApi = google.calendar({
    version: "v3",
    auth: await authorize(),
  });

  async function createAllDayEvent(
    attendees: { email: string }[],
    calendarId: string,
    summary: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ) {
    await calendarApi.events.insert({
      calendarId,
      requestBody: {
        attendees,
        summary,
        description,
        start: {
          date: startDate.toISOString().split("T")[0],
        },
        end: {
          date: endDate.toISOString().split("T")[0],
        },
      },
    });
  }

  const promises: Promise<void>[] = [];
  for (let i = 0; i < WeeksCount; i++) {
    const primaryOnCallIndex = i % TeamMembers.length;
    const backupOnCallIndex = (i + 1) % TeamMembers.length;

    const primaryOnCallMember = TeamMembers[primaryOnCallIndex];
    const backupOnCallMember = TeamMembers[backupOnCallIndex];

    const cycleStartDate = new Date(StartDate);
    cycleStartDate.setDate(StartDate.getDate() + i * 7);

    const cycleEndDate = new Date(cycleStartDate);
    cycleEndDate.setDate(cycleStartDate.getDate() + 7);

    promises.push(
      createAllDayEvent(
        [{ email: primaryOnCallMember.email }],
        CalendarId,
        `${primaryOnCallMember.name}: On-Call (Made by 🤖)`,
        `Primary On-Call: ${primaryOnCallMember.name}`,
        cycleStartDate,
        cycleEndDate,
      ),
    );
    promises.push(
      createAllDayEvent(
        [{ email: backupOnCallMember.email }],
        CalendarId,
        `${backupOnCallMember.name}: Backup On-Call (Made by 🤖)`,
        `Backup On-Call: ${backupOnCallMember.name}`,
        cycleStartDate,
        cycleEndDate,
      ),
    );
  }
  await Promise.all(promises);

  console.log("On-call schedule generated successfully.");
}

main().catch(console.error);
