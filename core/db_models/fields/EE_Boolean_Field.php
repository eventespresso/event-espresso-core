<?php

class EE_Boolean_Field extends EE_Integer_Field
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
        $this->setSchemaType('boolean');
    }

    /**
     * Double-checks the value being returned is an boolean.
     * @since 4.9.74.p
     * @param mixed $value_of_field_on_model_object
     * @return boolean
     */
    public function prepare_for_get($value_of_field_on_model_object)
    {
        return (bool) parent::prepare_for_get($value_of_field_on_model_object);
    }

    /**
     * @since 4.9.74.p
     * @param $value_inputted_for_field_on_model_object
     * @return boolean
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        if ($value_inputted_for_field_on_model_object) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Make sure we're returning booleans
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return boolean
     */
    public function prepare_for_set_from_db($value_inputted_for_field_on_model_object)
    {
        return intval($value_inputted_for_field_on_model_object) ? true : false;
    }

    /**
     * Gets a nice Yes/No value for this field
     *
     * @param boolean $value_on_field_to_be_outputted
     * @return string Yes or No
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted)
    {
        return apply_filters(
            'FHEE__EE_Boolean_Field__prepare_for_pretty_echoing__return',
            $value_on_field_to_be_outputted ? esc_html__('Yes', 'event_espresso') : esc_html__('No', 'event_espresso'),
            $value_on_field_to_be_outputted
        );
    }
}
