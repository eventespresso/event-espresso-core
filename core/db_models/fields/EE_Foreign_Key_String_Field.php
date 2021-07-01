<?php

class EE_Foreign_Key_String_Field extends EE_Foreign_Key_Field_Base
{
    /**
     * Whether the value should be converted to uppercase on insertion.
     *
     * @var boolean
     */
    protected $is_uppercase;


    /**
     * @param string          $table_column  name of column for field
     * @param string          $nicename      should be internationalized with __('blah','event_espresso')
     * @param boolean         $nullable
     * @param int|string      $default_value data type should match field type
     * @param string|string[] $model_name    eg 'Event','Answer','Term', etc.
     *                                       Basically its the model class's name without the "EEM_"
     * @param boolean         $is_uppercase  Whether the value should be converted to uppercase on insertion.
     */
    public function __construct($table_column, $nicename, $nullable, $default_value, $model_name, $is_uppercase = true)
    {
        $this->is_uppercase = $is_uppercase;
        parent::__construct($table_column, $nicename, $nullable, $default_value, $model_name);
    }

    /**
     * removes all tags when setting
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return string
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        if ($this->is_model_obj_of_type_pointed_to($value_inputted_for_field_on_model_object)) {
            $value_inputted_for_field_on_model_object = $value_inputted_for_field_on_model_object->ID();
        }
        $clean_value = wp_strip_all_tags($value_inputted_for_field_on_model_object);
        return $this->is_uppercase ? strtoupper($clean_value) : $clean_value;
    }
}
