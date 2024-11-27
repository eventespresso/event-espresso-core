# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Releases

### [5.0.31]

#### Fixed
 - [Add Nonce for Add New State AJAX Requests (#1630)](https://github.com/eventespresso/cafe/pull/1630)
 - [PUE Fix - Dont translate plugin data when checking version numbers (#1632)](https://github.com/eventespresso/cafe/pull/1632)

#### Changed
 - [BuildMachine 5.0.30 changes (#1629)](https://github.com/eventespresso/cafe/pull/1629)
 - [Set the min required WP User integration version number to be 2.1.3 (#1633)](https://github.com/eventespresso/cafe/pull/1633)

### [5.0.30]

#### Added
 - [Advanced Registration Forms (#1155)](https://github.com/eventespresso/cafe/pull/1155)
 - [New Self-Serve Registration Cancellation Add-on (#1581)](https://github.com/eventespresso/cafe/pull/1581)
 - [Add author bundle for Loco Translate (#1602)](https://github.com/eventespresso/cafe/pull/1602)

#### Fixed
 - [Check DbStatus::isOnline() Before Loading Service Change Notifications (#1586)](https://github.com/eventespresso/cafe/pull/1586)
 - [Remove period shown when only one attendee can register (#1583)](https://github.com/eventespresso/cafe/pull/1583)
 - [Welp! Just Sanitize and Return Widget Settings! (#1591)](https://github.com/eventespresso/cafe/pull/1591)
 - [Fix Event Subtotal Line Item Selection When Using Event Cart (#1598)](https://github.com/eventespresso/cafe/pull/1598)
 - [Fix Event Cart UI Update When Deleting Tickets (#1599)](https://github.com/eventespresso/cafe/pull/1599)
 - [Fix Registration Status Updates (#1612)](https://github.com/eventespresso/cafe/pull/1612)
 - [Fix iFrame CSS IDs (#1613)](https://github.com/eventespresso/cafe/pull/1613)
 - [Allow Checkbox Inputs When Using Datetime Selector (#1606)](https://github.com/eventespresso/cafe/pull/1606)
 - [PPC. Fix ACDC removing country field (#1621)](https://github.com/eventespresso/cafe/pull/1621)

#### Changed
 - [BuildMachine 5.0.29 changes (#1585)](https://github.com/eventespresso/cafe/pull/1585)
 - [Update Unit Tests (#1597)](https://github.com/eventespresso/cafe/pull/1597)
 - [Update Registration Admin Questions Form Submission (#1593)](https://github.com/eventespresso/cafe/pull/1593)
 - [Dont Load Payment Method Deprecation 2025 Notices on Event Smart (#1603)](https://github.com/eventespresso/cafe/pull/1603)
 - [Update jQuery Validate to v1.19.5 (#1592)](https://github.com/eventespresso/cafe/pull/1592)
 - [Improve Loco Translate bundle to include both translation filenames (#1626)](https://github.com/eventespresso/cafe/pull/1626)






### [5.0.29]

#### Fixed
 - [Clean Billing Info AFTER Passing Payment to Gateway (#1582)](https://github.com/eventespresso/cafe/pull/1582)

#### Changed
 - [BuildMachine 5.0.28 changes (#1579)](https://github.com/eventespresso/cafe/pull/1579)






### [5.0.28]

#### Added
 - [New Ticket Selector Checkbox and Form Styles (#1527)](https://github.com/eventespresso/cafe/pull/1527)
 - [Add Payment Method Deprecation Notices (#1564)](https://github.com/eventespresso/cafe/pull/1564)
 - [Bypass Payment Processing if Too Many Payment Attempts (#1577)](https://github.com/eventespresso/cafe/pull/1577)

#### Fixed
 - [PPC. Fix success payment set as pending (#1538)](https://github.com/eventespresso/cafe/pull/1538)
 - [Ensure EE_AUTOSAVE_IDS is Defined (#1471)](https://github.com/eventespresso/cafe/pull/1471)
 - [PPC. Fix an issue with a missing checkout type meta (#1548)](https://github.com/eventespresso/cafe/pull/1548)
 - [Fix meta caps for Registration Form caps (#1546)](https://github.com/eventespresso/cafe/pull/1546)
 - [Fix CSS Output in iFrames (#1552)](https://github.com/eventespresso/cafe/pull/1552)
 - [Fix venue not being unassigned in EDTR (GraphQL) (#1561)](https://github.com/eventespresso/cafe/pull/1561)
 - [Fix Missing Check-ins Bulk Actions (#1549)](https://github.com/eventespresso/cafe/pull/1549)
 - [Fix Typing for EE_Datetime_Field::_prepare_for_display() (#1570)](https://github.com/eventespresso/cafe/pull/1570)
 - [Fix List Table Views (#1576)](https://github.com/eventespresso/cafe/pull/1576)
 - [Fix MER Max Ticket Quantity Violations (#1567)](https://github.com/eventespresso/cafe/pull/1567)

#### Changed
 - [ Loosen Upcoming Events Widget Permissions (#1554)](https://github.com/eventespresso/cafe/pull/1554)
 - [When copying datetime include venue id (Barista#1338) (#1568)](https://github.com/eventespresso/cafe/pull/1568)
 - [Ensure WordPress Options Are Saved (#1574)](https://github.com/eventespresso/cafe/pull/1574)



### [5.0.27]

#### Added
 - [Add Venmo funding option to PayPal Commerce (#1522)](https://github.com/eventespresso/cafe/pull/1522)

#### Fixed
 - [Dont replace checkout type with PPC funding options in extra meta inputs (#1534)](https://github.com/eventespresso/cafe/pull/1534)
 - [Add Billing Form Instance Check (#1537)](https://github.com/eventespresso/cafe/pull/1537)
 - [Fix GraphQL requests when WP is installed in a subdirectory (#1531)](https://github.com/eventespresso/cafe/pull/1531)

#### Changed
 - [Fix phpdoc tags (#1505)](https://github.com/eventespresso/cafe/pull/1505)
 - [auto lint fixes (#1358)](https://github.com/eventespresso/cafe/pull/1358)



### [5.0.26]

#### Fixed
 - Fixed PHP 7.4 Incompatible Code in InterfaceManager

#### Changed
 - [BuildMachine changes - 5.0.25.p (#1511)](https://github.com/eventespresso/cafe/pull/1511)



### [5.0.25]

#### Changed
 - [BuildMachine changes - 5.0.24.p (#1486)](https://github.com/eventespresso/cafe/pull/1486)
 - [Fix and Split Up PHP Unit Tests (#1354)](https://github.com/eventespresso/cafe/pull/1354)
 - [Add GraphQL interface EspressoNode (#1478)](https://github.com/eventespresso/cafe/pull/1478)
 - [Keap. Refactor error logging (#1500)](https://github.com/eventespresso/cafe/pull/1500)
 - [Remove USE_ADVANCED_EDITOR Feature Flag (Barista#1332) (#1503)](https://github.com/eventespresso/cafe/pull/1503)



### [5.0.24]

#### Added
 - [New Reg List Table Event Filter (#1451)](https://github.com/eventespresso/cafe/pull/1451)

#### Fixed
 - [Fix PPC Meta Data Array Error (#1454)](https://github.com/eventespresso/cafe/pull/1454)
 - [Fix Event List Shortcode Show Expired Parameter (#1470)](https://github.com/eventespresso/cafe/pull/1470)
 - [Force Payment Method Registration When Generating Messages (#1464)](https://github.com/eventespresso/cafe/pull/1464)
 - [Ensure editor-buttons Script is Enqueued (#1472)](https://github.com/eventespresso/cafe/pull/1472)
 - [PPC. Fix PM thinking it disconnected (#1479)](https://github.com/eventespresso/cafe/pull/1479)

#### Changed
 - [Build machine 5.0.23.p changes (#1461)](https://github.com/eventespresso/cafe/pull/1461)
 - [Add GraphQL interface manager (#1463)](https://github.com/eventespresso/cafe/pull/1463)

#### Security
 - [Add current_user_can() Check When Updating Timezone (#1475)](https://github.com/eventespresso/cafe/pull/1475)



### [5.0.23]

#### Fixed
 - [Type Cast Return Value for EE_Admin_Config::useAdvancedEditor() (#1458)](https://github.com/eventespresso/cafe/pull/1458)

#### Changed
 - [BuildMachine 5.0.22 changes (#1450)](https://github.com/eventespresso/cafe/pull/1450)



### [5.0.22]

#### Added
 - [PPC. Add partner Fees (#1355)](https://github.com/eventespresso/cafe/pull/1355)
 - [Allow Advanced Editor in Decaf (#1430)](https://github.com/eventespresso/cafe/pull/1430)

#### Fixed
 - [Fix Merge Garbage (#1396)](https://github.com/eventespresso/cafe/pull/1396)
 - [Remove Return Type From create_attendee_from_billing_form_data() (#1386)](https://github.com/eventespresso/cafe/pull/1386)
 - [Fix Decaf Issues (#1410)](https://github.com/eventespresso/cafe/pull/1410)
 - [PPC. Fix payments getting mixed (#1415)](https://github.com/eventespresso/cafe/pull/1415)
 - [Remove EE version number form PayPal Commerce fee notice (#1418)](https://github.com/eventespresso/cafe/pull/1418)
 - [Fix Ticket Selector JS Missing Event Var (#1424)](https://github.com/eventespresso/cafe/pull/1424)
 - [Fix Fatal Error if Payment Log is Missing (#1426)](https://github.com/eventespresso/cafe/pull/1426)
 - [Fix Log Key (#1420)](https://github.com/eventespresso/cafe/pull/1420)
 - [Fix Legacy Event Editor Duplicating Tickets on Update (#1435)](https://github.com/eventespresso/cafe/pull/1435)
 - [Fix Trash Ticket UI in Decaf (#1417)](https://github.com/eventespresso/cafe/pull/1417)
 - [Fix Errors During Plugin Update (#1437)](https://github.com/eventespresso/cafe/pull/1437)
 - [PPC. Fix for the re-try payments (#1436)](https://github.com/eventespresso/cafe/pull/1436)
 - [Son of Fix Datepicker Input Format (#1392)](https://github.com/eventespresso/cafe/pull/1392)
 - [Fix Event Editor Timezone Selector (#1442)](https://github.com/eventespresso/cafe/pull/1442)

#### Changed
 - [Remove Use Advanced EDTR Feature Flag (#1388)](https://github.com/eventespresso/cafe/pull/1388)
 - [Toggle EDD Licensing within PUE when ready (#1353)](https://github.com/eventespresso/cafe/pull/1353)
 - [Set USE_PAYMENT_PROCESSOR_FEES feature flag to be true by default (#1416)](https://github.com/eventespresso/cafe/pull/1416)
 - [Update Cafe Readme file for Decaf (#1397)](https://github.com/eventespresso/cafe/pull/1397)
 - [Add option to delete contacts if the contact has no related registrations (#1378)](https://github.com/eventespresso/cafe/pull/1378)
 - [Catch Billing Form Errors if Payment Method Deactivated (#1434)](https://github.com/eventespresso/cafe/pull/1434)
 - [Advanced Editor Changes for Decaf (Barista#1330) (#1439)](https://github.com/eventespresso/cafe/pull/1439)
 - [Decaf 5.0.22 Update readme.txt (#1448)](https://github.com/eventespresso/cafe/pull/1448)
 - [BuildMachine 5.0.22 changes (#1450)](https://github.com/eventespresso/cafe/pull/1450)



### [5.0.21]

#### Fixed
 - [Fix Errors from Event Smart Log (#1316)](https://github.com/eventespresso/cafe/pull/1316)
 - [Fix Saving Custom Message Templates in Event Editor (#1324)](https://github.com/eventespresso/cafe/pull/1324)
 - [Dont Load Caff Admin, Hooks, or Extensions if Decaf (#1325)](https://github.com/eventespresso/cafe/pull/1325)
 - [Fix Loading of Admin Class Hooks (#1323)](https://github.com/eventespresso/cafe/pull/1323)
 - [Fix Events List Month Filter (#1330)](https://github.com/eventespresso/cafe/pull/1330)
 - [Fix Datepicker Input Format (#1341)](https://github.com/eventespresso/cafe/pull/1341)
 - [Fix Event Template Settings Persistence and Add Template Caching (#1329)](https://github.com/eventespresso/cafe/pull/1329)
 - [Force HTTPS for iCal Links and GearMan Jobs (#1345)](https://github.com/eventespresso/cafe/pull/1345)
 - [Extract Additional Classes and Non-Config Related Logic From EE_Config (#1270)](https://github.com/eventespresso/cafe/pull/1270)
 - [Fix Currency Config Prop Type (#1363)](https://github.com/eventespresso/cafe/pull/1363)
 - [Relax EE_Admin_Config::useAdvancedEditor Prop Type (#1368)](https://github.com/eventespresso/cafe/pull/1368)
 - [Fix EE3 migrations Fatals/Notices (#1359)](https://github.com/eventespresso/cafe/pull/1359)
 - [Legacy Shortcodes Manager. Fix the type error (#1372)](https://github.com/eventespresso/cafe/pull/1372)

#### Changed
 - [Build Machine Changes 5.0.20.p (#1309)](https://github.com/eventespresso/cafe/pull/1309)
 - [Add support for Node v20 Iron (Barista#1324) (#1305)](https://github.com/eventespresso/cafe/pull/1305)
 - [Convert http to https (#1314)](https://github.com/eventespresso/cafe/pull/1314)
 - [Add support for decimals in Ticket Price Calculator (Barista#1311) (#1336)](https://github.com/eventespresso/cafe/pull/1336)
 - [Mod/update wp graphql to v1.27.0 (#1334)](https://github.com/eventespresso/cafe/pull/1334)
 - [Check that Assets are Registered and Update React (#1340)](https://github.com/eventespresso/cafe/pull/1340)
 - [Disable Copy and Paste for Email Confirmation Inputs (#1343)](https://github.com/eventespresso/cafe/pull/1343)
 - [PPC. Refactor the payment process (#1331)](https://github.com/eventespresso/cafe/pull/1331)
 - [Use get_post_meta() for Featured Image Alt Tag (#1342)](https://github.com/eventespresso/cafe/pull/1342)
 - [Optimize Event list table datetime and ticket query (#1348)](https://github.com/eventespresso/cafe/pull/1348)
 - [Reduce Vendor Folder Size (#1349)](https://github.com/eventespresso/cafe/pull/1349)
 - [BuildMachine 5.0.21 changes (#1374)](https://github.com/eventespresso/cafe/pull/1374)
 - [PPC. Add partner Fees (#1355)](https://github.com/eventespresso/cafe/pull/1355)



### [5.0.20]

#### Added
 - [Integrate Easy Digital Downloads into Core & Add-ons (#487)](https://github.com/eventespresso/cafe/pull/487)
 - [Add Extra HTML5 Input Types to Form Inputs (#1279)](https://github.com/eventespresso/cafe/pull/1279)
 - [Reimplement Registration Form Session Countdown Timer (#1283)](https://github.com/eventespresso/cafe/pull/1283)

#### Fixed
 - [Fix Event Editor Width (#1194)](https://github.com/eventespresso/cafe/pull/1194)
 - [Add Events List Template Setting to Filter Out Events with Expired Tickets (#1179)](https://github.com/eventespresso/cafe/pull/1179)
 - [Allow Null Value for Order Props in EE_Events_Archive_Config (#1201)](https://github.com/eventespresso/cafe/pull/1201)
 - [Fix Promotions Admin Pagination (#1196)](https://github.com/eventespresso/cafe/pull/1196)
 - [Add User Proofing when Creating New Default Ticket Price (#1202)](https://github.com/eventespresso/cafe/pull/1202)
 - [Fix Model Extension Activation Error (#1209)](https://github.com/eventespresso/cafe/pull/1209)
 - [Fix Message Shortcode Parser Types (#1207)](https://github.com/eventespresso/cafe/pull/1207)
 - [Fix Default Registration Status Options in EDTR + UI Fixes (#1227)](https://github.com/eventespresso/cafe/pull/1227)
 - [Exit Editor Early If Invalid Event Identified (#1247)](https://github.com/eventespresso/cafe/pull/1247)
 - [Type Cast Post Content for Shortcodes (#1249)](https://github.com/eventespresso/cafe/pull/1249)
 - [Cant Reset an Empty Array (#1253)](https://github.com/eventespresso/cafe/pull/1253)
 - [Fix Registration Form Admin Page UI Issues (#1248)](https://github.com/eventespresso/cafe/pull/1248)
 - [Fix Reg Admin Session Errors (#1245)](https://github.com/eventespresso/cafe/pull/1245)
 - [Fix Missing Price Type Error (#1258)](https://github.com/eventespresso/cafe/pull/1258)
 - [Fix REM Filter Dates List HTML Error (#1259)](https://github.com/eventespresso/cafe/pull/1259)
 - [Fix config having empty value when using manual offsets (#1273)](https://github.com/eventespresso/cafe/pull/1273)
 - [Verify Session Exists in EspressoCancelled Shortcode (#1269)](https://github.com/eventespresso/cafe/pull/1269)
 - [Fix Line Item Type Error (#1296)](https://github.com/eventespresso/cafe/pull/1296)

#### Changed
 - [Build Machine Changes 5.0.19.p (#1170)](https://github.com/eventespresso/cafe/pull/1170)
 - [Extract package @eventespresso/types (Barista #1298) (#1221)](https://github.com/eventespresso/cafe/pull/1221)
 - [Create package @eventespresso/config (Barista#1302) (#1213)](https://github.com/eventespresso/cafe/pull/1213)
 - [Add Show All Option to Pagination Component (Barista#1280) (#1218)](https://github.com/eventespresso/cafe/pull/1218)
 - [Update README.md for GraphQL API README.md (#1212)](https://github.com/eventespresso/cafe/pull/1212)
 - [Extract Reg Status Constants into New Class and Add Hooks for Filtering Reg Status (#1193)](https://github.com/eventespresso/cafe/pull/1193)
 - [Fix Feature Flags Admin (Barista#1308) (#1257)](https://github.com/eventespresso/cafe/pull/1257)
 - [Filter Value of Verify SSL Parameter for Remote Requests (#1286)](https://github.com/eventespresso/cafe/pull/1286)
 - [Add ItemCount to Datetime Registrations Link (Barista#1309) (#1260)](https://github.com/eventespresso/cafe/pull/1260)
 - [PUE to EDD Tweaks (#1268)](https://github.com/eventespresso/cafe/pull/1268)



### [5.0.19]

#### Fixed
 - [PPC. Fix instantiating wrong extra metadata (#1150)](https://github.com/eventespresso/cafe/pull/1150)
 - [Fix Status Codes Notice Container (#1156)](https://github.com/eventespresso/cafe/pull/1156)
 - [Fix People Admin List Table Filters (#1139)](https://github.com/eventespresso/cafe/pull/1139)
 - [Espresso Custom Post Type Fixes (#1163)](https://github.com/eventespresso/cafe/pull/1163)
 - [PPC. Fix partial payments (#1134)](https://github.com/eventespresso/cafe/pull/1134)

#### Changed
 - [Build Machine Changes 5.0.18.p (#1146)](https://github.com/eventespresso/cafe/pull/1146)
 - [PPC. Add transaction to the logs (#1158)](https://github.com/eventespresso/cafe/pull/1158)
 - [PPC. Update order status/error messages (#1162)](https://github.com/eventespresso/cafe/pull/1162)
 - [Prevent fatal error from get_edit_post_link returning null (#1166)](https://github.com/eventespresso/cafe/pull/1166)
 - [Remove Serialized Objects from Registration Report Requests (#1154)](https://github.com/eventespresso/cafe/pull/1154)



### [5.0.18]

#### Added
 - [PPC. Add not onboard validation and notice (#1130)](https://github.com/eventespresso/cafe/pull/1130)

#### Fixed
 - [PPC. Fix payment inconsistencies (#1113)](https://github.com/eventespresso/cafe/pull/1113)
 - [Fix Batch Message  Modal Shortcodes (#1129)](https://github.com/eventespresso/cafe/pull/1129)
 - [Refactor RequestTypeContextDetector to Handle Permalink Prefix (#1037)](https://github.com/eventespresso/cafe/pull/1037)
 - [Fix Non-Code Promotions (#1112)](https://github.com/eventespresso/cafe/pull/1112)
 - [PPC. Dont accept failed transactions as successful (#1142)](https://github.com/eventespresso/cafe/pull/1142)

#### Changed
 - [BuildMachine 5.0.17 Changes. (#1103)](https://github.com/eventespresso/cafe/pull/1103)
 - [Dont Block Restore Registration Action if Payments Exist (#1110)](https://github.com/eventespresso/cafe/pull/1110)
 - [Refactor Feature Flags and Add New Flags (#1116)](https://github.com/eventespresso/cafe/pull/1116)
 - [Improve AJAX Response Handling in SPCO (#1119)](https://github.com/eventespresso/cafe/pull/1119)
 - [Refactor Reg Admin List Table Columns (#1099)](https://github.com/eventespresso/cafe/pull/1099)
 - [Remove TAB Transaction Registrations from Reg Report CSV (#1093)](https://github.com/eventespresso/cafe/pull/1093)
 - [Improve Custom Post Type Defense Against Hostile Themes and Plugins (#1136)](https://github.com/eventespresso/cafe/pull/1136)



### [5.0.17]

#### Fixed
 - [Fix PHP Fatal error: Uncaught TypeError: Cannot assign int to property EE_Template_Config:: of type bool (#1102)](https://github.com/eventespresso/cafe/pull/1102)

#### Changed
 - [BuildMachine 5.0.16.p changes (#1088)](https://github.com/eventespresso/cafe/pull/1088)



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
 - [Build Machine Changes 5.0.13.p (#1067)](https://github.com/eventespresso/cafe/pull/1067)



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
