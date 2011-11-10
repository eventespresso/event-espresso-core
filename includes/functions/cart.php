<?php
/**
 * Event Espresso Multi Event Registration Functions
 *
 *
 * @package		Event Espresso
 * @subpackage          Multi Event Registration and shopping cart functions
 * @author		Abel Sekepyan
 * @link		http://eventespresso.com/support/
 */
/**
 * Add event or item (planned for shopping cart) to the session
 *
 * @param $_POST
 *
 * @return JSON object
 */
if (!function_exists('event_espresso_add_item_to_session')) {


    function event_espresso_add_item_to_session() {
        global $wpdb;
        // echo "<pre>", print_r( $_POST ), "</pre>";
        $events_in_session = $_SESSION['events_in_session'];

        /*
         * added the cart_link_# to the page to prevent element id conflicts on the html page
         *
         */
        $id = $_POST['id'];
		$direct_to_cart = isset($_POST['direct_to_cart'])?$_POST['direct_to_cart']:0;
		$moving_to_cart = isset($_POST['moving_to_cart'])?urldecode($_POST['moving_to_cart']):"Please wait redirecting to cart page";
        //One link, multiple events
        if (strpos($id, "-")) {

            $event_group = str_replace('cart_link_', '', $id);
            $event_group = explode("-", $event_group);

            foreach ($event_group as $event) {

                $event_title = get_event_field('event_name', EVENTS_DETAIL_TABLE, ' WHERE id = ' . $event);

                event_espresso_add_event_process((int) $event, $event_title);
            }
        } else { //one event per click
            $id = str_replace('cart_link_', '', $id);

            event_espresso_add_event_process($id, $_POST['name']);
        }

        $r = event_espresso_cart_link(array('event_id' => $id, 'view_cart' => TRUE, 'event_page_id' => $_POST['event_page_id'], 'direct_to_cart'=>$direct_to_cart, 'moving_to_cart'=>$moving_to_cart));

        echo event_espresso_json_response(array('html' => $r, 'code' => 1));
        //echo '<a href="' . site_url() . '/events/?regevent_action=show_shopping_cart">' . __( 'View Cart', 'event_espresso' ) . '</a>';

        die();
    }

}


/**
 * Processor function for adding items to the session
 *
 * @param event_id
 * @param event_name
 *
 * @return true
 */
if (!function_exists('event_espresso_add_event_process')) {


    function event_espresso_add_event_process($event_id, $event_name) {

        $events_in_session = $_SESSION['events_in_session'];

        $events_in_session[$event_id] = array(
            'id' => $event_id,
            'event_name' => stripslashes_deep($event_name),
            'attendee_quantitiy' => 1,
            'start_time_id' => '',
            'price_id' => array(),
            'cost' => 0,
            'event_attendees' => array()
        );


        $_SESSION['events_in_session'] = $events_in_session;


        return true;
    }

}

/**
 * Convert passed array to json object
 *
 * @param array
 *
 * @return JSON object
 */
if (!function_exists('event_espresso_json_response')) {


    function event_espresso_json_response($params = array()) {

        $params['code'] = 1;

        return json_encode($params);
    }

}

/**
 * Return an individual Session variable
 *
 * @param key
 *
 * @return value of session key
 */
if (!function_exists('event_espresso_return_session_var')) {


    function event_espresso_return_session_var($k = null) {

        if (is_null($k))
            return;


        return array_key_exists($k, $_SESSION) ? $_SESSION[$k] : null;
    }

}

/**
 * Updates item information in the session
 *
 * @param $_POST
 *
 * @return true
 */
if (!function_exists('event_espresso_update_item_in_session')) {


    function event_espresso_update_item_in_session($update_section = null) {
        global $wpdb;

        /*
         * - grab the event sessions
         * - loop through the events and for each one
         * -- update the pricing, time options
         * -- update the attendee information
         */


        $events_in_session = $_SESSION['events_in_session'];

        if (!is_array($events_in_session))
            return false;
        //holds the updated infromation
        $updated_events_in_session = $events_in_session;
        //$updated_events_in_session = array( );

        if ($update_section == 'details') {

            foreach ($events_in_session as $k => $v) {

                $event_cost = 0;
                $event_id = $k;
                $event_individual_cost[$event_id] = 0;
                $updated_events_in_session[$event_id]['id'] = $event_id;
                /*
                 * if the array key exists, update that array key with the value from post
                 */


                //Start time selection
                $start_time_id = '';
                if (array_key_exists('start_time_id', $_POST) && array_key_exists($event_id, $_POST['start_time_id'])) {

                    $updated_events_in_session[$event_id]['start_time_id'] = $wpdb->escape($_POST['start_time_id'][$event_id]);

                    //unset the post key so it doesn't get added below
                    unset($_POST['start_time_id'][$event_id]);
                }

                //Pricing selection
                $price_id = null;

                //resetting this session var for just in case the event organizer makes changes when someone is
                //registering, the old price ids don't stay in the session
                $updated_events_in_session[$event_id]['price_id'] = array();


                /*
                 * the price id comes this way
                 * - from a dropdown >> price_id[event_id][price_id]
                 * - from a radio >> price_id[event_id] with a value of price_id
                 */
                $attendee_quantitiy = 1;
                $price_id = $_POST['price_id'][$event_id];

                if (is_array($price_id)) {
                    foreach ($price_id as $_price_id => $val) {
                        //assign the event type and the quantity
                        $updated_events_in_session[$event_id]['price_id'][$_price_id]['attendee_quantity'] = $wpdb->escape($val);
                        $updated_events_in_session[$event_id]['price_id'][$_price_id]['price_type'] = $events_in_session[$event_id]['price_id'][$_price_id]['price_type'];

                        $attendee_quantitiy++;
                    }
                } else {
                    if (isset($price_id)) {
                        $updated_events_in_session[$event_id]['price_id'][$price_id]['attendee_quantity'] = 1;
                        $updated_events_in_session[$event_id]['price_id'][$price_id]['price_type'] = $events_in_session[$event_id]['price_id'][$price_id]['price_type'];
                    }
                }

                $updated_events_in_session[$event_id]['attendee_quantitiy'] = $attendee_quantitiy;

                //Get Cost of each event
                //$updated_events_in_session[$event_id]['cost'] = $event_individual_cost[$event_id];
                //$updated_events_in_session[$event_id]['event_name'] = $wpdb->escape( $_POST['event_name'][$event_id] );

                if (isset($_POST['event_espresso_coupon_code'])) {
                    $_SESSION['event_espresso_coupon_code'] = $wpdb->escape($_POST['event_espresso_coupon_code']);
                }
            }
        }



        if ($update_section == 'attendees') {
            //show the empty cart error
            if (event_espresso_invoke_cart_error($events_in_session))
                return false;

            foreach ($events_in_session as $k_event_id => $v_event_id) {
                //unset the event attendees array because they may have decreased the number of attendees
                if (isset($updated_events_in_session[$k_event_id]['event_attendees']))
                    $updated_events_in_session[$k_event_id]['event_attendees'] = array();

                $price_id = $v_event_id['price_id'];

                if (is_array($price_id)) {
                    foreach ($price_id as $_price_id => $val) {
                        $index = 1;
                        //assign the event type and the quantity
                        foreach ($_POST as $post_name => $post_value) {
                            //$field_values come in as arrays since their names are designated as arrays,e.g. fname[eventid][price_id][index]
                            if (is_array($post_value) && array_key_exists($k_event_id, $post_value) && array_key_exists($_price_id, $post_value[$k_event_id])) {

                                foreach ($post_value[$k_event_id][$_price_id] as $mkey => $mval) {
                                    $updated_events_in_session[$k_event_id]['event_attendees'][$_price_id][$mkey][$post_name] = $mval;
                                    //echo "multi $k > $field_name >" . $mkey . " > " . $mval . "<br />";
                                }
                            }
                        }
                    }
                }
            }
        }

        $_SESSION['events_in_session'] = $updated_events_in_session;
        //echo "<pre>", print_r($updated_events_in_session), "</pre>";

        return true;

        die();
    }

}


/**
 * Calculates total of the items in the session
 *
 * @param $_POST
 *
 * @return JSON (grand total)
 */
if (!function_exists('event_espresso_calculate_total')) {


    function event_espresso_calculate_total($update_section = null) {
        //print_r($_POST);
        global $wpdb;
        $events_in_session = $_SESSION['events_in_session'];

        if (is_array($events_in_session)) {

            $event_total_cost = 0;

            foreach ($events_in_session as $k => $v) {
                $event_cost = 0;
                $event_id = $k;
                $event_individual_cost[$event_id] = 0;

                $start_time_id = '';
                if (array_key_exists('start_time_id', $_POST) && array_key_exists($event_id, $_POST['start_time_id'])) {

                    $start_time_id = $_POST['start_time_id'][$event_id];
                }

                /*
                 * two ways the price id comes this way
                 * - from a dropdown >> price_id[event_id][price_id]
                 * - from a radio >> price_id[event_id] with a value of price_id
                 */
                $price_id = $_POST['price_id'][$event_id];

                if (is_array($price_id)) {
                    foreach ($price_id as $_price_id => $val) {
                        $attendee_quantitiy = $wpdb->escape($val);

                        if ($attendee_quantitiy > 0) {
                            $event_cost = event_espresso_get_final_price($_price_id, $event_id);
                            $event_individual_cost[$event_id] += number_format($event_cost * $attendee_quantitiy, 2, '.', '');
                        }
                    }
                } else {
                    $attendee_quantitiy = 1;

                    $event_cost = event_espresso_get_final_price($price_id, $event_id);
                    $event_individual_cost[$event_id] = number_format($event_cost * $attendee_quantitiy, 2, '.', '');
                }
                $_SESSION['events_in_session'][$event_id]['cost'] = $event_individual_cost[$event_id];
                $event_total_cost += $event_individual_cost[$event_id];
            }

            $_SESSION['event_espresso_pre_discount_total'] = number_format($event_total_cost, 2, '.', '');

            if (function_exists('event_espresso_coupon_payment_page') && isset($_POST['event_espresso_coupon_code'])) {

                if (isset($_POST['event_espresso_coupon_code'])) {

                    $event_total_cost = event_espresso_coupon_payment_page('Y', NULL, $event_total_cost, NULL);
                }
            }
            $grand_total = number_format($event_total_cost, 2, '.', '');

            $_SESSION['event_espresso_grand_total'] = $grand_total;
            event_espresso_update_item_in_session($update_section);
        }
        //}
        if ($update_section == null) {
            echo event_espresso_json_response(array('grand_total' => $grand_total));
            die();
        }
    }

}


/**
 * Delete and item from the session
 *
 * @param $_POST
 *
 * @return JSON 0 or 1
 */
if (!function_exists('event_espresso_delete_item_from_session')) {


    function event_espresso_delete_item_from_session() {
        global $wpdb;

        $events_in_session = $_SESSION['events_in_session'];

        /*
         * added the cart_link_# to the page to prevent element id conflicts on the html page
         *
         */
        $id = $_POST['id'];
        $id = str_replace('cart_link_', '', $id);

        unset($events_in_session[$id]);

        if (count($events_in_session) == 0) {

            unset($_SESSION['event_espresso_coupon_code']);
            unset($_SESSION['events_in_session']);
            unset($_SESSION['event_espresso_grand_total']);
        } else
            $_SESSION['events_in_session'] = $events_in_session;


        echo event_espresso_json_response();

        die();
    }

}

/**
 * Loads the registration form based on information in the session
 *
 * @return HTML form
 */
if (!function_exists('event_espresso_load_checkout_page')) {


    function event_espresso_load_checkout_page() {
        global $wpdb, $org_options;

        $events_in_session = $_SESSION['events_in_session'];

        if (event_espresso_invoke_cart_error($events_in_session))
            return false;

        //echo "<pre>", print_r( $_SESSION ), "</pre>";
        if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "multi_registration_page.php")) {
            require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "multi_registration_page.php"); //This is the path to the template file if available
        } else {
            require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/multi_registration_page.php");
        }

        $response['html'] = '';
        //if the counte of event in the session >0, ok to process
        if (count($events_in_session) > 0) {
            //for each one of the events in session, grab the event ids, drop into temp array, impode to construct SQL IN clasue (IN(1,5,7))
            foreach ($events_in_session as $event) {
                // echo $event['id'];
                if (is_numeric($event['id']))
                    $events_IN[] = $event['id'];
            }

            $events_IN = implode(',', $events_IN);


            $sql = "SELECT e.* FROM " . EVENTS_DETAIL_TABLE . " e ";
            $sql .= " WHERE e.id in ($events_IN) ";
            $sql .= " ORDER BY e.start_date ";

            $result = $wpdb->get_results($sql);

            //will hold data to pass to the form builder function
            $meta = array();
            //echo "<pre>", print_r($_POST), "</pre>";
            ?>
            <div class = "event_espresso_form_wrapper">
                <form id="event_espresso_checkout_form" method="post" action="?page_id=<?php echo $org_options['event_page_id']; ?>&regevent_action=post_multi_attendee">
                    <?php
                    $err = '';
                    ob_start();
                    //will be used if sj is off or they somehow select more than allotted attendees
                    $show_checkout_button = true;
                    $counter = 1;
                    foreach ($result as $r) {



                        $event_id = $r->id;
                        $event_meta = unserialize($r->event_meta);
                        //DEPRECATED
                        //Pull the detail from the event detail row, find out which route to take for additional attendees
                        //Can be 1) no questios asked, just record qty 2) ask for only personal info 3) ask all attendees the full reg questions
                        //#1 is not in use as of ..P35
                        $meta['additional_attendee_reg_info'] = (is_array($event_meta) && array_key_exists('additional_attendee_reg_info', $event_meta) && $event_meta['additional_attendee_reg_info'] > 1) ? $event_meta['additional_attendee_reg_info'] : 2;

                        //In case the js is off, the attendee qty dropdowns will not
                        //function properly, allowing for registering more than allowed limit.
                        //The info from the following 5 lines will determine
                        //if they have surpassed the limit.
                        $available_spaces = get_number_of_attendees_reg_limit($event_id, 'number_available_spaces');

                        $attendee_limit = $r->additional_limit + 1;

                        if ($available_spaces != 'Unlimited')
                            $attendee_limit = ($attendee_limit <= $available_spaces) ? $attendee_limit : $available_spaces;

                        $total_attendees_per_event = 0;

                        $attendee_overflow = false;

                        //assign variable
                        $meta['additional_attendee'] = 0;
                        $meta['attendee_number'] = 1;

                        //used for "Copy From" dropdown on the reg form
                        $meta['copy_link'] = $counter;

                        //Grab the event price ids from the session.  All event must have at least one price id
                        $price_ids = $events_in_session[$event_id]['price_id'];




                        //Just to make sure, check if is array
                        if (is_array($price_ids)) {
                            //for each one of the price ids, load an attendee question section
                            foreach ($price_ids as $_price_id => $val) {

                                if (isset($val['attendee_quantity']) && $val['attendee_quantity'] > 0) { //only show reg form if attendee qty is set
                                    $meta['price_id'] = $_price_id; //will be used to keep track of the attendee in the group
                                    $meta['price_type'] = $val['price_type']; //will be used to keep track of the attendee in the group
                                    $meta['attendee_quantity'] = $val['attendee_quantity'];
                                    $total_attendees_per_event += $val['attendee_quantity'];
                                    multi_register_attendees(null, $event_id, $meta);
                                    $meta['attendee_number'] += $val['attendee_quantity'];
                                }
                            }

                            //If they have selected more than allowed max group registration
                            //Dispaly an error instead of the continue button
                            if ($total_attendees_per_event > $attendee_limit || $total_attendees_per_event == 0) {
                                $attendee_overflow = true;
                                $show_checkout_button = false;
                            }
                        }


                        if ($attendee_overflow) {

                            $err .= "<div class='attention-icon'><p class='event_espresso_attention'><em>Attention: </em><br />";
                            $err .= sprintf(__("For <b>%s</b>, please make sure to select between <b>1</b> and <b>%d</b> attendees or delete it from your cart.", 'event_espresso'), stripslashes($r->event_name), $attendee_limit);
							                // this delete link removed as it doesn't appear to function from the error response view - hugo
							               //$err .= '<span class="remove-cart-item"><img class="ee_delete_item_from_cart" id="cart_link_'.$event_id.'" alt="Remove this item from your cart" src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/icons/remove.gif" /></span> ';
                            $err .= "</p></div>";
                        }


                        $counter++;
                    }

                    $output = ob_get_contents();
                    ob_end_clean();

                    if ($err != '')
                        echo $err;

                    if ($show_checkout_button) {

                        echo $output;
                        ?>

                        <input type="submit" class="submit btn_event_form_submit" name="payment_page" value="<?php _e('Confirm and go to payment page', 'event_espresso'); ?>" />

                        <?php _e('<span> - OR - <span>', 'event_espresso');
                    } ?>

                    <a href="?page_id=<?php echo $org_options['event_page_id']; ?>&regevent_action=show_shopping_cart" class="btn_event_form_submit inline-link">  <?php _e('Return &amp; Edit Cart', 'event_espresso'); ?> </a>

                </form>
            </div>
            <script type="text/javascript">
                jQuery(function(){

                    //Registration form validation
                    jQuery('#event_espresso_checkout_form').validate();


                });
            </script>
            <?php
        }


        //echo json_encode( $response );
        //die();
    }

}
?>
<?php

/**
 * NOT USED.  Returns the "Copy from " dropdown.
 */
function event_espresso_copy_dd($event_id, $meta) {

    $events_in_session = $_SESSION['events_in_session'];
    $count_of_events = count($events_in_session);


    $var = '<div class = "copy_dropdown_wrapper"> ';
    $var .= '<label>Copy from: </label>';
    $var .= '<select id="multi_regis_form_fields-' . $event_id . '" class="event_espresso_copy_info">';
    $var .= "<option value=''></option>";

    /*
     * 1) loop through all the events in the session
     * 2) For each one of the events, loop through the price ids
     * 3) If the attendee quantity is set and is >0,
     * 4) TURNED OFF in P41 -produce the dropdown if it is not the same price id
     */

    foreach ($events_in_session as $k_event_id => $v_event_id) {

        foreach ($v_event_id['price_id'] as $k_price_id => $v_price_id) {
            $event_meta = event_espresso_get_event_meta($v_event_id['id']);
            if (isset($v_price_id['attendee_quantity']) && $v_price_id['attendee_quantity'] > 0) {
                if ($event_meta['additional_attendee_reg_info'] == 1) {
                    $i = 1;
                    $event_name = strlen($v_event_id['event_name']) > 25 ? substr($v_event_id['event_name'], 0, 15) . '... ' : $v_event_id['event_name']; //if too long to display
                    $var .= "<option value='$event_id|{$meta['price_id']}|{$meta['attendee_number']}|$k_event_id|$k_price_id|$i'>" . stripslashes_deep($event_name) . ' - ' . $v_price_id['price_type'] . ' - Attendee ' . $i . "</option>";
                } else {
                    for ($i = 1; $i <= $v_price_id['attendee_quantity']; $i++) {
                        $event_name = strlen($v_event_id['event_name']) > 25 ? substr($v_event_id['event_name'], 0, 15) . '... ' : $v_event_id['event_name']; //if too long to display
                        $var .= "<option value='$event_id|{$meta['price_id']}|{$meta['attendee_number']}|$k_event_id|$k_price_id|$i'>" . stripslashes_deep($event_name) . ' - ' . $v_price_id['price_type'] . ' - Attendee ' . $i . "</option>";
                    }
                }
            }
        }
    }

    $var .= "<option value='$event_id|{$meta['price_id']}|{$meta['attendee_number']}'>CLEAR FIELDS</option>";
    $var .= "</select></div>";

    return $var;

    return "<a href='#' class='event_espresso_copy_link' id='event_espresso_copy_link-$event_id'> Copy from above</a>";
}

/**
 * Add event or item (planned for shopping cart) to the session
 *
 * @param $_POST
 *
 * @return JSON object
 */
if (!function_exists('event_espresso_confirm_and_pay')) {


    function event_espresso_confirm_and_pay() {
        global $wpdb;

        $events_in_session = $_SESSION['events_in_session'];


        foreach ($events_in_session as $k => $v) {

            foreach ($_POST as $field_name => $field_value) {

                if (is_array($field_value) && array_key_exists($events_in_session, $field_value)) {

                    if (is_multi($field_value)) {

                        //$multi_key= $field_value[$k];
                        foreach ($field_value[$k] as $mkey => $mval) {

                            echo "multi $k > $field_name >" . $mkey . " > " . $mval . "<br />";
                        }
                    } else {

                        echo "$k > $field_name >" . $field_value[$k] . "<br />";
                    }
                }
            }
            echo "<hr />";
        }
        //echo "<pre>" , print_r($_POST) , "</pre>";

        die();
    }

}


/**
 * Creates the # of Attendees dropdown in the shopping cart page
 *
 * @param $event_id
 * @param $price_id
 * @param $qty - of attendees allowed in this registration
 * @param $value - previously selected value
 *
 * @return Dropdown
 */
if (!function_exists('event_espresso_multi_qty_dd')) {


    function event_espresso_multi_qty_dd($event_id, $price_id, $qty, $value = '') {
        $counter = 0;
        ?>

        <select name="price_id[<?php echo $event_id; ?>][<?php echo $price_id; ?>]" id="price_id-<?php echo $event_id; ?>" class="price_id">
            <?php
            for ($i = 0; $i <= $qty; $i++):
                $selected = ($i == $value) ? ' selected="selected" ' : '';
                ?>

                <option <?php echo $selected; ?> value="<?php echo $i; ?>"><?php echo $i; ?></option>
            <?php endfor; ?>

        </select>

        <?php
    }

}


/**
 * Additional attendees grid
 *
 * @param $additional_limit -limit of attendees
 * @param $available_spaces -available spaces
 * @param $event_id
 *
 * @return JSON object
 */
if (!function_exists('event_espresso_multi_additional_attendees')) {
//Need to verify
//Doesn't look like this function is used anywhere in the plugin
    function event_espresso_multi_additional_attendees($additional_limit, $available_spaces, $event_id = null) {
        if ($additional_limit == 0)
            return;
        $events_in_session = $_SESSION['events_in_session'];
        ?>
        <div class="event_espresso_add_attendee_wrapper-<?php echo $event_id; ?>">
            <?php
            while (($i < $additional_limit) && ($i < $available_spaces)) {
                $i++;
                ?>

                <div class="additional_attendees-<?php echo $event_id . '-' . $i; ?>">
                    <p class="event_form_field additional_header" id="">
                        Additional Attendee <?php echo $i; ?>
                    </p>
                    <div class="clone espresso_add_attendee">
                        <p>
                            <label for="x_attendee_fname"><?php _e('First Name', 'event_espresso'); ?><em>*</em></label>
                            <input type="text" name="x_attendee_fname[<?php echo $event_id; ?>][<?php echo $i; ?>]" class='required input' value="<?php echo $events_in_session[$event_id]['event_attendees']['x_attendee_fname'][$i] ?>" />
                        </p>
                        <p>
                            <label for="x_attendee_lname"><?php _e('Last Name', 'event_espresso'); ?><em>*</em></label>
                            <input type="text" name="x_attendee_lname[<?php echo $event_id; ?>][<?php echo $i; ?>]" class='required input' value="<?php echo $events_in_session[$event_id]['event_attendees']['x_attendee_lname'][$i] ?>" />
                        </p>
                        <p>
                            <label for="x_attendee_email"><?php _e('Email', 'event_espresso'); ?><em>*</em></label>
                            <input type="text" name="x_attendee_email[<?php echo $event_id; ?>][<?php echo $i; ?>]" class='required email input' value="<?php echo $events_in_session[$event_id]['event_attendees']['x_attendee_email'][$i] ?>" />
                        </p>
                    </div>
                </div>
                <?php
            }
            $i = $i - 1;
            ?>
        </div>
        <?php
    }

}


/**
 * Creates add to cart link or view cart
 *
 * @param $array
 *
 * @return JSON object
 */
if (!function_exists('event_espresso_cart_link')) {


    function event_espresso_cart_link($atts) {

        global $org_options,$this_event_id;

        $events_in_session = $_SESSION['events_in_session'];

        extract(shortcode_atts(
                        array(
                    'event_id' => $this_event_id,
                    'anchor' => __('Add to cart', 'event_espresso'),
											'anchor_class' => 'class="cart-link ui-priority-primary ui-state-default"',
                    'event_name' => ' ',
                    'separator' => NULL,
                    'view_cart' => FALSE,
                    'event_page_id' => $org_options['event_page_id'], //instead of sending it in as a var, grab the id here.
					'direct_to_cart' => 0,
					'moving_to_cart' => "Please wait redirecting to cart page"
                        ), $atts));

        $registration_cart_class = '';
        ob_start();

        // if event is already in session, return the view cart link
        if ($view_cart || (is_array($events_in_session) && array_key_exists($event_id, $events_in_session))) {
            $registration_cart_url = get_option('siteurl') . '/?page_id=' . $event_page_id . '&regevent_action=show_shopping_cart';
            $registration_cart_anchor = __("View Cart", 'event_espresso');
							$registration_cart_class = 'ee-view-cart-link cart-link ui-priority-primary ui-state-default';
        } else { //show them the add to cart link
            $registration_cart_url = isset($externalURL) && $externalURL != '' ? $externalURL : get_option('siteurl') . '/?page_id=' . $event_page_id . '&regevent_action=add_event_to_cart&event_id=' . $event_id;
            $registration_cart_anchor = $anchor;
            $registration_cart_class = 'ee_add_item_to_cart cart-link ui-priority-primary ui-state-default';
        }

        if ( $view_cart && $direct_to_cart == 1 )
		{
			echo "<span id='moving_to_cart'>{$moving_to_cart}</span>";
			echo "<script language='javascript'>window.location='".$registration_cart_url."';</script>";
			
		}
		else
		{
			echo $separator . ' <a class="' . $registration_cart_class . '" id="cart_link_' . $event_id . '" href="' . $registration_cart_url . '" title="' . stripslashes_deep($event_name) . '" moving_to_cart="'. urlencode($moving_to_cart) .'" direct_to_cart="'.$direct_to_cart.'" >' . $registration_cart_anchor . '</a>';

		}

        $buffer = ob_get_contents();
        ob_end_clean();
        return $buffer;
    }

}
add_shortcode('ESPRESSO_CART_LINK', 'event_espresso_cart_link');

if (!function_exists('event_espresso_invoke_cart_error')) {


    function event_espresso_invoke_cart_error($events_in_session) {
        if (!is_array($events_in_session)) { ?>

            <div class="attention-icon"><p class="event_espresso_attention"><?php _e('It looks like you are attempting to refresh a page after completing your registration or your cart is empty.  Please go to the events page and try again.', 'event_espresso') ?> </p></div>
        <?php    return true;
        }
        return false;
    }

}


if (!function_exists('event_espresso_clear_session')) {
//Need to verify
//This function should probably be invoked when a payment is confirmed or when the attendee confirms the registration on free events.
//Right now it only seems to be used in th add_attendees_to_db.php when an attendee confirms a paid registration, but I am not sure it is working.
    function event_espresso_clear_session() {

        $_SESSION['espresso_session_id'] = '';
        $_SESSION['events_in_session'] = '';
        $_SESSION['event_espresso_pre_discount_total'] = 0;
        $_SESSION['event_espresso_grand_total'] = 0;
        $_SESSION['event_espresso_coupon_code'] = '';
    }

}



//Creates dropdowns if multiple prices are associated with an event
if (!function_exists('event_espresso_group_price_dropdown')) {


    function event_espresso_group_price_dropdown($event_id, $label = 1, $multi_reg = 0, $value = '') {
        global $wpdb, $org_options;

        /*
         * find out pricing type.
         * - If multiple price options, for each one
         * -- Create a row in a table with a name
         * -- qty dropdown
         *
         */

        //Will make the name an array and put the time id as a key so we
        //know which event this belongs to
        $multi_name_adjust = $multi_reg == 1 ? "[$event_id]" : '';

        $results = $wpdb->get_results("SELECT ept.id, ept.event_cost, ept.surcharge, ept.surcharge_type, ept.price_type, edt.allow_multiple, edt.additional_limit
                                               FROM " . EVENTS_PRICES_TABLE . " ept
                                               JOIN " . EVENTS_DETAIL_TABLE . "  edt
                                                   ON ept.event_id =  edt.id
                                                   WHERE event_id='" . $event_id . "' ORDER BY ept.id ASC");

        if ($wpdb->num_rows > 0) {

            $attendee_limit = 1;
            //echo $label==1?'<label for="event_cost">' . __('Choose an Option: ','event_espresso') . '</label>':'';
            //echo '<input type="radio" name="price_option' . $multi_name_adjust . '" id="price_option-' . $event_id . '">';
            ?>
            <table class="price_list">
                <?php
                $available_spaces = get_number_of_attendees_reg_limit($event_id, 'number_available_spaces');
                foreach ($results as $result) {

                    //Setting this field for use on the registration form
                    $_SESSION['events_in_session'][$event_id]['price_id'][$result->id]['price_type'] = $result->price_type;
                    // Addition for Early Registration discount
                    if (early_discount_amount($event_id, $result->event_cost) != false) {
                        $early_price_data = array();
                        $early_price_data = early_discount_amount($event_id, $result->event_cost);
                        $result->event_cost = $early_price_data['event_price'];
                        $message = __(' Early Pricing', 'event_espresso');
                    }


                    $surcharge = '';

                    if ($result->surcharge > 0 && $result->event_cost > 0.00) {
                        $surcharge = " + {$org_options['currency_symbol']}{$result->surcharge} " . __('Surcharge', 'event_espresso');
                        if ($result->surcharge_type == 'pct') {
                            $surcharge = " + {$result->surcharge}% " . __('Surcharge', 'event_espresso');
                        }
                    }

                    //echo '<option value="' . number_format($result->event_cost,2) . '|' . $result->price_type . '|' . $result->surcharge . '">' . $result->price_type . ' (' . $org_options['currency_symbol'] .  number_format($result->event_cost,2) . $message  . ') '. $surcharge . ' </option>';
                    ?>


                    <tr>
                        <td class="price_type">
                            <?php echo $result->price_type; ?>
                        </td>
                        <td class="price">
                            <?php
                            if (!isset($message))
                                $message = '';
                            echo $org_options['currency_symbol'] . number_format($result->event_cost, 2) . $message . ' ' . $surcharge;
                            ?>

                        </td>
                        <td class="selection">
                            <?php
                            if ($result->allow_multiple == 'Y') {
                                $attendee_limit = $result->additional_limit + 1;

                                if ($available_spaces != 'Unlimited')
                                    $attendee_limit = ($attendee_limit <= $available_spaces) ? $attendee_limit : $available_spaces;

                                event_espresso_multi_qty_dd($event_id, $result->id, $attendee_limit, empty($_SESSION['events_in_session'][$event_id]['price_id'][$result->id]['attendee_quantity']) ? '' : $_SESSION['events_in_session'][$event_id]['price_id'][$result->id]['attendee_quantity']);
                            }
                            else {

                                $checked = (($wpdb->num_rows == 1) || (array_key_exists($result->id, $_SESSION['events_in_session'][$event_id]['price_id']) && isset($_SESSION['events_in_session'][$event_id]['price_id'][$result->id]['attendee_quantity']))) ? ' checked="checked"' : '';
                                ?>
                                <input type="radio" class="price_id" name="price_id[<?php echo $event_id; ?>]" <?php echo $checked; ?> value="<?php echo $result->id; ?>" />
                                <?php
                            }
                            ?>
                        </td>

                    </tr>


                    <?php
                }
                ?>
                <tr>
                    <td colspan="3" class="reg-allowed-limit"><?php printf(__("You can register a maximum of %d attendees for this event.", 'event_espresso'), $attendee_limit); ?></td>

                </tr>
            </table>
            <input type="hidden" id="max_attendees-<?php echo $event_id; ?>" class="max_attendees" value= "<?php echo $attendee_limit; ?>" />
            <?php
        } else if ($wpdb->num_rows == 0) {
            echo '<span class="free_event">' . __('Free Event', 'event_espresso') . '</span>';
            echo '<input type="hidden" name="payment' . $multi_name_adjust . '" id="payment-' . $event_id . '" value="' . __('free event', 'event_espresso') . '">';
        }
    }

}