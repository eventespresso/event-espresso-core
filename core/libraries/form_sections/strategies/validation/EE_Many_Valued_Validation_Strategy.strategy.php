<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Many_Valued_Validation_Strategy
 *
 * For validation on an input which has an ARRAY of values, instead of a single value. The
 * individual item validation strategies will be applied to EACH item in the array
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Many_Valued_Validation_Strategy extends EE_Validation_Strategy_Base{
	protected $_individual_item_validation_strategies = array();
	/**
	 *
	 * @param EE_Validation_Strategy_Base[] $individual_item_validation_strategies (or a single EE_Validation_Strategy_Base)
	 */
	public function __construct($individual_item_validation_strategies) {
		if( ! is_array($individual_item_validation_strategies)){
			$individual_item_validation_strategies = array($individual_item_validation_strategies);
		}
		$this->_individual_item_validation_strategies = $individual_item_validation_strategies;
		parent::__construct();
	}
	/**
	 * Applies all teh individual item validation strategies on each item in the array
	 * @param array $normalized_value
	 * @return boolean
	 */
	function validate($normalized_value) {
		if( is_array($normalized_value)){
			$items_to_validate = $normalized_value;
		}else{
			$items_to_validate = array($normalized_value);
		}
		foreach($items_to_validate as $individual_item){
			foreach($this->_individual_item_validation_strategies as $validation_strategy){
				if ( $validation_strategy instanceof EE_Validation_Strategy_Base ) {
					$validation_strategy->validate($individual_item);
				}
			}
		}
	}
	/**
	 * Extends parent's _construct_finalize so we ALSO set the input
	 * on each sub-validation-strategy
	 * @param \EE_Form_Input_Base $form_input
	 */
	function _construct_finalize(\EE_Form_Input_Base $form_input) {
		parent::_construct_finalize($form_input);
		foreach($this->_individual_item_validation_strategies as $item_validation_strategy){
			if ( $item_validation_strategy instanceof EE_Validation_Strategy_Base ) {
				$item_validation_strategy->_construct_finalize($form_input);
			}
		}
	}

}
