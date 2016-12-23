<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_Integer_Field extends EE_Model_Field_Base
{
    function get_wpdb_data_type()
    {
        return '%d';
    }

    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return intval($value_inputted_for_field_on_model_object);
    }

    function prepare_for_set_from_db($value_inputted_for_field_on_model_object)
    {
        return intval($value_inputted_for_field_on_model_object);
    }

    /**
     * This returns any elements used to represent this field in the json schema.
     * Note: It is expected this will only return field specific elements such as "type" or "format".  Other details
     * will have to be inferred from the other data injected into the object on construct (title, description etc).
     *
     * @link http://json-schema.org/
     * @return array
     */
    public function get_schema()
    {
        return array(
            'description' => $this->get_nicename(),
            'type' => 'integer',
        );
    }
}
