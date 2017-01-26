<?php
require_once(EE_MODELS . 'fields/EE_Foreign_Key_Field_Base.php');

class EE_Foreign_Key_String_Field extends EE_Foreign_Key_Field_Base
{

    /**
     * removes all tags when setting
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return string
     */
    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        if ($this->is_model_obj_of_type_pointed_to($value_inputted_for_field_on_model_object)) {
            $value_inputted_for_field_on_model_object = $value_inputted_for_field_on_model_object->ID();
        }
        return strtoupper(wp_strip_all_tags($value_inputted_for_field_on_model_object));
    }
}