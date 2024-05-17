import dotenv from "dotenv";
import z from "zod";

import { nextTuesday } from "./util";

dotenv.config();

const ZTeamMember = z.array(
  z.object({
    name: z.string(),
    email: z.string(),
  }),
);

export const StartDate = process.env.CALENDAR_START_DATE
  ? new Date(process.env.CALENDAR_START_DATE)
  : nextTuesday();
export const CalendarId = process.env.CALENDAR_ID;
export const WeeksCount = process.env.CALENDAR_WEEKS_COUNT
  ? Number(process.env.CALENDAR_WEEKS_COUNT)
  : 6;
export const TeamMembers = process.env.CALENDAR_TEAM_MEMBERS
  ? ZTeamMember.parse(JSON.parse(process.env.CALENDAR_TEAM_MEMBERS) || [])
  : [];
