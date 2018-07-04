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

## [$VID:$]
### Added

- Added classname to the markup that wraps the Event phone ([563](https://github.com/eventespresso/event-espresso-core/pull/563))

### Fixed

-  Fixed state and country question types shortcode output ([552](https://github.com/eventespresso/event-espresso-core/pull/552))
-  Added CSS bulletproofing to protect registration form from worse-case scenarios ([542](https://github.com/eventespresso/event-espresso-core/pull/542))
-  Fixed fatal error when using WordPress Privacy erasure or exporter while Event Espresso in full maintenance mode ([568](https://github.com/eventespresso/event-espresso-core/pull/568))
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
