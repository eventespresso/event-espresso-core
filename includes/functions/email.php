<?php

if ( !function_exists( 'event_espresso_email_confirmations' ) )
{

    //set_time_limit( 15 ); //just in case there is a loop error, we don't want to send a lot of emails


    function event_espresso_email_confirmations( $atts ) {

        /*
         * find the attendees based on session, or registration id, grouped by email
         * for each one of the attendees, find which events they belong to
         */
        //echo "<pre>", print_r($atts), "</pre>";
        extract( $atts );

        $registration_id = $registration_id != '' ? $registration_id : espresso_registration_id( $attendee_id );

        global $wpdb, $org_options;

		if( $abc = event_espresso_more_than_one($registration_id) ){
			$espresso_session_id = $abc;
		}
        $message_top = "<html><body>";
        $message_bottom = "</body></html>";


        // 1) find the events that have been registered for.

        $sql = "SELECT ed.*, ea.id as attendee_id ";
		isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= ", v.name venue_name, v.address venue_address, v.address2 venue_address2, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : ''; 
		
		$sql .= " FROM " . EVENTS_DETAIL_TABLE . " ed ";
		
		$sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " ea ON ed.id = ea.event_id ";
		isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = ed.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
		
		$sql .= " WHERE ";
		
        $sql .= ( isset( $espresso_session_id )) ? "  ea.attendee_session='" . $espresso_session_id . "'" : "  ea.registration_id='" . $registration_id . "'";
        
		$sql .= " GROUP BY ed.id";

        $_events = $wpdb->get_results( $sql, OBJECT_K );

//echo "<pre>", print_r($_events), "</pre>";
        // 2) Find the inforamtion for all the attendees.

        $sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE;

        if ( $registration_id != '' )
        {
            $sql .= " WHERE registration_id = '" . $registration_id . "' ";
        }
        elseif ( $attendee_id != '' )
        {
            $sql .= " WHERE id = '" . $attendee_id . "' ";
        }
        elseif ( $espresso_session_id != '' )
        {
            $sql .= " WHERE attendee_session = '" . $espresso_session_id . "' ";
        }
        else
        {
            return __( 'No ID Supplied', 'event_espresso' );
        }

        $sql .= " GROUP BY fname, lname, email, event_id, price_option ";

        $attendees = $wpdb->get_results( $sql . " ORDER BY email, id ", ARRAY_A );
        $start = 0;

        if ( $wpdb->num_rows == 0 )
            exit( __( 'No records found.', 'event_espresso' ) );

        $counter = 0;
        $num_rows = $wpdb->num_rows;

        /*
         * Temp solution put in place to find the primary attendee.
         * Since the query is sorted by email first, there is no way to know who the primary
         * attendee is After the payment is made.  So I am dropping in a query to get the very first attendee.
         * Using the same query as above
         */

        $primary_attendee_id = $wpdb->get_row( $sql . " ORDER BY id LIMIT 1 " );

        /*
         * end temp solution
         */


        $table_open = '<table width="100%" border="1" cellpadding = "5" cellspacing="5" style="border-collapse:collapse;">';
        $table_heading = "<tr><th>" . __( 'Event Name', 'event_espresso' ) . "</th><th>" . __( 'Date', 'event_espresso' ) . "</th><th>" . __( 'Time', 'event_espresso' ) . "</th><th>" . __( 'Location', 'event_espresso' ) . "</th></tr>";
        $table_close = "</table>";

        //Set up temp variables to keep track of the attendee email and the event grid
        $temp_email = '';
        $temp_event_table = '';
        $admin_email_body = '';
        $email_questions = '';
         
        // 3) cycle through each attendee record,
        //Using this loop method so that we can decrement $i when the email address changes (used for grouping).
        //Notice ARRAY_A in the query
        for ( $i = 0; $i < $num_rows; $i++ ) {

            extract( $attendees[$i], EXTR_PREFIX_ALL, "att" );

            //echo "$i >> $att_email <br>";

            if ( $temp_email == '' )
                $temp_email = $att_email;
			
			if ( $temp_att_id == '' )
                $temp_att_id = $att_id;


            if ( $temp_email == $att_email )
            {


                if ( array_key_exists( $att_event_id, $_events ) )
                {

                    $primary_attendee = '';

                    if ( $att_amount_pd != 0 && $start == 0 && $primary_attendee_id->id == $att_id  )
                    {
                        $amount_pd = $att_amount_pd;
                        //Build the payment link
                        $payment_url = get_option( 'siteurl' ) . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $att_registration_id . "&amp;id=" . $att_id;
                        $payment_link = '<a href="' . $payment_url . '">' . __( 'View Your Payment Details' ) . '</a>';
                        $start = 1;
                        $primary_attendee = __('(Primary Attendee)', 'event_espresso');
                    }
                    elseif ( $start == 1 )
                    {
                        $amount_pd = $amount_pd;
                        $payment_link = $payment_link;

                    }
                    else
                    {
                        $amount_pd = 'N/A';
                        $payment_link = '';
						$temp_att_id = $att_id;
                    }

                    $_event = $_events[$att_event_id];
					
					$event_address = $_event->address;
					$event_address2 = $_event->address2;
					$event_city = $_event->city;
					$event_state = $_event->state;
					$event_zip = $_event->zip;
					$event_country = $_event->country;
					//Venue information
					if ($org_options['use_venue_manager'] == 'Y') {
						$venue_name = $_event->venue_name;
						$event_address = $_event->venue_address;
						$event_address2 = $_event->venue_address2;
						$event_city = $_event->venue_city;
						$event_state = $_event->venue_state;
						$event_zip = $_event->venue_zip;
						$event_country = $_event->venue_country;
						$venue_meta = unserialize($_event->venue_meta);
						$_event->venue_url = $venue_meta['website'];
						$_event->venue_image = $venue_meta['image'];
						$_event->venue_phone = $venue_meta['phone'];
					}

                    $location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');
                    
					$google_map_link = espresso_google_map_link( array( 'address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country ) );
                    
					//Create PDF Invoice link
					$invoice_link = '<a href="'.home_url().'/?download_invoice=true&amp;attendee_id='.$att_id.'&amp;registration_id='. $att_registration_id .'" target="_blank">'. __('Download PDF Invoice', 'event_espresso').'</a>';
					
					//Create link to the event
					$event_url = home_url() . "/?page_id=" . $org_options['event_page_id']. "&regevent_action=register&event_id=". $_event->id;
					$event_link = '<a href="' . $event_url . '">' . stripslashes_deep($_event->event_name) . '</a>';
					
			$temp_event_table .= "
                            <tr>
                                <td>".stripslashes_deep($_event->event_name)." | $att_price_option</td>
                                <td>".event_date_display( $att_start_date ) . ' - ' . event_date_display( $att_end_date ) . "</td>
                                <td>".event_date_display($att_event_time, get_option('time_format'))." - ".event_date_display($att_end_time, get_option('time_format'))."</td>
                                <td>$venue_name<br />$location <br />$google_map_link</td>" .
                                  ($att_quantity>0?'<td>' . $att_quantity . __(' attendees', 'event_espresso') . '</td>':'') .

                           "</tr>";

				//If the custom ticket is available, load the template file
				if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")){
					if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php")){
						include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
						$qr_code = espresso_qr_code(array('attendee_id' => $att_id,'event_name' => stripslashes_deep($_event->event_name), 'attendee_first' => $att_fname, 'attendee_last'=> $att_lname, 'registration_id'=> $att_registration_id, 'event_code'=> $_event->event_code, 'ticket_type'=>$att_price_option, 'event_time'=>$att_event_time, 'amount_pd'=>$amount_pd));
					}
					$ticket_url = get_option( 'siteurl' ) . "/?download_ticket=true&amp;id=" . $att_id . "&amp;registration_id=" . $att_registration_id;
                    $ticket_link = '<strong><a href="' . $ticket_url . '">' . __( 'Download/Print Ticket' ) . '</a></strong>';
					$admin_ticket_link = "<p>".$ticket_link."</p>";
				}

                                if ( function_exists( 'event_espresso_custom_questions_output' ) ){
                                    //Create the question display
									$email_questions_r = event_espresso_custom_questions_output(array('attendee_id' => $att_id, 'all_questions'=>TRUE));
                                    if ($email_questions_r != '')
                                        $email_questions = '<tr><td colspan = "6">' . $email_questions_r . '</td></tr>';
                                        $temp_event_table .= $email_questions;
                                }


					   //Create a link to the attendee data in WP admin
					   $admin_attendee_link = '<a href="'.get_admin_url().'admin.php?page=events&event_admin_reports=edit_attendee_record&event_id='.$_event->id.'&form_action=edit_attendee&id='. $att_id . '">'.$att_fname. ' ' . $att_lname . '</a>';
					   
					   $admin_email_body .= "
                            <tr>
                                <td>$admin_attendee_link $primary_attendee</td>
                                <td>$att_email</td>
                                <td>" . stripslashes_deep($_event->event_name) . " | $att_price_option</td>
                                <td>" . event_date_display( $att_start_date ) . ' - ' . event_date_display( $att_end_date ) . "</td>
                                <td>$att_event_time - $att_end_time</td> " .
                                ($att_quantity>0?'<td>' . $att_quantity . __(' attendee(s)', 'event_espresso') . '</td>':'') .
                            "</tr>"
                         . $email_questions
						 . $admin_ticket_link;
                       
                    $email_subject = !$multi_reg?$_event->event_name:$org_options['organization'] . __( ' registration confirmation', 'event_espresso' );


                    if ( $_event->email_id > 0 && $_event->send_mail == 'Y' )
                    {
                        $email_data = array( );
                        $email_data = espresso_email_message( $_event->email_id );
                        $conf_mail = $email_data['email_text'];
                        $email_subject = $email_data['email_subject'];
                    }
                    elseif ( $_event->conf_mail != '' && $_event->send_mail == 'Y')
                    {

                        $conf_mail = $_event->conf_mail;
                    }
                    else
                    {

                        $conf_mail = $org_options['message'];
                    }
                }



                if ( $send_attendee_email == 'true' )
                {

                    //Perform replacement
                    $SearchValues = array(
                        "[event_id]",
                        "[event_identifier]",
                        "[registration_id]",
                        "[fname]",
                        "[lname]",
                        "[phone]",
                        "[event]",
                        "[event_name]",
                        "[description]",
                        "[event_link]",
                        "[event_url]",
                        "[virtual_url]",
                        "[virtual_phone]",
						"[venue_title]",
						"[venue_url]",
						"[venue_image]",
						"[venue_phone]",
                        "[txn_id]",
                        "[cost]",
                        "[event_price]",
                        "[ticket_type]",
                        "[ticket_link]",
                        "[contact]",
                        "[company]",
                        "[co_add1]",
                        "[co_add2]",
                        "[co_city]",
                        "[co_state]",
                        "[co_zip]",
                        "[payment_url]",
						"[invoice_link]",
                        "[start_date]",
                        "[start_time]",
                        "[end_date]",
                        "[end_time]",
                        "[location]",
                        "[location_phone]",
                        "[google_map_link]",
                        "[attendee_event_list]",//Creates a list of events the attendee signed up for
                        "[custom_questions]", //Right now this can only be used in the initial confirmation email. We need to move this to the other email functions.
						"[qr_code]"
					);

                    $ReplaceValues = array(
                        $att_event_id,
                        $att_event_identifier,
                        $att_registration_id,
                        $att_fname,
                        $att_lname,
                        $_event->venue_phone,
                        $_event->event_name,
                        $_event->event_name,
                        $_event->event_desc,
                        $event_link,
                        $event_url,
                        $_event->virtual_url,
                        $_event->virtual_phone,
						//Venue information
						$venue_name,
						$_event->venue_url,
						$_event->venue_image,
						$_event->venue_phone,
						//Payment details
                        $att_txn_id,
                        $org_options['currency_symbol'] . $amount_pd,
                        $org_options['currency_symbol'] . $amount_pd,
                        $att_price_option,
                        $ticket_link,
                        $_event->alt_email == '' ? $org_options['contact_email'] : $_event->alt_email,
						//Organization details
                        $org_options['organization'],
                        $org_options['organization_street1'],
                        $org_options['organization_street2'],
                        $org_options['organization_city'],
                        $org_options['organization_state'],
                        $org_options['organization_zip'],
                        //($start == 0)?$payment_link:'',
                        $payment_link,
						$invoice_link,
                        $att_start_date,
                        event_date_display($att_event_time, get_option('time_format')),
                        $att_end_date,
                        event_date_display($att_end_time, get_option('time_format')),
                        $location,
                        $_event->venue_phone,
                        $google_map_link,
                        $table_open . $table_heading . $temp_event_table. $table_close,//Creates a list of events the attendee signed up for
						$email_questions,
						$qr_code
                    );


                    //This is the custom email set up in the event
                    $email_subject = str_replace( $SearchValues, $ReplaceValues, $email_subject );

                    $counter++;
                }
            }

            //Send the email if the email changes or it's the last record in the loop
            if ( $temp_email != $att_email || $num_rows == $counter ){

                $_replaced = str_replace( $SearchValues, $ReplaceValues, $conf_mail );

                $email_body = $message_top . $_replaced . $message_bottom;
                //echo $email_body;

                $email_params = array(
                    'send_to' => $temp_email,
                    'email_subject' => $email_subject,
                    'email_body' => $email_body,
                    'headers' => $headers
                );
				
				if ( $send_attendee_email == 'true' )
                    event_espresso_send_email( $email_params );

                if ( $counter != $num_rows)
                    $i--;

                $temp_att_id = '';
                $temp_event_table = '';
                $temp_email = '';
                $send_the_email = false;
                $start = 0;
                $email_questions = '';
            }
        }

				//Send admin email
				$admin_message = "<h3>" . __('Registration Summary:','event_espresso'). "</h3>";
				//$admin_message .= "<p><strong>".__('Attendee Name:','event_espresso')."</strong> ".$att_fname." ".$att_lname."</p>";
				//$admin_message .= "<p><strong>".__('Email Address:','event_espresso')."</strong>  ".$att_email."</p>";
				//$admin_message .= "<p><strong>".__('Event/Class Name:','event_espresso')."</strong> ".$event_link."</p>";
				if ($att_quantity >0 && !$multi_reg)
					$admin_message .= ($att_quantity == 0)? '': "<p><strong>".__('Number of Attendees:','event_espresso')."</strong>  ".$att_quantity."</p>";
				//$admin_message .= "<p><strong>".__('Registration ID:','event_espresso')."</strong>  ".$att_registration_id."</p>";
				//$admin_message .= $att_txn_id ==''?'':"<p><strong>".__('Transaction ID:','event_espresso')."</strong>  ".$att_txn_id."</p>";
				//$admin_message .= $att_price_option ==''?'':"<p><strong>".__('Ticket Type:','event_espresso')."</strong>  ".$att_price_option."</p>";
				//$admin_message .= "<p><strong>".__('Event Dates:','event_espresso')."</strong>  ".event_espresso_no_format_date($att_start_date)." - ".event_espresso_no_format_date($att_end_date)."</p>";
				//$admin_message .= "<p><strong>".__('Event Times:','event_espresso')."</strong>  ".$att_event_time." - ".$att_end_time."</p>";
				
				if ($email_questions !=''){
					$admin_message .= "<h3>" . __('Additional Information:','event_espresso'). "</h3>";
					$admin_message .= $email_questions;
				}

                                $email_params = array(
                                    'send_to' => $_event->alt_email == '' ? $org_options['contact_email'] : $_event->alt_email . ',' . $org_options['contact_email'],
                                    'email_subject' => !$multi_reg?$_event->event_name . __( ' registration confirmation', 'event_espresso' ) : __('Event Registration Notification', 'event_espresso'),
                                    'email_body' => $admin_message .  $table_open . $admin_email_body . $table_close,
                                    'headers' => $headers
                                );

                               if ( $send_admin_email == 'true' )
								    event_espresso_send_email( $email_params );
    }

}

//Email sender
if ( !function_exists( 'event_espresso_send_email' ) )
{
    function event_espresso_send_email( $params ) {
        global $org_options;
        extract( $params );
        //Define email headers
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: " . $org_options['organization'] . " <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Content-Type: text/html; charset=utf-8\r\n";
        //echo '<hr />'.$send_to.'<br />';
		//echo $email_subject .$email_body.'<hr />';
        return wp_mail( $send_to, stripslashes_deep( html_entity_decode( $email_subject, ENT_QUOTES, "UTF-8" ) ), stripslashes_deep( html_entity_decode( wpautop( $email_body ), ENT_QUOTES, "UTF-8" ) ), $headers );
    }
}

// Attendee registration approval pending 
if ( !function_exists( 'event_espresso_send_attendee_registration_approval_pending' )) {
	function event_espresso_send_attendee_registration_approval_pending($registration_id) {
		global $org_options, $wpdb;
		//Get the event information
		$events = $wpdb->get_results("SELECT ed.* FROM ". EVENTS_DETAIL_TABLE . " ed 
						JOIN " . EVENTS_ATTENDEE_TABLE . " ea
						ON ed.id = ea.event_id
						WHERE ea.registration_id='".$registration_id."'");
	
		foreach ($events as $event){
			$event_id=$event->id;
			$event_name=stripslashes_deep($event->event_name);
			$event_desc=stripslashes_deep($event->event_desc);
			$display_desc=$event->display_desc;
			$event_identifier=$event->event_identifier;
			$reg_limit = $event->reg_limit;
			$active=$event->is_active;
			$send_mail= $event->send_mail;
			$conf_mail= $event->conf_mail;
			$email_id= $event->email_id;
			$alt_email= $event->alt_email;
			$start_date =  event_date_display($event->start_date);
			$end_date =  $event->end_date;
			$virtual_url = $event->virtual_url;
			$virtual_phone = $event->virtual_phone;
			$event_address = $event->address;
			$event_address2 = $event->address2;
			$event_city = $event->city;
			$event_state = $event->state;
			$event_zip = $event->zip;
			$event_country = $event->country;
			$location = ($event_address != '' ? $event_address :'') . ($event_address2 != '' ? '<br />' . $event_address2 :'') . ($event_city != '' ? '<br />' . $event_city :'') . ($event_state != '' ? ', ' . $event_state :'') . ($event_zip != '' ? '<br />' . $event_zip :'') . ($event_country != '' ? '<br />' . $event_country :'');
			$location_phone = $event->phone;
			$require_pre_approval = $event->require_pre_approval;
			
			$google_map_link = espresso_google_map_link(array( 'address'=>$event_address, 'city'=>$event_city, 'state'=>$event_state, 'zip'=>$event_zip, 'country'=>$event_country) );
		}
	
		//Build links
		$event_url = home_url() . "/?page_id=" . $org_options['event_page_id']. "&regevent_action=register&event_id=". $event_id;
		$event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';
	
		$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE;
	
		if ($registration_id != ''){
			$sql .= " WHERE registration_id = '".$registration_id."' ";
		}elseif ($attendee_id != ''){
			$sql .= " WHERE id = '".$attendee_id."' ";
		}else{
			_e('No ID Supplied', 'event_espresso');
		}
	
		$sql .= " ORDER BY id ";
		$sql .= " LIMIT 0,1 ";//Get the first attendees details
	
	
		$attendees  = $wpdb->get_results($sql);
		//global $attendee_id;
	
		foreach ($attendees as $attendee){
			$attendee_id = $attendee->id;
			$attendee_email = $attendee->email;
			$lname = $attendee->lname;
			$fname = $attendee->fname;
			$address = $attendee->address;
			$address2 = $attendee->address2;
			$city = $attendee->city;
			$state = $attendee->state;
			$zip = $attendee->zip;
			$payment_status = $attendee->payment_status;
			$txn_type = $attendee->txn_type;
			$amount_pd = $attendee->amount_pd;
			$event_cost = $attendee->amount_pd;
			$payment_date = event_date_display($attendee->payment_date);
			$phone = $attendee->phone;
			$event_time = event_date_display($attendee->event_time, get_option('time_format'));
			$end_time = event_date_display($attendee->end_time, get_option('time_format'));
			$date = event_date_display($attendee->date);
			$pre_approve = $attendee->pre_approve;
			
		}
		$admin_email = $alt_email == '' ? $org_options['contact_email'] : $alt_email . ',' . $org_options['contact_email'];
		if ( !empty($admin_email) ) {
			$subject = "New attendee registration approval pending";
			$body = "
Event title: $event_name
<br/>
Attendee name: $fname&nbsp;$lname
<br/>
Thank You.			
";
			$email_params = array(
				'send_to' => $admin_email,
				'email_subject' => __($subject, 'event_espresso'),
				'email_body' => $body
			);
			event_espresso_send_email($email_params);
		}
		
		if ( !empty($attendee_email) ) {
			$subject = "Event registration pending";
			$body = "
Event title: $event_name
<br/>
Attendee name: $fname&nbsp;$lname
<br/>
Your registration is pending for approval from event admin. You will receive an email with payment info when admin approves your registration.
<br/><br/>
Thank You.			
";
			$email_params = array(
				'send_to' => $attendee_email,
				'email_subject' => __($subject, 'event_espresso'),
				'email_body' => $body
			);
			event_espresso_send_email($email_params);
		
		}
	}
}

//Payment Confirmations
if (!function_exists('event_espresso_send_payment_notification')) {
	function event_espresso_send_payment_notification($atts){
		global $wpdb, $org_options;

		//Extract the attendee_id and registration_id
		extract( $atts );
		$registration_id = "{$registration_id}";
		$attendee_id = "{$attendee_id}";
		$registration_id = $registration_id != '' ? $registration_id : espresso_registration_id($attendee_id);

		//Define email headers
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "From: " . $org_options['organization'] . " <". $org_options['contact_email'] . ">\r\n";
		$headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";
		$message_top = "<html><body>";
		$message_bottom = "</html></body>";
		
		//Get the attendee  id or registration_id and create the sql statement
		$sql = "SELECT a.*, e.event_name, e.event_desc, e.start_date, e.send_mail FROM ". EVENTS_ATTENDEE_TABLE ." a ";
		$sql .= " LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id = a.event_id ";
		if ($registration_id != ''){
			$sql .= " WHERE a.registration_id = '" . $registration_id . "' ";
		}elseif ($attendee_id != ''){
			$sql .= " WHERE a.id = '" . $attendee_id . "' ";
		}else{
			return __('No ID Supplied', 'event_espresso');
		}
		$sql .= "  ORDER BY id LIMIT 1 ";
		
		$attendees = $wpdb->get_results($sql);

		$start = 0;
		foreach ($attendees as $attendee){
			$attendee_id = $attendee->id;
			$attendee_email = $attendee->email;
			$event_id = $attendee->event_id;
			$lname = $attendee->lname;
			$fname = $attendee->fname;
			$address = $attendee->address;
			$address2 = $attendee->address2;
			$city = $attendee->city;
			$state = $attendee->state;
			$zip = $attendee->zip;
			$phone = $attendee->phone;
			$event_time = $attendee->event_time;
			$end_time = $attendee->end_time;
			$date = $attendee->date;
			
			$ticket_type = $attendee->price_option;
			
			
			if($start == 0){
				/*
				* Since the payment amount and info is stored with the primary attendee, we want to grab only
				* the first record info
				*/
				$payment_status = $attendee->payment_status;
				$txn_type = $attendee->txn_type;
				$amount_pd = $attendee->amount_pd;
				$payment_date = $attendee->payment_date;
				$txn_id = $attendee->txn_id;
				$start = 1;
			}
		}
		
		//Get the event information
		$events = $wpdb->get_results("SELECT ed.* FROM ". EVENTS_DETAIL_TABLE . " ed
                        JOIN " . EVENTS_ATTENDEE_TABLE . " ea
                        ON ed.id = ea.event_id
                        WHERE ea.registration_id='".$registration_id."'");

		foreach ($events as $event){
			$event_id=$event->id;
			$event_code=$event->event_code;
			$event_name=$event->event_name;
			$event_desc=$event->event_desc;
			$display_desc=$event->display_desc;
			$event_identifier=$event->event_identifier;
			$reg_limit = $event->reg_limit;
			$active=$event->is_active;
			$send_mail= $event->send_mail;
			$conf_mail= $event->conf_mail;
			$email_id= $event->email_id;
			$alt_email= $event->alt_email;
			$start_date =  event_date_display($event->start_date);
			$end_date =  $event->end_date;
			$virtual_url = $event->virtual_url;
			$virtual_phone = $event->virtual_phone;
			$event_address = $event->address;
			$event_address2 = $event->address2;
			$event_city = $event->city;
			$event_state = $event->state;
			$event_zip = $event->zip;
			$event_country = $event->country;
			$location = ($event_address != '' ? $event_address :'') . ($event_address2 != '' ? '<br />' . $event_address2 :'') . ($event_city != '' ? '<br />' . $event_city :'') . ($event_state != '' ? ', ' . $event_state :'') . ($event_zip != '' ? '<br />' . $event_zip :'') . ($event_country != '' ? '<br />' . $event_country :'');
			$location_phone = $event->phone;
			
			$google_map_link = espresso_google_map_link(array( 'address'=>$event_address, 'city'=>$event_city, 'state'=>$event_state, 'zip'=>$event_zip, 'country'=>$event_country) );
		}

		//Build links
		$event_url = home_url() . "/?page_id=" . $org_options['event_page_id']. "&regevent_action=register&event_id=". $event_id;
		$event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';
		
		//Build the payment link
			$payment_url = home_url() . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $registration_id;
			$payment_link = '<a href="' . $payment_url . '">' . __('View Your Payment Details') . '</a>';
		
		//Create PDF Invoice link
			$invoice_link = '<a href="'.home_url().'/?download_invoice=true&amp;attendee_id='.$attendee_id.'&amp;registration_id='. $registration_id .'" target="_blank">'. __('Download PDF Invoice', 'event_espresso').'</a>';
		
		//If the custom ticket is available, load the template file
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")){
			if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php")){
				include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
				$qr_code = espresso_qr_code(array('attendee_id' => $attendee_id,'event_name' => stripslashes_deep($event_name), 'attendee_first' => $fname, 'attendee_last'=> $lname, 'registration_id'=> $registration_id, 'event_code'=> $event_code, 'ticket_type'=>$ticket_type, 'event_time'=>$event_time, 'amount_pd'=>$amount_pd));
			}
					//Build the ticket link
			$ticket_url = home_url() . "/?download_ticket=true&amp;id=" . $attendee_id . "&amp;registration_id=".$registration_id;
			$ticket_link = '<strong><a href="' . $ticket_url . '">' . __('Download Ticket Now!') . '</a></strong>';
		}
				
		//Build custom questions	
		if ( function_exists( 'event_espresso_custom_questions_output' ) ){
			$email_questions = event_espresso_custom_questions_output(array('attendee_id' => $attendee_id));
		}
			
		//Perform replacement
			$SearchValues = array(
								"[event_id]",
								"[event_identifier]",
								"[registration_id]",
								"[fname]",
								"[lname]",
								"[phone]",
								"[event]",
								"[event_name]",
								"[description]",
								"[event_link]",
								"[event_url]",
								"[virtual_url]",
								"[virtual_phone]",
								"[venue_title]",
								"[venue_url]",
								"[venue_image]",
								"[venue_phone]",
								"[txn_id]",
								"[cost]",
								"[event_price]",
								"[ticket_type]",
								"[ticket_link]",
								"[contact]",
								"[company]",
								"[co_add1]",
								"[co_add2]",
								"[co_city]",
								"[co_state]",
								"[co_zip]",
								"[payment_url]",
								"[invoice_link]",
								"[start_date]",
								"[start_time]",
								"[end_date]",
								"[end_time]",
								"[location]",
								"[location_phone]",
								"[google_map_link]",
								"[custom_questions]", //Right now this can only be used in the initial confirmation email. We need to move this to the other email functions.
								"[qr_code]");

			$ReplaceValues = array(
								$event_id,
								$event_identifier,
								$registration_id,
								$fname,
								$lname,
								$phone,
								$event_name,
								$event_name,
								$event_desc,
								$event_link,
								$event_url,
								$virtual_url,
								$virtual_phone,
								//Venue information
								$_event->venue_title,
								$_event->venue_url,
								$_event->venue_image,
								$_event->venue_phone,
								$txn_id,
								$org_options['currency_symbol'] . $amount_pd,
								$org_options['currency_symbol'] . $amount_pd,
								$ticket_type,
								$ticket_link,
								$alt_email == '' ? $org_options['contact_email']:$alt_email,
								$org_options['organization'],
								$org_options['organization_street1'],
								$org_options['organization_street2'],
								$org_options['organization_city'],
								$org_options['organization_state'],
								$org_options['organization_zip'],
								//($start == 0)?$payment_link:'',
								$payment_link,
								$invoice_link,
								event_date_display($start_date),
								event_date_display($event_time, get_option('time_format')),
								event_date_display($end_date),
								event_date_display($end_time, get_option('time_format')),
								$location,
								$location_phone,
								$google_map_link,
								$email_questions,
								$qr_code);
								
		$email_body = $message_top.$org_options['payment_message'].$message_bottom;

		$subject = str_replace($SearchValues,$ReplaceValues,$org_options['payment_subject']);
		$email_body    = str_replace($SearchValues,$ReplaceValues,$email_body);
		if ($org_options['default_mail'] == 'Y'){
			wp_mail($attendee_email, stripslashes_deep(html_entity_decode($subject, ENT_QUOTES,"UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers);
		}
	}
}

//Cancelation Notices
if (!function_exists('event_espresso_send_cancellation_notice')) {
	function event_espresso_send_cancellation_notice($event_id){
		global $wpdb, $org_options;
		//Define email headers
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "From: " . $org_options['organization'] . " <". $org_options['contact_email'] . ">\r\n";
		$headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";
		$message_top = "<html><body>";
		$message_bottom = "</html></body>";

		$events = $wpdb->get_results("SELECT * FROM ". EVENTS_DETAIL_TABLE ." WHERE id='".$event_id."'");
		foreach ($events as $event){
			$event_name=$event->event_name;
			$event_desc=$event->event_desc;
			$send_mail= $event->send_mail;
			$conf_mail= $event->conf_mail;
			$email_id= $event->email_id;
			$alt_email= $event->alt_email;
			$start_date =  $event->start_date;
			$end_date =  $event->end_date;
			$event_address = $event->address;
			$event_address2 = $event->address2;
			$event_city = $event->city;
			$event_state = $event->state;
			$event_zip = $event->zip;
			$location = ($event_address != '' ? $event_address :'') . ($event_address2 != '' ? '<br />' . $event_address2 :'') . ($event_city != '' ? '<br />' . $event_city :'') . ($event_state != '' ? ', ' . $event_state :'') . ($event_zip != '' ? '<br />' . $event_zip :'') . ($event_country != '' ? '<br />' . $event_country :'');
			$location_phone = $event->phone;

			$attendees = $wpdb->get_results("SELECT * FROM ". EVENTS_ATTENDEE_TABLE ." WHERE event_id ='" . $event_id . "'");
			foreach ($attendees as $attendee){
				$lname = $attendee->lname;
				$fname = $attendee->fname;
				$address = $attendee->address;
				$city = $attendee->city;
				$state = $attendee->state;
				$zip = $attendee->zip;
				$attendee_email = $attendee->email;
				$phone = $attendee->phone;
				$date = $attendee->date;
				$event_id = $attendee->event_id;
				$event_time = $attendee->event_time;
				$end_time = $attendee->end_time;

				//Replace the tags
				//$tags = array("[fname]", "[lname]", "[event_name]" );
				//$vals = array($fname, $lname, $event_name);
				//$email_body = $message_top.$email_body.$message_bottom;
				//$subject = str_replace($tags,$vals,$email_subject);


				$subject = __('Event Cancellation Notice','event_espresso');
				$email_body  = '<p>'.$event_name. __(' has been cancelled.','event_espresso') . '</p>';
				$email_body .= '<p>'. __('For more information, please email '. $alt_email == '' ? $org_options['contact_email']:$alt_email,'event_espresso') .'</p>';
				$body  = str_replace($tags,$vals,$email_body);
				wp_mail($attendee_email, stripslashes_deep(html_entity_decode($subject, ENT_QUOTES,"UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers);
			}
		}
	}
}

//Send Invoice
if (!function_exists('event_espresso_send_invoice')) {
	function event_espresso_send_invoice($registration_id, $invoice_subject, $invoice_message ){
 		global $wpdb, $org_options;
		//Define email headers
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "From: " . $org_options['organization'] . " <". $org_options['contact_email'] . ">\r\n";
		$headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";
		$message_top = "<html><body>";
		$message_bottom = "</html></body>";
		$start = 0;
		$results = $wpdb->get_results("SELECT a.*, e.event_name, e.event_desc, e.event_code FROM ". EVENTS_ATTENDEE_TABLE ." a
										LEFT JOIN ". EVENTS_DETAIL_TABLE ." e ON e.id = a.event_id
										WHERE a.registration_id = '" . $registration_id . "' ORDER BY a.id LIMIT 1");

			foreach ($results as $result){
				$registration_id = $result->registration_id;
				$attendee_id = $result->id;
				$lname = $result->lname;
				$fname = $result->fname;
				$address = $result->address;
				$city = $result->city;
				$state = $result->state;
				$zip = $result->zip;
				
				$ticket_type = $attendee->price_option;

				$phone = $result->phone;
				$date = $result->date;
                           if($start == 0){
                            /*
                             * Since the payment amount and info is stored with the primary attendee, we want to grab only
                             * the first record info
                             */
                            $email = $result->email;
                            $payment_status = $result->payment_status;
                            $txn_type = $result->txn_type;
                            $amount_pd = $result->amount_pd;
                            $payment_date = $result->payment_date;
                            $txn_id = $result->txn_id;
                            $quantity = $result->quantity;
                            $coupon_code = $result->coupon_code;
                            $start = 1;

                           }



				$event_id = $result->event_id;

				$event_code=$result->event_code;

				$event_name = $result->event_name;
				$event_desc = $result->event_desc;
			}
			
			//Build links
			$event_url = home_url() . "/?page_id=" . $org_options['event_page_id']. "&regevent_action=register&event_id=". $event_id;
			$event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';
			
			//Create PDF Invoice link
			$invoice_link = '<a href="'.home_url().'/?download_invoice=true&amp;attendee_id='.$attendee_id.'&amp;registration_id='. $registration_id .'" target="_blank">'. __('Download PDF Invoice', 'event_espresso').'</a>';
			
			//If the custom ticket is available, load the template file
				if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")){
					if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php")){
						include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
						$qr_code = espresso_qr_code(array('attendee_id' => $attendee_id,'event_name' => stripslashes_deep($event_name), 'attendee_first' => $fname, 'attendee_last'=> $lname, 'registration_id'=> $registration_id, 'event_code'=> $event_code, 'ticket_type'=>$ticket_type, 'event_time'=>$event_time, 'amount_pd'=>$amount_pd));
					}
							//Build the ticket link
					$ticket_url = home_url() . "/?download_ticket=true&amp;id=" . $attendee_id . "&amp;registration_id=".$registration_id;
					$ticket_link = '<strong><a href="' . $ticket_url . '">' . __('Download Ticket Now!') . '</a></strong>';
				}
			
			//Build the payment link
			$payment_url = home_url() . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $registration_id;
			$payment_link = '<a href="' . $payment_url . '">' . __('View Your Payment Details') . '</a>';
		
		$gaddress = ($address != '' ? $address :'') . ($city != '' ? ',' . $city :'') . ($state != '' ? ',' . $state :'') . ($zip != '' ? ',' . $zip :'') . ($country != '' ? ',' . $country :''); 
		$google_map = htmlentities2('http://maps.google.com/maps?q='.$gaddress);
		$google_map_link = '<a href="'.$google_map.'">'.$google_map.'</a>';
		
		//Build custom questions	
		if ( function_exists( 'event_espresso_custom_questions_output' ) ){
			$email_questions = event_espresso_custom_questions_output(array('attendee_id' => $attendee_id));
		}
		
		$invoice_subject = str_replace($SearchValues, $ReplaceValues, $invoice_subject);
		
		//Send pre-existing email
		$email_id = empty($_REQUEST['email_name']) ? '' : $_REQUEST['email_name'];
		if ( $email_id > 0 )
                    {
                        $email_data = array( );
                        $email_data = espresso_email_message( $email_id );
                        $invoice_message = $email_data['email_text'];
                        $invoice_subject = $email_data['email_subject'];
                    }
		
			//Perform replacement
			$SearchValues = array(
								"[event_id]",
								"[event_identifier]",
								"[registration_id]",
								"[fname]",
								"[lname]",
								"[phone]",
								"[event]",
								"[event_name]",
								"[description]",
								"[event_link]",
								"[event_url]",
								"[virtual_url]",
								"[virtual_phone]",
								"[venue_title]",
								"[venue_url]",
								"[venue_image]",
								"[venue_phone]",
								"[txn_id]",
								"[cost]",
								"[event_price]",
								"[ticket_type]",
								"[ticket_link]",
								"[contact]",
								"[company]",
								"[co_add1]",
								"[co_add2]",
								"[co_city]",
								"[co_state]",
								"[co_zip]",
								"[payment_url]",
								"[invoice_link]",
								"[start_date]",
								"[start_time]",
								"[end_date]",
								"[end_time]",
								"[location]",
								"[location_phone]",
								"[google_map_link]",
								"[custom_questions]", //Right now this can only be used in the initial confirmation email. We need to move this to the other email functions.
								"[qr_code]"
							);

			$ReplaceValues = array(
								$event_id,
								$event_identifier,
								$registration_id,
								$fname,
								$lname,
								$phone,
								$event_name,
								$event_name,
								$event_desc,
								$event_link,
								$event_url,
								$virtual_url,
								$virtual_phone,
								//Venue information
								$_event->venue_title,
								$_event->venue_url,
								$_event->venue_image,
								$_event->venue_phone,
								$txn_id,
								$org_options['currency_symbol'] . $amount_pd,
								$org_options['currency_symbol'] . $amount_pd,
								$ticket_type,
								$ticket_link,
								$alt_email == '' ? $org_options['contact_email']:$alt_email,
								$org_options['organization'],
								$org_options['organization_street1'],
								$org_options['organization_street2'],
								$org_options['organization_city'],
								$org_options['organization_state'],
								$org_options['organization_zip'],
								//($start == 0)?$payment_link:'',
								$payment_link,
								$invoice_link,
								event_date_display($start_date),
								event_date_display($event_time, get_option('time_format')),
								event_date_display($end_date),
								event_date_display($end_time, get_option('time_format')),
								$location,
								$location_phone,
								$google_map_link,
								$email_questions,
								$qr_code
							);

			
			$message = str_replace($SearchValues, $ReplaceValues, $invoice_message);

			$email_body = $message_top.$message.$message_bottom;

			wp_mail($email, stripslashes_deep(html_entity_decode($invoice_subject, ENT_QUOTES,"UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers );
	}
}

//Reminder Notices
if (!function_exists('espresso_event_reminder')) {
	function espresso_event_reminder($event_id, $email_subject='', $email_text='', $email_id=0){
		global $wpdb, $org_options;
		//Define email headers
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "From: " . $org_options['organization'] . " <". $org_options['contact_email'] . ">\r\n";
		$headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";
		$message_top = "<html><body>";
		$message_bottom = "</html></body>";
$count= 0;
		$events = $wpdb->get_results("SELECT * FROM ". EVENTS_DETAIL_TABLE ." WHERE id='".$event_id."'");
		foreach ($events as $event){
			$event_id=$event->id;
			$event_code=$event->event_code;
			$event_name=$event->event_name;
			$event_desc=$event->event_desc;
			$alt_email= $event->alt_email;
			//$display_desc=$event->display_desc;
			//$event_identifier=$event->event_identifier;
			//$reg_limit = $event->reg_limit;
			//$active=$event->is_active;
			//$send_mail= $event->send_mail;
			$raw_email_message = $email_text != ''? $email_text : $event->conf_mail;
			$raw_email_subject = $email_subject != '' ? $email_subject : $event_name;
			
			//$email_id= $event->email_id;
			$start_date =  event_date_display($event->start_date);
			$end_date =  $event->end_date;
			$event_address = $event->address;
			$event_address2 = $event->address2;
			$event_city = $event->city;
			$event_state = $event->state;
			$event_zip = $event->zip;
			$event_country = $event->country;
			$location = ($event_address != '' ? $event_address :'') . ($event_address2 != '' ? '<br />' . $event_address2 :'') . ($event_city != '' ? '<br />' . $event_city :'') . ($event_state != '' ? ', ' . $event_state :'') . ($event_zip != '' ? '<br />' . $event_zip :'') . ($event_country != '' ? '<br />' . $event_country :'');
			$location_phone = $event->phone;
			
			$google_map_link = espresso_google_map_link(array( 'address'=>$event_address, 'city'=>$event_city, 'state'=>$event_state, 'zip'=>$event_zip, 'country'=>$event_country) );
			
			//Build links
			$event_url = home_url() . "/?page_id=" . $org_options['event_page_id']. "&regevent_action=register&event_id=". $event_id;
			$event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';
		}
                        
			$attendees = $wpdb->get_results("SELECT * FROM ". EVENTS_ATTENDEE_TABLE ." WHERE event_id ='" . $event_id . "'");
			foreach ($attendees as $attendee){
				$attendee_id = $attendee->id;
				$registration_id = $attendee->registration_id;
				$attendee_email = $attendee->email;
				$lname = $attendee->lname;
				$fname = $attendee->fname;
				$address = $attendee->address;
				$city = $attendee->city;
				$state = $attendee->state;
				$zip = $attendee->zip;
				$payment_status = $attendee->payment_status;
				$txn_type = $attendee->txn_type;
				$amount_pd = $attendee->amount_pd;
				$payment_date = $attendee->payment_date;
				$phone = $attendee->phone;
				$event_time = $attendee->event_time;
				$end_time = $attendee->end_time;
				$date = $attendee->date;
				$ticket_type = $attendee->price_option;
				
				//Create PDF Invoice link
				$invoice_link = '<a href="'.home_url().'/?download_invoice=true&amp;attendee_id='.$attendee_id.'&amp;registration_id='. $registration_id .'" target="_blank">'. __('Download PDF Invoice', 'event_espresso').'</a>';
			
				//Build the payment link
				$payment_url = home_url() . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $registration_id;
				$payment_link = '<a href="' . $payment_url . '">' . __('View Your Payment Details') . '</a>';
				//Build custom questions	
				if ( function_exists( 'event_espresso_custom_questions_output' ) ){
					$email_questions = event_espresso_custom_questions_output(array('attendee_id' => $attendee_id));
				}
				
				//If the custom ticket is available, load the template file
				if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")){
					if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php")){
						include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
						$qr_code = espresso_qr_code(array('attendee_id' => $attendee_id,'event_name' => stripslashes_deep($event_name), 'attendee_first' => $fname, 'attendee_last'=> $lname, 'registration_id'=> $registration_id, 'event_code'=> $event_code, 'ticket_type'=>$ticket_type, 'event_time'=>$event_time, 'amount_pd'=>$amount_pd));
					}
							//Build the ticket link
					$ticket_url = home_url() . "/?download_ticket=true&amp;id=" . $attendee_id . "&amp;registration_id=".$registration_id;
					$ticket_link = '<strong><a href="' . $ticket_url . '">' . __('Download Ticket Now!') . '</a></strong>';
				}

				//Perform replacement
				$SearchValues = array(
								"[event_id]",
								"[event_identifier]",
								"[registration_id]",
								"[fname]",
								"[lname]",
								"[phone]",
								"[event]",
								"[event_name]",
								"[description]",
								"[event_link]",
								"[event_url]",
								"[virtual_url]",
								"[virtual_phone]",
								"[venue_title]",
								"[venue_url]",
								"[venue_image]",
								"[venue_phone]",
								"[txn_id]",
								"[cost]",
								"[event_price]",
								"[ticket_type]",
								"[ticket_link]",
								"[contact]",
								"[company]",
								"[co_add1]",
								"[co_add2]",
								"[co_city]",
								"[co_state]",
								"[co_zip]",
								"[payment_url]",
								"[invoice_link]",
								"[start_date]",
								"[start_time]",
								"[end_date]",
								"[end_time]",
								"[location]",
								"[location_phone]",
								"[google_map_link]",
								"[custom_questions]", //Right now this can only be used in the initial confirmation email. We need to move this to the other email functions.
								"[qr_code]");

				$ReplaceValues = array(
								$event_id,
								$event_identifier,
								$registration_id,
								$fname,
								$lname,
								$phone,
								$event_name,
								$event_name,
								$event_desc,
								$event_link,
								$event_url,
								$virtual_url,
								$virtual_phone,
								//Venue information
								$_event->venue_title,
								$_event->venue_url,
								$_event->venue_image,
								$_event->venue_phone,
								$txn_id,
								$org_options['currency_symbol'] . $amount_pd,
								$org_options['currency_symbol'] . $amount_pd,
								$ticket_type,
								$ticket_link,
								$alt_email == '' ? $org_options['contact_email']:$alt_email,
								$org_options['organization'],
								$org_options['organization_street1'],
								$org_options['organization_street2'],
								$org_options['organization_city'],
								$org_options['organization_state'],
								$org_options['organization_zip'],
								//($start == 0)?$payment_link:'',
								$payment_link,
								$invoice_link,
								event_date_display($start_date),
								event_date_display($event_time, get_option('time_format')),
								event_date_display($end_date),
								event_date_display($end_time, get_option('time_format')),
								$location,
								$location_phone,
								$google_map_link,
								$email_questions,
								$qr_code);
												
				if ($email_id >0){
					$email_data = array();
					$email_data = espresso_email_message($email_id);
					$raw_email_message = $email_data['email_text'];
					$raw_email_subject = $email_data['email_subject'];
				}
				
				
				$email_subject = str_replace($SearchValues, $ReplaceValues, $raw_email_subject);
				
				$email_message = str_replace($SearchValues, $ReplaceValues, $raw_email_message);
				
				$email_body = $message_top.$email_message.$message_bottom;
		
				if (wp_mail($attendee_email, stripslashes_deep(html_entity_decode($email_subject, ENT_QUOTES,"UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers)){
					//sleep(1);
					$count ++;
				}
			}
?>
			<div id="message" class="updated fade">
          <p><strong>
            <?php _e( 'Email Sent to ' . $count . ' people sucessfully.', 'event_espresso' ); ?>
            </strong></p>
        </div>
<?php
		
	}
}
