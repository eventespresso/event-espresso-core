# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Releases

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
 - [Update ALL Typings and Namespaces for Batch Jobs (#628)](https://github.com/eventespresso/cafe/pull/628)
 - [Don't run wp_kses across the entire HTML message template (#832)](https://github.com/eventespresso/cafe/pull/832)
 - [Refactor and Simplify Admin Route Cap Check (#830)](https://github.com/eventespresso/cafe/pull/830)
 - [Fix EE_Registration::get_earliest_related_datetime() throwing a fatal error (#834)](https://github.com/eventespresso/cafe/pull/834)
 - [Fix EE_Cart SessionStartHandler dependancy (#836)](https://github.com/eventespresso/cafe/pull/836)

#### Changed
 - [BuildMachine 5.0.8 changes (#817)](https://github.com/eventespresso/cafe/pull/817)
 - [Don't Throw Exceptions When Decoding Session Data (#825)](https://github.com/eventespresso/cafe/pull/825)
 - [Build Machine 5.0.9 changes (#828)](https://github.com/eventespresso/cafe/pull/828)
 - [PayPal Commerce. Fix double](https://github.com/eventespresso/cafe/pull/827)
 - [Don't apply payments to cancelled payments by default (#844)](https://github.com/eventespresso/cafe/pull/844)
 - [Verify Core Config Loaded Before Showing Maintenance Mode Notice (#843)](https://github.com/eventespresso/cafe/pull/843)


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
 - [Remove double space from DateTime format in registration list (PHP8.2.9) (#820)](https://github.com/eventespresso/cafe/pull/820)
 - [Don't load Payment Methods when in maintenance mode (#821)](https://github.com/eventespresso/cafe/pull/821)
 - [Fix argument 1 passed to EED_Add_New_State::state_options() must be of the type array, null given (#818)](https://github.com/eventespresso/cafe/pull/818)
 - [Fix Position Issue of Notices (#802)](https://github.com/eventespresso/cafe/pull/802)
 - [Allow db model properties to be null (#826)](https://github.com/eventespresso/cafe/pull/826)
 - [Update ALL Typings and Namespaces for Batch Jobs (#628)](https://github.com/eventespresso/cafe/pull/628)
 - [Don't run wp_kses across the entire HTML message template (#832)](https://github.com/eventespresso/cafe/pull/832)
 - [Refactor and Simplify Admin Route Cap Check (#830)](https://github.com/eventespresso/cafe/pull/830)
 - [Fix EE_Registration::get_earliest_related_datetime() throwing a fatal error (#834)](https://github.com/eventespresso/cafe/pull/834)
 - [Fix EE_Cart SessionStartHandler dependancy (#836)](https://github.com/eventespresso/cafe/pull/836)
 - FIX

#### Changed
 - [Updates from Barista May 30 20:58 (#693)](https://github.com/eventespresso/cafe/pull/693)
 - [BuildMachine 5.0.8 changes (#817)](https://github.com/eventespresso/cafe/pull/817)
 - [Don't Throw Exceptions When Decoding Session Data (#825)](https://github.com/eventespresso/cafe/pull/825)
 - [Build Machine 5.0.9 changes (#828)](https://github.com/eventespresso/cafe/pull/828)
 - [PayPal Commerce. Fix double](https://github.com/eventespresso/cafe/pull/827)
 - [Don't apply payments to cancelled payments by default (#844)](https://github.com/eventespresso/cafe/pull/844)
 - [Verify Core Config Loaded Before Showing Maintenance Mode Notice (#843)](https://github.com/eventespresso/cafe/pull/843)