<?php

/**
 * EE_Hidden_Display_Strategy
 *
 * @package     Event Espresso
 * @subpackage  /core/libraries/form_sections
 * @author      Mike Nelson
 */
class EE_Hidden_Display_Strategy extends EE_Display_Strategy_Base
{
    /**
     * @return string of html to display the HIDDEN field
     * @throws EE_Error
     */
    public function display(): string
    {
        return "
        <input type='hidden'
               class='{$this->_input->html_class()}'
               id='{$this->_input->html_id()}'
               name='{$this->_input->html_name()}'
               style='{$this->_input->html_style()}'
               value='{$this->_input->raw_value_in_form()}'
               {$this->_input->other_html_attributes()}
               {$this->dataAttributesString($this->_input->dataAttributes())}
        />";
    }
}
