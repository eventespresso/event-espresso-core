<?php

class EE_Primary_Key_String_Field extends EE_Primary_Key_Field_Base
{
    public function __construct($table_column, $nicename)
    {
        parent::__construct($table_column, $nicename, null);
    }


    /**
     * removes all tags when setting
     *
     * @param EE_Base_Class|string|null $value_inputted_for_field_on_model_object
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        if ($this->is_model_obj_of_type_pointed_to($value_inputted_for_field_on_model_object)) {
            $value_inputted_for_field_on_model_object = $value_inputted_for_field_on_model_object->ID();
        }
        return wp_strip_all_tags((string) $value_inputted_for_field_on_model_object);
    }
}
