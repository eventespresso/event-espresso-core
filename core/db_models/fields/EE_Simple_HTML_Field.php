<?php
require_once(EE_MODELS . 'fields/EE_Text_Field_Base.php');

/**
 * Only allows a select, small number of html tags:
 * a,abbr,acronym,b,blockquote,cite,code,del,em,i,q,strike,strong,ol,ul,li If you want more use EE_Post_Content_Field,
 * or if you want to allow ALL, use EE_Full_HTML_Field. If you want NONE, use EE_Plain_Text_Field.
 */
class EE_Simple_HTML_Field extends EE_Text_Field_Base
{
    /**
     * removes all tags when setting
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return string
     */
    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        $value_with_select_tags = wp_kses("$value_inputted_for_field_on_model_object", EEH_HTML::get_simple_tags());
        return parent::prepare_for_set($value_with_select_tags);
    }

}
