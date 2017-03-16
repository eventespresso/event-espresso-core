<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EE_Number_Input_Display_Strategy
 * Generates an HTML5 number input
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.34
 */
class EE_Number_Input_Display_Strategy extends EE_Display_Strategy_Base
{

    /**
     * minimum value for number field
     *
     * @var int|null $min
     */
    protected $min;

    /**
     * maximum value for number field
     *
     * @var int|null $max
     */
    protected $max;



    /**
     * EE_Number_Input_Display_Strategy constructor.
     *
     * @param int $min
     * @param int $max
     */
    public function __construct($min = null, $max = null)
    {
        $this->min = $min;
        $this->max = $max;
    }



    /**
     * @return string of html to display the field
     */
    public function display()
    {
        $input = $this->opening_tag('input');
        $input .= $this->attribute('type', 'number');
        $input .= $this->attribute('min', $this->min);
        $input .= $this->attribute('max', $this->max);
        $input .= $this->attribute('name', $this->_input->html_name());
        $input .= $this->attribute('id', $this->_input->html_id());
        $input .= $this->attribute('class', $this->_input->html_class(true));
        $input .= $this->single_attribute('required', $this->_input->required());
        $input .= $this->attribute('value', $this->_input->raw_value_in_form());
        $input .= $this->attribute('style', $this->_input->html_style());
        $input .= $this->_input->other_html_attributes();
        $input .= $this->closing_tag();
        return $input;
    }

}
// End of file EE_Number_Input_Display_Strategy.php
// Location: core/libraries/form_sections/strategies/display/EE_Number_Input_Display_Strategy.php