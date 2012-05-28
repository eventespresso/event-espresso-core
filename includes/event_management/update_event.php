<?php

// TODO find out why $post_content is only added to the first post in case of a recurring event

function update_event($recurrence_arr = array()) {
	//print_r($_REQUEST);

	global $wpdb, $espresso_wp_user, $espresso_premium;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	if (check_admin_referer('espresso_form_check', 'ee__event_editor')) {

		$wpdb->show_errors();
		/*
		 * Begin Recurrence handling
		 *
		 * Will clean up in V 1.2.0
		 *
		 */
		if (get_option('event_espresso_re_active') == 1) {
			require_once(EVENT_ESPRESSO_RECURRENCE_FULL_PATH . "functions/re_functions.php");

			if ($_POST['recurrence_id'] > 0) {
				/*
				 * If the array is empty, then find the recurring dates
				 */
				if (count($recurrence_arr) == 0) {

					// Prepare the parameters array for use with various RE functions
					$re_params = array(
							'start_date' => $_POST['recurrence_start_date'],
							'event_end_date' => $_POST['recurrence_event_end_date'],
							'end_date' => $_POST['recurrence_end_date'],
							'registration_start' => $_POST['recurrence_regis_start_date'],
							'registration_end' => $_POST['recurrence_regis_end_date'],
							'frequency' => $_POST['recurrence_frequency'],
							'interval' => $_POST['recurrence_interval'],
							'recurrence_type' => $_POST['recurrence_type'],
							'weekdays' => $_POST['recurrence_weekday'],
							'repeat_by' => $_POST['recurrence_repeat_by'],
							'recurrence_regis_date_increment' => $_POST['recurrence_regis_date_increment'],
							'recurrence_manual_dates' => $_POST['recurrence_manual_dates'],
							'recurrence_manual_end_dates' => $_POST['recurrence_manual_end_dates'],
							'recurrence_visibility' => $_POST['recurrence_visibility'],
							'recurrence_id' => $_POST['recurrence_id']
					);

					//$re_params['adding_to_db'] = true;
					//Has the form been modified
					$recurrence_form_modified = recurrence_form_modified($re_params);

					//echo ($recurrence_form_modified) ? "Yes" : 'No';


					if ($_POST['recurrence_apply_changes_to'] == 2) {
						//Update all events in the series based on recurrence id

						$recurrence_dates = ($_POST['recurrence_type'] == 'm') ? find_recurrence_manual_dates($re_params) : find_recurrence_dates($re_params);

						//$DEL_SQL = 'UPDATE ' . EVENTS_DETAIL_TABLE . " SET event_status = 'D' WHERE start_date NOT IN (" . $delete_in . ") AND recurrence_id = " . $wpdb->escape($_POST['recurrence_id']);


						$UPDATE_SQL = "SELECT id,start_date,event_identifier,slug FROM " . EVENTS_DETAIL_TABLE . " WHERE recurrence_id = %d AND NOT event_status = 'D'";
					} else {
						//Update this and upcoming events based on recurrence id and start_date >=start_date
						$re_params['start_date'] = $_POST['start_date'];
						$recurrence_dates = find_recurrence_dates($re_params);

						//$DEL_SQL = 'UPDATE ' . EVENTS_DETAIL_TABLE . " SET event_status = 'D' WHERE start_date >='" . $wpdb->escape($_POST['start_date']) . "' AND start_date NOT IN (" . $delete_in . ") AND recurrence_id = " . $_POST['recurrence_id'];
						$UPDATE_SQL = "SELECT id,start_date,event_identifier,slug FROM " . EVENTS_DETAIL_TABLE . " WHERE start_date >='" . $wpdb->escape($_POST['start_date']) . "' AND recurrence_id = %d and NOT event_status = 'D' ";
					}

					//Recurrence Form modified and changes need to apply to all
					if ($recurrence_form_modified && $_POST['recurrence_apply_changes_to'] > 1) {

						//Update the recurrence table record with the new RE selections
						update_recurrence_master_record();

						/*
						 * Delete the records that don't belong in the formula
						 */

						if (count($recurrence_dates) > 0) {
							$delete_in = '';
							foreach ($recurrence_dates as $k => $v) {
								$delete_in .= "'" . $k . "',";
							}
							$delete_in = substr($delete_in, 0, -1);
						}


						if ($_POST['recurrence_apply_changes_to'] == 2) {
							//Update all events in the series based on recurrence id
							//$DEL_SQL = 'UPDATE ' . EVENTS_DETAIL_TABLE . " SET event_status = 'D' WHERE start_date NOT IN (" . $delete_in . ") AND recurrence_id = " . $_POST['recurrence_id'];
							$DEL_SQL = 'DELETE EDT, EAT FROM ' . EVENTS_DETAIL_TABLE . " EDT
								LEFT JOIN " . EVENTS_ATTENDEE_TABLE . " EAT
									ON EDT.id = EAT.event_id
								WHERE EAT.id IS NULL
								AND EDT.start_date NOT IN (" . $delete_in . ")
								AND recurrence_id = " . $_POST['recurrence_id'];

							$UPDATE_SQL = "SELECT id,start_date,event_identifier,slug FROM " . EVENTS_DETAIL_TABLE . " WHERE recurrence_id = %d and NOT event_status = 'D' ORDER BY start_date";
						} else {
							//Update this and upcoming events based on recurrence id and start_date >=start_date
							//$DEL_SQL = 'UPDATE ' . EVENTS_DETAIL_TABLE . " SET event_status = 'D' WHERE start_date >='" . $wpdb->escape($_POST['start_date']) . "' AND start_date NOT IN (" . $delete_in . ") AND recurrence_id = " . $_POST['recurrence_id'];
							$DEL_SQL = 'DELETE EDT, EAT FROM ' . EVENTS_DETAIL_TABLE . " EDT
								LEFT JOIN " . EVENTS_ATTENDEE_TABLE . " EAT
									ON EDT.id = EAT.event_id
								WHERE EAT.id IS NULL
								AND EDT.start_date >='" . $wpdb->escape($_POST['start_date']) . "'
								AND EDT.start_date NOT IN (" . $delete_in . ")
								AND recurrence_id = " . $_POST['recurrence_id'];
							$UPDATE_SQL = "SELECT id,start_date,event_identifier,slug FROM " . EVENTS_DETAIL_TABLE . " WHERE start_date >='" . $wpdb->escape($_POST['start_date']) . "' AND recurrence_id = %d AND NOT event_status = 'D'  ORDER BY start_date";
						}

						if ($delete_in != '')
							$wpdb->query($DEL_SQL);

						/*
						 * Add the new records based on the new formula
						 * The $recurrence_dates array will contain the new dates
						 */
						if (!function_exists('add_event_to_db')) {
							require_once ('insert_event.php');
						}

						foreach ($recurrence_dates as $k => $v) {
							$result = $wpdb->get_row($wpdb->prepare("SELECT ID FROM " . EVENTS_DETAIL_TABLE . " WHERE recurrence_id = %d and start_date = %s and NOT event_status = 'D'", array($_POST['recurrence_id'], $k)));

							if ($wpdb->num_rows == 0) {
								add_event_to_db(array(
										'recurrence_id' => $_POST['recurrence_id'],
										'recurrence_start_date' => $v['start_date'],
										'recurrence_event_end_date' => $v['end_date'],
										'recurrence_end_date' => $v['start_date'],
										'registration_start' => $v['registration_start'],
										'registration_end' => $v['registration_end']));
							} else {
								
							}
						}

						/*
						 * Find all the event ids in the series and feed into the $recurrence_dates array
						 * This array will be used at the end of this document to invoke the recursion of update_event function so all the events in the series
						 * can be updated with the information.
						 */
					}

					$result = $wpdb->get_results($wpdb->prepare($UPDATE_SQL, array($_POST['recurrence_id'])));

					foreach ($result as $row) {
						if ($row->start_date != '') {
							$recurrence_dates[$row->start_date]['event_id'] = $row->id;
							$recurrence_dates[$row->start_date]['event_identifier'] = $row->event_identifier;
							$recurrence_dates[$row->start_date]['slug'] = $row->slug;
						}
					}
				}
			}
		} // end recurrence functions
		//  echo_f('rd',$recurrence_dates);


		if (defined('EVENT_ESPRESSO_RECURRENCE_MODULE_ACTIVE') &&
						!empty($_POST['recurrence']) && $_POST['recurrence'] == 'true' &&
						count($recurrence_arr) == 0 && $_POST['recurrence_apply_changes_to'] > 1) {
			//skip the first update
			$event_id = array_key_exists('event_id', $recurrence_arr) ? $recurrence_arr['event_id'] : $_REQUEST['event_id'];
		} else {

			$event_meta = array(); //will be used to hold event meta data
			$wp_user_id = empty($_REQUEST['wp_user']) ? $espresso_wp_user : $_REQUEST['wp_user'][0];
			$event_id = array_key_exists('event_id', $recurrence_arr) ? $recurrence_arr['event_id'] : $_REQUEST['event_id'];
			$event_name = $_REQUEST['event'];
			$event_slug = array_key_exists('slug', $recurrence_arr) ? $recurrence_arr['slug'] : ($_REQUEST['slug'] == '') ? sanitize_title_with_dashes($event_name . '-' . $event_id) : sanitize_title_with_dashes($_REQUEST['slug']);
			$event_desc = $_REQUEST['event_desc'];
			$display_desc = $_REQUEST['display_desc'];
			$display_reg_form = $_REQUEST['display_reg_form'];
			$reg_limit = $_REQUEST['reg_limit'];
			$allow_multiple = $_REQUEST['allow_multiple'];
			$ticket_id = empty($_REQUEST['ticket_id']) ? '' : $_REQUEST['ticket_id'];
			$certificate_id = empty($_REQUEST['certificate_id']) ? '' : $_REQUEST['certificate_id'];

			$allow_overflow = empty($_REQUEST['allow_overflow']) ? false : $_REQUEST['allow_overflow'];

			$additional_limit = $_REQUEST['additional_limit'];
			//$member_only=$_REQUEST['member_only'];
			$member_only = empty($_REQUEST['member_only']) ? false : $_REQUEST['member_only'];

			$is_active = $_REQUEST['is_active'];
			$event_status = $_REQUEST['new_event_status'];

			$address = !empty($_REQUEST['address']) ? esc_html($_REQUEST['address']) : '';
			$address2 = !empty($_REQUEST['address2']) ? esc_html($_REQUEST['address2']) : '';
			$city = !empty($_REQUEST['city']) ? esc_html($_REQUEST['city']) : '';
			$state = !empty($_REQUEST['state']) ? esc_html($_REQUEST['state']) : '';
			$zip = !empty($_REQUEST['zip']) ? esc_html($_REQUEST['zip']) : '';
			$country = !empty($_REQUEST['country']) ? esc_html($_REQUEST['country']) : '';
			$phone = !empty($_REQUEST['phone']) ? esc_html($_REQUEST['phone']) : '';
			$externalURL = !empty($_REQUEST['externalURL']) ? esc_html($_REQUEST['externalURL']) : '';

			//$event_location = $address . ' ' . $city . ', ' . $state . ' ' . $zip;
			$event_location = ($address != '' ? $address . ' ' : '') . ($city != '' ? '<br />' . $city : '') . ($state != '' ? ', ' . $state : '') . ($zip != '' ? '<br />' . $zip : '') . ($country != '' ? '<br />' . $country : '');

			//Get the first instance of the start and end times
			//$start_time = $_REQUEST['start_time'][0];
			//$end_time = $_REQUEST['end_time'][0];
			// Add registration times
			//$registration_startT = event_date_display($_REQUEST['registration_startT'], 'H:i');
			//$registration_endT = event_date_display($_REQUEST['registration_endT'], 'H:i');
			//Add timezone
			$timezone_string = empty($_REQUEST['timezone_string']) ? '' : $_REQUEST['timezone_string'];

			//Early discounts
			$early_disc = $_REQUEST['early_disc'];
			$early_disc_date = $_REQUEST['early_disc_date'];
			$early_disc_percentage = $_REQUEST['early_disc_percentage'];

			$use_coupon_code = $_REQUEST['use_coupon_code'];
			$alt_email = $_REQUEST['alt_email'];

			$confirmation_email_id = $_REQUEST['confirmation_email_id'];
			$payment_email_id = $_REQUEST['payment_email_id'];


			/* @var $registration_start type int */
			//$registration_start = array_key_exists('registration_start', $recurrence_arr) ? $recurrence_arr['registration_start'] : $_REQUEST['registration_start'];
			//$registration_end = array_key_exists('registration_end', $recurrence_arr) ? $recurrence_arr['registration_end'] : $_REQUEST['registration_end'];
			//$start_date = array_key_exists('recurrence_start_date', $recurrence_arr) ? $recurrence_arr['recurrence_start_date'] : ($_REQUEST['start_date'] == '' && isset($_REQUEST['recurrence_start_date']) ? $_REQUEST['recurrence_start_date'] : $_REQUEST['start_date']);
			//$end_date = array_key_exists('recurrence_event_end_date', $recurrence_arr) ? $recurrence_arr['recurrence_event_end_date'] : ($_REQUEST['end_date'] == '' && isset($_REQUEST['recurrence_event_end_date']) ? $_REQUEST['recurrence_event_end_date'] : $_REQUEST['end_date']);
			//Venue Information
			$venue_title = isset($_REQUEST['venue_title']) ? $_REQUEST['venue_title'] : '';
			$venue_url = isset($_REQUEST['venue_url']) ? $_REQUEST['venue_url'] : '';
			$venue_phone = isset($_REQUEST['venue_phone']) ? $_REQUEST['venue_phone'] : '';
			$venue_image = isset($_REQUEST['venue_image']) ? $_REQUEST['venue_image'] : '';


			//Virtual location
			$virtual_url = isset($_REQUEST['virtual_url']) ? $_REQUEST['virtual_url'] : '';
			$virtual_phone = isset($_REQUEST['virtual_phone']) ? $_REQUEST['virtual_phone'] : '';

			if (isset($reg_limit) && $reg_limit == '') {
				$reg_limit = 999999;
			}

			$question_groups = serialize($_REQUEST['question_groups']);

			$event_meta['default_payment_status'] = $_REQUEST['default_payment_status'];
			$event_meta['venue_id'] = empty($_REQUEST['venue_id']) ? '' : $_REQUEST['venue_id'][0];
			$event_meta['additional_attendee_reg_info'] = $_REQUEST['additional_attendee_reg_info'];
			$event_meta['add_attendee_question_groups'] = empty($_REQUEST['add_attendee_question_groups']) ? '' : $_REQUEST['add_attendee_question_groups'];
			$event_meta['date_submitted'] = $_REQUEST['date_submitted'];
			$event_meta['originally_submitted_by'] = $_REQUEST['originally_submitted_by'];

			if (isset($espresso_wp_user) && $espresso_wp_user != $event_meta['originally_submitted_by']) {
				$event_meta['orig_event_staff'] = !empty($_REQUEST['event_person']) ? serialize($_REQUEST['event_person']) : '';
			}
			//print_r($event_meta['orig_event_staff']);
			//Thumbnails
			$event_meta['event_thumbnail_url'] = !empty($_REQUEST['upload_image']) ? $_REQUEST['upload_image'] : '';
			$event_meta['display_thumb_in_lists'] = !empty($_REQUEST['show_thumb_in_lists']) ? $_REQUEST['show_thumb_in_lists'] : '';
			$event_meta['display_thumb_in_regpage'] = !empty($_REQUEST['show_thumb_in_regpage']) ? $_REQUEST['show_thumb_in_regpage'] : '';
			$event_meta['display_thumb_in_calendar'] = !empty($_REQUEST['show_on_calendar']) ? $_REQUEST['show_on_calendar'] : '';

			if (!empty($_REQUEST['venue_id'][0]) || !empty($_REQUEST['zip']) || !empty($_REQUEST['city']) || !empty($_REQUEST['state'])) {
				$event_meta['enable_for_gmap'] = $_REQUEST['enable_for_gmap'];
			} else {
				$event_meta['enable_for_gmap'] = false;
			}

			/*
			 * Added for seating chart addon
			 */
			if (isset($_REQUEST['seating_chart_id'])) {
				$cls_seating_chart = new seating_chart();
				$seating_chart_result = $cls_seating_chart->associate_event_seating_chart($_REQUEST['seating_chart_id'], $event_id);
				$tmp_seating_chart_id = $_REQUEST['seating_chart_id'];
				if ($tmp_seating_chart_id > 0) {
					if ($seating_chart_result === false) {
						$tmp_seating_chart_row = $wpdb->get_row("select seating_chart_id from " . EVENTS_SEATING_CHART_EVENT_TABLE . " where event_id = $event_id");
						if ($tmp_seating_chart_row !== NULL) {
							$tmp_seating_chart_id = $tmp_seating_chart_row->seating_chart_id;
						} else {
							$tmp_seating_chart_id = 0;
						}
					}

					if ($_REQUEST['allow_multiple'] == 'true' && isset($_REQUEST['seating_chart_id']) && $tmp_seating_chart_id > 0) {

						$event_meta['additional_attendee_reg_info'] = 3;
					}
				}
			}
			/*
			 * End
			 */


			if ($_REQUEST['emeta'] != '') {
				foreach ($_REQUEST['emeta'] as $k => $v) {
					$event_meta[$v] = $_REQUEST['emetad'][$k];
				}
			}
			$event_meta = serialize($event_meta);
			############ Added by wp-developers ######################
			$require_pre_approval = 0;
			if (isset($_REQUEST['require_pre_approval'])) {
				$require_pre_approval = $_REQUEST['require_pre_approval'];
			}

			################# END #################
			//When adding colums to the following arrays, be sure both arrays have equal values.
			$sql = array(
					'event_name' => $event_name,
					'event_desc' => $event_desc,
					'display_desc' => $display_desc,
					'display_reg_form' => $display_reg_form,
					'slug' => $event_slug,
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
//					'registration_start' => $registration_start,
//					'registration_end' => $registration_end,
//					'start_date' => $start_date,
//					'end_date' => $end_date,
					'allow_multiple' => $allow_multiple,
					'is_active' => $is_active,
					'event_status' => $event_status,
					'use_coupon_code' => $use_coupon_code,
					'member_only' => $member_only,
					'externalURL' => $externalURL,
					'early_disc' => $early_disc,
					'early_disc_date' => $early_disc_date,
					'early_disc_percentage' => $early_disc_percentage,
					'alt_email' => $alt_email,
					'question_groups' => $question_groups,
					'allow_overflow' => $allow_overflow,
//					'registration_startT' => $registration_startT,
//					'registration_endT' => $registration_endT,
					'event_meta' => $event_meta,
					'require_pre_approval' => $require_pre_approval,
					'timezone_string' => $timezone_string,
//					'reg_limit' => $reg_limit,
					'additional_limit' => $additional_limit,
					'wp_user' => $wp_user_id,
					'ticket_id' => $ticket_id,
					'certificate_id' => $certificate_id,
					'confirmation_email_id' => $confirmation_email_id,
					'payment_email_id' => $payment_email_id
			);



			$sql_data = array(
					'%s', '%s', '%s', '%s', '%s',
					'%s', '%s', '%s', '%s', '%s',
					'%s', '%s', '%s', '%s', '%s',
					'%s', '%s', '%s', /* '%s', '%s',
					  '%s', '%s', */ '%s', '%s', '%s',
					'%s', '%s', '%s', '%s', '%s',
					'%s', '%s', '%s', '%s', /* '%s',
					  '%s', */ '%s', '%s', '%s', /* '%d', */
					'%d', '%d', '%d', '%d', '%d',
					'%d'
			);

			$update_id = array('id' => $event_id);

			/* echo 'Debug:<br />';
			  print 'Number of vars: ' . count ($sql);
			  echo '<br />';
			  print 'Number of cols: ' . count($sql_data);
			  echo "<pre>".print_r( $sql,true )."</pre>"; */

			if (function_exists('event_espresso_add_event_to_db_groupon')) {
				$sql = event_espresso_add_event_to_db_groupon($sql, $_REQUEST['use_groupon_code']);
				///print count ($sql);
				$sql_data = array_merge((array) $sql_data, (array) '%s');
				//print count($sql_data);
				$wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d'));
				/* echo 'Debug: <br />';
				  print 'Number of vars: ' . count ($sql);
				  echo '<br />';
				  print 'Number of cols: ' . count($sql_data); */
			} else {
				$wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d'));
				/* echo 'Debug: <br />';
				  print 'Number of vars: ' . count ($sql);
				  echo '<br />';
				  print 'Number of cols: ' . count($sql_data); */
			}
			//print $wpdb->print_error();

			$del_cats = "DELETE FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id = '" . $event_id . "'";
			$wpdb->query($del_cats);

			if (!empty($_REQUEST['event_category'])) {
				foreach ($_REQUEST['event_category'] as $k => $v) {
					if ($v != '') {
						$sql_cat = "INSERT INTO " . EVENTS_CATEGORY_REL_TABLE . " (event_id, cat_id) VALUES ('" . $event_id . "', '" . $v . "')";
						//echo "$sql_cat <br>";
						$wpdb->query($sql_cat);
					}
				}
			}

			$del_ppl = "DELETE FROM " . EVENTS_PERSONNEL_REL_TABLE . " WHERE event_id = '" . $event_id . "'";
			$wpdb->query($del_ppl);

			if (!empty($_REQUEST['event_person'])) {
				foreach ($_REQUEST['event_person'] as $k => $v) {
					if ($v != '') {
						$sql_ppl = "INSERT INTO " . EVENTS_PERSONNEL_REL_TABLE . " (event_id, person_id) VALUES ('" . $event_id . "', '" . $v . "')";
						//echo "$sql_ppl <br>";
						$wpdb->query($sql_ppl);
					}
				}
			}

			$del_venues = "DELETE FROM " . EVENTS_VENUE_REL_TABLE . " WHERE event_id = '" . $event_id . "'";
			$wpdb->query($del_venues);

			if (!empty($_REQUEST['venue_id'])) {
				foreach ($_REQUEST['venue_id'] as $k => $v) {
					if ($v != '' && $v != 0) {
						$sql_venues = "INSERT INTO " . EVENTS_VENUE_REL_TABLE . " (event_id, venue_id) VALUES ('" . $event_id . "', '" . $v . "')";
						//echo "$sql_venues <br>";
						$wpdb->query($sql_venues);
					}
				}
			}

			$del_discounts = "DELETE FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE event_id = '" . $event_id . "'";
			$wpdb->query($del_discounts);

			if (!empty($_REQUEST['event_discount'])) {
				foreach ($_REQUEST['event_discount'] as $k => $v) {
					if ($v != '') {
						$sql_discount = "INSERT INTO " . EVENTS_DISCOUNT_REL_TABLE . " (event_id, discount_id) VALUES ('" . $event_id . "', '" . $v . "')";
						//echo "$sql_discount <br>";
						$wpdb->query($sql_discount);
					}
				}
			}


			/*			 * ***********************************   DATE TIME   ******************************************* */

			//$registration_start = wp_strip_all_tags( $_REQUEST['registration_start'] );
			//$registration_end = wp_strip_all_tags( $_REQUEST['registration_end'] );
			//$registration_startT = wp_strip_all_tags( $_REQUEST['registration_startT'] );
			//$registration_endT = wp_strip_all_tags( $_REQUEST['registration_endT'] );
			

			if (isset($_POST['process_datetimes']) && $_POST['process_datetimes']) {

				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
				$DTM = EEM_Datetime::instance();

				// grab list of all datetime ID's we are processing
				if (isset($_POST['datetime_IDs'])) {
					$datetime_IDs = unserialize( $_POST['datetime_IDs'] );
					array_walk($_POST['datetime_IDs'], 'absint');
					$datetime_IDs = array_flip($datetime_IDs);
				} else {
					$datetime_IDs = array();
				}


				if (isset($_POST['event_datetimes'])) {

					ksort($_POST['event_datetimes']);

					foreach ($_POST['event_datetimes'] as $dtm) {

//						echo printr( $dtm, '$dtm' );

						$dtm['evt_end'] = ( isset($dtm['evt_end']) && $dtm['evt_end'] != '' ) ? $dtm['evt_end'] : $dtm['evt_start'];
						$dtm['reg_end'] = ( isset($dtm['reg_end']) && $dtm['reg_end'] != '' ) ? $dtm['reg_end'] : $dtm['reg_start'];

//echo '<h4>evt_start : ' . $dtm['evt_start'] . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>evt_end : ' . $dtm['evt_end'] . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>reg_start : ' . $dtm['reg_start'] . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>reg_end : ' . $dtm['reg_end'] . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';


						//	EVT_ID 	DTT_is_primary 	DTT_EVT_start 	DTT_EVT_end 	DTT_REG_start 	DTT_REG_end 	DTT_event_or_reg 	DTT_reg_limit 	DTT_tckts_left 	 DTT_ID
						$new_event_date = new EE_Datetime(
														$event_id,
														$dtm['is_primary'],
														$dtm['evt_start'],
														$dtm['evt_end'],
														$dtm['reg_start'],
														$dtm['reg_end'],
														/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
														$dtm['reg_limit'],
														$dtm['tckts_left'],
														DO NOT DELETE - NEW FEATURE IN PROGRESS   */
														$dtm['ID']
						);
						
						// copy primary datetime info for event post
						if ( $new_event_date->is_primary() ) {
							$start_date = $new_event_date->start_date();
							$end_date = $new_event_date->end_date();
							$start_time = $new_event_date->start_time();
							$end_time = $new_event_date->end_time();
							$registration_start = $new_event_date->reg_start_date();
							$registration_end = $new_event_date->reg_end_date();
							$registration_startT =$new_event_date->reg_start_time() ;
							$registration_endT = $new_event_date->reg_end_time();
						}
					
					
//						echo printr( $new_event_date, '$new_event_date' );	

//echo '<h4>start_date_and_time : ' . $new_event_date->start_date_and_time() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>end_date_and_time : ' . $new_event_date->end_date_and_time() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>reg_start_date_and_time : ' . $new_event_date->reg_start_date_and_time() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>reg_end_date_and_time : ' . $new_event_date->reg_end_date_and_time() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';

						// if an ID exists then update
						if ($new_event_date->ID()) {
							// remove this ID from list of datetime IDs - any remainders will get deleted afterwards
							if (array_key_exists($new_event_date->ID(), $datetime_IDs)) {
								unset($datetime_IDs[$new_event_date->ID()]);
							}
							$update = $new_event_date->update();
						} else {
							$insert = $new_event_date->insert();
						}
					}
				}

				// delete any Datetimes that are not being resaved
				foreach ($datetime_IDs as $datetime_ID => $bunk) {
					$DTM->delete_datetime($datetime_ID);
				}
			}	// end if process_datetimes


			/************************************   PRICING   ******************************************* */
			
			$ticket_prices_to_save = array();
			$quick_edit_ticket_price = isset($_POST['quick_edit_ticket_price']) ? $_POST['quick_edit_ticket_price'] : array();
//			echo printr( $quick_edit_ticket_price, '$quick_edit_ticket_price' );

			// grab list of edited ticket prices
			if ($edited_ticket_price_IDs = isset($_POST['edited_ticket_price_IDs']) ? $_POST['edited_ticket_price_IDs'] : FALSE) {
				// remove last comma
				$edited_ticket_price_IDs = trim($edited_ticket_price_IDs, ',');
				// create array of edited ticket prices
				$edited_ticket_price_IDs = explode(',', $edited_ticket_price_IDs);
				// flipper once
				$edited_ticket_price_IDs = array_flip($edited_ticket_price_IDs);
				// flipper twice - hey!?!?! where did all the duplicate entries go???
				$edited_ticket_price_IDs = array_flip($edited_ticket_price_IDs);
//				echo printr( $edited_ticket_price_IDs, '$edited_ticket_price_IDs' );
				// grab existing ticket price data
				if ($edited_ticket_prices = isset($_POST['edit_ticket_price']) ? $_POST['edit_ticket_price'] : FALSE) {
//					echo printr( $edited_ticket_prices, '$edited_ticket_prices' );
					// cycle thru list                    
					foreach ($edited_ticket_prices as $PRC_ID => $edited_ticket_price) {
//						echo printr( $edited_ticket_price, '$edited_ticket_price' );	
						// add edited ticket prices to list of ticket prices to save
						if (in_array($PRC_ID, $edited_ticket_price_IDs)) {
//							echo printr( $quick_edit_ticket_price[$PRC_ID], '$quick_edit_ticket_price[$PRC_ID]' );
							if ( is_array( $quick_edit_ticket_price[$PRC_ID] )) {
								$edited_ticket_price = array_merge( $edited_ticket_price, $quick_edit_ticket_price[$PRC_ID] );
//								echo printr( $edited_ticket_price, '$edited_ticket_price' );	
							}
							$ticket_prices_to_save[$PRC_ID] = $edited_ticket_price;
						}
					}
				}
			}
			
//			echo printr( $ticket_prices_to_save, '$ticket_prices_to_save' );	

			// add new tickets if any
			if ($new_ticket_price = isset($_POST['new_ticket_price']) ? $_POST['new_ticket_price'] : array('PRC_name' => NULL)) {
				if (!empty($new_ticket_price['PRC_name'])) {
					$ticket_prices_to_save[0] = $new_ticket_price;
				}
			}

			// and now we actually save the ticket prices
			if (!empty($ticket_prices_to_save)) {

				//echo printr( $new_ticket_price, '$new_ticket_price' );
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
				$PRC = EEM_Price::instance();

				global $current_user;
				get_currentuserinfo();

				foreach ($ticket_prices_to_save as $PRC_ID => $ticket_price) {

					//determine whether this price overrides an existing global or not
					$overrides = absint($ticket_price['PRT_is_global']) ? $PRC_ID : NULL;
//echo '<br/><br/><h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
					// or whether it was already overriding a global from before
					$overrides = $ticket_price['PRC_overrides'] ? absint($ticket_price['PRC_overrides']) : $overrides;
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
					// create ticket object
					$new_price = new EE_Price(
													$ticket_price['PRT_ID'],
													absint($event_id),
													$ticket_price['PRC_amount'],
													$ticket_price['PRC_name'],
													$ticket_price['PRC_desc'],
													/* DO NOT DELETE - NEW FEATURE IN PROGRESS   
													$ticket_price['PRC_reg_limit'],
													$ticket_price['PRC_tckts_left'],
													*/
													$ticket_price['PRC_use_dates'] ? TRUE : FALSE,
													$ticket_price['PRC_start_date'],
													$ticket_price['PRC_end_date'],
													FALSE,
													FALSE,
													0,
													TRUE,
													$current_user->ID,
													$ticket_price['PRC_is_active'] ? TRUE : FALSE,
													$overrides,
													$ticket_price['PRT_ID'] < 3 ? 0 : $ticket_price['PRC_order'],
													$ticket_price['PRC_deleted'],
													(( $ticket_price['PRT_is_global'] == 1 ) && ( ! isset ( $PRC_ID ))) ? 0 : $PRC_ID
					);

//                    echo printr( $ticket_price, '$ticket_price' );
//                    echo printr( $new_price, '$new_price' );

					if (!$new_price->ID()) {
//echo '<h1>insert !!!</h1>';
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
						$results = $new_price->insert();
					} else {
//echo '<h1>update !!!</h1>';
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
						$results = $new_price->update();
					}
				}
			}


//echo printr( $_POST, '$_POST' );	
//global $espresso_notices; 
//echo espresso_get_notices();            
//die();


			############# MailChimp Integration ###############
			if (get_option('event_mailchimp_active') == 'true' && $espresso_premium == true) {
				MailChimpController::update_event_list_rel($event_id);
			}

			/// Create Event Post Code Here
			switch ($_REQUEST['create_post']) {
				case ! $_REQUEST['create_post']:
					// check for post id in form input first before just hitting the db
					if ( isset( $_POST['post_id'] ) && ! empty( $_POST['post_id'] )) {
						$post_id = absint( $_POST['post_id'] );
					} else {
						$sql = " SELECT * FROM " . EVENTS_DETAIL_TABLE;
						$sql .= " WHERE id = '" . $event_id . "' ";
						$wpdb->get_results($sql);
						$post_id = $wpdb->last_result[0]->post_id;
					}

					if ($wpdb->num_rows > 0 && !empty($_REQUEST['delete_post']) && $_REQUEST['delete_post'] == 'true') {
						$sql = array('post_id' => '', 'post_type' => '');
						$sql_data = array('%d', '%s');
						$update_id = array('id' => $event_id);
						$wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d'));
						wp_delete_post($post_id, 'true');
					}
					break;

				case $_REQUEST['create_post']:			
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

					// check for post id in form input first before just hitting the db
					if ( isset( $_POST['post_id'] ) && ! empty( $_POST['post_id'] )) {
						$post_id = absint( $_POST['post_id'] );
					} else {
						$sql = " SELECT * FROM " . EVENTS_DETAIL_TABLE;
						$sql .= " WHERE id = '" . $event_id . "' ";
						$wpdb->get_results($sql);
						$post_id = $wpdb->last_result[0]->post_id;
					}

					$post_type = $_REQUEST['post_type'];

					if ($post_id > 0)
						$my_post['ID'] = $post_id;

					$my_post['post_title'] = esc_html($_REQUEST['event']);
					$my_post['post_content'] = $post_content;
					$my_post['post_status'] = 'publish';
					$my_post['post_author'] = $_REQUEST['user'];
					$my_post['post_category'] = $_REQUEST['post_category'];
					//print_r ($my_post['post_category']);
					$my_post['tags_input'] = $_REQUEST['post_tags'];
					$my_post['post_type'] = $post_type;
					//print_r($my_post);
					// Insert the post into the database					
						
					if ($post_id > 0) {
						$post_id = wp_update_post($my_post);
						update_post_meta($post_id, 'event_id', $event_id);
						update_post_meta($post_id, 'event_identifier', $event_identifier);
						update_post_meta($post_id, 'slug', $event_slug);
						update_post_meta($post_id, 'event_start_date', $start_date);
						update_post_meta($post_id, 'event_end_date', $end_date);
						update_post_meta($post_id, 'event_location', $event_location);
						update_post_meta($post_id, 'virtual_url', $virtual_url);
						update_post_meta($post_id, 'virtual_phone', $virtual_phone);
						//
						update_post_meta($post_id, 'event_address', $address);
						update_post_meta($post_id, 'event_address2', $address2);
						update_post_meta($post_id, 'event_city', $city);
						update_post_meta($post_id, 'event_state', $state);
						update_post_meta($post_id, 'event_country', $country);
						update_post_meta($post_id, 'event_phone', $phone);
						update_post_meta($post_id, 'venue_title', $venue_title);
						update_post_meta($post_id, 'venue_url', $venue_url);
						update_post_meta($post_id, 'venue_phone', $venue_phone);
						update_post_meta($post_id, 'venue_image', $venue_image);
						update_post_meta($post_id, 'event_externalURL', $externalURL);
						update_post_meta($post_id, 'event_reg_limit', $reg_limit);
						update_post_meta($post_id, 'event_start_time', time_to_24hr($start_time));
						update_post_meta($post_id, 'event_end_time', time_to_24hr($end_time));
						update_post_meta($post_id, 'event_registration_start', $registration_start);
						update_post_meta($post_id, 'event_registration_end', $registration_end);
						update_post_meta($post_id, 'event_registration_startT', $registration_startT);
						update_post_meta($post_id, 'event_registration_endT', $registration_endT);
						update_post_meta( $post_id, 'timezone_string', $timezone_string );
					} else {
						$post_id = wp_insert_post($my_post);
						add_post_meta($post_id, 'event_id', $event_id);
						add_post_meta($post_id, 'event_identifier', $event_identifier);
						add_post_meta($post_id, 'event_start_date', $start_date);
						add_post_meta($post_id, 'event_end_date', $end_date);
						add_post_meta($post_id, 'event_location', $event_location);
						add_post_meta($post_id, 'virtual_url', $virtual_url);
						add_post_meta($post_id, 'virtual_phone', $virtual_phone);
						//
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
						//add_post_meta( $post_id, 'timezone_string', $timezone_string );
					}

					// Store the POST ID so it can be displayed on the edit page
					$sql = array('post_id' => $post_id, 'post_type' => $post_type);
					$sql_data = array('%d', '%s');
					$update_id = array('id' => $event_id);
					$wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d'));

					break;
			}

			//Show the saved event notice
			global $notices;
			$notices['updates'][] = __('Event details updated for', 'event_espresso') . ' <a href="' . espresso_reg_url($event_id) . '" target="_blank">' . stripslashes_deep($_REQUEST['event']) . ' ' . $start_date;
			do_action('action_hook_espresso_admin_notices');

			/*
			 * Added for seating chart addon
			 */
			if (isset($seating_chart_result) && $seating_chart_result === false) {
				?>
				<p><?php _e('Failed to associate new seating chart with this event. (Seats from current seating chart might have been used by some attendees)', 'event_espresso'); ?></p>
				<?php
			}
			/*
			 * End
			 */
		}

		/*
		 * With the recursion of this function, additional recurring events will be updated
		 */
		if (isset($recurrence_dates) && count($recurrence_dates) > 0 && $_POST['recurrence_apply_changes_to'] > 1) {
			//$recurrence_dates = array_shift($recurrence_dates); //Remove the first item from the array since it will be added after this recursion
			foreach ($recurrence_dates as $r_d) {

				if ($r_d['event_id'] != '' && count($r_d) > 2) {
					update_event(
									array(
											'event_id' => $r_d['event_id'],
											'event_identifier' => $r_d['event_identifier'],
											'recurrence_id' => $r_d['recurrence_id'],
											'recurrence_start_date' => $r_d['start_date'],
											'recurrence_event_end_date' => $r_d['event_end_date'],
											'registration_start' => $r_d['registration_start'],
											'registration_end' => $r_d['registration_end'],
											'visible_on' => $r_d['visible_on']
					));
				}
			}
		}
		/*
		 * End recursion, as part of recurring events.
		 */

		//Empty the event cache
		espresso_reset_cache($event_id);
		return $event_id;
	}// end nonce check
	return FALSE;
}

// end 'update_event'
