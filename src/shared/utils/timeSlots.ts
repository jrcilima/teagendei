export function generateTimeSlots(
  businessHours: Record<string, { start: string; end: string }[]>,
  date: Date,
  duration: number
) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  const dayConfig = businessHours[weekday];
  if (!dayConfig) return [];

  const slots: string[] = [];

  for (const interval of dayConfig) {
    const start = toMinutes(interval.start);
    const end = toMinutes(interval.end);

    for (let t = start; t + duration <= end; t += duration) {
      slots.push(fromMinutes(t));
    }
  }

  return slots;
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
