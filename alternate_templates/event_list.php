<?php

//This is a template file for displaying a list of events on a page. These functions are used with the [ESPRESSO_EVENTS] shortcode.
//This is an group of functions for querying all of the events in your databse.
//This file should be stored in your "/wp-content/uploads/espresso/templates/" directory.
//Note: All of these functions can be overridden using the "Custom Files" addon. The custom files addon also contains sample code to display ongoing events

global $org_options;
do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

if (!function_exists('display_all_events')) {


	function display_all_events($display_recurrence_event = true) {
		global $org_options, $wpdb;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$use_venue_manager = isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y';
		$sql = "SELECT e.id FROM " . EVENTS_DETAIL_TABLE . " e ";
		$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id=e.id ";
		$sql .= " WHERE e.is_active = 'Y' ";
		$sql .= $display_recurrence_event == false ? " AND e.recurrence_id = '0' " : '';
		$sql .= " AND e.event_status != 'D' ";
		$sql .= " ORDER BY date(e.start_date), time(ese.start_time), e.id";
		$event_ids = $wpdb->get_col($sql);
		foreach ($event_ids as $event_id) {
			$events[] = new Event($event_id['id']);
		}
		event_espresso_get_event_details($events); //This function is located below
	}

}

if (!function_exists('display_event_espresso_categories')) {

	function display_event_espresso_categories($event_category_id="null", $css_class=NULL) {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		if ($event_category_id != "null") {

			$display_recurrence_event = true; //If set to true, the event page will display recurring events.

			$sql = "SELECT e.*, c.category_name, c.category_desc, c.display_desc, c.category_identifier, ese.start_time, ese.end_time, p.event_cost  ";
			isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= ", v.name venue_name, v.address venue_address, v.address2 venue_address2, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
			$sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
			$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
			$sql .= " JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
			$sql .= " JOIN " . EVENTS_PRICES_TABLE . " p ON p.event_id=e.id ";
			isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
			$sql .= " WHERE c.category_identifier = '" . $event_category_id . "' ";
			$sql .= $display_recurrence_event == false ? " AND e.recurrence_id = '0' " : '';
			$sql .= " AND e.event_status != 'D' ";
			$sql .= " GROUP BY e.id  ORDER BY date(start_date), time(start_time), id";
			event_espresso_get_event_details($sql, $css_class); //This function is located below
		}
	}

}

//Events Listing - Shows the events on your page.
if (!function_exists('event_espresso_get_event_details')) {

	function event_espresso_get_event_details($events, $css_class=NULL, $allow_override=0) {

		global $wpdb, $org_options, $events_in_session, $ee_gmaps_opts;

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$multi_reg = false;

		if (function_exists('event_espresso_multi_reg_init')) {
			$multi_reg = true;
		}

		$event_page_id = $org_options['event_page_id'];

		foreach ($events as $event) {

			$status = $event->get_status();
			$event_id = $event->get_id();
			$categories = $event->get_categories();
			$category_identifier = '';
			foreach ($categories as $category) {
				$category_identifier .= $category['category_identifier'];
			}
			$event_name = $event->get_event_name();
			$registration_url = $event->get_registration_url();
			$prices = $event->get_prices();
			$start_date = $event->get_start_date();
			$location = $event->get_location();
			$display_reg_form = $event->is_display_reg_form();
			$externalURL = $event->get_externalURL();
			$status_display = ' - ' . $status['display_custom'];
			$status_display_ongoing = $status['status'] == 'ONGOING' ? ' - ' . $status['display_custom'] : '';
			$status_display_deleted = $status['status'] == 'DELETED' ? ' - ' . $status['display_custom'] : '';
			$status_display_secondary = $status['status'] == 'SECONDARY' ? ' - ' . $status['display_custom'] : ''; //Waitlist event
			$status_display_draft = $status['status'] == 'DRAFT' ? ' - ' . $status['display_custom'] : '';
			$status_display_pending = $status['status'] == 'PENDING' ? ' - ' . $status['display_custom'] : '';
			$status_display_denied = $status['status'] == 'DENIED' ? ' - ' . $status['display_custom'] : '';
			$status_display_expired = $status['status'] == 'EXPIRED' ? ' - ' . $status['display_custom'] : '';
			$status_display_reg_closed = $status['status'] == 'REGISTRATION_CLOSED' ? ' - ' . $status['display_custom'] : '';
			$status_display_not_open = $status['status'] == 'REGISTRATION_NOT_OPEN' ? ' - ' . $status['display_custom'] : '';
			$status_display_open = $status['status'] == 'REGISTRATION_OPEN' ? ' - ' . $status['display_custom'] : '';
			$status_display_custom_closed = $status['status'] == 'REGISTRATION_CLOSED' ? ' - <span class="espresso_closed">' . __('Regsitration is Closed', 'event_espresso') . '</span>' : '';

			if (! is_user_logged_in() && get_option('events_members_active') == 'true' && $event->is_member_only() == 'Y') {
				//Display a message if the user is not logged in.
				//_e('Member Only Event. Please ','event_espresso') . event_espresso_user_login_link() . '.';

			} else {

				if ($allow_override == 1) {

					include('event_list_display.php');

				} else {

					switch ($event->get_active_state()) {

						case 'NOT_ACTIVE':
							//Uncomment the following line to show events that are not active and the active status array
							//include('event_list_display.php');
						break;

						case 'PENDING':
							if (current_user_can('administrator') || function_exists('espresso_member_data') && espresso_can_view_event($event_id) == true) {
								echo '<div class="pending_event">';
								include('event_list_display.php');
								echo '</div>';
							}
						break;

						default:
							include('event_list_display.php');
						break;

					}
				}
			}
		}
		espresso_registration_footer();
	}

}
