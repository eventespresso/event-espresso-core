<?php

//This is the payment gateway settings page.
function event_espresso_gateways_options() {
	global $espresso_premium;
	?>
	<div id="event_reg_theme" class="wrap">
		<div id="icon-options-event" class="icon32"></div>
		<h2><?php _e('Manage Payment Gateways', 'event_espresso'); ?></h2>
		<?php
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
		espresso_choose_layout($main_post_content, $sidebar_content);
		?>
	</div><!-- / #wrap -->';
	<?php
}

