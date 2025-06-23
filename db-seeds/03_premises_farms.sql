-- =====================================================
-- TBCMS Synthetic Data Generation - Premises and Farm Data
-- =====================================================
-- This script creates synthetic premises (CPH) and related farm data
-- All names and addresses include 'fake' as requested
-- Data is inserted in dependency order to satisfy foreign key constraints

-- 1. CPH (County Parish Holding) data - Farm premises (no dependencies)
INSERT INTO cpht (cph, cph_name, description, street, locality, town, county, postcode, map_ref, easting, northing, landline, mobile, language, pgp_study) VALUES
('01001001001', 'Fake Hill Farm', 'Fake Dairy and Beef Enterprise', 'Fake Hill Farm Lane', 'Fake Upper Village', 'Fake Alcester', 'Fake Warwickshire', 'FB50 1AA', 'SP123456', '412345', '267890', '01789 123456', '07700 900123', 'English', false),
('01001001002', 'Fake Valley Farm', 'Fake Beef Finishing Unit', 'Fake Valley Road', 'Fake Lower Village', 'Fake Alcester', 'Fake Warwickshire', 'FB50 1AB', 'SP123457', '412346', '267891', '01789 123457', '07700 900124', 'English', false),
('01001001003', 'Fake Manor Farm', 'Fake Mixed Dairy and Arable', 'Fake Manor Drive', 'Fake Central Village', 'Fake Alcester', 'Fake Warwickshire', 'FB50 1AC', 'SP123458', '412347', '267892', '01789 123458', '07700 900125', 'English', true),
('01002001001', 'Fake Oak Farm', 'Fake Organic Dairy Herd', 'Fake Oak Tree Lane', 'Fake North Hamlet', 'Fake Atherstone', 'Fake Warwickshire', 'FB51 2AA', 'SP234567', '423456', '278901', '01827 234567', '07700 900126', 'English', false),
('01002001002', 'Fake Meadow Farm', 'Fake Suckler Beef Unit', 'Fake Meadow Close', 'Fake South Hamlet', 'Fake Atherstone', 'Fake Warwickshire', 'FB51 2AB', 'SP234568', '423457', '278902', '01827 234568', '07700 900127', 'English', false),
('02001001001', 'Fake Riverside Farm', 'Fake Commercial Dairy', 'Fake River Bank Road', 'Fake Riverside', 'Fake Burton', 'Fake Staffordshire', 'FB52 3AA', 'SK345678', '534567', '289012', '01283 345678', '07700 900128', 'English', true),
('02001001002', 'Fake Mill Farm', 'Fake Beef and Sheep', 'Fake Old Mill Lane', 'Fake Mill Village', 'Fake Burton', 'Fake Staffordshire', 'FB52 3AB', 'SK345679', '534568', '289013', '01283 345679', '07700 900129', 'English', false),
('02002001001', 'Fake Parkside Farm', 'Fake Intensive Dairy Unit', 'Fake Park Avenue', 'Fake Parkside', 'Fake Cannock', 'Fake Staffordshire', 'FB53 4AA', 'SJ456789', '645678', '290123', '01543 456789', '07700 900130', 'English', false),
('03001001001', 'Fake Moor Farm', 'Fake Upland Beef System', 'Fake Moor Top Road', 'Fake High Moor', 'Fake Bolton', 'Fake Greater Manchester', 'FB54 5AA', 'SD567890', '756789', '401234', '01204 567890', '07700 900131', 'English', false),
('03001001002', 'Fake Brook Farm', 'Fake Lowland Dairy', 'Fake Brook Side Lane', 'Fake Brook Valley', 'Fake Bolton', 'Fake Greater Manchester', 'FB54 5AB', 'SD567891', '756790', '401235', '01204 567891', '07700 900132', 'English', true),
('03002001001', 'Fake Field Farm', 'Fake Mixed Enterprise', 'Fake Field Lane', 'Fake Field Edge', 'Fake Bury', 'Fake Greater Manchester', 'FB55 6AA', 'SD678901', '867890', '412345', '0161 678901', '07700 900133', 'English', false),
('04001001001', 'Fake Dale Farm', 'Fake Yorkshire Dales Beef', 'Fake Dale Head Road', 'Fake Upper Dale', 'Fake Barnsley', 'Fake Yorkshire', 'FB56 7AA', 'SE789012', '978901', '423456', '01226 789012', '07700 900134', 'English', false),
('04001001002', 'Fake Fell Farm', 'Fake Hill Sheep and Cattle', 'Fake Fell Top Lane', 'Fake High Fell', 'Fake Barnsley', 'Fake Yorkshire', 'FB56 7AB', 'SE789013', '978902', '423457', '01226 789013', '07700 900135', 'English', false),
('04002001001', 'Fake Grange Farm', 'Fake Large Dairy Unit', 'Fake Grange Road', 'Fake Grange Estate', 'Fake Bradford', 'Fake Yorkshire', 'FB57 8AA', 'SE890123', '089012', '434567', '01274 890123', '07700 900136', 'English', true),
('05001001001', 'Fake Garden Farm', 'Fake Kentish Dairy', 'Fake Garden Lane', 'Fake Garden Village', 'Fake Canterbury', 'Fake Kent', 'FB58 9AA', 'TR901234', '190123', '545678', '01227 901234', '07700 900137', 'English', false),
('05001001002', 'Fake Orchard Farm', 'Fake Mixed Livestock', 'Fake Orchard Close', 'Fake Orchard Green', 'Fake Canterbury', 'Fake Kent', 'FB58 9AB', 'TR901235', '190124', '545679', '01227 901235', '07700 900138', 'English', false),
('05002001001', 'Fake Cliff Farm', 'Fake Coastal Beef Unit', 'Fake Cliff Top Road', 'Fake White Cliffs', 'Fake Dover', 'Fake Kent', 'FB59 0AA', 'TR012345', '201234', '556789', '01304 012345', '07700 900139', 'English', false),
('07001001001', 'Fake Mountain Farm', 'Fake Welsh Mountain Sheep', 'Fake Mountain Track', 'Fake High Mountain', 'Fake Brecon', 'Fake Powys', 'FB60 1AA', 'SN123456', '312345', '267890', '01874 123456', '07700 900140', 'Welsh', false),
('07001001002', 'Fake Valley Farm Wales', 'Fake Welsh Black Cattle', 'Fake Cwm Road', 'Fake Lower Cwm', 'Fake Brecon', 'Fake Powys', 'FB60 1AB', 'SN123457', '312346', '267891', '01874 123457', '07700 900141', 'Welsh', true),
('07002001001', 'Fake Wells Farm', 'Fake Upland Dairy', 'Fake Wells Lane', 'Fake Spa Village', 'Fake Builth Wells', 'Fake Powys', 'FB61 2AA', 'SN234567', '423456', '278901', '01982 234567', '07700 900142', 'Welsh', false),
('08001001001', 'Fake Coastal Farm', 'Fake Seaside Cattle Unit', 'Fake Coastal Road', 'Fake Sea View', 'Fake Bangor', 'Fake Gwynedd', 'FB62 3AA', 'SH345678', '534567', '389012', '01248 345678', '07700 900143', 'Welsh', false),
('08001001002', 'Fake Island Farm', 'Fake Island Sheep Farm', 'Fake Island Lane', 'Fake Small Island', 'Fake Bangor', 'Fake Gwynedd', 'FB62 3AB', 'SH345679', '534568', '389013', '01248 345679', '07700 900144', 'Welsh', false),
('08002001001', 'Fake Castle Farm', 'Fake Historic Dairy Unit', 'Fake Castle Drive', 'Fake Old Castle', 'Fake Caernarfon', 'Fake Gwynedd', 'FB63 4AA', 'SH456789', '645678', '390123', '01286 456789', '07700 900145', 'Welsh', true);

-- 2. Wales specific herd data (depends on cpht)
INSERT INTO wales_elite_herd_t (cph) VALUES
('07001001002'),
('07002001001'),
('08002001001');

INSERT INTO wales_monitored_t (cph) VALUES
('07001001001'),
('08001001001');

-- 2. Wales IAA herd data (simplified to avoid FK constraints)
-- Skipping wales_iaa_herd_t inserts as they require complex herd_type references

-- 3. Abattoir and Knackery data (no dependencies)
INSERT INTO ab_knack_t (short_name, full_name, add1, add2, add3, town, county, postcode, contact, email, phone, fax, mobile, uk, region, contracted, salv_rate, ab_knack, app_no, midlands, north, scotland, south_east, south_west, wales) VALUES
('FakeMidAB', 'Fake Midlands Abattoir Ltd', 'Fake Industrial Estate', 'Fake Factory Road', 'Fake Unit 5', 'Fake Birmingham', 'Fake West Midlands', 'FB70 1AA', 'Fake John Manager', 'fake.midlands.ab@example.com', '0121 555 0001', '0121 555 0002', '07700 555001', 'UK', 'Fake Mid', true, 0.85, 'AB', 'FAB001', true, false, false, false, false, false),
('FakeNorthAB', 'Fake Northern Meat Processing', 'Fake Business Park', 'Fake Commerce Street', 'Fake Block B', 'Fake Manchester', 'Fake Greater Manchester', 'FB71 2BB', 'Fake Sarah Supervisor', 'fake.north.ab@example.com', '0161 555 0003', '0161 555 0004', '07700 555002', 'UK', 'Fake N', true, 0.82, 'AB', 'FAB002', false, true, false, false, false, false),
('FakeSEAB', 'Fake South East Abattoir Co', 'Fake Trading Estate', 'Fake Business Road', 'Fake Building 3', 'Fake Maidstone', 'Fake Kent', 'FB72 3CC', 'Fake David Operations', 'fake.se.ab@example.com', '01622 555 0005', '01622 555 0006', '07700 555003', 'UK', 'Fake SE', true, 0.88, 'AB', 'FAB003', false, false, false, true, false, false),
('FakeWalesAB', 'Fake Welsh Meat Company Ltd', 'Fake Enterprise Zone', 'Fake Manufacturing Drive', 'Fake Facility 7', 'Fake Cardiff', 'Fake Cardiff', 'FB73 4DD', 'Fake Emma Director', 'fake.wales.ab@example.com', '029 555 0007', '029 555 0008', '07700 555004', 'UK', 'Fake W', true, 0.87, 'AB', 'FAB004', false, false, false, false, false, true),
('FakeCentralK', 'Fake Central Knackery Services', 'Fake Service Road', 'Fake Disposal Lane', 'Fake Compound A', 'Fake Nottingham', 'Fake Nottinghamshire', 'FB75 6FF', 'Fake Lisa Services', 'fake.central.knack@example.com', '0115 555 0011', '0115 555 0012', '07700 555006', 'UK', 'Fake Mid', true, 0.45, 'KNACK', 'FKN001', true, true, false, false, false, false);

-- 4. Capacity limits for abattoirs (depends on ab_knack_t)
INSERT INTO ab_capacity_limit_t (abattoir, mon, tue, wed, thu, fri) VALUES
(7, 50, 60, 55, 65, 45),
(8, 40, 45, 50, 55, 35),
(9, 60, 65, 70, 60, 50),
(10, 35, 40, 45, 40, 30),
(11, 45, 50, 48, 52, 38);

-- 5. Haulier data (no dependencies)
INSERT INTO haulier_t (short_name, full_name, add1, add2, add3, town, county, postcode, contact, email, phone, fax, mobile, uk) VALUES
('FakeMidHaul', 'Fake Midlands Haulage Co', 'Fake Transport Hub', 'Fake Logistics Road', 'Fake Depot 1', 'Fake Birmingham', 'Fake West Midlands', 'FB80 1AA', 'Fake Steve Transport', 'fake.midlands.haul@example.com', '0121 777 0001', '0121 777 0002', '07800 777001', 'UK'),
('FakeNorthHaul', 'Fake Northern Transport Ltd', 'Fake Freight Centre', 'Fake Delivery Drive', 'Fake Base 2', 'Fake Manchester', 'Fake Greater Manchester', 'FB81 2BB', 'Fake Claire Logistics', 'fake.north.haul@example.com', '0161 777 0003', '0161 777 0004', '07800 777002', 'UK'),
('FakeWalesHaul', 'Fake Welsh Haulage Services', 'Fake Distribution Park', 'Fake Carrier Lane', 'Fake Unit 5', 'Fake Cardiff', 'Fake Cardiff', 'FB82 3CC', 'Fake Tony Fleet', 'fake.wales.haul@example.com', '029 777 0005', '029 777 0006', '07800 777003', 'UK'),
('FakeScotHaul', 'Fake Highland Transport Co', 'Fake Freight Terminal', 'Fake Shipping Road', 'Fake Facility 8', 'Fake Glasgow', 'Fake Lanarkshire', 'FB83 4DD', 'Fake Rachel Dispatch', 'fake.scotland.haul@example.com', '0141 777 0007', '0141 777 0008', '07800 777004', 'UK');

-- 6. Valuer data (no dependencies)
INSERT INTO valuer_t (customer_id, val_name, company_name, add1, add2, add3, add4, add5, postcode, tel, mobile, fax, email, region, com_dairy, ped_dairy, com_beef, ped_beef, high_genetic_dairy, high_genetic_beef, elite, monitor, preferred_flag) VALUES
('FV001', 'Fake James Valuer', 'Fake Midlands Valuations Ltd', 'Fake Valuation House', 'Fake Assessment Road', 'Fake Commercial District', '', '', 'FB90 1AA', '0121 999 0001', '07900 999001', '0121 999 0002', 'fake.james@example.com', 'Fake Mid', true, true, true, false, false, false, false, true, true),
('FV002', 'Fake Susan Assessor', 'Fake Northern Appraisals', 'Fake Appraisal Centre', 'Fake Survey Street', 'Fake Professional Quarter', '', '', 'FB91 2BB', '0161 999 0003', '07900 999002', '0161 999 0004', 'fake.susan@example.com', 'Fake N', true, false, true, true, true, false, false, false, true),
('FV003', 'Fake Michael Expert', 'Fake Elite Valuations', 'Fake Expert Building', 'Fake Specialist Road', 'Fake Premium Area', '', '', 'FB92 3CC', '01622 999 0005', '07900 999003', '01622 999 0006', 'fake.michael@example.com', 'Fake SE', false, true, false, true, true, true, true, true, true),
('FV004', 'Fake Helen Specialist', 'Fake Welsh Valuations', 'Fake Specialist House', 'Fake Evaluation Lane', 'Fake Welsh Quarter', '', '', 'FB93 4DD', '029 999 0007', '07900 999004', '029 999 0008', 'fake.helen@example.com', 'Fake W', true, true, true, true, false, true, true, false, true);

-- 7. SLHT rate data (no dependencies)
INSERT INTO slht_rate_t (slaughter, incineration, av_wt, dead_wt, est_salv_rate, est_cond_rate) VALUES
(45.50, 1.25, 600, 0.65, 0.75, 0.25);

-- 8. SLHT haulage rates (no dependencies)
INSERT INTO slht_haulage_rate_t (no_animals, cost) VALUES
(1, 85.00),
(2, 120.00),
(3, 150.00),
(4, 175.00),
(5, 200.00),
(10, 350.00),
(15, 475.00),
(20, 580.00),
(25, 675.00),
(30, 750.00);

-- CCDC Contact data
INSERT INTO ccdc_contact_t (ccdc_name, ccdc_contact, ccdc_address, ccdc_postcode, ccdc_counties, ccdc_region) VALUES
('Fake Midlands CCDC', 'Fake Dr. Sarah Health', 'Fake Health Centre, Fake Medical Road', 'FB96 1AA', 'Fake Warwickshire, Fake Staffordshire', 'Fake Midlands'),
('Fake Northern CCDC', 'Fake Dr. Michael Disease', 'Fake Disease Control Unit, Fake Prevention Street', 'FB97 2BB', 'Fake Greater Manchester, Fake Yorkshire', 'Fake North'),
('Fake SE CCDC', 'Fake Dr. Emma Control', 'Fake Control Centre, Fake Health Avenue', 'FB98 3CC', 'Fake Kent, Fake Surrey', 'Fake South East'),
('Fake Welsh CCDC', 'Fake Dr. David Prevention', 'Fake Prevention Building, Fake Safety Road', 'FB99 4DD', 'Fake Powys, Fake Gwynedd', 'Fake Wales Central'),
('Fake Scottish CCDC', 'Fake Dr. Lisa Safety', 'Fake Safety Institute, Fake Protection Lane', 'FC00 5EE', 'Fake Highland, Fake Dumfries & Galloway', 'Fake Scotland North');
