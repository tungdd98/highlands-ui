import { TimeStatisticalEnum } from "features/dashboard/dashboard";

export const STATISTICAL_TIME: Record<TimeStatisticalEnum, string> = {
  [TimeStatisticalEnum.YEAR]: "than last year",
  [TimeStatisticalEnum.MONTH]: "than last month",
  [TimeStatisticalEnum.WEEK]: "than last week",
};

export const STATISTICAL_TIME_SELECT = [
  { value: TimeStatisticalEnum.WEEK, label: "Last week" },
  { value: TimeStatisticalEnum.MONTH, label: "Last month" },
  { value: TimeStatisticalEnum.YEAR, label: "Last year" },
];
