<?php

/*
 * Strategy to be used for getting default where conditions for EEM_Base children.
 * Should be initialized and set on construction of model
 */
class EE_Default_Where_Conditions{
	/**
	 * Model fo rwhich this strategy find default where conditions
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
		return $this->add_model_relation_chain_onto_where_conditions( array_merge( $this->_get_default_where_conditions(), $this->get_where_conditions_provided() ), $model_relation_chain );
	}
	/**
	 * Gets the default where conditions that are specific to this child of EE_Default_Where_Conditions.
	 * Adding model relaiton chains is handled by the public method get_default_where_conditions
	 * @return array
	 */
	protected function _get_default_where_conditions(){
		return array();
	}

	/**
	 * Takes the default query parameters, and traverses them, adding the model relation chain
	 * onto them (intelligently doesn't do taht to logic query params like NOT, OR, and AND)
	 * @param array $where_conditions
	 * @param string $model_relation_chain
	 * @return array
	 */
	public function add_model_relation_chain_onto_where_conditions( $where_conditions, $model_relation_chain ) {
		$where_conditions_with_model_relation_chain_prefixes = array();
		foreach( $where_conditions as $key => $value ) {
			if( in_array( $key, array( 'OR', 'AND', 'NOT' ) ) ||
			strpos( $key, 'OR*' )  !== false ||
					strpos( $key, 'AND*' ) !== false ||
					strpos( $key, 'NOT*' ) !== false ){
				$where_conditions_with_model_relation_chain_prefixes[ $key ] = $this->add_model_relation_chain_onto_where_conditions( $value, $model_relation_chain );
			}else{
				if($model_relation_chain != '' && $model_relation_chain[strlen($model_relation_chain)-1] !='.'){
					$model_relation_chain=$model_relation_chain.".";
				}
				$where_conditions_with_model_relation_chain_prefixes[ $model_relation_chain . $key ] = $value;
			}
		}
		return $where_conditions_with_model_relation_chain_prefixes;
	}
}
