#Event Espresso 4 Core

[![Build Status](https://circleci.com/gh/eventespresso/event-espresso-core.svg?style=shield&circle-token=fa8a74e72f3f7c85b8e754044268cafdc9765437)](https://circleci.com/gh/eventespresso)
[![GitHub release](https://img.shields.io/badge/Release%20Candidate-4.7.10.rc-orange.svg?style=plastic)](https://github.com/eventespresso/event-espresso-core)
[![WordPress](https://img.shields.io/badge/WordPress-v4.2.2%20tested-brightgreen.svg?style=plastic)](http://eventespresso.com/)
[![License](https://img.shields.io/badge/License-GPLv2-blue.svg?style=plastic)](https://www.gnu.org/licenses/gpl-2.0.html)
[![License](https://img.shields.io/badge/Now%20100%-Gluten%20Free-ff69b4.svg?style=plastic)](http://eventespresso.com/)

## Event Espresso 4 - Event Ticketing and Registration System

[Event Espresso](http://eventespresso.com/?utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=event+espresso+link) is an event ticketing and registration platform for [WordPress](http://wordpress.org/). Event Espresso makes it easy for you to register attendees for classes, workshops, events, trainings, conferences or concerts, all from your WordPress website. Event Espresso events are created from the WordPress admin area. You can create signup forms to collect information about your attendees, accept payments, and create reports.

## Support License
Purchase a [Premium Support License](http://eventespresso.com/pricing/?ee_ver=ee4&utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=premium+support+license) to get access to more features (including [one-click upgrades](http://eventespresso.com/features/one-click-upgrades/?utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=one+click+upgrades), [growing list of add-ons](http://eventespresso.com/add-ons/?ee_ver=ee4&utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=growing+list+of+addons)).

## Installing Event Espresso
Event Espresso can be installed via the WordPress Dashboard or through FTP or SFTP.

[View Event Espresso 4 Install Documentation →](http://eventespresso.com/wiki/installing-event-espresso/?ee_ver=ee4&utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=view+ee4+install+documentation)

## Documentation
Resources on Event Espresso 4 for a beginner to advanced users.

[View Event Espresso 4 Documentation →](http://eventespresso.com/support/documentation/versioned-docs?doc_ver=ee4&utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=view+ee4+documentation)


## Developers

**This is the full version of the plugin** and provides everything that you need to [sell tickets](http://eventespresso.com/features/multiple-ticket-pricing-options/?utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=sell+tickets), [collect payments](http://eventespresso.com/features/payment-options/?utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=collect+payments), and [manage events](http://eventespresso.com/features/event-management/?utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=manage+events) all from within your WordPress dashboard.


Buy a **[Premium Support License](http://eventespresso.com/pricing/?ee_ver=ee4&utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=premium+support+license)** to get access to more features (including [one-click upgrades](http://eventespresso.com/features/one-click-upgrades/?utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=one+click+upgrades), [growing list of add-ons](http://eventespresso.com/add-ons/?ee_ver=ee4&utm_source=github&utm_medium=link&utm_campaign=ee4_github_plugin_description_homepage&utm_content=growing+list+of+addons)).

**Note:** for non stable versions. We currently use minor versioning numbers such as (4.1.rc.125) for rapid development occurring.  On master, minor versions represent minor releases i.e. (4.1.1.p) that typically only include bug fixes and minor features.  Releases including bigger features bump the second number (i.e. 4.1.1 -> 4.2.0 ).  "rc" in the version number indicates that it is a non-stable release candidate version.  "p" in the version number indicates a released version (usually only tags will have .p) In the list below we **do not** include minor version numbers.

***

**Current Stable Version:** 4.6.x.p

***

This is the Core for Event Espresso 4. This README.md file is targeted for display with our GitHub repo.  For detailed information via traditional readme, see the readme.txt file.

> Extra:  The code structure and phpdoc parsed documentation can be found at http://code.eventespresso.com
>
> Developer Targeted Documentation can be found at http://developer.eventespresso.com


## Event Espresso Releases
At Event Espresso we follow a set pattern for releases:

1. Active development for new features happens on a **FET-{ticket-number}** branch.  We continually merge master into the feature branch while its in development.  Once its complete, then testing is done on it and its merged back to master ready for release.
2. Bug fixes etc. are done on a **BUG-{ticket-number}** branch.  Same methodology is used as with Feature branches.
3. Stable releases are tagged both with a tests folder and without the tests folder.
4. Master is technically always production ready and release ready but may not be equal to what the current stable release is (that is what tags are for).


## Testing
For all testers on GitHub, please take note of the following when reporting issues.

1. There is a difference between a feature and a bug, we consider a bug is something that reveals brokenness in intended functionality.  A feature, is something beyond intended functionality.  To help determine the difference, think about your issue like this, "I know A does C, however I *wish* it did D."  If you find yourself saying that, its a feature.  For Event Espresso,  GitHub is not the place to suggest a new feature UNLESS you've already got a pull request to implement it (see pull requests section below).  Info on sponsoring new features can [be found here](http://eventespresso.com/rich-features/sponsor-new-features/).  If you aren't sure whether something is a feature or bug feel free to post the issue - however we give priority to bug issues here.
2. UI/UX issues may be considered a bug but not if it requires a major change in design.  Feel free to report things you find confusing or needing improvement however reports accompanied by a pull request will likely get faster attention.
3. Report your issue as clearly as possible.  By "clear" we mean:

	i. Specify the branch this occurred in.

	ii. Be specific about the steps you took to reproduce.

	iii. Feel free to use screenshots/screencasts to illustrate

	iv. Use URLs for the page the issue to place on where possible.

4. Don't "bump" bug reports if we don't respond right away.  We see every report coming in, but we'll only reply if we need clarification or if we think its invalid.  Otherwise, we're likely working on a fix and the issue will be updated when the fix is complete.

## Pull Requests
One of the reasons we created this private repo on GitHub is because we wanted to open up EE development to 3rd party developers who might want to contribute to the codebase. GitHub makes this really easy to do so via pull requests.  If you don't know what pull requests are, please read up on them via the GitHub help/documentation.

Here's how we deal with pull requests for our repo:

1. Any new FEATURES in a pull request should be based off of the *master* branch. If your feature pull request is based off any other branch it will not be considered.
2. Any BUGFIX pull requests should be based off of the branch the bug was found.  Please verify if it is in master before submitting the pull request.  If it is in reproducible on master, we'd prefer to have the pull request based off master.
3. We greatly appreciate any pull-requests submitted for consideration, but please understand we are very selective in what we decide to include in EE core.  If the "feature" is something that expands too much on our design decisions for EE core then we may suggest you develop your pull request into an add-on for EE.

