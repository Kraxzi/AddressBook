RUN LOCALLY:

npm install
docker-compose up
npm run migrate:dev
npm start

=====================================================

TEST:

npm run test

=====================================================

ENDPOINTS:

REGISTER:

POST
http://localhost:8080/api/auth/register

BODY:

{
"email": "",
"password": ""
}

---

LOGIN:

POST
http://localhost:8080/api/auth/login

{
"email": "",
"password": ""
}

---

ADD CONTACT:

POST
http://localhost:8080/api/contacts/addContact

{
"firstName": "",
"lastName": "",
"phoneNumber": "",
"address": ""
}

P.S. you need to provide token in "Authorization" header
