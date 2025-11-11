export const combineDateTime = (date: string, time: string): string => {
  if (!date || !time) return "";
  const dateObj = new Date(date);
  const [hours, minutes] = time.split(":");

  dateObj.setHours(parseInt(hours, 10));
  dateObj.setMinutes(parseInt(minutes, 10));
  dateObj.setSeconds(0);
  dateObj.setMilliseconds(0);
  return dateObj.toISOString();
};

export const extractTimeFromDateTime = (dateTimeString?: string): string => {
  if (!dateTimeString) return "";

  try {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch {
    return "";
  }
};

export const extractDateFromDateTime = (dateTimeString?: string): string => {
  if (!dateTimeString) return new Date().toISOString().split("T")[0];

  try {
    const date = new Date(dateTimeString);
    return date.toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
};
