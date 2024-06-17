<?php

/**
 * EE_Float_Input
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_Float_Input extends EE_Form_Input_Base
{
    /**
     * @param array $input_settings
     * @throws InvalidArgumentException
     */
    public function __construct($input_settings = [])
    {
        $this->_set_display_strategy(
            new EE_Number_Input_Display_Strategy(
                $input_settings['min_value'] ?? null,
                $input_settings['max_value'] ?? null,
                $input_settings['step_value'] ?? null
            )
        );
        $this->_set_normalization_strategy(new EE_Float_Normalization());
        $this->_add_validation_strategy(
            new EE_Float_Validation_Strategy($input_settings['validation_error_message'] ?? null)
        );
        parent::__construct($input_settings);
    }
}
