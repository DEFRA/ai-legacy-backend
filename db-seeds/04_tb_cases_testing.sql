-- =====================================================
-- TBCMS Synthetic Data Generation - TB Cases and Testing Data
-- =====================================================
-- This script creates synthetic TB case data and related testing information
-- All names and addresses include 'fake' as requested
-- Ensures strict schema compliance and proper foreign key dependencies

-- Main TB Cases (using simplified column list matching schema constraints)
INSERT INTO case_t (
    nat_inc, cph, tb_status, slh, empb, afu, tt2, tb2_served, gen_comment, dashboard_comment, 
    case_vo, case_admin, bt5_sent_date, drf_field_staff, allc_admin, allc_booked_for, 
    allc_booking_method, allc_calendar, allc_sam, allc_drf_inf_date, allc_email_sent_by, 
    allc_comment, gis_admin, gis_map_created, number_maps, 
    drf_field_inf_date, gis_comment, date_contigs_instigated, date_contigs_notified, 
    number_contigs, con_comment, drf_reactor_num, drf_public_access, drf_no_previous, 
    initial_drf_completed_date, database_entry_date, 
    drf_late, final_drf_completed_date, drf_ten_percent_audit, drf_comments, 
    drfvo_notified_admin, confirmation_date, result, pk_comment, pk_admin, 
    drf_not_req, all_not_req, gis_not_req, tb_test, trace_gp, trac_wss, trac_source_ws, 
    trac_spread_ws, trac_notified_date, trac_ws_to_cardiff_date, trac_drf_checked_date, 
    trac_admin, trac_comments, cons_not_req, final_pm_date, 
    cons_complete, co_located_other_species, con_species, con_admin, wss
) VALUES
('FK001001', '01001001001', 1, false, false, 1, '2024-01-15', '2024-01-15', 'Fake initial restriction on dairy farm', 'Fake high priority case in fake county', 'FS001', 'AD001', '2024-01-20', 'FS002', 'AD001', '2024-01-25', 1, true, false, '2024-01-22', 'AD001', 'Fake allocation booking confirmed by phone', 'AD001', '2024-01-19', 2, '2024-01-23', 'Fake maps created for farm layout', '2024-01-30', '2024-01-28', 3, 'Fake 3 contiguous holdings identified', true, true, false, '2024-02-05', '2024-01-16', false, '2024-02-10', false, 'Fake DRF completed within target time', 'FS001', '2024-02-15', 'Reactor', 'Fake 2 reactors confirmed on post mortem', 'AD001', false, false, false, 'FakeR', 1, 'WS12345', 'Fake Hill Farm', 'Fake Valley Farm', '2024-01-25', '2024-01-26', '2024-02-01', 'FS002', 'Fake tracing investigation ongoing', false, '2024-02-20', false, false, false, 'FS003', 'WS12345'),

('FK001002', '01001001002', 1, false, false, 1, '2024-01-20', '2024-01-20', 'Fake contiguous to FK001001', 'Fake contiguous testing required', 'FS001', 'AD001', '2024-01-25', 'FS002', 'AD001', '2024-01-30', 2, false, true, '2024-01-27', 'AD001', 'Fake email allocation sent', 'AD001', '2024-01-24', 1, '2024-01-28', 'Fake single map for contiguous farm', '2024-02-05', '2024-02-03', 0, 'Fake no further contiguous required', false, false, false, '2024-02-10', '2024-01-21', false, '2024-02-15', false, 'Fake contiguous DRF completed', 'FS001', '2024-02-20', 'Clear', 'Fake all animals clear on testing', 'AD001', false, false, false, 'FakeC', 1, 'WS12346', 'Fake Hill Farm', NULL, '2024-01-30', NULL, '2024-02-05', 'FS002', 'Fake contiguous tracing complete', true, NULL, true, false, false, 'FS003', 'WS12346'),

('FK001003', '01001001003', 2, false, false, 2, '2024-02-01', '2024-02-01', 'Fake second restriction in area', 'Fake follow-up case in same parish', 'FS001', 'AD001', '2024-02-05', 'FS002', 'AD001', '2024-02-10', 1, true, false, '2024-02-07', 'AD001', 'Fake phone booking confirmed', 'AD001', '2024-02-04', 2, '2024-02-08', 'Fake area maps updated', '2024-02-15', '2024-02-13', 2, 'Fake 2 additional contiguous identified', true, true, false, '2024-02-20', '2024-02-02', false, '2024-02-25', true, 'Fake DRF selected for audit', 'FS001', '2024-03-01', 'Reactor', 'Fake single reactor found', 'AD001', false, false, false, 'FakeR', 1, 'WS12347', 'Fake Oak Farm', 'Fake Meadow Farm', '2024-02-10', '2024-02-11', '2024-02-16', 'FS002', 'Fake local spread investigation', false, '2024-03-05', false, false, false, 'FS003', 'WS12347');

-- Actions for the cases (simplified to match schema)
INSERT INTO action_t (action_cat_id, action_desc, comment, mod_name, action_formal_desc, email_additional_information, email_comment, email_sign_off, email_appt, exclude_from_list, permission, case_detail, val_wales, val_scot, eartag, removal, vol_ir, allocation, gis, drf, con, rad, trac, post_kill, midlands, north, scotland_ayr, scotland_galashiels, scotland_inverness, scotland_inverurie, scotland_perth, south_east, south_west, wales) VALUES
(1, 'Fake TB2 Restriction Notice', 'Fake Initial restriction imposed', 'FakeRestrict', 'Fake Tuberculosis restriction notice served under relevant legislation', false, 1, true, false, false, 2, true, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false),
(2, 'Fake TB Test Arranged', 'Fake Tuberculin test scheduled', 'FakeTest', 'Fake Tuberculin skin test arranged as per testing protocol', true, 2, true, true, false, 2, true, false, false, false, false, false, false, false, true, false, false, false, false, true, true, false, false, false, false, false, true, false, false),
(3, 'Fake Animal Removal', 'Fake Reactor animals for removal', 'FakeRemoval', 'Fake Removal of reactor animals from holding', false, 3, true, false, false, 3, true, false, false, true, true, false, true, false, false, false, false, false, false, true, true, false, false, false, false, false, true, false, false),
(4, 'Fake Restriction Lifted', 'Fake Restrictions removed', 'FakeLift', 'Fake Tuberculosis restrictions lifted following clear tests', false, 1, true, false, false, 2, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, true, false, false),
(5, 'Fake Monitoring Required', 'Fake Ongoing monitoring needed', 'FakeMonitor', 'Fake Continued monitoring and surveillance required', true, 2, false, false, false, 2, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, true, false, false);

-- Issue tracking
INSERT INTO issue_t (issue, valuation, removal) VALUES
('Fake Access Problems', false, true),
('Fake Weather Delays', false, true),
('Fake Transport Issues', false, true),
('Fake Valuation Disputes', true, false),
('Fake Farmer Cooperation', false, true),
('Fake Technical Difficulties', false, false);

-- Environment error logs  
INSERT INTO log_error_t (err_number, err_description, err_date, calling_proc, user_name, show_user, parameters) VALUES
(1001, 'Fake database connection timeout', CURRENT_TIMESTAMP - INTERVAL '5 days', 'FakeConnectDB', 'FAKE_USER1', true, 'Fake connection string'),
(1002, 'Fake data validation error', CURRENT_TIMESTAMP - INTERVAL '3 days', 'FakeValidateData', 'FAKE_USER2', false, 'Fake validation parameters'),
(1003, 'Fake permission denied', CURRENT_TIMESTAMP - INTERVAL '1 day', 'FakeCheckPerms', 'FAKE_USER3', true, 'Fake access attempt');

-- Name auto correct failures
INSERT INTO name_auto_correct_save_failures (object_name, object_type, failure_reason, time) VALUES
('Fake_Object_1', 'Fake Table', 'Fake naming convention error', CURRENT_TIMESTAMP - INTERVAL '2 days'),
('Fake_Object_2', 'Fake View', 'Fake duplicate name conflict', CURRENT_TIMESTAMP - INTERVAL '1 day');

-- Comment for TB161 forms
INSERT INTO comment_tb161_t (id, comment) VALUES
(1, 'Fake TB161 form completed correctly'),
(2, 'Fake TB161 form requires revision'),
(3, 'Fake TB161 form submitted late'),
(4, 'Fake TB161 form missing signatures'),
(5, 'Fake TB161 form data incomplete');

-- Form tracking (simplified to avoid FK issues)
INSERT INTO form_t (form_number, form_mod_name, form_name, type, revision_month, revision_year, required, ready, locked, comment, valuation, removal, pme, culture, slh, import, drf, midlands, north, scotland_ayr, scotland_galashiels, scotland_inverness, scotland_inverurie, scotland_perth, south_east, south_west, wales) VALUES
('FTB2', 'FakeTB2', 'Fake TB2 Restriction Notice', 'RESTRICT', '01', '24', true, true, false, 'Fake primary restriction form', false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true),
('FTB10', 'FakeTB10', 'Fake TB10 Lifting Notice', 'LIFT', '01', '24', true, true, false, 'Fake restriction lifting form', false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true),
('FBT5', 'FakeBT5', 'Fake BT5 Cleansing Notice', 'CLEAN', '01', '24', true, true, false, 'Fake cleansing and disinfection notice', false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true),
('FDRF', 'FakeDRF', 'Fake Disease Risk Form', 'DRF', '02', '24', true, true, false, 'Fake disease risk assessment form', false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true);

-- View user preferences
INSERT INTO view_user_t (case_details, removal) VALUES
(true, true),
(true, false),
(false, true);

-- Quotes for system users (using only staff that exist)
INSERT INTO quote_t (quote, quote_author, staff_no) VALUES
('Fake prevention is better than cure', 'Fake Dr. Prevention', 'FS001'),
('Fake early detection saves lives', 'Fake Prof. Early', 'AD001'),
('Fake teamwork makes dream work', 'Fake Team Leader', 'FS002'),
('Fake quality over quantity always', 'Fake Quality Expert', 'AD002'),
('Fake attention to detail matters', 'Fake Detail Specialist', 'FS003');
