<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Select_Ajax_Model_Rest_Input
 * select input which uses ajax and the EE4 REST API to access the EE4 models
 * for options, and 
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Select_Ajax_Model_Rest_Input extends EE_Form_Input_With_Options_Base{

	/**
	 * @param array | EE_Question_Option[] $answer_options
	 * @param array $input_settings
	 */
	public function __construct( $input_settings = array() ) {
		//needed input settings:
		//model name
		//query params
		//treat_input_as_field
		//is_multi
		//select2_args
		if( isset( $input_settings[ 'multi' ] )
			&& $input_settings[ 'multi' ] === true ) {
			//todo
		} 
		$model_name = EEH_Array::is_set( 
			$input_settings,
			'model_name',
			null 
		);
		if( ! EE_Registry::instance()->is_model_name(  $model_name ) ) {
			throw new EE_Error( sprintf( __( '%1$s is not a proper model name. Please provide a model name in the "model_name" form input argument', 'event_espresso'), $model_name ) );
		}
		$query_params = EEH_Array::is_set( $input_settings, 'query_params', array() );
		$treat_input_as_field = EEH_Array::is_set( $input_settings, 'treat_input_as_field', '' );
		$this->_add_validation_strategy( new EE_Model_Matching_Query_Validation_Strategy( 
				'',
				$model_name,
				$query_params,
				$treat_input_as_field
			)
		);
		//get resouce endpoint
		$rest_controller = new EventEspresso\core\libraries\rest_api\controllers\model\Read();
		$rest_controller->set_requested_version( EED_Core_Rest_Api::latest_rest_api_version() );
		$url = $rest_controller->get_versioned_link_to( EEH_Inflector::pluralize_and_lower( $model_name ) );
		$default_select2_args = array(
			'ajax' => array( 
				'url' => $url,
				'dataType' => 'json',
				'delay' => '250',
				'data' => 'ee_default_data_from_ee4_rest_api',
				'processResults' => 'ee_default_process_results_for_ee4_rest_api',
				'cache' => true
			)
		);
		$this->set_display_strategy( new EE_Select2_Display_Strategy( $default_select2_args ) );
		parent::__construct( array(), $input_settings );
	}

}

// End of file EE_HABTM_Input.input.php