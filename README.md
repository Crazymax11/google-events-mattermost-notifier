# Уведомлятор о запланированных событиях в гугл календаре в маттермост!

## Установка

* git clone этого репозитория
* Переименуй config.sample.js в config.js `cp config.sample.js config.js` и введи там свои данные:
    * host маттермоста
    * вебхук маттермоста
    * id календаря гугл
    * Канал, в который постить в маттермосте
* Получи google api credentials. Это очень тернистый путь, но надо получить ключи для oauth авторизации вот здесь https://console.developers.google.com/apis/credentials
* Запусти проект `npm start`, во время первой авторизации тебе придется посетить сайт гугла. Следуй инструкциям в командной строке
