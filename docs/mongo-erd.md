# TBCMS MongoDB Schema - Entity Relationship Diagram

## Analysis Phase Results

### 1. SQL Case Table Structure Analysis

The `case` table from the SQL schema represents the core entity in the TBCMS (Tuberculosis Case Management System). Based on the Liquibase changelog analysis, the table contains:

#### Primary Key
- `nat_inc` (VARCHAR(10)) - TB National Incident Number (Primary Key)

#### Foreign Key Relationships
- `cph` (VARCHAR(11)) - References `cph` table (County Parish Holding)
- `t- **Reference Collections**: CPH and lookup data are separate to avoid duplication and maintain data integrity_status` (INT) - References `tb_status` table
- `afu` (INT) - References `unit` table (Approved Finishing Units)
- `allc_booking_method` (INT) - References `allc_booking_method` table
- `allc_not` (INT) - References `allc_not` table
- `drf_fail_cat` (INT) - References `other_dropdown_cat` table
- `result` (VARCHAR(10)) - References `result` table

#### Child Table Dependencies
The following tables reference the `case` table via `nat_inc`:
- `eartag` - Animal ear tags for tracking
- `gamma_eligible` - Gamma testing eligibility
- `radial` - Radial testing data
- `removal` - Animal removal records
- `valuation_wales` - Valuation data for Wales
- `valuation_scot` - Valuation data for Scotland
- `vol_ir` - Voluntary infectious reserve data
- `drf_cand_d` - DRF candidate data
- `drf_farm_level_report` - Farm level reports
- `radial_hotspot` - Radial hotspot data
- `taxi` - Transportation data
- `allc_contact_record` - Allocation contact records

### 2. MongoDB Schema Design Decision

Based on the analysis, the `case` table should be designed as a **primary collection** with embedded and referenced documents to optimize for the following access patterns:

1. **Primary Access Pattern**: Lookup by National Incident Number (`nat_inc`)
2. **Secondary Access Patterns**: 
   - Search by CPH (County Parish Holding)
   - Filter by TB status
   - Track incident workflow stages (allocations, DRF, GIS, contiguous testing, etc.)

### 3. Schema Design Strategy

- **Main Collection**: `Incidents` - Core incident information with embedded workflow data
- **Referenced Collections**: 
  - `Holdings` - Farm/premises information (shared across multiple cases)
  - `TbStatuses` - TB status lookup values
  - `Units` - Approved Finishing Unit types
  - `Results` - Case result codes
  - `AllcBookingMethods` - Allocation booking method types
  - `AllcNotReasons` - Allocation not required reasons
  - `AllcFailCategories` - Allocation failure categories
  - `DrfFailCategories` - DRF failure categories  
  - `ContiguousFailCategories` - Contiguous testing failure categories
  - `ReactorCategories` - Animal reactor classification categories
  - `OnFarmKillCategories` - On-farm kill reason categories
- **Embedded Documents**: 
  - Workflow-specific data (allocations, DRF, GIS, contiguous testing, etc.)
  - Comments and administrative data
  - Date tracking information

## MongoDB Schema ERD

```mermaid
erDiagram
    %% Main collection relationships
    Incidents ||--o| Holdings : "references"

    %% Embedded document relationships within Incidents
    Incidents ||--|| AllocationInfo : "embeds"
    Incidents ||--|| DrfInfo : "embeds"
    Incidents ||--|| GisInfo : "embeds"
    Incidents ||--|| ContiguousInfo : "embeds"
    Incidents ||--|| PostKillInfo : "embeds"
    Incidents ||--|| TracingInfo : "embeds"
    
    %% Embedded array relationships within Incidents
    Incidents ||--o{ Eartags : "embeds array"
    Incidents ||--o{ Removals : "embeds array"
    Incidents ||--o{ Valuations : "embeds array"
    Incidents ||--o{ RadialTests : "embeds array"
    Incidents ||--o{ DrfReports : "embeds array"
    Incidents ||--o{ ContactRecords : "embeds array"
    
    %% Embedded document relationships within Holdings
    Holdings ||--|| Details : "embeds"

    Details ||--|| Address : "embeds"
    Details ||--o{ Contact : "embeds array"
    Details ||--|| Geolocation : "embeds"
    
    %% Nested embedded documents within arrays
    DrfReports ||--|| ReportData : "embeds"

    Incidents {
        id ObjectId PK
        natInc String UK "UNIQUE"
        holdingId ObjectId FK "NOT NULL"
        cph String "NOT NULL"
        allocationInfo AllocationInfo "NOT NULL"
        drfInfo DrfInfo "NOT NULL"
        gisInfo GisInfo "NOT NULL"
        contiguousInfo ContiguousInfo "NOT NULL"
        postKillInfo PostKillInfo "NOT NULL"
        tracingInfo TracingInfo "NOT NULL"
        eartags Eartags[] "NOT NULL"
        removals Removals[] "NOT NULL"
        valuations Valuations[] "NOT NULL"
        radialTests RadialTests[] "NOT NULL"
        drfReports DrfReports[] "NOT NULL"
        contactRecords ContactRecords[] "NOT NULL"
        tbStatus String "NULLABLE"
        slh Boolean "NULLABLE"
        empb Boolean "NULLABLE"
        afu String "NULLABLE"
        tt2 Date "NULLABLE"
        tb2Served Date "NULLABLE"
        genComment String "NULLABLE"
        dashboardComment String "NULLABLE"
        tb10 Date "NULLABLE"
        caseVo String "NULLABLE"
        caseAdmin String "NULLABLE"
        bt5SentDate String "NULLABLE"
        result String "NULLABLE"
        tbTest String "NULLABLE"
        wss String "NULLABLE"
        confirmationDate Date "NULLABLE"
        databaseEntryDate Date "NULLABLE"
        imt21SentDate Date "NULLABLE"
        finalPmDate Date "NULLABLE"
        afuCompletedDate Date "NULLABLE"
        coLocatedOtherSpecies Boolean "NULLABLE"
        conSpecies Boolean "NULLABLE"
        createdAt Date "NOT NULL"
        updatedAt Date "NULLABLE"
    }

    AllocationInfo {
        admin String
        bookedFor Date
        bookingMethod String
        calendar Boolean
        sam Boolean
        drfInfDate Date
        emailSentBy String
        comment String
        notRequired String
        failCategory String
        notReq Boolean
    }

    DrfInfo {
        fieldStaff String
        mapRequestDate Date
        fieldInfDate Date
        reactorNum Boolean
        publicAccess Boolean
        noPrevious Boolean
        initialCompletedDate Date
        phoneVisit String
        failCategory String
        late Boolean
        finalCompletedDate Date
        tenPercentAudit Boolean
        comments String
        voNotifiedAdmin String
        notRequired Boolean
    }

    GisInfo {
        admin String
        mapCreated Date
        numberMaps Number
        comment String
        notRequired Boolean
    }

    ContiguousInfo {
        notRequired Boolean
        species Boolean
        colocatedOtherSpecies Boolean
        admin String
        instigationDate Date
        notificationDate Date
        finalPmDate Date
        testCount Number
        actionsComplete Boolean
        comments String
    }

    PostKillInfo {
        comment String
        admin String
    }

    TracingInfo {
        group Number
        wss String
        sourceWs String
        spreadWs String
        notifiedDate Date
        wsToCardiffDate Date
        drfCheckedDate Date
        admin String
        comments String
    }

    Eartags {
        eartag String
        species String
        reactor Boolean
        priorityReactor Boolean
        testDate Date
        createdAt Date
    }

    Removals {
        eartag String
        removalType String
        removalDate Date
        destination String
        worksheet String
        createdAt Date
    }

    Valuations {
        region String
        valuationAmount Number
        valuationDate Date
        status String
        createdAt Date
    }

    RadialTests {
        testType String
        testDate Date
        result String
        createdAt Date
    }

    DrfReports {
        reportType String
        reportDate Date
        reportData ReportData "NOT NULL"
        createdAt Date
    }

    ReportData {
        reportId String
        status String
        findings String
        recommendations String
        attachments String[] "NOT NULL"
    }

    ContactRecords {
        contactDate Date
        contactType String
        contactDetails String
        staffMember String
        outcome String
        followUpRequired Boolean
        followUpDate Date
        createdAt Date
    }

    Holdings {
        id ObjectId PK "NOT NULL"
        details Details "NOT NULL"
        incidents ObjectId[] "NOT NULL"
    }

    Details {
      cph String "INDEXED NOT NULL"
      name String "NOT NULL"
      description String "NULLABLE"
      address Address "NOT NULL"
      contacts Contact[] "NOT NULL"
      geolocation Geolocation "NOT NULL"
    }

    Address {
        street String
        locality String
        town String
        county String
        postcode String
        country String
    }

    Contact {
        type String
        value String
    }

    Geolocation {
        mapReference String
        easting Number
        northing Number
    }

    TbStatuses {
        id ObjectId PK
        statusId Number UK
        statusAbb String
        status String
        regions String[] "NOT NULL"
        createdAt Date
        updatedAt Date
    }

    Units {
        id ObjectId PK
        unitId Number UK
        unitType String
        regions String[] "NOT NULL"
        createdAt Date
        updatedAt Date
    }

    Results {
        id ObjectId PK
        result String UK
        description String
        createdAt Date
        updatedAt Date
    }

    AllcBookingMethods {
        id ObjectId PK
        methodId Number UK
        allBookingMethod String
        createdAt Date
        updatedAt Date
    }

    AllcNotReasons {
        id ObjectId PK
        reasonId Number UK
        reason String
        createdAt Date
        updatedAt Date
    }

    AllcFailCategories {
        id ObjectId PK
        categoryId Number UK
        reason String
        regions String[] "NOT NULL"
        createdAt Date
        updatedAt Date
    }

    DrfFailCategories {
        id ObjectId PK
        categoryId Number UK
        reason String
        regions String[] "NOT NULL"
        createdAt Date
        updatedAt Date
    }

    ContiguousFailCategories {
        id ObjectId PK
        categoryId Number UK
        reason String
        regions String[] "NOT NULL"
        createdAt Date
        updatedAt Date
    }

    ReactorCategories {
        id ObjectId PK
        categoryId Number UK
        reason String
        regions String[] "NOT NULL"
        createdAt Date
        updatedAt Date
    }

    OnFarmKillCategories {
        id ObjectId PK
        categoryId Number UK
        reason String
        regions String[] "NOT NULL"
        createdAt Date
        updatedAt Date
    }
```

## SQL to MongoDB Mapping

### Collection: `Incidents`

This collection represents the main `case` table from SQL, with embedded workflow documents for better performance and atomic updates.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `natInc` | String | `nat_inc` | Unique Index | National Incident Number |
| `holdingId` | ObjectId | `cph` | Index, FK to Holdings._id | Reference to Holdings collection |
| `cph` | String | `cph` | Index | County Parish Holding number (denormalized for queries) |
| `allocationInfo` | Object | Multiple `allc_*` fields | Embedded | See allocationInfo mapping below |
| `drfInfo` | Object | Multiple `drf*` fields | Embedded | See drfInfo mapping below |
| `gisInfo` | Object | `gis_*` fields | Embedded | See gisInfo mapping below |
| `contiguousInfo` | Object | `con_*` and `number_contigs` fields | Embedded | See contiguousInfo mapping below |
| `postKillInfo` | Object | `pk_*` fields | Embedded | See postKillInfo mapping below |
| `tracingInfo` | Object | `trac_*` and `trace_*` fields | Embedded | See tracingInfo mapping below |
| `eartags` | Array[Object] | `eartag` table records | Embedded | See eartags mapping below |
| `removals` | Array[Object] | `removal` table records | Embedded | See removals mapping below |
| `valuations` | Array[Object] | `valuation_*` table records | Embedded | See valuations mapping below |
| `radialTests` | Array[Object] | `radial*` table records | Embedded | See radialTests mapping below |
| `drfReports` | Array[Object] | `drf_*_report` table records | Embedded | See drfReports mapping below |
| `contactRecords` | Array[Object] | `allc_contact_record` table records | Embedded | See contactRecords mapping below |
| `tbStatus` | String | `tb_status` | Enum values | TB Status description (not ID) |
| `slh` | Boolean | `slh` | Default: false | Slaughterhouse case |
| `empb` | Boolean | `empb` | Default: false | Emergency slaughter |
| `afu` | String | `afu` | Enum values | Approved Finishing Unit type (not ID) |
| `tt2` | Date | `tt2` | - | TB2 test date |
| `tb2Served` | Date | `tb2_served` | - | Restriction notice served date |
| `genComment` | String | `gen_comment` | Max 255 chars | General comments |
| `dashboardComment` | String | `dashboard_comment` | Max 255 chars | Dashboard comments |
| `tb10` | Date | `tb10` | - | Restrictions lifted date |
| `caseVo` | String | `case_vo` | Max 50 chars | Veterinary Officer |
| `caseAdmin` | String | `case_admin` | Max 50 chars | Incident Administrator |
| `bt5SentDate` | Date | `bt5_sent_date` | - | Cleansing letter sent date |
| `result` | String | `result` | Enum values | Incident result description (not code) |
| `tbTest` | String | `tb_test` | Max 7 chars | TB test type |
| `wss` | String | `wss` | Max 15 chars | Work Sheet reference |
| `confirmationDate` | Date | `confirmation_date` | - | Incident confirmation date |
| `databaseEntryDate` | Date | `database_entry_date` | - | Database entry date |
| `imt21SentDate` | Date | `imt21_sent_date` | - | IMT21 form sent date |
| `finalPmDate` | Date | `final_pm_date` | - | Final post-mortem date |
| `afuCompletedDate` | Date | `afu_completed_date` | - | AFU completion date |
| `coLocatedOtherSpecies` | Boolean | `co_located_other_species` | Default: false | Other species present |
| `conSpecies` | Boolean | `con_species` | Default: false | Contiguous species testing |
| `createdAt` | Date | `created_at` | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

#### Embedded Document: `allocationInfo`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `allocationInfo.admin` | String | `allc_admin` | Allocation administrator |
| `allocationInfo.bookedFor` | Date | `allc_booked_for` | Booked allocation date |
| `allocationInfo.bookingMethod` | String | `allc_booking_method` | Booking method description (not ID) |
| `allocationInfo.calendar` | Boolean | `allc_calendar` | Calendar booking |
| `allocationInfo.sam` | Boolean | `allc_sam` | SAM booking |
| `allocationInfo.drfInfDate` | Date | `allc_drf_inf_date` | DRF information date |
| `allocationInfo.emailSentBy` | String | `allc_email_sent_by` | Email sender |
| `allocationInfo.comment` | String | `allc_comment` | Allocation comments |
| `allocationInfo.notRequired` | String | `allc_not` | Not required reason description (not ID) |
| `allocationInfo.failCategory` | String | `allc_fail_cat` | Failure category reason (not ID) |
| `allocationInfo.notReq` | Boolean | `all_not_req` | Allocation not required |

#### Embedded Document: `drfInfo`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `drfInfo.fieldStaff` | String | `drf_field_staff` | DRF field staff |
| `drfInfo.mapRequestDate` | Date | `drfslh_map_request_date` | Map request date |
| `drfInfo.fieldInfDate` | Date | `drf_field_inf_date` | Field information date |
| `drfInfo.reactorNum` | Boolean | `drf_reactor_num` | Reactor numbering |
| `drfInfo.publicAccess` | Boolean | `drf_public_access` | Public access |
| `drfInfo.noPrevious` | Boolean | `drf_no_previous` | No previous history |
| `drfInfo.initialCompletedDate` | Date | `initial_drf_completed_date` | Initial DRF completion |
| `drfInfo.phoneVisit` | String | `drf_phone_visit` | Phone/visit method |
| `drfInfo.failCategory` | String | `drf_fail_cat` | DRF failure category reason (not ID) |
| `drfInfo.late` | Boolean | `drf_late` | Late submission |
| `drfInfo.finalCompletedDate` | Date | `final_drf_completed_date` | Final DRF completion |
| `drfInfo.tenPercentAudit` | Boolean | `drf_ten_percent_audit` | Audit selection |
| `drfInfo.comments` | String | `drf_comments` | DRF comments |
| `drfInfo.voNotifiedAdmin` | String | `drfvo_notified_admin` | VO notification admin |
| `drfInfo.notRequired` | Boolean | `drf_not_req` | DRF not required |

#### Embedded Document: `gisInfo`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `gisInfo.admin` | String | `gis_admin` | GIS administrator |
| `gisInfo.mapCreated` | Date | `gis_map_created` | Map creation date |
| `gisInfo.numberMaps` | Number | `number_maps` | Number of maps |
| `gisInfo.comment` | String | `gis_comment` | GIS comments |
| `gisInfo.notRequired` | Boolean | `gis_not_req` | GIS not required |

#### Embedded Document: `contiguousInfo`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `contiguousInfo.dateInstigated` | Date | `date_contigs_instigated` | Contiguous testing start |
| `contiguousInfo.dateNotified` | Date | `date_contigs_notified` | Notification date |
| `contiguousInfo.numberContigs` | Number | `number_contigs` | Number of contiguous tests |
| `contiguousInfo.comment` | String | `con_comment` | Contiguous comments |
| `contiguousInfo.failCategory` | String | `con_fail_cat` | Failure category reason (not ID) |
| `contiguousInfo.notRequired` | Boolean | `cons_not_req` | Contiguous not required |
| `contiguousInfo.complete` | Boolean | `cons_complete` | Contiguous complete |
| `contiguousInfo.admin` | String | `con_admin` | Contiguous administrator |

#### Embedded Document: `postKillInfo`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `postKillInfo.comment` | String | `pk_comment` | Post-kill comments |
| `postKillInfo.admin` | String | `pk_admin` | Post-kill administrator |

#### Embedded Document: `tracingInfo`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `tracingInfo.group` | Number | `trace_gp` | Tracing group |
| `tracingInfo.wss` | String | `trac_wss` | Work sheet reference |
| `tracingInfo.sourceWs` | String | `trac_source_ws` | Source work sheet |
| `tracingInfo.spreadWs` | String | `trac_spread_ws` | Spread work sheet |
| `tracingInfo.notifiedDate` | Date | `trac_notified_date` | Notification date |
| `tracingInfo.wsToCardiffDate` | Date | `trac_ws_to_cardiff_date` | Cardiff submission date |
| `tracingInfo.drfCheckedDate` | Date | `trac_drf_checked_date` | DRF check date |
| `tracingInfo.admin` | String | `trac_admin` | Tracing administrator |
| `tracingInfo.comments` | String | `trac_comments` | Tracing comments |

#### Embedded Array: `eartags`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `eartags[].eartag` | String | `eartag` | Animal identification number |
| `eartags[].species` | String | `species` | Animal species |
| `eartags[].reactor` | Boolean | `reactor` | TB reactor status |
| `eartags[].priorityReactor` | Boolean | `priority_reactor` | Priority reactor status |
| `eartags[].testDate` | Date | `test_date` | TB test date |
| `eartags[].createdAt` | Date | `created_at` | Record creation timestamp |

#### Embedded Array: `removals`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `removals[].eartag` | String | `eartag` | Animal reference |
| `removals[].removalType` | String | `removal_type` | Removal method |
| `removals[].removalDate` | Date | `removal_date` | Date of removal |
| `removals[].destination` | String | `destination` | Abattoir/knacker destination |
| `removals[].worksheet` | String | `worksheet` | Work sheet reference |
| `removals[].createdAt` | Date | `created_at` | Record creation timestamp |

#### Embedded Array: `valuations`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `valuations[].region` | String | - | Wales/Scotland/England |
| `valuations[].valuationAmount` | Decimal | `valuation_amount` | Compensation amount |
| `valuations[].valuationDate` | Date | `valuation_date` | Valuation date |
| `valuations[].status` | String | `status` | Valuation status |
| `valuations[].createdAt` | Date | `created_at` | Record creation timestamp |

#### Embedded Array: `radialTests`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `radialTests[].testType` | String | `test_type` | Radial/Hotspot test type |
| `radialTests[].testDate` | Date | `test_date` | Test date |
| `radialTests[].result` | String | `result` | Test result |
| `radialTests[].createdAt` | Date | `created_at` | Record creation timestamp |

#### Embedded Array: `drfReports`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `drfReports[].reportType` | String | - | Farm level/candidate report type |
| `drfReports[].reportDate` | Date | `report_date` | Report generation date |
| `drfReports[].reportData` | Object | Report fields | Report content and data |
| `drfReports[].createdAt` | Date | `created_at` | Record creation timestamp |

#### Embedded Array: `contactRecords`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `contactRecords[].contactDate` | Date | `contact_date` | Contact date |
| `contactRecords[].contactType` | String | `contact_type` | Phone/email/visit method |
| `contactRecords[].contactDetails` | String | `contact_details` | Contact information |
| `contactRecords[].staffMember` | String | `staff_member` | Staff member name |
| `contactRecords[].createdAt` | Date | `created_at` | Record creation timestamp |

### Collection: `Holdings`

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `details` | Object | Multiple fields | Embedded | Core holding details (see Details mapping below) |
| `incidents` | Array[ObjectId] | - | References to Incidents | Array of incident ObjectIds for this holding |
| `createdAt` | Date | `created_at` | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

#### Embedded Document: `details`

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `details.cph` | String | `cph` | Unique Index | County Parish Holding number |
| `details.name` | String | `cph_name` | - | Farm/premises name |
| `details.description` | String | `description` | - | Farm description |
| `details.address` | Object | Multiple address fields | Embedded | See address mapping below |
| `details.contacts` | Array[Object] | `landline`, `mobile`, `email` | Embedded | Contact information array |
| `details.geolocation` | Object | `easting`, `northing`, `map_ref` | Embedded | Location details (embeds Geolocation schema) |

#### Embedded Document: `details.address`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `details.address.street` | String | `street` | Street address |
| `details.address.locality` | String | `locality` | Locality |
| `details.address.town` | String | `town` | Town |
| `details.address.county` | String | `county` | County |
| `details.address.postcode` | String | `postcode` | Postal code |

#### Embedded Array: `details.contacts`

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `details.contacts[].type` | String | - | Contact type (landline, mobile, email) |
| `details.contacts[].value` | String | `landline`, `mobile`, `email` | Contact value |

#### Embedded Document: `details.geolocation` (Geolocation Schema)

#### Embedded Document: `details.geolocation` (Geolocation Schema)

This embeds the standardized Geolocation schema used throughout the system for location details.

| MongoDB Field | Type | SQL Mapping | Description |
|---------------|------|-------------|-------------|
| `details.geolocation.mapReference` | String | `map_ref` | Full OS Grid Reference |
| `details.geolocation.easting` | Number | `easting` | OS Grid Reference Easting |
| `details.geolocation.northing` | Number | `northing` | OS Grid Reference Northing |

### Collection: `TbStatuses`

This collection represents the `tb_status` lookup table for TB status codes.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `statusId` | Number | `id` | Unique Index | Original TB status ID |
| `statusAbb` | String | `status_abb` | Max 50 chars | Status abbreviation |
| `status` | String | `status` | Max 100 chars | Full status description |
| `regions` | Array[String] | Regional boolean fields | - | Available regions array |
| `createdAt` | Date | `created_at` | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

#### Regional Values for `regions` Array (TbStatuses)

The `regions` array contains string values representing regional availability:
- `"Midlands"` - Available in Midlands region
- `"North"` - Available in North region  
- `"Scotland"` - Available in Scotland
- `"SouthEast"` - Available in South East region
- `"SouthWest"` - Available in South West region
- `"Wales"` - Available in Wales

Example: `regions: ["Wales", "Scotland", "SouthWest"]`

### Collection: `Units`

This collection represents the `unit` lookup table for Approved Finishing Units.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `unitId` | Number | `id` | Unique Index | Original unit ID |
| `unitType` | String | `unit_type` | Max 50 chars | Unit type description |
| `regions` | Array[String] | Regional boolean fields | - | Available regions array |
| `createdAt` | Date | `created_at` | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

### Collection: `Results`

This collection represents the `result` lookup table for incident results.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `result` | String | `result` | Unique Index, Max 10 chars | Result code |
| `description` | String | - | - | Result description (if available) |
| `createdAt` | Date | - | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

### Collection: `AllcBookingMethods`

This collection represents the `allc_booking_method` lookup table for allocation booking methods.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `methodId` | Number | `id` | Unique Index | Original booking method ID |
| `allBookingMethod` | String | `all_booking_method` | Max 10 chars | Booking method description |
| `createdAt` | Date | - | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

### Collection: `AllcNotReasons`

This collection represents the `allc_not` lookup table for allocation not required reasons.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `reasonId` | Number | `id` | Unique Index | Original reason ID |
| `reason` | String | `reason` | Max 15 chars | Not required reason |
| `createdAt` | Date | - | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

### Collection: `AllcFailCategories`

This collection represents allocation failure categories from the original SQL `other_dropdown_cat` table where `allc = true`.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `categoryId` | Number | `id` | Unique Index | Original category ID |
| `reason` | String | `reason` | Max 255 chars | Allocation failure reason |
| `regions` | Array[String] | Regional boolean fields | - | Available regions array |
| `createdAt` | Date | - | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

### Collection: `DrfFailCategories`

This collection represents DRF failure categories from the original SQL `other_dropdown_cat` table where `drf = true`.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `categoryId` | Number | `id` | Unique Index | Original category ID |
| `reason` | String | `reason` | Max 255 chars | DRF failure reason |
| `regions` | Array[String] | Regional boolean fields | - | Available regions array |
| `createdAt` | Date | - | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

### Collection: `ContiguousFailCategories`

This collection represents contiguous testing failure categories from the original SQL `other_dropdown_cat` table where `con = true`.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `categoryId` | Number | `id` | Unique Index | Original category ID |
| `reason` | String | `reason` | Max 255 chars | Contiguous testing failure reason |
| `regions` | Array[String] | Regional boolean fields | - | Available regions array |
| `createdAt` | Date | - | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

### Collection: `ReactorCategories`

This collection represents reactor classification categories from the original SQL `other_dropdown_cat` table where `reactor = true`.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `categoryId` | Number | `id` | Unique Index | Original category ID |
| `reason` | String | `reason` | Max 255 chars | Reactor classification reason |
| `regions` | Array[String] | Regional boolean fields | - | Available regions array |
| `createdAt` | Date | - | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |

### Collection: `OnFarmKillCategories`

This collection represents on-farm kill reason categories from the original SQL `other_dropdown_cat` table where `on_farm_kill = true`.

| MongoDB Field | Type | SQL Mapping | Constraints | Description |
|---------------|------|-------------|-------------|-------------|
| `_id` | ObjectId | - | Primary Key | MongoDB auto-generated |
| `categoryId` | Number | `id` | Unique Index | Original category ID |
| `reason` | String | `reason` | Max 255 chars | On-farm kill reason |
| `regions` | Array[String] | Regional boolean fields | - | Available regions array |
| `createdAt` | Date | - | - | Record creation timestamp |
| `updatedAt` | Date | - | - | Record update timestamp |
