<?php
/**
 * base class for all strategies which operate on form inputs. Generally, they
 * all need to know about the form input they are operating on.
 */
abstract class EE_Form_Input_Strategy_Base{
	/**
	 * Form Input to display
	 * @var EE_Form_Input_Base
	 */
	protected $_input;
	
	function __construct(){
		
	}

	/**
	 * The form input on which this strategy is to perform
	 * @param EE_Form_Input_Base $form_input
	 */
	function _construct_finalize(EE_Form_Input_Base $form_input){
		$this->_input = $form_input;
	}
	
	/**
	 * Gets this strategy's input
	 * @return EE_Form_Input_Base
	 */
	public function get_input() {
		return $this->_input;
	}
}