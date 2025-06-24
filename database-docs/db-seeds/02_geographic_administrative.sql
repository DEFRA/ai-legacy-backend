-- =====================================================
-- TBCMS Synthetic Data Generation - Geographic and Administrative Data
-- =====================================================
-- This script creates synthetic geographic and administrative data
-- All names and addresses include 'fake' as requested
-- Updated to match actual schema structure

-- Counties for England, Wales, and Scotland (id is auto-generated)
INSERT INTO county_t (id, c_num, county, country, office, region) VALUES
(1, '01', 'Fake Warwickshire', 'England', 'Fake Birmingham Office', 'Fake Midlands'),
(2, '02', 'Fake Staffordshire', 'England', 'Fake Birmingham Office', 'Fake Midlands'),
(3, '03', 'Fake Greater Manchester', 'England', 'Fake Manchester Office', 'Fake North'),
(4, '04', 'Fake North Yorkshire', 'England', 'Fake Manchester Office', 'Fake North'),
(5, '05', 'Fake Kent', 'England', 'Fake London Office', 'Fake South East'),
(6, '06', 'Fake Essex', 'England', 'Fake London Office', 'Fake South East'),
(7, '07', 'Fake Devon', 'England', 'Fake Exeter Office', 'Fake South West'),
(8, '08', 'Fake Powys', 'Wales', 'Fake Cardiff Office', 'Fake Wales Central'),
(9, '09', 'Fake Gwynedd', 'Wales', 'Fake Cardiff Office', 'Fake Wales Central'),
(10, '10', 'Fake Highland', 'Scotland', 'Fake Edinburgh Office', 'Fake Scotland North'),
(11, '11', 'Fake Dumfries & Galloway', 'Scotland', 'Fake Edinburgh Office', 'Fake Scotland North');

-- Administrative staff 
INSERT INTO admin_t (staff_no, first_name, pref_first_name, last_name, office, region, email, permission, data_protection_date) VALUES
('AD001', 'Fake Alice', 'Alice', 'Fake Admin', 'Fake Birmingham Office', 'Fake Midlands', 'fake.alice.admin@example.com', 1, CURRENT_TIMESTAMP),
('AD002', 'Fake Bob', 'Bob', 'Fake Administrator', 'Fake Birmingham Office', 'Fake Midlands', 'fake.bob.admin@example.com', 2, CURRENT_TIMESTAMP),
('AD003', 'Fake Carol', 'Carol', 'Fake Manager', 'Fake Manchester Office', 'Fake North', 'fake.carol.manager@example.com', 1, CURRENT_TIMESTAMP),
('AD004', 'Fake David', 'Dave', 'Fake Supervisor', 'Fake Manchester Office', 'Fake North', 'fake.dave.supervisor@example.com', 2, CURRENT_TIMESTAMP),
('AD005', 'Fake Emma', 'Emma', 'Fake Coordinator', 'Fake London Office', 'Fake South East', 'fake.emma.coordinator@example.com', 1, CURRENT_TIMESTAMP),
('AD006', 'Fake Frank', 'Frank', 'Fake Officer', 'Fake London Office', 'Fake South East', 'fake.frank.officer@example.com', 2, CURRENT_TIMESTAMP),
('AD007', 'Fake Grace', 'Grace', 'Fake Administrator', 'Fake Cardiff Office', 'Fake Wales Central', 'fake.grace.admin@example.com', 1, CURRENT_TIMESTAMP),
('AD008', 'Fake Henry', 'Henry', 'Fake Manager', 'Fake Cardiff Office', 'Fake Wales Central', 'fake.henry.manager@example.com', 2, CURRENT_TIMESTAMP),
('AD009', 'Fake Irene', 'Irene', 'Fake Supervisor', 'Fake Edinburgh Office', 'Fake Scotland North', 'fake.irene.supervisor@example.com', 1, CURRENT_TIMESTAMP),
('AD010', 'Fake Jack', 'Jack', 'Fake Coordinator', 'Fake Edinburgh Office', 'Fake Scotland North', 'fake.jack.coordinator@example.com', 2, CURRENT_TIMESTAMP);

-- Field staff 
INSERT INTO field_staff_t (staff_no, first_name, pref_first_name, last_name, field_post, region, email, permission, data_protection_date) VALUES
('FS001', 'Fake John', 'John', 'Fake Smith', 1, 'Fake Midlands', 'fake.john.smith@example.com', 3, CURRENT_TIMESTAMP),
('FS002', 'Fake Sarah', 'Sarah', 'Fake Jones', 2, 'Fake Midlands', 'fake.sarah.jones@example.com', 2, CURRENT_TIMESTAMP),
('FS003', 'Fake Michael', 'Mike', 'Fake Brown', 3, 'Fake Midlands', 'fake.mike.brown@example.com', 4, CURRENT_TIMESTAMP);

-- County parish parts (need to exist before county_parish_t due to FK constraint)
INSERT INTO county_parish_part_t (parish_list_parts, region, comment) VALUES
('Fake Part 1', 'Fake Midlands', 'Fake standard parish part'),
('Fake Part 2', 'Fake North', 'Fake northern parish part'),
('Fake Part 3', 'Fake South East', 'Fake southern parish part'),
('Fake Part 4', 'Fake Wales Central', 'Fake Welsh parish part'),
('Fake Part 5', 'Fake Scotland North', 'Fake Scottish parish part');

-- Get the generated IDs and use them in subsequent inserts
-- Note: This approach uses the generated sequence values
DO $$
DECLARE
    part1_id INTEGER;
    part2_id INTEGER;
    part3_id INTEGER;
    part4_id INTEGER;
    part5_id INTEGER;
BEGIN
    -- Get the last 5 IDs from county_parish_part_t
    SELECT id INTO part5_id FROM county_parish_part_t WHERE parish_list_parts = 'Fake Part 5';
    SELECT id INTO part4_id FROM county_parish_part_t WHERE parish_list_parts = 'Fake Part 4';
    SELECT id INTO part3_id FROM county_parish_part_t WHERE parish_list_parts = 'Fake Part 3';
    SELECT id INTO part2_id FROM county_parish_part_t WHERE parish_list_parts = 'Fake Part 2';
    SELECT id INTO part1_id FROM county_parish_part_t WHERE parish_list_parts = 'Fake Part 1';

    -- Insert county parish data using the actual part IDs
    INSERT INTO county_parish_t (county_parish, parish, county, office, region, country, super_region, part_id, dep_vo, dep_aho, dep_ao) VALUES
    ('01001', 'Fake Birmingham South', 'Fake Warwickshire', 'Fake Birmingham Office', 'Fake Midlands', 'England', 'Fake England', part1_id, 'FS001', 'FS001', 'AD001'),
    ('01002', 'Fake Birmingham North', 'Fake Warwickshire', 'Fake Birmingham Office', 'Fake Midlands', 'England', 'Fake England', part1_id, 'FS001', 'FS001', 'AD001'),
    ('02001', 'Fake Stafford', 'Fake Staffordshire', 'Fake Birmingham Office', 'Fake Midlands', 'England', 'Fake England', part1_id, 'FS002', 'FS002', 'AD002'),
    ('03001', 'Fake Manchester Central', 'Fake Greater Manchester', 'Fake Manchester Office', 'Fake North', 'England', 'Fake England', part2_id, 'FS003', 'FS003', 'AD003'),
    ('11001', 'Fake Inverness', 'Fake Highland', 'Fake Edinburgh Office', 'Fake Scotland North', 'Scotland', 'Fake Scotland', part5_id, 'FS001', 'FS001', 'AD009'),
    ('11002', 'Fake Fort William', 'Fake Highland', 'Fake Edinburgh Office', 'Fake Scotland North', 'Scotland', 'Fake Scotland', part5_id, 'FS001', 'FS001', 'AD009'),
    ('11003', 'Fake Thurso', 'Fake Highland', 'Fake Edinburgh Office', 'Fake Scotland North', 'Scotland', 'Fake Scotland', part5_id, 'FS001', 'FS001', 'AD009'),
    ('12001', 'Fake Dumfries', 'Fake Dumfries & Galloway', 'Fake Edinburgh Office', 'Fake Scotland North', 'Scotland', 'Fake Scotland', part5_id, 'FS002', 'FS002', 'AD010'),
    ('12002', 'Fake Stranraer', 'Fake Dumfries & Galloway', 'Fake Edinburgh Office', 'Fake Scotland North', 'Scotland', 'Fake Scotland', part5_id, 'FS002', 'FS002', 'AD010');

    -- Insert county parish part list
    INSERT INTO county_parish_part_list_t (part_id, staff_no) VALUES
    (part1_id, 'FS001'),
    (part1_id, 'FS001'),
    (part1_id, 'FS002'),
    (part2_id, 'FS003'),
    (part5_id, 'FS001'),
    (part5_id, 'FS001'),
    (part5_id, 'FS001'),
    (part5_id, 'FS002'),
    (part5_id, 'FS002');

    -- Insert county parish multi AHOT
    INSERT INTO county_parish_multi_ahot (county_parish, aho_staff_no) VALUES
    ('01001', 'FS001'),
    ('01002', 'FS001'),
    ('02001', 'FS002'),
    ('03001', 'FS003'),
    ('11001', 'FS001'),
    ('11002', 'FS001'),
    ('11003', 'FS001'),
    ('12001', 'FS002'),
    ('12002', 'FS002');
END $$;
