<?php
require_once( EE_MODELS . 'helpers/EE_Table_Base.php');
class EE_Secondary_Table extends EE_Table_Base{
	protected $_extra_join_conditions;
	
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
	 * @return EE_Primary_Table
	 */
	function get_table_to_join_with(){
		return $this->_table_to_join_with;
	}
	/**
	 * gets SQL like "LEFT JOIN table_name AS table_alias ON other_table_alias.pk = table_alias.fk
	 *
	 * @param string $table allows us to set special conditions on the $table_name portion of the join query (i.e. doing a subquery)
	 * @return string of SQL
	 */
	function get_join_sql( $table = NULL ){
		
		$table_name = empty($table) ? $this->get_table_name() : $table;
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

	
	/**
	 * Produces join SQL like get_join_sql, except instead of joining the primary table to the
	 * secondary table, joins the secondary table to the primary one. (Eg, isntead of 
	 * " LEFT JOIN secondary_table_table AS Secondary ON ..." like get_join_sql, this function returns
	 * " LEFT JOIN primary_table AS Primary ON ...". 
	 * This is useful if the secondary table is already included in the SQL, but the primary table is not yet.
	 * @return string
	 */
	function get_inverse_join_sql($table = NULL){
		$primary_table_name = empty($table) ? $this->get_table_to_join_with()->get_table_name() : $table;
		$primary_table_alias = $this->get_table_to_join_with()->get_table_alias();
		$table_alias = $this->get_table_alias();
		$primary_table_pk = $this->get_table_to_join_with()->get_pk_column();//$this->get_pk_column();
		$fk = $this->get_fk_on_table();
		$join_sql = " LEFT JOIN $primary_table_name AS $primary_table_alias ON $primary_table_alias.$primary_table_pk = $table_alias.$fk ";
		if($this->get_extra_join_conditions()){
			$join_sql.="AND ".$this->get_extra_join_conditions();
		}
		return $join_sql;
	}

	/**
	 * This prepares the join on the other table using a select with a internal limit.
	 * @param  mixed (array|string) $limit limit
	 * @return string             			SQL to return
	 */		
	public function get_select_join_limit_join($limit) {
		//first get the select
		$select = $this->get_select_join_limit($limit);
		$join_sql = $this->get_join_sql( $select );
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