<?php
require_once('helpers/EE_Table_Base.php');
class EE_Secondary_Table extends EE_Table_Base{
	protected $_fk_on_table;
	protected $_extra_join_conditions;
	/**
	 * 
	 * @var EE_Main_Table 
	 */
	protected $_table_to_join_with;
	function __construct($table_name, $pk_column,  $fk_column = null, $extra_join_conditions = null){
		$this->_fk_on_table = $fk_column;
		$this->_extra_join_conditions = $extra_join_conditions;
		parent::__construct($table_name, $pk_column);
	}
	function get_fk_on_table(){
		return $this->_fk_on_table;
	}
	function _construct_finalize_set_table_to_join_with(EE_Table_Base $table){
		$this->_table_to_join_with = $table;
	}
	/**
	 * 
	 * @return string of sql like "Event.post_type = 'event'", which gets added to
	 * the end of the join statement with the primary table
	 */
	function get_extra_join_conditions(){
		return $this->_extra_join_conditions;
	}
	/**
	 * 
	 * @return EE_Main_Table
	 */
	function get_table_to_join_with(){
		return $this->_table_to_join_with;
	}
	/**
	 * gets SQL like "LEFT JOIN table_name AS table_alias ON other_table_alias.pk = table_alias.fk
	 * @return string of SQL
	 */
	function get_join_sql(){
		
		$table_name = $this->get_table_name();
		$table_alias = $this->get_table_alias();
		$other_table_alias = $this->get_table_to_join_with()->get_table_alias();
		$other_table_pk = $this->get_table_to_join_with()->get_pk_column();
		$fk = $this->get_fk_on_table();
		$join_sql = " LEFT JOIN $table_name AS $table_alias ON $other_table_alias.$other_table_pk = $table_alias.$fk ";
		if($this->get_extra_join_conditions()){
			$join_sql.="AND ".$this->get_extra_join_conditions();
		}
		return $join_sql;
	}

	function get_fully_qualified_fk_column() {
		$table_alias = $this->get_table_alias();
		$fk = $this->get_fk_on_table();
		return $table_alias . '.' . $fk;
	}

	function get_fully_qualified_pk_on_fk_table() {
		$table_alias = $this->get_table_to_join_with()->get_table_alias();
		$pk = $this->get_table_to_join_with()->get_pk_column();
		return $table_alias . '.' . $pk;
	}
}