import { TimeStatisticalEnum } from "features/dashboard/dashboard";

export const STATISTICAL_TIME: Record<TimeStatisticalEnum, string> = {
  [TimeStatisticalEnum.YEAR]: "than last year",
  [TimeStatisticalEnum.MONTH]: "than last month",
  [TimeStatisticalEnum.WEEK]: "than last week",
};
