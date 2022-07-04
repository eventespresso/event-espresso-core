<?php

/**
 * EE_Yes_No_Input
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Yes_No_Input extends EE_Select_Input
{
    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        $select_options = array(true =>  esc_html__("Yes", "event_espresso"),false =>  esc_html__("No", "event_espresso"));

        parent::__construct($select_options, $options);
    }
}
