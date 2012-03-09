<?php

function espresso_display_payment_gateways() {
//Get the payment settings
	global $active_gateways, $payment_settings, $espresso_wp_user;
	$active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', true);
	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);
	foreach ($active_gateways as $gateway => $path) {
		require_once($path . "/init.php");
	}

	echo '<div id="onsite-payments" class="event-display-boxes ui-widget">';
	echo '<h2 class="section-heading ui-widget-header ui-corner-top">' . __('Please choose a payment option:', 'event_espresso') . '</h2>';
	echo '<div class="event-data-display ui-widget-content ui-corner-bottom">';

	do_action('action_hook_espresso_display_onsite_payment_header');
	do_action('action_hook_espresso_display_onsite_payment_gateway');
	do_action('action_hook_espresso_display_onsite_payment_footer');

	do_action('action_hook_espresso_display_offsite_payment_header');
	do_action('action_hook_espresso_display_offsite_payment_gateway');
	do_action('action_hook_espresso_display_offsite_payment_footer');

	do_action('action_hook_espresso_display_offline_payment_header');
	do_action('action_hook_espresso_display_offline_payment_gateway');
	do_action('action_hook_espresso_display_finalize_payment_header');
	do_action('action_hook_espresso_display_offline_payment_gateway_2');
	do_action('action_hook_espresso_display_offline_payment_footer');


	echo '</div><!-- / .event-data-display -->';
	echo '</div><!-- / .event-display-boxes payment opts -->';
}

add_action('action_hook_espresso_display_payment_gateways', 'espresso_display_payment_gateways');

function espresso_display_onsite_payment_header() {
	echo '<div id="on_site_payment_container" class="payment_container event-display-boxes">';
	echo '<h3 id="on_site_payment" class="payment_option_title section-heading">' . __('On-site Payment Processing', 'event_espresso') . '</h3>';
}

function espresso_display_onsite_payment_footer() {
	echo '</div><!-- / #onsite-payments -->';
}

function espresso_display_offsite_payment_header() {
	echo '<div id="off_site_payment_container" class="payment_container event-display-boxes">';
	echo '<h3 id="off_site_payment" class="payment_option_title section-heading">' . __('Off-site Payments', 'event_espresso') . '</h3>';
	echo '<ul id="espresso_payment_buttons">';
}

function espresso_display_offsite_payment_footer() {
	echo '</ul>';
	echo '</div><!-- / #off_site_payment_container -->';
}

function espresso_display_offline_payment_header() {
	echo '<div id="off_line_payment_container" class="payment_container event-display-boxes">';
	echo '<h3 id="off_line_payment" class="payment_option_title section-heading">' . __('Off-line Payments', 'event_espresso') . '</h3>';
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