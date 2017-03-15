<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access.');

class EEH_Parse_Shortcodes_Mock extends EEH_Parse_Shortcodes
{
    public function is_conditional_shortcode($shortcode)
    {
        return $this->_is_conditional_shortcode($shortcode);
    }
}