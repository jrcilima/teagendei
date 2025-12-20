# Updated collision detection logic to respect intervals for blocking schedules.

export function hasCollision(slot, schedule) {
    const slotStart = new Date(slot.start_time);
    const slotEnd = new Date(slot.end_time);
    const scheduleStart = new Date(schedule.start_time);
    const scheduleEnd = new Date(schedule.end_time);

    // Check if slots overlap
    return (slotStart < scheduleEnd && slotEnd > scheduleStart);
}