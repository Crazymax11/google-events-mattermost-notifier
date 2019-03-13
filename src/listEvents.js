const { google } = require("googleapis");

/**
 * Получает события из календаря
 * @param {Object} oAuthClient
 * @returns {Promise<Array<Object>>} events
 */
module.exports = function listEvents({ auth, calendarApiOptions }) {
  const calendar = google.calendar({ version: "v3", auth });

  return new Promise((resolve, reject) => {
    calendar.events.list(calendarApiOptions, (err, res) => {
      if (err) return reject(err);
      const events = res.data.items;
      return resolve(events);
    });
  });
};
