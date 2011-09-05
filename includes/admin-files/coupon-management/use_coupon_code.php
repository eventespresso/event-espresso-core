<?php
if (!function_exists('event_espresso_coupon_payment_page')) {

    function event_espresso_coupon_payment_page($use_coupon_code, $event_id, $event_cost, $attendee_id) {
        global $espresso_premium;
        if ($espresso_premium != true)
            return;
        global $wpdb, $org_options;

        //For general coupons, added for multi registration
        if (!is_null($event_id)) {
            $event_id_filter = " AND r.event_id = '" . $event_id . "'";
            $single_event = true;
        }

        $today = date("m-d-Y");
        if (!empty($use_coupon_code)) {
            if (!empty($_REQUEST['coupon_code']) || !empty($_POST['event_espresso_coupon_code'])) {

                $coupon_code = $_POST['event_espresso_coupon_code'] ? $_POST['event_espresso_coupon_code'] : $_REQUEST['coupon_code'];

                //$results = $wpdb->get_results("SELECT * FROM ". EVENTS_DISCOUNT_CODES_TABLE ." WHERE coupon_code = '".$_REQUEST['coupon_code']."'");
                $discounts = $wpdb->get_results("SELECT d.* FROM " . EVENTS_DISCOUNT_CODES_TABLE . " d
												JOIN " . EVENTS_DISCOUNT_REL_TABLE . " r ON r.discount_id  = d.id
												WHERE d.coupon_code = '" . $coupon_code . "'" . $event_id_filter);
                if ($wpdb->num_rows > 0) {
                    //_e($sql,'event_espresso');
                    $valid_discount = true;
                    foreach ($discounts as $discount) {
                        $discount_id = $discount->id;
                        $coupon_code = $discount->coupon_code;
                        $coupon_code_price = $discount->coupon_code_price;
                        $coupon_code_description = $discount->coupon_code_description;
                        $use_percentage = $discount->use_percentage;
                    }
                    $discount_type_price = $use_percentage == 'Y' ? $coupon_code_price . '%' : $org_options['currency_symbol'] . $coupon_code_price;
                    $response = '<p id="event_espresso_valid_coupon"><strong>' . __('You are using promotional code:', 'event_espresso') . '</strong> ' . $coupon_code . ' (' . $discount_type_price . ' ' . __('discount', 'event_espresso') . ')</p>';

                    if ($single_event)
                        echo $response;

                    if ($use_percentage == 'Y') {
                        $pdisc = $coupon_code_price / 100;
                        $event_cost = $event_cost - ($event_cost * $pdisc);
                    } else {
                        $event_cost = $event_cost - $coupon_code_price;
                    }
                    $payment_status = 'Incomplete';
                    if ($event_cost == 0.00) {
                        $event_cost = '0.00';
                        $payment_status = 'Completed';
                        //event_espresso_email_confirmations($attendee_id, 'true', 'true' );
                        //event_espresso_email_confirmations(array('attendee_id' => $attendee_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
                    }

                    //if attendee id is supplied, update
                    //Will not be used for multi
                    if (!is_null($attendee_id)) {
                        $sql = array('coupon_code' => $_REQUEST['coupon_code'], 'amount_pd' => $event_cost, 'payment_status' => $payment_status, 'payment_date' => $today);
                        $sql_data = array('%s', '%s', '%s', '%s');
                        $update_id = array('id' => $attendee_id);
                        $wpdb->update(EVENTS_ATTENDEE_TABLE, $sql, $update_id, $sql_data, array('%d'));
                        //Get Registration ID
                        $sql_registration_ID = "SELECT registration_id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id = '$attendee_id'";
                        $registration_ID = $wpdb->get_var($sql_registration_ID);
                        //Update attendees with registration ID
                        $sql_registration_ID2 = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', amount_pd = '0', payment_date= '$today', coupon_code='" . $_REQUEST['coupon_code'] . "' WHERE registration_id='$registration_ID' AND id!='$attendee_id'";
                        $wpdb->query($sql_registration_ID2);
                    }
                    return $event_cost;
                } else {
                    if ($single_event)
                        echo '<p id="event_espresso_invalid_coupon">' . __('Sorry, that promotional code is invalid or expired.', 'event_espresso') . '</p>';
                }
            }
        }
        return $event_cost;
    }

}

if (!function_exists('event_espresso_coupon_registration_page')) {

    function event_espresso_coupon_registration_page($use_coupon_code, $event_id, $multi_reg = 0) {
        global $espresso_premium;
        if ($espresso_premium != true)
            return;
        if ($use_coupon_code == "Y") {

            $multi_reg_adjust = $multi_reg == 1 ? "[$event_id]" : '';

            $output ='<p class="event_form_field coupon_code" id="coupon_code-' . $event_id . '">';
            $output .= '<label for="coupon_code">' . __('Enter Promotional/Discount Code', 'event_espresso') . ':</label>';
            $output .= '<input type="text" tabIndex="9" maxLength="25" size="35" name="coupon_code';
            $output .= $multi_reg_adjust . '" id="coupon_code-' . $event_id . '"></p>';
        }
        return $output;
    }

}