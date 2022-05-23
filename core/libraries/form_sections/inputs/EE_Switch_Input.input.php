<?php

class EE_Switch_Input extends EE_Form_Input_With_Options_Base
{
    public const OPTION_ON = 'ON';

    public const OPTION_OFF = 'OFF';


    /**
     * @param array $input_settings
     * @param array $answer_options
     */
    public function __construct($input_settings = [], array $answer_options = [])
    {
        $this->_set_display_strategy(new EE_Switch_Display_Strategy());
        $this->_add_validation_strategy(
            new EE_Many_Valued_Validation_Strategy(
                [
                    new EE_Enum_Validation_Strategy(
                        $input_settings['validation_error_message'] ?? null
                    ),
                ]
            )
        );
        if (! is_array($answer_options) || empty($answer_options)) {
            $answer_options = [
                EE_Switch_Input::OPTION_ON  => esc_html__('enabled', 'event_espresso'),
                EE_Switch_Input::OPTION_OFF => esc_html__('disabled', 'event_espresso'),
            ];
        }
        $this->_multiple_selections = false;
        parent::__construct($answer_options, $input_settings);
    }
}
