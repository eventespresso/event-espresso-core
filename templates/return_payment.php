<?php 
/* WARNING MODIFY THIS AT YOUR OWN RISK  */
/* Return to Payments template page. Currently this just shows the return to paayment information data block.*/

	if ($payment_status == "Completed"){
		//echo '<p class="payment_details payment_paid">'.__('Our records indicate you have paid','event_espresso')." ".$org_options['currency_symbol'].$event_cost."</p>";
		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR."payment_overview.php")){
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR."payment_overview.php");//This is the path to the template file if available
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."templates/payment_overview.php");
		}
	}
			
	if ($payment_status == "Pending"){
		if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR."payment_overview.php")){
			require_once(EVENT_ESPRESSO_TEMPLATE_DIR."payment_overview.php");//This is the path to the template file if available
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."templates/payment_overview.php");
		}
		if ($org_options['show_pending_payment_options'] == 'Y'){
			echo '<div class="event_espresso_attention"><strong class="payment_details payment_pending">'.__('Pending Payment','event_espresso')."</strong><br />Would you like to choose a different payment option?</div>";
			//We need create the variables for the payment options
			$registration_id = $registration_id != '' ? $registration_id : $att_registration_id;
			if ($attendee_id==''||$attendee_id==0) 
				$attendee_id = espresso_attendee_id($registration_id);
				
			//Show payment options
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "gateway_display.php")){
				require_once(EVENT_ESPRESSO_GATEWAY_DIR . "gateway_display.php");
			}else{
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH. "gateways/gateway_display.php");
			}
		}
	}

	if ($payment_status == "Incomplete" || $payment_status == "Payment Declined" || $payment_status == "" ){
		//Check the number of available sapce against this registration 
		if ( get_number_of_attendees_reg_limit($event_id, 'number_available_spaces') < $quantity){ ?>
			<p class="espesso_event_full"> <?php _e('Sorry, there are not enough spaces available to complete your registration.','event_espresso'); ?></p>
			<p class="espesso_event_full"> <?php _e('Quantity in your Party:', 'event_espresso'); ?> <?php echo $quantity ?></p>
			<p class="espesso_event_full"><?php _e('Spaces Available:', 'event_espresso'); ?> <?php echo get_number_of_attendees_reg_limit($event_id, 'avail_spaces_slash_reg_limit') ?></p>
<?php
			return;
		}
		//Uncomment to check the number of available spaces
		//echo get_number_of_attendees_reg_limit($event_id, 'number_available_spaces');

		if($event_cost != '0.00'){
/*?>	
            <p class="payment_details payment_amount">
            <?php _e('Payment will be in the amount of','event_espresso'); ?>
            <?php echo  $org_options['currency_symbol'].$event_cost;?>.</p>
            <p class="payment_details payment_options"><?php _e('Payment Options:','event_espresso'); ?></p>
<?php
*/			//Show payment options
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "gateway_display.php")){
				require_once(EVENT_ESPRESSO_GATEWAY_DIR . "gateway_display.php");
			}else{
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH. "gateways/gateway_display.php");
			}
		}			
	}//End if ($payment_status == ("Incomplete") )