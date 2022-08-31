export const handleDateFormat = (startDate: string) => {
  if (!startDate) return null;
  const day = new Date(startDate).toLocaleDateString('en-GB');
  const time = new Date(startDate).toLocaleTimeString('en-GB');
  return {
    day,
    time,
  };
};
