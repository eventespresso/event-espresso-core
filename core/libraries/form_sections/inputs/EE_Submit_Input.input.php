<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Submit_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * This input has a default validation strategy of plaintext (which can be removed after construction)
 */
class EE_Submit_Input extends EE_Form_Input_Base{

	/**
	 * @param array $options
	 */
	public function __construct($options = array()){
        $options['html_label_text'] = ! empty($options['html_label_text'])
            ? $options['html_label_text']
            : $options['default'];
		$this->_set_display_strategy(new EE_Submit_Input_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		$this->_add_validation_strategy( new EE_Plaintext_Validation_Strategy() );
		parent::__construct($options);
	}



    /**
     * Sets the default as normal (overriden so it can circumvent calling
     * EE_Submit_Input::_normalize() and EE_Submit_Input::_set_raw_value())
     * @param mixed $value
     */
	public function set_default($value)
    {
        parent::_set_normalized_value($value);
        parent::_set_raw_value($value);
    }



    /**
     * Does nothing, because it's actually not expected for submit input's values to change.
     * If you want to change the input's value displayed, use `set_default()`
     * @param array $req_data
     * @return void
     */
    public function _normalize($req_data)
    {
        return;
    }

    /**
     * Does nothing, because it's actually not expected for submit input's values to change.
     * If you want to change the input's value displayed, use `set_default()`
     */
    public function _set_raw_value($value)
    {
        return;
    }
}
