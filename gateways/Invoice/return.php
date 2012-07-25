<?php

function espresso_send_to_thankyou_page_for_invoice($EE_Session) {
	global $org_options;
	$pre_form = "<html>";
	$pre_form .= "<head><title>Processing Invoice...</title></head>";
	$pre_form .= "<body>";
	$form = "<h2 style=\"margin:2em auto; line-height:2em; text-align:center;\">Please wait...<br/>your order is being processed and you will be redirected to the transaction results page, where you can view your invoice.</h2>";
	$form .= "<form method=\"POST\" name=\"gateway_form\" ";
	$form .= "action=\"" . get_permalink($org_options['return_url']) . "\">";
	$form .= "<p style=\"text-align:center;\"><br/>If you are not automatically redirected to ";
	$form .= "the payment website within 10 seconds...<br/><br/>";
	$form .= "<input type=\"submit\" value=\"Click Here\"></p>";
	$form .= "</form>";
	$post_form = "</body></html>";
	$this->_EEM_Gateways->set_off_site_form(array('pre-form' => $pre_form, 'form' => $form, 'post-form' => $post_form));
}

add_action('action_hook_espresso_gateway_process_step_3', 'espresso_send_to_thankyou_page_for_invoice');

function espresso_display_invoice_download_link($EE_Session) {
	$gateway = 'invoice';
	$session_data = $EE_Session->get_session_data();
	$gateway_data = $session_data['gateway_data'];
	$invoice_settings = $gateway_data['payment_settings'][$gateway];
	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Registration.class.php' );
	$registration = $session_data['registration'][$session_data['primary_attendee']['line_item_id']];

	$txn_details = array(
			'gateway' => $invoice_settings['display_name'],
			'approved' => FALSE,
			'response_msg' => __('You\'re registration will be marked as complete once your payment is received.', 'event_espresso'),
			'status' => 'Incomplete',
			'raw_response' => serialize($_REQUEST),
			'amount' => 0.00,
			'method' => 'Off-line',
			'auth_code' => '',
			'md5_hash' => '',
			'invoice_number' => '',
			'transaction_id' => ''
	);
	$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

	if (!$invoice_settings['show'])
		return;
	?>
	<div class="event-display-boxes">
		<?php if (isset($invoice_settings['invoice_title'])) { ?>

			<?php
			echo '<h4 id="invoice_title" class="payment_type_title section-heading">' . stripslashes_deep($invoice_settings['invoice_title']) . '</h4>';
		}

		/* $pdf_url = home_url().'/?invoice_type=' . ( empty($invoice_type) ? '' : $invoice_type ) . '&amp;download_invoice=true&amp;attendee_id='.$attendee_id.'&amp;registration_id='.registration_id;

		  $page_url = home_url().'/?invoice_type=' . ( empty($invoice_type) ? '' : $invoice_type ) . '&amp;download_invoice=true&amp;attendee_id='.$attendee_id.'&amp;registration_id='.registration_id;
		 */
		?>
		<p><a href="<?php echo home_url() . '/?invoice_launch=true&amp;id='.$registration->reg_url_link(); ?>" class="inline-button ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" target="_blank">
		<?php _e('Download PDF Invoice', 'event_espresso'); ?>
			</a></p>
		<?php
		if (isset($invoice_settings['page_instructions'])) {
			echo '<div class="event-messages ui-state-highlight"><span class="ui-icon ui-icon-alert"></span><p class="instruct">' . stripslashes_deep($invoice_settings['page_instructions']) . '</p></div>';
		}
		if (isset($invoice_settings['payment_address'])) {
			?>
			<div class="address-block">
			<?php echo wpautop(stripslashes_deep($invoice_settings['payment_address'])); ?>
			</div>
			<?php
		}
		?>
	</div>
	<?php
}

add_action('action_hook_espresso_process_off_site_payment', 'espresso_display_invoice_download_link');