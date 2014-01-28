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
<div class="espresso_payment_overview event-display-boxes wdith-100" >

	<div class="ee-attention">
		<div class="extra-padding">
			<?php echo apply_filters( 'FHEE__payment_overview_template__order_conf_desc',__("Full description of your purchases and registration information. Print it, download it, cherish it") )?><br/><br/>
			<a class="big-text" href="<?php echo $transaction->receipt_url('html');?>"><?php _e("View Full Order Confirmation", "event_espresso");?></a>
		</div>
	</div>
	<br/>

	<h3 class="section-title"><?php _e('Registration  Details:', 'event_espreso'); ?></h3>
	
	<div class="reg-gen-details">
	<?php 
		foreach ( $transaction->registrations() as $registration ) {  
			$reg_cntr++;
			if ( $event_name != $registration->event_name() ) { 
				$event_name = $registration->event_name(); 
		?>
		<h6>
			<span class="smaller-text grey-text"><?php _e('for','event_espresso');?>: </span> <?php echo htmlentities( $registration->event_name(), ENT_QUOTES, 'UTF-8' );?>			
		</h6>							
		<table class='ee-table ee-registrations-list'>
			<thead>
				<tr>
					<th width="35%">
						<?php _e("Registrant Name",'event_espresso')?>
					</th>
					<th width="30%" class="jst-cntr">
						<?php _e("REG Code",'event_espresso');?>
					</th>
					<th width="35%" class="jst-cntr">
						<?php _e("REG Status",'event_espresso');?>
					</th>
				</tr>
			</thead>
			<tbody>			
		<?php } ?>
				<tr>
					<td width="35%">
					<?php 
						if ( $registration->attendee() instanceof EE_Attendee ) {									
							echo htmlentities( $registration->attendee()->get('ATT_fname') . ' ' . $registration->attendee()->get('ATT_lname'), ENT_QUOTES, 'UTF-8' );
						}
					?>
					</td>
					<td width="30%" class="jst-cntr">
						<?php $registration->e('REG_code') ?>
					</td>
					<td width="35%" class="jst-cntr">
						<?php $registration->e_pretty_status( TRUE )?>
					</td>
				</tr>
		<?php if (( $event_name != $registration->event_name() && $event_name != '' ) || $reg_cntr >= count( $transaction->registrations() )) {  ?>
			</tbody>
		</table>
		<?php } ?>
	<?php } ?>
		<p class="small-text jst-rght"><span><a href='<?php echo $SPCO_attendee_information_url?>'><?php _e("Click here to edit Attendee Information", 'event_espresso'); ?></a></span></p>
		
	</div><!-- / .reg-gen-details -->



	
	<h3><?php _e('Transaction Details', 'event_espresso'); ?></h3>
	<div class='ee-transaction-status'>
		<table class='ee-table'>
			<tbody>
				<tr>
					<td>
						<label><?php _e('Total Cost: ', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php echo EEH_Template::format_currency( $transaction->total() ); ?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Amount Owing: ', 'event_espresso'); ?></label>
					</td>
					<td class="<?php echo ($transaction->paid() == $transaction->total()) ? 'ee-transaction-paid' : 'ee-transaction-unpaid' ?>">
						<?php echo EEH_Template::format_currency( $transaction->remaining() ); ?> 
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Transaction Status: ', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php $transaction->e_pretty_status( TRUE ); 
						if ( $show_try_pay_again_link && ! $transaction->is_completed() ) { ?>
						 &nbsp; <span class="small-text"><a href='<?php echo $SPCO_payment_options_url?>'><?php _e("Retry Payment", 'event_espresso'); ?></a></span>
						<?php } ?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Primary Registrant:', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php 
						//printr( $primary_registrant, '$primary_registrant  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
						echo htmlentities( $primary_registrant->attendee()->get('ATT_fname') . ' ' . $primary_registrant->attendee()->get('ATT_lname'), ENT_QUOTES, 'UTF-8' ); 
						?>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	
	<?php
	if ( $show_try_pay_again_link && ! $transaction->is_completed() ) {
			?>
		<p class="small-text jst-rght"><span><a href='<?php echo $SPCO_payment_options_url?>'><?php _e("Click here to view Payment Options", 'event_espresso'); ?></a></span></p><br/>
			<?php 	
	}?>


	<h2 class="section-heading display-box-heading">
		<?php _e('Payment Overview', 'event_espresso'); ?>
	</h2>

	<div class='reg-payment-details'>
		<?php 
		if ( empty($payments)){
			
			if ( $transaction->total() ){
				echo apply_filters( 'FHEE__payment_overview_template__no_payments_made',__("No payments have been made yet towards this registration.",'event_espresso') );
				echo $gateway_content;
			}else{
				 echo apply_filters( 'FHEE__payment_overview_template__no_payment_required', __("No payment required",'event_espresso') );
			}
			
		} else {
			
			foreach ( $payments as $payment ) { 
		?>
			<table class='ee-table'>
				<tbody>
					<tr>
						<td>
							<label><?php _e('Payment Type:', 'event_espresso'); ?></label>
						</td>
						<td>
							<?php $payment->e('PAY_gateway'); ?>
						</td>
					</tr>
					<tr>
						<td>
							<label><?php _e('Payment Date:', 'event_espresso'); ?></label>
						</td>
						<td>
							<?php $payment->e('PAY_timestamp'); ?>
						</td>
					</tr>
					<tr>
						<td>
							<label><?php _e("Payment Amount: ", 'event_espresso') ?></label>
						</td>
						<td>
							<?php  $payment->e( 'PAY_amount' ); ?>
						</td>
					</tr>
					<tr>
						<td>
							<label><?php _e("Payment Status: ", 'event_espresso') ?></label>
						</td>
						<td>
							<?php $payment->e_pretty_status( TRUE );
							if ( $show_try_pay_again_link &&  ! $payment->is_approved()) {?>
							<a href='<?php echo $SPCO_payment_options_url?>'><?php _e("Retry Payment", 'event_espresso'); ?></a>
								<?php }
							?>
						</td>
					</tr>
					<?php $gateway_payment_content = $payment->gateway_payment_overview_content();
					if (!empty($gateway_payment_content)){?>
					<tr>
						<td colspan=2><?php echo $gateway_payment_content?></td>
					</tr>
					<?php }?>
					</tbody>
				</table>
			<?php } ?>
			
		<?php }?>
	</div>
	<br/>
		

</div><!-- / .event-display-boxes -->
<?php 
//insert affiliate code here (see includes/functions/affiliate-handling.php)
do_action( 'AHEE__payment_overview__template__reg_completed' );
?>