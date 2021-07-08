<?php

/**
 *
 * Class EE_Select_Display_Strategy
 *
 * displays either simple arrays as selected, or if a 2d array is provided, separates them into optgroups
 *
 * @package             Event Espresso
 * @subpackage          core
 * @author              Mike Nelson
 *
 *
 */
class EE_Select_Display_Strategy extends EE_Display_Strategy_Base
{

    /**
     * @var EE_Form_Input_With_Options_Base
     */
    protected $_input;


    /**
     *
     * @return string of html to display the field
     * @throws EE_Error
     */
    public function display()
    {
        if (! $this->_input instanceof EE_Form_Input_With_Options_Base) {
            throw new EE_Error(
                sprintf(
                    __('Cannot use Select Display Strategy with an input that doesn\'t have options', 'event_espresso')
                )
            );
        }

        $options_html = '';

        if (EEH_Array::is_multi_dimensional_array($this->_input->options())) {
            EEH_HTML::indent(1, 'optgroup');
            foreach ($this->_input->options() as $opt_group_label => $opt_group) {
                if (! empty($opt_group_label)) {
                    $options_html .= EEH_HTML::nl(0, 'optgroup');
                    $options_html .= '<optgroup label="' . esc_attr($opt_group_label) . '">';
                }
                EEH_HTML::indent(1, 'option');
                $options_html .= $this->_display_options($opt_group);
                EEH_HTML::indent(-1, 'option');
                if (! empty($opt_group_label)) {
                    $options_html .= EEH_HTML::nl(0, 'optgroup') . '</optgroup>';
                }
            }
            EEH_HTML::indent(-1, 'optgroup');
        } else {
            $options_html .= $this->_display_options($this->_input->options());
        }

        return $this->fullDisplayString('select', $options_html);
    }


    /**
     * Displays a flat list of options as option tags
     *
     * @param array $options
     * @return string
     */
    protected function _display_options($options)
    {
        $html = '';
        EEH_HTML::indent(1, 'option');
        foreach ($options as $value => $option) {
            // even if this input uses EE_Text_Normalization if one of the array keys is a numeric string, like "123",
            // PHP will have converted it to a PHP integer (eg 123). So we need to make sure it's a string
            $unnormalized_value = $this->_input->get_normalization_strategy()->unnormalize_one($value);
            $html               .= is_array($option)
                ? $this->processArrayOption($unnormalized_value, $option)
                : $this->processTextOption($unnormalized_value, $option);
        }
        EEH_HTML::indent(-1, 'option');
        return $html;
    }


    /**
     * @param string $value
     * @param array  $attributes
     * @return string
     */
    protected function processArrayOption($value, $attributes)
    {
        $html = '';
        if (! isset($attributes['display_text'])) {
            return $html;
        }
        $display_text = $attributes['display_text'];
        unset($attributes['display_text']);
        if ($this->optionIsSelected($value)) {
            $attributes['selected'] = 'selected';
        }
        $attributes['value'] = esc_attr($value);
        $html                .= EEH_HTML::nl(0, 'option');
        $html                .= '<option ';
        foreach ($attributes as $attribute => $attribute_value) {
            $attribute       = sanitize_key($attribute);
            $attribute_value = esc_attr($attribute_value);
            $html            .= " {$attribute}='{$attribute_value}'";
        }
        $html .= '>';
        $html .= $display_text;
        $html .= '</option>';
        return $html;
    }


    /**
     * @param string $value
     * @param string $option
     * @return string
     */
    protected function processTextOption($value, $option)
    {
        $html     = '';
        $selected = $this->optionIsSelected($value) ? ' selected="selected"' : '';
        $html     .= EEH_HTML::nl(0, 'option');
        $html     .= '<option value="' . esc_attr($value) . '"' . $selected . '>';
        $html     .= $option;
        $html     .= '</option>';
        return $html;
    }


    /**
     * Checks if that value is the one selected
     *
     * @param string|int $option_value unnormalized value option (string). How it will appear in the HTML.
     * @return bool
     */
    protected function optionIsSelected($option_value)
    {
        return $option_value === $this->_input->raw_value();
    }
}
