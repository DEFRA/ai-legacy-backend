# AI Legacy Backend

Core delivery platform Node.js Backend Template.

## Table of Contents

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Local Development](#local-development)
  - [Setup](#setup)
  - [Database Setup](#database-setup)
  - [Development](#development)
  - [Testing](#testing)
  - [Production](#production)
  - [NPM Scripts](#npm-scripts)
  - [Formatting](#formatting)
    - [Windows Prettier Issue](#windows-prettier-issue)
- [Development Helpers](#development-helpers)
  - [MongoDB Locks](#mongodb-locks)
- [Docker](#docker)
  - [Development Image](#development-image)
  - [Production Image](#production-image)
  - [Docker Compose](#docker-compose)
  - [Complete Setup with Database Seeding](#complete-setup-with-database-seeding)
- [Database Migrations](#database-migrations)
- [License](#license)
  - [About the License](#about-the-license)

## Requirements

### Node.js

Please install [Node.js](http://nodejs.org/) `>= v22` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd ai-legacy-backend
nvm use
```

## Local Development

### Setup

Install application dependencies:

```bash
npm install
```

### Database Setup

This application uses PostgreSQL with Liquibase for database migrations. To set up the database:

1. **Start the PostgreSQL service:**

   ```bash
   docker compose up postgres -d
   ```

2. **Run database migrations:**

   ```bash
   docker compose run --rm liquibase update
   ```

3. **Clear all tables (if needed):**

   ```bash
   docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms -c "
   DO \$\$ DECLARE
       r RECORD;
   BEGIN
       FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
           EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
       END LOOP;
   END \$\$;"
   ```

4. **Populate the database with reference data:**

   ```bash
   # Run the seed scripts in order
   docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/01_reference_data.sql
   docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/02_geographic_administrative.sql
   docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/03_premises_farms.sql
   docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/04_tb_cases_testing.sql
   ```

5. **Verify the data was loaded:**

   ```bash
   # Check TB status reference data
   docker exec -it ai-legacy-backend-postgres psql -U postgres -d tbcms -c "SELECT * FROM tb_status_t;"
   ```

### Development

To run the application in `development` mode run:

```bash
npm run dev
```

### Testing

To test the application run:

```bash
npm run test
```

### Production

To mimic the application running in `production` mode locally run:

```bash
npm start
```

### NPM Scripts

All available NPM scripts can be seen in [package.json](./package.json).
To view them in your command line run:

```bash
npm run
```

### Formatting

#### Windows Prettier Issue

If you are having issues with formatting of line breaks on Windows update your global git config by running:

```bash
git config --global core.autocrlf false
```

## Development Helpers

### MongoDB Locks

If you require a write lock for Mongo you can acquire it via `server.locker` or `request.locker`:

```javascript
async function doStuff(server) {
  const lock = await server.locker.lock('unique-resource-name')

  if (!lock) {
    // Lock unavailable
    return
  }

  try {
    // do stuff
  } finally {
    await lock.free()
  }
}
```

Keep it small and atomic.

You may use **using** for the lock resource management.
Note test coverage reports do not like that syntax.

```javascript
async function doStuff(server) {
  await using lock = await server.locker.lock('unique-resource-name')

  if (!lock) {
    // Lock unavailable
    return
  }

  // do stuff

  // lock automatically released
}
```

Helper methods are also available in `/src/helpers/mongo-lock.js`.

## Docker

### Development Image

**Build:**

```bash
docker build --target development --no-cache --tag ai-legacy-backend:development .
```

**Run:**

```bash
docker run -e PORT=3002 -p 3002:3002 ai-legacy-backend:development
```

### Production Image

**Build:**

```bash
docker build --no-cache --tag ai-legacy-backend .
```

**Run:**

```bash
docker run -e PORT=3002 -p 3002:3002 ai-legacy-backend
```

### Docker Compose

A local environment with:

- PostgreSQL database
- MongoDB
- Redis
- This service
- Liquibase for database migrations
- A commented out frontend example

```bash
docker compose up --build -d
```

#### Complete Setup with Database Seeding

To set up the complete environment with database schema and reference data:

```bash
# 1. Start all services
docker compose up

# 2. In a separate terminal, run database migrations
docker compose run --rm liquibase update

# 3. Seed the database with reference data
docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/01_reference_data.sql
docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/02_geographic_administrative.sql
docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/03_premises_farms.sql
docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/04_tb_cases_testing.sql

# 4. Test the API
curl http://localhost:3002/api/v1/reference/tb-status
```

### Database Migrations

This project uses Liquibase for database schema management. The changelog files are located in the `/changelog` directory.

#### Running Migrations in Development

```bash
# Run migrations against the development database
docker compose run --rm liquibase update
```

#### Running Migrations in Test Environment

```bash
# Run migrations against the test database
docker compose -f compose.yaml -f compose.test.yaml run --rm liquibase update
```

#### Other Useful Liquibase Commands

```bash
# Check migration status
docker compose run --rm liquibase status

# Rollback last changeset
docker compose run --rm liquibase rollback-count 1

# Generate SQL for pending changes (dry run)
docker compose run --rm liquibase update-sql

# Validate changelog syntax
docker compose run --rm liquibase validate
```

**Note:** The Liquibase service uses Docker profiles and will only start when explicitly run with `docker compose run`.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the License

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
