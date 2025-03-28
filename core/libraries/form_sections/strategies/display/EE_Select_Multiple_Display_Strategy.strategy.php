<?php

/**
 * EE_Select_Multiple_Display_Strategy
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_Select_Multiple_Display_Strategy extends EE_Select_Display_Strategy
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
                    'Cannot use Select Multiple Display Strategy with an input that doesn\'t have options',
                    "event_espresso"
                )
            );
        }

        $html = EEH_HTML::nl(0, 'select');
        $html .= '<select multiple';
        $html .= ' id="' . $this->_input->html_id() . '"';
        $html .= ' name="' . $this->_input->html_name() . '[]"';
        $class = $this->_input->required()
            ? $this->_input->required_css_class() . ' ' . $this->_input->html_class()
            : $this->_input->html_class();
        $html .= $class ? ' class="' . $class . '"' : '';
        if ($this->_input->hasLabel()) {
            $html .= ' aria-labelledby="' . $this->_input->html_label_id() . '"';
        }
        // add html5 required
        $html .= $this->_input->required() ? ' required' : '';
        $html .= $this->_input->html_style() ? ' style="' . $this->_input->html_style() . '"' : '';
        $html .= $this->_input->other_html_attributes();
        $html .= $this->dataAttributesString($this->_input->dataAttributes());
        $html .= '>';

        EEH_HTML::indent(1, 'select');
        if (EEH_Array::is_multi_dimensional_array($this->_input->options())) {
            throw new EE_Error(
                esc_html__(
                    "Select multiple display strategy does not allow for nested arrays of options.",
                    "event_espresso"
                )
            );
        } else {
            $html .= $this->_display_options($this->_input->options());
        }

        $html .= EEH_HTML::nl(-1, 'select') . "</select>";
        return $html;
    }


    /**
     * Checks if that $value is one of the selected ones
     *
     * @param string|int $value unnormalized value option (string)
     * @return bool
     */
    protected function _check_if_option_selected($value): bool
    {
        $selected_options = $this->_input->raw_value();
        if (empty($selected_options)) {
            return false;
        }
        return in_array($value, $selected_options);
    }
}
