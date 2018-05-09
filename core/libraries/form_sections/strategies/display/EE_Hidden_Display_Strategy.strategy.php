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
     */
    public function display()
    {
        $input = $this->_input;
        return "<input type='hidden' id='{$input->html_id()}' name='{$input->html_name()}' class='{$input->html_class()}' style='{$input->html_style()}' value='{$input->raw_value_in_form()}' {$input->other_html_attributes()}/>";
    }
}
