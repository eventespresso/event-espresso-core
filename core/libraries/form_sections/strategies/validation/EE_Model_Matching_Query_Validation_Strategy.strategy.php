<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Model_Matching_Query_Validation_Strategy
 *
 * Validates that the input is in the query parameters for the specified model.
 * For example, this can be used to verify input is the name of a real event
 * the current user has access to view
 *
 * @package			Event Espresso
 * @subpackage	Expression package is undefined on line 19, column 19 in Templates/Scripting/PHPClass.php.
 * @author				Mike Nelson
 */
class EE_Model_Matching_Query_Validation_Strategy extends EE_Validation_Strategy_Base{

	/**
	 *
	 * @var EEM_Base
	 */
	protected $_model;
	protected $_query_params;
	protected $_input_field_name;



	/**
	 * @param string $validation_error_message
	 * @param string $model_name  name of an EEM_Base model
	 * @param array  $query_params     @see EEM_Base::get_all()
	 * @param string $input_field_name the input will be treated as this field's value
	 * @throws \EE_Error
	 */
	public function __construct( $validation_error_message = NULL, $model_name = '', $query_params = array(), $input_field_name = '' ) {
		if( ! EE_Registry::instance()->is_model_name( $model_name ) ) {
			throw new EE_Error( sprintf( __( 'You must provide a valid model object ', 'event_espresso'), $model_name ) );
		}
		$this->_model = EE_Registry::instance()->load_model( $model_name );
		$this->_query_params = $query_params;
		if( empty( $input_field_name ) ) {
			$input_field_name = $this->_model->primary_key_name();
		}
		$this->_input_field_name = $input_field_name;
		parent::__construct( $validation_error_message );
	}



	/**
	 * @param $normalized_value
	 * @return bool|void
	 * @throws \EE_Error
	 * @throws \EE_Validation_Error
	 */
	public function validate($normalized_value) {
		if( empty( $normalized_value ) ) {
			return true;
		}
		$combined_query_params = $this->get_query_params();
		$combined_query_params[0][ $this->treat_input_as_field() ] = $normalized_value;
		if( ! $this->get_model()->exists( $combined_query_params ) ) {
			throw new EE_Validation_Error( $this->get_validation_error_message(), 'no_matching_model_object' );
		}
	}

	/**
	 * Gets the model used for querying
	 * @return EEM_Base
	 */
	public function get_model() {
		return $this->_model;
	}

	/**
	 * Returns query params used for model query
	 * @return array
	 */
	public function get_query_params() {
		return (array)$this->_query_params;
	}

	/**
	 * Gets the name of the field that will be used for lookup.
	 * eg it could be "EVT_name", meaning that if there is a model object in
	 * the database that has that event name, and matching the other query parameters
	 * on this strategy, the input will pass validation server-side
	 * @return string
	 */
	public function treat_input_as_field() {
		return $this->_input_field_name;
	}
}

// End of file EE_FUll_HTML_Validation_Strategy.strategy.php