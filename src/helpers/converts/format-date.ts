import { format } from "date-fns";

export const formatDate = (
  date: Date | string,
  pattern = "yyyy/MM/dd HH:mm"
) => {
  return format(new Date(date), pattern);
};
