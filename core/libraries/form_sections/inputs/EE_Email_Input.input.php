<?php

/**
 * EE_Email_Input
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Email_Input extends EE_Form_Input_Base
{
    /**
     * @param array $input_settings
     */
    public function __construct($input_settings = array())
    {
        $this->_set_display_strategy(new EE_Text_Input_Display_Strategy('email'));
        $this->_set_normalization_strategy(new EE_Text_Normalization());
        $this->_add_validation_strategy(
            new EE_Email_Validation_Strategy(
                isset($input_settings['validation_error_message'])
                    ? $input_settings['validation_error_message']
                    : null
            )
        );
        parent::__construct($input_settings);
        $this->set_html_class($this->html_class() . ' email');
    }
}
