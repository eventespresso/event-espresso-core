<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Text_Input
 *
 * Description
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Brent Christensen
 * @since                $VID:$
 *
 */
class EE_Text_Input extends EE_Form_Input_Base{


	/**
	 * @param array $options
	 */
	function __construct($options = array()){
		$this->_set_display_strategy(new EE_Text_Input_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		parent::__construct($options);
	}



}