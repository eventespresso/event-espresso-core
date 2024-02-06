# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Releases

### [5.0.17]

#### Fixed
 - [Fix PHP Fatal error: Uncaught TypeError: Cannot assign int to property EE_Template_Config:: of type bool (#1102)](https://github.com/eventespresso/cafe/pull/1102)

#### Changed
 - [BuildMachine 5.0.16.p changes (#1088)](https://github.com/eventespresso/cafe/pull/1088)
 - [Prevent fatal error from get_edit_post_link returning null (#1097)](https://github.com/eventespresso/cafe/pull/1097)

### [5.0.16]

#### Fixed
 - [PPC. Fix onboarding validation (#1085)](https://github.com/eventespresso/cafe/pull/1085)
 - [Fix text wrapping in the event editor (#1078)](https://github.com/eventespresso/cafe/pull/1078)

#### Changed
 - [BuildMachine 5.0.16.p changes (#1088)](https://github.com/eventespresso/cafe/pull/1088)

### [5.0.15]

#### Fixed
 - [Remove mixed return and parameter type (available in PHP8) (#1073)](https://github.com/eventespresso/cafe/pull/1073)
 - [Dont set type properties of ?EEM_Base (#1074)](https://github.com/eventespresso/cafe/pull/1074)


### [5.0.14]

#### Fixed
 - [Fix paypal exception causing fatal on PHP7.4 (#1071)](https://github.com/eventespresso/cafe/pull/1071)

### [5.0.13]

#### Fixed
 - [Set Defaults and Types for EE_Gateway Properties (#989)](https://github.com/eventespresso/cafe/pull/989)
 - [Fix Escaping for [ESPRESSO_MY_EVENTS] Shortcode (#975)](https://github.com/eventespresso/cafe/pull/975)
 - [Fix Messages Settings Admin Toggle Switch Display (#996)](https://github.com/eventespresso/cafe/pull/996)
 - [Fix Event Registrations Report CSV (#988)](https://github.com/eventespresso/cafe/pull/988)
 - [Relax Property Types in EE_Template_Config (#1007)](https://github.com/eventespresso/cafe/pull/1007)
 - [Fix EE_Line_Item::desc() Return Type (#1009)](https://github.com/eventespresso/cafe/pull/1009)
 - [Fix Country Settings Is EU Option Not Saving (#1017)](https://github.com/eventespresso/cafe/pull/1017)
 - [Fix Registration List Table View Links When Filtered by Event (#1016)](https://github.com/eventespresso/cafe/pull/1016)
 - [Fix Event List Registration Links (#1014)](https://github.com/eventespresso/cafe/pull/1014)
 - [Fix Session Reset Keys Data Type (#1023)](https://github.com/eventespresso/cafe/pull/1023)
 - [Fix Ticket Total with Taxes (#1018)](https://github.com/eventespresso/cafe/pull/1018)
 - [Fix Undefined Constant and Uninitialized Properties (#1030)](https://github.com/eventespresso/cafe/pull/1030)
 - [ES. Fix missing thank you page session (#1032)](https://github.com/eventespresso/cafe/pull/1032)
 - [Fix Model Path for DTT_ID in addWhereParamsForFilters() (#1039)](https://github.com/eventespresso/cafe/pull/1039)
 - [Fix RSS Feeds and UI Tweaks (#1045)](https://github.com/eventespresso/cafe/pull/1045)
 - [Fix fatals/deprecated notices thrown during migrations (#1063)](https://github.com/eventespresso/cafe/pull/1063)

#### Changed
 - [BM 5.0.12.p changes (#977)](https://github.com/eventespresso/cafe/pull/977)
 - [Refactor How Database Table Indexes are Added (#983)](https://github.com/eventespresso/cafe/pull/983)
 - [Check for Multiple @ Sign in Email Addresses (#973)](https://github.com/eventespresso/cafe/pull/973)
 - [Move Venue Sorting into useVenues() Hook (Barista#1276) (#1000)](https://github.com/eventespresso/cafe/pull/1000)
 - [PPC. Third party integration (#807)](https://github.com/eventespresso/cafe/pull/807)
 - [Make M-Mode Changes Backwards Compatible (#979)](https://github.com/eventespresso/cafe/pull/979)
 - [Dont Use Links to Close Notices (#1036)](https://github.com/eventespresso/cafe/pull/1036)
 - [PPC. Fix not ACDC eligible behaviour (#1040)](https://github.com/eventespresso/cafe/pull/1040)
 - [Protect Ticket Assignments Manager Layout from Other Plugin CSS  (#1065)](https://github.com/eventespresso/cafe/pull/1065)
 - [BM Changes 5.0.13.p (#1067)](https://github.com/eventespresso/cafe/pull/1067)



### [5.0.12]

#### Added
 - [Add Yesterday View to Registrations Admin List Table (#971)](https://github.com/eventespresso/cafe/pull/971)

#### Fixed
 - [Fix Admin UI Styles (#902)](https://github.com/eventespresso/cafe/pull/902)
 - [Fix Transaction Admin Payment Currency Formatting (#931)](https://github.com/eventespresso/cafe/pull/931)
 - [Don't Duplicate Default Prices When Duplicating Event (#932)](https://github.com/eventespresso/cafe/pull/932)
 - [Fix or Suppress PHP 8.2 Warnings (#936)](https://github.com/eventespresso/cafe/pull/936)
 - [Add Class Loader for EE_Transaction_Processor (#950)](https://github.com/eventespresso/cafe/pull/950)
 - [Fix Registrations Report CSV Question Order (#946)](https://github.com/eventespresso/cafe/pull/946)
 - [Add Styes for Multi-Select Inputs (#943)](https://github.com/eventespresso/cafe/pull/943)
 - [Fix Promotions Tax Line Items (#851)](https://github.com/eventespresso/cafe/pull/851)
 - [Fix PHP 8.2 Warnings III (#968)](https://github.com/eventespresso/cafe/pull/968)
 - [Relax Onsite Gateway URL Prop Type (#964)](https://github.com/eventespresso/cafe/pull/964)

#### Changed
 - [BM 5.0.11 changes (#926)](https://github.com/eventespresso/cafe/pull/926)
 - [Refactor Maintenance Mode (#852)](https://github.com/eventespresso/cafe/pull/852)
 - [Refactor Cron Jobs (#853)](https://github.com/eventespresso/cafe/pull/853)
 - [Double Varchar Size for Extra Join Model IDs (#939)](https://github.com/eventespresso/cafe/pull/939)
 - [Dont Map Meta Caps if Cap is NULL (#938)](https://github.com/eventespresso/cafe/pull/938)
 - [Optimize DB Table Indexes (#949)](https://github.com/eventespresso/cafe/pull/949)
 - [Reduce the number of queries used when multiple datetimes are assigned to a ticket (#955)](https://github.com/eventespresso/cafe/pull/955)
 - [Add New Feature Flags Admin UI (Barista#1269) (#957)](https://github.com/eventespresso/cafe/pull/957)
 - [Fix RTE Button Active State Styles (Barista#1242) (#958)](https://github.com/eventespresso/cafe/pull/958)
 - [Fix Required Ticket Sort Order in EDTR (Barista#1244) (#959)](https://github.com/eventespresso/cafe/pull/959)
 - [Fix or Suppress PHP 8.2 Warnings Part II (#947)](https://github.com/eventespresso/cafe/pull/947)
 - [Add credit card parameter for E2E tests for PayPal Commerce (Barista#1273) (#961)](https://github.com/eventespresso/cafe/pull/961)
 - [More query optimizations (#962)](https://github.com/eventespresso/cafe/pull/962)
 - [Increase Query Limit to 250 (Barista#1274) (#972)](https://github.com/eventespresso/cafe/pull/972)
 - [Undo Changes Made to Cron Jobs in #853 (#967)](https://github.com/eventespresso/cafe/pull/967)
 - [Increase GQL Query Limit to 250 (#969)](https://github.com/eventespresso/cafe/pull/969)



### [5.0.11]

#### Added
 - [Add New FeatureFlagsConfig class (#867)](https://github.com/eventespresso/cafe/pull/867)
 - [Add No Thousands Separator Currency Format Option (#860)](https://github.com/eventespresso/cafe/pull/860)

#### Fixed
 - [Fix Reg Form Admin Question Styles (#858)](https://github.com/eventespresso/cafe/pull/858)
 - [Fix Persistent Admin Notices (#863)](https://github.com/eventespresso/cafe/pull/863)
 - [Fix Registration Form Admin Page Dropdown Answer Options Layout (#899)](https://github.com/eventespresso/cafe/pull/899)
 - [Ensure  and  Globals Are Set Before Calling add_meta_boxes() #855 (#911)](https://github.com/eventespresso/cafe/pull/911)
 - [Fix Event Editor Custom Message Template Creation (#856)](https://github.com/eventespresso/cafe/pull/856)
 - [Use the transaction payment total as the default refund amount. (#915)](https://github.com/eventespresso/cafe/pull/915)

#### Changed
 - [Updates-from-barista-Sep-18-22.59 (#865)](https://github.com/eventespresso/cafe/pull/865)
 - [Refactor Add-on Model Declarations (#822)](https://github.com/eventespresso/cafe/pull/822)
 - [Comment out any instances of EH_Debug_Tools that haven't been already. (#873)](https://github.com/eventespresso/cafe/pull/873)
 - [Remove Toolbar Font Size Controls on Frontend (#862)](https://github.com/eventespresso/cafe/pull/862)
 - [Place query arg within where!](https://github.com/eventespresso/cafe/pull/872)
 - [Update codebase for critical E2E test Create Event (Barista#1263) (#893)](https://github.com/eventespresso/cafe/pull/893)
 - [Update codebase for critical E2E test Create Event (#881)](https://github.com/eventespresso/cafe/pull/881)
 - [UI adjustment in REM (Barista#1251) (#901)](https://github.com/eventespresso/cafe/pull/901)
 - [Don't include trashed Datetimes in the Event List/CPT Strategy queries (#874) (#909)](https://github.com/eventespresso/cafe/pull/909)
 - [Allow Feature Flags UI #894 (#910)](https://github.com/eventespresso/cafe/pull/910)
 - [Conditionally Load Media Modal Styles #854 (#912)](https://github.com/eventespresso/cafe/pull/912)



### [5.0.10]

#### Fixed
 - [Update ALL Typings and Namespaces for Batch Jobs (#628)](https://github.com/eventespresso/cafe/pull/628)
 - [Don't run wp_kses across the entire HTML message template (#832)](https://github.com/eventespresso/cafe/pull/832)
 - [Refactor and Simplify Admin Route Cap Check (#830)](https://github.com/eventespresso/cafe/pull/830)
 - [Fix EE_Registration::get_earliest_related_datetime() throwing a fatal error (#834)](https://github.com/eventespresso/cafe/pull/834)
 - [Fix EE_Cart SessionStartHandler dependancy (#836)](https://github.com/eventespresso/cafe/pull/836)

#### Changed
 - [Build Machine 5.0.9 changes (#828)](https://github.com/eventespresso/cafe/pull/828)
 - [PayPal Commerce. Fix double](https://github.com/eventespresso/cafe/pull/827)
 - [Don't apply payments to cancelled payments by default (#844)](https://github.com/eventespresso/cafe/pull/844)
 - [Verify Core Config Loaded Before Showing Maintenance Mode Notice (#843)](https://github.com/eventespresso/cafe/pull/843)



### [5.0.9]

#### Fixed
 - [Remove double space from DateTime format in registration list (PHP8.2.9) (#820)](https://github.com/eventespresso/cafe/pull/820)
 - [Don't load Payment Methods when in maintenance mode (#821)](https://github.com/eventespresso/cafe/pull/821)
 - [Fix argument 1 passed to EED_Add_New_State::state_options() must be of the type array, null given (#818)](https://github.com/eventespresso/cafe/pull/818)
 - [Fix Position Issue of Notices (#802)](https://github.com/eventespresso/cafe/pull/802)
 - [Allow db model properties to be null (#826)](https://github.com/eventespresso/cafe/pull/826)

#### Changed
 - [BuildMachine 5.0.8 changes (#817)](https://github.com/eventespresso/cafe/pull/817)
 - [Don't Throw Exceptions When Decoding Session Data (#825)](https://github.com/eventespresso/cafe/pull/825)



### [5.0.8]

#### Added
 - [Save per page setting to local session (#1195) (#714)](https://github.com/eventespresso/cafe/pull/714)

#### Fixed
 - [Fix Default Date and Time Formats (#698)](https://github.com/eventespresso/cafe/pull/698)
 - [Set default blog_offset value (#699)](https://github.com/eventespresso/cafe/pull/699)
 - [Run  on Later Hook (#658)](https://github.com/eventespresso/cafe/pull/658)
 - [Fix Order Inconsistency Issue In Exporting Registrations (#709)](https://github.com/eventespresso/cafe/pull/709)
 - [Fix Bulk Edit Shift Dates Decimal Values (Barista#1197)](https://github.com/eventespresso/barista/pull/1197)
 - [Dont Pass Unix Timestamps Directly to Datetime Constructor (#716)](https://github.com/eventespresso/cafe/pull/716)
 - [Fix attendee information copy function. (#713)](https://github.com/eventespresso/cafe/pull/713)
 - [Fix MER Event Cart Totals (#719)](https://github.com/eventespresso/cafe/pull/719)
 - [Prevent Transaction Billing Info Overflow and Wrapping (#717)](https://github.com/eventespresso/cafe/pull/717)
 - [EDTR UI Fixes (Barista#1206)](https://github.com/eventespresso/barista/pull/1206)
 - [Fix legacy duplicate datetime and ticket is taxable checkbox (#725)](https://github.com/eventespresso/cafe/pull/725)
 - [Fix Unit Test Calculate Ticket Total (Barista#1208) (#726)](https://github.com/eventespresso/cafe/pull/726)
 - [Fix Missing Price Modifiers (Barista#1202)](https://github.com/eventespresso/barista/pull/1202)
 - [Ensure ALL Tickets Have Prices (#728)](https://github.com/eventespresso/cafe/pull/728)
 - [Fix Admin Route Cap Check (#730)](https://github.com/eventespresso/cafe/pull/730)
 - [Fix DTT_description field name (#729)](https://github.com/eventespresso/cafe/pull/729)
 - [Fix Overzealous Missing Ticket Price Types Notice (Barista#1216) (#750)](https://github.com/eventespresso/cafe/pull/750)
 - [Fix Check-ins for Multi-Date Registration Tickets (#744)](https://github.com/eventespresso/cafe/pull/744)
 - [Ensure New Default Tickets ALWAYS Have a Base Price (Barista #1220) (#751)](https://github.com/eventespresso/cafe/pull/751)
 - [Strip Escaped Characters from WordPress Date and Time Formats (#752)](https://github.com/eventespresso/cafe/pull/752)
 - [Ensure New Price Modifiers Are Not Disabled (Barista#1224) (#755)](https://github.com/eventespresso/cafe/pull/755)
 - [Fix Event Registration Options Meta Box Styles  (#694)](https://github.com/eventespresso/cafe/pull/694)
 - [Fix a Column Word Break Issue (#734)](https://github.com/eventespresso/cafe/pull/734)
 - [Fix Frontend Menu Alignment (#735)](https://github.com/eventespresso/cafe/pull/735)
 - [Fix WPgraphQL Activation Error (#758)](https://github.com/eventespresso/cafe/pull/758)
 - [Allow  Query Params (#761)](https://github.com/eventespresso/cafe/pull/761)
 - [Set  on Selected Option (Barista#1233) (#773)](https://github.com/eventespresso/cafe/pull/773)
 - [Fix Venues and People Admin (#763)](https://github.com/eventespresso/cafe/pull/763)
 - [Fix Co logo max width on Invoice/Receipt (#775)](https://github.com/eventespresso/cafe/pull/775)
 - [Allow attributes passed to the fallback_shortcode_processor to be an empty string (#743)](https://github.com/eventespresso/cafe/pull/743)
 - [Fix Nag Notice Display (#779)](https://github.com/eventespresso/cafe/pull/779)
 - [Walk Back $_cpt_model_obj Property Type Declaration (#783)](https://github.com/eventespresso/cafe/pull/783)
 - [Use GRAPHQL_DEBUG and Fix Conditional (#785)](https://github.com/eventespresso/cafe/pull/785)
 - [Fix Edit CPT Route for Attendees (#797)](https://github.com/eventespresso/cafe/pull/797)
 - [Make Admin Only Tickets Visible to Super Admins (#798)](https://github.com/eventespresso/cafe/pull/798)
 - [Replace space with dash as headers do not support space (#800)](https://github.com/eventespresso/cafe/pull/800)
 - [Fix GraphQL Datetime Venue Mutations (#788)](https://github.com/eventespresso/cafe/pull/788)
 - [Sort Tickets by Required Status First (#801)](https://github.com/eventespresso/cafe/pull/801)
 - [Fixed a word break issue in messages menu. (#768)](https://github.com/eventespresso/cafe/pull/768)
 - [Remove Redundant Dropdown Arrow From Select2 Dropdown Inputs (#805)](https://github.com/eventespresso/cafe/pull/805)
 - [Fix Height Issue of Multiple Dropdown Input (#806)](https://github.com/eventespresso/cafe/pull/806)
 - [Fix Attendee Importer Table Styles (#810)](https://github.com/eventespresso/cafe/pull/810)
 - [Fixed registration session display / hide buttons issue (#813)](https://github.com/eventespresso/cafe/pull/813)
 - [If extra_request is not set default to an empty array (#815)](https://github.com/eventespresso/cafe/pull/815)
 - [Fix Callback Name (#808)](https://github.com/eventespresso/cafe/pull/808)

#### Changed
 - [Updates from Barista May 30 20:58 (#693)](https://github.com/eventespresso/cafe/pull/693)
