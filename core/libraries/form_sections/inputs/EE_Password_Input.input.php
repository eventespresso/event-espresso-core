<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Password_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Password_Input extends EE_Form_Input_Base{


	/**
	 * @param array $input_settings
	 */
	function __construct($input_settings = array()){
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy('password'));
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		parent::__construct($input_settings);
		$this->set_html_class( $this->html_class() . 'password' );
	}



}
