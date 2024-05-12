# API REST About Great Coffee Recipes! ☕️
## Aproach to Clean Architecture

## Used Technologies:

- NodeJs: v20.12.2
- ExpressJS
- Typescript
- Jest

## Endpoints

### GET `/recipes`
Retrieve list of coffee recipes.

- query params
  - page (page number)
  - limit (items per page)
  - lang: language (en/es)

### GET `/recipes/random`
Retrieve a random coffee recipe

- query params
  - language (en/es)

### GET `/recipes/ingredient/:ingredient`
find recipe by ingredient

- query params
  - language: (en/es)
- path params
  - ingredient

## Steps to run de application

1. git clone: https://github.com/alex-martinez-jativa/coffee-api.git
2. npm install
3. npm run dev (development environment)
4. npm run build
5. npm start