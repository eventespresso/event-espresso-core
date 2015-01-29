<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Select_Multi_Model_Input
 * Just like EE_Select_Multiple_Input, except the array of options is an array of
 * model objects, and the optional 'default' param CAN be an array of model objects too
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Select_Multi_Model_Input extends EE_Select_Multiple_Input{


	protected $_naming_method;



	/**
	 *
	 * @param EE_Base_Class[] $answer_options
	 * @param array $input_settings {
	 *		@var EE_Base_Class[] or array $default
	 * 		@var string $naming_method function name on the class which will be used for getting the displayed-name.
	 *     example: 	if the class were an EE_Event, this could be slug(), description(), name() (default)
	 * }
	 */
	public function __construct( $answer_options = array(), $input_settings = array() ) {
		if( isset( $input_settings['naming_method'] )){
			$this->set_option_naming_method( $input_settings['naming_method'] );
		}
		parent::__construct( $answer_options, $input_settings );
	}

	/**
	 * Sets the method name which will be called when outputting the options list
	 * @param string $method
	 */
	public function set_option_naming_method($method){
		$this->_naming_method = $method;
	}



	/**
	 * You CAN pass an array of model objects instead of simple values for teh options
	 * @param EE_Base_Class[] $answer_options
	 * @return null|void
	 */
	public function set_select_options( $answer_options = array() ) {
		//convert the model objects to select from into normal select options
		$select_options = array();
		foreach( $answer_options as $model_obj ){
			if( $this->_naming_method ){
				$display_value = call_user_func( array( $model_obj, $this->_naming_method ));
			}else{
				$display_value = $model_obj->name();
			}
			$select_options[ $model_obj->ID() ] = $display_value;
		}
		parent::set_select_options($select_options);
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