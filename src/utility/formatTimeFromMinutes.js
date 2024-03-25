export default function formatTimeFromMinutes(noOfMinutes) {
  // Calculate hours and minutes
  const hours = Math.floor(noOfMinutes / 60);
  const minutes = noOfMinutes % 60;

  if (hours === 0) {
    return `${minutes} minutes`;
  }

  // Format hours and minutes
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // Construct the formatted string
  const formattedTime = `${formattedHours} hours and ${formattedMinutes} minutes`;

  return formattedTime;
}
