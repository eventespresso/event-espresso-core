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
	 * add_more_tags
	 */
	protected function _get_allowed_tags() {
		global $allowedtags;
		$allowedtags[ 'ol' ] = array();
		$allowedtags[ 'ul' ] = array();
		$allowedtags[ 'li' ] = array();
		$allowedtags[ 'br' ] = array();
		$allowedtags[ 'p' ] = array();
		return $allowedtags;
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