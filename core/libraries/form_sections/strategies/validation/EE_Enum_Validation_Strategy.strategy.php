<?php

/**
 * Class EE_Enum_Validation_Strategy
 *
 * @package             Event Espresso
 * @subpackage  core
 * @author              Mike Nelson
 * @since               4.6
 *
 */
class EE_Enum_Validation_Strategy extends EE_Validation_Strategy_Base
{
    /**
     * Check that the value is in the allowed list
     * @param $normalized_value
     * @throws EE_Error
     * @throws EE_Validation_Error
     * @return boolean
     */
    public function validate($normalized_value)
    {
        parent::validate($normalized_value);
        if (! $this->_input instanceof EE_Form_Input_With_Options_Base) {
            throw new EE_Error(sprintf(esc_html__("Cannot use Enum Validation Strategy with an input that doesn't have options", "event_espresso")));
        }
        $enum_options = $this->_input->flat_options();
        if ($normalized_value === true) {
            $normalized_value = 1;
        } elseif ($normalized_value === false) {
            $normalized_value = 0;
        }
        if ($normalized_value !== null && ! array_key_exists($normalized_value, $enum_options)) {
            throw new EE_Validation_Error(
                $this->get_validation_error_message(),
                'invalid_enum_value'
            );
        } else {
            return true;
        }
    }

    /**
     * If we are using the default validation error message, make it dynamic based
     * on the allowed options.
     * @return string
     */
    public function get_validation_error_message()
    {
        $parent_validation_error_message = parent::get_validation_error_message();
        if (! $parent_validation_error_message) {
            $enum_options = $this->_input instanceof EE_Form_Input_With_Options_Base ? $this->_input->flat_options() : '';
            return sprintf(
                esc_html__("This is not allowed option. Allowed options are %s.", "event_espresso"),
                implode(', ', $enum_options)
            );
        } else {
            return $parent_validation_error_message;
        }
    }
}
