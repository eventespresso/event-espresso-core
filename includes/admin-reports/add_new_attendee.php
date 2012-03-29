<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function add_new_attendee($event_id) {
	if (isset($_REQUEST['e_reg_admin']) && $_REQUEST['e_reg_admin'] == 'post_attendee') {
		$attendee_id = event_espresso_add_attendees_to_db();
		// SEND CONFIRMATION EMAIL MESSAGES
		event_espresso_email_confirmations(array('attendee_id' => $attendee_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
		//echo $attendee_id;
		?>
		<div id="message" class="updated fade">
		  <p><strong>
		<?php _e('Added Attendee to Database', 'event_espresso'); ?>
				</strong></p>
		</div>
		<?php
	}
	wp_register_script('reCopy', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/reCopy.js"), false, '1.1.0');
	wp_print_scripts('reCopy');

	global $wpdb;
	$sql = "SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE is_active='Y' AND event_status != 'D' AND id = '" . $event_id . "' LIMIT 0,1";

	//Build the registration page
	if ($wpdb->get_results($sql)) {
		$events = $wpdb->get_results($sql);
		//These are the variables that can be used throughout the regsitration page
		foreach ($events as $event) {
			$event_id = $event->id;
			$event_name = stripslashes($event->event_name);
			$event_desc = stripslashes($event->event_desc);
			$display_desc = $event->display_desc;
			$event_address = $event->address;
			$event_city = $event->city;
			$event_state = $event->state;
			$event_zip = $event->zip;
			$event_description = stripslashes($event->event_desc);
			$event_identifier = $event->event_identifier;
			$event_cost = isset($event->event_cost) ? $event->event_cost : '';
			$member_only = isset($event->member_only) ? $event->member_only : '';
			$reg_limit = isset($event->reg_limit) ? $event->reg_limit : '';
			$allow_multiple = $event->allow_multiple;
			$start_date = $event->start_date;
			$end_date = $event->end_date;
			$reg_limit = $event->reg_limit;
			$additional_limit = $event->additional_limit;
			$is_active = array();
			$question_groups = unserialize($event->question_groups);
			//This function gets the status of the event.
			$is_active = event_espresso_get_is_active($event_id);

			//If the coupon code system is intalled then use it
			if (function_exists('event_espresso_coupon_registration_page')) {
				$use_coupon_code = $event->use_coupon_code;
			}

			//If the groupon code addon is installed, then use it
			if (function_exists('event_espresso_groupon_payment_page')) {
				$use_groupon_code = $event->use_groupon_code;
			}

			//Set a default value for additional limit
			if ($additional_limit == '') {
				$additional_limit = '5';
			}
		}//End foreach ($events as $event)
		//This is the start of the registration form. This is where you can start editing your display.
		$num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees'); //Get the number of attendees
		$available_spaces = get_number_of_attendees_reg_limit($event_id, 'available_spaces'); //Gets a count of the available spaces
		$number_available_spaces = get_number_of_attendees_reg_limit($event_id, 'number_available_spaces'); //Gets the number of available spaces
		?>
		<script type="text/javascript">
			jQuery(document).ready(function() {
				jQuery(function(){
					//Registration form validation
					jQuery('#registration_form').validate();

				});
			});

		</script>
		<div class="metabox-holder">
		  <div class="postbox">
				<div id="event_espressotration_form">

					<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>" onsubmit="return validateForm(this)"  id="registration_form">
						<h3 class="h3_event_title" id="h3_event_title-<?php echo $event_id; ?>"><?php echo $event_name ?></h3>
						<div  class="padding">
							<p class="start_date">
								<?php _e('Start Date:', 'event_espresso'); ?>
								<?php echo event_date_display($start_date) ?></p>
							<p class="event_time">
								<?php
								$time_selected = '';
								//This block of code is used to display the times of an event in either a dropdown or text format.
								if (!empty($time_selected) && $time_selected == true) {//If the customer is coming from a page where the time was preselected.
									echo event_espresso_display_selected_time($time_id); //Optional parameters start, end, default
								} else if ($time_selected == false) {
									echo event_espresso_time_dropdown($event_id);
								}//End time selected
								?>
							</p>

							<?php
							//Show pricing in a dropdown or text
							do_action('action_hook_espresso_price_select', $event_id);

							//Added for seating chart addon.  Creates a field to select a seat from a popup.
							do_action('action_hook_espresso_seating_chart_select', $event_id);
							?>
							<?php
							echo event_espresso_add_question_groups($question_groups);

							//Coupons
							if (function_exists('event_espresso_coupon_registration_page' && $use_coupon_code == 'Y')) {
								echo event_espresso_coupon_registration_page($use_coupon_code, $event_id);
							}//End coupons display
							//Groupons
							if (function_exists('event_espresso_groupon_registration_page')) {
								echo event_espresso_groupon_registration_page($use_groupon_code, $event_id);
							}//End groupons display
							?>
							<p class="event_form_field">
								<label for="event_cost">
							<?php _e('Amount Paid:', 'event_espresso'); ?>
								</label>
								<input tabindex="9" type="text" maxlength="10" size="15" name="a_event_cost" id="a_event_cost-<?php echo $event_id; ?>" <?php echo $event_cost ? 'value="' . $event_cost . '"' : ""; ?> />
								<label for="admin_price_override">
									<?php _e('Override Price Selected Above?', 'event_espresso'); ?>
								</label>
								<input name="admin_price_override" type="checkbox" value="1" />
								<input type="hidden" name="e_reg_admin" id="e_reg-<?php echo $event_id; ?>" value="post_attendee" />
								<input type="hidden" name="event_id" id="event_id-<?php echo $event_id; ?>" value="<?php echo $event_id; ?>" />
								<input type="hidden" name="admin" value="true" />
							</p>
							<p class="event_form_submit" id="event_form_submit-<?php echo $event_id; ?>">
								<input class="btn_event_form_submit" id="event_form_field-<?php echo $event_id; ?>" type="submit" name="Submit" value="<?php _e('Submit', 'event_espresso'); ?>" />
							</p>
		<?php
		//Multiple Attendees
		if ($allow_multiple == "Y" && $number_available_spaces > 1) {
			//This returns the additional attendee form fields. Can be overridden in the custom files addon.
			echo event_espresso_additional_attendees($event_id, $additional_limit, $number_available_spaces, __('Number of Tickets', 'event_espresso'), true);
		} else {
			?>
								<input type="hidden" name="num_people" id="num_people-<?php echo $event_id; ?>" value="1">
								<?php
							}//End allow multiple
							?>
							</form>
						</div>
				</div>
		  </div>
							<?php
							event_list_attendees();
						}//End Build the registration page
					}

