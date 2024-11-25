<?php

/**
 * Class EE_Text_Input_Display_Strategy
 * Display strategy that handles how to display form inputs that represent basic
 * "text" type inputs, including "password", "email" and any other inputs that
 * are essentially the same as "text", except they just have a different "type" attribute
 *
 * @package                 Event Espresso
 * @subpackage              core
 * @author                  Mike Nelson
 * @since                   4.6
 *
 */
class EE_Text_Input_Display_Strategy extends EE_Display_Strategy_Base
{
    /**
     * The html "type" attribute value. default is "text"
     *
     * @var string
     */
    protected string $_type;


    /**
     * @param string $type
     */
    public function __construct(string $type = 'text')
    {
        $this->_type = $type;
        parent::__construct();
    }


    /**
     * Gets the html "type" attribute's value
     *
     * @return string
     */
    public function get_type(): string
    {
        if (
            $this->_type === 'email'
            && ! apply_filters('FHEE__EE_Text_Input_Display_Strategy__use_html5_email', true)
        ) {
            return 'text';
        }
        return $this->_type;
    }


    /**
     * @return string of html to display the field
     * @throws EE_Error
     */
    public function display(): string
    {
        $type = $this->get_type();
        $name = $this->_input->html_name();
        $html_id = $this->_input->html_id();
        $class = $this->_input->required()
            ? $this->_input->required_css_class() . ' ' . $this->_input->html_class()
            : $this->_input->html_class();
        $labelledby = $this->_input->hasLabel()
            ? ' aria-labelledby="' . $this->_input->html_label_id() . '"'
            : '';
        // add html5 required
        $required = $this->_input->required() ? ' required' : '';
        $value = $this->_input->raw_value_in_form();
        $style = $this->_input->html_style();
        $style = $style ? " style=\"$style\"" : '';
        $attributes = $this->_input->other_html_attributes();
        $data_attributes = $this->dataAttributesString($this->_input->dataAttributes());
        return "
        <input type=\"$type\" name=\"$name\" id=\"$html_id\" class=\"$class\" value=\"$value\"$labelledby$attributes$data_attributes$style$required />";
    }
}
