<?php

if ( !function_exists( 'event_espresso_construct_multi_invoice' ) )
{


    function event_espresso_construct_multi_invoice( $atts ) {

        extract( $atts );

        $registration_id = $registration_id != '' ? $registration_id : espresso_registration_id( $attendee_id );

        global $wpdb, $org_options;

        $message_top = "<!DOCTYPE html><html><body>";
        $message_bottom = "</body></html>";


        // 1) find the events that have been registered for.

        $sql = "SELECT ed.*, ea.id as attendee_id FROM " . EVENTS_DETAIL_TABLE . " ed
                        JOIN " . EVENTS_ATTENDEE_TABLE . " ea
                        ON ed.id = ea.event_id WHERE ";
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
            _e( 'No ID Supplied', 'event_espresso' );
        }

        $sql .= " GROUP BY fname, lname, email, event_id ";

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

        $table_open = '<h3>' . $org_options['organization'] . ' ' . __( 'Invoice', 'event_espresso' ) . '</h3><br /><br /><br /><br /><br />';

        $table_open .= '<table width="100%" border="1" cellpadding = "5" cellspacing="5" style="border-collapse:collapse;">';
        
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

                    if ( $att_amount_pd != 0 && $start == 0 && $primary_attendee_id->id == $att_id )
                    {
                        $amount_pd = $att_amount_pd;
                        //Build the payment link
                        $payment_url = get_option( 'siteurl' ) . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $att_registration_id . "&amp;id=" . $att_id;
                        $payment_link = '<a href="' . $payment_url . '">' . __( 'View Your Payment Details' ) . '</a>';
                        $start = 1;
                        $primary_attendee = __( 'Primary Attendee', 'event_espresso' ) . ', ' . __('id','event_espresso') . ' ' . $att_id;
                        $total_due = '<tr style="font-size:30px;"><td colspan="4">' . __( 'Total Due', 'event_espresso' ) . "</td><td>" . $org_options['currency_symbol'] . $amount_pd . "</td></tr>";
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

                    $location = ($_event->address != '' ? $_event->address : '') . ($_event->address2 != '' ? '<br />' . $_event->address2 : '') . ($_event->city != '' ? '<br />' . $_event->city : '') . ($_event->state != '' ? ', ' . $_event->state : '') . ($_event->zip != '' ? '<br />' . $_event->zip : '') . ($_event->country != '' ? '<br />' . $_event->country : '');
                    $google_map_link = espresso_google_map_link( array( 'address' => $_event->address, 'city' => $_event->city, 'state' => $_event->state, 'zip' => $_event->zip, 'country' => $_event->country ) );

                    //Create PDF Invoice link
                    $invoice_link = '<a href="' . home_url() . '/?download_invoice=true&amp;attendee_id=' . $att_id . '&amp;registration_id=' . $att_registration_id . '" target="_blank">' . __( 'Download PDF Invoice', 'event_espresso' ) . '</a>';

                    //Create link to the event
                    $event_url = home_url() . "/?page_id=" . $org_options['event_page_id'] . "&regevent_action=register&event_id=" . $_event->id;
                    $event_link = '<a href="' . $event_url . '">' . stripslashes_deep( $_event->event_name ) . '</a>';

                    $temp_event_table .= "
                            <tr>
                                <td>" . stripslashes_deep( $_event->event_name ) . " | $att_price_option</td>
                                <td>" . event_date_display( $att_start_date ) . ' - ' . event_date_display( $att_end_date ) . "</td>
                                <td>$att_event_time - $att_end_time</td>
                                <td>$location <br />$google_map_link</td>" .
                            ($att_quantity > 0 ? '<td>' . $att_quantity . __( ' attendees', 'event_espresso' ) . '</td>' : '') .
                            "</tr>";

                    //If the custom ticket is available, load the template file
                    if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php" ) )
                    {
                        if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php" ) )
                        {
                            include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
                            $qr_code = espresso_qr_code( array( 'attendee_id' => $att_id, 'event_name' => stripslashes_deep( $_event->event_name ), 'attendee_first' => $att_fname, 'attendee_last' => $att_lname, 'registration_id' => $att_registration_id, 'event_code' => $_event->event_code ) );
                        }
                        $ticket_url = get_option( 'siteurl' ) . "/?download_ticket=true&amp;id=" . $att_id . "&amp;registration_id=" . $att_registration_id;
                        $ticket_link = '<strong><a href="' . $ticket_url . '">' . __( 'Download/Print Ticket' ) . '</a></strong>';
                        $admin_ticket_link = "<p>" . $ticket_link . "</p>";
                    }

                    if ( function_exists( 'event_espresso_custom_questions_output' ) )
                    {

                        $email_questions = event_espresso_custom_questions_output( array( 'attendee_id' => $att_id ) );
                        if ( $email_questions != '' )
                            $email_questions = '<tr><td colspan = "6">' . $email_questions . '</td></tr>';
                    }


                    //Create a link to the attendee data in WP admin
                    $admin_attendee_link = '<a href="' . get_admin_url() . 'admin.php?page=events&event_admin_reports=edit_attendee_record&event_id=' . $_event->id . '&registration_id=' . $registration_id . '&form_action=edit_attendee&id=' . $att_id . '">' . $att_fname . ' ' . $att_lname . '</a>';

                    $admin_email_body .= "
                            <tr>
                                <td>$att_fname $att_lname  $primary_attendee</td>
                                <td>$att_email</td>
                                <td>" . stripslashes_deep( $_event->event_name ) . " | $att_price_option</td>
                                <td>" . event_date_display( $att_start_date ) . ' - ' . event_date_display( $att_end_date ) . "</td>
                                <td>$att_event_time - $att_end_time</td> " .
                            ($att_quantity > 0 ? '<td>' . $att_quantity . __( ' attendee(s)', 'event_espresso' ) . '</td>' : '') .
                            "</tr>"
                            . $admin_ticket_link;

                    $email_subject = !$multi_reg ? $_event->event_name : $org_options['organization'] . __( ' registration confirmation', 'event_espresso' );


                    if ( $_event->email_id > 0 && $_event->send_mail == 'Y' )
                    {
                        $email_data = array( );
                        $email_data = espresso_email_message( $_event->email_id );
                        $conf_mail = $email_data['email_text'];
                        $email_subject = $email_data['email_subject'];
                    }
                    elseif ( $_event->conf_mail != '' && $_event->send_mail == 'Y' )
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
                        "[attendee_event_list]", //Creates a list of events the attendee signed up for
                        "[custom_questions]", //Right now this can only be used in the initial confirmation email. We need to move this to the other email functions.
                        "[qr_code]"
                    );

                    $ReplaceValues = array(
                        $att_event_id,
                        $att_event_identifier,
                        $att_registration_id,
                        $att_fname,
                        $att_lname,
                        $att_phone,
                        $_event->event_name,
                        $_event->event_name,
                        $_event->event_desc,
                        $event_link,
                        $event_url,
                        $_event->virtual_url,
                        $_event->virtual_phone,
                        //Venue information
                        $_event->venue_title,
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
                        $att_event_time,
                        $att_end_date,
                        $att_end_time,
                        $location,
                        $_event->phone,
                        $google_map_link,
                        $table_open . $table_heading . $temp_event_table . $email_questions . $table_close, //Creates a list of events the attendee signed up for
                        $email_questions,
                        $qr_code
                    );


                    //This is the custom email set up in the event
                    $email_subject = str_replace( $SearchValues, $ReplaceValues, $email_subject );

                    $counter++;
                }
            }

            //Send the email if the email changes or it's the last record in the loop
            if ( $temp_email != $att_email || $num_rows == $counter )
            {

                $_replaced = str_replace( $SearchValues, $ReplaceValues, $conf_mail );

                $email_body = $message_top . $_replaced . $message_bottom;
                //echo $email_body;

                $email_params = array(
                    'send_to' => $temp_email,
                    'email_subject' => $email_subject,
                    'email_body' => $email_body,
                    'headers' => $headers
                );

                //return $email_params['email_body'];
                //if ( $send_attendee_email == 'true' )
                // event_espresso_send_email( $email_params );

                if ( $counter != $num_rows )
                    $i--;

                $temp_att_id = '';
                $temp_event_table = '';
                $temp_email = '';
                $send_the_email = false;
                $start = 0;
                $email_questions = '';
            }
        }


        if ( $att_quantity > 0 && !$multi_reg )
            $admin_message .= ( $att_quantity == 0) ? '' : "<p><strong>" . __( 'Number of Attendees:', 'event_espresso' ) . "</strong>  " . $att_quantity . "</p>";

        if ( $email_questions != '' )
        {
            //$admin_message .= "<h3>" . __( 'Additional Information:', 'event_espresso' ) . "</h3>";
            //$admin_message .= $email_questions;
        }



        $email_params = array(
            'send_to' => $_event->alt_email == '' ? $org_options['contact_email'] : $_event->alt_email . ',' . $org_options['contact_email'],
            'email_subject' => !$multi_reg ? $_event->event_name . __( ' registration confirmation', 'event_espresso' ) : __( 'Event Registration Notification', 'event_espresso' ),
            'email_body' => $message_top . $admin_message . $table_open . $admin_email_body . $total_due . $table_close . $message_bottom,
            'headers' => $headers
        );

        return $email_params['email_body'];
    }

}
//event_espresso_construct_pdf(array('registration_id' => $_REQUEST['registration_id'],'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
?>