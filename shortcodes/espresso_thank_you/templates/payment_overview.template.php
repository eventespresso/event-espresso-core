<?php
/* @var $transaction EE_Transaction */
EEH_Template_Validator::verify_instanceof($transaction, '$transaction', 'EE_Transaction');
EEH_Template_Validator::verify_instanceof($primary_registrant, '$primary_registrant', 'EE_Registration');
EEH_Template_Validator::verify_instanceof($primary_registrant->attendee(), '$primary_registrant', 'EE_Attendee');
EEH_Template_Validator::verify_is_array_of($payments, '$payments', 'EE_Payment');
EEH_Template_Validator::verify_is_array($event_names, '$event_names');
EEH_Template_Validator::verify_isnt_null($SPCO_payment_options_url, '$SPCO_payment_options_url');
EEH_Template_Validator::verify_isnt_null($SPCO_attendee_information_url, '$SPCO_attendee_information_url');
EEH_Template_Validator::verify_isnt_null($show_try_pay_again_link, '$show_try_pay_again_link');
EEH_Template_Validator::verify_isnt_null($gateway_content, '$gateway_content');
/**
 * @var $transaction EE_Transaction
 * @var $primary_registrant EE_Registration
 * @var $payments EE_Payment[]
 * @var $event_names array of strings of only event names
 * @var $SPCO_payment_options_url string
 * @var $show_try_pay_again_link boolean whether or not to show the link back to SPCO step 2 to retry paying
 * @var $gateway_content string of content from the gateway.
 */
$reg_cntr = 0;
$event_name = '';
?>
<div class="espresso_payment_overview width-100" >

	<div class="ee-attention">
		<div class="extra-padding jst-left">
			<a class="huge-text lt-blue-text" href="<?php echo $transaction->receipt_url('html');?>"><span class="ee-icon ee-icon-PDF-file-type"></span><?php _e("View Full Order Confirmation", "event_espresso");?></a><br/>
			<span class="small-text"><?php echo apply_filters( 'FHEE__payment_overview_template__order_conf_desc', __( 'click to view/download/print a full description of your purchases and registration information.' ))?></span>
		</div>
	</div>
	<br/>




</div><!-- / .event-display-boxes -->
<?php 
//insert affiliate code here (see includes/functions/affiliate-handling.php)
do_action( 'AHEE__payment_overview__template__reg_completed' );
?>
<br/>
<br/>