# Trainee Task

### Installing

A step by step series of examples that tell you have to get a development env running

Install mongodb

```
https://docs.mongodb.com/manual/administration/install-community/
```

After installing, start service

```
sudo service mongod start
```

install npm packages

```
npm install
```
seed your db

```
npm run seed
```

start server, and go to the http://localhost:3000

```
npm start
```

Run tests

```
npm test
```


### API

First register user

```
http:localhost:3000/register
POST { email, password}
```

Then login, and retrive auth token

```
http:localhost:3000/login
POST { email, password}
```

Get all practices

```
http:localhost:3000/practices
GET with "authorization" valid token in header
```

Get technologies by practice

```
http:localhost:3000/technologies/{practiceId}
GET with "authorization" valid token in header
```


Pagination, add ?page={number}&limit={number} to your GET query request e.g

```
http://localhost:3000/technologies/1?page=1&limit=5
```
