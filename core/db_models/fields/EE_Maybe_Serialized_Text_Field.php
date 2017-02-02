<?php


/**
 * For a db text column, which can either be an array in PHP code or a string.
 */
require_once(EE_MODELS . 'fields/EE_Text_Field_Base.php');

class EE_Maybe_Serialized_Text_Field extends EE_Serialized_Text_Field
{
    /**
     * Value could be an array or a string. If its an array, serialize it. Otherwise, leave it as a string
     *
     * @param array|string $value_of_field_on_model_object
     * @return string (possibly serialized)
     */
    function prepare_for_use_in_db($value_of_field_on_model_object)
    {
        if (is_array($value_of_field_on_model_object)) {
            return parent::prepare_for_use_in_db($value_of_field_on_model_object);
        } else {
            return $value_of_field_on_model_object;
        }
    }

    /**
     * Formats the array (or string) according to $schema. Right now, just implode with commas
     *
     * @param type $value_on_field_to_be_outputted
     * @param type $schema
     * @return strubg
     */
    function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        $pretty_value = null;
        if (is_array($value_on_field_to_be_outputted)) {
            $pretty_value = parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema);
        } else {
            $pretty_value = $value_on_field_to_be_outputted;
        }
        return $pretty_value;
    }
}
