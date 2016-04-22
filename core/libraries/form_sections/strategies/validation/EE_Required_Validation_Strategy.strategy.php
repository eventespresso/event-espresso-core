<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Required_Validation_Strategy
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Required_Validation_Strategy extends EE_Validation_Strategy_Base{



	/**
	 * @param string $validation_error_message
	 */
	public function __construct( $validation_error_message = null ) {
		if( ! $validation_error_message ){
			$validation_error_message = __("This field is required.", "event_espresso");
		}
		parent::__construct( $validation_error_message );
	}



	/**
	 * just checks the field isn't blank, provided the requirement conditions
	 * indicate this input is still required
	 *
	 * @param $normalized_value
	 * @return bool
	 * @throws \EE_Error
	 * @throws \EE_Validation_Error
	 */
	public function validate($normalized_value) {
		if(
			$normalized_value === ''
			|| $normalized_value === null
			|| $normalized_value === array()
		) {
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'required');
		}else{
			return true;
		}
	}



	/**
	 * @return array
	 * @throws \EE_Error
	 */
	public function get_jquery_validation_rule_array(){
		return array(
			'required'=> true,
			'messages' => array(
				'required' => $this->get_validation_error_message()
			)
		);
	}
}
