<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 *
 * Class EE_Default_Where_Conditions
  *
 * Strategy to be used for getting default where conditions for EEM_Base children.
 * Should be initialized and set on construction of model
 *
 * @package         Event Espresso
 * @subpackage    core/db_models
 * @author				Mike Nelson
 * @since		 	    4.6.0
 *
 */
class EE_Default_Where_Conditions{

	/**
	 * This const can be used in EE_Default_Where_Conditions values, and at the time of querying it will be
	 * replaced with the current user's ID (because we don't want to use the current user's ID at time of
	 * initializing the models because it's too early)
	 */
	const current_user_placeholder = '%$current_user_placeholder_should_be_replaced_automatically$%';

	/**
	 * This const can be used in EE_Default_Where_Conditions where parameters as the name
	 * of the user field. When we are actually generating the where conditions it will be
	 * replaced with the model's wp user fieldname
	 */
	const user_field_name_placeholder = '%$user_field_name_placeholder$%';

	/**
	 * Model for which this strategy find default where conditions
	 * @var EEM_Base
	 */
	protected $_model;

	/**
	 * Where conditions specified on construction
	 * @var array
	 */
	protected $_where_conditions_provided = array();

	/**
	 * Custom where conditions. Model relation chains will be automatically added
	 * onto any field names
	 * @param array $custom_where_conditions
	 */
	public function __construct( $custom_where_conditions = array() ) {
		$this->_where_conditions_provided = $custom_where_conditions;
	}



	/**
	 * finalizes construction of the strategy for use in getting default where conditions
	 * for querying of the model.
	 * @param EEM_Base $model
	 */
	function _finalize_construct(EEM_Base $model){
		$this->_model = $model;
	}



	/**
	 * Returns the where conditions explicitly passed in the constructor
	 * @return array
	 */
	function get_where_conditions_provided() {
		return $this->_where_conditions_provided;
	}



	/**
	 * Gets the where conditions to be added onto the query
	 * @param string $model_relation_chain
	 * @return array like what's expected in EEM_Base::get_all()'s $query_params[0]
	 */
	function get_default_where_conditions( $model_relation_chain = '' ){
		return $this->prepare_where_conditions_for_querying( array_merge( $this->_get_default_where_conditions(), $this->get_where_conditions_provided() ), $model_relation_chain );
	}



	/**
	 * Gets the default where conditions that are specific to this child of EE_Default_Where_Conditions.
	 * Adding model relation chains is handled by the public method get_default_where_conditions
	 * @return array
	 */
	protected function _get_default_where_conditions(){
		return array();
	}



	/**
	 * Takes the default query parameters, and traverses them, adding the model relation chain
	 * onto them (intelligently doesn't do that to logic query params like NOT, OR, and AND)
	 * @param array $where_conditions
	 * @param string $model_relation_chain
	 * @return array
	 * @throws \EE_Error
	 */
	public function prepare_where_conditions_for_querying( $where_conditions, $model_relation_chain ) {
		$where_conditions_with_model_relation_chain_prefixes = array();
		if ( ! is_array( $where_conditions ) ) {
			$where_conditions = array();
		}
		foreach ( $where_conditions as $key => $value ) {
			if (
				in_array( $key, array( 'OR', 'AND', 'NOT' ) )
				|| strpos( $key, 'OR*' ) !== false
				|| strpos( $key, 'AND*' ) !== false
				|| strpos( $key, 'NOT*' ) !== false
			) {
				$where_conditions_with_model_relation_chain_prefixes[ $key ] = $this->prepare_where_conditions_for_querying(
					$value,
					$model_relation_chain
				);
			} else {
				if (
					$model_relation_chain != ''
					&& $model_relation_chain[ strlen( $model_relation_chain ) - 1 ] != '.'
				) {
					$model_relation_chain = $model_relation_chain . ".";
				}
				//check for the current user id place holder, and if present change it
				if ( $value === self::current_user_placeholder ) {
					$value = get_current_user_id();
				}
				//check for user field placeholder
				if ( $key == self::user_field_name_placeholder ) {
					if ( ! $this->_model->wp_user_field_name() ) {
						throw new EE_Error(
							sprintf(
								__(
									'There is no foreign key to the WP_User model on model %s. Please either modify your default where conditions, add a _model_chain_to_wp_user onto the model, or a proper EE_WP_User_Field onto the model',
									'event_espresso'
								),
								$this->_model->get_this_model_name()
							)
						);
					}
					$key = $this->_model->wp_user_field_name();
				}
				$where_conditions_with_model_relation_chain_prefixes[ $model_relation_chain . $key ] = $value;
			}
		}
		return $where_conditions_with_model_relation_chain_prefixes;
	}
}
