<?php

/**
 * EE_Password_Input
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Password_Input extends EE_Text_Input
{
    /**
     * @param array $input_settings
     */
    public function __construct($input_settings = array())
    {
        parent::__construct($input_settings, 'password');
        $this->set_html_class($this->html_class() . 'password');
    }
}
