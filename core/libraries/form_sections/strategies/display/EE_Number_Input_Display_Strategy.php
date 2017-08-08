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
     * This is used to set the "step" attribute for the html5 number input.
     * Controls the increments on the input when incrementing or decrementing the value.
     * Note:  Although the step attribute allows for the string "any" to be used, Firefox and Chrome will interpret that
     * to increment by 1.  So although "any" is accepted as a value, it is converted to 1.
     * @var float
     */
    protected $step;


    /**
     * EE_Number_Input_Display_Strategy constructor.
     * Null is the default value for the incoming arguments because 0 is a valid value.  So we use null
     * to indicate NOT setting this attribute.
     *
     * @param int|null $min
     * @param int|null $max
     * @param int|null $step
     * @throws InvalidArgumentException
     */
    public function __construct($min = null, $max = null, $step = null)
    {
        $this->min = is_numeric($min) || $min === null
            ? $min
            : $this->throwValidationException('min', $min);
        $this->max = is_numeric($max) || $max === null
            ? $max
            : $this->throwValidationException('max', $max);
        $step = $step === 'any' ? 1 : $step;
        $this->step = is_numeric($step) || $step === null
            ? $step
            : $this->throwValidationException('step', $step);
    }


    private function throwValidationException($argument_label, $argument_value)
    {
        throw new InvalidArgumentException(
            sprintf(
                esc_html__(
                    'The %1$s parameter value for %2$s must be numeric or null, %3$s was passed into the constructor.',
                    'event_espresso'
                ),
                $argument_label,
                __CLASS__,
                $argument_value
            )
        );
    }



    /**
     * @return string of html to display the field
     */
    public function display()
    {
        $input = $this->_opening_tag('input');
        $input .= $this->_attributes_string(
            array_merge(
                $this->_standard_attributes_array(),
                $this->getNumberInputAttributes()
            )
        );
        $input .= $this->_close_tag();
        return $input;
    }


    /**
     * Return the attributes specific to this display strategy
     * @return array
     */
    private function getNumberInputAttributes()
    {
        $attributes = array(
            'type' => 'number',
            'value' => $this->_input->raw_value_in_form()
        );
        if ($this->min !== null) {
            $attributes['min'] = $this->min;
        }
        if ($this->max !== null) {
            $attributes['max'] = $this->max;
        }
        if ($this->step !== null) {
            $attributes['step'] = $this->step;
        }
        return $attributes;
    }

}
// End of file EE_Number_Input_Display_Strategy.php
// Location: core/libraries/form_sections/strategies/display/EE_Number_Input_Display_Strategy.php
