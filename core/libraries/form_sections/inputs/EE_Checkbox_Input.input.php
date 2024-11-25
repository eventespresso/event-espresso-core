<?php

/**
 * Class EE_Checkbox_Input
 *
 * Like EE_Checkbox_Multi_Input but for a single checkbox input field in a form.
 * Use 'html_label_text' and 'value' elements of the $input_settings array
 * to set the label text and value of the checkbox.
 *
 * @package EventEspresso\core\libraries\form_sections\inputs
 */
class EE_Checkbox_Input extends EE_Form_Input_With_Options_Base
{
    /**
     * @param array  $input_settings
     */
    public function __construct($input_settings = [])
    {
        $this->_set_display_strategy(new EE_Checkbox_Display_Strategy());
        $this->_add_validation_strategy(
			new EE_Enum_Validation_Strategy(
				$input_settings['validation_error_message'] ?? null
			)
        );
		$input_settings['default'] = is_array($input_settings['default'])
			? $input_settings['default']
			: [$input_settings['default']];
        $html_label_text = $input_settings['html_label_text'] ?? '';
        $value = $input_settings['value'] ?? '';
        unset($input_settings['html_label_text'], $input_settings['value']);
        $this->_multiple_selections = false;
        parent::__construct([$value => $html_label_text], $input_settings);
    }
}
