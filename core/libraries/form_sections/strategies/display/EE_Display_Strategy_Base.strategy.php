<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Display_Strategy_Base
 *
 * @package 			Event Espresso
 * @subpackage    core
 * @author 				Mike Nelson, Brent Christensen
 * @since               	4.6
 *
 */
abstract class EE_Display_Strategy_Base extends EE_Form_Input_Strategy_Base{
	/**
	 * returns HTML and javascript related to the displaying of this input
	 * @return string
	 */
	abstract function display();



	/**
	 * _remove_chars - takes an incoming string, and removes the string $chars from the end of it, but only if $chars is already there
	 *
	 * @param string $string - the string being processed
	 * @param string $chars - exact string of characters to remove
	 * @return string
	 */
	protected function _remove_chars( $string = '', $chars = '-' ) {
		$char_length = strlen( $chars ) * -1;
		// if last three characters of string is  " - ", then remove it
		return substr( $string, $char_length ) == $chars ? substr( $string, 0, $char_length ) : $string;
	}



	/**
	 * _append_chars - takes an incoming string, and adds the string $chars to the end of it, but only if $chars is not already there
	 *
	 * @param string $string - the string being processed
	 * @param string $chars - exact string of characters to be added to end of string
	 * @return string
	 */
	protected function _append_chars( $string = '', $chars = '-' ) {
		return  $this->_remove_chars( $string, $chars ) . $chars;
	}



}