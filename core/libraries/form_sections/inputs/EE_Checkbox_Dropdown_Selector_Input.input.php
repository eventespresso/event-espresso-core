<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class EE_Checkbox_Dropdown_Selector_Input
 * configures a set of checkbox inputs that are initially hidden
 * by what appears to be a cross between a button and a select input
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen, Mike Nelson
 * @since         $VID:$
 */
class EE_Checkbox_Dropdown_Selector_Input extends EE_Form_Input_With_Options_Base
{

    /**
     * @param array $answer_options
     * @param array $input_settings
     */
    public function __construct($answer_options, $input_settings = array())
    {
        $this->_set_display_strategy(
            new EE_Checkbox_Dropdown_Selector_Display_Strategy()
        );
        $this->_add_validation_strategy(
            new EE_Many_Valued_Validation_Strategy(
                array(
                    new EE_Enum_Validation_Strategy(
                        isset($input_settings['validation_error_message'])
                            ? $input_settings['validation_error_message']
                            : null
                    ),
                )
            )
        );
        $this->_multiple_selections = true;
        parent::__construct($answer_options, $input_settings);
    }


}