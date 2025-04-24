import dayjs from "dayjs";

export function useTimeFormatting() {
  /**
   *
   * @param {String} currentTime
   * @param {String} startTime
   * @param {String} endTime
   * @param {String} unit
   * @returns Returns a boolean if current time is between start and end time
   */
  const timeComparisons = (
    currentTime,
    startTime,
    endTime,
    unit = "minute"
  ) => {
    let status = false;

    let [startHours, startMinutes] = startTime.split(":");
    let [endHours, endMinutes] = endTime.split(":");
    let [currentHours, currentMinutes] = currentTime.split(":");

    let start = dayjs().hour(startHours).minute(startMinutes);
    let end = dayjs().hour(endHours).minute(endMinutes);
    let current = dayjs().hour(currentHours).minute(currentMinutes);

    let diffStart = current.diff(start, unit);
    let diffEnd = current.diff(end, unit);

    if (diffStart > 0 && diffEnd < 0) status = true;

    return {
      isBefore: diffStart < 0,
      isBetween: status,
      isAfter: diffEnd > 0,
    };
  };

  /**
   *
   * @param {String} currentTime
   * @param {String} startTime
   * @param {String} unit
   * @returns Returns the difference of start and current time
   */
  const countdownTimer = (currentTime, startTime, unit = "minute") => {
    let [startHours, startMinutes] = startTime.split(":");
    let [currentHours, currentMinutes] = currentTime.split(":");

    let start = dayjs().hour(startHours).minute(startMinutes);
    let current = dayjs().hour(currentHours).minute(currentMinutes);

    let diff = start.diff(current, unit);

    return diff;
  };

  /**
   *
   * @param {Number} duration
   * @param {String} unit
   * @returns
   */
  const humanizeTime = (duration, unit = "minutes") => {
    return dayjs.duration(duration, unit).humanize();
  };

  return { timeComparisons, countdownTimer, humanizeTime };
}
