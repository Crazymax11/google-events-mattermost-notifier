const getCalendarEvents = require("./src/getCalendarEvents");
const sendMessageToMattermost = require("./src/sendMessageToMattermost");
const prepareEvents = require("./src/prepareEvents");
const {
  calendarId,
  mattermostHost,
  channel,
  webhookPath
} = require("./config");

const today = new Date();
today.setHours(0, 0, 0);

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
tomorrow.setHours(0, 0, 0);

const aftertomorrow = new Date();
aftertomorrow.setDate(today.getDate() + 2);
aftertomorrow.setHours(0, 0, 0);

Promise.all([
  // события сегодня
  getCalendarEvents({
    calendarId,
    timeMin: today.toISOString(),
    timeMax: tomorrow.toISOString(),
    singleEvents: true
  }),
  // события завтра
  getCalendarEvents({
    calendarId,
    timeMin: tomorrow.toISOString(),
    timeMax: aftertomorrow.toISOString(),
    singleEvents: true
  })
])
  .then(([eventsToday, eventsTomorrow]) => {
    return sendMessageToMattermost({
      username: "Calendar",
      icon_url:
        "http://upload.wikimedia.org/wikipedia/commons/e/e9/Google_Calendar.png",
      text: `
# :calendar: События на сегодня! :calendar: 
${prepareEvents(eventsToday)}

# :calendar: События на завтра! :calendar: 
${prepareEvents(eventsTomorrow)}`,
      webhookPath,
      host: mattermostHost,
      channel
    });
  })
  .then(() => console.log("success"))
  .catch(console.error);
