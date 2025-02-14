<?php

/**
 * Class EE_Submit_Input_Display_Strategy
 * Description
 *
 * @package       Event Espresso
 * @author        Mike Nelson
 */
class EE_Submit_Input_Display_Strategy extends EE_Display_Strategy_Base
{
    /**
     * @return string of html to display the input
     * @throws EE_Error
     */
    public function display(): string
    {
        $this->_input->set_html_id($this->_input->html_id() . '-submit');
        $default_value = $this->_input->get_default();
        if ($this->_input->get_normalization_strategy() instanceof EE_Normalization_Strategy_Base) {
            $default_value = $this->_input->get_normalization_strategy()->unnormalize($default_value);
        }
        $html = $this->_opening_tag('input');
        $html .= $this->_attributes_string(
            array_merge(
                $this->_standard_attributes_array(),
                [
                    'type'  => 'submit',
                    'value' => $default_value,
                    // overwrite the standard id with the backwards compatible one
                    'id'    => $this->_input->html_id(),
                    'class' => $this->_input->html_class() . ' ' . $this->_input->button_css_attributes(),
                ]
            )
        );
        $html .= $this->dataAttributesString($this->_input->dataAttributes());
        $html .= $this->_close_tag();
        return $html;
    }
}
