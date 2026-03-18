# Event Espresso - Event Registration & Ticketing Sales

Contributors: eventespresso, garthkoyle, charliespider, pebblo, knazart, alexkuc, mohsinsr
Donate link: [Support Our Work](https://eventespresso.com/pricing/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_donate_link&utm_content=Donate+link)  
Tags: Events, Tickets, Event Registration, Ticket Sales, Calendar
Requires at least: 4.5
Requires PHP: 7.4
Tested up to: 6.9
Stable tag: 5.0.56
License: GPL2

The best events plugin with event registration, free and paid ticket sales, event registration forms, PayPal payments, automatic emails, and more!

== Description ==
Power your online event registration and ticket sales with [Event Espresso](https://eventespresso.com), the most complete WordPress events plugin. Within just minutes you can be ready to post your events, sell tickets and registrations and collect payments from attendees.

WordPress event ticketing has never been easier and faster.

## 🤓 Schedule a Personalized Demo & Free Installation! 🎉

We offer a free one-time installation of Event Espresso premium, along with a personalized demo that includes setup, event creation, and connecting to PayPal so you're ready for your first event. Ask questions, get expert support, and experience Event Espresso on your own website for free! 👉 [Schedule your free install and demo today!](https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1ppM4aQPxLXtwoBfXzti-8yfwolmP9CPBx1s3THT_xzyiCBXDGch10gDRdo8gWvAz_hZGl3IUp) 👈

## Online Event Ticketing, Registration and Management for WordPress

[youtube http://www.youtube.com/watch?v=K_yVwWnTjL8]

## ✨ Powerful Event Registration & Ticket Sales Features

With our free events plugin for WordPress, you can easily and quickly:

✓ Create events on your own WordPress website
✓ Create multiple types of tickets and registrations
✓ Sell paid event tickets and event registrations
✓ Offer RSVP with free tickets (or no tickets)
✓ Automatically open and close sales based on date and/or ticket sold
✓ Create event registrations forms
✓ Collect payments with cards and PayPal accounts
✓ Collect money straight into your own PayPal
✓ Automatically send confirmation emails to attendees and your team
✓ Download lists of attendees
✓ Manage attendees (approve, cancel, etc.)
✓ Create reusable venue profiles
✓ Organize events by categories
✓ Display events by category on your website.
✓ Mobile optimized.
✓ Compatible with most themes
✓ Search engine optimized to improve the SEO of your events.
✓ All from your WordPress dashboard

Specially designed for WordPress, your event registration and ticket sales can be better backed by the team of experts that have been doing this longer than any else on WordPress. ☕️



### Streamline Your Event Management:

- Save hours of administrative tasks with automated processes.
- Provide your attendees with a smooth, 24/7 registration experience.
- Go green by offering paperless event registration.


### Everything You Need to Manage Events Efficiently:

- Event Ticketing and Registration: Start selling tickets directly from your WordPress site.
- Payment Processing: Easily accept payments with PayPal (no API keys required, just connect to your PayPal account with your username and password). Upgrade to [Premium Support](https://eventespresso.com/pricing/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_content=buy+a+support+license&utm_campaign=ee4_decaf_whats_included) for additional payment options.
- Automated Email Notifications: Keep attendees informed with confirmation and reminder emails.
- Attendee Management: Track RSVPs, registrations, ticket sales and collect and manage attendee details with ease.
- Download Attendee Data: Collect attendee contact information into your WordPress website and download the data at any time. 
- Mobile Event Apps: Manage check-ins with our Android and Apple apps (scanning tickets available in the premium version). 📱

Explore more features and view screenshots [here](https://eventespresso.com/features/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_content=View+Sample+Screens+Here&utm_campaign=ee4_decaf_plugin_screenshots_tab).

== Screenshots ==

1. Multiple Ticket and Pricing Options
2. Customized Confirmation Emails
3. Customizable Event Designs
4. Smart Single Page Checkout
5. Contact Profiles
6. Contact List
7. In-app Documentation
8. Customizable Country Settings

== Changelog ==

## Releases

### [5.0.55]

#### Added
 - Add expired only query param to EEH_Event_Query helper
 - Load Polyfills If WP Version Is Less Than 6.8
 - Allow registrations to be reassigned to existing or new contacts

#### Fixed
 - Fix SPCO form validation highlight and unhighlight styling
 - Fix incorrect PayPal Commerce variable
 - Remove Version Strings Appended to Add-on Folder Names

#### Security
 - Upgrade jQuery Validation library to v1-22-0



### [5.0.54]

#### Added
 - Restrict Self Service Registration Cancellations Outside of Ticket Sale Dates
 - Allow ticket line items to be passed into Event Scope calculateAndApplyPromotion method

#### Fixed
 - PPC. Prevent transaction mixup.



### [5.0.53]

#### Added
 - Add PRINT_BUTTON_* shortcode

#### Fixed
 - Fix Question Group Identifier On Save

#### Changed
 - Append the ticket name to the attendee in SPCO  
 - Upgrade wp-graphql to version v1-32-1 
 - Block Incompatible Add-ons From Reactivating



### [5.0.52]

#### Added
- PayPal Commerce default payment options allowed

#### Fixed
- Fix persistent admin notice registrations previously dismissed notices
- Fix loading Event attendee Gutenberg block
- Fix floating content editor

#### Changed
- Do not translate model names



### [5.0.51]

#### Added
- Add Venue shortcodes to DATETIME_LIST in message templates
- PayPal Commerce: Add Toggle to activate alternative payment methods

#### Fixed
- Integer values in 4.1.0 DMS

#### Changed
- Escape translations on messages settings
- Use guard clase instead of remove_action()



### [5.0.50]

#### Fixed
 - [Fix dynamic shortcodes not parsing correctly (#2028)]

#### Changed
 - [Add a capability check for the New Date Button (Barista#1463) (#2020)]
 - [TPC - Decimal values broken (Barista#1459) (#2025)]



### [5.0.49]

#### Fixed
 - [Fix events rest endpoint (#2021)]
 - [Update message RegEx to include shortcodes within digits, e.g [CO_ADD1] (#2022)]

#### Changed
 - [Add Update URI: to all none WP.org hosted plugins. (#2018)]



### [5.0.48]

#### Added
 - [New Thank You Page Hook (#2004)]

#### Fixed
 - [Fix CSV reports on SSL redirects (#2010)]

#### Changed
 - [Require ee_advanced_event_editor Cap to Duplicate Event (#1889)]
 - [Skip Session Save Path Filesystem Checks for open_basedir Violations (#2005)]
 - [Relax Restrictions Generator Action Type (#2008)]
 - [Allow for dynamic shortcode parameters within the message system (#2012)]



### [5.0.47]

#### Fixed
 - [Dont Verify Session Save Path If Handler Does Not Use The File System (#1984)]
 - [Fix Session Save Path With open_basedir Restrictions (#1987)]
 - [Dont Allow Bypass of Ticket Selector Required Checkbox (#1989)]

#### Changed
 - [Mark Mailchimp as Incompatible Addon (#1982)]



### [5.0.46]

#### Changed
 - [Add Serialized Model Protection (#1914)]
 - [Improve SessionStartHandler Error Handling (#1967)]
 - [Fix Model Cap Restriction Generation (#1975)]



### [5.0.45]

#### Fixed
 - [Dont send address to PayPal if country code is not  a 2 character ISO 3166 code (#1947)]

#### Changed
 - [Trailing 0 Removed from Ticket Price Calculator (Barista#1426) (#1940)]
 - [REM tickets do not fully retain their state when editing (Barista#1368) (#1942)]
 - [PayPal Commerce - if no country has been set use state iso (#1956)]



### [5.0.44]

#### Fixed
 - [Fix PayPal Commerce payments when no address information is available (#1937)]



### [5.0.43]

#### Fixed
 - [SaaS. Fix fatals from Jul 24th (#1924)]
 - [Previous value in method update_extra_meta (#1936)]
 - [Fix SPCO Available Payment Methods Setup (#1927)]

#### Changed
 - [Update type AssignmentStatus in Ticket Assignment Manager. (Barista#1408) (#1920)]
 - [Fix PayPal Commerce order request (#1921)]



### [5.0.42]

#### Fixed
 - [Fix Additional Registrant Incomplete Reg Forms (#1856)]
 - [Fix License Keys Admin Menu Loading on Multisite (#1860)]
 - [Fix PluginLicense Error During Cron (#1866)]
 - [Fix Version Parsing (#1883)]
 - [Prevent load_textdomain_just_in_time notice from GraphQL (#1882)]
 - [Fix Admin Page RSS Feed (#1893)]
 - [PPC. Fix updating onboarding status (#1888)]
 - [Modify System Hook Points (#1891)]
 - [Fix Payment Method Nag Notices (#1895)]
 - [Decode HTML Entities in Reg Form Options (#1892)]
 - [Fix SPCO Transaction Lock (#1906)]
 - [SAAS. After deploy fixes Jul 16 (#1911)]
 - [Remove types in EEM_Base that were changed or might be null (#1912)]

#### Changed
 - [Dont migrate options we dont use (#1845)]
 - [Rename Version Files and Fallback to Main File for Version (#1880)]
 - [Load Textdomain on Init (#1637)]
 - [Define Model Field Data Types (#1714)]
 - [Refactor Events Calendar Plus Data Loading and Add Data Migration Management (#1881)]
 - [Removed Default Filters From Datetimes And Tickets In Editor (Barista#1422) (#1910)]
 - [Fix Plugin Action Settings Links and Improve Plugin Menu Items (#1377)]
 - [Move Existing and Add New SPCO Line Item Filters (#1907)]
 - [Check For Main Query Before Running Logic in THE LOOP (#1767)]



### [5.0.41]

#### Changed
 - [Fix RegFormHandler not processing multiple registrations]
 - [Don't migrate EE3 options that are no longer used]



### [5.0.40]

#### Added
 - [Add hook for setting payment method form options (#1840)]

#### Fixed
 - [PPC. Stripe. Fix partner fees messages (#1830)]
 - [Fix SPCO Update Requests (#1837)]
 - [PPC. Fix log messages (#1841)]

#### Changed
 - [BuildMachine 5.0.39 changes]
 - [fixed placeholder issue in edtr and p tag issue (Barista#1387) (#1822)]
 - [Set EDD licensing feature flag default to true (#1824)]
 - [Implemented CUID2 and Its Support for Jest (Barista#1409) (#1842)]
 - [Move Default Where Conditions Constants (#1818)]
 - [Transfer PUE License Key to EDD Client  (#1851)]



### [5.0.39]

#### Added
 - [Add REG_ID Field to Reg Admin List Table Search Conditions (#1635)]

#### Fixed
 - [Prevent fatal when other plugins set the_content to null (#1778)]
 - [Fix State Select Validation (#1770)]
 - [Fix Empty Option in Select Inputs (#1786)]
 - [Attach JS Objects to Global Window (#1791)]
 - [Check for Query Params Before Access (#1720)]
 - [Use a simple PPC order if a mistmatch error occurs  (#1797)]
 - [Fix Admin Only option not saving when adding/editing questions (#1812)]
 - [Fix EE_Attende_Shortcodes parser property (#1819)]

#### Changed
 - [BulidMachine 5.0.38.p changes]
 - [Mod/Add or Update readme Files (#1748)]
 - [PPC. Better error messages (#1777)]
 - [Fixed Backspace in Date Input Crashes Calendar (Barista#1367) #1792]



### [5.0.38]

#### Added
 - [Add support for Stripe partner fees (#1769)]



### [5.0.37]

#### Fixed
 - [Hide Final PM Deprecation Notice If Nothing Deactivated (#1761)]
 - [Fix Version Parsing in PHP 7.4 (#1762)]

#### Changed
 - [Build Machine 5.0.36.p changes (#1747)]



### [5.0.36]

#### Fixed
 - [Use correct label_count default for a custom post status (#1738)]

#### Changed
 - [Build Machine changes 5.0.35.p (#1723)]
 - [Allow ESPRESSO_TICKET_SELECTOR to be used without passing an event_id (#1745)]
 - [Allow -1 to be passed as the query limit (#1744)]



### [5.0.35]

#### Fixed
 - [Fix Conditional Question Trigger ID Sanitization (#1677)]
 - [Allow HTML within Question Text and Question options (#1711)]
 - [Continue to check uploads directory for templates (#1705)]

#### Changed
 - [BuildMachine 5.0.34.p changes (#1700)]



### [5.0.34]

#### Fixed
 - [PPC. Fix Payment Methods Pro support for PayPal Commerce (#1696)]
 - [Fix Conflict With REM Styles (#1697)]
 - [Fix registration question admin label field not saving (#1647)]
 - [Fix SaaS Signup Form (#1660)]
 - [Fix SPCO Attendee Info Ticket Display (#1636)]

#### Changed
 - [BuildMachine 5.0.33 changes (#1683)]



### [5.0.33]

#### Fixed

 - [Fix Registration Refunds (#1638)]
 - [PPC. Fix amount rounding issue (#1622)]
 - [PPC. Fix double payments created (#1667)]



### [5.0.32]

#### Added

 - [Move PM Deprecation Dates (#1676)]



### [5.0.31]

#### Fixed
 - [Add Nonce for Add New State AJAX Requests (#1630)]
 - [PUE Fix - Dont translate plugin data when checking version numbers (#1632)]

#### Changed
 - [BuildMachine 5.0.30 changes (#1629)]
 - [Set the min required WP User integration version number to be 2.1.3 (#1633)]



### [5.0.30]

#### Added
 - [Advanced Registration Forms (#1155)]
 - [New Self-Serve Registration Cancellation Add-on (#1581)]
 - [Add author bundle for Loco Translate (#1602)]

#### Fixed
 - [Check DbStatus::isOnline() Before Loading Service Change Notifications (#1586)]
 - [Remove period shown when only one attendee can register (#1583)]
 - [Welp! Just Sanitize and Return Widget Settings! (#1591)]
 - [Fix Event Subtotal Line Item Selection When Using Event Cart (#1598)]
 - [Fix Event Cart UI Update When Deleting Tickets (#1599)]
 - [Fix Registration Status Updates (#1612)]
 - [Fix iFrame CSS IDs (#1613)]
 - [Allow Checkbox Inputs When Using Datetime Selector (#1606)]
 - [PPC. Fix ACDC removing country field (#1621)]

#### Changed
 - [BuildMachine 5.0.29 changes (#1585)]
 - [Update Unit Tests (#1597)]
 - [Update Registration Admin Questions Form Submission (#1593)]
 - [Dont Load Payment Method Deprecation 2025 Notices on Event Smart (#1603)]
 - [Update jQuery Validate to v1.19.5 (#1592)]
 - [Improve Loco Translate bundle to include both translation filenames (#1626)]



### [5.0.29]

#### Fixed
 - [Clean Billing Info AFTER Passing Payment to Gateway (#1582)]

#### Changed
 - [BuildMachine 5.0.28 changes (#1579)]



### [5.0.28]

#### Added
 - [New Ticket Selector Checkbox and Form Styles (#1527)]
 - [Add Payment Method Deprecation Notices (#1564)]
 - [Bypass Payment Processing if Too Many Payment Attempts (#1577)]

#### Fixed
 - [PPC. Fix success payment set as pending (#1538)]
 - [Ensure EE_AUTOSAVE_IDS is Defined (#1471)]
 - [PPC. Fix an issue with a missing checkout type meta (#1548)]
 - [Fix meta caps for Registration Form caps (#1546)]
 - [Fix CSS Output in iFrames (#1552)]
 - [Fix venue not being unassigned in EDTR (GraphQL) (#1561)]
 - [Fix Missing Check-ins Bulk Actions (#1549)]
 - [Fix Typing for EE_Datetime_Field::prepare_for_display() (#1570)]
 - [Fix List Table Views (#1576)]
 - [Fix MER Max Ticket Quantity Violations (#1567)]

#### Changed
 - [ Loosen Upcoming Events Widget Permissions (#1554)]
 - [When copying datetime include venue id (Barista#1338) (#1568)]
 - [Ensure WordPress Options Are Saved (#1574)]



### [5.0.27]

#### Added
 - [Add Venmo funding option to PayPal Commerce (#1522)]

#### Fixed
 - [Dont replace checkout type with PPC funding options in extra meta inputs (#1534)]
 - [Add Billing Form Instance Check (#1537)]
 - [Fix GraphQL requests when WP is installed in a subdirectory (#1531)]

#### Changed
 - [Fix phpdoc tags (#1505)]
 - [auto lint fixes (#1358)]



### [5.0.26]

#### Fixed
 - Fixed PHP 7.4 Incompatible Code in InterfaceManager

#### Changed
 - [BuildMachine changes - 5.0.25.p (#1511)]


## What Our Users Say

> Your plugin saved our client nearly $9000 in development costs because it handled the majority of the functionality we were looking for at a much lower cost. Event Espresso's staff have been very responsive to our needs when we have them (which has been rare, because the plugin is so well coded). Great job on a great plugin!

Brandon P. - [Experience Farm](http://www.experiencefarm.com/)

> At first we looked at CVENT for one of our clients and they wanted $16,000 per year for 3000 event attendees + fees totaling $22k. That is before Staff and Webinar fees. Worst of all we had to prepay the $16k amount even if we never used all 3000 attendees. That was when we looked at Event Espresso and we realized we could build our own event system for less than 16K. For the most part we have been very satisfied with our decision. The real ROI will come next year when they don't have to pay another 16k-22K! Over the next 5-6 years we should be able to claim that we saved the company over $100,000 - Thanks Event Espresso!

David Waterman - [KT Benefits & InkItDigital.com](http://ktbenefits.info/)

> I can't really estimate how much time or money I've saved by using EE because I've always used it! I would have to guess that without it, I would need someone full time to keep my events organized, so that's at least $10K. In 3 years I went from running up to 7 parties per weekend (Fri. night - Sun. night) to running up to 33 parties per weekend. My sales for 2014 were $540,000+. It boggles my mind sometimes. I don't know how I would possibly keep this all straight without my Event Espresso registration system which allows my guests to register and pay online, and keeps track of everything for me.

Tara Smith - [The Uncorked Artist](http://www.theuncorkedartist.com/)

> Thank you, we just did 2 sell out seminars of 50 attendees in 48 hours using Event Espresso and it was awesome. My wife was able to pick up on the processing backend with ease. You have done a great job on getting this system together - very simple, clear and well laid out With powerful functionality. I am so glad I dumped the old booking application we had and gave Event Espresso a go. Just wanted to say thanks, and thanks for the very patient, friendly and speedy assistance in helping me to get it all set up at the start. Many thanks to you and your team. A grateful customer.

Nicholas de Castella - [Emotional Intelligence Trainings](http://www.eq.net.au/)
> It is a very, very slick plugin. It's one of those plugins where you install it, change a couple of settings, and boom you're selling tickets.

Brad Williams - [WebDevStudios](http://webdevstudios.com/)

> Thanks to you and the rest of the team for Event Espresso -- Every time I get a signup for an event, I think about how much time EE saves me -- and signups happen while I'm out on the water teaching kayaking, not answering the phone.

Tue Brems Olesen [OnAdventure](http://onadventure.dk/)

> [Tri-South, Inc](http://tri-southinc.com/) is using Event Espresso to manage the course catalog, event ticketing, and class registration. [As their developer] I have customized a few items to make the site and plugin a seamless integration. The client is very pleased!

Jenifer - [Jenifer Design](http://jeniferdesign.com/)

> My hope with this whole integration is to be able to show other school districts an affordable and easy solution to these registrations. I cannot believe how much money they are charged for less by other companies. This has the potential to save schools tens of thousands, which is huge right now.

Kelly - [College Station Independent School District](http://csisd.org/)

> I chose EE because, a few years ago, I was using it on a personal website and loved it. So, when I discovered that our current event management system that is deployed in other areas of campus was completely deficient for this initiative's needs, I didn't even hesitate to use EE.

Rob Domaschuk

Read more [testimonials](https://eventespresso.com/testimonials/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_testimonials_tab) from our satisfied customers.

## Unlock Advanced Features with Premium Support

Enhance your event management capabilities by upgrading to our Premium Support License. Get access to powerful features such as:

- [Event Calendar](https://eventespresso.com/product/ee4-events-calendar/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=Event+Calendar) - Display your events in a sleek calendar view supporting events with multiple dates, images, categories, colors, and more.
- [Multiple Payment Gateways:](https://eventespresso.com/features/payment-options/?ee_ver=ee4&utm_source=wordpress_org&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=Additional+Payment+Gateways) - Accept payments through Stripe, Square and more.
- [Custom Registration Form Question](https://eventespresso.com/features/event-registration/?ee_ver=ee4&utm_source=wordpress_org&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=custom+questions) - Ask any type of question in your registration forms.
- [Promotion Codes & Discounts](https://eventespresso.com/product/eea-promotions/?ee_ver=ee4&utm_source=wordpress_org&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=prmotions) - Incentivize attendees with promotion and discount codes during checkout.
- [Advanced Ticket Options:](https://eventespresso.com/features/multiple-ticket-pricing-options/?ee_ver=ee4&utm_source=wordpress_org&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=Multiple+Pricing+Options) - Offer multiple pricing tiers and ticket types.
- [Manual Registration:](https://eventespresso.com/features/manual-registration/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=Manual+Registration) - Add attendees manually and manage offline registrations.
- [Customizable Email Templates:](https://eventespresso.com/features/confirmation-emails/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=Reusable+Email+Templates) - Send personalized emails with our reusable templates.
- [QR and Barcode Ticket Scanning:](https://eventespresso.com/product/eea-ticketing/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=ticketing) - Send attendees tickets with QR and/or Barcodes and use our mobile apps to scan and validate tickets at the door or track attendance.
- [Tax Administration:](https://eventespresso.com/features/tax-administration/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=Tax+Administration)
 - Manage and report on tax for your events.
- [Recurring Events:](https://eventespresso.com/product/eea-recurring-events-manager/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=recurring) - Automate creating new events based on a schedule in the future.
- [Event Cart:](https://eventespresso.com/product/eea-multi-event-registration/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=mer) - Allow attendees to purchase tickets from multiple events at the same time during one checkout transaction.
- Conditional Logic Forms: - Configure the registration form questions and answers to change based on what answers attendees give to your registration questions (coming soon).
- Ticket Questions: - Control which questions are asked attendees based on the ticket they select (coming soon).
- And much more!

Learn more about [Premium Features](https://eventespresso.com/features/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_description_tab&utm_content=Event+Calendar).

Use Cases

[Event Espresso](https:eventespresso.com/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases) is a very flexible, and robust event ticketing plugin for WordPress. Many [optional features](https://eventespresso.com/features/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases) include an [integrated calendar](https://eventespresso.com/product/ee4-events-calendar/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases), [ticket scanning](https://eventespresso.com/product/eea-barcode-scanner/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases) & check-in/out capabilities, [single page checkout](https://eventespresso.com/features/intelligent-single-page-checkout/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases), [multiple event registration](https://eventespresso.com/product/eea-multi-event-registration/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases), and after event [marketing tools](https://eventespresso.com/product/eea-mailchimp/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_case).

= Arts & Culture =

* City Tours
* Club Performances
* Concerts
* [Film Festivals](https://eventespresso.com/use-cases/film-festival-ticketing-software/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Museum Tickets
* Music Festivals
* Movie Theater Ticket Sales
* [Paint & Wine](https://eventespresso.com/use-cases/paint-wine-party-ticketing-software/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Plays and Theatrical Performances
* [Sewing & Quilting Retreats](https://eventespresso.com/use-cases/quilt-retreat-booking/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Social Events

= Business =

* Asset/Resource Booking/Scheduling
* Car Wash Sales & Reservations
* [Conference Registration](https://eventespresso.com/use-cases/conference-registration/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* [Haunted House Ticket Sales](https://eventespresso.com/2012/09/haunted-house-ticketing-system/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* House Cleaning Services
* [Model Agency Booking/Scheduling](https://eventespresso.com/use-cases/modeling-talent-agency-scheduling/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Room Booking/Scheduling
* Workshop Registrations 

= Classes =

* [Art Classes](https://eventespresso.com/use-cases/paint-wine-party-ticketing-software/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Cooking Classes
* Dance Classes
* Continuing Education Classes
* Fitness Club Classes
* Martial Arts Classes
* Firearms and Concealed Weapons Training
* Music Classes
* Scrapbooking Classes
* [Skydiving Classes](https://eventespresso.com/use-cases/skydiving-jumping-class-reservations/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Training Classes
* Yoga Classes
* Drivers Education
* Technical/IT Training

= Community Events Conferences =

* [Backyard Barbecues](https://eventespresso.com/use-cases/backyard-bbq-ticketing/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* [BBQ Festivals](https://eventespresso.com/use-cases/bbq-festival-ticketing/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* [Car Shows](https://eventespresso.com/use-cases/car-show-registration-ticket-sales/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Group Meetings
* Neighborhood Association Gatherings
* Youth Conferences/Camps

= Conferences =

* [Conference Registration](https://eventespresso.com/use-cases/conference-registration/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Geek/IT Conferences/Camps
* Political Conferences
* Social Media Conferences
* Tradeshow Booth Reservations/Sales
* Tradeshow Vendor Registration
* WordCamps


= Education =

* Concealed Weapons Courses
* Course Registrations
* School Lunch Reservations
* Parent Teacher Conferences
* Parent Teacher Association Meetings
* Wildlife Education and Tours 

= Fundraisers & Non-Profit Organizations =

* Boy Scout Jamborees
* [Car Show Registration](https://eventespresso.com/use-cases/car-show-registration-ticket-sales/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Donation Drives
* Industry Association Events
* Religious Events
* Volunteer Management

= Government =

* Chamber of Commerce
* Community Recreation Centers
* Department of Justice

= Parties =

* Birthday Parties
* Christmas Parties
* Class Reunions
* New-Year's Eve Parties
* [Paint & Wine Parties](https://eventespresso.com/use-cases/paint-wine-party-ticketing-software/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Weddings

= Recreation =

* [Skydiving Bookings](https://eventespresso.com/use-cases/skydiving-jumping-class-reservations/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Adventure Tours

= Socials =

* Dancing
* [Painting & Vino](https://eventespresso.com/use-cases/paint-wine-party-ticketing-software/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* [Sewing & Quilting Retreats](https://eventespresso.com/use-cases/quilt-retreat-booking/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases)
* Speed Dating

= Sports =

* Races
* Sports Arena Tickets and Season Passes
* Tournament Registration
* Football and Soccer Training
* Tennis Classes

= Training =

* ACLS & CPR Training
* Firearms and Concealed Weapons Training
* Medical & First Aid Training
* Scrum Master Training
* Technical/IT Training

= Workshops =

* Carpentry & Wood Working
* Furniture Restoration
* Marketing
* Public Speaking
* Real Estate Workshops
* Visualization Workshops

If you aren't quite sure if Event Espresso will work for you and it's not listed above, then [contact us](https://eventespresso.com/contact/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_decaf_plugin_more_info_use_cases_tab&utm_content=WordPress+event+manager+use_cases) and we'll do our best to evaluate your needs.


## Get Started Today

### Installation Instructions

Quick Install:

1. Search for "Event Espresso" in the WordPress admin under Plugins → Add New.
2. Install and activate the plugin.

Install via FTP:

1. Download Event Espresso from the WordPress Plugin Directory.
2. Unzip the `event-espresso-core-decaf` folder.
3. Upload it to the `wp-content/plugins` directory using SFTP or FTP.
4. Activate the plugin from the WordPress admin.

For detailed installation and setup instructions, visit our [documentation](https://eventespresso.com/wiki/installing-event-espresso/?utm_source=wordpress_org&utm_medium=link&utm_content=installation&utm_campaign=ee4_decaf_plugin_installation_tab).

== Frequently Asked Questions ==

= What is Event Espresso? =

Event Espresso is ticket and event management software for the modern world. Do you need to convince someone about Event Espresso? Share our [new video](https://eventespresso.com/2012/11/what-is-event-espresso-video/) or [print a brochure](http://ee-screenshots.s3.amazonaws.com/2012/02/EE_brochure_small.pdf).

= Can I fully manage my events with Event Espresso Decaf? =

You will be able to manage basic events with Event Espresso Decaf entirely, which is sufficient for many WordPress users. If you need advanced features, you can check out our Premium [Event Management plugin](https://eventespresso.com/pricing/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_content=Event+Management+plugin&utm_campaign=ee4_decaf_plugin_faq_tab)

= Can I use the Android & Apple event apps with Event Espresso Decaf? =

Yes, the [event apps](https://eventespresso.com/features/mobile-ticketing-apps/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_content=event+apps&utm_campaign=ee4_decaf_plugin_faq_tab) work great with Event Espresso Decaf!

= Will Event Espresso work on my server? =

We have a plugin available that will check your server for the [minimum requirements](https://eventespresso.com/requirements/).

= Do you support WordPress multisite? =

WordPress multisite brings some complexity that can lead to some challenges. As such we do offer customized support for multisite. Contact us for details. If you're unsure about using multisite, then please read [this article](http://halfelf.org/2011/dont-use-wordpress-multisite/).

= Which web browsers work with Event Espresso? =

Event Espresso has been tested with the most current versions of Edge, Firefox, Safari, Chrome on the Windows PC and Mac OSX platforms. Event Espresso may function just as well in older or other, less modern browsers, but we only support those listed previously. For more information, please see our [supported web browsers](https://eventespresso.com/faqs/supported-web-browsers/) page.

= Do you monitor the WordPress.org support forums? =

We DO NOT regularly monitor the support forums on WordPress.org. You'll find a faster response time at the [support forums on our website](https://eventespresso.com/support/forums/?utm_source=wordpress_org&utm_medium=link&utm_content=support+forums+on+our+website&utm_campaign=ee4_decaf_plugin_faq_tab).

= What if I don't have (or don't want) a WordPress website? =

If you want to organize your event fast without the hassle of managing a server, plugins, and security, then build your event website on our event cloud [Event Smart - free online event registration and ticketing management](https://eventsmart.com/?utm_source=wordpress_org&utm_medium=EE4_faq&utm_campaign=EE4&utm_content=link).

= Is Event Espresso 4 available on Github? =

Yes, you can get access to the core files via the [Event Espresso 4 Github page](http://evts.io/EE4_WP_Readme).

## Support and Resources

### Need Help?

Our full documentation is available [here](https://support.eventespresso.com).

This version is self-supported only or ask the community for help in the community forums. For faster support, consider purchasing a [Premium Support License](https://eventespresso.com/pricing/?ee_ver=ee4&utm_source=wordpress_org&utm_medium=link&utm_content=Buy+a+Premium+Support+License&utm_campaign=ee4_decaf_plugin_support_tab) and access our dedicated support forum.

Translators, find out how [you can translate Event Espresso](https://eventespresso.com/wiki/how-to-translate-event-espresso/?utm_source=wordpress_org)


### Developer Resources:

- [Event Espresso on GitHub](https://github.com/eventespresso/event-espresso-core)

### Stay Updated:

Sign up for our [newsletter](https://eventespresso.com/newsletter/?utm_source=wordpress_org&utm_medium=link&utm_campaign=ee4_plugin_description_tab&utm_content=newsletter+signup) to be the first to know about new features and updates.

## Changelog and Updates

Always back up your site before updating. For a detailed changelog, visit our [changelog page](https://eventespresso.com/wiki/ee4-changelog/?utm_source=wordpress_org&utm_medium=link&utm_content=changelog&utm_campaign=ee4_decaf_plugin_changelog_tab).


## License

Copyright 2024 Event Espresso

Licensed under the GNU General Public License v2.0.