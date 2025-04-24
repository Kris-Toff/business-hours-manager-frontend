import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import advancedFormat from "dayjs/plugin/advancedFormat";
// import relativeTime from "dayjs/plugin/relativeTime";
// import duration from "dayjs/plugin/relativeTime";
// dayjs
//   .extend(customParseFormat)
//   .extend(advancedFormat)
//   .extend(duration)
//   .extend(relativeTime);
// dayjs.tz.setDefault("Asia/Hong_Kong");

export function useDateFormatting() {
  /**
   *
   * @param {String} dateString - Raw date time string
   * @param {String} format - Date format (https://day.js.org/docs/en/display/format)
   * @returns - Parsed date
   */
  const dateStringFormat = (dateString, format = "MM/DD/YYYY") => {
    if (!dateString) return;

    return dayjs(dateString).format(format);
  };

  const humanizeDate = (dateTimeString) => {
    if (!dateTimeString) return;

    const inputDate = dayjs(dateTimeString).startOf("day");
    const today = dayjs().startOf("day");

    const diff = inputDate.diff(today, "day");

    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "yesterday";
    if (diff > 1) return `in ${diff} days`;
    if (diff < -1) return `${Math.abs(diff)} days ago`;
  };

  return { dateStringFormat, humanizeDate };
}
