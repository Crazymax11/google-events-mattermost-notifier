const readline = require("readline");

/**
 *
 * Получает новый access токен через oauth гугла. Попросит пройти по ссылке из консоли
 * @param {Object} oAuth2Client
 * @returns {Promise<Object>} token
 */
module.exports = function getAccessToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar.readonly"]
    });
    console.log("Авторизуйся пройдя по урлу: ", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Введи код со страницы: ", code => {
      rl.close();
      // eslint-disable-next-line consistent-return
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      });
    });
  });
};
