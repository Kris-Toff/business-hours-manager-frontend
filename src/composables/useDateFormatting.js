import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(customParseFormat).extend(advancedFormat);

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

  return { dateStringFormat };
}
