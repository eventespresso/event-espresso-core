<?php

//This is the payment gateway settings page.
function event_espresso_gateways_options() {
	global $espresso_premium;
	?>
	<div id="event_reg_theme" class="wrap">
		<div id="icon-options-event" class="icon32"></div>
		<h2><?php _e('Manage Payment Gateways', 'event_espresso'); ?></h2>
		<div id="poststuff" class="metabox-holder has-right-sidebar">
			<div id="side-info-column" class="inner-sidebar">
				<?php do_meta_boxes('event-espresso_page_payment_gateways', 'side', null); ?>
			</div>
			<div id="post-body">
				<div id="post-body-content">
					<?php
					do_meta_boxes('event-espresso_page_payment_gateways', 'advanced', null);
					if (!$espresso_premium) {
						?>
						<h2><?php _e('Need more payment options?', 'event_espresso'); ?>
							<a href="http://eventespresso.com/download/" target="_blank"><?php _e('Upgrade Now!', 'event_espresso'); ?></a>
						</h2>
						<?php
					}
					?>
				</div><!-- / #post-body-content -->
			</div><!-- / #post-body -->
		</div><!-- / #poststuff -->
	</div><!-- / #wrap -->';
	<?php
}

