# TBCMS Backend API

A RESTful API backend for the Tuberculosis Case Management System (TBCMS) built with Hapi.js, following modern Node.js best practices and the Repository Pattern for data access.

## Table of Contents

- [Requirements](#requirements)
- [Architecture](#architecture)
- [Local Development](#local-development)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Testing](#testing)
- [Docker](#docker)
- [Code Conventions](#code-conventions)
- [Contributing](#contributing)
- [Licence](#licence)

## Requirements

### Node.js

- Node.js `>= v22`
- npm `>= v9`

Use [Node Version Manager (nvm)](https://github.com/creationix/nvm) for managing Node.js versions:

```bash
cd ai-legacy-backend
nvm use
```

## Architecture

### Repository Pattern

The API implements the Repository Pattern for clean data access abstraction:

- **Base Repository**: Common CRUD operations for all entities
- **Specific Repositories**: Domain-specific queries extending base functionality
- **Controller Layer**: Request handling and business logic (named functions)
- **Route Layer**: Endpoint definitions with comprehensive validation

### Project Structure

```
src/
├── api/v1/
│   ├── controllers/          # Request handlers (named functions)
│   ├── routes/              # Route definitions with validation
│   └── schemas/             # OpenAPI schemas
├── repositories/            # Data access layer
│   ├── base-repository.js   # Common CRUD operations
│   └── *-repository.js      # Domain-specific repositories
├── database/               # Database connection management
└── config/                # Application configuration

test/
├── unit/                   # Unit tests (Vitest)
└── integration/           # Integration tests
```

### Key Principles

- **Named Functions**: Controllers use named functions over arrow functions
- **Single Responsibility**: Each function has one clear role
- **Immutable Code**: Write immutable code where possible
- **Test-Driven Development**: TDD approach with behavior coverage focus
- **Request Validation**: Comprehensive input validation using Joi
- **API Versioning**: All REST APIs are versioned (`/api/v1/`)

## Local Development

### Setup

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL service:

```bash
docker compose up postgres -d
```

3. Run database migrations:

```bash
docker compose run --rm liquibase update
```

4. Populate reference data:

```bash
docker exec -i ai-legacy-backend-postgres psql -U postgres -d tbcms < database-docs/db-seeds/01_reference_data.sql
```

5. Start development server:

```bash
npm run start:watch
```

The API will be available at `http://localhost:3002`

### Environment Variables

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=tbcms
POSTGRES_USER=postgres
POSTGRES_PASSWORD=ppp
NODE_ENV=development
PORT=3002
```

## API Endpoints

### Reference Data

- `GET /api/v1/reference/tb-status` - Get all TB status options
- `GET /api/v1/reference/tb-status/{region}` - Get TB status by region
- `GET /api/v1/reference/test-results` - Get all test result options
- `GET /api/v1/reference/action-categories` - Get all action categories

### Counties

- `GET /api/v1/counties` - Get all counties with filtering
- `GET /api/v1/counties/{id}` - Get county by ID
- `GET /api/v1/counties/{id}/with-office` - Get county with office details

### CPH (County Parish Holding)

- `GET /api/v1/cph` - Get all CPH records with filtering
- `GET /api/v1/cph/{cph}` - Get CPH by CPH number
- `GET /api/v1/cph/{cph}/with-location` - Get CPH with location coordinates

### Cases

- `GET /api/v1/cases` - Get all TB cases with filtering
- `GET /api/v1/cases/{nat_inc}` - Get case by national incident number
- `GET /api/v1/cases/{nat_inc}/details` - Get case with related information

### Documentation

- `GET /docs` - OpenAPI 3.0 documentation
- `GET /swagger/` - Interactive Swagger UI
- `GET /swagger.json` - JSON specification

## Database

### PostgreSQL

The application uses PostgreSQL with:

- **Connection Pooling**: Managed by Knex.js
- **Migrations**: Liquibase for schema management
- **Transactions**: Full transaction support
- **Snake Case**: Database columns use snake_case
- **Pluralized Tables**: All table names are pluralized

### Repository Pattern Benefits

1. **Separation of Concerns**: Business logic separated from data access
2. **Testability**: Easy to mock repositories for unit testing
3. **Flexibility**: Can switch data sources without changing business logic
4. **Consistency**: Standardized data access patterns
5. **Maintainability**: Centralized query logic

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Lint code
npm run test:lint
```

### Testing Philosophy

- **Behavior Coverage**: Focus on behavior coverage over line coverage
- **Test-Driven Development**: Follow TDD principles
- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test API endpoints and database interactions
- **Vitest**: Modern testing framework for fast execution

### Test Structure

```javascript
// Example unit test following conventions
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('FunctionName', () => {
  it('should perform expected behavior', async () => {
    // Test implementation
  })
})
```

## Docker

### Development

```bash
# Start with debugging
npm run docker:debug

# Run tests in container
npm run docker:test

# Watch mode testing
npm run docker:test:watch
```

### Production

```bash
# Build and run production image
docker compose up --build
```

## Code Conventions

### JavaScript Standards

- **ES Modules**: Use ES module syntax
- **Named Functions**: Prefer named functions over arrow functions
- **Kebab Case**: Use kebab-case for filenames
- **JSDoc**: Document complex areas with JSDoc comments
- **Immutable Code**: Write immutable code where possible
- **Function Parameters**: Maximum 3 parameters per function
- **Single Responsibility**: Each function should have one role

### File Structure

- **No Barrel Functions**: Avoid barrel exports
- **One Controller per Route**: Each Hapi route has its own controller
- **Routes and Handlers**: Keep routes and handlers in the same file

### Validation

- **Request Validation**: All requests must be validated using Joi
- **Response Schemas**: Define response schemas for documentation
- **Input Sanitization**: Sanitize all user inputs

### Database

- **Snake Case**: Database column names use snake_case
- **Pluralized Tables**: All table names are pluralized
- **Repository Pattern**: Use repositories for all data access

## Contributing

### Development Workflow

1. Follow Test-Driven Development (TDD)
2. Write tests before implementation
3. Focus on behavior coverage
4. Use named functions consistently
5. Validate all requests
6. Update documentation

### Code Quality

- Run `npm run test:lint` before committing
- Ensure all tests pass: `npm run test`
- Format code: `npm run format`
- Follow architectural patterns

### Documentation

- Keep README.md up to date with code changes
- Document complex business logic with JSDoc
- Update API documentation for new endpoints

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
