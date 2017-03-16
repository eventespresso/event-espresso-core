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
	abstract public function display();



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
		return substr( $string, $char_length ) === $chars ? substr( $string, 0, $char_length ) : $string;
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

	/**
	 * Gets the HTML IDs of all the inputs
	 * @return array
	 */
	public function get_html_input_ids( $add_pound_sign = false ) {
		return array( $this->get_input()->html_id( $add_pound_sign ) );
	}



	/**
	 * Adds js variables for localization to the $other_js_data. These should be put
	 * in each form's "other_data" javascript object.
	 *
	 * @param array $other_js_data
	 * @return array
	 */
	public function get_other_js_data( $other_js_data = array() ) {
		return $other_js_data;
	}

	/**
	 * Opportunity for this display strategy to call wp_enqueue_script and wp_enqueue_style.
	 * This should be called during wp_enqueue_scripts
	 */
	public function enqueue_js() {}



    /**
     * returns string like: attribute="value"
     * returns an empty string if $value is null
     *
     * @param string $tag
     * @return string
     */
    protected function opening_tag($tag)
    {
        return "<{$tag}";
    }



    /**
     * returns string like: attribute="value"
     * returns an empty string if $value is null
     *
     * @param string $tag
     * @return string
     */
    protected function closing_tag($tag = '')
    {
        return ! empty($tag) ? "/{$tag}>" : '/>';
    }



    /**
     * returns string like: ' attribute="value"'
     * returns an empty string if $value is null
     *
     * @param string $attribute
     * @param string $value
     * @return string
     */
    protected function attribute($attribute, $value = '')
    {
        return $value !== null ? " {$attribute}=\"{$value}\"" : '';
    }



    /**
     * returns string like: ' attribute' if $add is true
     *
     * @param string  $attribute
     * @param boolean $add
     * @return string
     */
    protected function single_attribute($attribute, $add = true)
    {
        return $add ? " {$attribute}" : '';
    }

}