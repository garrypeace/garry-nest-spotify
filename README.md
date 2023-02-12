### I published this Medium article whilst carrying out this project, please check it out if you wish!
- https://garrypeace.medium.com/crud-api-with-nest-js-prisma-swagger-c74d084935d3

# Pre-requisites
- Node.js installed (18.13)
- Docker Desktop installed

# In terminal

- Clone repo
- Create a new .env file in the root (see Privnote url...)

```
npm install
docker-compose up -d
npx prisma migrate reset
npm run start:dev
```

## Swagger: http://localhost:3000/api

## Example IDs to try:

- 6zlR5ttMfMNmwf2lecU9Cc
  - (Sam Fender's entry already exists so we don't need to go to Spotify to get it)
- 2cnMpRsOVqtPMfq7YiFE6K
  - (Van Halen's entry doesn't exist so we go to Spotify to get the data, and store in the database)
