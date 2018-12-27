<?php
/**
 * EE_Button_Input
 * Similar to EE_Submit_Input, but renders a button element, and its text being displayed
 * can differ from the value, and it can contain HTML.
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 */
class EE_Button_Input extends EE_Form_Input_Base
{

    /**
     * @var string of HTML to put between the button tags
     */
    protected $_button_content;
    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        if (empty($options['button_content'])) {
            $options['button_content'] = esc_html__('Button', 'event_espresso');
        }
        $this->_set_display_strategy(new EE_Button_Display_Strategy());
        $this->_set_normalization_strategy(new EE_Text_Normalization());
        $this->_add_validation_strategy(new EE_Plaintext_Validation_Strategy());
        parent::__construct($options);
    }



    /**
     * Sets the button content
     * @see EE_Button_Input::$_button_content
     * @param string $new_content
     */
    public function set_button_content($new_content)
    {
        $this->_button_content = $new_content;
    }
    
    /**
     * Gets the button content
     * @return string
     */
    public function button_content()
    {
        return $this->_button_content;
    }
}
