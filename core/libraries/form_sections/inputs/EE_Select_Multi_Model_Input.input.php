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
 * EE_Select_Multi_Model_Input
 * Just like EE_Select_Multiple_Input, except the array of options is an array of
 * model objects, and the optional 'default' param CAN be an array of model objects too
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Select_Multi_Model_Input extends EE_Select_Multiple_Input{
	/**
	 * 
	 * @param EE_Base_Class[] $model_objects_to_select_from
	 * @param array $options_array {
	 *	@type $default EE_Base_Class[] or array
	 *	@type $field_for_name string the name of the field you would like to use for the displayed-name,
	 *		otherwise we'll just use the model obejct's name() method
	 *	@type $callback_on_class function name on the class which will be used for getting the displayed-name
	 * }
	 */
	public function __construct($model_objects_to_select_from, $options_array = array()) {
		//check if they have specified which field to use for the item's name
		
		//convert the model objects to select from into normal select options
		$select_options = array();
		foreach($model_objects_to_select_from as $model_obj){
			if(isset($options_array['field_for_name'])){
				$display_value =  $model_obj->get_pretty($options_array['field_for_name']);
			}elseif(isset($options_array['callback_on_class'])){
				$callback_on_class = $options_array['callback_on_class'];
				$display_value = call_user_func(array($model_obj,$callback_on_class));
			}else{
				$display_value = $model_obj->name();
			}
			$select_options[$model_obj->ID()] = $display_value;
		}
		parent::__construct($select_options, $options_array);
	}
	/**
	 * if they passed in an array of model objects for the default, convert it
	 * into the format EE_Select_Multiple expects
	 * @param EE_Base_Class[]|array $values
	 */
	public function set_default($values){
		$defaults_as_simple_ids = array();
		foreach($values as $key => $value){
			if($value instanceof EE_Base_Class){
				$defaults_as_simple_ids[] = $value->ID();
			}else{
				$defaults_as_simple_ids[] = $value;
			}
		}
		parent::set_default($defaults_as_simple_ids);
	}
}

// End of file EE_Select_Multi_Model_Input.input.php