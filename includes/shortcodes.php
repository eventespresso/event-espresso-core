<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

//These are the core shortcodes used by the plugin.
//If you would like to add your own shortcodes, please puchasse the custom shortcodes addon from http://eventespresso.com/download/plugins-and-addons/custom-files-addon/
//For a list and description of available shortcodes, please refer to http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/

/**
 * Single Event
 * Displays a single event
 *
 * [SINGLEEVENT single_event_id="your_event_identifier"]
 */
if (!function_exists('show_single_event')) {
	function show_single_event($atts) {
		extract(shortcode_atts(array('single_event_id' => __('No ID Supplied', 'event_espresso')), $atts));
		$single_event_id = "{$single_event_id}";
		global $load_espresso_scripts;
		$load_espresso_scripts = true; //This tells the plugin to load the required scripts
		//echo $single_event_id;
		ob_start();
		event_details_page($single_event_id);
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('SINGLEEVENT', 'show_single_event');






/**
 * Event Category
 * Displays a list of events by category
 * [EVENT_ESPRESSO_CATEGORY event_category_id="your_category_identifier"]
 */
if (!function_exists('show_event_category')) {
	function show_event_category($atts) {
		extract(shortcode_atts(array('event_category_id' => __('No Category ID Supplied', 'event_espresso'), 'css_class' => ''), $atts));
		$event_category_id = "{$event_category_id}";
		$css_class = "{$css_class}";
		global $load_espresso_scripts;
		$load_espresso_scripts = true; //This tells the plugin to load the required scripts
		ob_start();
		display_event_espresso_categories($event_category_id, $css_class); //This function is called from the "/templates/event_list.php" file.
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('EVENT_ESPRESSO_CATEGORY', 'show_event_category');





/**
 * List of Attendees
 * Displays a lsit of attendees
 * [LISTATTENDEES]
 * [LISTATTENDEES limit="30"]
 * [LISTATTENDEES show_expired="false"]
 * [LISTATTENDEES show_deleted="false"]
 * [LISTATTENDEES show_secondary="false"]
 * [LISTATTENDEES show_gravatar="true"]
 * [LISTATTENDEES paid_only="true"]
 * [LISTATTENDEES show_recurrence="false"]
 * [LISTATTENDEES event_identifier="your_event_identifier"]
 * [LISTATTENDEES category_identifier="your_category_identifier"]
 */
if (!function_exists('event_espresso_attendee_list')) {
	function event_espresso_attendee_list($event_identifier = 'NULL', $category_identifier = 'NULL', $show_gravatar = 'false', $show_expired = 'false', $show_secondary = 'false', $show_deleted = 'false', $show_recurrence = 'true', $limit = '0', $paid_only = 'false', $sort_by = 'last name') {
		$show_expired = $show_expired == 'false' ? " AND e.start_date >= '" . date('Y-m-d') . "' " : '';
		$show_secondary = $show_secondary == 'false' ? " AND e.event_status != 'S' " : '';
		$show_deleted = $show_deleted == 'false' ? " AND e.event_status != 'D' " : '';
		$show_recurrence = $show_recurrence == 'false' ? " AND e.recurrence_id = '0' " : '';
		$sort = $sort_by == 'last name' ? " ORDER BY lname " : '';
		$limit = $limit > 0 ? " LIMIT 0," . $limit . " " : '';
		if ($event_identifier != 'NULL') {
			$type = 'event';
		} else if ($category_identifier != 'NULL') {
			$type = 'category';
		}

		if (!empty($type) && $type == 'event') {
			$sql = "SELECT e.* FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= " WHERE e.is_active = true ";
			$sql .= " AND e.event_identifier = '" . $event_identifier . "' ";
			$sql .= $show_secondary;
			$sql .= $show_expired;
			$sql .= $show_deleted;
			$sql .= $show_recurrence;
			$sql .= $limit;
			event_espresso_show_attendess($sql, $show_gravatar, $paid_only, $sort);
		} else if (!empty($type) && $type == 'category') {
			$sql = "SELECT e.* FROM " . EVENTS_CATEGORY_TABLE . " c ";
			$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.cat_id = c.id ";
			$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id = r.event_id ";
			$sql .= " WHERE c.category_identifier = '" . $category_identifier . "' ";
			$sql .= " AND e.is_active = true ";
			$sql .= $show_secondary;
			$sql .= $show_expired;
			$sql .= $show_deleted;
			$sql .= $show_recurrence;
			$sql .= $limit;
			event_espresso_show_attendess($sql, $show_gravatar, $paid_only, $sort);
		} else {
			$sql = "SELECT e.* FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= " WHERE e.is_active=true ";
			$sql .= $show_secondary;
			$sql .= $show_expired;
			$sql .= $show_deleted;
			$sql .= $show_recurrence;
			$sql .= $limit;
			event_espresso_show_attendess($sql, $show_gravatar, $paid_only, $sort);
		}
	}
}





if (!function_exists('event_espresso_list_attendees')) {
	function event_espresso_list_attendees($atts) {
		//echo $atts;
		extract(shortcode_atts(array('event_identifier' => 'NULL', 'category_identifier' => 'NULL', 'event_category_id' => 'NULL', 'show_gravatar' => 'NULL', 'show_expired' => 'NULL', 'show_secondary' => 'NULL', 'show_deleted' => 'NULL', 'show_recurrence' => 'NULL', 'limit' => 'NULL', 'paid_only' => 'NULL'), $atts));
		global $load_espresso_scripts;
		$load_espresso_scripts = true; //This tells the plugin to load the required scripts
		//get the event identifiers
		$event_identifier = "{$event_identifier}";

		$show_gravatar = "{$show_gravatar}";

		//get the category identifiers
		$category_identifier = "{$category_identifier}";
		$event_category_id = "{$event_category_id}";
		$category_identifier = ($event_category_id != 'NULL') ? $event_category_id : $category_identifier;

		//Get the extra parameters
		$show_expired = "{$show_expired}";
		$show_secondary = "{$show_secondary}";
		$show_deleted = "{$show_deleted}";
		$show_recurrence = "{$show_recurrence}";
		$paid_only = "{$paid_only}";

		ob_start();
		event_espresso_attendee_list($event_identifier, $category_identifier, $show_gravatar, $show_expired, $show_secondary, $show_deleted, $show_recurrence, $limit, $paid_only);
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('LISTATTENDEES', 'event_espresso_list_attendees');





/**
 * Event Times
 * Returns the times for an event. Sucha s start and end times, registration start and end times, etc.
 * Please refer to http://php.net/manual/en/function.date.php for date formats
 */
if (!function_exists('espresso_event_time_sc')) {
	function espresso_event_time_sc($atts) {
		extract(shortcode_atts(array('event_id' => '0', 'type' => '', 'format' => ''), $atts));
		$event_id = "{$event_id}";
		$type = "{$type}";
		$format = "{$format}";
		return espresso_event_time($event_id, $type, $format);
	}
}
add_shortcode('EVENT_TIME', 'espresso_event_time_sc');





/**
 * Registration Page
 * Returns the registration page for an event
 */
if (!function_exists('espresso_reg_page_sc')) {
	function espresso_reg_page_sc($atts) {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $load_espresso_scripts;
		$load_espresso_scripts = true; //This tells the plugin to load the required scripts
		extract(shortcode_atts(array('event_id' => '0'), $atts));
		$event_id = "{$event_id}";
		return event_details_page(NULL, $event_id);
	}
}
add_shortcode('ESPRESSO_REG_PAGE', 'espresso_reg_page_sc');




if (!function_exists('espresso_reg_form_sc')) {
	function espresso_reg_form_sc($atts) {

		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $load_espresso_scripts;
		$load_espresso_scripts = true; //This tells the plugin to load the required scripts
		extract(shortcode_atts(array('event_id' => '0'), $atts));
		$event_id = "{$event_id}";

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
		$currency_format = $org_options['currency_format'];

		$message = $org_options['message'];
		$use_captcha = $org_options['use_captcha'];
		$paypal_id = $org_options['paypal_id'];

		$sql = "SELECT * FROM " . EVENTS_DETAIL_TABLE;
		$sql.= " WHERE is_active=true ";
		$sql.= " AND event_status != 'D' ";
		$sql.= " AND id = '" . $event_id . "' LIMIT 0,1";

		if ($wpdb->get_results($sql)) {
			$events = $wpdb->get_results($sql);
			//These are the variables that can be used throughout the regsitration page
			foreach ($events as $event) {
				$event_id = $event->id;
				$event_name = stripslashes_deep($event->event_name);
				$event_desc = stripslashes_deep($event->event_desc);
				$display_desc = $event->display_desc;
				$display_reg_form = $event->display_reg_form;
				$event_address = $event->address;
				$event_address2 = $event->address2;
				$event_city = $event->city;
				$event_state = $event->state;
				$event_zip = $event->zip;
				$event_country = $event->country;
				$event_description = stripslashes_deep($event->event_desc);
				$event_identifier = $event->event_identifier;
				$event_cost = $event->event_cost;
				$member_only = $event->member_only;
				$reg_limit = $event->reg_limit;
				$allow_multiple = $event->allow_multiple;
				$start_date = $event->start_date;
				$end_date = $event->end_date;
				$allow_overflow = $event->allow_overflow;
				$overflow_event_id = $event->overflow_event_id;

				$virtual_url = stripslashes_deep($event->virtual_url);
				$virtual_phone = stripslashes_deep($event->virtual_phone);

				//Venue information
				if ($org_options['use_venue_manager']) {
					$event_address = $event->venue_address;
					$event_address2 = $event->venue_address2;
					$event_city = $vent->venue_city;
					$event_state = $event->venue_state;
					$event_zip = $event->venue_zip;
					$event_country = $event->venue_country;
				}
				//var_dump($events);
				//Address formatting
				$location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');

				//Google map link creation
				$google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country, 'text' => 'Map and Directions', 'type' => 'text'));

				$reg_start_date = $event->registration_start;
				$reg_end_date = $event->registration_end;
				$today = date("Y-m-d");

				$reg_limit = $event->reg_limit;
				$additional_limit = $event->additional_limit;


				$question_groups = unserialize($event->question_groups);

				global $all_meta;
				$all_meta = array(
						'event_name' => stripslashes_deep($event_name),
						'event_desc' => stripslashes_deep($event_desc),
						'event_address' => $event_address,
						'event_address2' => $event_address2,
						'event_city' => $event_city,
						'event_state' => $event_state,
						'event_zip' => $event_zip,
						'is_active' => $event->is_active,
						'event_status' => $event->event_status,
						'start_time' => $event->start_time,
						'registration_startT' => $event->registration_startT,
						'registration_start' => $event->registration_start,
						'registration_endT' => $event->registration_endT,
						'registration_end' => $event->registration_end,
						'is_active' => $is_active,
						'event_country' => $event_country,
						'start_date' => event_date_display($start_date, get_option('date_format')),
						'end_date' => event_date_display($end_date, get_option('date_format')),
						'time' => $event->start_time,
						'google_map_link' => $google_map_link,
						'price' => $event->event_cost,
						'event_cost' => $event->event_cost,
				);

				//This function gets the status of the event.
				$is_active = array();
				$is_active = event_espresso_get_is_active(0, $all_meta);

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
		}

	//This is the registration form.
	//This is a template file for displaying a registration form for an event on a page.
	//There should be a copy of this file in your wp-content/uploads/espresso/ folder.
		?>
		<div id="event_espresso_registration_form" class="event-display-boxes ui-widget">
			<h2 class="event_title ui-widget-header ui-corner-top" id="event_title-<?php echo $event_id; ?>"> <?php echo $event_name ?> <?php echo $is_active['status'] == 'EXPIRED' ? ' - <span class="expired_event">Event Expired</span>' : ''; ?> <?php echo $is_active['status'] == 'PENDING' ? ' - <span class="expired_event">Event is Pending</span>' : ''; ?> <?php echo $is_active['status'] == 'DRAFT' ? ' - <span class="expired_event">Event is a Draft</span>' : ''; ?> </h2>
			<div class="event_espresso_form_wrapper event-data-display ui-widget-content ui-corner-bottom">
				<form method="post" action="<?php echo espresso_get_reg_page_full_url(); ?>" id="registration_form">
					<?php

					switch ($is_active['status']) {
						case 'EXPIRED': //only show the event description.
							echo '<h3 class="expired_event">' . __('This event has passed.</h3>', 'event_espresso') . '</h3>';
							break;

						case 'REGISTRATION_CLOSED': //only show the event description.
							// if todays date is after $reg_end_date
							?>
							<div class="event-registration-closed event-messages ui-corner-all ui-state-highlight">
								<span class="ui-icon ui-icon-alert"></span>
								<p class="event_full">
									<strong>
										<?php _e('We are sorry but registration for this event is now closed.', 'event_espresso'); ?>
									</strong>
								</p>
								<p class="event_full">
									<strong>
										<?php _e('Please <a href="contact" title="contact us">contact us</a> if you would like to know if spaces are still available.', 'event_espresso'); ?>
									</strong>
								</p>
							</div>
							<?php
							break;

						case 'REGISTRATION_NOT_OPEN': //only show the event description.
							// if todays date is after $reg_end_date
							// if todays date is prior to $reg_start_date
							?>
							<div class="event-registration-pending event-messages ui-corner-all ui-state-highlight">
								<span class="ui-icon ui-icon-alert"></span>
								<p class="event_full">
									<strong>
										<?php _e('We are sorry but this event is not yet open for registration.', 'event_espresso'); ?>
									</strong>
								</p>
								<p class="event_full">
									<strong>
										<?php
										_e('You will be able to register starting ', 'event_espresso');
										echo event_espresso_no_format_date($reg_start_date, 'F d, Y');
										?>
									</strong>
								</p>
							</div>
							<?php
							break;

						default:
							//This will display the registration form
							//If the event is in an active or ongoing status, then show the registration form.
							// Display the address and google map link if available
							if ($location != '' && (!empty($org_options['template_settings']['display_address_in_regform']) || $org_options['template_settings']['display_address_in_regform'])) {
								?>
								<p class="event_address" id="event_address-<?php echo $event_id ?>"><span class="section-title"><?php echo __('Address:', 'event_espresso'); ?></span> <br />
									<span class="address-block"> <?php echo stripslashes_deep($location); ?><br />
										<span class="google-map-link"><?php echo $google_map_link; ?></span>
									</span>
								</p>
								<?php
							}

							if ($show_ee_gmap_no_shortcode && $event_meta['enable_for_gmap']) {
								echo ee_gmap_display($ee_gmap_location, $event_id);
							}

							//Meta example
							//echo do_shortcode('[EE_META type="event_meta" name="test_meta"]');
							?>
							<p class="start_date">
								<?php if ($end_date !== $start_date) { ?>
									<span class="section-title">
										<?php _e('Start Date: ', 'event_espresso'); ?>
									</span>
								<?php } else { ?>
									<span class="section-title">
										<?php _e('Date: ', 'event_espresso'); ?>
									</span>
									<?php
								}
								echo event_date_display($start_date, get_option('date_format'));

								if ($end_date !== $start_date) {
									echo '<br />';
									?>
									<span class="section-title">
										<?php _e('End Date: ', 'event_espresso'); ?>
									</span> <?php
						echo event_date_display($end_date, get_option('date_format'));
					}
									?>
							</p>

							<?php
							/*
							 * * This section shows the registration form if it is an active event * *
							 */
							//echo $is_active['status'];//Show event status
							if ($display_reg_form) {
								?>
								<p class="event_time">
									<?php
									//This block of code is used to display the times of an event in either a dropdown or text format.
									if (isset($time_selected) && $time_selected == true) {//If the customer is coming from a page where the time was preselected.
										echo event_espresso_display_selected_time($time_id); //Optional parameters start, end, default
									} else {
										echo event_espresso_time_dropdown($event_id);
									}//End time selected
									?>
								</p>

								<?php
								//Show pricing in a dropdown or text depending on the number of prices added.
								do_action('action_hook_espresso_price_select', $event_id, array('show_label' => true, 'label' => ''));

								//Added for seating chart addon. Creates a field to select a seat from a popup.
								do_action('action_hook_espresso_seating_chart_select', $event_id);

								// Displays the social media buttons
								if (function_exists('espresso_show_social_media')) {
									?>
									<div class="ee-social-media-buttons">
										<span class="twitter-button"><?php echo espresso_show_social_media($event_id, 'twitter'); ?></span>
										<span class="facebook-button"><?php echo espresso_show_social_media($event_id, 'facebook'); ?></span>
										<span class="stumbleupon-button"><?php echo espresso_show_social_media($event_id, 'stumbleupon'); ?></span>
										<div class="google-button"><?php echo espresso_show_social_media($event_id, 'google'); ?></div>
									</div>
									<?php
								}

								//Outputs the custom form questions. This function can be overridden using the custom files addon
								?>
								<fieldset id="event-reg-form-groups" class="ui-widget">
									<!--<h3 class="section-heading ui-widget-header">
									<?php _e('Registration Details', 'event_espresso'); ?>
									</h3>-->
									<?php
									echo event_espresso_add_question_groups($question_groups, '', null, 0, array('attendee_number' => 1));
									?>
								</fieldset>
								<?php
								//Multiple Attendees
								if ($allow_multiple && $number_available_spaces > 1) {
									//This returns the additional attendee form fields. Can be overridden in the custom files addon.
									echo event_espresso_additional_attendees($event_id, $additional_limit, $number_available_spaces, __('Number of Tickets', 'event_espresso'), true, $event_meta);
								} else {
									?>
									<input type="hidden" name="num_people" id="num_people-<?php echo $event_id; ?>" value="1">
									<?php
								}//End allow multiple
								//Coupons
								if (function_exists('event_espresso_coupon_registration_page' && $use_coupon_code)) {
									echo event_espresso_coupon_registration_page($use_coupon_code, $event_id);
								}//End coupons display
								//Groupons
								if (function_exists('event_espresso_groupon_registration_page')) {
									echo event_espresso_groupon_registration_page($use_groupon_code, $event_id);
								}//End groupons display
								?>
								<input type="hidden" name="num_people" id="num_people-<?php echo $event_id; ?>" value="1">


								<!--<input type="hidden" name="e_reg" id="e_reg-<?php echo $event_id; ?>" value="post_attendee">-->
								<input type="hidden" name="event_id" id="event_id-<?php echo $event_id; ?>" value="<?php echo $event_id; ?>">

								<?php
								//Recaptcha portion
								if ($org_options['use_captcha']
												&& (empty($_REQUEST['edit_details']) || $_REQUEST['edit_details'] != 'true')
												&& !is_user_logged_in()) {
									if (!function_exists('recaptcha_get_html')) {
										require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/recaptchalib.php');
									}//End require captcha library
									# the response from reCAPTCHA
									$resp = null;
									# the error code from reCAPTCHA, if any
									$error = null;
									?>

									<p class="event_form_field" id="captcha-<?php echo $event_id; ?>">
										<?php _e('Anti-Spam Measure: Please enter the following phrase', 'event_espresso'); ?>
										<?php echo recaptcha_get_html($org_options['recaptcha_publickey'], $error, is_ssl() ? true : false); ?>
									</p>
								<?php } //End use captcha     ?>

								<p class="event_form_submit" id="event_form_submit-<?php echo $event_id; ?>">

									<input class="btn_event_form_submit ui-priority-primary ui-state-default ui-widget-content ui-corner-all" id="event_form_field-<?php echo $event_id; ?>" type="submit" name="Submit" value="<?php _e('Submit', 'event_espresso'); ?>">
								</p>
								<?php
							}
							break;
					}//End Switch statement to check the status of the event
					?>
				</form>
			</div><!-- /  #event_espresso_form_wrapper -->
		</div>
		<?php
	}
}
add_shortcode('ESPRESSO_REG_FORM', 'espresso_reg_form_sc');





/**
 * Category Name
 * Returns an array of category data based on an event id
 */
if (!function_exists('espresso_category_name_sc')) {
	function espresso_category_name_sc($atts) {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		extract(shortcode_atts(array('event_id' => '0'), $atts));
		$event_id = "{$event_id}";
		$category_name = espresso_event_category_data($event_id);
		return $category_name['category_name'];
	}
}
add_shortcode('CATEGORY_NAME', 'espresso_category_name_sc');





/**
 * Price Dropdown
 * Returns a price dropdown if multiple prices are associated with an event, based on an event id
 */
if (!function_exists('espresso_price_dd_sc')) {
	function espresso_price_dd_sc($atts) {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		extract(shortcode_atts(array('event_id' => '0'), $atts));
		$event_id = "{$event_id}";
		$data = event_espresso_price_dropdown($event_id);
		return $data['category_name'];
	}
}
add_shortcode('EVENT_PRICE_DROPDOWN', 'espresso_price_dd_sc');





/**
 * Event Price
 * Returns a price for a single event, based on an event id
 */
if (!function_exists('get_espresso_price_sc')) {
	function get_espresso_price_sc($atts) {
		extract(shortcode_atts(array('event_id' => '0', 'number' => '0'), $atts));
		$event_id = "{$event_id}";
		$number = "{$number}";

		return espresso_return_single_price($event_id, $number);
	}
}
add_shortcode('EVENT_PRICE', 'get_espresso_price_sc');





/**
 * Returns the number of attendees, registration limits, etc based on an event id
 */
if (!function_exists('espresso_attendees_data_sc')) {
	function espresso_attendees_data_sc($atts) {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		extract(shortcode_atts(array('event_id' => '0', 'type' => ''), $atts));
		$event_id = "{$event_id}";
		$type = "{$type}";
		$data = get_number_of_attendees_reg_limit($event_id, $type);
		return $data;
	}
}
add_shortcode('ATTENDEE_NUMBERS', 'espresso_attendees_data_sc');





/**
 * Event List
 * Returns a list of events
 * [EVENT_LIST]
 * [EVENT_LIST limit=1]
 * [EVENT_LIST css_class=my-custom-class]
 * [EVENT_LIST show_expired=true]
 * [EVENT_LIST show_deleted=true]
 * [EVENT_LIST show_secondary=true]
 * [EVENT_LIST show_recurrence=true]
 * [EVENT_LIST category_identifier=your_category_identifier]
 *
 */
if (!function_exists('display_event_list_sc')) {
	function display_event_list_sc($atts) {
		ob_start();
		event_espresso_get_event_details( $atts );
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('EVENT_LIST', 'display_event_list_sc');





//function espresso_session_id_sc() {
//	return event_espresso_session_id();
//}
//add_shortcode('SESSION_ID', 'espresso_session_id_sc');





/**
  Staff Details shortcode
  http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#staff_shortcode

  Example:
  [ESPRESSO_STAFF outside_wrapper="div" outside_wrapper_class="event_staff" inside_wrapper="p" inside_wrapper_class="event_person"]

  Parameters:
  id (The id of the staff member. The daefault is auto loaded of from the event.)
  outside_wrapper_class
  outside_wrapper
  inside_wrapper_class
  inside_wrapper
  name_class
  name_wrapper
  image_class
  show_image (true|false default true)
  show_staff_titles (true|false default true)
  show_staff_roles (true|false default true)
  show_staff_details (true|false default true)
  show_image (true|false default true)
  show_description (true|false default true)
 * */
if (!function_exists('espresso_staff_sc')) {
	function espresso_staff_sc($atts) {

		global $wpdb, $espresso_premium, $this_event_id;
		if ($espresso_premium != true)
			return;

		empty($atts) ? '' : extract($atts);

		//Outside wrapper
		$outside_wrapper_class = isset($outside_wrapper_class) ? 'class="' . $outside_wrapper_class . '"' : 'class="event_staff"';
		$wrapper_start = isset($outside_wrapper) ? '<' . $outside_wrapper . ' ' . $outside_wrapper_class : '<div ' . $outside_wrapper_class;
		$wrapper_end = isset($outside_wrapper) ? '</' . $outside_wrapper . '>' : '</div>';

		//Persons title
		$name_class = isset($name_class) ? 'class="' . $name_class . '"' : 'class="person_name"';
		$name_wrapper_start = isset($name_wrapper) ? '<' . $name_wrapper . ' ' . $name_class . '>' : '<strong ' . $name_class . '>';
		$name_wrapper_end = isset($name_wrapper) ? '</' . $name_wrapper . '>' : '</strong>';

		//Image class
		$image_class = isset($image_class) ? 'class="' . $image_class . '"' : 'class="staff_image"';
		$image_wrapper_class = isset($image_wrapper_class) ? 'class="' . $image_wrapper_class . '"' : 'class="image_wrapper"';
		$image_wrapper_start = isset($image_wrapper) ? '<' . $image_wrapper . ' ' . $image_wrapper_class : '<p ' . $image_wrapper_class . '>';
		$image_wrapper_end = isset($image_wrapper) ? '</' . $image_wrapper . '>' : '</p>';

		//Inside wrappers
		$inside_wrapper_class = isset($inside_wrapper_class) ? 'class="' . $inside_wrapper_class . '"' : 'class="event_person"';
		$inside_wrapper_before = isset($inside_wrapper) ? '<' . $inside_wrapper . ' ' . $inside_wrapper_class . '>' : '<p ' . $inside_wrapper_class . '>';
		$inside_wrapper_after = isset($inside_wrapper) ? '</' . $inside_wrapper . '>' : '</p>';

		//Show the persons title?
		$show_staff_titles = isset($show_staff_titles) && $show_staff_titles == 'false' ? false : true;

		//Show the persons role?
		$show_staff_roles = isset($show_staff_roles) && $show_staff_roles == 'false' ? false : true;

		//Show the persons details?
		$show_staff_details = isset($show_staff_details) && $show_staff_details == 'false' ? false : true;

		//Show image?
		$show_image = (isset($show_image) && $show_image == 'false') ? false : true;

		//Show the description?
		$show_description = (isset($show_description) && $show_description == 'false') ? false : true;

		//Find the event id
		if (isset($event_id)) {
			$event_id = $event_id; //Check to see if the event is used in the shortcode parameter
		} elseif (isset($this_event_id)) {
			$event_id = $this_event_id; //Check to see if the global event id is being used
		} elseif (isset($_REQUEST['event_id'])) {
			$event_id = $_REQUEST['event_id']; //If the first two are not being used, then get the event id from the url
		} elseif (!isset($event_id) && !isset($id)) {
			//_e('No event or staff id supplied!', 'event_espresso') ;
			return;
		}
		$limit = (isset($limit) && $limit > 0) ? " LIMIT 0," . $limit . " " : '';
		$sql = "SELECT s.id, s.name, s.role, s.meta ";
		$sql .= " FROM " . EVENTS_PERSONNEL_TABLE . ' s ';
		if (isset($id) && $id > 0) {
			$sql .= " WHERE s.id ='" . $id . "' ";
		} else {
			$sql .= " JOIN " . EVENTS_PERSONNEL_REL_TABLE . " r ON r.person_id = s.id ";
			$sql .= " WHERE r.event_id ='" . $event_id . "' ";
		}
		$sql .= $limit;
		//echo $sql;
		$event_personnel = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		$html = '';
		if ($num_rows > 0) {
			foreach ($event_personnel as $person) {
				$person_id = $person->id;
				$person_name = $person->name;
				$person_role = $person->role;

				$meta = unserialize($person->meta);

				$html .= $wrapper_start . ' id="person_id_' . $person_id . '">';

				//Build the persons name/title
				$html .= $inside_wrapper_before;
				if ($show_staff_roles != false) {
					$person_title = $person_role != '' ? ' - ' . stripslashes_deep($person_role) : '';
				}
				$html .= $name_wrapper_start . stripslashes_deep($person_name) . $name_wrapper_end . $person_title;
				$html .= $inside_wrapper_after;

				//Build the image
				if ($show_image != false) {
					$html .= $meta['image'] != '' ? $image_wrapper_start . '<img id="staff_image_' . $person_id . '" ' . $image_class . ' src="' . stripslashes_deep($meta['image']) . '" />' . $image_wrapper_end : '';
				}

				//Build the description
				if ($show_description != false) {
					$html .= $meta['description'] != '' ? html_entity_decode(stripslashes_deep($meta['description'])) : '';
				}

				//Build the additional details
				if ($show_staff_details != false) {
					$html .= $inside_wrapper_before;
					$html .= isset($meta['organization']) ? __('Company:', 'event_espresso') . ' ' . stripslashes_deep($meta['organization']) . '<br />' : '';
					if ($show_staff_titles != false) {
						$html .= isset($meta['title']) ? __('Title:', 'event_espresso') . ' ' . stripslashes_deep($meta['title']) . '<br />' : '';
					}
					$html .= isset($meta['industry']) ? __('Industry:', 'event_espresso') . ' ' . stripslashes_deep($meta['industry']) . '<br />' : '';
					$html .= isset($meta['city']) ? __('City:', 'event_espresso') . ' ' . stripslashes_deep($meta['city']) . '<br />' : '';
					$html .= isset($meta['country']) ? __('Country:', 'event_espresso') . ' ' . stripslashes_deep($meta['country']) . '<br />' : '';
					$html .= isset($meta['website']) ? __('Website:', 'event_espresso') . ' <a href="' . stripslashes_deep($meta['website']) . '" target="_blank">' . stripslashes_deep($meta['website']) . '</a><br />' : '';
					$html .= isset($meta['twitter']) ? __('Twitter:', 'event_espresso') . ' <a href="http://twitter.com/#!/' . stripslashes_deep($meta['twitter']) . '" target="_blank">@' . stripslashes_deep($meta['twitter']) . '</a><br />' : '';
					$html .= isset($meta['phone']) ? __('Phone:', 'event_espresso') . ' ' . stripslashes_deep($meta['phone']) . '<br />' : '';
					$html .= $inside_wrapper_after;
				}


				$html .= $wrapper_end;
			}
		}

		ob_start();
		echo wpautop($html);
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('ESPRESSO_STAFF', 'espresso_staff_sc');





/**
  Venue Details Shortcode
  http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#venue_shortcode

  Example:
  [ESPRESSO_VENUE outside_wrapper="div" outside_wrapper_class="event_venue"]

  Parameters:
  outside_wrapper
  outside_wrapper_class
  title_wrapper
  title_class
  inside_wrapper
  inside_wrapper_class
  image_class
  show_google_map_link (true|false default true)
  map_link_text
  show_map_image (true|false default true)
  map_image_wrapper
  map_image_class
  map_w (map image width default 400)
  map_h (map image height default 400)
  show_title (true|false default true)
  show_image (true|false default true)
  show_description (true|false default true)
  show_address (true|false default true)
  show_additional_details (true|false default true)
 * */
if (!function_exists('espresso_venue_details_sc')) {
	function espresso_venue_details_sc($atts) {

		global $wpdb, $this_event_id, $espresso_premium, $espresso_reg_page;

		empty($atts) ? '' : extract($atts);

		//Outside wrapper
		$outside_wrapper_class = isset($outside_wrapper_class) ? 'class="' . $outside_wrapper_class . '"' : 'class="event_venue"';
		$wrapper_start = isset($outside_wrapper) ? '<' . $outside_wrapper . ' ' . $outside_wrapper_class : '<div ' . $outside_wrapper_class;
		$wrapper_end = isset($outside_wrapper) ? '</' . $outside_wrapper . '>' : '</div>';

		//Image class
		$image_class = isset($image_class) ? 'class="' . $image_class . '"' : 'class="venue_image"';
		$image_wrapper_class = isset($image_wrapper_class) ? 'class="' . $image_wrapper_class . '"' : 'class="image_wrapper"';
		$image_wrapper_start = isset($image_wrapper) ? '<' . $image_wrapper . ' ' . $image_wrapper_class : '<p ' . $image_wrapper_class . '>';
		$image_wrapper_end = isset($image_wrapper) ? '</' . $image_wrapper . '>' : '</p>';

		//Venue title
		$title_class = isset($title_class) ? 'class="' . $title_class . '"' : 'class="venue_name section-title"';
		$title_wrapper_start = isset($title_wrapper) ? '<' . $title_wrapper . ' ' . $title_class : '<span ' . $title_class;
		$title_wrapper_end = isset($title_wrapper) ? '</' . $title_wrapper . '>' : '</span>';

		//Inside wrappers
		$inside_wrapper_class = isset($inside_wrapper_class) ? 'class="' . $inside_wrapper_class . '"' : 'class="venue_details"';
		$inside_wrapper_before = isset($inside_wrapper) ? '<' . $inside_wrapper . ' ' . $inside_wrapper_class . '>' : '<p ' . $inside_wrapper_class . '>';
		$inside_wrapper_after = isset($inside_wrapper) ? '</' . $inside_wrapper . '>' : '</p>';

		//Map image class
		/* $map_image_class = isset($map_image_class) ? 'class="'.$map_image_class.'"' : 'class="venue_map_image"';
		  $map_image_wrapper_class = isset($map_image_wrapper_class) ? 'class="'.$map_image_wrapper_class.'"' : 'class="map_image_wrapper"';
		  $map_image_wrapper_start  = isset($map_image_wrapper) ? '<'.$map_image_wrapper.' '.$map_image_wrapper_class: '<p '.$map_image_wrapper_class.'>';
		  $map_image_wrapper_end = isset($map_image_wrapper) ? '</'.$map_image_wrapper.'>' : '</p>'; */

		//Google Map link text
		$show_google_map_link = (isset($show_google_map_link) && $show_google_map_link == 'false') ? false : true;
		$map_link_text = isset($map_link_text) ? $map_link_text : __('Map and Directions', 'event_espresso');

		//Show Google map image?
		$show_map_image = (isset($show_map_image) && $show_map_image == 'false') ? false : true;

		//Show title?
		$show_title = (isset($show_title) && $show_title == 'false') ? false : true;

		//Show image?
		$show_image = (isset($show_image) && $show_image == 'false') ? false : true;

		//Show the description?
		$show_description = (isset($show_description) && $show_description == 'false') ? false : true;

		//Show address details?
		$show_address = (isset($show_address) && $show_address == 'false') ? false : true;

		//Show additional details
		$show_additional_details = (isset($show_additional_details) && $show_additional_details == 'false') ? false : true;

		$FROM = " FROM ";
		$order_by = (isset($order_by) && $order_by != '') ? " ORDER BY " . $order_by . " ASC " : " ORDER BY name ASC ";

		$limit = isset( $limit ) ? $limit : 0;
		$limit = $limit > 0 ? " LIMIT 0," . $limit . " " : '';

		$using_id = false;
		//Find the event id
		if (isset($id) && $id > 0) {

		} elseif (isset($event_id)) {
			$event_id = $event_id; //Check to see if the event is used in the shortcode parameter
			$using_id = true;
		} elseif (isset($this_event_id)) {
			$event_id = $this_event_id; //Check to see if the global event id is being used
			$using_id = true;
		} elseif (isset($_REQUEST['event_id'])) {
			$event_id = $_REQUEST['event_id']; //If the first two are not being used, then get the event id from the url
			$using_id = true;
		}

		$sql = "SELECT ev.* ";

		if ($using_id == true) {
			$sql .= " $FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON e.id = vr.event_id ";
			$FROM = " LEFT JOIN ";
		}

		$sql .= " $FROM " . EVENTS_VENUE_TABLE . " ev ";

		if ($using_id == true) {
			$sql .= " ON vr.venue_id = ev.id ";
		}

		if (isset($id) && $id > 0) {
			$sql .= " WHERE ev.id = '" . $id . "' ";
		} elseif (isset($event_id) && $event_id > 0) {
			$sql .= " WHERE e.id ='" . $event_id . "' ";
		} else {
			$sql .= " GROUP BY ev.name ";
		}

		if ($using_id == false) {
			$sql .= $order_by;
			$sql .= $limit;
		}
		//echo $sql ;

		$venues = $wpdb->get_results($sql);

		$num_rows = $wpdb->num_rows;
		if ($num_rows > 0) {
			$html = '';
			foreach ($venues as $venue) {
				$venue_id = $venue->id;
				$meta = unserialize($venue->meta);

				//Google map link creation
				$google_map_link = espresso_google_map_link(array('address' => $venue->address, 'city' => $venue->city, 'state' => $venue->state, 'zip' => $venue->zip, 'country' => $venue->country, 'text' => $map_link_text, 'type' => 'text'));

				//Google map image creation
				//if ($show_map_image != false){
				//	$map_w = isset($map_w) ? $map_w : 400;
				//	$map_h = isset($map_h) ? $map_h : 400;
				//	$google_map_image = espresso_google_map_link(array('id'=>$venue_id, 'map_image_class'=>$map_image_class, 'address' => $venue->address, 'city' => $venue->city, 'state' => $venue->state, 'zip' => $venue->zip, 'country' => $venue->country, 'text' => $map_link_text, 'type' => 'map', 'map_h'=>$map_h, 'map_w'=>$map_w));
				//Build the venue title
				if ($show_title != false) {
					$html .= $venue->name != '' ? $title_wrapper_start . '>' . stripslashes_deep($venue->name) . $title_wrapper_end : '';
				}

				//Build the venue image
				if ($show_image != false) {
					$html .= $meta['image'] != '' ? $image_wrapper_start . '<img id="venue_image_' . $venue_id . '" ' . $image_class . ' src="' . stripslashes_deep($meta['image']) . '" />' . $image_wrapper_end : '';
				}

				//Build the description
				if ($show_description != false) {
					$html .= $meta['description'] != '' ? espresso_format_content($meta['description']) : '';
				}

				//Build the address details
				if ($show_address != false) {
					$html .= $inside_wrapper_before;
					$html .= $venue->address != '' ? stripslashes_deep($venue->address) . '<br />' : '';
					$html .= $venue->address2 != '' ? stripslashes_deep($venue->address2) . '<br />' : '';
					$html .= $venue->city != '' ? stripslashes_deep($venue->city) . '<br />' : '';
					$html .= $venue->state != '' ? stripslashes_deep($venue->state) . '<br />' : '';
					$html .= $venue->zip != '' ? stripslashes_deep($venue->zip) . '<br />' : '';
					$html .= $venue->country != '' ? stripslashes_deep($venue->country) . '<br />' : '';

					$html .= $inside_wrapper_after;
				}

				$html .= $show_google_map_link ? '<div class="google-remote-map-link">' . $google_map_link . '</div>' : '';
				//$html .= var_dump($meta);
				//If the premium version is installed, then we can laod the map.
				if ($espresso_premium) {
					if (!empty($meta['enable_for_maps'])) {
						//Adding this check to make sure we are on a registration page. Otherwise it will break regular posts/pages that are loading the [ESPRESSO_VENUE] shortcode.
						if ($espresso_reg_page) {
							$venue_address_elements = ($venue->address != '' ? $venue->address . ',' : '') . ($venue->city != '' ? $venue->city . ',' : '') . ($venue->state != '' ? $venue->state . ',' : '') . ($venue->zip != '' ? $venue->zip . ',' : '') . ($venue->country != '' ? $venue->country . ',' : '');
							$ee_gmap_location = $venue_address_elements;
							$html .= ee_gmap_display($ee_gmap_location, $event_id);
						}
					}
				}

				//Build the additional details
				if ($show_additional_details != false) {
					$html .= $inside_wrapper_before;
					$html .= $meta['website'] != '' ? __('Website:', 'event_espresso') . ' <a href="' . stripslashes_deep($meta['website']) . '" target="_blank">' . stripslashes_deep($meta['website']) . '</a><br />' : '';
					$html .= $meta['contact'] != '' ? __('Contact:', 'event_espresso') . ' ' . stripslashes_deep($meta['contact']) . '<br />' : '';
					$html .= $meta['phone'] != '' ? __('Phone:', 'event_espresso') . ' ' . stripslashes_deep($meta['phone']) . '<br />' : '';
					$html .= $meta['twitter'] != '' ? __('Twitter:', 'event_espresso') . ' <a href="http://twitter.com/#!/' . stripslashes_deep($meta['twitter']) . '" target="_blank">@' . stripslashes_deep($meta['twitter']) . '</a><br />' : '';
					$html .= $inside_wrapper_after;
				}

				//Build the venue image
				/* if ($show_map_image != false){
				  $html .= $map_image_wrapper_start.$google_map_image.$map_image_wrapper_end;
				  } */
			}
		}
		//ob_start();
		return $wrapper_start . ' id="venue_id_' . $venue_id . '">' . $html . $wrapper_end;
		//$buffer = ob_get_contents();
		//ob_end_clean();
		//return $buffer;
	}
}
add_shortcode('ESPRESSO_VENUE', 'espresso_venue_details_sc');




if (!function_exists('espresso_venue_event_list_sc')) {
	function espresso_venue_event_list_sc($atts) {
		global $wpdb;
		global $load_espresso_scripts;
		$load_espresso_scripts = true; //This tells the plugin to load the required scripts
		if (empty($atts))
			return 'No venue id supplied!';
		extract($atts);
		$order_by = (isset($order_by) && $order_by != '') ? " ORDER BY " . $order_by . " ASC " : " ORDER BY name, id ASC ";

		$limit = isset( $limit ) ? $limit : 0;
		$limit = $limit > 0 ? " LIMIT 0," . $limit . " " : '';

		if (isset($id) && $id > 0) {
			$sql = "SELECT e.*, ev.name venue_name, ese.start_time, ese.end_time, p.event_cost ";
			$sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON e.id = vr.event_id ";
			$sql .= " LEFT JOIN " . EVENTS_VENUE_TABLE . " ev ON vr.venue_id = ev.id  ";
			$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
			$sql .= " LEFT JOIN " . EVENTS_PRICES_TABLE . " p ON p.event_id=e.id ";
			$sql .= " WHERE e.event_status != 'D' AND e.is_active = true AND ev.id = '" . $id . "' ";

			$sql .= $order_by;
			$sql .= $limit;
			//echo $sql;

			$wpdb->get_results($sql);
			$num_rows = $wpdb->num_rows;
			if ($num_rows > 0) {

				$name_before = isset($name_before) ? $name_before : '<p class="venue_name">';
				$name_after = isset($name_after) ? $name_after : '</p>';

				$venue_name = $wpdb->last_result[0]->venue_name;

				//template located in event_list_dsiplay.php
				ob_start();
				//echo $sql;
				echo $name_before . $venue_name . $name_after;
				event_espresso_get_event_details($sql, $css_class);
				$buffer = ob_get_contents();
				ob_end_clean();
				return $buffer;
			} else {
				return 'No events in this venue';
			}
		}
	}
}
add_shortcode('ESPRESSO_VENUE_EVENTS', 'espresso_venue_event_list_sc');




if (!function_exists('ee_show_meta_sc')) {
	function ee_show_meta_sc($atts) {
		global $event_meta, $venue_meta, $all_meta;
		//echo '<p>event_meta = '.print_r($event_meta).'</p>';
		if (empty($atts))
			return;

		extract($atts);

		if (!isset($name))
			return;

		switch ($type) {

			case 'venue':
			case 'venue_meta':
			default:
				return ee_show_meta($venue_meta, $name);

			case 'event':
			case 'event_meta':
				return ee_show_meta($event_meta, $name);

			case 'all':
			case 'all_meta':
			default:
				return ee_show_meta($all_meta, $name);
		}
	}
}
add_shortcode('EE_META', 'ee_show_meta_Sc');




if (!function_exists('espresso_questions_answers')) {
	function espresso_questions_answers($atts) {
		global $wpdb;
		if (empty($atts))
			return;

		extract($atts);
		//echo '<p>'.print_r($atts).'</p>';

		$sql = "select qst.question as question, ans.answer as answer from " . EVENTS_ANSWER_TABLE . " ans inner join " . EVENTS_QUESTION_TABLE . " qst on ans.question_id = qst.id where ans.attendee_id = '" . $a . "' AND qst.id= '" . $q . "' ";
		//echo '<p>'.$sql.'</p>';
		//Get the questions and answers
		$questions = $wpdb->get_results($sql, ARRAY_A);
		//echo '<p>'.print_r($questions).'</p>';

		if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->question != NULL) {
			foreach ($questions as $q) {
				//$k = $q['question'];
				$v = $q['answer'];
				return rtrim($v, ',');
			}
		}
	}
}
add_shortcode('EE_ANSWER', 'espresso_questions_answers');





function event_espresso_run() {

	// grab some globals
	global $wpdb, $org_options, $load_espresso_scripts;

	$message = "\nREQUEST variables:\n";
	foreach ($_REQUEST as $key => $value) {
		$message .= $key . " = " . $value . "\n";
	}
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $message);

	// tell the plugin to load the required scripts
	$load_espresso_scripts = true;

	// begin output buffering
	ob_start();

	//Make sure scripts are loading
	echo espresso_check_scripts();

	// Get action type
	$e_reg = isset($_REQUEST['e_reg']) ? $_REQUEST['e_reg'] : '';

	switch ($e_reg) {

		case 'process_ticket_selections' :
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/ticket_selector.php');
			process_ticket_selections();
			break;

		case 'register' :
			remove_all_actions('action_hook_espresso_regevent_default_action');
			remove_all_actions('action_hook_espresso_event_registration');
			do_action('action_hook_espresso_event_reg_checkout');
			break;

		case 'edit_attendee' :
			remove_all_actions('action_hook_espresso_regevent_default_action');
			remove_all_actions('action_hook_espresso_event_registration');
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/process-registration/attendee_edit_record.php');
			attendee_edit_record();
			break;


		default :
			// check if this is an event list or an event detail page by looking for event slug
			$event_detail_page = get_query_var('event_slug') ? TRUE : FALSE;

			if ( $event_detail_page or isset($_REQUEST['ee']) ) {
				do_action ( 'action_hook_espresso_event_registration' );
				//This is the form page for registering the attendee
				require_once(espresso_get_registration_page_template());
			} else {
				do_action ( 'action_hook_espresso_regevent_default_action', $e_reg );
				//These may be loaded in posts and pages outside of the default EE pages
				require_once(espresso_get_event_list_template());
			}

	}

	$content = ob_get_contents();
	ob_end_clean();
	return $content;

}
add_shortcode('ESPRESSO_EVENTS', 'event_espresso_run');





function espresso_cancelled() {
	global $org_options;
	$_REQUEST['page_id'] = $org_options['return_url'];
	//espresso_init_session();
}
add_shortcode('ESPRESSO_CANCELLED', 'espresso_cancelled');