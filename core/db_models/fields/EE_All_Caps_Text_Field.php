<?php

/**
 * Text_Fields is a base class for any fields which are have text value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_All_Caps_Text_Field extends EE_Text_Field_Base
{
    /**
     * makes it all upper case, and key-like
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return string
     */
    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return strtoupper(sanitize_key($value_inputted_for_field_on_model_object));
    }
}