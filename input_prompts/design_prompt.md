# Creation of Postgres scripts from liquid base schema

I want to refactor #file:. Your task is to follow the below steps to analyze it and refactor it according to the specified rules.

# ANALYSIS PHASE

1. Analyze the generated changelog to identify the structure and content.
2. Identify the tables, columns, data types, constraints, and relationships present in the database.
3. Identify any default values, indexes, and foreign keys that need to be included in the changelog.
4. Identify any vendor specific data types / fucntions that need to be converted to common Liquibase types.

# REFACTOR PHASE

1. After the changelog is generated, refactor the change log according to the following rules:

- The main changelog should only include child changelogs and not directly run migration operations
- Child changelogs should follow the convention db.changelog-{version}.xml and start at 1-0
- Ensure data types are converted to common Liquibase data types. For example:
  - `nvarchar(max)` should be converted to `TEXT`
  - `datetime2` should be converted to `TIMESTAMP`
  - `bit` should be converted to `BOOLEAN`
- Ensure any default values are retained but ensure that they are compatible with the liquibase data type for the column.
- Use standard SQL functions like `CURRENT_TIMESTAMP` instead of vendor-specific functions.
- Only use vendor specific data types or functions if they are necessary and cannot be converted to common Liquibase types. These must be documented in the changelog and summary.
- Ensure all identifier names are converted to snake_case

3. Ensure that the original changeset IDs are preserved for traceability.
4. Ensure that the author of all changesets is "liquibase (generated)"
5. Ensure only two changelogs files are created for this task:

- changelog/db.changelog.xml
- changelog/db.changelog-1.0.xml

# 2 prompt to create db scripts from liquid base schema

## Analysis

I want to generate synthetic data for the tbcms database.

look at the database structure in the changelog and implement it precisely and generate scripts according to the following rules (in implementation phase):

## Implementation phase

- names and address should include the word 'fake' in them
- the script(s) should be compatiable with postgres sql
- only create columns that exist in #db.changelog-1.0.xml, i.e. if some tables dont have id's do not create them
- the scipt(s) should be saved in the #db-seeds folder

# 3 Resolving foreign key constraints:

refactor the sql files in #file:db-seeds , to ensure it conforms to the definitions in the #file:db.changelog-1.0.xml . Pay particular attention to foreign key constraints and ensure these are inserted at the appropriate time

# 4 Creating endpoints for reference data retrival

Using this sql file #file:01_reference_data.sql I would like to generate an OpenAPI endpoint using the latest version of the OpenAPI specification https://swagger.io/specification/ for each of the entities that uses the repositry pattern https://psid23.medium.com/repository-pattern-for-data-access-in-software-development-4c10aa9604da and knex.js https://knexjs.org/guide for data access.

Please ensure that the folder structure of the project is updated to store the endpoints and the repository implementations as per best practice.

# 5 Link TB case drop down to table in database

Generate a new OpenAPI endpoint for tb_status_t as a GET include the values that are in the table in the response object. Update the #file:case-details.njk and change the tb-status selector to display the items from the GET endpoint. The values for the endpoint are stored in the reference table tb_status_t #file:01_reference_data.sql

