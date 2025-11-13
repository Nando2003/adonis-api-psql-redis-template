## How to run in development

1. Install dependencies

   ```bash
   $ npm install
   ```

2. Copy .env.example to .env and fill in the required environment variables.

   ```bash
   $ cp .env.example .env
   $ node ace generate:key
   ```

3. Run the containers using docker-compose

   ```bash
   $ docker-compose up --build --force-recreate
   ```

4. Run migrations and seed the database

   ```bash
   $ docker compose exec app node ace migration:run
   ```

5. Run the tests

   ```bash
   $ docker compose exec app npm run test
   ```

6. Create tests

   ```bash
   $ node ace make:test posts/create --suite=functional
   ```

## How to run in production

1. Set the environment to production in the .env file.

   ```bash
   NODE_ENV=production
   ```

2. Run build command

   ```bash
   $ npm run build
   ```

3. Start the container

   ```bash
   $ docker compose up --build --force-recreate -d
   ```