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
	 * finalizes construction of the strategy for use in getting default where conditions
	 * for querying of the model.
	 * @param EEM_Base $model
	 */
	function _finalize_construct(EEM_Base $model){
		$this->_model = $model;
	}
	function get_default_where_conditions(){
		return array();
	}
}
