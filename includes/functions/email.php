<?php

function replace_shortcodes($message, $data) {
    global $org_options;
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
        "[attendee_event_list]",
        "[custom_questions]",
        "[qr_code]"
    );

    $ReplaceValues = array(
        $data->attendee->event_id,
        $data->event->event_identifier,
        $data->attendee->registration_id,
        $data->attendee->fname,
        $data->attendee->lname,
        $data->event->venue_phone,
        $data->event->event_name,
        $data->event->event_name,
        $data->event->event_desc,
        $data->event_link,
        $data->event_url,
        $data->event->virtual_url,
        $data->event->virtual_phone,
        //Venue information
        $data->event->venue_name,
        $data->event->venue_url,
        $data->event->venue_image,
        $data->event->venue_phone,
        //Payment details
        $data->attendee->txn_id,
        $org_options['currency_symbol'] . espresso_attendee_price(array('registration_id' => $data->attendee->registration_id, 'session_total' => true)),
        $org_options['currency_symbol'] . espresso_attendee_price(array('registration_id' => $data->attendee->registration_id, 'session_total' => true)),
        $data->attendee->price_option,
        $data->ticket_link,
        $data->event->alt_email == '' ? $org_options['contact_email'] : $_event->alt_email,
        //Organization details
        $org_options['organization'],
        $org_options['organization_street1'],
        $org_options['organization_street2'],
        $org_options['organization_city'],
        $org_options['organization_state'],
        $org_options['organization_zip'],
        $data->payment_link,
        $data->invoice_link,
        event_date_display($data->attendee->start_date),
        event_date_display($data->attendee->event_time, get_option('time_format')),
        event_date_display($data->attendee->end_date),
        event_date_display($data->attendee->end_time, get_option('time_format')),
        $data->location,
        $data->event->venue_phone,
        $data->google_map_link,
        $data->table_open . $data->table_heading . $data->event_table . $data->table_close,
        $data->email_questions,
        $data->qr_code
    );
    return str_replace($SearchValues, $ReplaceValues, $message);
}

function prepare_email_data($attendee_id, $multi_reg) {
    global $wpdb, $org_options;
    $data = new stdClass;
    $data->multi_reg = $multi_reg;

    //Get the event record
    $sql = "SELECT ed.* ";
    isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= ", v.name venue_name, v.address venue_address, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
    $sql .= " FROM " . EVENTS_DETAIL_TABLE . " ed ";
    isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = ed.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
    $sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " ea ON ea.event_id=ed.id ";
    $sql .= " WHERE ea.id = '" . $attendee_id . "' ";
    $data->event = $wpdb->get_row($sql, OBJECT);

    //Get the attendee record
    $sql = "SELECT ea.* FROM " . EVENTS_ATTENDEE_TABLE . " ea WHERE ea.id = '" . $attendee_id . "' ";
    $data->attendee = $wpdb->get_row($sql, OBJECT);

    $data->primary_attendee = espresso_is_primary_attendee($data->attendee->id) == true ? true : false;

    //Venue information
    if (isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y') {
        $data->event->venue_name = $data->event->venue_name;
        $data->event->address = $data->event->venue_address;
        $data->event->address2 = $data->event->venue_address2;
        $data->event->city = $data->event->venue_city;
        $data->event->state = $data->event->venue_state;
        $data->event->zip = $data->event->venue_zip;
        $data->event->country = $data->event->venue_country;
    } else {
        $data->event->venue_name = $data->event->venue_title;
    }

    $data->table_open = '<table width="100%" border="1" cellpadding = "5" cellspacing="5" style="border-collapse:collapse;">';
    $data->table_heading = "<tr><th>" . __('Event Name', 'event_espresso') . "</th><th>" . __('Date', 'event_espresso') . "</th><th>" . __('Time', 'event_espresso') . "</th><th>" . __('Location', 'event_espresso') . "</th></tr>";
    $data->table_close = "</table>";

    if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")) {
        if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php")) {
            include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
            $data->qr_code = espresso_qr_code(array('attendee_id' => $attendee_id, 'event_name' => stripslashes_deep($data->event->event_name), 'attendee_first' => $data->attendee->fname, 'attendee_last' => $data->attendee->lname, 'registration_id' => $data->attendee->registration_id, 'event_code' => $data->event->event_code, 'ticket_type' => $data->attendee->price_option, 'event_time' => $data->attendee->event_time, 'amount_pd' => espresso_attendee_price(array('registration_id' => $data->attendee->registration_id, 'reg_total' => true))));
        }
        $data->ticket_link = espresso_ticket_links($data->attendee->registration_id, $data->attendee->id);
        $data->admin_ticket_link = "<p>" . $data->ticket_link . "</p>";
    } else {
        $data->qr_code = '';
        $data->ticket_link = '';
        $data->admin_ticket_link = '';
    }

    $data->location = ($data->event->address != '' ? $data->event->address : '') . ($data->event->address2 != '' ? '<br />' . $data->event->address2 : '') . ($data->event->city != '' ? '<br />' . $data->event->city : '') . ($data->event->state != '' ? ', ' . $data->event->state : '') . ($data->event->zip != '' ? '<br />' . $data->event->zip : '') . ($data->event->country != '' ? '<br />' . $data->event->country : '');
    $data->google_map_link = espresso_google_map_link(array('address' => $data->event->address, 'city' => $data->event->city, 'state' => $data->event->state, 'zip' => $data->event->zip, 'country' => $data->event->country));
    $data->event_url = espresso_reg_url($data->event->id);
    $data->event_link = '<a href="' . $data->event_url . '">' . stripslashes_deep($data->event->event_name) . '</a>';
    if (!isset($data->event->venue_name))
        $data->event->venue_name = '';
    $data->event_table .= "
                            <tr>
                                <td>" . stripslashes_deep($data->event->event_name) . " | " . $data->attendee->price_option . "</td>
                                <td>" . event_date_display($data->attendee->start_date) . ' - ' . event_date_display($data->attendee->end_date) . "</td>
                                <td>" . event_date_display($data->attendee->event_time, get_option('time_format')) . " - " . event_date_display($data->attendee->end_time, get_option('time_format')) . "</td>
                                <td>" . $data->event->venue_name . "<br />$data->location <br />$data->google_map_link</td>" .
            ($data->attendee->quantity > 0 ? '<td>' . $data->attendee->quantity . __(' attendees', 'event_espresso') . '</td>' : '') .
            "</tr>";
    if (function_exists('event_espresso_custom_questions_output')) {
        //Create the question display
        $email_questions_r = event_espresso_custom_questions_output(array('attendee_id' => $data->attendee->id, 'all_questions' => TRUE));
        if ($email_questions_r != '')
            $data->email_questions = '<tr><td colspan = "6">' . $email_questions_r . '</td></tr>';
        $data->event_table .= $data->email_questions;
    }
    $payment_url = get_option('siteurl') . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $data->attendee->registration_id . "&amp;id=" . $data->attendee->id;
    $data->payment_link = '<a href="' . $payment_url . '">' . __('View Your Payment Details') . '</a>';
    $data->invoice_link = '<a href="' . home_url() . '/?download_invoice=true&amp;attendee_id=' . $data->attendee->id . '&amp;registration_id=' . $data->attendee->registration_id . '" target="_blank">' . __('Download PDF Invoice', 'event_espresso') . '</a>';
    return $data;
}

function prepare_email($data) {
    global $org_options;
    $email_subject = !$data->multi_reg ? $data->event->event_name : $org_options['organization'] . __(' registration confirmation', 'event_espresso');
    if ($data->event->email_id > 0 && $data->event->send_mail == 'Y') {
        $email_data = array();
        $email_data = espresso_email_message($data->event->email_id);
        $conf_mail = $email_data['email_text'];
        $email_subject = $email_data['email_subject'];
    } elseif ($data->event->conf_mail != '' && $data->event->send_mail == 'Y') {
        $conf_mail = $data->event->conf_mail;
    } else {
        $conf_mail = $org_options['message'];
    }
    $email_subject = replace_shortcodes($email_subject, $data);
    $_replaced = replace_shortcodes($conf_mail, $data);
    $message_top = "<html><body>";
    $message_bottom = "</body></html>";
    $email_body = $message_top . $_replaced . $message_bottom;
    if (!isset($headers))
        $headers = '';
    return array(
        'send_to' => $data->attendee->email,
        'email_subject' => $email_subject,
        'email_body' => $email_body,
        'headers' => $headers
    );
}

function prepare_admin_email($data) {
    global $org_options;
    $admin_attendee_link = espresso_edit_attendee(0, $data->attendee->id, $data->event->id, 'admin', $data->attendee->fname . ' ' . $data->attendee->lname);

    if ($data->attendee->quantity > 0 && !$data->multi_reg)
        $primary_attendee = $data->primary_attendee == true ? "<p><strong>" . __('Primary Attendee', 'event_espresso') . "</strong></p>" : '';

    $admin_email_body = "
                            <tr>
                                <td>$primary_attendee $admin_attendee_link</td>
                                <td>" . $data->attendee->email . "</td>
                                <td>" . stripslashes_deep($data->event->event_name) . " | " . $data->attendee->price_option . "</td>
                                <td>" . event_date_display($data->attendee->start_date) . ' - ' . event_date_display($data->attendee->end_date) . "</td>
                                <td>" . event_date_display($data->attendee->event_time, get_option('time_format')) . " - " . event_date_display($data->attendee->end_time, get_option('time_format')) . "</td> " .
            ($data->attendee->quantity > 0 ? '<td>' . $data->attendee->quantity . __(' attendee(s)', 'event_espresso') . '</td>' : '') .
            "</tr>" . $data->email_questions . $data->admin_ticket_link;
    $admin_message = "<h3>" . __('Registration Summary:', 'event_espresso') . "</h3>";
    if (!empty($email_questions)) {
        $admin_message .= "<h3>" . __('Additional Information:', 'event_espresso') . "</h3>";
        $admin_message .= $data->email_questions;
    }
    $headers = '';
    return array(
        'send_to' => $data->event->alt_email == '' ? $org_options['contact_email'] : $_event->alt_email . ',' . $org_options['contact_email'],
        'email_subject' => !$data->multi_reg ? $data->event->event_name . __(' registration confirmation', 'event_espresso') : __('Event Registration Notification', 'event_espresso'),
        'email_body' => $admin_message . $data->table_open . $admin_email_body . $data->table_close,
        'headers' => $headers
    );
}

function email_by_attendee_id($attendee_id, $send_attendee_email = TRUE, $send_admin_email = TRUE, $multi_reg = FALSE) {
    $data = prepare_email_data($attendee_id, $multi_reg);
    if ($send_attendee_email == 'true') {
        $email_params = prepare_email($data);
        event_espresso_send_email($email_params);
    }
    if ($send_admin_email == 'true') {
        $email_params = prepare_admin_email($data);
        event_espresso_send_email($email_params);
    }
}

if (!function_exists('event_espresso_email_confirmations')) {

    function event_espresso_email_confirmations($atts) {
        /**
         *
         * going to be rewriting this. it takes 3 kinds of ids
         * if it gets an attendee id, it should email that single attendee
         * if it gets a registration id, it should email all the attendees of that registration
         * if it gets a session id, it should find all the emails in that session, find all the events for each email address, and email the accumulated details to each email addresse
         */
        global $wpdb;
        extract($atts);
        if (empty($multi_reg))
            $multi_reg = FALSE;
        if (empty($send_admin_email))
            $send_admin_email = FALSE;
        if (empty($send_attendee_email))
            $send_attendee_email = FALSE;

        if (!empty($attendee_id)) {
            email_by_attendee_id($attendee_id, $send_attendee_email, $send_admin_email, $multi_reg);
        } elseif (!empty($registration_id)) {
            $sql = "SELECT id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id = '" . $registration_id . "'";
            $attendees = $wpdb->get_col($sql);
            foreach ($attendees as $attendee_id) {
                email_by_attendee_id($attendee_id, $send_attendee_email, $send_admin_email, $multi_reg);
            }
        } elseif (!empty($session_id)) {
            $sql = "SELECT id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE attendee_session = '" . $session_id . "'";
            $attendees = $wpdb->get_col($sql);
            foreach ($attendees as $attendee_id) {
                email_by_attendee_id($attendee_id, $send_attendee_email, $send_admin_email, $multi_reg);
            }
        }
    }

}

//Email sender
if (!function_exists('event_espresso_send_email')) {

    function event_espresso_send_email($params) {
        global $org_options;
        extract($params);
        //Define email headers
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: " . $org_options['organization'] . " <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Content-Type: text/html; charset=utf-8\r\n";
        //echo '<hr />'.$send_to.'<br />';
        //echo $email_subject .$email_body.'<hr />';
        return wp_mail($send_to, stripslashes_deep(html_entity_decode($email_subject, ENT_QUOTES, "UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers);
    }

}

// Attendee registration approval pending
if (!function_exists('event_espresso_send_attendee_registration_approval_pending')) {

    function event_espresso_send_attendee_registration_approval_pending($registration_id) {
        global $org_options, $wpdb;
        //Get the event information
        $events = $wpdb->get_results("SELECT ed.* FROM " . EVENTS_DETAIL_TABLE . " ed
						JOIN " . EVENTS_ATTENDEE_TABLE . " ea
						ON ed.id = ea.event_id
						WHERE ea.registration_id='" . $registration_id . "'");

        foreach ($events as $event) {
            $event_id = $event->id;
            $event_name = stripslashes_deep($event->event_name);
            $event_desc = stripslashes_deep($event->event_desc);
            $display_desc = $event->display_desc;
            $event_identifier = $event->event_identifier;
            $reg_limit = $event->reg_limit;
            $active = $event->is_active;
            $send_mail = $event->send_mail;
            $conf_mail = $event->conf_mail;
            $email_id = $event->email_id;
            $alt_email = $event->alt_email;
            $start_date = event_date_display($event->start_date);
            $end_date = $event->end_date;
            $virtual_url = $event->virtual_url;
            $virtual_phone = $event->virtual_phone;
            $event_address = $event->address;
            $event_address2 = $event->address2;
            $event_city = $event->city;
            $event_state = $event->state;
            $event_zip = $event->zip;
            $event_country = $event->country;
            $location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');
            $location_phone = $event->phone;
            $require_pre_approval = $event->require_pre_approval;

            $google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country));
        }

        //Build links
        $event_url = espresso_reg_url($event_id);
        $event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';

        $sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE;

        if ($registration_id != '') {
            $sql .= " WHERE registration_id = '" . $registration_id . "' ";
        } elseif ($attendee_id != '') {
            $sql .= " WHERE id = '" . $attendee_id . "' ";
        } else {
            _e('No ID Supplied', 'event_espresso');
        }

        $sql .= " ORDER BY id ";
        $sql .= " LIMIT 0,1 "; //Get the first attendees details


        $attendees = $wpdb->get_results($sql);
        //global $attendee_id;

        foreach ($attendees as $attendee) {
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
        if (!empty($admin_email)) {
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

        if (!empty($attendee_email)) {
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

    function event_espresso_send_payment_notification($atts) {
        global $wpdb, $org_options;

        //Extract the attendee_id and registration_id
        extract($atts);
        $registration_id = "{$registration_id}";
        $attendee_id = "{$attendee_id}";
        $registration_id = $registration_id != '' ? $registration_id : espresso_registration_id($attendee_id);

        //Define email headers
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: " . $org_options['organization'] . " <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Content-Type: text/html; charset=utf-8\r\n";
        $message_top = "<html><body>";
        $message_bottom = "</html></body>";

        //Get the attendee  id or registration_id and create the sql statement
        $sql = "SELECT a.*, e.event_name, e.event_desc, e.start_date, e.send_mail FROM " . EVENTS_ATTENDEE_TABLE . " a ";
        $sql .= " LEFT JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id = a.event_id ";
        if ($registration_id != '') {
            $sql .= " WHERE a.registration_id = '" . $registration_id . "' ";
        } elseif ($attendee_id != '') {
            $sql .= " WHERE a.id = '" . $attendee_id . "' ";
        } else {
            return __('No ID Supplied', 'event_espresso');
        }
        $sql .= "  ORDER BY id LIMIT 1 ";

        $attendees = $wpdb->get_results($sql);

        $start = 0;
        foreach ($attendees as $attendee) {
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


            if ($start == 0) {
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
        $events = $wpdb->get_results("SELECT ed.* FROM " . EVENTS_DETAIL_TABLE . " ed
                        JOIN " . EVENTS_ATTENDEE_TABLE . " ea
                        ON ed.id = ea.event_id
                        WHERE ea.registration_id='" . $registration_id . "'");

        foreach ($events as $event) {
            $event_id = $event->id;
            $event_code = $event->event_code;
            $event_name = $event->event_name;
            $event_desc = $event->event_desc;
            $display_desc = $event->display_desc;
            $event_identifier = $event->event_identifier;
            $reg_limit = $event->reg_limit;
            $active = $event->is_active;
            $send_mail = $event->send_mail;
            $conf_mail = $event->conf_mail;
            $email_id = $event->email_id;
            $alt_email = $event->alt_email;
            $start_date = event_date_display($event->start_date);
            $end_date = $event->end_date;
            $virtual_url = $event->virtual_url;
            $virtual_phone = $event->virtual_phone;
            $event_address = $event->address;
            $event_address2 = $event->address2;
            $event_city = $event->city;
            $event_state = $event->state;
            $event_zip = $event->zip;
            $event_country = $event->country;
            $location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');
            $location_phone = $event->phone;

            $google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country));
        }

        //Build links
        $event_url = home_url() . "/?ee" . $event_id;
        $event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';

        //Build the payment link
        $payment_url = home_url() . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $registration_id;
        $payment_link = '<a href="' . $payment_url . '">' . __('View Your Payment Details') . '</a>';

        //Create PDF Invoice link
        $invoice_link = '<a href="' . home_url() . '/?download_invoice=true&amp;attendee_id=' . $attendee_id . '&amp;registration_id=' . $registration_id . '" target="_blank">' . __('Download PDF Invoice', 'event_espresso') . '</a>';

        //If the custom ticket is available, load the template file
        if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")) {
            if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php")) {
                include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
                $qr_code = espresso_qr_code(array('attendee_id' => $attendee_id, 'event_name' => stripslashes_deep($event_name), 'attendee_first' => $fname, 'attendee_last' => $lname, 'registration_id' => $registration_id, 'event_code' => $event_code, 'ticket_type' => $ticket_type, 'event_time' => $event_time, 'amount_pd' => $amount_pd));
            }
            //Build the ticket link
            //$ticket_url = home_url() . "/?download_ticket=true&amp;id=" . $attendee_id . "&amp;registration_id=" . $registration_id;
            $ticket_link = espresso_ticket_links($registration_id, $attendee_id);
        }

        //Build custom questions
        if (function_exists('event_espresso_custom_questions_output')) {
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
            $alt_email == '' ? $org_options['contact_email'] : $alt_email,
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

        $email_body = $message_top . $org_options['payment_message'] . $message_bottom;

        $subject = str_replace($SearchValues, $ReplaceValues, $org_options['payment_subject']);
        $email_body = str_replace($SearchValues, $ReplaceValues, $email_body);
        if ($org_options['default_mail'] == 'Y') {
            wp_mail($attendee_email, stripslashes_deep(html_entity_decode($subject, ENT_QUOTES, "UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers);
        }
    }

}

//Cancelation Notices
if (!function_exists('event_espresso_send_cancellation_notice')) {

    function event_espresso_send_cancellation_notice($event_id) {
        global $wpdb, $org_options;
        //Define email headers
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: " . $org_options['organization'] . " <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Content-Type: text/html; charset=utf-8\r\n";
        $message_top = "<html><body>";
        $message_bottom = "</html></body>";

        $events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");
        foreach ($events as $event) {
            $event_name = $event->event_name;
            $event_desc = $event->event_desc;
            $send_mail = $event->send_mail;
            $conf_mail = $event->conf_mail;
            $email_id = $event->email_id;
            $alt_email = $event->alt_email;
            $start_date = $event->start_date;
            $end_date = $event->end_date;
            $event_address = $event->address;
            $event_address2 = $event->address2;
            $event_city = $event->city;
            $event_state = $event->state;
            $event_zip = $event->zip;
            $location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');
            $location_phone = $event->phone;

            $attendees = $wpdb->get_results("SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id ='" . $event_id . "'");
            foreach ($attendees as $attendee) {
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


                $subject = __('Event Cancellation Notice', 'event_espresso');
                $email_body = '<p>' . $event_name . __(' has been cancelled.', 'event_espresso') . '</p>';
                $email_body .= '<p>' . __('For more information, please email ' . $alt_email == '' ? $org_options['contact_email'] : $alt_email, 'event_espresso') . '</p>';
                $body = str_replace($tags, $vals, $email_body);
                wp_mail($attendee_email, stripslashes_deep(html_entity_decode($subject, ENT_QUOTES, "UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers);
            }
        }
    }

}

//Send Invoice
if (!function_exists('event_espresso_send_invoice')) {

    function event_espresso_send_invoice($registration_id, $invoice_subject, $invoice_message) {
        global $wpdb, $org_options;
        //Define email headers
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: " . $org_options['organization'] . " <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Content-Type: text/html; charset=utf-8\r\n";
        $message_top = "<html><body>";
        $message_bottom = "</html></body>";
        $start = 0;
        $results = $wpdb->get_results("SELECT a.*, e.event_name, e.event_desc, e.event_code FROM " . EVENTS_ATTENDEE_TABLE . " a
										LEFT JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id = a.event_id
										WHERE a.registration_id = '" . $registration_id . "' ORDER BY a.id LIMIT 1");

        foreach ($results as $result) {
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
            if ($start == 0) {
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

            $event_code = $result->event_code;

            $event_name = $result->event_name;
            $event_desc = $result->event_desc;
        }

        //Build links
        $event_url = espresso_reg_url($event_id);
        $event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';

        //Create PDF Invoice link
        $invoice_link = '<a href="' . home_url() . '/?download_invoice=true&amp;attendee_id=' . $attendee_id . '&amp;registration_id=' . $registration_id . '" target="_blank">' . __('Download PDF Invoice', 'event_espresso') . '</a>';

        //If the custom ticket is available, load the template file
        if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")) {
            if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php")) {
                include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
                $qr_code = espresso_qr_code(array('attendee_id' => $attendee_id, 'event_name' => stripslashes_deep($event_name), 'attendee_first' => $fname, 'attendee_last' => $lname, 'registration_id' => $registration_id, 'event_code' => $event_code, 'ticket_type' => $ticket_type, 'event_time' => $event_time, 'amount_pd' => $amount_pd));
            }
            //Build the ticket link
            //$ticket_url = home_url() . "/?download_ticket=true&amp;id=" . $attendee_id . "&amp;registration_id=" . $registration_id;
            $ticket_link = espresso_ticket_links($registration_id, $attendee_id);
        }

        //Build the payment link
        $payment_url = home_url() . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $registration_id;
        $payment_link = '<a href="' . $payment_url . '">' . __('View Your Payment Details') . '</a>';

        $gaddress = ($address != '' ? $address : '') . ($city != '' ? ',' . $city : '') . ($state != '' ? ',' . $state : '') . ($zip != '' ? ',' . $zip : '') . ($country != '' ? ',' . $country : '');
        $google_map = htmlentities2('http://maps.google.com/maps?q=' . $gaddress);
        $google_map_link = '<a href="' . $google_map . '">' . $google_map . '</a>';

        //Build custom questions
        if (function_exists('event_espresso_custom_questions_output')) {
            $email_questions = event_espresso_custom_questions_output(array('attendee_id' => $attendee_id));
        }

        $invoice_subject = str_replace($SearchValues, $ReplaceValues, $invoice_subject);

        //Send pre-existing email
        $email_id = empty($_REQUEST['email_name']) ? '' : $_REQUEST['email_name'];
        if ($email_id > 0) {
            $email_data = array();
            $email_data = espresso_email_message($email_id);
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
            $alt_email == '' ? $org_options['contact_email'] : $alt_email,
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

        $email_body = $message_top . $message . $message_bottom;

        wp_mail($email, stripslashes_deep(html_entity_decode($invoice_subject, ENT_QUOTES, "UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers);
    }

}

//Reminder Notices
if (!function_exists('espresso_event_reminder')) {

    function espresso_event_reminder($event_id, $email_subject='', $email_text='', $email_id=0) {
        global $wpdb, $org_options;
        //Define email headers
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: " . $org_options['organization'] . " <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Reply-To: " . $org_options['organization'] . "  <" . $org_options['contact_email'] . ">\r\n";
        $headers .= "Content-Type: text/html; charset=utf-8\r\n";
        $message_top = "<html><body>";
        $message_bottom = "</html></body>";
        $count = 0;
        $events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'");
        foreach ($events as $event) {
            $event_id = $event->id;
            $event_code = $event->event_code;
            $event_name = $event->event_name;
            $event_desc = $event->event_desc;
            $alt_email = $event->alt_email;
            //$display_desc=$event->display_desc;
            //$event_identifier=$event->event_identifier;
            //$reg_limit = $event->reg_limit;
            //$active=$event->is_active;
            //$send_mail= $event->send_mail;
            $raw_email_message = $email_text != '' ? $email_text : $event->conf_mail;
            $raw_email_subject = $email_subject != '' ? $email_subject : $event_name;

            //$email_id= $event->email_id;
            $start_date = event_date_display($event->start_date);
            $end_date = $event->end_date;
            $event_address = $event->address;
            $event_address2 = $event->address2;
            $event_city = $event->city;
            $event_state = $event->state;
            $event_zip = $event->zip;
            $event_country = $event->country;
            $location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');
            $location_phone = $event->phone;

            $google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country));

            //Build links
            $event_url = espresso_reg_url($event_id);
            $event_link = '<a href="' . $event_url . '">' . $event_name . '</a>';
        }

        $attendees = $wpdb->get_results("SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id ='" . $event_id . "'");
        foreach ($attendees as $attendee) {
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
            $invoice_link = '<a href="' . home_url() . '/?download_invoice=true&amp;attendee_id=' . $attendee_id . '&amp;registration_id=' . $registration_id . '" target="_blank">' . __('Download PDF Invoice', 'event_espresso') . '</a>';

            //Build the payment link
            $payment_url = home_url() . "/?page_id=" . $org_options['return_url'] . "&amp;registration_id=" . $registration_id;
            $payment_link = '<a href="' . $payment_url . '">' . __('View Your Payment Details') . '</a>';
            //Build custom questions
            if (function_exists('event_espresso_custom_questions_output')) {
                $email_questions = event_espresso_custom_questions_output(array('attendee_id' => $attendee_id));
            }

            //If the custom ticket is available, load the template file
            if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php")) {
                if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php")) {
                    include_once(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/functions.php");
                    $qr_code = espresso_qr_code(array('attendee_id' => $attendee_id, 'event_name' => stripslashes_deep($event_name), 'attendee_first' => $fname, 'attendee_last' => $lname, 'registration_id' => $registration_id, 'event_code' => $event_code, 'ticket_type' => $ticket_type, 'event_time' => $event_time, 'amount_pd' => $amount_pd));
                }
                //Build the ticket link
                //$ticket_url = home_url() . "/?download_ticket=true&amp;id=" . $attendee_id . "&amp;registration_id=" . $registration_id;
                $ticket_link = espresso_ticket_links($registration_id, $attendee_id);
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
                $alt_email == '' ? $org_options['contact_email'] : $alt_email,
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

            if ($email_id > 0) {
                $email_data = array();
                $email_data = espresso_email_message($email_id);
                $raw_email_message = $email_data['email_text'];
                $raw_email_subject = $email_data['email_subject'];
            }


            $email_subject = str_replace($SearchValues, $ReplaceValues, $raw_email_subject);

            $email_message = str_replace($SearchValues, $ReplaceValues, $raw_email_message);

            $email_body = $message_top . $email_message . $message_bottom;

            if (wp_mail($attendee_email, stripslashes_deep(html_entity_decode($email_subject, ENT_QUOTES, "UTF-8")), stripslashes_deep(html_entity_decode(wpautop($email_body), ENT_QUOTES, "UTF-8")), $headers)) {
                //sleep(1);
                $count++;
            }
        }
        ?>
        <div id="message" class="updated fade">
            <p><strong>
                    <?php _e('Email Sent to ' . $count . ' people sucessfully.', 'event_espresso'); ?>
                </strong></p>
        </div>
        <?php
    }

}

