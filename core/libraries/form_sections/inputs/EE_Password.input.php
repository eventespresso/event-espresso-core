<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Password
 *
 * @package 			Event Espresso
 * @subpackage    core
 * @author 				Mike Nelson
 * @since               	4.6
 *
 */
class EE_Password extends EE_Form_Input_Base{


	/**
	 * @param array $options
	 */
	function __construct($options = array()){
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy('password'));
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		parent::__construct($options);
	}



}