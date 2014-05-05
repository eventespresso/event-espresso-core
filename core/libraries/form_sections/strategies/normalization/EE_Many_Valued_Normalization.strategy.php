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
 * EE_Many_Valued_Normalization
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Many_Valued_Normalization extends EE_Normalization_Strategy_Base{
	protected $_individual_item_normalization_strategy = array();
	/**
	 * 
	 * @param EE_Normalization_Strategy_Base $individual_item_normalization_strategy
	 */
	public function __construct($individual_item_normalization_strategy) {
		$this->_individual_item_normalization_strategy = $individual_item_normalization_strategy;
		parent::__construct();
	}
	/**
	 * Normalizes the input into an array, and normalizes each item according to its 
	 * individual item normalizaiton strategy
	 * @param type $value_to_normalize
	 * @return array
	 */
	public function normalize($value_to_normalize) {
		$items_to_normalize = array();
		if(is_array($value_to_normalize)){
			$items_to_normalize = $value_to_normalize;
		}elseif($value_to_normalize !== NULL){
			$items_to_normalize = array($value_to_normalize);
		}else{
			$items_to_normalize = array();
		}
		$normalized_array_value = array();
		foreach($items_to_normalize as $key => $individual_item){
			$normalized_array_value[$key] = $this->_individual_item_normalization_strategy->normalize($individual_item);
		}
		return $normalized_array_value;
	}
}



// End of file EE_Many_Valued_Normalization.strategy.php