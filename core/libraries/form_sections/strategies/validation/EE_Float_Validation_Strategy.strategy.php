<?php

/**
 * Class EE_Float_Validation_Strategy
 *
 * @package             Event Espresso
 * @subpackage  core
 * @author              Mike Nelson
 * @since               4.6
 *
 */
class EE_Float_Validation_Strategy extends EE_Validation_Strategy_Base
{
    /**
     * @param null $validation_error_message
     */
    public function __construct($validation_error_message = null)
    {
        if (! $validation_error_message) {
            $validation_error_message = sprintf(esc_html__("Only numeric characters, commas, periods, and spaces, please!", "event_espresso"));
        }
        parent::__construct($validation_error_message);
    }



    /**
     *
     * @param $normalized_value
     * @return bool
     */
    public function validate($normalized_value)
    {
        // errors should have been detected by the normalization strategy
    }



    /**
     * @return array
     */
    public function get_jquery_validation_rule_array()
    {
        return array('number' => true, 'messages' => array( 'number' => $this->get_validation_error_message() ) );
    }
}
