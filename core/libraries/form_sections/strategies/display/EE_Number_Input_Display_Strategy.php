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
     * @var int $min
     */
    protected $min;

    /**
     * maximum value for number field
     *
     * @var int $max
     */
    protected $max;



    /**
     * EE_Number_Input_Display_Strategy constructor.
     *
     * @param int $min
     * @param int $max
     */
    public function __construct($min = PHP_INT_MIN, $max = PHP_INT_MAX)
    {
        $this->min = $min;
        $this->max = $max;
    }



    /**
     * @return string of html to display the field
     */
    public function display()
    {
        $input = '<input type="number"';
        $input .= ' min="' . $this->min . '"';
        $input .= ' max="' . $this->max . '"';
        $input .= ' name="' . $this->_input->html_name() . '"';
        $input .= ' id="' . $this->_input->html_id() . '"';
        $class = $this->_input->required() ? $this->_input->required_css_class() . ' ' . $this->_input->html_class()
            : $this->_input->html_class();
        $input .= ' class="' . $class . '"';
        // add html5 required
        $input .= $this->_input->required() ? ' required' : '';
        $input .= ' value="' . $this->_input->raw_value_in_form() . '"';
        $input .= ' style="' . $this->_input->html_style() . '"';
        $input .= $this->_input->other_html_attributes();
        $input .= '/>';
        return $input;
    }

}
// End of file EE_Number_Input_Display_Strategy.php
// Location: core/libraries/form_sections/strategies/display/EE_Number_Input_Display_Strategy.php