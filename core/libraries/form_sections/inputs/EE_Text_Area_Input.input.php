<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Text_Area
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * This input has a default validation strategy of plaintext (which can be removed after construction)
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



	/**
	 * @param array $options_array
	 */
	public function __construct($options_array = array()) {
		$this->_set_display_strategy(new EE_Text_Area_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		
		
		parent::__construct($options_array);
		
		//if the input hasn't specifically mentioned a more lenient validation strategy, 
		//apply plaintext validation strategy
		if( ! $this->has_validation_strategy( 
				array(
					'EE_Full_HTML_Validation_Strategy',
					'EE_Simple_HTML_Validation_Strategy'
				)
			)
		) {
			//by default we use the plaintext validation. If you want something else,
			//just remove it after the input is constructed :P using EE_Form_Input_Base::remove_validation_strategy()
			$this->_add_validation_strategy( new EE_Plaintext_Validation_Strategy() );
		}
	}
}

// End of file EE_Text_Area.input.php
