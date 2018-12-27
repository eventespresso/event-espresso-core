<?php

/**
 * EE_Form_Section_HTML_From_Template
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Form_Section_HTML_From_Template extends EE_Form_Section_HTML
{
    public function __construct($template_file, $args = array(), $options_array = array())
    {
        $html = EEH_Template::locate_template($template_file, $args);

//      echo " filepath:$template_file html $html";
        parent::__construct($html, $options_array);
    }
}
