<?php
//This is the registration form.
//This is a template file for displaying a registration form for an event on a page.
//There should be a copy of this file in your wp-content/uploads/espresso/ folder.
?>
<div id="event_espresso_registration_form">
    <div class = "event_espresso_form_wrapper">
        <form method="post" action="<?php echo home_url() ?>/?page_id=<?php echo $event_page_id ?>" id="registration_form">
            <h3 class="event_title" id="event_title-<?php echo $event_id; ?>">
                <?php echo $event_name ?>
                <?php echo $is_active['status'] == 'EXPIRED' ? ' - <span class="expired_event">Event Expired</span>' : ''; ?>
                <?php echo $is_active['status'] == 'PENDING' ? ' - <span class="expired_event">Event is Pending</span>' : ''; ?>
                <?php echo $is_active['status'] == 'DRAFT' ? ' - <span class="expired_event">Event is a Draft</span>' : ''; ?>
            </h3>
            <?php /* Venue details. Un-comment to display. */ ?>
            <?php //echo $venue_title != ''?'<p id="event_venue_name-'.$event_id.'" class="event_venue_name">'.stripslashes_deep($venue_title).'</p>':''?>
            <?php //echo $venue_address != ''?'<p id="event_venue_address-'.$event_id.'" class="event_venue_address">'.stripslashes_deep($venue_address).'</p>':''?>
            <?php //echo $venue_address2 != ''?'<p id="event_venue_address2-'.$event_id.'" class="event_venue_address2">'.stripslashes_deep($venue_address2).'</p>':''?>
            <?php //echo $venue_city != ''?'<p id="event_venue_city-'.$event_id.'" class="event_venue_city">'.stripslashes_deep($venue_city).'</p>':''?>
            <?php //echo $venue_state != ''?'<p id="event_venue_state-'.$event_id.'" class="event_venue_state">'.stripslashes_deep($venue_state).'</p>':''?>
            <?php //echo $venue_zip != ''?'<p id="event_venue_zip-'.$event_id.'" class="event_venue_zip">'.stripslashes_deep($venue_zip).'</p>':''?>
            <?php //echo $venue_country != ''?'<p id="event_venue_country-'.$event_id.'" class="event_venue_country">'.stripslashes_deep($venue_country).'</p>':''?>
           <p class="start_date">
<?php 		if($end_date !== $start_date) {
				_e('Start Date: ','event_espresso');
			} else{
				_e('Date: ','event_espresso');
			}
			echo event_date_display($start_date, get_option('date_format'));
			if($end_date !== $start_date) {
				echo '<br />';
				_e('End Date: ','event_espresso');
			echo event_date_display($end_date, get_option('date_format'));
			} ?>
			</p>
<?php 		if ($display_desc == "Y") {//Show the description or not ?>
                <div class="event_description"><?php echo wpautop(do_shortcode($event_desc)); //Code to show the actual description. The Wordpress function "wpautop" adds formatting to your description. ?></div>
<?php
            }//End display description
            //Uncomment the following line to show the personnel assigned to this event
            //echo espresso_show_personnel($event_id, array('wrapper_start'=>'<ul style="event_staff">','wrapper_end'=>'</ul>','before'=>'<li>','after'=>'</li>', 'limit'=>1, 'show_info'=>true, 'staff_id'=>16) );
            //print_r( event_espresso_get_is_active($event_id));
            /* Displays the social media buttons */
            ?>
            <p><?php echo espresso_show_social_media($event_id, 'twitter'); ?> <?php echo espresso_show_social_media($event_id, 'facebook'); ?></p>
<?php
            switch ($is_active['status']) {
                case 'EXPIRED': //only show the event description.
                    _e('<h3 class="expired_event">This event has passed.</h3>', 'event_espresso');
                    break;

                case 'REGISTRATION_CLOSED': //only show the event description.
                    // if todays date is after $reg_end_date
                    ?>
                    <p class="event_full"><strong><?php _e('We are sorry but registration for this event is now closed.', 'event_espresso'); ?></strong></p>
                    <p class="event_full"><strong><?php _e('Please <a href="contact" title="contact us">contact us</a> if you would like to know if spaces are still available.', 'event_espresso'); ?></strong></p>
<?php
                    break;

                case 'REGISTRATION_NOT_OPEN': //only show the event description.
                    // if todays date is after $reg_end_date
                    // if todays date is prior to $reg_start_date
?>
                    <p class="event_full"><strong><?php _e('We are sorry but this event is not yet open for registration.', 'event_espresso'); ?></strong></p>
                    <p class="event_full"><strong><?php _e('You will be able to register starting ' . event_espresso_no_format_date($reg_start_date, 'F d, Y'), 'event_espresso'); ?></strong></p>
<?php
                    break;

                default://This will display the registration form

                    /* Display the address and google map link if available */
                    if ($location != '') {
?>
                        <p class="event_address" id="event_address-<?php echo $event_id ?>"><?php echo __('Address:', 'event_espresso'); ?> <br />
                            <?php echo stripslashes_deep($location); ?><br />
                        	<?php echo $google_map_link; ?>
                        </p>
<?php
                    }

                    /*
                     * *
                      This section shows the registration form if it is an active event
                     * *
                     */

                    if ($display_reg_form == 'Y') {
?>
                        <p class="event_time">
<?php
                            //This block of code is used to display the times of an event in either a dropdown or text format.
                            if (isset($time_selected) && $time_selected == true) {//If the customer is coming from a page where the time was preselected.
                                event_espresso_display_selected_time($time_id); //Optional parameters start, end, default
                            } else {
                                event_espresso_time_dropdown($event_id);
                            }//End time selected
                            ?>
                        </p>


                        <p class="event_prices"><?php echo event_espresso_price_dropdown($event_id); //Show pricing in a dropdown or text ?></p>
<?php
                        //Outputs the custom form questions. This function can be overridden using the custom files addon
                        echo event_espresso_add_question_groups($question_groups);

                        //Coupons
                        if (function_exists('event_espresso_coupon_registration_page')) {
                            echo event_espresso_coupon_registration_page($use_coupon_code, $event_id);
                        }//End coupons display
                        //Groupons
                        if (function_exists('event_espresso_groupon_registration_page')) {
                            echo event_espresso_groupon_registration_page($use_groupon_code, $event_id);
                        }//End groupons display
                        //Multiple Attendees
                        if ($allow_multiple == "Y" && $number_available_spaces > 1) {

                            //This returns the additional attendee form fields. Can be overridden in the custom files addon.
                            event_espresso_additional_attendees($event_id, $additional_limit, $number_available_spaces);
                        } else {
                            ?>
                            <input type="hidden" name="num_people" id="num_people-<?php echo $event_id; ?>" value="1">
<?php 					}//End allow multiple  ?>

                        <input type="hidden" name="regevent_action" id="regevent_action-<?php echo $event_id; ?>" value="post_attendee">
                        <input type="hidden" name="event_id" id="event_id-<?php echo $event_id; ?>" value="<?php echo $event_id; ?>">
<?php
                        //Recaptcha portion
                        if ($org_options['use_captcha'] == 'Y' && $_REQUEST['edit_details'] != 'true') {
                            if (!function_exists('recaptcha_get_html')) {
                                require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/recaptchalib.php');
                            }//End require captcha library
                            # the response from reCAPTCHA
                            $resp = null;
                            # the error code from reCAPTCHA, if any
                            $error = null;
                            ?>
                            <p class="event_form_field" id="captcha-<?php echo $event_id; ?>"><?php _e('Anti-Spam Measure: Please enter the following phrase', 'event_espresso'); ?>
                            <?php echo recaptcha_get_html($org_options['recaptcha_publickey'], $error); ?>
                            </p>
                            <?php } //End use captcha ?>
                        <p class="event_form_submit" id="event_form_submit-<?php echo $event_id; ?>">

                            <input class="btn_event_form_submit" id="event_form_field-<?php echo $event_id; ?>" type="submit" name="Submit" value="<?php _e('Submit', 'event_espresso'); ?>">
                        </p>
<?php
        }
        break;
}//End Switch statement to check the status of the event
?>
        </form>
        <?php if(isset($ee_style['event_espresso_form_wrapper_close'])) echo $ee_style['event_espresso_form_wrapper_close']; ?>
        <?php echo '<p>' . espresso_edit_this($event_id) . '</p>' ?>
    </div>
</div>
