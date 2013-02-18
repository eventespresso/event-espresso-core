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




	/**
	 * ee_tep_output_string
	 * todo: we need a description for this.
	 *
	 * @static
	 * @access public	
	 * @param  string  $string    string to handle
	 * @param  boolean $translate //todo what is this for?
	 * @param  boolean $protected true then we run htmlspecialchars and return
	 * @return string 
	 */
	static public function ee_tep_output_string($string, $translate = false, $protected = false) {
		if ($protected == true) {
			return htmlspecialchars($string);
		} else {
			if ($translate == false) {
				return self::ee_tep_parse_input_field_data($string, array('"' => '&quot;'));
			} else {
				return self::ee_tep_parse_input_field_data($string, $translate);
			}
		}
	}

	

	/**
	 * ee_tep_parse_input_field_data
	 * //todo this needs filled out.
	 * 
	 * @param  [type] $data  [description]
	 * @param  [type] $parse [description]
	 * @return [type]        [description]
	 */
	static public	function ee_tep_parse_input_field_data($data, $parse) {
		return strtr(trim($data), $parse);
	}




	/**
	 * [ee_tep_not_null description]
	 * @param  [type] $value [description]
	 * @return [type]        [description]
	 */
	static public function ee_tep_not_null($value) {
		if (is_array($value)) {
			if (sizeof($value) > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			if (($value != '') && (strtolower($value) != 'null') && (strlen(trim($value)) > 0)) {
				return true;
			} else {
				return false;
			}
		}
	}



	/*
	 * Date formatting function
	 * Formats a date
	 * @params string $date
	 * @params string $format - format for the date
	 */	
	static public function event_date_display( $date, $format = '' ) {
		$format = $format == '' ? get_option('date_format') : $format;
		if ( empty( $date )) {
			return '';
		} else {
			return date_i18n( $format, strtotime( $date )); 
		}
	}

}//end class EE_Form_Fields