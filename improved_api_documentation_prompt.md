# Context
Create a comprehensive OpenAPI 3.1.1 specification document by analyzing all API endpoints in the TB Case Management System backend. The document should provide complete API documentation that enables developers and API consumers to understand and interact with all available endpoints effectively.

## Analysis Requirements

### 1. Backend Endpoint Discovery
- **Scope**: Review all API endpoints across the entire backend application
- **Location**: Analyze routes defined in `/src/api/v1/` directory structure including:
  - Reference data endpoints (`/src/api/v1/reference/endpoints/`)
  - Holding management endpoints (`/src/api/v1/holding/endpoints/`)
  - Any additional endpoint modules
- **Method Coverage**: Document all HTTP methods (GET, POST, PUT, DELETE, PATCH) for each endpoint
- **Route Parameters**: Capture path parameters, query parameters, and request body schemas

### 2. OpenAPI Specification Compliance
- **Version**: Use OpenAPI Specification v3.1.1 exactly as defined at: https://spec.openapis.org/oas/v3.1.1.html
- **Validation**: Ensure the document validates against the official OpenAPI 3.1.1 JSON Schema
- **Standards Compliance**: Follow all MUST, SHOULD, and RECOMMENDED practices from the specification

### 3. Data Model Analysis
- **Request/Response Schemas**: Extract and document all data structures from service classes and repositories
- **Validation Rules**: Include parameter validation, required fields, data types, and constraints
- **Error Responses**: Document all possible error responses with appropriate HTTP status codes
- **Examples**: Provide realistic example requests and responses for each endpoint

## Implementation Specifications

### 1. Document Structure
```yaml
openapi: 3.1.1
info:
  title: TB Case Management System API
  description: |
    Comprehensive REST API for the TB Case Management System.
    Provides endpoints for managing TB case data, reference information, 
    and holding management operations.
  version: 1.0.0
  contact:
    name: API Support Team
  license:
    name: MIT
    
servers:
  - url: /api/v1
    description: Version 1 API Base URL
```

### 2. Required Components
- **Security Schemes**: Document authentication/authorization if implemented
- **Reusable Schemas**: Create components for common data structures
- **Response Models**: Define standard response formats and error schemas
- **Parameter Objects**: Reusable parameter definitions for common query params

### 3. Endpoint Documentation Standards
- **Operation IDs**: Unique, descriptive operation identifiers for each endpoint
- **Tags**: Logical grouping of endpoints (reference, holdings, tb-management)
- **Descriptions**: Clear, comprehensive descriptions for all operations
- **Parameter Documentation**: Complete documentation for all parameters including:
  - Type definitions
  - Validation constraints
  - Default values
  - Examples
- **Response Documentation**: All possible responses with:
  - HTTP status codes
  - Response schemas
  - Example payloads

### 4. Advanced Features
- **Request/Response Examples**: Multiple realistic examples for complex operations
- **Schema Validation**: Proper JSON Schema constraints and validation rules
- **Media Type Support**: Document all supported content types
- **Error Handling**: Comprehensive error response documentation

## Quality Assurance & Evaluation

### 1. Specification Validation
- **Schema Compliance**: Validate against OpenAPI 3.1.1 specification
- **Syntax Validation**: Ensure valid YAML syntax and structure
- **Reference Validation**: Verify all $ref references resolve correctly
- **Example Validation**: Ensure all examples validate against their schemas

### 2. Completeness Verification
- **Endpoint Coverage**: Confirm all backend endpoints are documented
- **HTTP Method Coverage**: Verify all supported HTTP methods are included
- **Parameter Coverage**: Ensure all parameters are documented with proper types
- **Response Coverage**: Document all possible response scenarios

### 3. Documentation Quality
- **Clarity**: Descriptions should be clear and comprehensive
- **Consistency**: Use consistent naming conventions and patterns
- **Usability**: Documentation should enable easy API consumption
- **Maintainability**: Structure should support easy updates and modifications

### 4. Testing Integration
- **Mock Server Compatibility**: Document should support API mocking tools
- **Code Generation**: Structure should enable client SDK generation
- **API Testing**: Support integration with API testing frameworks

## Implementation Process

### Phase 1: Discovery and Analysis
1. **Route Discovery**: Systematically analyze all route definitions in the codebase
2. **Handler Analysis**: Review all route handlers to understand request/response patterns
3. **Schema Extraction**: Extract data models from services, repositories, and validation schemas
4. **Error Mapping**: Document all error scenarios and HTTP status codes

### Phase 2: OpenAPI Document Creation
1. **Basic Structure**: Create the foundational OpenAPI document structure
2. **Path Documentation**: Document each endpoint with complete operation details
3. **Schema Definition**: Create reusable schema components
4. **Example Generation**: Add comprehensive examples for all operations

### Phase 3: Validation and Refinement
1. **Specification Validation**: Validate against OpenAPI 3.1.1 schema
2. **Completeness Review**: Ensure all endpoints and operations are covered
3. **Quality Check**: Review for clarity, consistency, and usability
4. **Testing**: Verify the document works with OpenAPI tools

## Expected Deliverables

### 1. Primary Output
- **File**: `docs/openapi.yaml`
- **Format**: YAML format following OpenAPI 3.1.1 specification
- **Content**: Complete API documentation covering all endpoints

### 2. Quality Assurance
- **Validation Report**: Confirmation that the document validates against OpenAPI 3.1.1 schema
- **Coverage Report**: Summary of all documented endpoints and operations
- **Testing Results**: Verification that the document works with common OpenAPI tools

### 3. Documentation
- **Implementation Notes**: Any assumptions or decisions made during analysis
- **Maintenance Guide**: Instructions for keeping the documentation updated
- **Tool Recommendations**: Suggested tools for working with the OpenAPI document

## Key Improvements from Original Prompt

1. **Comprehensive Scope**: Expanded beyond just endpoint listing to include complete API documentation
2. **Specification Compliance**: Detailed requirements for OpenAPI 3.1.1 compliance
3. **Quality Standards**: Clear criteria for documentation quality and completeness
4. **Implementation Guidance**: Step-by-step process for creating the documentation
5. **Validation Requirements**: Specific validation and testing requirements
6. **Maintainability**: Focus on creating sustainable, maintainable documentation
7. **Tool Integration**: Consideration for API tooling ecosystem compatibility

