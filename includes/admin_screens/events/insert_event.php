<?php

// Adds an Event or Function to the Event Database
function add_event_to_db( ) {

	//Delete the transients that may be set
	espresso_reset_cache();

/* @var $espresso_wp_user type array*/
	global $wpdb, $espresso_wp_user, $espresso_premium;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	if (check_admin_referer('espresso_form_check', 'ee__event_editor')) {

		$wpdb->show_errors();

		$event_meta = array(); //will be used to hold event meta data
		//If the Espresso Facebook Events is installed, add the event to Facebook
		//$fb = new FacebookEvents();
		//echo $fb->espresso_createevent();
		//echo $_POST['event'];
		$wp_user_id = empty($_REQUEST['wp_user']) ? $espresso_wp_user : $_REQUEST['wp_user'][0];
		if ($wp_user_id == 0) {
			$wp_user_id = 1;
		}

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
		if (!empty($_REQUEST['venue_id'][0]) || !empty($_REQUEST['zip']) || !empty($_REQUEST['city']) || !empty($_REQUEST['state'])) {
			$event_meta['enable_for_gmap'] = $_REQUEST['enable_for_gmap'];
		} else {
			$event_meta['enable_for_gmap'] = false;
		}

		//$event_location = $address . ' ' . $city . ', ' . $state . ' ' . $zip;
		$event_location = ($address != '' ? $address . ' ' : '') . ($address2 != '' ? '<br />' . $address2 : '') . ($city != '' ? '<br />' . $city : '') . ($state != '' ? ', ' . $state : '') . ($zip != '' ? '<br />' . $zip : '') . ($country != '' ? '<br />' . $country : '');
		$reg_limit = $_REQUEST['reg_limit'];
		$allow_multiple = $_REQUEST['allow_multiple'];
		$additional_limit = $_REQUEST['additional_limit'];
		$member_only = isset($_REQUEST['member_only']) ? $_REQUEST['member_only'] : '';
		$is_active = $_REQUEST['is_active'];
		$event_status = $_REQUEST['new_event_status'];
		$ticket_id = empty($_REQUEST['ticket_id']) ? '' : $_REQUEST['ticket_id'];
		$certificate_id = empty($_REQUEST['certificate_id']) ? '' : $_REQUEST['certificate_id'];

		//Early discounts
		$early_disc = $_REQUEST['early_disc'];
		$early_disc_date = $_REQUEST['early_disc_date'];
		$early_disc_percentage = $_REQUEST['early_disc_percentage'];

		$use_coupon_code = $_REQUEST['use_coupon_code'];
		$alt_email = $_REQUEST['alt_email'];

		$confirmation_email_id = $_REQUEST['confirmation_email_id'];
		$payment_email_id = $_REQUEST['payment_email_id'];
		//Venue Information
		$venue_title = empty($_REQUEST['venue_title']) ? '' : $_REQUEST['venue_title'];
		$venue_url = empty($_REQUEST['venue_url']) ? '' : $_REQUEST['venue_url'];
		$venue_phone = empty($_REQUEST['venue_phone']) ? '' : $_REQUEST['venue_phone'];
		$venue_image = empty($_REQUEST['venue_image']) ? '' : $_REQUEST['venue_image'];

		//Virtual location
		$virtual_url = $_REQUEST['virtual_url'];
		$virtual_phone = $_REQUEST['virtual_phone'];

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
		//Event name
		$event_name = empty($_REQUEST['event']) ? uniqid($espresso_wp_user . '-') : htmlentities( wp_strip_all_tags( $_REQUEST['event'] ), ENT_QUOTES, 'UTF-8');

		//Create the event code and prefix it with the user id
		$event_code = uniqid($espresso_wp_user . '-');

		//Create the event identifier with the event code appended to the end
		$event_identifier = (empty($_REQUEST['event_identifier'])) ? $event_identifier = sanitize_title_with_dashes($event_name . '-' . $event_code) : $event_identifier = sanitize_title_with_dashes($_REQUEST['event_identifier']) . $event_code;

		//Create the event slug
		$event_slug = ($_REQUEST['slug'] == '') ? sanitize_title_with_dashes($event_name) : sanitize_title_with_dashes($_REQUEST['slug']);

		//When adding colums to the following arrays, be sure both arrays have equal values.
		$sql = array(
				'event_code' => $event_code,
				'event_name' => $event_name,
				'event_desc' => $event_desc,
				'display_desc' => $display_desc,
				'display_reg_form' => $display_reg_form,
				'event_identifier' => $event_identifier,
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
				'event_meta' => $event_meta,
				'require_pre_approval' => $require_pre_approval,
				'submitted' => date('Y-m-d H:i:s', time()),
				'reg_limit' => $reg_limit,
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
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%d', '%d', '%d', '%d',
				'%d', '%d', '%d'
		);

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

		do_action('action_hook_espresso_insert_event_add_ons');
		############# MailChimp Integration ##############
		if (get_option('event_mailchimp_active') == 'true' && $espresso_premium == true) {
			MailChimpController::add_event_list_rel($last_event_id);
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

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
		$DTM = EEM_Datetime::instance();

//		printr( $_REQUEST['event_datetimes'] ); die();

		$q = 1;
		foreach ($_REQUEST['event_datetimes'] as $event_datetime) {
		
			$event_datetime['evt_end'] = ( isset($event_datetime['evt_end']) && $event_datetime['evt_end'] != '' ) ? $event_datetime['evt_end'] : $event_datetime['evt_start'];
			$event_datetime['reg_end'] = ( isset($event_datetime['reg_end']) && $event_datetime['reg_end'] != '' ) ? $event_datetime['reg_end'] : $event_datetime['reg_start'];
						
			$insert = array(
							'EVT_ID'					=> $last_event_id,
							'DTT_EVT_start'		=> strtotime( $event_datetime['evt_start'] ),
							'DTT_EVT_end' 		=> strtotime( $event_datetime['evt_end'] ),
							'DTT_REG_start' 		=> strtotime( $event_datetime['reg_start'] ),
							'DTT_REG_end' 		=> strtotime( $event_datetime['reg_end'] ),
							'DTT_is_primary' 	=> $q == 1 ? TRUE : FALSE,							
							/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
							'DTT_reg_limit' 		=>( isset( $event_datetime['reg_limit'] ) && $event_datetime['reg_limit'] != 0 ) ? $event_datetime['reg_limit'] : NULL,
							'DTT_tckts_left' 	=>( isset( $event_datetime['tckts_left'] ) && $event_datetime['tckts_left'] != 0 ) ? $event_datetime['tckts_left'] : NULL,*/
					);

			$DTM->insert($insert);
			
			if ( $q == 1 ) {
				$evt_date = date( 'F j, Y  g:i a', strtotime( $event_datetime['evt_start'] ));	
			}			
			
			$q++;
		}




		
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
						if ( isset( $quick_edit_ticket_price[$PRC_ID] ) && is_array( $quick_edit_ticket_price[$PRC_ID] )) {
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
												absint($last_event_id),
												$ticket_price['PRC_amount'],
												$ticket_price['PRC_name'],
												$ticket_price['PRC_desc'],
												 /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
												$ticket_price['PRC_reg_limit'],
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
												$ticket_price['PRC_deleted']
				);

//                    echo printr( $ticket_price, '$ticket_price' );
//                    echo printr( $new_price, '$new_price' );

				$results = $new_price->insert();

			}
		}

		
		
		

		/// Create Event Post Code Here
		if ( isset( $_REQUEST['create_post'] ) && $_REQUEST['create_post'] == 1 ) {

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
			add_post_meta($post_id, 'slug', $event_slug);
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

			$sql_data = array('%d', '%s');
			$update_id = array('id' => $last_event_id);
			$wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d'));
		}

		
		if (empty($error)) {	
			
			// overwrite default success messages
			EE_Error::overwrite_success();
			//$edit_event_link = add_query_arg(array('action' => 'edit_event', 'event_id' => $last_event_id ), EVENTS_ADMIN_URL);
			
			$msg = sprintf( 
					__( 'The event %s has been added for %s.', 'event_espresso' ), 
					'<a href="' . espresso_reg_url($last_event_id) . '">' . stripslashes_deep($_REQUEST['event']) . '</a>', 
					$evt_date 
			);
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );

		} else { 		

			$msg = sprintf( 
					__( 'An error occured and the event %s has not been saved to the database.', 'event_espresso' ), 
					'<a href="' . espresso_reg_url($last_event_id) . '">' . stripslashes_deep($_REQUEST['event']) . '</a>' 
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			
		}

		return $last_event_id;
	}
	// end nonce check
}

//End add_event_funct_to_db()
