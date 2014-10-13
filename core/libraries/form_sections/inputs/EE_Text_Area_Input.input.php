<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_Text_Area
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Text_Area_Input extends EE_Form_Input_Base{
	protected $_rows = 2;
	protected $_cols = 20;
	/**
	 * sets the rows property on this input
	 * @param int $rows
	 */
	public function set_rows( $rows ) {
		$this->_rows = $rows;
	}
	/**
	 * sets the cols html property on this input
	 * @param int $cols
	 */
	public function set_cols( $cols ) {
		$this->_cols = $cols;
	}
	/**
	 *
	 * @return int
	 */
	public function get_rows(){
		return $this->_rows;
	}
	/**
	 *
	 * @return int
	 */
	public function get_cols(){
		return $this->_cols;
	}
	public function __construct($options_array = array()) {
		$this->_set_display_strategy(new EE_Text_Area_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		parent::__construct($options_array);
	}
}

// End of file EE_Text_Area.input.php
