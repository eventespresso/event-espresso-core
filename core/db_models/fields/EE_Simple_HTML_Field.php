<?php

/**
 * Only allows a select, small number of html tags:
 * a,abbr,acronym,b,blockquote,cite,code,del,em,i,q,strike,strong,ol,ul,li If you want more use EE_Post_Content_Field,
 * or if you want to allow ALL, use EE_Full_HTML_Field. If you want NONE, use EE_Plain_Text_Field.
 */
class EE_Simple_HTML_Field extends EE_Text_Field_Base
{



    /**
     * removes all tags which a WP Post wouldn't allow in its content normally
     *
     * @param string $value
     * @return string
     */
    public function prepare_for_set($value)
    {
        return parent::prepare_for_set(wp_kses("$value", EEH_HTML::get_simple_tags()));
    }
}
