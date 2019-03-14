const isSameDay = require('date-fns/is_same_day');
const format = require('date-fns/format');

/**
 * @typedef {{
 *    date?: string,
 *    dateTime: string
 * }} CalendarDate
 */

/**
 * Подготавливает события к выводу в маттермост
 * @param {Array<Object>} events
 * @returns {string} summary
 */
module.exports = function prepareEvents(events) {
  return (
    events
      .filter(e => e.status === "confirmed")
      // Сортируем события по их времени старта
      .sort((firstEvent, secondEvent) => {
        const firstTime = getDateFromCalendar(firstEvent.start).getTime();
        const secondTime = getDateFromCalendar(secondEvent.start).getTime();
        return firstTime - secondTime;
      })
      .map(event => {
        const lowerCasesSummary = event.summary.toLowerCase();

        const eventDateString = getEventDateString(event.start, event.end);
        const eventDescription = eventDateString
          ? `**${eventDateString}** — ${event.summary}`
          : event.summary;

        if (lowerCasesSummary.includes("отпуск")) {
          return `:palm_tree: ${eventDescription} :palm_tree:`;
        }

        if (lowerCasesSummary.includes("митинг")) {
          return `:drum: ${eventDescription} :drum:`;
        }

        if (
          lowerCasesSummary.includes("pbr") ||
          lowerCasesSummary.includes("grooming") ||
          lowerCasesSummary.includes("груминг")
        ) {
          return `:scissors: ${eventDescription} :scissors:`;
        }

        return eventDescription;
      })
      .join("\n")
  );
};

/**
 * Возвращает строку с временем события
 * @param {CalendarDate} start
 * @param {CalendarDate} end
 * @returns {string}
 */
function getEventDateString(start, end) {
  const isStartAllDay = Boolean(start.date); // Событие идет весь первый день
  const isEndAllDay = Boolean(end.date); // Событие идет весь последний день
  const startDate = getDateFromCalendar(start);
  const endDate = getDateFromCalendar(end);

  // Если у нас событие находится в одном дне
  if (isSameDay(startDate, endDate)) {
    // Нам не нужно указывать ни дату ни время если событие идет целый текущий день
    if (isStartAllDay || isEndAllDay) {
      return "";
    }
    // Если у события в 1 дне есть временные рамки - выводим только время
    const opts = {
      withDate: false
    };
    return `${formatDate(startDate, opts)} - ${formatDate(endDate, opts)}`;
  }

  const date1 = formatDate(startDate, {
    withTime: !isStartAllDay // Если событие идет весь первый день - не имеет смысла указывать время его начала
  });
  const date2 = formatDate(endDate, {
    withTime: !isEndAllDay // Если событие идет весь последний день - не имеет смысла указывать время его конца
  });

  return `${date1} - ${date2}`;
}

/**
 * Возвращает объект даты на основании даты календаря
 * @param {CalendarDate} date
 * @returns {Date}
 */
function getDateFromCalendar(date) {
  return new Date(date.dateTime || date.date);
}

/**
 * Форматирует дату
 * @param {Date} date
 * @param {{ withDate?: boolean, withTime?: boolean }} customParams
 * @returns {string}
 */
function formatDate(date, customParams = {}) {
  const params = {
    withDate: true,
    withTime: true,
    ...customParams
  };
  const parts = [];

  if (params.withDate) {
    parts.push(format(date, "MM.DD.YYYY"));
  }
  if (params.withTime) {
    parts.push(format(date, "HH:mm"));
  }

  return parts.join(" ");
}
