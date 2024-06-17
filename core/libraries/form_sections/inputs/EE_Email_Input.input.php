<?php

/**
 * EE_Email_Input
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Email_Input extends EE_Text_Input
{
    /**
     * @param array $input_settings
     */
    public function __construct($input_settings = [])
    {
        $this->_add_validation_strategy(
            new EE_Email_Validation_Strategy($input_settings['validation_error_message'] ?? null)
        );
        parent::__construct($input_settings, 'email');
        $this->set_html_class($this->html_class() . ' email');
    }
}
