/**
 * Подготавливает события к выводу в маттермост
 * @param {Array<Object>} events
 * @returns {string} summary
 */
module.exports = function prepareEvents(events) {
  return events
    .filter(e => e.status === "confirmed")
    .map(event => {
      const lowerCasesSummary = event.summary.toLowerCase();
      const start = event.start.dateTime
        ? new Date(event.start.dateTime)
        : new Date(event.start.date);
      const end = event.end.dateTime
        ? new Date(event.end.dateTime)
        : new Date(event.end.date);
      const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
      const eventDescription =
        start.toLocaleDateString("ru-RU") === end.toLocaleDateString("ru-RU")
          ? `${start.toLocaleString("ru-RU", options)} - ${end.toLocaleString(
              "ru-RU",
              options
            )} ${event.summary}`
          : `${start.toLocaleDateString("ru-RU")} - ${end.toLocaleDateString(
              "ru-RU"
            )} ${event.summary}`;

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

      return `${start} - ${event.summary}`;
    })
    .join("\n");
};
