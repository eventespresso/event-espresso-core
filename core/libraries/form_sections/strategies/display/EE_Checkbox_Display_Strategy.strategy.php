<?php

/**
 * Class EE_Checkbox_Display_Strategy
 * displays a set of checkbox inputs
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Mike Nelson
 * @since         4.6
 */
class EE_Checkbox_Display_Strategy extends EE_Compound_Input_Display_Strategy
{
    /**
     * @return string of html to display the field
     * @throws EE_Error
     */
    public function display(): string
    {
        $input = $this->get_input();
        $input->set_label_sizes();
        $label_size_class = $input->get_label_size_class();
        $html             = '';
        if ($input->hasMultipleSelections() && ! is_array($input->raw_value()) && $input->raw_value() !== null) {
            EE_Error::doing_it_wrong(
                'EE_Checkbox_Display_Strategy::display()',
                sprintf(
                    esc_html_x(
                        'Input values for checkboxes should be an array of values, but the value for input "%1$s" is "%2$s". Please verify that the input name is exactly "%3$s"',
                        'Input values for checkboxes should be an array of values, but the value for input "form-input-id" is "form-input-value". Please verify that the input name is exactly "form_input_name[]"',
                        'event_espresso'
                    ),
                    $input->html_id(),
                    var_export($input->raw_value(), true),
                    $input->html_name() . '[]'
                ),
                '4.8.1'
            );
        }
        $input_raw_value = (array) $input->raw_value();
        foreach ($input->options() as $value => $display_text) {
            $value   = $input->get_normalization_strategy()->unnormalize_one($value);

            $html_id = $this->get_sub_input_id($value);

            $html_name = $input->html_name();
            $html_name .= $input->hasMultipleSelections() ? '[]' : '';

            $html    .= EEH_HTML::nl(0, 'checkbox');
            $html    .= "
                <label for=\"$html_id\"
                       id=\"$html_id-lbl\"
                       class=\"ee-checkbox-label-after$label_size_class\"
                >";
            $html    .= EEH_HTML::nl(1, 'checkbox');
            $html    .= '<input type="checkbox"';
            $html    .= ' name="' . $html_name . '"';
            $html    .= $html_id ? ' id="' . $html_id . '"' : '';
            $html    .= $input->html_class() ? $input->html_class() ? ' class="' . $input->html_class() . '"' : '' : '';
            $html    .= $input->html_style() ? $input->html_style() ? ' style="' . $input->html_style() . '"' : '' : '';
            if ($input->hasLabel()) {
                $html .= ' aria-labelledby="' . $html_id . '-lbl"';
            }
            $html    .= ' value="' . esc_attr($value) . '"';
            $html    .= ! empty($input_raw_value) && in_array($value, $input_raw_value, true)
                ? ' checked'
                : '';
            $html    .= ' ' . $this->_input->other_html_attributes();
            $html    .= ' data-question_label="' . $html_id . '-lbl"';
            $html    .= '>&nbsp;';
            $html    .= $display_text;
            $html    .= EEH_HTML::nl(-1, 'checkbox') . '</label>';
        }
        return $html;
    }
}
