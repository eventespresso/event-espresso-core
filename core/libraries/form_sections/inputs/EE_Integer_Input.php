<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EE_Integer_Input
 * Generates an HTML5 number input using integer normalization and validation strategies
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.34
 */
class EE_Integer_Input extends EE_Form_Input_Base
{


    /**
     * @param array $input_settings
     */
    public function __construct($input_settings = array())
    {
        $this->_set_display_strategy(
            new EE_Number_Input_Display_Strategy(
                isset($input_settings['min_value'])
                    ? $input_settings['min_value']
                    : null,
                isset($input_settings['max_value'])
                    ? $input_settings['max_value']
                    : null
            )
        );
        $this->_set_normalization_strategy(
            new EE_Int_Normalization(
                isset($input_settings['validation_error_message'])
                    ? $input_settings['validation_error_message']
                    : null
            )
        );
        $this->_add_validation_strategy(
            new EE_Int_Validation_Strategy(
                isset($input_settings['validation_error_message'])
                    ? $input_settings['validation_error_message']
                    : null
            )
        );
        parent::__construct($input_settings);
    }

}
// End of file EE_Integer_Input.php
// Location: core/libraries/form_sections/inputs/EE_Integer_Input.php