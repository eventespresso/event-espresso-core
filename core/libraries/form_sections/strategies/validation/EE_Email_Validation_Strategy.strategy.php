<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Email_Validation_Strategy
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Email_Validation_Strategy extends EE_Text_Validation_Strategy{

	/**
     * @param null $validation_error_message
     */
   public function __construct( $validation_error_message = NULL ) {
	   if( ! $validation_error_message ){
			$validation_error_message = __("Please enter a valid email address.", "event_espresso");
		}
		parent::__construct( $validation_error_message );
	}



   /**
    * just checks the field isn't blank
    *
    * @param $normalized_value
    * @return bool
    * @throws \EE_Validation_Error
    */
	function validate( $normalized_value ) {
		if( $normalized_value && ! $this->_validate_email( $normalized_value ) ){
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'required');
		}
	}



	/**
     * @return array
     */
   function get_jquery_validation_rule_array(){
	   return array( 'email'=>true, 'messages' => array( 'email' => $this->get_validation_error_message() ) );
	}



   /**
    *    Validate an email address.
    *    Provide email address (raw input)
    *
    * @param $email
    * @return bool of whether the email is valid or not
    */
	private function _validate_email( $email ) {
		if ( ! preg_match( '/^.+\@\S+\.\S+$/', $email ) ) {
			// email not in correct {string}@{string}.{string} format
			return false;
		} else {
			$atIndex = strrpos( $email, "@" );
			$domain = substr( $email, $atIndex + 1 );
			$local = substr( $email, 0, $atIndex );
			$localLen = strlen( $local );
			$domainLen = strlen( $domain );
			if ( $localLen < 1 || $localLen > 64 ) {
				// local part length exceeded
				return false;
			} else if ( $domainLen < 1 || $domainLen > 255 ) {
				// domain part length exceeded
				return false;
			} else if ( $local[ 0 ] == '.' || $local[ $localLen - 1 ] == '.' ) {
				// local part starts or ends with '.'
				return false;
			} else if ( preg_match( '/\\.\\./', $local ) ) {
				// local part has two consecutive dots
				return false;
			} else if ( preg_match( '/\\.\\./', $domain ) ) {
				// domain part has two consecutive dots
				return false;
			} else if ( ! checkdnsrr( $domain, "MX" ) ) {
				// domain not found in MX records
				return false;
			} else if ( ! checkdnsrr( $domain, "A" ) ) {
				// domain not found in A records
				return false;
			}
		}
		// you have successfully run the gauntlet young Padawan
	   return true;
	}


}
