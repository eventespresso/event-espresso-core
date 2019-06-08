<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EE_State_Select_Input
 *
 * @package     Event Espresso
 * @subpackage
 * @author      Mike Nelson
 */
class EE_State_Select_Input extends EE_Select_Input
{
    /**
     * @var string the name of the EE_State field to use for option values in the HTML form input.
     */
    protected $valueFieldName;

    /**
     * @param EE_State[]|array|null $state_options. If an flat array of string is provided,
     * $input_settings['value_field_name'] is ignored. If an array of states is passed, that field will be used for
     * the keys (which will become the option values). If null or empty is passed, all active states will be used,
     * and $input_settings['value_field_name'] will again be used.     *
     * @param array $input_settings same as parent, but also {
     *   @type string $value_field_name the name of the field to use
     *   for the HTML option values, ie, `STA_ID`, `STA_abbrev`, or `STA_name`.
     * }
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function __construct($state_options, $input_settings = array())
    {
        if (isset($input_settings['value_field_name'])) {
            $this->valueFieldName = $input_settings['value_field_name'];
            if (! EEM_State::instance()->has_field((string) $this->valueFieldName())) {
                throw new InvalidArgumentException(
                    sprintf(
                        esc_html__('An invalid state field "%1$s" was specified for the state input\'s option values.', 'event_espresso'),
                        $this->valueFieldName()
                    )
                );
            }
        } else {
            $this->valueFieldName = 'STA_ID';
        }
        $state_options = apply_filters(
            'FHEE__EE_State_Select_Input____construct__state_options',
            $this->get_state_answer_options($state_options),
            $this
        );
        $input_settings['html_class'] = isset($input_settings['html_class'])
            ? $input_settings['html_class'] . ' ee-state-select-js'
            : 'ee-state-select-js';
        parent::__construct($state_options, $input_settings);
    }

    /**
     * Returns the name of the state field used for the HTML option values.
     * @since $VID:$
     * @return string
     */
    public function valueFieldName()
    {
        return $this->valueFieldName;
    }


    /**
     * get_state_answer_options
     *
     * @param array $state_options
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_state_answer_options($state_options = null)
    {
        // if passed something that is NOT an array
        if (! is_array($state_options) || empty($state_options)) {
            // get possibly cached list of states
            $states = EEM_State::instance()->get_all_active_states();
        }
        if (is_array($state_options) && reset($state_options) instanceof EE_State) {
            $states = $state_options;
            $state_options = array();
        }
        if (! empty($states)) {
            // set the default
            $state_options[''][''] = '';
            foreach ($states as $state) {
                if ($state instanceof EE_State) {
                    $state_options[ $state->country()->name() ][ $state->get($this->valueFieldName()) ] = $state->name();
                }
            }
        }
        return $state_options;
    }
}
