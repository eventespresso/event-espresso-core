<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Template	
 *
 * This is a helper utility class that provides different helpers related to template files.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EE_Template.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */




class EE_Template {


	/**
	 * load and dislpay a template
	 * @param  string $path_to_file  server path to the file to be loaded, including file name and extension
	 * @param  boolean $template_args an array of arguments to be extracted for use in the template
	 * @param  boolean $return_string whether to send output immediately to screen, or capture and return as a string
	 * @return void
	 */
	public static function display_template($path_to_file = FALSE, $template_args = FALSE, $return_string = FALSE) {
		//require the template validator for verifying variables are set according to how the template requires
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH.'/helpers/EE_Template_Validator.helper.php');
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		// you gimme nuttin - YOU GET NUTTIN !!
		if (!$path_to_file) {
			return FALSE;
		}
		// if $template_args are not in an array, then make it so
		if (!is_array($template_args)) {
			$template_args = array($template_args);
		}

		extract($template_args);

		if ($return_string) {
			// becuz we want to return a string, we are going to capture the output
			ob_start();
			include( $path_to_file );
			$output = ob_get_clean();
			return $output;
		} else {
			include( $path_to_file );
		}
	}


} //end EE_Template class