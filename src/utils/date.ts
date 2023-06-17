export const toDMYOrder = (value: string) => {
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
};

export const toYMDOrder = (value: string) => {
  const [day, month, year] = value.split("-");
  return `${year}-${month}-${day}`;
};

export const isDMY = (input: string) => {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  return dateRegex.test(input);
};

export const isYMD = (input: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(input);
};

export const formatDate = (dateString: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [day, month, year] = dateString.split("-");
  return `${months[parseInt(month) - 1]} ${day}, ${year}`;
};
