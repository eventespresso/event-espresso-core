<?php
//Functions that deal with pricing should be placed here

function event_espresso_paid_status_icon($payment_status ='') {
    switch ($payment_status) {
        case 'Checkedin':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/accept.png" width="16" height="16" alt="' . __('Checked-in', 'event_espresso') . '" title="' . __('Checked-in', 'event_espresso') . '" />';
            break;
        case 'NotCheckedin':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/exclamation.png" width="16" height="16" alt="' . __('Not Checked-in', 'event_espresso') . '" title="' . __('Not Checked-in', 'event_espresso') . '" />';
            break;
        case 'Completed':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/accept.png" width="16" height="16" alt="' . __('Completed', 'event_espresso') . '" title="' . __('Completed', 'event_espresso') . '" />';
            break;

        case 'Pending':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/error.png" width="16" height="16" alt="' . __('Pending', 'event_espresso') . '" title="' . __('Pending', 'event_espresso') . '" />';
            break;
        case 'Payment Declined':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/exclamation.png" width="16" height="16" alt="' . __('Payment Declined', 'event_espresso') . '" title="' . __('Payment Declined', 'event_espresso') . '" />';
            break;
        default:
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/exclamation.png" width="16" height="16" alt="' . __('Incomplete', 'event_espresso') . '" title="' . __('Incomplete', 'event_espresso') . '" />';
            break;
    }
}

//Retturns the first price assocaited with an event. If an event has more that one price, you can pass the number of the second price.
if (!function_exists('espresso_return_price')) {

    function espresso_return_single_price($event_id, $number=0) {
        global $wpdb, $org_options;
        $number = $number == 0 ? '0,1' : $number . ',' . $number;

        $results = $wpdb->get_results("SELECT id, event_cost, surcharge FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' ORDER BY id ASC LIMIT " . $number);
        if ($wpdb->num_rows > 0) {
            foreach ($results as $result) {
                if ($result->event_cost > 0.00) {
                    $event_cost = $result->surcharge > 0.00 && $result->event_cost > 0.00 ? $result->event_cost + number_format($result->event_cost * $result->surcharge / 100, 2, '.', '') : $result->event_cost;

                    // Addition for Early Registration discount
                    if (early_discount_amount($event_id, $event_cost) != false) {
                        $early_price_data = array();
                        $early_price_data = early_discount_amount($event_id, $event_cost);
                        $event_cost = $early_price_data['event_price'];
                    }
                } else {
                    $event_cost = '0.00';
                }
            }
        } else {
            $event_cost = '0.00';
        }

        return $event_cost;
    }

}

/*
  Returns the price of an event
 */
if (!function_exists('event_espresso_get_price')) {

    function event_espresso_get_price($event_id) {
        global $wpdb, $org_options;
        $results = $wpdb->get_results("SELECT id, event_cost, surcharge, surcharge_type, price_type FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' ORDER BY id ASC LIMIT 1");
        $surcharge = '';
        $surcharge_text = isset($org_options['surcharge_text']) ? $org_options['surcharge_text'] : __('Surcharge', 'event_espresso');
        foreach ($results as $result) {
            if ($wpdb->num_rows == 1) {
                if ($result->event_cost > 0.00) {
                    $event_cost = $org_options['currency_symbol'] . $result->event_cost;
                    if ($result->surcharge > 0 && $result->event_cost > 0.00) {
                        $surcharge = " + {$org_options['currency_symbol']}{$result->surcharge} " . $surcharge_text;
                        if ($result->surcharge_type == 'pct') {
                            $surcharge = " + {$result->surcharge}% " . $surcharge_text;
                        }
                    }
                    // Addition for Early Registration discount
                    if (early_discount_amount($event_id, $result->event_cost) != false) {
                        $early_price_data = array();
                        $early_price_data = early_discount_amount($event_id, $result->event_cost);
                        $result->event_cost = $early_price_data['event_price'];
                        $message = sprintf(__(' (including %s early discount) ', 'event_espresso'), $early_price_data['early_disc']);
                        //$surcharge = ($result->surcharge > 0.00 && $result->event_cost > 0.00)?" +{$result->surcharge}% " . __('Surcharge','event_espresso'):'';
                        $event_cost = '<span class="event_price_value">' . $org_options['currency_symbol'] . number_format($result->event_cost, 2) . $message . '</span>';
                    }

                    $event_cost .= '<input type="hidden"name="event_cost" value="' . $result->event_cost . '">';
                } else {
                    $event_cost = __('Free Event', 'event_espresso');
                }
            } else if ($wpdb->num_rows == 0) {
                $event_cost = __('Free Event', 'event_espresso');
            }
        }
        return $event_cost . $surcharge;
    }

}

/*
  Returns the final price of an event
 *
 * @params int $price_id
 * @params int $event_id
 */
if (!function_exists('event_espresso_get_final_price')) {

    function event_espresso_get_final_price($price_id, $event_id = 0) {
        global $wpdb, $org_options;
        $results = $wpdb->get_results("SELECT id, event_cost, surcharge, surcharge_type FROM " . EVENTS_PRICES_TABLE . " WHERE id='" . $price_id . "' ORDER BY id ASC LIMIT 1");
        $event_cost = 0.00;
        foreach ($results as $result) {
            if ($wpdb->num_rows >= 1) {
                if ($result->event_cost > 0.00) {

                    $surcharge = number_format($result->surcharge, 2, '.', ''); //by default it's 0.  if flat rate, will just be formatted and atted to the total
                    if ($result->surcharge > 0 && $result->surcharge_type == 'pct') { //if >0 and is percent, calculate surcharg amount to be added to total
                        $surcharge = number_format($result->event_cost * $result->surcharge / 100, 2, '.', '');
                    }

                    $event_cost = $result->event_cost;

                    // Addition for Early Registration discount
                    if (early_discount_amount($event_id, $event_cost) != false) {
                        $early_price_data = array();
                        $early_price_data = early_discount_amount($event_id, $event_cost);
                        $event_cost = $early_price_data['event_price'];
                    }
                } else {
                    $event_cost = 0.00;
                }
            } else if ($wpdb->num_rows == 0) {
                $event_cost = 0.00;
            }
        }
        if (empty($surcharge))
            $surcharge = 0;
        $event_cost = $event_cost + $surcharge;
        return empty($event_cost) ? 0 : $event_cost;
    }

}


//Get the early bird pricing
if (!function_exists('early_discount_amount')) {

    function early_discount_amount($event_id, $event_cost, $message='') {
        global $wpdb, $org_options;

        //$message = ' ' . __('Early Pricing','event_espresso');
        $eventdata = $wpdb->get_results("SELECT early_disc, early_disc_date, early_disc_percentage FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "' LIMIT 1");
        if ((strlen($eventdata[0]->early_disc) > 0) && (strtotime($eventdata[0]->early_disc_date) > strtotime(date("Y-m-d")))) {
            $early_price_display = $eventdata[0]->early_disc_percentage == 'Y' ? $eventdata[0]->early_disc . '%' : $org_options['currency_symbol'] . $eventdata[0]->early_disc;
            if ($eventdata[0]->early_disc_percentage == 'Y') {
                $pdisc = $eventdata[0]->early_disc / 100;
                $event_cost = $event_cost - ($event_cost * $pdisc);
            } else {
                // Use max function to prevent negative cost when discount exceeds price.
                $event_cost = max(0, $event_cost - $eventdata[0]->early_disc);
            }
            //$extra = " " . $message;
            $early_price_data = array('event_price' => $event_cost, 'early_disc' => $early_price_display);
            return $early_price_data;
        } else {
            return false;
        }
    }

}

//Creates dropdowns if multiple prices are associated with an event
if (!function_exists('event_espresso_price_dropdown')) {

    function event_espresso_price_dropdown($event_id, $label = 1, $multi_reg = 0, $value = '') {
		
		//Attention:
		//If changes to this function are not appearing, you may have the members addon installed and will need to update the function there.

        global $wpdb, $org_options;
        $html = '';
        
		//Will make the name an array and put the time id as a key so we know which event this belongs to
        $multi_name_adjust = $multi_reg == 1 ? "[$event_id]" : '';
        $surcharge_text = isset($org_options['surcharge_text']) ? $org_options['surcharge_text'] : __('Surcharge', 'event_espresso');

        $results = $wpdb->get_results("SELECT id, event_cost, surcharge, surcharge_type, price_type FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' ORDER BY id ASC");
        if ($wpdb->num_rows > 1) {
            $html .= $label == 1 ? '<label for="event_cost">' . __('Choose an Option: ', 'event_espresso') . '</label>' : '';
            $html .= '<select name="price_option' . $multi_name_adjust . '" id="price_option-' . $event_id . '">';

            foreach ($results as $result) {

                $selected = $value == $result->id ? ' selected="selected" ' : '';

                // Addition for Early Registration discount
                if (early_discount_amount($event_id, $result->event_cost) != false) {
                    $early_price_data = array();
                    $early_price_data = early_discount_amount($event_id, $result->event_cost);
                    $result->event_cost = $early_price_data['event_price'];
                    $message = __(' Early Pricing', 'event_espresso');
                } else $message = '';

                $surcharge = '';

                if ($result->surcharge > 0 && $result->event_cost > 0.00) {
                    $surcharge = " + {$org_options['currency_symbol']}{$result->surcharge} " . $surcharge_text;
                    if ($result->surcharge_type == 'pct') {
                        $surcharge = " + {$result->surcharge}% " . $surcharge_text;
                    }
                }

                //Using price ID
                $html .= '<option' . $selected . ' value="' . $result->id . '|' . $result->price_type . '">' . $result->price_type . ' (' . $org_options['currency_symbol'] . number_format($result->event_cost, 2) . $message . ') ' . $surcharge . ' </option>';
            }
            $html .= '</select><input type="hidden" name="price_select" id="price_select-' . $event_id . '" value="true">';
        } else if ($wpdb->num_rows == 1) {
            foreach ($results as $result) {

                // Addition for Early Registration discount
                if (early_discount_amount($event_id, $result->event_cost) != false) {
                    $early_price_data = array();
                    $early_price_data = early_discount_amount($event_id, $result->event_cost);
                    $result->event_cost = $early_price_data['event_price'];
                    $message = sprintf(__(' (including %s early discount) ', 'event_espresso'), $early_price_data['early_disc']);
                }

                $surcharge = '';

                if ($result->surcharge > 0 && $result->event_cost > 0.00) {
                    $surcharge = " + {$org_options['currency_symbol']}{$result->surcharge} " . $surcharge_text;
                    if ($result->surcharge_type == 'pct') {
                        $surcharge = " + {$result->surcharge}% " . $surcharge_text;
                    }
                }
                $message = isset($message) ? $message : '';
                $html .= '<span class="event_price_label">' . __('Price:', 'event_espresso') . '</span> <span class="event_price_value">' . $org_options['currency_symbol'] . number_format($result->event_cost, 2) . $message . $surcharge . '</span>';
                $html .= '<input type="hidden" name="price_id' . $multi_name_adjust . '" id="price_id-' . $result->id . '" value="' . $result->id . '">';
            }
        } else if ($wpdb->num_rows == 0) {
            $html .= '<span class="free_event">' . __('Free Event', 'event_espresso') . '</span>';
            $html .= '<input type="hidden" name="payment' . $multi_name_adjust . '" id="payment-' . $event_id . '" value="' . __('free event', 'event_espresso') . '">';
        }
		
        return $html;
    }

}

//This function gets the first price id associated with an event and displays a hidden field.
function espresso_hidden_price_id($event_id) {
    global $wpdb, $org_options;
    $wpdb->get_results("SELECT id FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' LIMIT 0,1 ");
    $num_rows = $wpdb->num_rows;
    if ($num_rows > 0) {
        return '<input type="hidden" name="price_id" id="price_id-' . $wpdb->last_result[0]->id . '" value="' . $wpdb->last_result[0]->id . '">';
    } else {
        return '<div style="display:none">' . __('No prices id results.', 'event_espresso') . '</div>';
    }
}

//This function returns the first price id associated with an event
function espresso_get_price_id($event_id) {
    global $wpdb, $org_options;
    $wpdb->get_results("SELECT id FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' LIMIT 0,1 ");
    $num_rows = $wpdb->num_rows;
    if ($num_rows > 0) {
        return $wpdb->last_result[0]->id;
    } else {
        return 0;
    }
}

if (!function_exists('espresso_payment_type')) {

    function espresso_payment_type($type) {
        switch ($type) {
            case 'web_accept':
                return __('PayPal', 'event_espresso');
                break;
            case 'EW':
                return __('eWay', 'event_espresso');
                break;
            case 'CC':
            case 'PPP':
            case 'auth_capture':
            case 'FD':
                return __('CC', 'event_espresso');
                break;
            case 'INV':
                return __('Invoice', 'event_espresso');
                break;
            case 'OFFLINE':
                return __('Offline payment', 'event_espresso');
                break;
            default:
                return __($type, 'event_espresso');
                break;
        }
    }

}


/**
 * espresso_attendee_price()
 * 
 * @return float|null  the price paid for an event by attendee id or the registration id, if information not found then it will return null
 */
function espresso_attendee_price($atts) {
    global $wpdb;
    isset($atts) ? extract($atts) : '';

    /**
     * If the registration_id is empty, then retrieve it
     * */
    $generated_registration_id = false;
    if (!isset($registration_id)) 
    {
        if (!isset($attendee_id))
        {
            return;
        }
        else
        {
            $registration_id = espresso_registration_id($attendee_id);
        }
    }


    /**
     * Check if the attendee is from old age i.e. before 3.1.10
     * */
    $ice_age = true; 
    $ice_row = $wpdb->get_row($wpdb->prepare("select * from ".EVENTS_ATTENDEE_COST_TABLE." inner join ".EVENTS_ATTENDEE_TABLE." where registration_id = '%s'",$registration_id));
    if ( $ice_row !== NULL )
    {
        $ice_age = false;
    }


    /**
     * Found use of single price only in payment option in attendee record edit page for admin.
     * */
    if (isset($single_price) && $single_price = true && isset($attendee_id) && $attendee_id > 0 ) {
        $sql = '';
        $sql = "SELECT cost amount_pd FROM " . EVENTS_ATTENDEE_COST_TABLE . " eac ";
        $sql .= " WHERE eac.attendee_id ='%d' LIMIT 0,1";

        $res = $wpdb->get_results($wpdb->prepare($sql,$attendee_id));
        if ($wpdb->num_rows >= 1 && $wpdb->last_result[0]->amount_pd != NULL) {
            $total_cost = $wpdb->last_result[0]->amount_pd;
            return number_format($total_cost, 2, '.', '');
        }
    }
    
    /**
     * Return the total amount paid for this registration
     * */
    if (isset($reg_total) && $reg_total = true) {
        $sql = "select amount_pd as total from " . EVENTS_ATTENDEE_TABLE . " where registration_id = '%s' order by id limit 1";
        $total_cost = $wpdb->get_var($wpdb->prepare($sql,$registration_id));
        return number_format($total_cost, 2, '.', '');
    }


    /**
     * Return the total amount paid for a session. Uses the registration id.
     * */
    if (isset($session_total) && $session_total = true) {
        $attendee_session = $wpdb->get_var($wpdb->prepare("select attendee_session from ".EVENTS_ATTENDEE_TABLE." where registration_id = '%s' ",$registration_id));
        if (trim($attendee_session == ''))
        {
            /**
             * If attendee_session is empty then return only single attendee information
             * */
            $total_cost = 0;
            $total_cost = $wpdb->get_var($wpdb->prepare("select sum(amount_pd) as amount_pd from ".EVENTS_ATTENDEE_TABLE." where registration_id = '%s'",$registration_id));
            return number_format($total_cost, 2, '.', '');
        }
        else
        {
            if($ice_age)
            {
                $sql = "select amount_pd from ".EVENTS_ATTENDEE_TABLE."  where attendee_session = '%s' order by id limit 1";
                $total_cost = $wpdb->get_var($wpdb->prepare($sql,$attendee_session));
                return number_format($total_cost, 2, '.', '');
            }
            else
            {
                $primary_registration_id = $registration_id;
                $rs = $wpdb->get_row($wpdb->prepare("select primary_registration_id from ".EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE." where registration_id = '%s' limit 0,1 ",$registration_id));
                if ( $rs !== NULL )
                {
                    $primary_registration_id = $rs->primary_registration_id;
                }
                $sql = "select sum(amount_pd) as total from " . EVENTS_ATTENDEE_TABLE . " where registration_id = '%s' ";
                $total_cost = $wpdb->get_var($wpdb->prepare($sql,$primary_registration_id));
                return number_format($total_cost, 2, '.', '');
            }
        }
    }


    /**
     * Returnt the amount paid for an individual attendee
     * */
    if (isset($attendee_id) && $attendee_id > 0) {
        $sql = '';
        $sql = "SELECT cost amount_pd, quantity FROM " . EVENTS_ATTENDEE_COST_TABLE . " WHERE attendee_id ='" . $attendee_id . "' ORDER BY attendee_id  LIMIT 0,1";
        $res = $wpdb->get_results($sql);
        if ($wpdb->num_rows >= 1 && $wpdb->last_result[0]->amount_pd != NULL) {
            $total_cost = $wpdb->last_result[0]->amount_pd * $wpdb->last_result[0]->quantity;
            return number_format($total_cost, 2, '.', '');
        }
    }

    /**
     * If no results are returned above or the registration id was passed, then get the price by looking in EVENTS_ATTENDEE_TABLE
     * */
    $sql = '';
    $sql = "SELECT amount_pd FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='" . $registration_id . "' ORDER BY id LIMIT 0,1";
    $wpdb->get_results($sql);
    if ($wpdb->num_rows >= 1) {
        return number_format($wpdb->last_result[0]->amount_pd, 2, '.', '');
    }
    return NULL;
}

function get_reg_total_price($registration_id) 
{
    
}

