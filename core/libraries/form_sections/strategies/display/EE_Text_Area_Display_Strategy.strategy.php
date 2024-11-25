<?php

class EE_Text_Area_Display_Strategy extends EE_Display_Strategy_Base
{
    /**
     * @return string of html to display the field
     * @throws EE_Error
     */
    public function display(): string
    {
        $input     = $this->_input;
        $raw_value = maybe_serialize((string) $input->raw_value());
        if ($input instanceof EE_Text_Area_Input) {
            $rows = $input->get_rows();
            $cols = $input->get_cols();
        } else {
            $rows = 4;
            $cols = 20;
        }

        $labelledby = $input->hasLabel() ? ' aria-labelledby="' . $input->html_label_id() . '"' : '';
        $other_attributes = $input->other_html_attributes();
        $data_attributes  = $this->dataAttributesString($input->dataAttributes());

        $text = esc_textarea($raw_value);

        $html = "
        <textarea id='{$input->html_id()}'
                  name='{$input->html_name()}'
                  class='{$input->html_class()}'
                  style='{$input->html_style()}'
                  $labelledby
                  $other_attributes
                  $data_attributes
                  rows='$rows'
                  cols='$cols'
        >$text</textarea>";

        foreach ($this->_input->get_validation_strategies() as $validation_strategy) {
            if (
                $validation_strategy instanceof EE_Simple_HTML_Validation_Strategy
                || $validation_strategy instanceof EE_Full_HTML_Validation_Strategy
            ) {
                $html .= sprintf(
                    esc_html__('%1$s(allowed tags: %2$s)%3$s', 'event_espresso'),
                    '<p class="ee-question-desc description">',
                    $validation_strategy->get_list_of_allowed_tags(),
                    '</p>'
                );
            }
        }
        return $html;
    }
}
