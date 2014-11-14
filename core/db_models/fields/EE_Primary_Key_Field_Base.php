<?php
abstract class EE_Primary_Key_Field_Base extends EE_Field_With_Model_Name{
	/**
	 * Overrides parent so it doesn't need to provide so many non-applicable fields
	 * @param string $table_column
	 * @param string $nicename
	 */
	public function __construct($table_column, $nicename,$default) {
		parent::__construct($table_column, $nicename, false, $default, null);
	}
	public function _construct_finalize_set_model_name($model_name){
		$this->_model_name = $model_name;
	}
}
