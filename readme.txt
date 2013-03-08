=== Event Espresso ===

Contributors: 
Seth Shoultes http://eventespresso.com

Donate link: http://eventespresso.com

Tags: event management, event registration, paypal event registration, paypal ipn

Requires at least: 3.0

Tested up to: 3.1

== Description ==

This plugin provides a way to take online registrations for events such as conference and seminars that are held live. It uses the PayPal and Authorize.net IPNs to record payments to a database.

This WordPress plugin is designed to run on a WordPress webpage and provide registration for an event. It allows you to capture the registering persons contact information to a database and provides an association to an events database. It provides the ability to send the registrant to your PayPal payment page for online collection of event fees. PayPal and Authorize.net payments are captured to the database using the PayPal and Authorize.net IPNs. Events are sorted by date and a short code is provided to display a single event or category of events on a page.

Reporting features provide a list of events, list of attendees, and excel export.

I have made several changes to this plugin in the last few months. Quite a bit has changed in the code and database tables. If you are upgrading from a previous version of this plugin, be sure to back up your current installation of this plugin. It is also a good idea to backup your WordPress database as well. If you have modified the original code of your current installation you definitely want to make a backup of your existing plugin. I would even suggest installing the plugin on a test version of WordPress.


== Support ==
Please visit the forums http://www.eventespresso.com/forums/

Current Version: 3.0.19

Author: Seth Shoultes
Author URI: http://eventespresso.com


== Installation ==

1. After unzipping, upload everything in the `event-espresso` folder to your `/wp-content/plugins/` directory (preserving directory structure).

2. Activate the plugin through the 'Plugins' menu in WordPress.

3. Go to the Event Registration Menu and Configure Organization and enter your company info - note you will need a paypal id if you plan on accepting paypal payments

4. Go to the Event Setup and create a new event, make sure you select 'make active'.

5. Create a new page (not post) on your site. Put [ESPRESSO_EVENTS] in it on a line by itself.

6. Note: if you are upgradings from a previous version please backup your data prior to upgrade.

= License =

This plugin is provided "as is" and without any warranty or expectation of function. I'll probably try to help you if you ask nicely, but I can't promise anything. You are welcome to use this plugin and modify it however you want, as long as you give credit where it is due. 


== Frequently Asked Questions ==

To display a single event on a page use the [SINGLEEVENT single_event_id="Unique Event ID"]

To display a list of events in sidebar, use the Event Registration Widget. If your theme doesn't use widgets, you can use  <?php display_all_events(); ?> in theme code.

To use, create a new page with only  [ESPRESSO_EVENTS]

To display list of attendees of an active event use [LISTATTENDEES] on a page or post.

*For URL link back to the payment/thank you page use  [ESPRESSO_PAYMENTS] on a new page.

*For PayPal to notify about payment confirmation use  [ESPRESSO_TXN_PAGE] on a new page.

*This page should be hidden from from your navigation menu. Exclude pages by using the 'Exclude Pages' plugin from http://wordpress.org/extend/plugins/exclude-pages/ or using the 'exclude' parameter in your 'wp_list_pages' template tag. Please refer to http://codex.wordpress.org/Template_Tags/wp_list_pages for more inforamation about excluding pages.

= Email Confirmations =
For customized confirmation emails, the following tags can be placed in the email form and they will pull data from the database to include in the email.

[fname], [lname], [phone], [event],[description], [cost], [company], [co_add1], [co_add2], [co_city],[co_state], [co_zip],[contact], [payment_url], [start_date], [start_time], [end_date], [end_time]


= Sample Mail Send =

***This is an automated response - Do Not Reply***

Thank you [fname] [lname] for registering for [event].  We hope that you will find this event both informative and enjoyable.  Should have any questions, please contact [contact].

If you have not done so already, please submit your payment in the amount of [cost].

Click here to review your payment information [payment_url].

Thank You.

 
