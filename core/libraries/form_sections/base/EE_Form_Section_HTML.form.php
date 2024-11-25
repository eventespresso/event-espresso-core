<?php

/**
 * EE_Form_Section_HTML
 * HTML to be laid out like a proper subsection
 *
 * @package     Event Espresso
 * @subpackage  core/libraries/form_sections/base
 * @author      Mike Nelson
 */
class EE_Form_Section_HTML extends EE_Form_Section_Base
{
    protected string $_html = '';

    protected bool $add_wrapper = true;


    /**
     * @param string $html
     * @param array  $options_array
     */
    public function __construct($html = '', array $options_array = [])
    {
        $this->_html = $html;
        if (isset($options_array['add_wrapper'])) {
            $this->setAddWrapper($options_array['add_wrapper']);
            unset($options_array['add_wrapper']);
        }
        parent::__construct($options_array);
    }


    /**
     * Returns the HTML
     *
     * @return string
     */
    public function get_html()
    {
        return $this->_html;
    }


    public function addWrapper(): bool
    {
        return $this->add_wrapper;
    }


    public function setAddWrapper($add_wrapper): void
    {
        $this->add_wrapper = filter_var($add_wrapper, FILTER_VALIDATE_BOOLEAN);
    }


}

// End of file EE_Form_Section_HTML.form.php
