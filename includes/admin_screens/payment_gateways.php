<?php

//This is the payment gateway settings page.
function event_espresso_gateways_options() {
	global $espresso_premium, $EE_Session;
	if (isset($_POST['_wp_http_referer'])) {
		$EE_Session->set_session_data(array(), 'gateway_data');
	}
	ob_start();
	do_meta_boxes('event-espresso_page_payment_gateways', 'side', null);
	$sidebar_content = ob_get_clean();
	ob_start();
	do_meta_boxes('event-espresso_page_payment_gateways', 'advanced', null);
	if (!$espresso_premium) {
		?>
		<h2><?php _e('Need more payment options?', 'event_espresso'); ?>
			<a href="http://eventespresso.com/download/" target="_blank"><?php _e('Upgrade Now!', 'event_espresso'); ?></a>
		</h2>
		<?php
	}
	$main_post_content = ob_get_clean();
	?>
	<div id="event_reg_theme" class="wrap">
		<div id="icon-options-event" class="icon32"></div>
		<h2><?php _e('Manage Payment Gateways', 'event_espresso'); ?></h2>
		<?php
		if (!espresso_choose_layout($main_post_content, $sidebar_content))
			return FALSE;
		?>
	</div><!-- / #wrap -->';
	<?php
}

