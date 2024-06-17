<?php

/**
 *
 * EE_URL_Input
 *
 * Generates an HTML 5 URL input and validates that the entered text is a URL
 *
 * @package     Event Espresso
 * @subpackage
 * @author  Mike Nelson
 *
 */
class EE_URL_Input extends EE_Text_Input
{
    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        $options['other_html_attributes'] = $options['other_html_attributes'] ?? 'placeholder="https://www.google.com"';
        $this->_add_validation_strategy(new EE_URL_Validation_Strategy());
        parent::__construct($options, 'url');
    }
}
