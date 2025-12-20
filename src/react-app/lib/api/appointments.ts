// Note: use actual application logic here
function createStaffAppointment({ start_time, duration_minutes }) {
  // Ensure duration_minutes is computed correctly
  if (!duration_minutes || duration_minutes <= 0) {
    throw new Error("Invalid duration_minutes");
  }

  const end_time = new Date(start_time);
  end_time.setMinutes(end_time.getMinutes() + duration_minutes);

  return {
    start_time,
    end_time,
  };
}

// Example usage
const appointment = createStaffAppointment({
  start_time: new Date("2025-12-20T14:00:00Z"),
  duration_minutes: 30,
});

console.log(appointment);