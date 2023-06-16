export const toDMYOrder = (value: string) => {
    const [year, month, day] = value.split("-");
    return `${day}-${month}-${year}`;
}

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
      "Dec"
    ];
    const [day, month, year] = dateString.split("-");
    return `${months[parseInt(month) - 1]} ${day}, ${year}`;
  }