<?php
function espresso_load_menu_css () {
	wp_enqueue_style('espresso_menu', EVENT_ESPRESSO_PLUGINFULLURL . 'css/admin-menu-styles.css');
}
add_action( 'admin_init', 'espresso_load_menu_css' );
 
//Build the admin menu
if (!function_exists('add_event_espresso_menus')) {

	function add_event_espresso_menus() {
		global $org_options, $espresso_premium;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		$espresso_manager = '';

		//If the permissions manager is installed, then load the $espresso_manager global
		if (function_exists('espresso_permissions_config_mnu') && $espresso_premium == true) {
			global $espresso_manager;
		} else {
			$espresso_manager = array('espresso_manager_events' => '', 'espresso_manager_categories' => '', 'espresso_manager_form_groups' => '', 'espresso_manager_form_builder' => '', 'espresso_manager_groupons' => '', 'espresso_manager_discounts' => '', 'espresso_manager_event_emails' => '', 'espresso_manager_personnel_manager' => '', 'espresso_manager_general' => '', 'espresso_manager_calendar' => '', 'espresso_manager_members' => '', 'espresso_manager_payment_gateways' => '', 'espresso_manager_social' => '', 'espresso_manager_addons' => '', 'espresso_manager_support' => '', 'espresso_manager_venue_manager' => '');
		}

// ---------------------------------------
		
				//Main menu tab
		add_menu_page(__('Event Espresso', 'event_espresso'), '<span style=" font-size:12px">' . __('Event Espresso', 'event_espresso') . '</span>', apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_events']), 'events', 'event_espresso_manage_events', EVENT_ESPRESSO_PLUGINFULLURL . 'images/events_icon_16.png');

		//Event Setup
		add_submenu_page('events', __('Event Espresso - Event Overview', 'event_espresso'), __('Events', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_events']), 'events', 'event_espresso_manage_events');

		//Attendee Overview
		add_submenu_page('events', __('Event Espresso - Attendee Overview', 'event_espresso'), __('Attendees', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_events']), 'attendees', 'event_espresso_manage_attendees');

		//Event Categories
		add_submenu_page('events', __('Event Espresso - Manage Event Categories', 'event_espresso'), __('Categories', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_categories']), 'event_categories', 'event_espresso_categories_config_mnu');

		//Questions Groups
		add_submenu_page('events', __('Event Espresso - Question Groups', 'event_espresso'), __('Question Groups', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_form_groups']), 'form_groups', 'event_espresso_question_groups_config_mnu');

		//Form Questions
		add_submenu_page('events', __('Event Espresso - Questions', 'event_espresso'), __('Questions', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_form_builder']), 'form_builder', 'event_espresso_questions_config_mnu');

		//Groupons
		if (function_exists('event_espresso_groupon_config_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Groupons', 'event_espresso'), __('Groupon Codes', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_groupons']), 'groupons', 'event_espresso_groupon_config_mnu');
		}

		//Discounts
		if (function_exists('event_espresso_discount_config_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Promotional Codes', 'event_espresso'), __('Promotional Codes', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_discounts']), 'discounts', 'event_espresso_discount_config_mnu');
		}

		//Seating chart management
		if (defined('ESPRESSO_SEATING_CHART')) {
			add_submenu_page('events', __('Event Espresso - Seating Chart', 'event_espresso'), __('Seating Chart', 'event_espresso'), 'administrator', 'seating_chart', 'event_espresso_manage_seating_chart');
		}
		
		do_action( 'action_hook_espresso_add_new_submenu_to_group_main' );

// ---------------------------------------
		
		// Management GROUP
		if ((function_exists('event_espresso_email_config_mnu') || $org_options['use_personnel_manager'] == 'Y' || $org_options['use_venue_manager'] == 'Y') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Management', 'event_espresso'), '<span class="ee_menu_group"  onclick="return false;">' . __('Management', 'event_espresso') . '</span>', apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_event_emails']), 'event_emails', 'event_espresso_email_config_mnu');

			//Email Manager
			if (function_exists('event_espresso_email_config_mnu') && $espresso_premium == true) {
				add_submenu_page('events', __('Event Espresso - Email Manager', 'event_espresso'), __('Emails', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_event_emails']), 'event_emails', 'event_espresso_email_config_mnu');
			}

			//Personnel
			if (isset($org_options['use_personnel_manager']) && $org_options['use_personnel_manager'] == 'Y' && $espresso_premium == true) {
				add_submenu_page('events', __('Event Espresso - Staff Manager', 'event_espresso'), __('Staff', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_personnel_manager']), 'event_staff', 'event_espresso_staff_config_mnu');
			}

			//Venues
			if (isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' && $espresso_premium == true) {
				add_submenu_page('events', __('Event Espresso - Venue Manager', 'event_espresso'), __('Venues', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_venue_manager']), 'event_venues', 'event_espresso_venue_config_mnu');
			}
		}
		do_action( 'action_hook_espresso_add_new_submenu_to_group_management' );

		// ---------------------------------------
 
		//Settings GROUP
		add_submenu_page('events', __('Event Espresso - Settings', 'event_espresso'), '<span class="ee_menu_group"  onclick="return false;">' . __('Settings', 'event_espresso') . '</span>', apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_general']), 'event_espresso', 'organization_config_mnu');

		//General Settings
		add_submenu_page('events', __('Event Espresso - General Settings', 'event_espresso'), __('General', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_general']), 'event_espresso', 'organization_config_mnu');


		//Calendar Settings
		if (function_exists('espresso_calendar_config_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Calendar Settings', 'event_espresso'), __('Calendar', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_calendar']), 'espresso_calendar', 'espresso_calendar_config_mnu');
		}

		//Facebook Event Integration Settings
		if (function_exists('espresso_fb_settings') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Facebook Settings', 'event_espresso'), __('Facebook', 'event_espresso'), 'administrator', 'espresso_facebook', 'espresso_fb_settings');
		}

		//MailChimp Integration Settings
		if (function_exists('event_espresso_mailchimp_settings') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - MailChimp Integration', 'event_espresso'), __('MailChimp', 'event_espresso'), 'administrator', 'espresso-mailchimp', 'event_espresso_mailchimp_settings');
		}

		//Member Settings
		if (function_exists('event_espresso_member_config_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Member Settings', 'event_espresso'), __('Members', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_members']), 'members', 'event_espresso_member_config_mnu');
		}

		//Payment Settings
		if (function_exists('event_espresso_gateways_options')) {
			add_submenu_page('events', __('Event Espresso - Payment Settings', 'event_espresso'), __('Payments', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_payment_gateways']), 'payment_gateways', 'event_espresso_gateways_options');
		}

		//Social Media Settings
		if (function_exists('espresso_social_config_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Social Media Settings', 'event_espresso'), __('Social Media', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_social']), 'espresso_social', 'espresso_social_config_mnu');
		}
		
		//SSL/HTTPS Settings
		if (function_exists('espresso_https_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - SSL/HTTPS Settings', 'event_espresso'), __('SSL/HTTPS', 'event_espresso'), 'administrator', 'espresso_https', 'espresso_https_mnu');
		}

		//Permissions
		if (function_exists('espresso_permissions_config_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Permissions Settings', 'event_espresso'), '<span class="ee_menu_group"  onclick="return false;">' . __('Permissions', 'event_espresso') . '</span>', 'administrator', 'espresso_permissions', 'espresso_permissions_config_mnu');

			//Permissions settings
			add_submenu_page('events', __('Event Espresso - Event Manager Permissions', 'event_espresso'), __('Settings', 'event_espresso'), 'administrator', 'espresso_permissions', 'espresso_permissions_config_mnu');
			add_submenu_page('events', __('Event Espresso - Event Manager Roles', 'event_espresso'), __('User Roles', 'event_espresso'), 'administrator', 'roles', 'espresso_permissions_roles_mnu');
			if ($org_options['use_venue_manager'] == 'Y' && function_exists('espresso_permissions_user_groups')) {
				if (espresso_member_data('role') == "administrator") {
					add_submenu_page('events', __('Event Espresso - Locales/Regions', 'event_espresso'), __('Locales/Regions', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_venue_manager']), 'event_locales', 'event_espresso_locale_config_mnu');
				}
				add_submenu_page('events', __('Event Espresso - Regional Managers', 'event_espresso'), __('Regional Managers', 'event_espresso'), 'administrator', 'event_groups', 'espresso_permissions_user_groups');
			}
		}
		do_action( 'action_hook_espresso_add_new_submenu_to_group_settings' );

		// ---------------------------------------
 
		//Templates GROUP
		add_submenu_page('events', __('Event Espresso - Template Settings', 'event_espresso'), '<span class="ee_menu_group"  onclick="return false;">' . __('Templates', 'event_espresso') . '</span>', 'administrator', 'template_confg', 'event_espresso_manage_templates');

		//Event styles & templates
		add_submenu_page('events', __('Event Espresso - Template Settings', 'event_espresso'), __('Settings', 'event_espresso'), 'administrator', 'template_confg', 'event_espresso_manage_templates');

		//Event Maps
		add_submenu_page('events', __('Event Espresso - Map Settings', 'event_espresso'), __('Maps', 'event_espresso'), 'administrator', 'template_map_confg', 'event_espresso_manage_maps');
		
		
		//Ticketing Settings
		if (function_exists('espresso_ticket_config_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Ticket Settings', 'event_espresso'), __('Tickets', 'event_espresso'), 'administrator', 'event_tickets', 'espresso_ticket_config_mnu');
		}

		//Certificate Settings
		if (function_exists('espresso_certificate_config_mnu') && $espresso_premium == true) {
			add_submenu_page('events', __('Event Espresso - Certificate Templates', 'event_espresso'), __('Certificates', 'event_espresso'), 'administrator', 'event_certificates', 'espresso_certificate_config_mnu');
		}
		do_action( 'action_hook_espresso_add_new_submenu_to_group_templates' );

		//Extras
		add_submenu_page('events', __('Event Espresso - Marketplace', 'event_espresso'), '<span class="ee_menu_group  onclick="return false;"" onclick="return false;">' . __('Extras', 'event_espresso') . '</span>', 'administrator', 'admin_addons', 'event_espresso_addons_mnu');
		
		//Adds any extra pages
		do_action( 'action_hook_espresso_extra_pages');

		//Marketplace
		add_submenu_page('events', __('Event Espresso - Marketplace', 'event_espresso'), __('Marketplace', 'event_espresso'), apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_addons']), 'admin_addons', 'event_espresso_addons_mnu');
		
		//Test Drive Pro
		if ($espresso_premium != true)
			add_submenu_page('events', __('Event Espresso - Test Drive Pro', 'event_espresso'), __('Test Drive Pro', 'event_espresso'), 'administrator', 'test_drive', 'event_espresso_test_drive');

		//Help/Support
		add_submenu_page('events', __('Event Espresso - Help/Support', 'event_espresso'), '<span style="color: red;">' . __('Help/Support', 'event_espresso') . '</span>', apply_filters( 'filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_support']), 'support', 'event_espresso_support');
		

		

	}

//End function add_event_espresso_menus()
}//End if (!function_exists('add_event_espresso_menus'))
add_action('admin_menu', 'add_event_espresso_menus');

//Example of adding an additional menu item to the "Extras" section of the menu.
/*function espresso_custom_reports_menu() {
	add_submenu_page('events', 'Espresso Custom Reports', 'Custom Reports', 'administrator', 'espresso_custom_reports', 'espresso_custom_reports');
}
add_action( 'action_hook_espresso_extra_pages', 'espresso_custom_reports_menu');*/
