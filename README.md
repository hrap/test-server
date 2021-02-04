# test-server
Описание API

Формат данных JSON: 
{
  "uuid": "074911ed-88b8-47c4-b4ad-84d479ba3249",
  "firstName": "Ivan",
  "lastName": "Ivanov"
}

GET http://localhost:3000/person
получение списка персон

POST http://localhost:3000/person
создание персоны 
Тело запроса:
{
  "firstName": "Ivan",
  "lastName": "Ivanov"
}
Тело ответа: 
{
  "uuid": "074911ed-88b8-47c4-b4ad-84d479ba3249",
}

PUT http://localhost:3000/person/074911ed-88b8-47c4-b4ad-84d479ba3249
обновление персоны

Тело запроса:
{
  "uuid": "074911ed-88b8-47c4-b4ad-84d479ba3249",
  "firstName": "Ivan",
  "lastName": "Ivanov"
}

DELETE http://localhost:3000/person/074911ed-88b8-47c4-b4ad-84d479ba3249
удаление персоны
