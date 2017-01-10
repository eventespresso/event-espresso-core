<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Class EE_Enum_Integer_Field
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Mike Nelson
 */
class EE_Enum_Integer_Field extends EE_Integer_Field
{
    /**
     * @var array $_allowed_enum_values
     */
    public $_allowed_enum_values;


    /**
     * @param string  $table_column
     * @param string  $nicename
     * @param boolean $nullable
     * @param int     $default_value
     * @param array   $allowed_enum_values keys are values to be used in the DB, values are how they should be displayed
     */
    public function __construct($table_column, $nicename, $nullable, $default_value, $allowed_enum_values)
    {
        $this->_allowed_enum_values = $allowed_enum_values;
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType('object');
    }

    /**
     * Returns the list of allowed enum options, but filterable.
     * This is used internally
     *
     * @return array
     */
    protected function _allowed_enum_values()
    {
        return (array)apply_filters(
            'FHEE__EE_Enum_Integer_Field___allowed_enum_options',
            $this->_allowed_enum_values,
            $this
        );
    }

    /**
     * When setting, just verify that the value being used matches what we've defined as allowable enum values.
     * If not, throw an error (but if WP_DEBUG is false, just set the value to default)
     *
     * @param int $value_inputted_for_field_on_model_object
     * @return int
     * @throws EE_Error
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        $allowed_enum_values = $this->_allowed_enum_values();
        if (
            $value_inputted_for_field_on_model_object !== null
            && ! array_key_exists($value_inputted_for_field_on_model_object, $allowed_enum_values)
        ) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                $msg = sprintf(
                    __('System is assigning incompatible value "%1$s" to field "%2$s"', 'event_espresso'),
                    $value_inputted_for_field_on_model_object,
                    $this->_name
                );
                $msg2 = sprintf(
                    __('Allowed values for "%1$s" are "%2$s". You provided "%3$s"', 'event_espresso'),
                    $this->_name,
                    implode(', ', array_keys($allowed_enum_values)),
                    $value_inputted_for_field_on_model_object
                );
                EE_Error::add_error("{$msg}||{$msg2}", __FILE__, __FUNCTION__, __LINE__);
            }
            return $this->get_default_value();
        }
        return (int)$value_inputted_for_field_on_model_object;
    }



    /**
     * Gets the pretty version of the enum's value.
     *
     * @param int | string $value_on_field_to_be_outputted
     * @param null         $schema
     * @return string
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        $options = $this->_allowed_enum_values();
        if (isset($options[$value_on_field_to_be_outputted])) {
            return $options[$value_on_field_to_be_outputted];
        } else {
            return $value_on_field_to_be_outputted;
        }
    }


    public function getSchemaProperties()
    {
        return array(
            'raw' => array(
                'description' =>  sprintf(
                    __('%s - the value in the database.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'enum' => array_keys($this->_allowed_enum_values()),
                'type' => 'integer'
            ),
            'pretty' => array(
                'description' =>  sprintf(
                    __('%s - the value for display.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'enum' => array_values($this->_allowed_enum_values()),
                'type' => 'string',
                'read_only' => true
            )
        );
    }
}
