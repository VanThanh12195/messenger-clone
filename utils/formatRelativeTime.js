import { formatDistanceToNow } from "date-fns";

export const formatRelativeTime = (date) => {
  const distance = formatDistanceToNow(date, {
    // includeSeconds: true,
  });

  if (distance === "less than a minute") return "1m";

  const parts = distance.match(/(\d+)\s(\w+)/);

  if (parts && parts.length === 3) {
    const numericValue = parseInt(parts[1]);
    const timeUnit = parts[2];

    if (timeUnit.includes("month")) return `${numericValue}mo`;

    if (timeUnit.includes("day") && numericValue > 6)
      return `${parseInt(numericValue / 7)}w`;

    if (timeUnit.includes("week") && numericValue > 51)
      return `${parseInt(numericValue / 52)}y`;

    return `${numericValue}${timeUnit[0]}`;
  }
};
