<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Simple_HTML_Validation_Strategy
 *
 * Makes sure there are only 'simple' html tags in the normalized value. Eg, line breaks, lists, links. No js etc though
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Simple_HTML_Validation_Strategy extends EE_Validation_Strategy_Base{

	/**
	 * @param null $validation_error_message
	 */
	public function __construct( $validation_error_message = NULL ) {
		if( ! $validation_error_message ){
			$allowedtags = $this->_get_allowed_tags();
			$validation_error_message = sprintf( __( "Only simple HTML tags are allowed. Eg, %s", "event_espresso" ), implode( ",", array_keys( $allowedtags ) ) );
		}
		parent::__construct( $validation_error_message );
	}



	/**
	 * get tags allowed
	 */
	protected function _get_allowed_tags() {
		return EEH_HTML::get_simple_tags();
	}



	/**
	 * add_more_tags
	 *
	 * generates and returns a string that lists the top-level HTML tags that are allowable for this input
	 *
	 * @return string
	 */
	public function get_list_of_allowed_tags() {
		$allowed_tags = $this->_get_allowed_tags();
		ksort( $allowed_tags );
		return implode( ', ', array_keys( $allowed_tags ) );
	}



	/**
	 * @param $normalized_value
	 * @throws \EE_Validation_Error
	 */
	public function validate($normalized_value) {
		$allowedtags = $this->_get_allowed_tags();
		parent::validate( $normalized_value );
		$normalized_value_sans_tags =  wp_kses( "$normalized_value",$allowedtags );
		if ( strlen( $normalized_value ) > strlen( $normalized_value_sans_tags ) ) {
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'complex_html_tags' );
		}
	}
}