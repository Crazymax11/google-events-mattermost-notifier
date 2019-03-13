const readFile = require("./readFile");
const authorize = require("./authorize");
const listEvents = require("./listEvents");

/**
 * Получить события из календаря гугл
 * @param {Object} calendarApiOptions
 * @see https://developers.google.com/calendar/v3/reference/events/list
 */
module.exports = async function getCalendarEvents(calendarApiOptions) {
  const creds = await readFile("credentials.json");
  const auth = await authorize({
    credentials: JSON.parse(creds),
    tokenPath: "token.json"
  });
  const events = await listEvents({ auth, calendarApiOptions });
  return events;
};
