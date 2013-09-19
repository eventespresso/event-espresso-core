<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );




function espresso_widget() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	espresso_require_template('init.php');
	require(espresso_get_widget_template());
	//The widget can be over-ridden with the custom files addon
	register_widget('Event_Espresso_Widget');
}





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
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	event_espresso_require_file($template_file_name, EVENT_ESPRESSO_TEMPLATE_DIR, EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/', $must_exist, $as_require_once);
}
add_action('AHEE_require_template', 'espresso_require_template');