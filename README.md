# Locus

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
   For the environment variables, you will need:
   - Postgres SQL, you can run it locally or set up any cloud Postgres database
   - Clarifai API key, get one at https://www.clarifai.com/
2. Install dependencies: `npm i`
3. To reset database: `npm run db:reset`
4. Run the server: `npm run local`
5. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
