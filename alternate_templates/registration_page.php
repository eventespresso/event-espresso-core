<?php
//As of version 3.0.17
//This is a logic file for displaying a registration form for an event on a page. This file will do all of the backend data retrieval functions.
//There should be a copy of this file in your wp-content/uploads/espresso/ folder.
//Note: This entire function can be overridden using the "Custom Files" addon
function register_attendees($single_event_id = NULL, $event_id_sc =0) {
		if ((isset($_REQUEST['form_action']) && $_REQUEST['form_action'] == 'edit_attendee') || (isset($_REQUEST['edit_attendee']) && $_REQUEST['edit_attendee'] == 'true')) {
			require_once (EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/process-registration/attendee_edit_record.php');
			attendee_edit_record();
			return;
		}
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		if (isset($_REQUEST['ee']) && $_REQUEST['ee'] != '') {
			$_REQUEST['event_id'] = $_REQUEST['ee'];
		}

		$event_id = $event_id_sc != '0' ? $event_id_sc : ($_REQUEST['event_id']);

		if (!empty($_REQUEST['event_id_time'])) {
			$pieces = explode('|', $_REQUEST['event_id_time'], 3);
			$event_id = $pieces[0];
			$start_time = $pieces[1];
			$time_id = $pieces[2];
			$time_selected = true;
		}

//The following variables are used to get information about your organization
		$event_page_id = $org_options['event_page_id'];
		$Organization = stripslashes_deep($org_options['organization']);
		$Organization_street1 = $org_options['organization_street1'];
		$Organization_street2 = $org_options['organization_street2'];
		$Organization_city = $org_options['organization_city'];
		$Organization_state = $org_options['organization_state'];
		$Organization_zip = $org_options['organization_zip'];
		$contact = $org_options['contact_email'];
		$registrar = $org_options['contact_email'];
		$currency_format = isset($org_options['currency_format']) ? $org_options['currency_format'] : '';

		$message = $org_options['message'];

		if (!empty($org_options['map_settings']['ee_display_map_no_shortcodes']) && $org_options['map_settings']['ee_display_map_no_shortcodes'] == 'Y') {
			$show_ee_gmap_no_shortcode = true;
		} else {
			$show_ee_gmap_no_shortcode = false;
		}

		$sql = "SELECT id FROM " . EVENTS_DETAIL_TABLE;
		$sql.= " WHERE is_active='Y' AND event_status != 'D' ";
		if ($single_event_id != NULL) {
			$sql .= " AND event_identifier = '" . $single_event_id . "' LIMIT 0,1";
		} else {
			$sql.= " AND id = '" . $event_id . "' LIMIT 0,1";
		}

		//Support for diarise
		if (!empty($_REQUEST['post_event_id'])) {
			$sql = "SELECT e.id FROM " . EVENTS_DETAIL_TABLE . ' e';
			$sql .= " WHERE post_id = '" . $_REQUEST['post_event_id'] . "' ";
			$sql .= " LIMIT 0,1";
		}

		$event_id = $wpdb->get_var($sql);
		if (!empty($event_id)) {
			$event = new Event($event_id);
			$num_attendees = $event->get_number_of_attendees();
			$event_name = $event->get_event_name();
			$is_active = $event->get_status();
			$display_desc = $event->is_display_desc();
			$event_desc = $event->get_event_desc();
			$location = $event->get_location();
			$start_date = $event->get_start_date();
			$end_date = $event->get_end_date();
			$question_groups = $event->get_question_groups();
			$allow_multiple = $event->is_allow_multiple();
			$number_available_spaces = $event->get_number_of_available_spaces();
			$event_thumbnail_url = $event->get_event_thumbnail_url();
			$use_coupon_code = $event->is_use_coupon_code();
			$use_groupon_code = $event->is_use_groupon_code();
			$questions = $event->get_questions();

			if ($org_options['use_captcha'] == 'Y'
							&& (empty($_REQUEST['edit_details']) || $_REQUEST['edit_details'] != 'true')
							&& !is_user_logged_in()) {
				?>
				<script type="text/javascript">
					var RecaptchaOptions = {
						theme : '<?php echo $org_options['recaptcha_theme'] == '' ? 'red' : $org_options['recaptcha_theme']; ?>',
						lang : '<?php echo $org_options['recaptcha_language'] == '' ? 'en' : $org_options['recaptcha_language']; ?>'
					};
				</script>
				<?php
			}
//This is the start of the registration form. This is where you can start editing your display.
//(Shows the regsitration form if enough spaces exist)
			if ($num_attendees >= $event->get_reg_limit()) {
				?>
				<div class="espresso_event_full event-display-boxes" id="espresso_event_full-<?php echo $event_id; ?>">
					<h3 class="event_title"><?php echo stripslashes_deep($event_name) ?></h3>
					<div class="event-messages">
						<p class="event_full"><strong><?php _e('We are sorry but this event has reached the maximum number of attendees!', 'event_espresso'); ?></strong></p>
						<p class="event_full"><strong><?php _e('Please check back in the event someone cancels.', 'event_espresso'); ?></strong></p>
						<p class="num_attendees"><?php _e('Current Number of Attendees:', 'event_espresso'); ?> <?php echo $num_attendees ?></p>
					</div>
					<?php
					if ($allow_overflow == 'Y' && $overflow_event_id != 0) {
						?>
						<p id="register_link-<?php echo $overflow_event_id ?>" class="register-link-footer"><a class="a_register_link" id="a_register_link-<?php echo $overflow_event_id ?>" href="<?php echo espresso_reg_url($overflow_event_id); ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Join Waiting List', 'event_espresso'); ?></a></p>
					<?php } ?>
				</div>

				<?php
			} else {
//If enough spaces exist then show the form
//Check to see if the Members plugin is installed.
				if (!is_user_logged_in() && get_option('events_members_active') == 'true' && $event->is_member_only() == 'Y') {
					event_espresso_user_login();
				} else {
//Serve up the registration form
//As of version 3.0.17 the registration details have been moved to registration_form.php
					require ('registration_page_display.php');
				}
			}//End if ($num_attendees >= $reg_limit) (Shows the regsitration form if enough spaces exist)
		} else {//If there are no results from the query, display this message
			echo '<h3>' . __('This event has expired or is no longer available.', 'event_espresso') . '</h3>';
		}

		echo espresso_registration_footer();

//Check to see how many database queries were performed
		//echo '<p>Database Queries: ' . get_num_queries() .'</p>';
	}

add_action('action_hook_espresso_regevent_register_attendees', 'register_attendees');