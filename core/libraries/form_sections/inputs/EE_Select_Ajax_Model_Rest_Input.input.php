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
		//search_field
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
		} else {
			$model = EE_Registry::instance()->load_model( $model_name );
		}
		$query_params = EEH_Array::is_set( $input_settings, 'query_params', array( 'limit' => 10 ) );
		$treat_input_as_field = EEH_Array::is_set( $input_settings, 'treat_input_as_field', $model->primary_key_name() );
		$search_field = EEH_Array::is_set( $input_settings, 'search_field', $model->get_a_field_of_type( 'EE_Text_Field_Base' )->get_name() );
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
				'data_interface' => 'EE_Select2_REST_API_Interface',
				'data_interface_args' => array(
					'default_query_params' => (object)$query_params,
					'search_field' => $search_field,
					'value_field' => $treat_input_as_field,
					'nonce' => wp_create_nonce( 'wp_rest' )
				),
			),
			'cache' => true,
			'width' => '100',
		);
		$this->set_display_strategy( new EE_Select2_Display_Strategy( $default_select2_args ) );
		parent::__construct( array(), $input_settings );
	}

}

// End of file EE_HABTM_Input.input.php