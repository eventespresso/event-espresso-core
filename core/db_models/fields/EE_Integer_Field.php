<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_Integer_Field extends EE_Model_Field_Base
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
        $this->setSchemaType('integer');
    }


    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return intval($value_inputted_for_field_on_model_object);
    }

    public function prepare_for_set_from_db($value_inputted_for_field_on_model_object)
    {
        return intval($value_inputted_for_field_on_model_object);
    }
}
