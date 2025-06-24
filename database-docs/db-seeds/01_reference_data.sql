-- =====================================================
-- TBCMS Synthetic Data Generation - Reference Data
-- =====================================================
-- This script creates synthetic reference data for lookup tables
-- All names and addresses include 'fake' as requested
-- Data is inserted in dependency order to satisfy foreign key constraints

-- 1. Permission levels (no dependencies)
INSERT INTO permission_t (permission, permission_wt, permission_grade) VALUES
(1, 1, 'Basic'),
(2, 2, 'Standard'),
(3, 3, 'Senior'),
(4, 4, 'Manager'),
(5, 5, 'Admin');

-- 2. Super Regions (no dependencies)
INSERT INTO super_region_t (super_region) VALUES
('Fake England'),
('Fake Wales'),
('Fake Scotland');

-- 3. Field signature titles (no dependencies)
INSERT INTO field_sig_title_t (field_sig_title) VALUES
('Fake Senior Veterinary Officer'),
('Fake Regional Veterinary Manager'),
('Fake Area Manager');

-- 4. Regions (depends on super_region_t)
INSERT INTO region_t (region, super_region, region_abb, field_sig, field_sig_title, drf_target) VALUES
('Fake Midlands', 'Fake England', 'FM', 'Fake Field Sig Midlands', 1, 85),
('Fake North', 'Fake England', 'FN', 'Fake Field Sig North', 1, 80),
('Fake South East', 'Fake England', 'FSE', 'Fake Field Sig SE', 1, 90),
('Fake South West', 'Fake England', 'FSW', 'Fake Field Sig SW', 1, 88),
('Fake Wales Central', 'Fake Wales', 'FWC', 'Fake Field Sig Wales', 1, 92),
('Fake Scotland North', 'Fake Scotland', 'FSN', 'Fake Field Sig Scotland', 1, 85);

-- 5. Offices (depends on region_t)
INSERT INTO office_t (office, reg_office, tb_office, fin_office, con_rad_office, region, email, telephone, address1, address2, postcode) VALUES
('Fake Birmingham Office', true, true, true, true, 'Fake Midlands', 'fake.birmingham@example.com', '0121 123 4567', 'Fake Birmingham House', 'Fake Corporation Street', 'FB1 1AA'),
('Fake Manchester Office', true, true, false, true, 'Fake North', 'fake.manchester@example.com', '0161 234 5678', 'Fake Manchester Centre', 'Fake Oxford Road', 'FM1 1BB'),
('Fake London Office', true, true, true, false, 'Fake South East', 'fake.london@example.com', '0207 345 6789', 'Fake London House', 'Fake Victoria Street', 'FL1 1CC'),
('Fake Cardiff Office', true, true, true, true, 'Fake Wales Central', 'fake.cardiff@example.com', '029 456 7890', 'Fake Cardiff Centre', 'Fake Queen Street', 'FC1 1DD'),
('Fake Edinburgh Office', true, true, false, true, 'Fake Scotland North', 'fake.edinburgh@example.com', '0131 567 8901', 'Fake Edinburgh House', 'Fake Princes Street', 'FE1 1EE');

-- 6. Reference lookup tables (no dependencies)
INSERT INTO count_parish_lk_up_cat_t (iaa_epi_t) VALUES
('Fake High Risk Area'),
('Fake Edge Area'),
('Fake Low Risk Area'),
('Fake Annual Testing'),
('Fake 4 Year Testing');

INSERT INTO county_parish_lk_up_inc_t (incidence) VALUES
('Fake High'),
('Fake Medium'),
('Fake Low'),
('Fake Very Low');

INSERT INTO field_staff_cat_t (field_post) VALUES
('Fake VO'),
('Fake AHO'),
('Fake VSO'),
('Fake RVM'),
('Fake AO');

INSERT INTO action_cat_t (action_cat) VALUES
('Fake Restriction'),
('Fake Testing'),
('Fake Removal'),
('Fake Lifting'),
('Fake Monitoring');

INSERT INTO tb_status_t (status_abb, status, midlands, north, scotland, south_east, south_west, wales) VALUES
('FR', 'Fake Restricted', true, true, true, true, true, true),
('FT1', 'Fake First Test', true, true, true, true, true, true),
('FT2', 'Fake Second Test', true, true, true, true, true, true),
('FC', 'Fake Clear', true, true, true, true, true, true),
('FSU', 'Fake Suspended', true, true, true, true, true, true);

INSERT INTO tb_test_t (test_type, midlands, north, scotland, south_east, south_west, wales) VALUES
('Fake Routine', true, true, true, true, true, true),
('Fake Pre-movement', true, true, true, true, true, true),
('Fake Check Test', true, true, true, true, true, true),
('Fake Radial', true, true, true, true, true, true),
('Fake Contiguous', true, true, true, true, true, true);

INSERT INTO unit_t (unit_type, midlands, north, scotland, south_east, south_west, wales) VALUES
('Fake Dairy', true, true, true, true, true, true),
('Fake Beef', true, true, true, true, true, true),
('Fake Mixed', true, true, true, true, true, true),
('Fake Finishing', true, true, true, true, true, true);

INSERT INTO cattle_breed_t (breed, description) VALUES
('FHOL', 'Fake Holstein'),
('FFRI', 'Fake Friesian'),
('FANG', 'Fake Angus'),
('FHER', 'Fake Hereford'),
('FSIM', 'Fake Simmental'),
('FCHA', 'Fake Charolais'),
('FLIM', 'Fake Limousin');

INSERT INTO result_t (result) VALUES
('Clear'),
('Reactor'),
('IRs'),
('Pending');

INSERT INTO allc_booking_method_t (all_booking_method) VALUES
('Phone'),
('Email'),
('Post'),
('Online');

INSERT INTO allc_not_t (reason) VALUES
('Declined'),
('Not Required'),
('Too Late'),
('No Access');

INSERT INTO herd_type_t (herd_type) VALUES
('Fake D'),
('Fake B'),
('Fake M'),
('Fake F');

INSERT INTO wales_iaa_herd_type_t (iaa_herd_type) VALUES
('Fake Dairy High Yielding'),
('Fake Dairy Standard'),
('Fake Beef Suckler'),
('Fake Beef Store'),
('Fake Mixed Enterprise');

INSERT INTO wales_iaa_status_t (iaa_status) VALUES
('Fake Registered'),
('Fake Suspended'),
('Fake Withdrawn');

INSERT INTO valuer_society_t (society, contact, email) VALUES
('FRICS', 'Fake RICS Contact', 'fake.rics@example.com'),
('FCAAV', 'Fake CAAV Contact', 'fake.caav@example.com'),
('FNAVA', 'Fake NAVA Contact', 'fake.nava@example.com');

-- 7. Additional reference tables (no dependencies)
INSERT INTO tbl_version_server (version_number, log_out_all_users) VALUES
('1.0.0', false);

INSERT INTO version_back_end_t (version_date, version_comment) VALUES
(CURRENT_TIMESTAMP, 'Fake Initial Version'),
(CURRENT_TIMESTAMP - INTERVAL '30 days', 'Fake Beta Version');

INSERT INTO email_address_cat_t (email_address_cat) VALUES
('Fake Official'),
('Fake Personal'),
('Fake Shared'),
('Fake Emergency');

INSERT INTO email_address_to_cc_t (to_cc) VALUES
('Fake To'),
('Fake CC'),
('Fake BCC');

INSERT INTO email_part_cat_t (email_part) VALUES
('Fake Subject'),
('Fake Body'),
('Fake Header'),
('Fake Footer');

INSERT INTO email_part_type_t (email_part_type) VALUES
('Fake Static Text'),
('Fake Variable'),
('Fake Function Call'),
('Fake Date/Time');

INSERT INTO email_comment_t (email_comment, email_comment_permission) VALUES
('Fake Standard Comment', 1),
('Fake Urgent Comment', 2),
('Fake Confidential Comment', 3);

INSERT INTO process_name_t (process) VALUES
('Fake Restriction'),
('Fake Testing'),
('Fake Removal'),
('Fake Valuation'),
('Fake Allocation');

INSERT INTO other_dropdown_cat_t (reason, midlands, north, scotland, south_east, south_west, wales, reactor, on_farm_kill, allc, drf, con, bt1, valuation, gamma, reason_for_change) VALUES
('Fake Emergency Slaughter', true, true, true, true, true, true, true, true, false, false, false, false, false, false, false),
('Fake Welfare Concerns', true, true, true, true, true, true, false, true, false, false, false, false, false, false, false),
('Fake Transport Issues', true, true, true, true, true, true, false, false, true, false, false, false, false, false, false),
('Fake Weather Delay', true, true, true, true, true, true, false, false, true, true, true, false, false, false, false),
('Fake Farm Access', true, true, true, true, true, true, false, false, false, true, true, false, false, false, false);

INSERT INTO gis_combo_box_t (type, type_desc) VALUES
('FT1', 'Fake Type 1'),
('FT2', 'Fake Type 2'),
('FT3', 'Fake Type 3');

INSERT INTO allc_combo_box_t (type, type_desc) VALUES
('FBT1', 'Fake Booking Type 1'),
('FBT2', 'Fake Booking Type 2'),
('FBT3', 'Fake Booking Type 3');

INSERT INTO holiday_t (holiday_date) VALUES
('2024-01-01'),
('2024-04-01'),
('2024-05-01'),
('2024-12-25'),
('2024-12-26');

INSERT INTO holiday_england_wales_t (holiday_date) VALUES
('2024-01-01'),
('2024-04-01'),
('2024-05-01'),
('2024-12-25'),
('2024-12-26');

INSERT INTO holiday_scotland_t (holiday_date) VALUES
('2024-01-01'),
('2024-01-02'),
('2024-04-01'),
('2024-05-01'),
('2024-12-25');

INSERT INTO update_check_t (update_date) VALUES
(CURRENT_TIMESTAMP),
(CURRENT_TIMESTAMP - INTERVAL '7 days');

INSERT INTO maintain_link_t (link) VALUES
(1);
