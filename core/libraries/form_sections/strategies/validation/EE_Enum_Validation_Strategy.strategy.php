<?php
/**
 *
 * Class EE_Enum_Validation_Strategy
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
class EE_Enum_Validation_Strategy extends EE_Validation_Strategy_Base {

	/**
	 * Check that the value is in the allowed list
	 * @param $normalized_value
	 * @throws EE_Error
	 * @throws EE_Validation_Error
	 * @return boolean
	 */
	function validate($normalized_value) {
		parent::validate($normalized_value);
		if( ! $this->_input instanceof EE_Form_Input_With_Options_Base){
			throw new EE_Error(sprintf(__("Cannot use Enum Validation Strategy with an input that doesn't have options", "event_espresso")));
		}
		$enum_options = $this->_input->flat_options();
		if( $normalized_value === TRUE){
			$normalized_value = 1;
		}elseif( $normalized_value === FALSE){
			$normalized_value = 0;
		}
		if( $normalized_value !== NULL && ! array_key_exists( $normalized_value, $enum_options )){
			throw new EE_Validation_Error(
				sprintf(
					__("'%s' is not allowed option. Allowed options are %s", "event_espresso"),
					$normalized_value,
					implode( ', ', $enum_options )
				),
				'invalid_enum_value'
			);
			return false;
		}else{
			return true;
		}
	}
}
