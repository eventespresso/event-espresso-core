<?php
/**
* Payment Gateways main WP admin settings page
*
* This file renders the WP admin screen for user Payment configuration,
* and contains the main WP markup structure for an admin screen, WP metaboxes
* markup is rendered from the individual gateways folders settings.php files
*
* This file loops over the $gateways array and constructs a path for each
* gateway name it finds, each gateways settings.php file is then required into this file for display
*/

function event_espresso_gateways_options() {
	global $wpdb, $espresso_premium, $notices;

	$gateways = array();
	$gateways[] = 'check';
	$gateways[] = 'bank';
	$gateways[] = 'invoice';
	$gateways[] = 'authnet';
	$gateways[] = 'aim';
	$gateways[] = 'firstdata';
	$gateways[] = 'firstdata_connect_2';
	$gateways[] = 'ideal';
	$gateways[] = 'paypal';
	$gateways[] = 'paypal_pro';
	$gateways[] = 'eway';
	$gateways[] = 'mwarrior';
	$gateways[] = '2checkout';
	$gateways[] = 'paytrace';
	$gateways[] = 'quickpay';
	$gateways[] = 'worldpay';
	$gateways[] = 'nab';

?>

<div class="wrap">
	<div id="icon-options-event" class="icon32"> </div>
	<h2>
		<?php _e('Manage Payment Gateways', 'event_espresso'); ?>
	</h2>
	<?php #### Page sidebar righthand side #### ?>
	<div id="poststuff" class="metabox-holder has-right-sidebar">
		<?php event_espresso_display_right_column(); ?>
		<?php #### Primary page metaboxes - lefthand container #### ?>
		<div id="post-body">
			<div id="post-body-content">
				<div class="meta-box-sortables ui-sortables">
					<?php
					// loop over gateways array and call each gateways settings.php file
					foreach ($gateways as $gateway) {
						$func 			= 'event_espresso_' . $gateway . '_payment_settings';
						$fallback_func 	= 'event_espresso_' . $gateway . '_settings';
						$fallback_func2 = 'event_espresso_' . $gateway . '_deposit_settings';
						$fallback_func3 = 'event_espresso_authnet_' . $gateway . '_settings';
						if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/" . $gateway . "/settings.php")) {
							require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/" . $gateway . "/settings.php");
							if(function_exists($func)) $func();
							elseif(function_exists($fallback_func)) $fallback_func();
							elseif(function_exists($fallback_func2)) $fallback_func2();
							elseif(function_exists($fallback_func3)) $fallback_func3();
						} elseif
						(file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/" . $gateway . "/settings.php")) {
							require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/" . $gateway . "/settings.php");
							if(function_exists($func)) $func();
							elseif(function_exists($fallback_func)) $fallback_func();
							elseif(function_exists($fallback_func2)) $fallback_func2();
							elseif(function_exists($fallback_func3)) $fallback_func3();
						}
					}

					//requires an empty alipay_active.php file in the gateways/alipay OR
					//if you have moved the gateway files, place it in uploads/espresso/gateways
					if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/alipay_active.php") || file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/alipay/alipay_active.php")) {
						if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/settings.php")) {
							require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/settings.php");
							event_espresso_alipay_settings();
						} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/alipay/settings.php")) {
							require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/alipay/settings.php");
							event_espresso_alipay_settings();
						}
					}

					//Shows information for developers
					if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH.'includes/admin-files/gateway_developer.php')){
						require_once(EVENT_ESPRESSO_PLUGINFULLPATH.'includes/admin-files/gateway_developer.php');
					}

					//If the free version is installed, this will be displayed.
					if ($espresso_premium != true) {
						echo '<h2>';
						_e('Need more payment options?', 'event_espresso');
						echo '<a href="http://eventespresso.com/download/" target="_blank">';
						_e('Upgrade Now!', 'event_espresso');
						echo '</a>';
						echo '</h2>';
					}
?>
				</div>
				<!-- / .meta-box-sortables -->

				<!-- Help boxes -->
				<div id="button_image" style="display: none;">
					<div class="TB-ee-frame">
						<h2>
							<?php _e('Button Image URL', 'event_espresso') ?>
						</h2>
						<p>
							<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso') ?>
						</p>
					</div>
				</div>
				<div id="bypass_confirmation" style="display: none;">
					<div class="TB-ee-frame">
						<h2>
							<?php _e('By-passing the Confirmation Page', 'event_espresso') ?>
						</h2>
						<p>
							<?php _e('This will allow you to send your customers directly to the payment gateway of your choice.', 'event_espresso') ?>
						</p>
					</div>
				</div>
				<!-- / help boxes -->

			</div>
			<!-- / #post-body-content -->
		</div>
		<!-- / #post-body -->
	</div>
	<!-- / #poststuff -->
</div>
<!-- / #wrap -->

<script type="text/javascript" charset="utf-8">
	//<![CDATA[
	jQuery(document).ready(function() {
		postboxes.add_postbox_toggles('payment_gateways');
	});
	//]]>
</script>
<?php
}

