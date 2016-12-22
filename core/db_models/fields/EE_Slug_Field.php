<?php
require_once(EE_MODELS . 'fields/EE_Text_Field_Base.php');

class EE_Slug_Field extends EE_Text_Field_Base
{
    /**
     * ensures string is usable in URLs
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return string
     */
    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        //reminder: function prepares for use in URLs, not making human-readable.
        return sanitize_title($value_inputted_for_field_on_model_object);
    }
}