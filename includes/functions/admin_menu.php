<?php
//Build the admin menu
if (!function_exists('add_event_espresso_menus')) {
    function add_event_espresso_menus() {
        global $org_options, $espresso_premium;

        //Main menu tab
        add_menu_page(__('Event Espresso','event_espresso'), '<span style=" font-size:12px">'.__('Event Espresso','event_espresso').'</span>', 'administrator', 'event_espresso', 'organization_config_mnu', EVENT_ESPRESSO_PLUGINFULLURL . 'images/events_icon_16.png');

        //General Settings
        add_submenu_page('event_espresso', __('Event Espresso - General Settings', 'event_espresso'), __('General Settings', 'event_espresso'), 'administrator', 'event_espresso', 'organization_config_mnu');

        //Event Setup
        add_submenu_page('event_espresso', __('Event Espresso - Event Overview', 'event_espresso'), __('Event Overview', 'event_espresso'), 'administrator', 'events', 'event_espresso_manage_events');
		
		//Attendee Overview
        add_submenu_page('event_espresso', __('Event Espresso - Attendee Overview', 'event_espresso'), __('Attendee Overview', 'event_espresso'), 'administrator', 'attendees', 'event_espresso_manage_attendees');
		
		/*
		 * Added for seating chart addon
		 */
		//Seating chart management
		if ( defined('ESPRESSO_SEATING_CHART') ){
			add_submenu_page('event_espresso', __('Event Espresso - Seating Chart','event_espresso'), __('Seating chart','event_espresso'), 'administrator', 'seating_chart', 'event_espresso_manage_seating_chart');
		}
		/*
		 *
		 */
		 
        //Venues
        if (isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Venue Manager', 'event_espresso'), __('Venue Manager', 'event_espresso'), 'administrator', 'event_venues', 'event_espresso_venue_config_mnu');
            //add_submenu_page('event_espresso', __('Event Espresso - Locales/Regions Manager','event_espresso'), __('Locale Manager','event_espresso'), 'administrator', 'event_locales', 'event_espresso_locale_config_mnu');
        }
        //Personnel
        if (isset($org_options['use_personnel_manager']) && $org_options['use_personnel_manager'] == 'Y' && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Staff Manager', 'event_espresso'), __('Staff Manager', 'event_espresso'), 'administrator', 'event_staff', 'event_espresso_staff_config_mnu');
        }

        //Form Questions
        add_submenu_page('event_espresso', __('Event Espresso - Questions', 'event_espresso'), __('Questions', 'event_espresso'), 'administrator', 'form_builder', 'event_espresso_questions_config_mnu');

        //Questions Groups
        add_submenu_page('event_espresso', __('Event Espresso - Question Groups', 'event_espresso'), __('Question Groups', 'event_espresso'), 'administrator', 'form_groups', 'event_espresso_question_groups_config_mnu');

        //EventCategories
        add_submenu_page('event_espresso', __('Event Espresso - Manage Event Categories', 'event_espresso'), __('Categories', 'event_espresso'), 'administrator', 'event_categories', 'event_espresso_categories_config_mnu');

        //Discounts
        if (function_exists('event_espresso_discount_config_mnu') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Promotional Codes', 'event_espresso'), __('Promotional Codes', 'event_espresso'), 'administrator', 'discounts', 'event_espresso_discount_config_mnu');
        }

        //Groupons
        if (function_exists('event_espresso_groupon_config_mnu') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Groupons', 'event_espresso'), __('Groupon Codes', 'event_espresso'), 'administrator', 'groupons', 'event_espresso_groupon_config_mnu');
        }

        //Email Manager
        if (function_exists('event_espresso_email_config_mnu') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Email Manager', 'event_espresso'), __('Email Manager', 'event_espresso'), 'administrator', 'event_emails', 'event_espresso_email_config_mnu');
        }
		
		//Event styles & templates
        add_submenu_page('event_espresso', __('Event Espresso - Template Settings', 'event_espresso'), __('Template Settings', 'event_espresso'), 'administrator', 'template_confg', 'event_espresso_manage_templates');

        //Calendar Settings 
        if (function_exists('espresso_calendar_config_mnu') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Calendar Settings', 'event_espresso'), __('Calendar Settings', 'event_espresso'), 'administrator', 'espresso_calendar', 'espresso_calendar_config_mnu');
        }

        //Payment Settings
        if (function_exists('event_espresso_gateways_options')) {
            add_submenu_page('event_espresso', __('Event Espresso - Payment Settings', 'event_espresso'), __('Payment Settings', 'event_espresso'), 'administrator', 'payment_gateways', 'event_espresso_gateways_options');
        }

        //Member Settings
        if (function_exists('event_espresso_member_config_mnu') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Member Settings', 'event_espresso'), __('Member Settings', 'event_espresso'), 'administrator', 'members', 'event_espresso_member_config_mnu');
        }

        //MailChimp Integration Settings
        if (function_exists('event_espresso_mailchimp_settings') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - MailChimp Integration', 'event_espresso'), __('MailChimp Integration', 'event_espresso'), 'administrator', 'espresso-mailchimp', 'event_espresso_mailchimp_settings');
        }
		
		//Ticketing Settings
        if (function_exists('espresso_ticket_config_mnu') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Ticket Settings', 'event_espresso'), __('Ticket Settings', 'event_espresso'), 'administrator', 'event_tickets', 'espresso_ticket_config_mnu');
        }

        //Facebook Event Integration Settings
        if (function_exists('espresso_fb_settings') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Facebook Settings', 'event_espresso'), __('Facebook Settings', 'event_espresso'), 'administrator', 'espresso_facebook', 'espresso_fb_settings');
        }

		//Reports
		if (function_exists('espresso_reports') && $espresso_premium == true) {
			add_submenu_page('event_espresso', __('Event Espresso - Reports','event_espresso'), __('Reports','event_espresso'), 'administrator', 'espresso_reports', 'espresso_reports');
		}


        //Social Media Settings
        if (is_plugin_active('espresso-social/espresso-social.php') && $espresso_premium == true) {
            add_submenu_page('event_espresso', __('Event Espresso - Social Media Settings', 'event_espresso'), __('Social Media', 'event_espresso'), 'administrator', 'espresso_social', 'espresso_social_config_mnu');
        }

        //Addons
        add_submenu_page('event_espresso', __('Event Espresso - Addons', 'event_espresso'), __('Addons', 'event_espresso'), 'administrator', 'admin_addons', 'event_espresso_addons_mnu');

        //Help/Support
        add_submenu_page('event_espresso', __('Event Espresso - Help/Support', 'event_espresso'), __('<span style="color: red;">Help/Support</span>', 'event_espresso'), 'administrator', 'support', 'event_espresso_support');
    }

}
