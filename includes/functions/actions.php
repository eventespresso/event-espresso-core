<?php

//Show pricing in a dropdown or text
if (!function_exists('espresso_price_select_action')) {

	function espresso_price_select_action($event_id, $atts = '') {

		$html = '';
		$html .= is_admin() ? '' : '<p class="event_prices">';
		$html .= event_espresso_price_dropdown($event_id, $atts);
		$html .= is_admin() ? '' : '</p>';

		echo $html;

		return;
	}

	add_action('action_hook_espresso_price_select', 'espresso_price_select_action', 10, 2);
}

/**
 * 		@ display admin update & error messages
 * 		@access public
 * 		@return void
 * */
function display_espresso_admin_notices() {

	global $notices;

// We play both kinds of music here! Country AND Western! - err... I mean, cycle through both types of notices
	foreach (array('updates', 'errors') as $type) {

// if particular notice type is not empty, then "You've got Mail"
		if (!empty($notices[$type])) {

// is it an update or an error ?
			$msg_class = $type == 'updates' ? 'updated' : 'error';
			echo '<div id="message" class="' . $msg_class . '">';
// display each notice, however many that may be
			foreach ($notices[$type] as $message) {
				echo '<p>' . $message . '</p>';
			}
// wrap it up
			echo '</div>';
		}
	}
	remove_action('action_hook_espresso_admin_notices', 'display_espresso_admin_notices');
}

add_action('admin_notices', 'display_espresso_admin_notices');

/**
 * event_espresso_require_template()
 *
 * @param mixed $template_file_name // Name of template file.
 * @param bool $must_exist		  // Error if neither file exist.
 * @param bool $as_require_once	 // True for require_once(), False for require()
 * @return void	// No return value. File already included.
 *
 * Usage: event_espresso_require_template('shopping_cart.php')
 */
function espresso_require_template($template_file_name, $must_exist = true, $as_require_once = true) {
	event_espresso_require_file($template_file_name, EVENT_ESPRESSO_TEMPLATE_DIR, EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/', $must_exist, $as_require_once);
}

add_action('action_hook_espresso_require_template', 'espresso_require_template');

function espresso_load_reg_page_files() {

	define("ESPRESSO_REG_PAGE_FILES_LOADED", "true");

//Check to see if this a reg page
//May cause admin and front facing pages to break if turned on
//global $this_is_a_reg_page;
//echo '<p>$this_is_a_reg_page ='.$this_is_a_reg_page .'</p>';
//Process email confirmations
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/email.php');

//Various attendee functions
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/attendee_functions.php');


//Payment/Registration Processing - Used to display the payment options and the payment link in the email. Used with the [ESPRESSO_PAYMENTS] tag
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Payment_Data.class.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/payment_page.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/thank_you_page.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/confirmation_page.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/pending_approval_page.php');
	require_once(espresso_get_payment_page_template());
	require_once(espresso_get_payment_overview_template());
	require_once(espresso_get_return_payment_template());
//Add attendees to the database
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/add_attendees_to_db.php');

	event_espresso_require_gateway('process_payments.php');
	event_espresso_require_gateway('PaymentGateway.php');
	event_espresso_require_gateway('gateway_display.php');

// AJAX functions
	add_action('wp_ajax_event_espresso_add_item', 'event_espresso_add_item_to_session');
	add_action('wp_ajax_nopriv_event_espresso_add_item', 'event_espresso_add_item_to_session');
	add_action('wp_ajax_event_espresso_delete_item', 'event_espresso_delete_item_from_session');
	add_action('wp_ajax_nopriv_event_espresso_delete_item', 'event_espresso_delete_item_from_session');
	add_action('wp_ajax_event_espresso_update_item', 'event_espresso_update_item_in_session');
	add_action('wp_ajax_nopriv_event_espresso_update_item', 'event_espresso_update_item_in_session');
	add_action('wp_ajax_event_espresso_calculate_total', 'event_espresso_calculate_total');
	add_action('wp_ajax_nopriv_event_espresso_calculate_total', 'event_espresso_calculate_total');
	add_action('wp_ajax_event_espresso_load_regis_form', 'event_espresso_load_regis_form');
	add_action('wp_ajax_nopriv_event_espresso_load_regis_form', 'event_espresso_load_regis_form');
	add_action('wp_ajax_event_espresso_confirm_and_pay', 'event_espresso_confirm_and_pay');
	add_action('wp_ajax_nopriv_event_espresso_confirm_and_pay', 'event_espresso_confirm_and_pay');
}

add_action('action_hook_espresso_load_reg_page_files', 'espresso_load_reg_page_files');

function espresso_site_license() {
	global $org_options;
// PUE Auto Upgrades stuff
	if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc/pue/pue-client.php') && !empty($org_options['site_license_key'])) {
//let's get the client api key for updates
		global $org_options;
		$api_key = $org_options['site_license_key']; //note this is a special field that we added to the core plugin options page for clients to add their site-license key.
		$host_server_url = 'http://beta.eventespresso.com/'; //note you'll have to change this to eventespresso.com once the domain is swtiched to the new server
		$plugin_slug = 'event-espresso'; //change this to the slug of the uploaded plugin (as you set in the plugin slug field via the Add Plugin form in the PUE Plugin Library))

		$plugin_path = plugin_basename(__FILE__);
		$options = array(
				'apikey' => $api_key,
				'lang_domain' => 'event_espresso', //this will ensure that all text in the pue-client.php file get's included in the localization files created.
				'plugin_path' => $plugin_path, //by default, the plugin_path is generated using the $plugin_slug but that only works if the format of the plugin_path uses the slug.  For example, if the slug is event-espresso then the generated path would be event-espresso/event-espresso.php.  We can instead include a plugin_path in the $options array (in this example I've used plugin_basename() to get the path.
		);
		require(EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc/pue/pue-client.php' ); //requires the pue-client file that contains the class.
//$check_for_updates = new PluginUpdateEngineChecker($host_server_url, $plugin_slug, $options); //let's make sure this addon is in the updater routine!
	}
}

add_action('action_hook_espresso_require_admin_files', 'espresso_site_license');

function espresso_require_gateway_files() {
	global $active_gateways, $espresso_wp_user, $espresso_premium;
	$active_gateways = get_user_meta($espresso_wp_user, 'active_gateways', true);
	$gateways_glob = glob(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/*/settings.php");
	$upload_gateways_glob = glob(EVENT_ESPRESSO_GATEWAY_DIR . '*/settings.php');
	if (!is_array($upload_gateways_glob))
		$upload_gateways_glob = array();
	foreach ($upload_gateways_glob as $upload_gateway) {
		$pos = strpos($upload_gateway, 'gateways');
		$sub = substr($upload_gateway, $pos);
		foreach ($gateways_glob as &$gateway) {
			$pos2 = strpos($gateway, 'gateways');
			$sub2 = substr($gateway, $pos2);
			if ($sub == $sub2) {
				$gateway = $upload_gateway;
			}
		}
		unset($gateway);
	}
	$gateways = array_merge($upload_gateways_glob, $gateways_glob);
	$gateways = array_unique($gateways);

	foreach ($gateways as $gateway) {
		require_once($gateway);
	}
}

function espresso_admin_page_footer() {
	?>
	<script type="text/javascript" charset="utf-8">
		//<![CDATA[
		jQuery(document).ready(function() {
			postboxes.add_postbox_toggles("payment_gateways");
		});
		//]]>
	</script>
	<?php

	wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false);
	wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false);
}
