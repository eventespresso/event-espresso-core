<?php
/* WARNING MODIFYING THIS AT YOUR OWN RISK  */
/* Payments template page. Currently this just shows the registration data block.*/

//This page gets all of the varaibles from includes/process-registration/payment_page.php
//Payment confirmation block
$attendee_num = 1;
?>
<form id="form1" name="form1" method="post" action="<?php echo home_url()?>/?page_id=<?php echo $event_page_id?>">
            <p align="left"><strong>
              <?php _e('Please verify your registration details:','event_espresso'); ?>
              </strong></p>
            <table width="95%" border="0" id="event_espresso_attendee_verify">
              <tr>
                <td><strong class="event_espresso_name">
                  <?php _e('Event Name:','event_espresso'); ?>
                  </strong></td>
                <td><span class="event_espresso_value"><?php echo stripslashes_deep($event_name)?></span></td>
              </tr>
               <tr>
                <td><strong class="event_espresso_name">
                  <?php echo empty($price_type) ? __('Price per attendee:','event_espresso') : __('Type/Price per attendee:','event_espresso'); ?>
                  </strong></td>
                <td><span class="event_espresso_value"><?php echo empty($price_type) ? $org_options['currency_symbol'] . $event_price : stripslashes_deep($price_type) . ' / ' .$org_options['currency_symbol'].$event_price;?></span></td>
              </tr>
              <tr>
                <td><strong class="event_espresso_name">
                  <?php _e('Attendee Name:','event_espresso'); ?>
                  </strong></td>
                <td  valign="top"><span class="event_espresso_value"><?php echo stripslashes_deep($attendee_name)?> (<?php echo $attendee_email?>) <?php echo '<a href="'.home_url().'/?page_id='.$event_page_id.'&amp;registration_id='.$registration_id.'&amp;id='.$attendee_id.'&amp;regevent_action=register&amp;form_action=edit_attendee&amp;primary='.$attendee_id.'&amp;p_id='.$p_id.'&amp;coupon_code='.$coupon_code.'&amp;groupon_code='.$groupon_code.'&amp;attendee_num='.$attendee_num.'">'. __('Edit', 'event_espresso').'</a>'; ?>
				<?php
				//Create additional attendees
				$sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE;
				$sql .= " WHERE registration_id = '" . espresso_registration_id( $attendee_id ) . "' AND id != '".$attendee_id."' ";
				//echo $sql;
				$x_attendees = $wpdb->get_results( $sql, ARRAY_A );
				if ( $wpdb->num_rows > 0 ){
					foreach ($x_attendees as $x_attendee){
						$attendee_num++;
						//echo $attendee_num;
						//print_r($x_attendees);
						echo "<br/>" . $x_attendee['fname'] . " " . $x_attendee['lname'] . " ";
						if ($x_attendee['email'] != '') { echo "(" . $x_attendee['email']  . ") "; }

						//Create edit link
						echo '<a href="'.home_url().'/?page_id='.$event_page_id.'&amp;registration_id='.$registration_id.'&amp;id='.$x_attendee['id'].'&amp;regevent_action=register&amp;form_action=edit_attendee&amp;primary='.$attendee_id.'&amp;p_id='.$p_id.'&amp;coupon_code='.$coupon_code.'&amp;groupon_code='.$groupon_code.'&amp;attendee_num='.$attendee_num.'">'. __('Edit', 'event_espresso').'</a>';
						//Create delete link
						echo ' | <a href="'.home_url().'/?page_id='.$event_page_id.'&amp;registration_id='.$registration_id.'&amp;id='.$x_attendee['id'].'&amp;regevent_action=register&amp;form_action=edit_attendee&amp;primary='.$attendee_id.'&amp;delete_attendee=true&amp;p_id='.$p_id.'&amp;coupon_code='.$coupon_code.'&amp;groupon_code='.$groupon_code.'">'. __('Delete', 'event_espresso').'</a>';						
					}
				}
				?>
				</span></td>
              </tr>
              <?php if ($num_people > 1){?>
              <tr valign="top">
                <td><strong class="event_espresso_name">
                  <?php _e('Total Registrants:','event_espresso'); ?>
                  </strong></td>
                <td><span class="event_espresso_value"><?php echo $num_people; ?></span></td>
              </tr>
              <?php } ?>
              <tr valign="top">
                <td><strong class="event_espresso_name">
                  <?php _e('Total Price:','event_espresso'); ?>
                  </strong></td>
                <td><span class="event_espresso_value"><?php echo $org_options['currency_symbol']?><?php echo $event_price_x_attendees;  echo $event_discount_label;?></span></td>
              </tr>

              </table>
              <p class="espresso_confirm_registration"><input type="submit" name="confirm" id="confirm" value="<?php _e('Confirm Registration', 'event_espresso'); ?>" /></p>
              <?php
			  if ($display_questions != ''){
			  ?>
              <p><strong class="event_espresso_name"><?php _e('Additional Information for:', 'event_espresso'); ?></strong> <?php echo stripslashes_deep($attendee_name)?></p>
              <table width="95%" border="0" id="event_espresso_attendee_verify_questions">
                  <tr valign="top">
                  <td colspan="2">
                  <?php echo $display_questions ?></td>
                  </tr>
              <?php
			  }
			  ?>
            </table>
     <?php /* This form builds the confirmation buttons */?>

        <p class="espresso_confirm_registration"><input type="submit" name="confirm2" id="confirm2" value="<?php _e('Confirm Registration', 'event_espresso'); ?>" /></p>
        <input name="confirm_registration" id="confirm_registration" type="hidden" value="true" />
        <input type="hidden" name="attendee_id" id="attendee_id" value="<?php echo $attendee_id ?>" />
        <input type="hidden" name="registration_id" id="registration_id" value="<?php echo $registration_id ?>" />
        <input type="hidden" name="regevent_action" id="regevent_action-<?php echo $event_id;?>" value="post_attendee">
        <input type="hidden" name="event_id" id="event_id-<?php echo $event_id;?>" value="<?php echo $event_id;?>">
    </form>