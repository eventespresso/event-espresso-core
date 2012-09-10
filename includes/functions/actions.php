<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );

//Show pricing in a dropdown or text
/*if (!function_exists('espresso_price_select_action')) {

	function espresso_price_select_action($event_id, $atts = '') {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$html = '';
		$html .= is_admin() ? '' : '<p class="event_prices">';
		$html .= event_espresso_price_dropdown($event_id, $atts);
		$html .= is_admin() ? '' : '</p>';

		echo $html;

		return;
	}
	add_action('action_hook_espresso_price_select', 'espresso_price_select_action', 10, 2);
}
*/



/**
 * 		@ display admin update & error messages
 * 		@access public
 * 		@return void
 * */
/*function display_espresso_admin_notices() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

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
}
add_action('admin_notices', 'display_espresso_admin_notices');*/




function espresso_site_license() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
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




function espresso_admin_page_footer() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
	wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false);
	wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false);
}
