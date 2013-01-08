<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

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
 * EE_Formatter
 *
 * This is a helper utility class containging a variety for formatting helpers for Event Espresso.
 *
 * @package		Event Espresso
 * @subpackage	/helper/EE_Formatter.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */




class EE_Formatter {

	/**
	 * _admin_format_content
	 * Text formatting function for wp_editor.
	 * This should fix all of the formatting issues of text output from the database.
	 *
	 * @static
	 * @access public
	 * @param  string $content content to format
	 * @return string          formatted content
	 */
	static public function admin_format_content($content='') {
		return wpautop(stripslashes_deep(html_entity_decode($content, ENT_QUOTES, "UTF-8")));
	}

}//end class EE_Form_Fields