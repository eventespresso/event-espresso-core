<?php

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
    public function __construct($input_settings = [])
    {
        $this->_set_display_strategy(
            new EE_Number_Input_Display_Strategy(
                $input_settings['min_value'] ?? null,
                $input_settings['max_value'] ?? null
            )
        );
        $this->_set_normalization_strategy(new EE_Int_Normalization());
        $this->_add_validation_strategy(
            new EE_Int_Validation_Strategy($input_settings['validation_error_message'] ?? null)
        );
        parent::__construct($input_settings);
    }
}
