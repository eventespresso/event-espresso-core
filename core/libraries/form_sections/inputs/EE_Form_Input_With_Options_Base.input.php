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
 * EE_Form_Input_With_Options_Base
 * For form inputs which are meant to only have a 
 * limit set of options that can be used (like for checkboxes or select dropdowns, etc; as opposed to more open-ended textboxes etc)
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Form_Input_With_Options_Base extends EE_Form_Input_Base{
	protected $_options = array();
	/**
	 * whether ot allow mutliple selections (ie, the value of this input should be an arrray)
	 * or not (ie, the value should be a simple int, string, etc)
	 * @var boolean
	 */
	protected $_multiple_selections = false;
	public function __construct($select_options = array(), $options_array = array()) {
		$this->set_select_options($select_options);
		parent::__construct($options_array);
	}
	/**
	 * Sets the allowed options for this input. Also has the side-effect of 
	 * updating the normalization strategy to match the keys provided in the array
	 * @param array $select_options
	 * @return null just has the side-effect of setting the options for this input
	 */
	public function set_select_options($select_options){
		$this->_options = $select_options;
		//get teh first item in teh select options. Depending on what it is, use a different normalization strategy
		if($select_options){
			$flat_select_options = $this->_flatten_select_options($select_options);
			$select_option_keys = array_keys($flat_select_options);
			$first_key = reset($select_option_keys);
			if(is_int($first_key)){
				$normalization = new EE_Int_Normalization();
			}elseif(is_string($first_key)){
				$normalization = new EE_Text_Normalization();
			}
			if($this->_multiple_selections){
				$this->_set_normalization_strategy(new EE_Many_Valued_Normalization($normalization));
			}else{
				$this->_set_normalization_strategy($normalization);
			}
			
		}
	}
	public function options(){
		return $this->_options;
	}
	/**
	 * Returns an array which is guaranteed to not be multidimensional
	 * @return array
	 */
	public function flat_options(){
		return $this->_flatten_select_options($this->options());
	}
	/**
	 * Makes sure $arr is a flat array, not a multidiemnsional one
	 * @param array $arr
	 * @return array
	 */
	protected function _flatten_select_options($arr){
		EE_Registry::instance()->load_helper('Array');
		if(EEH_Array::is_multi_dimensional_array($arr)){
			$flat_array = array();
			foreach($arr as $subarray){
				foreach($subarray as $key => $value){
					$flat_array[$key] = $value;
				}
			}
			return $flat_array;
		}else{
			return $arr;
		}
	}
}

// End of file EE_Form_Input_With_Options_Base.input.php