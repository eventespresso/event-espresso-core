<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );




//Text formatting function.
//This should fix all of the formatting issues of text output from the database.
function espresso_format_content($content = '') {
	return wpautop(stripslashes_deep(html_entity_decode(do_shortcode($content), ENT_QUOTES, "UTF-8")));
}






//Function to include a template file. Checks user templates folder first, then default template.
if (!function_exists('event_espresso_require_file')) {

	/**
	 * event_espresso_require_file()
	 *
	 * @param mixed $template_file_name // Name of template file.
	 * @param mixed $path_first		 // First choice for file location.
	 * @param mixed $path_else		 // Fallback location for file.
	 * @param bool $must_exist		  // Error if neither file exist.
	 * @param bool $as_require_once	 // True for require_once(), False for require()
	 * @return void	// No return value. File already included.
	 *
	 * Usage: event_espresso_require_file('shopping_cart.php',EVENT_ESPRESSO_TEMPLATE_DIR,EVENT_ESPRESSO_PLUGINFULLPATH.'templates/')
	 */
	function event_espresso_require_file($template_file_name, $path_first, $path_else, $must_exist = true, $as_require_once = true) {
		do_action('AHEE_log', __FILE__, __FUNCTION__, ' $template_file_name = ' . $template_file_name );
		if (file_exists($path_first . $template_file_name)) {
			// Use the template file in the user's upload folder
			$full_path = $path_first . $template_file_name;
		} else {
			// Use the system file path
			$full_path = $path_else . $template_file_name;
		}
		if (file_exists($full_path) || $must_exist) {
			($as_require_once == true) ? require_once($full_path) : require($full_path);
		}
	}

}






/**
 * 		load and display a template
 * 		This is a wrapper for the EEH_Template::display_template helper.
 * 		@return 		void
 */
function espresso_display_template( $path_to_file = FALSE, $template_args = FALSE, $return_string = FALSE ) {
	// load the template helper 
	EE_Registry::instance()->load_helper( 'Template' );
	return $return_string ? EEH_Template::display_template( $path_to_file, $template_args, $return_string ) : EEH_Template::display_template( $path_to_file, $template_args, $return_string );
}		

