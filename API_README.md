# TBCMS API Documentation

## Overview

The TBCMS (Tuberculosis Case Management System) API provides RESTful endpoints for managing TB cases, farm premises (CPH), counties, and administrative staff. The API follows the Repository Pattern for data access and uses Knex.js for database operations.

## Architecture

### Repository Pattern
The API implements the Repository Pattern to abstract data access operations:

- **Base Repository**: Provides common CRUD operations
- **Specific Repositories**: Extend base repository with domain-specific queries
- **Database Connection**: Centralized Knex.js connection management

### Folder Structure

```
src/
├── api/
│   ├── plugins/
│   │   └── swagger.js              # OpenAPI/Swagger configuration
│   └── v1/
│       ├── controllers/            # Request handlers
│       │   ├── county-controller.js
│       │   ├── cph-controller.js
│       │   └── case-controller.js
│       ├── routes/                 # Route definitions with validation
│       │   ├── county-routes.js
│       │   ├── cph-routes.js
│       │   └── case-routes.js
│       ├── schemas/                # OpenAPI schemas
│       │   └── index.js
│       └── router.js               # Main router
├── database/
│   └── connection.js               # Knex.js database connection
└── repositories/                   # Data access layer
    ├── base-repository.js          # Base repository class
    ├── county-repository.js        # County-specific operations
    ├── cph-repository.js           # CPH-specific operations
    ├── case-repository.js          # Case-specific operations
    ├── admin-repository.js         # Admin staff operations
    ├── field-staff-repository.js   # Field staff operations
    └── index.js                    # Repository exports
```

## API Endpoints

### Counties API
- `GET /api/v1/counties` - Get all counties with filtering
- `GET /api/v1/counties/{id}` - Get county by ID
- `GET /api/v1/counties/{id}/with-office` - Get county with office details
- `POST /api/v1/counties` - Create new county
- `PUT /api/v1/counties/{id}` - Update county
- `DELETE /api/v1/counties/{id}` - Delete county

### CPH (County Parish Holding) API
- `GET /api/v1/cph` - Get all CPH records with filtering
- `GET /api/v1/cph/{cph}` - Get CPH by CPH number
- `GET /api/v1/cph/{cph}/with-location` - Get CPH with location coordinates
- `GET /api/v1/cph/pgp-study` - Get CPHs participating in PGP study
- `POST /api/v1/cph` - Create new CPH record
- `PUT /api/v1/cph/{cph}` - Update CPH record
- `DELETE /api/v1/cph/{cph}` - Delete CPH record

### Cases API
- `GET /api/v1/cases` - Get all TB cases with filtering
- `GET /api/v1/cases/{nat_inc}` - Get case by national incident number
- `GET /api/v1/cases/{nat_inc}/details` - Get case with related information
- `GET /api/v1/cases/drf-pending` - Get cases requiring DRF completion
- `GET /api/v1/cases/dashboard-stats` - Get dashboard statistics

## Features

### OpenAPI 3.0 Specification
- Complete OpenAPI 3.0 documentation available at `/docs`
- Interactive Swagger UI at `/swagger/`
- JSON specification at `/swagger.json`

### Request Validation
- Input validation using Joi schemas
- Query parameter validation
- Path parameter validation
- Request body validation

### Error Handling
- Standardized error responses using Boom
- Proper HTTP status codes
- Detailed error logging

### Database Operations
- Connection pooling with Knex.js
- Transaction support
- Query optimization
- Prepared statements

### Filtering and Pagination
- Flexible filtering options
- Cursor-based pagination
- Sorting capabilities
- Search functionality

## Usage Examples

### Get Counties by Country
```bash
curl "http://localhost:3002/api/v1/counties?country=England&limit=10"
```

### Search CPH Records
```bash
curl "http://localhost:3002/api/v1/cph?search=Fake%20Hill&limit=5"
```

### Get Cases by Date Range
```bash
curl "http://localhost:3002/api/v1/cases?start_date=2024-01-01&end_date=2024-12-31"
```

### Get Dashboard Statistics
```bash
curl "http://localhost:3002/api/v1/cases/dashboard-stats"
```

## Database Connection

The API uses PostgreSQL with the following connection configuration:

```javascript
{
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'tbcms',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'ppp'
}
```

## Development

### Starting the Server
```bash
npm run start:watch
```

### Running with Docker
```bash
npm run docker:debug
```

### Accessing Documentation
- Swagger UI: http://localhost:3002/swagger/
- API Documentation: http://localhost:3002/docs
- JSON Specification: http://localhost:3002/swagger.json

## Repository Pattern Benefits

1. **Separation of Concerns**: Business logic separated from data access
2. **Testability**: Easy to mock repositories for unit testing
3. **Flexibility**: Can switch data sources without changing business logic
4. **Consistency**: Standardized data access patterns
5. **Maintainability**: Centralized query logic

## Best Practices Implemented

1. **RESTful Design**: Following REST principles for API design
2. **Input Validation**: Comprehensive validation using Joi
3. **Error Handling**: Consistent error responses
4. **Documentation**: Complete OpenAPI specification
5. **Security**: Input sanitization and validation
6. **Performance**: Database connection pooling and query optimization
7. **Logging**: Comprehensive logging for debugging and monitoring

## Environment Variables

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=tbcms
POSTGRES_USER=postgres
POSTGRES_PASSWORD=ppp
NODE_ENV=development
PORT=3002
```
