<?php

/**
 * Class EE_Radio_Button_Input
 * configures a set of radio button inputs
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Mike Nelson, Brent Christensen
 * @since                 4.9.51
 */
class EE_Radio_Button_Input extends EE_Form_Input_With_Options_Base
{

    /**
     * @param array $answer_options
     * @param array $input_settings
     */
    public function __construct($answer_options, $input_settings = array())
    {
        $this->_set_display_strategy(new EE_Radio_Button_Display_Strategy());
        $this->_add_validation_strategy(
            new EE_Enum_Validation_Strategy(
                isset($input_settings['validation_error_message'])
                    ? $input_settings['validation_error_message']
                    : null
            )
        );
        $this->_multiple_selections = false;
        parent::__construct($answer_options, $input_settings);
    }
}
