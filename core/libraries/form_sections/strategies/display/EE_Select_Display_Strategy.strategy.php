<?php

/**
 * Class EE_Select_Display_Strategy
 * displays either simple arrays as selected, or if a 2d array is provided, separates them into optgroups
 *
 * @package             Event Espresso
 * @subpackage          core
 * @author              Mike Nelson
 */
class EE_Select_Display_Strategy extends EE_Display_Strategy_Base
{
    /**
     * @return string of html to display the field
     * @throws EE_Error
     */
    public function display(): string
    {
        if (! $this->_input instanceof EE_Form_Input_With_Options_Base) {
            throw new EE_Error(
                esc_html__(
                    'Cannot use Select Display Strategy with an input that doesn\'t have options',
                    'event_espresso'
                )
            );
        }

        $html = EEH_HTML::nl(0, 'select');
        $html .= '<select';
        $html .= $this->_attributes_string(
            $this->_standard_attributes_array()
        );
        $html .= $this->dataAttributesString($this->_input->dataAttributes());
        $html .= '>';

        if (EEH_Array::is_multi_dimensional_array($this->_input->options())) {
            EEH_HTML::indent(1, 'optgroup');
            foreach ($this->_input->options() as $opt_group_label => $opt_group) {
                if (! empty($opt_group_label)) {
                    $html .= EEH_HTML::nl(0, 'optgroup') . '<optgroup label="' . esc_attr($opt_group_label) . '">';
                }
                EEH_HTML::indent(1, 'option');
                $html .= $this->_display_options($opt_group);
                EEH_HTML::indent(-1, 'option');
                if (! empty($opt_group_label)) {
                    $html .= EEH_HTML::nl(0, 'optgroup') . '</optgroup>';
                }
            }
            EEH_HTML::indent(-1, 'optgroup');
        } else {
            $html .= $this->_display_options($this->_input->options());
        }

        $html .= EEH_HTML::nl(0, 'select') . '</select>';
        return $html;
    }


    /**
     * Displays a flat list of options as option tags
     *
     * @param array $options
     * @return string
     */
    protected function _display_options(array $options): string
    {
        $html = '';
        EEH_HTML::indent(1, 'option');
        foreach ($options as $value => $display_text) {
            // even if this input uses EE_Text_Normalization if one of the array keys is a numeric string, like "123",
            // PHP will have converted it to a PHP integer (eg 123). So we need to make sure it's a string
            $value    = $this->_input->get_normalization_strategy()->unnormalize_one($value);
            $selected = $this->_check_if_option_selected($value) ? ' selected' : '';
            $value    = esc_attr($value);
            $html     .= EEH_HTML::nl(0, 'option');
            $html     .= "<option value=\"$value\"$selected>$display_text</option>";
        }
        EEH_HTML::indent(-1, 'option');
        return $html;
    }


    /**
     * Checks if that value is the one selected
     *
     * @param string|int $option_value unnormalized value option (string). How it will appear in the HTML.
     * @return bool
     */
    protected function _check_if_option_selected($option_value): bool
    {
        return $option_value === $this->_input->raw_value();
    }
}
