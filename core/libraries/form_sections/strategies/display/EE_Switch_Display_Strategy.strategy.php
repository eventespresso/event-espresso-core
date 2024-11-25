<?php

class EE_Switch_Display_Strategy extends EE_Compound_Input_Display_Strategy
{
    /**
     * returns HTML and javascript related to the displaying of this input
     *
     * @return string
     * @throws EE_Error
     */
    public function display(): string
    {
        $input           = $this->get_input();
        $input_raw_value = $input->raw_value();

        $html = '
		<div class="ee-switch">';

        $html_id      = $this->get_sub_input_id(1);
        $checked      = $input_raw_value === EE_Switch_Input::OPTION_ON
            ? 'checked'
            : '';
        $switch_value = EE_Switch_Input::OPTION_ON;
        $html_class   = $input->html_class();
        $html_class   = ! empty($html_class)
            ? "$html_class ee-switch__input"
            : 'ee-switch__input';

        $labelledby = $input->hasLabel() ? ' aria-labelledby="' . $html_id . '-lbl"' : '';

        $html .= "
			<input type='checkbox'
				   class='$html_class'
				   id='$html_id'
				   name='{$input->html_name()}'
				   style='{$input->html_style()}'
				   value=$switch_value
				   {$input->other_html_attributes()}
				   {$this->dataAttributesString($input->dataAttributes())}
				   $checked
				   $labelledby
			/>
			<label id='$html_id-lbl' class='ee-switch__toggle' for='$html_id'></label>
			<div class='ee-switch__label'>
			";

        foreach ($input->options() as $value => $display_text) {
            $html .= "
				<span class='ee-switch--$value'>$display_text</span>";
        }

        $html .= '
			</div>
		</div>';

        return $html;
    }
}
