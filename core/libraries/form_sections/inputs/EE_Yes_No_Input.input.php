<?php

/**
 * EE_Yes_No_Input
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Yes_No_Input extends EE_Select_Input
{

    /**
     * @param array $options
     */
    public function __construct($options = [])
    {
        parent::__construct(
            [
                true  => esc_html__('Yes', 'event_espresso'),
                false => esc_html__('No', 'event_espresso')
            ],
            $options
        );
        $this->set_html_class($this->html_class() . ' ee-input-size--tiny');
    }
}
