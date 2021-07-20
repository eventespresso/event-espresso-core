<?php

/**
 *
 * EE_Phone_Input
 *
 * Validates that the phone number is either 10 digits, or like
 * 123-123-1231
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 */
class EE_Phone_Input extends EE_Text_Input
{
    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        $this->_add_validation_strategy(
            new EE_Text_Validation_Strategy(
                esc_html__('Please enter a valid phone number. Eg 123-456-7890 or 1234567890', 'event_espresso'),
                '~^(([\d]{10})|(^[\d]{3}-[\d]{3}-[\d]{4}))$~'
            )
        );
        parent::__construct($options);
    }
}
