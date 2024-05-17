export function nextTuesday(startDate: Date = new Date()): Date {
  const dayOfWeek = startDate.getDay();
  const daysUntilTuesday = (9 - dayOfWeek) % 7;
  const nextTuesday = new Date(startDate.getTime());
  nextTuesday.setDate(startDate.getDate() + daysUntilTuesday);
  return nextTuesday;
}
