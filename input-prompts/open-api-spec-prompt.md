Task: Iteratively Expand OpenAPI Specification for Holdings Contact Information Management User Story
Expand the existing OpenAPI specification (#file:openapi.yaml) to support the Holdings Contact Information Management user story in the TBCMS project. This is an iterative development process where the specification grows incrementally with each user story implementation.
Note: This specification is for development validation purposes. Use v1 as the API version throughout development until all user stories are implemented.
Context Documents
#file:mongo-erd.md - Database ERD showing structure and business entities
#file:holdings-contact-information-management.md - The specific user story to implement
Existing OpenAPI specification with holdings endpoints and schemas
User Story Requirements Analysis
Core Need: APHA field officers need to view and edit holding contact information (telephone and email) while keeping CPH immutable.
Acceptance Criteria:
AC1: View and edit all holding information except CPH (immutable)
AC1: Edit primary telephone number with UK format validation
AC2: Edit email address with format validation
AC3: Proper validation, error handling, and save confirmation
Required API Changes
Endpoints to Add
1. PATCH /holdings/{cph}
Purpose: Partial update of holding information including contact details
Reuses existing GET /holdings/{cph} for viewing (no new GET endpoint needed)
Supports editing telephone and email contact information
Ensures CPH remains immutable
Schema Enhancements Required
New Schema: HoldingPatchRequest for partial updates
Enhanced Contact Validation:
UK telephone number format validation patterns
Email format validation (already exists but ensure proper error responses)
Validation Rules: CPH must not be updateable in PATCH requests
Design Principles
Extend, don't replace - Build upon existing OpenAPI specification
RESTful design - Use PATCH for partial updates on the holding resource
User story focused - Only add what's needed for telephone and email editing
UK standards compliance - Implement UK telephone and email validation
Immutable CPH - Ensure CPH cannot be modified via PATCH
Output Requirements
Use OpenAPI Specification v3.1.1 format in YAML
Add comments identifying changes for this user story
Include comprehensive error responses with validation details
Implement proper HTTP status codes (200, 400, 404, 409, 500)
Focus on incremental additions to existing specification
Validation Requirements
UK telephone number patterns for landline and mobile
Standard email format validation
Detailed error responses for validation failures
Clear error messages for field-level validation issues
The goal is to extend the existing specification minimally and precisely to support the Holdings Contact Information Management user story requirements.