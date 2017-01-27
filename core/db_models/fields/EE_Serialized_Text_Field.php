<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Serialized text field should basically: accept either an array or serialized text as input.
 * When initally set by client code (ie, not EEM_Base or children), the value should remain an array.
 * However, when inserting into the DB, it should be serialized.
 * Upon retrieval from the DB, it should be unserialized back into an array.
 */
class EE_Serialized_Text_Field extends EE_Text_Field_Base
{

    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType(array('object','string'));
    }


    /**
     * Value SHOULD be an array, and we want to now convert it to a serialized string
     *
     * @param array $value_of_field_on_model_object
     * @return string
     */
    function prepare_for_use_in_db($value_of_field_on_model_object)
    {
        return maybe_serialize($value_of_field_on_model_object);
    }

    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        $value_inputted_for_field_on_model_object = EEH_Array::maybe_unserialize($value_inputted_for_field_on_model_object);
        if (is_string($value_inputted_for_field_on_model_object)) {
            return parent::prepare_for_set($value_inputted_for_field_on_model_object);
        } elseif (is_array($value_inputted_for_field_on_model_object)) {
            return array_map(array($this, 'prepare_for_set'), $value_inputted_for_field_on_model_object);
        } else {//so they passed NULL or an INT or something wack
            return $value_inputted_for_field_on_model_object;
        }
    }

    /**
     * Value provided should definetely be a serialized string. We should unserialize into an array
     *
     * @param string $value_found_in_db_for_model_object
     * @return array
     */
    function prepare_for_set_from_db($value_found_in_db_for_model_object)
    {
        return EEH_Array::maybe_unserialize($value_found_in_db_for_model_object);
    }

    /**
     * Gets a string representation of the array
     *
     * @param type   $value_on_field_to_be_outputted
     * @param string $schema , possible values are ',', others can be added
     * @return string
     */
    function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        switch ($schema) {
            case 'print_r':
                $pretty_value = print_r($value_on_field_to_be_outputted, true);
                break;
            case 'as_table':
                $pretty_value = EEH_Template::layout_array_as_table($value_on_field_to_be_outputted);
                break;
            default:
                $pretty_value = implode(", ", $value_on_field_to_be_outputted);
        }
        return $pretty_value;
    }
}
