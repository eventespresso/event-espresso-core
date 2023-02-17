<?php

class EE_Plain_Text_Field extends EE_Text_Field_Base
{
    /**
     * removes all tags when setting
     *
     * @param string|null $value_inputted_for_field_on_model_object
     * @return string
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return wp_strip_all_tags((string) parent::prepare_for_set($value_inputted_for_field_on_model_object));
    }
}
