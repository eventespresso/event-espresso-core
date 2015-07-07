<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Plaintext_Validation_Strategy
 *
 * Makes sure there are only 'simple' html tags in the normalized value. Eg, line breaks, lists, links. No js etc though
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Plaintext_Validation_Strategy extends EE_Validation_Strategy_Base{

	/**
	 * @param null $validation_error_message
	 */
	public function __construct( $validation_error_message = NULL ) {
		if( ! $validation_error_message ){
			$validation_error_message = __( "HTML tags are not permitted in this field", "event_espresso" );
		}
		parent::__construct( $validation_error_message );
	}

	/**
	 * @param $normalized_value
	 * @throws \EE_Validation_Error
	 */
	public function validate($normalized_value) {
		$no_tags = wp_strip_all_tags( $normalized_value );
		if( strlen( $no_tags ) < strlen( trim( $normalized_value ) ) ) {
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'no_html_tags' );
		}
		parent::validate($normalized_value);
	}
}