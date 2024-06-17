<?php

/**
 * Class EE_Button_Display_Strategy
 * Description
 *
 * @package       Event Espresso
 * @author        Mike Nelson
 */
class EE_Button_Display_Strategy extends EE_Display_Strategy_Base
{
    /**
     * @return string of html to display the input
     * @throws EE_Error
     */
    public function display(): string
    {
        $default_value = $this->_input->get_default();
        if ($this->_input->get_normalization_strategy() instanceof EE_Normalization_Strategy_Base) {
            $default_value = $this->_input->get_normalization_strategy()->unnormalize($default_value);
        }
        $html = $this->_opening_tag('button');
        $html .= $this->_attributes_string(
            array_merge(
                $this->_standard_attributes_array(),
                array(
                    'value' => $default_value,
                )
            )
        );
        $html .= $this->dataAttributesString($this->_input->dataAttributes());
        $html .= '>';
        $button_content = $this->_input instanceof EE_Button_Input
            ? $this->_input->button_content()
            : $this->_input->get_default();
        $html .= $button_content;
        $html .= $this->_closing_tag();
        return $html;
    }
}
