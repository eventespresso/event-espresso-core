<?php

/**
 * EE_Email_Confirm_Input
 *
 * @package         Event Espresso
 * @subpackage
 * @since           4.10.5.p
 * @author          Rafael Goulart
 */
class EE_Email_Confirm_Input extends EE_Email_Input
{
    /**
     * @param array $input_settings
     */
    public function __construct($input_settings = [])
    {
        $this->_add_validation_strategy(
            new EE_Equal_To_Validation_Strategy(
                $input_settings['validation_error_message'] ?? null,
                '#' . str_replace('email_confirm', 'email', $input_settings['html_id'])
            )
        );
        parent::__construct($input_settings);
    }
}
