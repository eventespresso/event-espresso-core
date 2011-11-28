<?php

// Adds an Event or Function to the Event Database
function add_event_to_db($recurrence_arr = array()) {
	// echo "<pre>";
	//print_r($_POST);
	//echo "</pre>";

	global $wpdb, $org_options, $espresso_wp_user, $espresso_premium;

if( check_admin_referer('espresso_form_check', 'ee_add_new_event') ) {

$wpdb->show_errors();

	static $recurrence_id;

	if (get_option('event_espresso_re_active') == 1) {
		require_once(EVENT_ESPRESSO_RECURRENCE_FULL_PATH . "functions/re_functions.php");
		$recurrence_id = array_key_exists('recurrence_id', $recurrence_arr) ? $recurrence_arr['recurrence_id'] : Null;
		if ($_POST['recurrence'] == 'Y' && count($recurrence_arr) < 2) {

			if (is_null($recurrence_id))
				$recurrence_id = add_recurrence_master_record();

			$re_params = array(
					'start_date' => ($_POST['recurrence_type'] == 'a') ? $_POST['recurrence_start_date'] : $_POST['recurrence_manual_dates'],
					'event_end_date' => ($_POST['recurrence_type'] == 'a') ? $_POST['recurrence_event_end_date'] : $_POST['recurrence_manual_end_dates'],
					'end_date' => ($_POST['recurrence_type'] == 'a') ? $_POST['recurrence_end_date'] : $_POST['end_date'],
					'registration_start' => $_POST['recurrence_regis_start_date'],
					'registration_end' => $_POST['recurrence_regis_end_date'],
					'frequency' => $_POST['recurrence_frequency'],
					'interval' => $_POST['recurrence_interval'],
					'type' => $_POST['recurrence_type'],
					'weekdays' => $_POST['recurrence_weekday'],
					'repeat_by' => $_POST['recurrence_repeat_by'],
					'recurrence_regis_date_increment' => $_POST['recurrence_regis_date_increment'],
					'recurrence_manual_dates' => $_POST['recurrence_manual_dates'],
					'recurrence_manual_end_dates' => $_POST['recurrence_manual_end_dates'],
					'recurrence_visibility' => $_POST['recurrence_visibility'],
					'recurrence_id' => $recurrence_id,
					'adding_to_db' => 'Y'
			);

			$recurrence_dates = ($_POST['recurrence_type'] == 'm') ? find_recurrence_manual_dates($re_params) : find_recurrence_dates($re_params);
		}
	}

//echo_f('re array', $recurrence_dates);


	if (defined('EVENT_ESPRESSO_RECURRENCE_MODULE_ACTIVE') && $_POST['recurrence'] == 'Y' && count($recurrence_arr) == 0) {
//skip the first insert because we do not have the start dates
	} else {
		$event_meta = array(); //will be used to hold event meta data
		//If the Espresso Facebook Events is installed, add the event to Facebook
		//$fb = new FacebookEvents();
		//echo $fb->espresso_createevent();
		//echo $_POST['event'];
		$wp_user_id = empty($_REQUEST['wp_user']) ? $espresso_wp_user : $_REQUEST['wp_user'][0];
		if ($wp_user_id == 0){
			$wp_user_id = 1;
		}
		$event_name = $_REQUEST['event'];
		$event_code = uniqid($espresso_wp_user . '-');
		$event_identifier = ($_REQUEST['event_identifier'] == '') ? $event_identifier = sanitize_title_with_dashes($event_name . '-' . $event_code) : $event_identifier = sanitize_title_with_dashes($_REQUEST['event_identifier']) . $event_code;
		$event_desc = $_REQUEST['event_desc'];
		$display_desc = $_REQUEST['display_desc'];
		$display_reg_form = $_REQUEST['display_reg_form'];

		$address = empty($_REQUEST['address']) ? '' : esc_html($_REQUEST['address']);
		$address2 = empty($_REQUEST['address2']) ? '' : esc_html($_REQUEST['address2']);
		$city = empty($_REQUEST['city']) ? '' : esc_html($_REQUEST['city']);
		$state = empty($_REQUEST['state']) ? '' : esc_html($_REQUEST['state']);
		$zip = empty($_REQUEST['zip']) ? '' : esc_html($_REQUEST['zip']);
		$country = empty($_REQUEST['country']) ? '' : esc_html($_REQUEST['country']);
		$phone = esc_html($_REQUEST['phone']);
		$externalURL = esc_html($_REQUEST['externalURL']);

		$post_type = $_REQUEST['post_type'];

		// thumbnail image options
		$event_meta['event_thumbnail_url'] = $_REQUEST['upload_image'];
		$event_meta['display_thumb_in_lists'] = $_REQUEST['show_thumb_in_lists'];
		$event_meta['display_thumb_in_regpage'] = $_REQUEST['show_thumb_in_regpage'];
		if (function_exists('espresso_calendar_config_mnu') && $espresso_premium == true) {
			$event_meta['display_thumb_in_calendar'] = $_REQUEST['show_on_calendar'];
		}

		// enable event address for Gmaps
		if(!empty($_REQUEST['venue_id'][0]) || !empty($_REQUEST['zip']) || !empty($_REQUEST['city']) || !empty($_REQUEST['state'])){
		  $event_meta['enable_for_gmap'] = $_REQUEST['enable_for_gmap'];
		}else{
		  $event_meta['enable_for_gmap'] = 'N';
		}

		//$event_location = $address . ' ' . $city . ', ' . $state . ' ' . $zip;
		$event_location = ($address != '' ? $address . ' ' : '') . ($address2 != '' ? '<br />' . $address2 : '') . ($city != '' ? '<br />' . $city : '') . ($state != '' ? ', ' . $state : '') . ($zip != '' ? '<br />' . $zip : '') . ($country != '' ? '<br />' . $country : '');
		$reg_limit = $_REQUEST['reg_limit'];
		$allow_multiple = $_REQUEST['allow_multiple'];
		$additional_limit = $_REQUEST['additional_limit'];
		$member_only = isset($_REQUEST['member_only']) ? $_REQUEST['member_only'] : '';
		$is_active = $_REQUEST['is_active'];
		$event_status = $_REQUEST['event_status'];
		$ticket_id = empty($_REQUEST['ticket_id']) ? '' : $_REQUEST['ticket_id'];
		$certificate_id = empty($_REQUEST['certificate_id']) ? '' : $_REQUEST['certificate_id'];

		//Get the first instance of the start and end times
		$start_time = $_REQUEST['start_time'][0];
		$end_time = $_REQUEST['end_time'][0];

		// Add registration times
		$registration_startT = event_date_display($_REQUEST['registration_startT'], 'H:i');
		$registration_endT = event_date_display($_REQUEST['registration_endT'], 'H:i');

		// Add Timezone
		$timezone_string = isset($_REQUEST['timezone_string']) ? $_REQUEST['timezone_string'] : '';

		//Early discounts
		$early_disc = $_REQUEST['early_disc'];
		$early_disc_date = $_REQUEST['early_disc_date'];
		$early_disc_percentage = $_REQUEST['early_disc_percentage'];

		$conf_mail = $_REQUEST['conf_mail'];

		$use_coupon_code = $_REQUEST['use_coupon_code'];
		$alt_email = $_REQUEST['alt_email'];
		$send_mail = $_REQUEST['send_mail'];
		$email_id = isset($_REQUEST['email_name']) ? $_REQUEST['email_name'] : '';

		//Venue Information
		$venue_title = empty($_REQUEST['venue_title']) ? '' : $_REQUEST['venue_title'];
		$venue_url = empty($_REQUEST['venue_url']) ? '' : $_REQUEST['venue_url'];
		$venue_phone = empty($_REQUEST['venue_phone']) ? '' : $_REQUEST['venue_phone'];
		$venue_image = empty($_REQUEST['venue_image']) ? '' : $_REQUEST['venue_image'];

		//Virtual location
		$virtual_url = $_REQUEST['virtual_url'];
		$virtual_phone = $_REQUEST['virtual_phone'];

		$registration_start = array_key_exists('registration_start', $recurrence_arr) ? $recurrence_arr['registration_start'] : $_REQUEST['registration_start'];
		$registration_end = array_key_exists('registration_end', $recurrence_arr) ? $recurrence_arr['registration_end'] : $_REQUEST['registration_end'];

		//Check which start/end date to use.  Will be determined by recurring events addon, if installed.
		if (array_key_exists('recurrence_start_date', $recurrence_arr)) {
			//Recurring event
			$start_date = $recurrence_arr['recurrence_start_date'];
		} elseif ($_REQUEST['start_date'] == '' && $_REQUEST['recurrence_start_date'] != '') {
			//If they leave the Event Start Date empty, the First Event Date in the recurrence module is selected
			$start_date = $_REQUEST['recurrence_start_date'];
		} elseif (isset($_POST['recurrence']) && $_POST['recurrence'] == 'Y' && $_REQUEST['start_date'] == '') {
			$start_date = $_REQUEST['recurrence_manual_dates'][0];
		} else {
			$start_date = $_REQUEST['start_date'];
		}

		if (array_key_exists('recurrence_event_end_date', $recurrence_arr)) {
			//Recurring event
			$end_date = $recurrence_arr['recurrence_event_end_date'];
		} elseif ($_REQUEST['end_date'] == '' && $_REQUEST['recurrence_event_end_date'] != '') {
			//If they leave the Event Start Date empty, the First Event Date in the recurrence module is selected
			$end_date = $_REQUEST['recurrence_event_end_date'];
		} elseif (isset($_POST['recurrence']) && $_POST['recurrence'] == 'Y' && $_REQUEST['end_date'] == '') {
			$end_date = $_REQUEST['recurrence_manual_end_dates'][count($_REQUEST['recurrence_manual_end_dates']) - 1];
		} else {
			$end_date = $_REQUEST['end_date'];
		}

		if (array_key_exists('visible_on', $recurrence_arr)) {
			//Recurring event
			$visible_on = $recurrence_arr['visible_on'];
		} elseif (isset($_REQUEST['visible_on']) && $_REQUEST['visible_on'] != '') {
			$visible_on = $_REQUEST['visible_on'];
		} elseif (isset($_REQUEST['visible_on']) && $_REQUEST['visible_on'] == '' && count($recurrence_dates) > 0) {
			$visible_on = $recurrence_dates[$start_date]['visible_on'];
		} else
			$visible_on = date("Y-m-d");

		if ($reg_limit == '') {
			$reg_limit = 999;
		}

		$question_groups = empty($_REQUEST['question_groups']) ? '' : serialize($_REQUEST['question_groups']);
		$add_attendee_question_groups = empty($_REQUEST['add_attendee_question_groups']) ? '' : serialize($_REQUEST['add_attendee_question_groups']);

		$event_meta['venue_id'] = isset($_REQUEST['venue_id']) ? $_REQUEST['venue_id'][0] : '';
		$event_meta['additional_attendee_reg_info'] = $_REQUEST['additional_attendee_reg_info'];
		$event_meta['add_attendee_question_groups'] = $add_attendee_question_groups;
		$event_meta['date_submitted'] = date("Y-m-d H:i:s");
		$event_meta['originally_submitted_by'] = $espresso_wp_user;
		$event_meta['default_payment_status'] = $_REQUEST['default_payment_status'];

		if ($_REQUEST['emeta'] != '') {
			foreach ($_REQUEST['emeta'] as $k => $v) {
				$event_meta[$v] = strlen(trim($_REQUEST['emetad'][$k])) > 0 ? $_REQUEST['emetad'][$k] : '';
			}
		}
		//echo strlen(trim($_REQUEST['emetad'][$k]));
		//print_r($_REQUEST['emeta'] );

		$event_meta = serialize($event_meta);

		############ Added by wp-developers ######################
		$require_pre_approval = 0;
		if (isset($_REQUEST['require_pre_approval'])) {
			$require_pre_approval = $_REQUEST['require_pre_approval'];
		}

		################# END #################
		//When adding colums to the following arrays, be sure both arrays have equal values.
		$sql = array(
			'event_code' => $event_code,
			'event_name' => $event_name,
			'event_desc' => $event_desc,
			'display_desc' => $display_desc,
			'display_reg_form' => $display_reg_form,
			'event_identifier' => $event_identifier,
			'address' => $address,
			'address2' => $address2,
			'city' => $city,
			'state' => $state,
			'zip' => $zip,
			'country' => $country,
			'phone' => $phone,
			'virtual_url' => $virtual_url,
			'virtual_phone' => $virtual_phone,
			'venue_title' => $venue_title,
			'venue_url' => $venue_url,
			'venue_phone' => $venue_phone,
			'venue_image' => $venue_image,
			'registration_start' => $registration_start,
			'registration_end' => $registration_end,
			'start_date' => $start_date,
			'end_date' => $end_date,
			'allow_multiple' => $allow_multiple,
			'send_mail' => $send_mail,
			'is_active' => $is_active,
			'event_status' => $event_status,
			'conf_mail' => $conf_mail,
			'use_coupon_code' => $use_coupon_code,
			'member_only' => $member_only,
			'externalURL' => $externalURL,
			'early_disc' => $early_disc,
			'early_disc_date' => $early_disc_date,
			'early_disc_percentage' => $early_disc_percentage,
			'alt_email' => $alt_email,
			'question_groups' => $question_groups,
			'registration_startT' => $registration_startT,
			'registration_endT' => $registration_endT,
			'reg_limit' => $reg_limit,
			'additional_limit' => $additional_limit,
			'recurrence_id' => $recurrence_id,
			'email_id' => $email_id,
			'wp_user' => $wp_user_id,
			'event_meta' => $event_meta,
			'require_pre_approval' => $require_pre_approval,
			'timezone_string' => $timezone_string,
			'submitted' => date('Y-m-d H:i:s', time()),
			'ticket_id' => $ticket_id,
			'certificate_id' => $certificate_id
		);

		$sql_data = array(
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%d','%d',
			'%d','%d','%d','%s',
			'%s','%s','%s','%d',
			'%d'
		);

		/* echo 'Debug:<br />';
		  print 'Number of vars: ' . count ($sql);
		  echo '<br />';
		  print 'Number of cols: ' . count($sql_data);
		  echo "<pre>".print_r( $sql,true )."</pre>"; */


		//Add groupon reference if installed
		if (function_exists('event_espresso_add_event_to_db_groupon')) {
			$sql = event_espresso_add_event_to_db_groupon($sql, $_REQUEST['use_groupon_code']);
			//print count ($sql);
			$sql_data = array_merge((array) $sql_data, (array) '%s');
			//print count($sql_data);
			if (!$wpdb->insert(EVENTS_DETAIL_TABLE, $sql, $sql_data)) {
				$error = true;
			}
		} else {
			if (!$wpdb->insert(EVENTS_DETAIL_TABLE, $sql, $sql_data)) {
				$error = true;
			}
		}

		$last_event_id = $wpdb->insert_id;

		############# MailChimp Integration ##############
		if (get_option('event_mailchimp_active') == 'true' && $espresso_premium == true) {
			MailChimpController::add_event_list_rel($last_event_id);
		}
		if (function_exists('espresso_fb_createevent') == 'true' && $espresso_premium == true) {
			espresso_fb_createevent($last_event_id);
		}

		/*
		 * Added for seating chart addon
		 */
		if (isset($_REQUEST['seating_chart_id'])) {
			$cls_seating_chart = new seating_chart();
			$cls_seating_chart->associate_event_seating_chart($_REQUEST['seating_chart_id'], $last_event_id);
		}
		/*
		 * End
		 */

		//Add event to a category
		if (isset($_REQUEST['event_category']) && $_REQUEST['event_category'] != '') {
			foreach ($_REQUEST['event_category'] as $k => $v) {
				if ($v != '') {
					$sql_cat = "INSERT INTO " . EVENTS_CATEGORY_REL_TABLE . " (event_id, cat_id) VALUES ('" . $last_event_id . "', '" . $v . "')";
					//echo "$sql3 <br>";
					if (!$wpdb->query($sql_cat)) {
						$error = true;
					}
				}
			}
		}

		if (!empty($_REQUEST['event_person'])) {
			foreach ($_REQUEST['event_person'] as $k => $v) {
				if ($v != '') {
					$sql_ppl = "INSERT INTO " . EVENTS_PERSONNEL_REL_TABLE . " (event_id, person_id) VALUES ('" . $last_event_id . "', '" . $v . "')";
					//echo "$sql_ppl <br>";
					$wpdb->query($sql_ppl);
				}
			}
		}

		if (!empty($_REQUEST['venue_id'])) {
			foreach ($_REQUEST['venue_id'] as $k => $v) {
				if ($v != '' && $v != 0) {
					$sql_venues = "INSERT INTO " . EVENTS_VENUE_REL_TABLE . " (event_id, venue_id) VALUES ('" . $last_event_id . "', '" . $v . "')";
					//echo "$sql_venues <br>";
					$wpdb->query($sql_venues);
				}
			}
		}

		if (!empty($_REQUEST['event_discount'])) {
			foreach ($_REQUEST['event_discount'] as $k => $v) {
				if ($v != '') {
					$sql_cat = "INSERT INTO " . EVENTS_DISCOUNT_REL_TABLE . " (event_id, discount_id) VALUES ('" . $last_event_id . "', '" . $v . "')";
					//echo "$sql3 <br>";
					if (!$wpdb->query($sql_cat)) {
						$error = true;
					}
				}
			}
		}

		if (!empty($_REQUEST['start_time'])) {
			foreach ($_REQUEST['start_time'] as $k => $v) {
				if ($v != '') {
					$time_qty = $_REQUEST['time_qty'][$k] == '' ? '0' : "'" . $_REQUEST['time_qty'][$k] . "'";
					$sql3 = "INSERT INTO " . EVENTS_START_END_TABLE . " (event_id, start_time, end_time, reg_limit) VALUES ('" . $last_event_id . "', '" . event_date_display($v, 'H:i') . "', '" . event_date_display($_REQUEST['end_time'][$k], 'H:i') . "', " . $time_qty . ")";
					//echo "$sql3 <br>";
					if (!$wpdb->query($sql3)) {
						$error = true;
					}
				}
			}
		}

		if (!empty($_REQUEST['event_cost'])) {
			foreach ($_REQUEST['event_cost'] as $k => $v) {
				if ($v != '') {
					$price_type = $_REQUEST['price_type'][$k] != '' ? $_REQUEST['price_type'][$k] : __('General Admission', 'event_espresso');
					$member_price_type = !empty($_REQUEST['member_price_type'][$k]) ? $_REQUEST['member_price_type'][$k] : __('Members Admission', 'event_espresso');
					$member_price = !empty($_REQUEST['member_price'][$k]) ? $_REQUEST['member_price'][$k] : $v;

					$sql_price = "INSERT INTO " . EVENTS_PRICES_TABLE . " (event_id, event_cost, surcharge, surcharge_type, price_type, member_price, member_price_type) VALUES ('" . $last_event_id . "', '" . $v . "', '" . $_REQUEST['surcharge'][$k] . "', '" . $_REQUEST['surcharge_type'][$k] . "', '" . $price_type . "', '" . $member_price . "', '" . $member_price_type . "')";
					//echo "$sql3 <br>";
					if (!$wpdb->query($sql_price)) {
						$error = true;
					}
				}
			}
		} elseif ($_REQUEST['event_cost'][0] == 0) {
			$sql_price = "INSERT INTO " . EVENTS_PRICES_TABLE . " (event_id, event_cost, surcharge, price_type, member_price, member_price_type) VALUES ('" . $last_event_id . "', '0.00', '0.00', '" . __('Free', 'event_espresso') . "', '0.00', '" . __('Free', 'event_espresso') . "')";
			if (!$wpdb->query($sql_price)) {
				$error = true;
			}
		}

		// Create Event Post Code Here
		if ($_REQUEST['create_post'] == 'Y') {
			$post_type = $_REQUEST['post_type'];
			if ($post_type == 'post') {
				if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php") || file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/event_post.php")) {
					// Load message from template into message post variable
					ob_start();
					if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php")) {
						require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php");
					} else {
						require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/event_post.php");
					}
					$post_content = ob_get_contents();
					ob_end_clean();
				} else {
					_e('There was error finding a post template. Please verify your post templates are available.', 'event_espresso');
				}
			} elseif ($post_type == 'espresso_event') {
				ob_start();
				echo $event_desc;
				$post_content = ob_get_contents();
				ob_end_clean();
			}
			$my_post = array();

			$my_post['post_title'] = esc_html($_REQUEST['event']);
			$my_post['post_content'] = $post_content;
			$my_post['post_status'] = 'publish';
			$my_post['post_author'] = $_REQUEST['user'];
			$my_post['post_category'] = $_REQUEST['post_category'];
			$my_post['tags_input'] = $_REQUEST['post_tags'];
			$my_post['post_type'] = $post_type;
			//print_r($my_post);
			// Insert the post into the database
			$post_id = wp_insert_post($my_post);
			// Store the POST ID so it can be displayed on the edit page
			$sql = array('post_id' => $post_id, 'post_type' => $post_type);

			add_post_meta($post_id, 'event_id', $last_event_id);
			add_post_meta($post_id, 'event_identifier', $event_identifier);
			add_post_meta($post_id, 'event_start_date', $_REQUEST['start_date']);
			add_post_meta($post_id, 'event_end_date', $_REQUEST['end_date']);
			add_post_meta($post_id, 'event_location', $event_location);
			add_post_meta($post_id, 'virtual_url', $virtual_url);
			add_post_meta($post_id, 'virtual_phone', $virtual_phone);
			add_post_meta($post_id, 'event_address', $address);
			add_post_meta($post_id, 'event_address2', $address2);
			add_post_meta($post_id, 'event_city', $city);
			add_post_meta($post_id, 'event_state', $state);
			add_post_meta($post_id, 'event_country', $country);
			add_post_meta($post_id, 'event_phone', $phone);
			add_post_meta($post_id, 'venue_title', $venue_title);
			add_post_meta($post_id, 'venue_url', $venue_url);
			add_post_meta($post_id, 'venue_phone', $venue_phone);
			add_post_meta($post_id, 'venue_image', $venue_image);
			add_post_meta($post_id, 'event_externalURL', $externalURL);
			add_post_meta($post_id, 'event_reg_limit', $reg_limit);
			add_post_meta($post_id, 'event_start_time', time_to_24hr($start_time));
			add_post_meta($post_id, 'event_end_time', time_to_24hr($end_time));
			add_post_meta($post_id, 'event_registration_start', $registration_start);
			add_post_meta($post_id, 'event_registration_end', $registration_end);
			add_post_meta($post_id, 'event_registration_startT', $registration_startT);
			add_post_meta($post_id, 'event_registration_endT', $registration_endT);
			//add_post_meta( $post_id, 'timezone_string', $_REQUEST['timezone_string'] );

			$sql_data = array('%d', '%s');
			$update_id = array('id' => $last_event_id);
			$wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d'));
		}

		if (empty($error)) {
			?>
			<div id="message" class="updated fade"><p><strong><?php _e('The event', 'event_espresso'); ?>
						<a href="<?php echo espresso_reg_url($wpdb->insert_id); ?>" target="_blank"><?php echo stripslashes_deep($_REQUEST['event']) ?></a>

						<?php _e('has been added for ', 'event_espresso'); ?><?php echo date("m/d/Y", strtotime($start_date)); ?> <a href="admin.php?page=events&action=edit&event_id=<?php echo $last_event_id; ?>"><?php _e('Edit this event?', 'event_espresso'); ?></a></strong></p></div>
					<?php } else { ?>
			<div id="message" class="error"><p><strong><?php _e('There was an error in your submission, please try again. The event was not saved!', 'event_espresso'); ?><?php print $wpdb->print_error(); ?>.</strong></p></div>
			<?php
		}
	}

	/*
	 * With the recursion of this function, additional recurring events will be added
	 */
	if (isset($recurrence_dates) && count($recurrence_dates) > 0) {

		foreach ($recurrence_dates as $k => $v) {

			add_event_to_db(
				array(
					'recurrence_id' => $recurrence_id,
					'recurrence_start_date' => $v['start_date'],
					'recurrence_event_end_date' => $v['event_end_date'],
					'registration_start' => $v['registration_start'],
					'registration_end' => $v['registration_end'],
					'visible_on' => $v['visible_on']
			));
		}
	}
	/*
	 * End recursion, as part of recurring events.
	 */
	return $last_event_id;

 }
	// end nonce check
}
//End add_event_funct_to_db()
