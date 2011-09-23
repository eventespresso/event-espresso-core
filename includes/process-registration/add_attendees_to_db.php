<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed'); 
if (!function_exists('event_espresso_add_attendees_to_db')) {

    //This entire function can be overridden using the "Custom Files" addon
    function event_espresso_add_attendees_to_db($event_id = NULL, $session_vars = NULL) {
        global $wpdb, $org_options, $espresso_premium;
		//print_r($session_vars);

        $data_source = $_POST;
        $att_data_source = $_POST;
        $multi_reg = false;
        static $attendee_number = 1; //using this var to keep track of the first attendee
        static $loop_number = 1;
        if (!is_null($event_id) && !is_null($session_vars)) {
            $data_source = $session_vars['data']; //event details, ie qty, price, start..
            $att_data_source = $session_vars['event_attendees']; //event attendee info ie name, questions....
            $multi_reg = true;
        } else {
            $event_id = $data_source['event_id'];
        }

		//echo '<p>$att_data_source = ';print_r( $att_data_source); echo '</p>';
        static $temp_event_id = ''; // Will be used for multi events to
									// keep track of evant id change in the loop,
									// for recording event total cost for each group

        if ($temp_event_id == '' || $temp_event_id != $event_id) {
            $temp_event_id = $event_id;
            $event_change = 1;
            $total_cost = isset($data_source['cost']) ? $data_source['cost'] : 0;
        } else {
            $event_change = 0;
            $total_cost = 0;
        }

        // echo "<pre>", print_r($data_source), "</pre>";
        //echo "<pre>", print_r($att_data_source), "</pre>";
        // exit;
        $Organization = $org_options['organization'];
        $Organization_street1 = $org_options['organization_street1'];
        $Organization_street2 = $org_options['organization_street2'];
        $Organization_city = $org_options['organization_city'];
        $Organization_state = $org_options['organization_state'];
        $Organization_zip = $org_options['organization_zip'];
        $contact = $org_options['contact_email'];
        $contact_email = $org_options['contact_email'];
        $paypal_id = $org_options['paypal_id'];
        $paypal_cur = isset($org_options['currency_format']) ? $org_options['currency_format'] : '';
        $return_url = $org_options['return_url'];
        $cancel_return = $org_options['cancel_return'];
        $notify_url = $org_options['notify_url'];

        $default_mail = $org_options['default_mail'];
        $conf_message = $org_options['message'];
        $email_before_payment = $org_options['email_before_payment'];

        $fname = isset($att_data_source['fname']) ? $att_data_source['fname'] : '';
        $lname = isset($att_data_source['lname']) ? $att_data_source['lname'] : '';
        $address = isset($att_data_source['address']) ? $att_data_source['address'] : '';
        $address2 = isset($att_data_source['address2']) ? $att_data_source['address2'] : '';
        $city = isset($att_data_source['city']) ? $att_data_source['city'] : '';
        $state = isset($att_data_source['state']) ? $att_data_source['state'] : '';
        $zip = isset($att_data_source['zip']) ? $att_data_source['zip'] : '';
        $phone = isset($att_data_source['phone']) ? $att_data_source['phone'] : '';
        $email = isset($att_data_source['email']) ? $att_data_source['email'] : '';
        //$num_people = $data_source ['num_people'];
        $amount_pd = isset($data_source["event_cost"]) && $data_source["event_cost"] != '' ? $data_source["event_cost"] : 0.00;
		//echo $amount_pd;
		//return;

        $questions = $wpdb->get_row("SELECT question_groups, event_meta FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'");

        $event_meta = unserialize($questions->event_meta);
        $questions = unserialize($questions->question_groups);

        //$payment = $data_source['payment'];
        //Figure out if the person has registered using a price selection
        if ($multi_reg) 
        {
            $event_cost = $_SESSION['event_espresso_grand_total'];
            $amount_pd = $attendee_number == 1 ? $event_cost : 0.00;
            $coupon_code = $attendee_number == 1 ? $_SESSION['event_espresso_coupon_code'] : '';
            $price_type = (isset($data_source['price_type'])) ? $data_source['price_type'] : espresso_ticket_information(array('type' => 'ticket', 'price_option' => $data_source['price_id']));
            $attendee_number++;
        } 
        elseif (isset($data_source['price_select']) && $data_source['price_select'] == true) 
        {
            $price_options = explode('|', $data_source['price_option'], 2);
            $price_id = $price_options[0];
            $price_type = $price_options[1];
            $event_cost = event_espresso_get_final_price($price_id, $event_id);
			/*echo '$event_id = '.$event_id.'<br />';
			echo '$price_id = '.$price_id.'<br />';
			echo '$event_cost = '.$event_cost;
		return;*/
        } 
        else 
        {
            $event_cost = isset($data_source['price_id']) ? event_espresso_get_final_price($data_source['price_id'], $event_id) : 0.00;
            $coupon_code = '';
            $price_type = isset($data_source['price_id']) ? espresso_ticket_information(array('type' => 'ticket', 'price_option' => $data_source['price_id'])) : '';
        }


        //Display the confirmation page
        if (!empty($data_source['confirm_registration'])) 
        {
            $registration_id = $data_source['registration_id'];
            echo espresso_confirm_registration($registration_id);
            return;
        }

        //Check to see if the registration id already exists
        $incomplete_filter = !$multi_reg ? " AND payment_status ='Incomplete'" : '';
        $check_sql = $wpdb->get_results("SELECT attendee_session, id, registration_id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE attendee_session ='" . $_SESSION['espresso_session_id'] . "' AND event_id ='" . $event_id . "' $incomplete_filter");
        $num_rows = $wpdb->num_rows;

        $registration_id = empty($wpdb->last_result[0]->registration_id) ? $registration_id = uniqid('', true) : $wpdb->last_result[0]->registration_id;
		
		$txn_type = "";
        
		if (isset($data_source['admin'])) 
        {
            $payment_status = "Completed";
            $payment = "Admin";
			$txn_type = __('Added by Admin', 'event_espresso');
            $payment_date = date("m-d-Y");
            $amount_pd = $data_source["event_cost"] == '' ? 0.00 : $data_source["event_cost"];
            $registration_id = uniqid('', true);
            $_SESSION['espresso_session_id'] = '';
        } 
        else 
        {

            if ($org_options['use_captcha'] == 'Y' && !$multi_reg && !is_user_logged_in()) {//Recaptcha portion
                //require_once('includes/recaptchalib.php');
                if (!function_exists('recaptcha_check_answer')) {
                    require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/recaptchalib.php');
                }
                $resp = recaptcha_check_answer($org_options['recaptcha_privatekey'], $_SERVER["REMOTE_ADDR"], $data_source["recaptcha_challenge_field"], $data_source["recaptcha_response_field"]);
                if (!$resp->is_valid) {
                    echo '<div class="attention-icon"><p class="event_espresso_attention"><strong>' . __('Sorry, you did not enter the correct anti-spam phrase. Please click your browser\'s back button and try again.', 'event_espresso') . '</strong></p></div>';
                    return;
                }
            }

            //print_r( $event_meta);
            $default_payment_status = $event_meta['default_payment_status'] != '' && ($org_options['default_payment_status'] != $event_meta['default_payment_status']) ? $event_meta['default_payment_status'] : $org_options['default_payment_status'];

            $payment_status = ($multi_reg && $data_source['cost'] == 0) ? "Completed" : $default_payment_status;
            $payment = '';
        }

        $times_sql = "SELECT ese.start_time, ese.end_time, e.start_date, e.end_date ";
        $times_sql .= "FROM " . EVENTS_START_END_TABLE . " ese ";
        $times_sql .= "LEFT JOIN " . EVENTS_DETAIL_TABLE . " e ON ese.id WHERE ";
        if(!empty($data_source['start_time_id']))
		{
			$times_sql .= "ese.id='" . $data_source['start_time_id'] . "' AND ";
		}
        $times_sql .= "e.id='" . $event_id . "' ";

        $times = $wpdb->get_results($times_sql);
        foreach ($times as $time) {
            $start_time = $time->start_time;
            $end_time = $time->end_time;
            $start_date = $time->start_date;
            $end_date = $time->end_date;
        }


        //If we are using the number of attendees dropdown, add that number to the DB
        //echo $data_source['espresso_addtl_limit_dd'];
        if (isset($data_source['espresso_addtl_limit_dd']))
		{
            $num_people = $data_source ['num_people'];
		}

        if (isset($event_meta['additional_attendee_reg_info']) && $event_meta['additional_attendee_reg_info'] == 1)
		{
            $num_people = $data_source ['num_people'];
        } else {
            $num_people = 1;
        }

        $start_time = empty($start_time) ? '' : $start_time;
        $end_time = empty($end_time) ? '' : $end_time;
        $start_date = empty($start_date) ? '' : $start_date;
        $end_date = empty($end_date) ? '' : $end_date;
        $organization_name = empty($organization_name) ? '' : $organization_name;
        $country_id = empty($country_id) ? '' : $country_id;
        $payment_date = empty($payment_date) ? '' : $payment_date;
        $coupon_code = empty($coupon_code) ? '' : $coupon_code;

        $sql = array('registration_id' => $registration_id, 'attendee_session' => $_SESSION['espresso_session_id'], 'lname' => $lname, 'fname' => $fname, 'address' => $address, 'address2' => $address2, 'city' => $city, 'state' => $state, 'zip' => $zip, 'email' => $email, 'phone' => $phone, 'payment' => $payment, 'amount_pd' => $amount_pd, 'total_cost' => $total_cost, 'txn_type' => $txn_type, 'coupon_code' => $coupon_code, 'event_time' => $start_time, 'end_time' => $end_time, 'start_date' => $start_date, 'end_date' => $end_date, 'price_option' => $price_type, 'organization_name' => $organization_name, 'country_id' => $country_id, 'payment_status' => $payment_status, 'payment_date' => $payment_date, 'event_id' => $event_id, 'quantity' => $num_people);
        $sql_data = array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s',
            '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%d');

        //Debugging output
        /* echo 'Debug: <br />';
          print_r($sql);
          echo '<br />';
          print 'Number of vars: ' . count ($sql);
          echo '<br />';
          print 'Number of cols: ' . count($sql_data); */

        if ($num_rows > 0 && $loop_number == 1) 
        {
            if (!isset($data_source['admin']))
            {
				/*
				 * Added for seating chart addon
				 */
				$tmp_session = $_SESSION['espresso_session_id'];
				$rem_attendee_ids = $wpdb->get_results(" select t1.id, t1.registration_id FROM " . EVENTS_ATTENDEE_TABLE . "  t1 WHERE t1.attendee_session ='" . $_SESSION['espresso_session_id'] . "'  $incomplete_filter ");
				foreach($rem_attendee_ids as $v)
				{

					if ( defined('ESPRESSO_SEATING_CHART') )
					{
						$wpdb->query("delete from ".EVENTS_SEATING_CHART_EVETN_SEAT_TABLE." where attendee_id = ".$v->id);
					}
				}
				/*
				 * End
				 */
                $wpdb->query(" DELETE t1, t2 FROM " . EVENTS_ATTENDEE_TABLE . "  t1 JOIN  " . EVENTS_ANSWER_TABLE . " t2 on t1.id = t2.attendee_id WHERE t1.attendee_session ='" . $_SESSION['espresso_session_id'] . "'  $incomplete_filter ");
			}

            //Added by Imon
            // First delete attempt might fail if there is no data in answer table. So, second attempt without joining answer table is taken bellow -
            $wpdb->query(" DELETE t1 FROM " . EVENTS_ATTENDEE_TABLE . "  t1 WHERE t1.attendee_session ='" . $_SESSION['espresso_session_id'] . "'  $incomplete_filter ");

            // Clean up any attendee information from attendee_cost table where attendee is not available in attendee table
            event_espresso_cleanup_multi_event_registration_id_group_data();
            event_espresso_cleanup_attendee_cost_data();

        }
        $loop_number++;

        //Add new or updated data
        if (!$wpdb->insert(EVENTS_ATTENDEE_TABLE, $sql, $sql_data)) 
        {
            $error = true;
        }

        $attendee_id = $wpdb->insert_id;

		/*
		 * Added for seating chart addon
		 */
        $booking_id = 0;
		if ( defined('ESPRESSO_SEATING_CHART') )
		{
			if ( seating_chart::check_event_has_seating_chart($event_id) !== false )
			{
				if ( isset($_POST['seat_id']) )
				{
					$booking_id = seating_chart::parse_booking_info($_POST['seat_id']);
					if ( $booking_id > 0 )
					{
						seating_chart::confirm_a_seat($booking_id,$attendee_id);
					}
				}
			}
		}
		/*
		 *
		 */



		//Add a record for the primary attendee
		$sql = array('attendee_id' => $attendee_id,'meta_key' => 'primary_attendee','meta_value' => 1 );
		$sql_data = array('%s','%s','%s');
		 //Debugging output
         /*echo 'Debug: <br />';
          print_r($sql);
          echo '<br />';
          print 'Number of vars: ' . count ($sql);
          echo '<br />';
          print 'Number of cols: ' . count($sql_data); */
		if (!$wpdb->insert(EVENTS_ATTENDEE_META_TABLE, $sql, $sql_data)) {
            $error = true;
        }


        //Added by Imon
		/**
		 * Adding attenddee specific cost to events_attendee_cost table
		 */
		if (!isset($data_source['admin']))
		{
            
			if ( isset($att_data_source['price_id']) )
            {
				$attendee_price_id = $att_data_source['price_id'];
				$events_prices = $wpdb->get_row("select * from ".EVENTS_PRICES_TABLE."  where id = $attendee_price_id ");
			}
            elseif (isset($data_source['price_select']) && $data_source['price_select'] == true) 
            {
				$price_options 	= explode('|', $data_source['price_option'], 2);
				$attendee_price_id 		= $price_options[0];
				$events_prices = $wpdb->get_row("select * from ".EVENTS_PRICES_TABLE."  where id = $attendee_price_id ");
			}
            else
            {
				$events_prices = $wpdb->get_row("select * from ".EVENTS_PRICES_TABLE." where event_id = $event_id");
				$attendee_price_id = $events_prices->id;
			}
            /*
             * Added for seating chart add-on
             * If a seat was selected then price of that seating will be used instead of event price
             */
            $attendee_quantity = 1;
            if ( isset($data_source['seat_id']))
            {
                $attendee_cost = seating_chart::get_purchase_price($booking_id);
            }
            else
            {

                $attendee_cost = $events_prices->event_cost + (($events_prices->surcharge_type=='pct')?$events_prices->event_cost * (float)($events_prices->surcharge/100.00):$events_prices->surcharge);
                /*echo  '<strong>Standard Pricing</strong>'.'<br />';
                echo  '$events_prices->event_cost = '.$events_prices->event_cost.'<br />';
                echo  '$events_prices->surcharge = '.$events_prices->surcharge.'<br />';
                echo  '$events_prices->surcharge_type = '.$events_prices->surcharge_type.'<br />';
                echo  '$attendee_cost = '.$attendee_cost.'<br />';
                return;*/

                if ( is_user_logged_in() )
                {
                    $attendee_cost = $events_prices->member_price + (($events_prices->surcharge_type=='pct')?$events_prices->member_price * (float)($events_prices->surcharge/100.00):$events_prices->surcharge);
                    /*echo  '<strong>Member Pricing</strong>'.'<br />';
                    echo  '$events_prices->event_cost = '.$events_prices->event_cost.'<br />';
                    echo  '$events_prices->surcharge = '.$events_prices->surcharge.'<br />';
                    echo  '$events_prices->surcharge_type = '.$events_prices->surcharge_type.'<br />';
                    echo  '$attendee_cost = '.$attendee_cost.'<br />';
                    //return;*/
                }
                if ( isset($data_source['num_people']) )
                {
                    $attendee_quantity = $data_source['num_people'];
                }
            }
			
		}
        else
        {
			/*echo  '$data_source[\'event_cost\'] = '.$data_source['event_cost'];
			return;*/
			$attendee_quantity = 1;
			$attendee_cost = $data_source['event_cost'];
		}
		$attendee_cost_data = array("attendee_id"=>$attendee_id,"quantity"=>$attendee_quantity,"cost"=>$attendee_cost);
		/*echo '$attendee_cost_data = ';
		print_r($attendee_cost_data);
		return;*/
		$wpdb->insert(EVENTS_ATTENDEE_COST_TABLE,$attendee_cost_data);

		/**
		 * End
		 */


        if (get_option('event_mailchimp_active') == 'true' && $espresso_premium == true) {
            MailChimpController::list_subscribe($event_id, $attendee_id, $fname, $lname, $email);
        }

        //Since main attendee and additional attendees may have different questions,
        //$attendee_number check for 2 because is it statically set at 1 first and is incremented for the primary attendee above, hence 2
        $questions = ($attendee_number > 2 && isset($event_meta['add_attendee_question_groups'])) ? $event_meta['add_attendee_question_groups'] : $questions;

        add_attendee_questions($questions, $registration_id, $attendee_id, array('session_vars' => $att_data_source));

        //Add additional attendees to the database
        if ($event_meta['additional_attendee_reg_info'] == 1) {
            if (!empty($_REQUEST['num_people']) && $_REQUEST['num_people'] > 1) {

            }
        } else {
            if (isset($att_data_source['x_attendee_fname'])) {
                $amount_pd = 0.00; //additional attendee can't hold this info
                foreach ($att_data_source['x_attendee_fname'] as $k => $v) {
                    if (trim($v) != '' && trim($att_data_source['x_attendee_lname'][$k]) != '') {

						/*
						 * Added for seating chart addon
						 */
						$seat_check = true;
						$x_booking_id = 0;
						if ( defined('ESPRESSO_SEATING_CHART') )
                        {
							if ( seating_chart::check_event_has_seating_chart($event_id) !== false )
                            {
								if ( !isset($att_data_source['x_seat_id'][$k]) || trim($att_data_source['x_seat_id'][$k]) == '' )
                                {
									$seat_check = false;
								}
                                else
                                {
									$x_booking_id = seating_chart::parse_booking_info($att_data_source['x_seat_id'][$k]);
									if ( $x_booking_id > 0 )
                                    {
										$seat_check = true;
									}
                                    else
                                    {
										$seat_check = false;//Keeps the syustem from adding an additional attndee if no seat is selected
									}
								}
							}
						}
						if ( $seat_check ){
						/*
						 * End
						 */


                        $sql_a = array('registration_id' => $registration_id, 'attendee_session' => $_SESSION['espresso_session_id'], 'lname' => $att_data_source['x_attendee_lname'][$k], 'fname' => $v, 'email' => $att_data_source['x_attendee_email'][$k], 'address' => $address, 'address2' => $address2, 'city' => $city, 'state' => $state, 'zip' => $zip, 'phone' => $phone, 'payment' => $payment, 'amount_pd' => $amount_pd, 'event_time' => $start_time, 'end_time' => $end_time, 'start_date' => $start_date, 'end_date' => $end_date, 'price_option' => $price_type, 'organization_name' => $organization_name, 'country_id' => $country_id, 'payment_status' => $payment_status, 'payment_date' => $payment_date, 'event_id' => $event_id, 'quantity' => $num_people);
                        $sql_data_a = array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s',
                            '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%d');
                        $wpdb->insert(EVENTS_ATTENDEE_TABLE, $sql_a, $sql_data_a);
                        //Added by Imon
                        $ext_attendee_id= $wpdb->insert_id;
						$mailchimp_attendee_id  = $ext_attendee_id;

						/**
						 * Adding attenddee specific cost to events_attendee cost table
						 */

						$attendee_cost_data = array("attendee_id"=>$ext_attendee_id,"quantity"=>$attendee_quantity,"cost"=>$attendee_cost);
						$wpdb->insert(EVENTS_ATTENDEE_COST_TABLE,$attendee_cost_data);
						/**
						 * End
						 */

                        if (get_option('event_mailchimp_active') == 'true' && $espresso_premium == true) {
                            MailChimpController::list_subscribe($event_id, $mailchimp_attendee_id, $v, $att_data_source['x_attendee_lname'][$k], $att_data_source['x_attendee_email'][$k]);
                        }
                        //Added by Imon
						$ext_att_data_source = array('registration_id' => $registration_id, 'attendee_session' => $_SESSION['espresso_session_id'], 'lname' => $att_data_source['x_attendee_lname'][$k], 'fname' => $v, 'email' => $att_data_source['x_attendee_email'][$k], 'address' => $address, 'address2' => $address2, 'city' => $city, 'state' => $state, 'zip' => $zip, 'phone' => $phone, 'payment' => $payment, 'amount_pd' => $amount_pd, 'event_time' => $start_time, 'end_time' => $end_time, 'start_date' => $start_date, 'end_date' => $end_date, 'price_option' => $price_type, 'organization_name' => $organization_name, 'country_id' => $country_id, 'payment_status' => $payment_status, 'payment_date' => $payment_date, 'event_id' => $event_id, 'quantity' => $num_people);
                        echo add_attendee_questions($questions, $registration_id, $ext_attendee_id, array('session_vars' => $ext_att_data_source));

						/*
						 * Added for seating chart addon
						 */
						}

						if ( defined('ESPRESSO_SEATING_CHART') ){
							if ( seating_chart::check_event_has_seating_chart($event_id) !== false && $x_booking_id > 0){
								seating_chart::confirm_a_seat($x_booking_id,$ext_attendee_id);
							}
						}
						/*
						 * End
						 */
                    }
                }
            }
        }


        //Add user data if needed
        if (get_option('events_members_active') == 'true') 
        {
            require_once(EVENT_ESPRESSO_MEMBERS_DIR . "member_functions.php"); //Load Members functions
            require_once(EVENT_ESPRESSO_MEMBERS_DIR . "user_vars.php"); //Load Members functions
            if ($userid != 0) 
            {
                event_espresso_add_user_to_event($event_id, $userid, $attendee_id);
            }
        }
        //This shows the payment page
        if (isset($data_source['admin']))
        {
            return $attendee_id;
        }

        //return event_espresso_payment_confirmation($attendee_id);
        if (!$multi_reg)
        {
            return events_payment_page($attendee_id);
        }

		return $registration_id;
    }

}

if (!function_exists('event_espresso_add_attendees_to_db_multi')) {


    //This function is called from the shopping cart

    function event_espresso_add_attendees_to_db_multi() {
        global $wpdb, $org_options;

        //Added by Imon
        $primary_registration_id = NULL;

        $events_in_session = $_SESSION['events_in_session'];
        if (event_espresso_invoke_cart_error($events_in_session))
            return false;

        $count_of_events = count($events_in_session);
        $current_session_id = $_SESSION['espresso_session_id'];
        //echo "<pre>", print_r($_SESSION), "</pre>";
        //echo "<pre>", print_r($events_in_session), "</pre>";
        //echo "<pre>", print_r($org_options), "</pre>";

        $event_name = $count_of_events . ' ' . $org_options['organization'] . __(' events', 'event_espresso');

        $event_cost = $_SESSION['event_espresso_grand_total'];
        $multi_reg = true;

        // If there are events in the session, add them one by one to the attendee table
        if ($count_of_events > 0) {
            //first event key will be used to find the first attendee
            $first_event_id = key($events_in_session);
			/*echo '$events_in_session = ';
			print_r($events_in_session);
			echo '<br />';*/
            reset($events_in_session);
            foreach ($events_in_session as $key => $_event_id) {
                # print_r($_POST);
                $event_meta = event_espresso_get_event_meta($key);
                $event_attendees = $_event_id['event_attendees'];
                $session_vars['data'] = $_event_id;
                if (is_array($event_attendees)) {
                    $counter = 1;
                    foreach ($event_attendees as $k_price_id => $v_attendees) { //foreach price type in event attendees
                        $session_vars['data'] = $_event_id;
                        foreach ($v_attendees as $vkey => $vval) {
							//Added by Imon
							$vval['price_id'] = $k_price_id;
                            $session_vars['event_attendees'] = $vval; //this has all the attendee information, name, questions....
                            $session_vars['data']['price_type'] = $_event_id['price_id'][$k_price_id]['price_type'];
                            if (isset($event_meta['additional_attendee_reg_info']) && $event_meta['additional_attendee_reg_info'] == 1)
                            {
                                $session_vars['data']['num_people'] = empty($_REQUEST['num_people']) ? 1 : $_REQUEST['num_people'];
                            }
							//Added/Updated by Imon
							/*echo $key.'<br />';
							echo '$session_vars = ';
							print_r($session_vars);
							echo '<br />';*/
							$tmp_registration_id = event_espresso_add_attendees_to_db($key, $session_vars);
							//echo 'tmp_registration_id =' . $tmp_registration_id.'<br />';
							if ( $primary_registration_id === NULL )
                            {
								$primary_registration_id = $tmp_registration_id;
							}
							$c2_sql = "select * from ".EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE." where primary_registration_id = '$primary_registration_id' and registration_id = '$tmp_registration_id'";
							//echo $c2_sql.'<br />';
							$check = $wpdb->get_row($c2_sql);
							if ( $check === NULL )
                            {
								$tmp_data = array("primary_registration_id"=>$primary_registration_id,"registration_id"=>$tmp_registration_id);
								$wpdb->insert(EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE,$tmp_data);
							}
                        }
                        $counter++;
                    }
                }
            }

            //Post the gateway page with the payment options
            if ($event_cost != '0.00') {
                //find first registrant's name, email, count of registrants
                $sql = "SELECT id, fname, lname, email, address, city, state, zip, event_id, registration_id,
                        (SELECT count( id )
                            FROM " . EVENTS_ATTENDEE_TABLE .
                        " WHERE attendee_session = '" . $wpdb->escape($current_session_id) . "'
                            ) AS quantity
                            FROM " . EVENTS_ATTENDEE_TABLE
                        . " WHERE event_id = " . $wpdb->escape($first_event_id)
                        . " AND attendee_session = '" . $wpdb->escape($current_session_id) . "' LIMIT 1";

						//echo $sql;

                $r = $wpdb->get_row($sql);
                $event_id = $r->event_id;
                $attendee_id = $r->id;
                $fname = $r->fname;
                $lname = $r->lname;
                $address = $r->address;
                $city = $r->city;
                $state = $r->state;
                $zip = $r->zip;
                $attendee_email = $r->email;
                $registration_id = $r->registration_id;
                $quantity = espresso_count_attendees_for_registration($r->registration_id);
                ?>

                <a href="?page_id=<?php echo $org_options['event_page_id']; ?>&regevent_action=show_shopping_cart">  <?php _e('Edit Cart', 'event_espresso'); ?> </a>
                <?php _e(' or ', 'event_espresso'); ?>
                <a href="?page_id=<?php echo $org_options['event_page_id']; ?>&regevent_action=load_checkout_page"> <?php _e('Edit Registrant Information', 'event_espresso'); ?></a>


                <h3><?php _e('Your registration is not complete until payment is received.', 'event_espresso'); ?></h3>

                <p><strong class="event_espresso_name">
                <?php _e('Amount due: ', 'event_espresso'); ?>
                    </strong> <span class="event_espresso_value"><?php echo $org_options['currency_symbol'] ?><?php echo $event_cost; ?></span></p>

                <p><?php echo $org_options['email_before_payment'] == 'Y' ? __('A confirmation email has been sent with additional details of your registration.', 'event_espresso') : ''; ?></p>

                <?php
                //Show payment options
                if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "gateway_display.php")) {
                    require_once(EVENT_ESPRESSO_GATEWAY_DIR . "gateway_display.php");
                } else {
                    require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/gateway_display.php");
                }
                //Check to see if the site owner wants to send an confirmation eamil before payment is recieved.
                if ($org_options['email_before_payment'] == 'Y') {
                    event_espresso_email_confirmations(array('session_id' => $_SESSION['espresso_session_id'], 'send_admin_email' => 'true', 'send_attendee_email' => 'true', 'multi_reg' => true));
                }
            } else {
                ?>

                <p><?php _e('Thank you! Your registration is confirmed for', 'event_espresso'); ?> <strong><?php echo stripslashes_deep($event_name) ?></strong></p>

                <p><?php _e('A confirmation email has been sent with additional details of your registration.', 'event_espresso'); ?></p>

                <?php
                event_espresso_email_confirmations(array('session_id' => $_SESSION['espresso_session_id'], 'send_admin_email' => 'true', 'send_attendee_email' => 'true', 'multi_reg' => true));

                event_espresso_clear_session();
            }
        }
    }

}
