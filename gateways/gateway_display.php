<?php

function espresso_display_payment_gateways() {
//Get the payment settings
	global $espresso_wp_user, $EE_Session;
	$active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', true);
	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);
	$EE_Session->set_session_data(array('active_gateways' => $active_gateways, 'payment_settings' => $payment_settings), 'session_data');

//	echo var_dump($espresso_wp_user);
//	echo var_dump($active_gateways);
//	echo var_dump($payment_settings);

	foreach ($active_gateways as $path) {
		require_once($path . "/payment.php");
	}

	echo '<div id="onsite-payments" class="event-display-boxes ui-widget">';
	echo '<h3>' . __('Please select your method of payment:', 'event_espresso') . '</h3>';
	
	do_action('action_hook_espresso_display_onsite_payment_gateway');
	
	do_action('action_hook_espresso_display_offsite_payment_gateway');
	
	do_action('action_hook_espresso_display_offline_payment_gateway');
	
	do_action('action_hook_espresso_display_finalize_payment_header');
	
	do_action('action_hook_espresso_display_offline_payment_gateway_2');
	
	echo '</div><!-- / .event-display-boxes payment opts -->';
}

add_action('action_hook_espresso_display_payment_gateways', 'espresso_display_payment_gateways');

function espresso_display_onsite_payment_header() {
	echo '<div id="on_site_payment_container" class="payment_container event-display-boxes">';
	echo '<h4 id="on_site_payment" class="payment_option_title section-heading">' . __('On-site Payment Processing', 'event_espresso') . '</h4>';
}

function espresso_display_onsite_payment_footer() {
	echo '</div><!-- / #onsite-payments -->';
}

function espresso_display_offsite_payment_header() {
	echo '<div id="off_site_payment_container" class="payment_container event-display-boxes">';
	echo '<h4 id="off_site_payment" class="payment_option_title section-heading">' . __('Off-site Payments', 'event_espresso') . '</h4>';
	echo '<ul id="espresso_payment_buttons">';
}

function espresso_display_offsite_payment_footer() {
	echo '</ul>';
	echo '</div><!-- / #off_site_payment_container -->';
}

function espresso_display_offline_payment_header() {
	echo '<div id="off_line_payment_container" class="payment_container event-display-boxes">';
	echo '<h4 id="off_line_payment" class="payment_option_title section-heading">' . __('Off-line Payments', 'event_espresso') . '</h4>';
}

function espresso_display_offline_payment_footer() {
	echo '</div><!-- / #off_line_payment_container -->';
}

function espresso_display_finalize_payment_header($payment_data) {
	global $org_options;
	?>
	<div class="event_espresso_attention event-messages ui-state-highlight">
		<span class="ui-icon ui-icon-alert"></span>
		<p><strong><?php _e('Attention!', 'event_espresso'); ?></strong><br />
			<?php _e('If using one of the offline payment options, please make note of the information below, then', 'event_espresso'); ?>
			<a href="<?php echo home_url() . '/?page_id=' . $org_options['return_url']; ?>&amp;payment_type=cash_check&amp;id=<?php echo $payment_data['attendee_id'] ?>" class="inline-link" title="<?php _e('Finalize your registration', 'event_espresso'); ?>"><?php _e('click here to finalize your registration', 'event_espresso'); ?></a>
		</p>
	</div>
	<?php
}