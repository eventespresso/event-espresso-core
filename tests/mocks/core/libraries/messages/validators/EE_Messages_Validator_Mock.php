<?php
/**
 * Contains all mock classes for the EE_Messages_Validator system.
 *
 * @since  		4.6.0
 * @package 		Event Espresso
 * @subpackage 	tests/mocks
 */


class EE_Messages_Validator_Mock extends EE_Messages_Validator {


	public function __construct( $fields = array(), $context = '' ) {
		//do nothing we're not initiating the entire validator at this point.
	}


	/**
	 * public wrapper for the private _invalid_shortcodes method in the EE_Messages_Validator
	 *
	 * @param string $value            string to evaluate that has shortcodes in it.
	 * @param array  $valid_shortcodes Array of valid shortcodes that are acceptable.  The
	 *                                 			array should be with the array_keys as the actual
	 *                                 			shortcodes.
	 *                                 			i.e. something like:
	 *                                 			array(
	 *                                 				'[SHORTCODE]' => 'something',
	 *                                 				'[ANOTHER_SHORTCODE]' => 'something else'
	 *                                 			)
	 *
	 * @return  string|bool   If there are invalid shortcodes then a string of those shortcodes are
	 *                           	  returned.  Otherwise false is returned.
	 */
	public function invalid_shortcodes( $value, $valid_shortcodes ) {
		return $this->_invalid_shortcodes( $value, $valid_shortcodes );
	}


	protected function _modify_validator() {}
}
