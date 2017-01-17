<?php
require_once( EE_MODELS . 'fields/EE_Text_Field_Base.php' );
class EE_Class_Field extends EE_Text_Field_Base {
    
    const CSS_CLASS_REGEX = '/^-?([_a-z]|[\240-\377]|([0-9a-f]{1,6}(\r\n|[ \t\r\n\f])?|[^\r\n\f0-9a-f]))([_a-z0-9-]|[\240-\377]|([0-9a-f]{1,6}(\r\n|[ \t\r\n\f])?|[^\r\n\f0-9a-f]))*$/i';
    
    /**
	 * When setting, just verify that the value being used is a valid CSS Class Name.
	 * If not, throw an error (but if WP_DEBUG is false, just set the value to default)
	 * @param int $value_inputted_for_field_on_model_object
	 * @return int
	 * @throws EE_Error
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		if( (string) $value_inputted_for_field_on_model_object !== '') {
			$valid_classes = array();
			foreach ( explode(' ', $value_inputted_for_field_on_model_object) as $i => $potential_class ) {
				if ( ! preg_match(self::CSS_CLASS_REGEX, $potential_class, $dis ) ) {
					if( defined( 'WP_DEBUG' ) && WP_DEBUG ){
						$msg = sprintf(
							__('System is assigning incompatible value "%1$s" to field "%2$s"','event_espresso'),
							$potential_class,
							$this->_name
						);
						$msg2 = sprintf(
							__('Values must be valid CSS Class names. You provided "%1$s"','event_espresso'),
							$potential_class
						);
						EE_Error::add_error("$msg||$msg2", __FILE__, __FUNCTION__, __LINE__ );
					}
				} else
					$valid_classes[] = $potential_class;
			}
			if ( empty($valid_classes) )
				$value_inputted_for_field_on_model_object = '';
			elseif ( ! isset($valid_classes[1]) )
				$value_inputted_for_field_on_model_object = $valid_classes[0];
			else
				$value_inputted_for_field_on_model_object = implode(' ', $valid_classes);
		}
		return parent::prepare_for_set($value_inputted_for_field_on_model_object);
	}
    
}
