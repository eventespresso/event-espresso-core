<?php
use EventEspresso\core\libraries\rest_api\Model_Data_Translator;

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
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
	 * @var string $_model_name
	 */
	protected $_model_name;

	/**
	 * @var string $_display_field_name
	 */
	protected $_display_field_name;

	/**
	 * @var string $_value_field_name
	 */
	protected $_value_field_name;

	/**
	 * @var array $_extra_select_columns
	 */
	protected $_extra_select_columns = array();



	/**
	 * @param array $input_settings     {
	 * @type string $model_name         the name of model to be used for searching, both via the REST API and server-side model queries
	 * @type array  $query_params       default query parameters which will apply to both REST API queries and server-side queries. This should be
	 *									in the exact format that will be used for server-side model usage (eg use index 0 for where conditions, not
	 *									the string "where")
	 * @type string $value_field_name   the name of the model field on this model to
	 *                                  be used for the HTML select's option's values
	 * @type string $display_field_name the name of the model field on this model
	 *                                  to be used for the HTML select's option's display text
	 * @type array  $select2_args       arguments to be passed directly into the select2's JS constructor
	 *                                  }
	 *                                  And the arguments accepted by EE_Form_Input_With_Options_Base
	 * @throws \EE_Error
	 */
	public function __construct( $input_settings = array() ) {
		//needed input settings:
		//select2_args
		$this->_model_name = EEH_Array::is_set(
			$input_settings,
			'model_name',
			null
		);
		$model = $this->_get_model();
		$query_params = EEH_Array::is_set(
			$input_settings,
			'query_params',
			array()
		);
		// make sure limit and caps are always set
		$query_params = array_merge(
			array( 'limit' => 10, 'caps' => EEM_Base::caps_read_admin ),
			$query_params
		);
		$this->_value_field_name = EEH_Array::is_set(
			$input_settings,
			'value_field_name',
			$model->primary_key_name()
		);
		$this->_display_field_name = EEH_Array::is_set(
			$input_settings,
			'display_field_name',
			$model->get_a_field_of_type( 'EE_Text_Field_Base' )->get_name()
		);
		$this->_extra_select_columns = EEH_Array::is_set(
			$input_settings,
			'extra_select_columns',
			array()
		);
		$this->_add_validation_strategy(
			new EE_Model_Matching_Query_Validation_Strategy(
				'',
				$this->_model_name,
				$query_params,
				$this->_value_field_name
			)
		);
		//get resource endpoint
		$rest_controller = new EventEspresso\core\libraries\rest_api\controllers\model\Read();
		$rest_controller->set_requested_version( EED_Core_Rest_Api::latest_rest_api_version() );
		$default_select2_args = array(
			'ajax' => array(
				'url' => $rest_controller->get_versioned_link_to(
					EEH_Inflector::pluralize_and_lower( $this->_model_name )
				),
				'dataType' => 'json',
				'delay' => '250',
				'data_interface' => 'EE_Select2_REST_API_Interface',
				'data_interface_args' => array(
					'default_query_params' => (object)Model_Data_Translator::prepare_query_params_for_rest_api(
						$query_params,
						$model
					),
					'display_field' => $this->_display_field_name,
					'value_field' => $this->_value_field_name,
					'nonce' => wp_create_nonce( 'wp_rest' ),
					'locale' => str_replace( '_', '-', strtolower( get_locale() ) )
				),
			),
			'cache' => true,
			'width' => '100'
		);
		$select2_args = array_replace_recursive(
			$default_select2_args,
			(array)EEH_Array::is_set( $input_settings, 'select2_args', array() )
		);
		$this->set_display_strategy( new EE_Select2_Display_Strategy( $select2_args ) );
		parent::__construct( array(), $input_settings );
	}



	/**
	 * Before setting the raw value (usually because we're setting the default,
	 * or we've received a form submission and this might be re-displayed to the user),
	 * sets the options so that the current selections appear on initial display.
	 *
	 * Note: because this input uses EE_Model_Matching_Query_Validation_Strategy
	 * for validation, this input's options only affect DISPLAY and NOT validation,
	 * which is why its ok to just assume the provided $value to be in the list of acceptable values
	 *
	 * @param mixed $value
	 * @return void
	 * @throws \EE_Error
	 */
	public function _set_raw_value( $value ) {
		$values_for_options = (array)$value;
		$value_field = $this->_get_model()->field_settings_for( $this->_value_field_name );
		$display_field = $this->_get_model()->field_settings_for( $this->_display_field_name );
		$this->_extra_select_columns[] = $value_field->get_qualified_column() . ' AS ' . $this->_value_field_name;
		$this->_extra_select_columns[] = $display_field->get_qualified_column() . ' AS ' . $this->_display_field_name;
		$display_values = $this->_get_model()->get_all_wpdb_results(
			array(
				array(
					$this->_value_field_name => array( 'IN', $values_for_options )
				)
			),
			ARRAY_A,
			implode( ',', $this->_extra_select_columns )
		);
		$select_options = array();
		if( is_array( $select_options ) ) {
			foreach( $display_values as $db_rows ) {
				$db_rows = (array)$db_rows;
				$select_options[ $db_rows[ $this->_value_field_name ] ] = apply_filters(
					'FHEE__EE_Select_Ajax_Model_Rest_Input___set_raw_value__select_option_value',
					$db_rows[ $this->_display_field_name ],
					$db_rows
				);
			}
		}
		$this->set_select_options( $select_options );
		parent::_set_raw_value( $value );
	}

	/**
	 * Returns the model, or throws an exception if the model name provided in constructor doesn't exist
	 * @return EEM_Base
	 * @throws EE_Error
	 */
	protected function _get_model() {
		if( ! EE_Registry::instance()->is_model_name(  $this->_model_name ) ) {
			throw new EE_Error(
				sprintf(
					__(
						'%1$s is not a proper model name. Please provide a model name in the "model_name" form input argument',
						'event_espresso'
					),
					$this->_model_name
				)
			);
		} else {
			return EE_Registry::instance()->load_model( $this->_model_name );
		}
	}

}

// End of file EE_Select_Ajax_Model_Rest_Input.input.php