const fs = require("fs");
const { google } = require("googleapis");
const readFile = require("./readFile");
const getAccessToken = require("./getAccessToken");

/**
 * Авторизует в гугле
 * @param {Object} credentials
 * @returns {Promise<Object>} oAuthClient
 */
module.exports = async function authorize({ credentials, tokenPath }) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  try {
    // Пытаемся заиспользовать локальный токен
    const token = await readFile(tokenPath);
    oAuth2Client.setCredentials(JSON.parse(token));
  } catch (err) {
    // если не получилось, получаем новый токен через авторизацию
    const token = await getAccessToken(oAuth2Client);
    oAuth2Client.setCredentials(token);
    fs.writeFileSync(tokenPath, JSON.stringify(token));
  }
  return oAuth2Client;
};
