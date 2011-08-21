<?php
//This is the registration form.
//This is a template file for displaying a registration form for an event on a page.
//There should be a copy of this file in your wp-content/uploads/espresso/ folder.
global $this_event_id;
$this_event_id = $event_id;
?>
<div id="event_espresso_registration_form" class="event-display-boxes">

    <?php

    $num_attendees = ' - ' . $_SESSION['events_in_session'][$event_id]['attendee_quantitiy'] . __( ' attendees', 'event_espresso' );
    ?>
    <h2 class="event_title" id="event_title-<?php echo $event_id; ?>">
        <?php echo stripslashes_deep( $event_name ) ?>
        <?php echo $is_active['status'] == 'EXPIRED' ? ' - <span class="expired_event">Event Expired</span>' : ''; ?>
        -
        <?php echo _e( 'Price Type:' ) . ' ' . $meta['price_type'] ?>
        -
        <?php

        printf( _n( '%d attendee', '%d attendees', $meta['attendee_quantity'], 'event_espresso' ), $meta['attendee_quantity'] );
        ?>
    </h2>


    <div class="multi_regis_form_fields" id="multi_regis_form_fields-<?php echo $event_id . '-' . $meta['price_id']; ?>">

        <?php

        if ( $display_desc == "Y" && $org_options['display_description_on_multi_reg_page'] != 'N'){//Show the description or not
        ?>
            <div class="event_description"><?php echo wpautop( do_shortcode($event_desc) ); //Code to show the actual description. The Wordpress function "wpautop" adds formatting to your description.    ?></div>
        <?php

        }//End display description
		//print_r( event_espresso_get_is_active($event_id));

        switch ( $is_active['status'] ){
            case 'EXPIRED': //only show the event description.
                _e( '<h3 class="expired_event">This event has passed.</h3>', 'event_espresso' );
                break;

            case 'REGISTRATION_CLOSED': //only show the event description.
                // if todays date is after $reg_end_date
        ?>
                <p class="event_full"><strong><?php _e( 'We are sorry but registration for this event is now closed.', 'event_espresso' ); ?></strong></p>
                <p class="event_full"><strong><?php _e( 'Please <a href="contact" title="contact us">contact us</a> if you would like to know if spaces are still available.', 'event_espresso' ); ?></strong></p>
        <?php

                break;

            case 'REGISTRATION_NOT_OPEN': //only show the event description.
                // if todays date is after $reg_end_date
                // if todays date is prior to $reg_start_date
        ?>
                <p class="event_full"><strong><?php _e( 'We are sorry but this event is not yet open for registration.', 'event_espresso' ); ?></strong></p>
                <p class="event_full"><strong><?php _e( 'You will be able to register starting ' . event_espresso_no_format_date( $reg_start_date, 'F d, Y' ), 'event_espresso' ); ?></strong></p>
        <?php

                break;

            default:
                /** This section shows the registration form if it is an active event **/
                    if ( is_array( $add_attendee_question_groups ) && count( $add_attendee_question_groups ) > 0 && $meta['attendee_number'] > 1 ){
                        $question_groups = $add_attendee_question_groups;
                        $meta['additional_attendee_reg_info'] = 9; //this will override the deprecated way of doing the additional attendee questions
                        $increase_attende_num = true;
                    }
					//echo "additional_attendee_reg_info = ".$meta['additional_attendee_reg_info'];
					//echo "Attendee # ".$meta['attendee_number'];
                    $attendee_number = $meta['attendee_number'];
					

                    $price_group_att_counter = 1; //this will keep track of the attendee number inside each event inside each price type
                    //Outputs the custom form questions.
                    //This will be the main attendee
                    //$meta['attendee_number'] = 1;
											?>
                    <div class="event-display-boxes">
											<?php
											echo '<h3 class="section-heading">' . __( 'Attendee ', 'event_espresso' ) . $attendee_number . '</h3>';

                    $meta['attendee_number'] = $price_group_att_counter;
											//echo "Attendee # ".$attendee_number;

                    echo event_espresso_copy_dd( $event_id, $meta );
                    echo event_espresso_add_question_groups( $question_groups, $events_in_session, $event_id, 1, $meta ); ?>
											</div>
                    <?php
											if ( $meta['attendee_number'] == 1 || $increase_attende_num ){
                        $meta['attendee_number']++;
                        $attendee_number++;
                    }

                    //Outputs the shopping cart items
                    if ( function_exists( 'event_espresso_add_cart_item_groups' ) ){
                        echo event_espresso_add_cart_item_groups( $item_groups );
                    }

                    //Coupons
                    if ( function_exists( 'event_espresso_coupon_registration_page' ) ){
                        // echo event_espresso_coupon_registration_page( $use_coupon_code, $event_id );
                    }//End coupons display
                    //Groupons
                    if ( function_exists( 'event_espresso_groupon_registration_page' ) ){
                        //echo event_espresso_groupon_registration_page( $use_groupon_code, $event_id );
                    }//End groupons display
                    //Multiple Attendees
                    if ( $allow_multiple == "Y" ){

                        //This returns the additional attendee form fields.
                        //
                        if ( $meta['attendee_quantity'] > 1 ){
							//echo 'attendee_quantity = '.$meta['attendee_quantity'];
							
							//If the "Personal Information only" question is selected in the event 
							//then only show the registration form for the first attendee
							if ($event_meta['additional_attendee_reg_info'] == 1) {
								echo '<input name="num_people" type="hidden" value="'.$meta['attendee_quantity'].'" />';
							}else{

								//this is a check for events that have been made before additional attendee questions functionality
								if(is_array($add_attendee_question_groups)){
									$question_groups = $add_attendee_question_groups;
								}
	
								//The offset of 2 since this is attendee 2 and on
								//adding 1 since the primary attendee is added
								//in the above function call (c.a. line 104)
								//Used for "Attendee #" display
								for ( $i = $attendee_number, $cnt = $meta['attendee_quantity'] + $attendee_number - 1; $i < $cnt; $i++ ) {
									$price_group_att_counter++;
									//echo 'price_group_att_counter = '.$price_group_att_counter;
									$meta['attendee_number'] = $price_group_att_counter; ?>
									
									<div class="event-display-boxes">
									<?php
									echo '<h3 class="section-heading">' . __( 'Attendee ', 'event_espresso' ) . $i . '</h3>';
									echo event_espresso_copy_dd( $event_id, $meta );
									echo event_espresso_add_question_groups($question_groups, $events_in_session, $event_id, 1, $meta );?>
									</div>
									<?php
								}
							}
						}
					}else{
					}//End allow multiple
			break;
        }//End Switch statement to check the status of the event
        ?>
    </div>
</div>
