<?php

/**
 * EE_Hidden_Display_Strategy
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Hidden_Display_Strategy extends EE_Display_Strategy_Base
{
    /**
     *
     * @return string of html to display the HIDDEN field
     * @throws EE_Error
     */
    public function display()
    {
        $input = $this->_input;
        return "<input type='hidden' id='".esc_attr($input->html_id())."' name='".esc_attr($input->html_name())."' 
        class='".esc_attr($input->html_class())."' style='".esc_attr($input->html_style())."' 
        value='".esc_attr($input->raw_value_in_form())."' {$input->other_html_attributes()}/>";
    }
}
