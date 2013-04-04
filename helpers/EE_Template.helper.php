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
	 * load and display a template
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



	

	/**
	 * This helper just returns a button or link for the given parameters
	 * @param  string $url   the url for the link
	 * @param  string $class what class is used for the button (defaults to 'button-primary')
	 * @param  string $label What is the label you want displayed for the button
	 * @return string        the html output for the button
	 */
	public static function get_button_or_link( $url, $label, $class = 'button-primary' ) {
		$button = '<a href="' . $url . '" class="' . $class . '">' . $label . '</a>';
		return $button;
	}





	/**
	 * This returns a generated link that will load the related help tab on admin pages.
	 *
	 *
	 * @param  string $page The page identifier for the page the help tab is on
	 * @param  string $action The action (route) for the admin page the help tab is on.
	 * @param  string $help_tab_id the id for the connected help tab
	 * @param  string $icon_style (optional) include css class for the style you want to use for the help icon.
	 * @param  string $help_text (optional) send help text you want to use for the link if default not to be used
	 * @return string              generated link
	 */
	public static function get_help_tab_link( $help_tab_id, $page = FALSE, $action = FALSE, $icon_style = FALSE, $help_text = FALSE ) {

		if ( ! $page ) 
			$page = isset( $_REQUEST['page'] ) && ! empty( $_REQUEST['page'] ) ? sanitize_key( $_REQUEST['page'] ) : $page;
		
		if ( ! $action )
			$action = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) : $action;



		$help_tab_lnk = $page . '-' . $action . '-' . $help_tab_id;
		$icon = !$icon_style ? ' help_img' : $icon_style;
		$help_text = !$help_text ? __('click for help', 'event_espresso') : $help_text;
		return '<a id="' . $help_tab_lnk . '" class="espresso-help-tab-lnk' . $icon . '" title="click to open the \'Help\' tab for more information about this feature" > ' . $help_text . ' </a>';
	}



} //end EE_Template class