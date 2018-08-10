# Event Espresso Changelog

All notable changes to this project will be documented in this file.

The format of this file is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

Headings should be (only add headings as needed):

- Added (new features)
- Changed (changes in existing functionality)
- Deprecated (soon to be removed features)
- Removed (removed features)
- Fixed (bug fixes)
- Security (vulnerability fixes)

See [our documentation](https://github.com/eventespresso/event-espresso-core/blob/master/docs/A--Best-Practices/change-log.md) for more details.

## [$VID:$]

### Added

- Added support for Indian Rupees currency (INR) to PayPal Espresso and Pro ([593](https://github.com/eventespresso/event-espresso-core/pull/593)) 
- Added BUTTONSOURCE on all PayPal Express API calls. ([627](https://github.com/eventespresso/event-espresso-core/pull/627))
### Fixed

- Fixed a fatal error while using many page builder plugins resulting from template tags only being loaded on the front-end([600](https://github.com/eventespresso/event-espresso-core/pull/600))
- Fixed an error when migrating from EE3 from attendee email index being too big ([611](https://github.com/eventespresso/event-espresso-core/pull/611))
- Fixed venue description on event page so line breaks are shown properly ([612](https://github.com/eventespresso/event-espresso-core/pull/612))
- Fixed `espresso_event_tickets_available()` so it echoes out the tickets when default arguments are provided ([619](https://github.com/eventespresso/event-espresso-core/pull/619))
- Fixed caching loader identifier ([610](https://github.com/eventespresso/event-espresso-core/pull/610))
- Fixed Authorize.net AIM so payment currency is sent ([591](https://github.com/eventespresso/event-espresso-core/pull/591))
- Fixed DuplicateCollectionIdentifierException errors when converting old PersistentAdminNotice Fixes ([505](https://github.com/eventespresso/event-espresso-core/pull/505))
- Fixes a syntax issue inside `EE_Config::register_ee_widget()` ([608](https://github.com/eventespresso/event-espresso-core/pull/608))
- Fixed URL validation when URL was for a site denying access to our HTTP client ([628](https://github.com/eventespresso/event-espresso-core/pull/628))
### Changed

- Updated js build process to use Babel 7 ([578](https://github.com/eventespresso/event-espresso-core/pull/578))
- Tweaked capability checks to allow read-only for registration form answers ([590](https://github.com/eventespresso/event-espresso-core/pull/590))

### Fixed

-  Fixed a javascript error on admin pages showing both an EE error and persistent notice. ([592](https://github.com/eventespresso/event-espresso-core/pull/592))
-  Fixed a bug which prevented sold out events from appearing in unauthenticated REST API results ([536](https://github.com/eventespresso/event-espresso-core/pull/536))


## [4.9.65.p]
### Added

- Added classname to the markup that wraps the Event phone ([563](https://github.com/eventespresso/event-espresso-core/pull/563))
- Added CSS to help improve the display of ticket selector on small screens ([572](https://github.com/eventespresso/event-espresso-core/pull/572))

### Fixed

-  Fixed state and country question types shortcode output ([552](https://github.com/eventespresso/event-espresso-core/pull/552))
-  Added CSS bulletproofing to protect registration form from worse-case scenarios ([542](https://github.com/eventespresso/event-espresso-core/pull/542))
-  Fixed REST API documentation links, and made REST API BETWEEN operator work as documented ([560](https://github.com/eventespresso/event-espresso-core/pull/560))
-  Fixed privacy erasure so contact phones are also erased ([567](https://github.com/eventespresso/event-espresso-core/pull/567))
-  Fixed fatal error thrown when using WP4.5 ([571](https://github.com/eventespresso/event-espresso-core/pull/571))
-  Fixed issue with [ESPRESSO_EVENT_ATTENDEES] shortcode to allow displaying attendees when specifying an archived ticket ([583](https://github.com/eventespresso/event-espresso-core/pull/583))
## [4.9.64.p]

### Added

- Adds project changelog ([539](https://github.com/eventespresso/event-espresso-core/pull/539))
- Adds hooks to venue address metabox ([538](https://github.com/eventespresso/event-espresso-core/pull/538))
- Adds filters to `EE_Radio_Button_Display_Strategy.strategy.php` ([517](https://github.com/eventespresso/event-espresso-core/pull/517))
- Exposed "routes" information on the `eejs` global and update packages ([547](https://github.com/eventespresso/event-espresso-core/pull/547))
- Adds method `EE_PMT_Base::defaultFrontendName` ([558](https://github.com/eventespresso/event-espresso-core/pull/558))
### Fixed

- Fixed section heading closing tag in `content-espresso_events-header.php` ([541](https://github.com/eventespresso/event-espresso-core/pull/541))
- Fixed typo in paypal pro ([535](https://github.com/eventespresso/event-espresso-core/pull/535))
- Fixed EE CPT objects not being added to WP_Post objects during Ajax Requests ([531](https://github.com/eventespresso/event-espresso-core/pull/531))
- Fixed transaction not being assigned to payment log entry when created using an EE_Transaction object ([545](https://github.com/eventespresso/event-espresso-core/pull/545))
- Fixed shortcode and template tag loading during AJAX requests ([537](https://github.com/eventespresso/event-espresso-core/pull/537))
