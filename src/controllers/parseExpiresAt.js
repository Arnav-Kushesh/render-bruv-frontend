export default function parseExpiresAt(dateObj) {
  // Parse the dates to ensure they are valid Date objects

  if (!dateObj) return 0;

  const firstDate = new Date(dateObj);
  const today = new Date();

  // Get the time difference in milliseconds
  const timeDifference = firstDate - today;

  if (timeDifference <= 0) return 0;

  // Convert the time difference to days
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
}
