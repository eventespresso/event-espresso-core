<?php
/**
 * For defining the "secondary" table for models. Secondary tables are an extra
 * table that has a one-to-one relationship between this table's rows and the primary
 * table's rows. Ie, it can't have many rows in the secondary table that point to
 * a single row in the primary table
 */
require_once( EE_MODELS . 'helpers/EE_Table_Base.php');
class EE_Secondary_Table extends EE_Table_Base{
	protected $_extra_join_conditions;

	/**
	 *
	 * @global type $wpdb
	 * @param string $table_name with or without wpdb prefix
	 * @param string $pk_column name of primary key column on THIS table
	 * @param string $fk_column the name of the COLUMN that is a foreign key to the primary table's primary key
	 * @param string $extra_join_conditions string for additional SQL to add onto the join statement's ON condition
	 * @param boolean $global whether the table is "global" as in there is only 1 table on an entire multisite install,
	 *					or whether each site on a multisite install has a copy of this table
	 */
	function __construct($table_name, $pk_column,  $fk_column = null, $extra_join_conditions = null, $global = false ){
		$this->_fk_on_table = $fk_column;
		$this->_extra_join_conditions = $extra_join_conditions;
		parent::__construct( $table_name, $pk_column, $global );
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
	 * creates join statement FROM primary table
	 * gets SQL like "LEFT JOIN table_name AS table_alias ON other_table_alias.pk = table_alias.fk
	 *
	 * @param string $table allows us to set special conditions on the $table_name portion of the join query (i.e. doing a subquery)
	 * @return string of SQL
	 */
	function get_join_sql( $primary_table_alias_with_model_chain_prefix  ){

		$table_name = $this->get_table_name();
		$secondary_table_alias = EE_Model_Parser::get_prefix_from_table_alias_with_model_relation_chain_prefix($primary_table_alias_with_model_chain_prefix) . $this->get_table_alias();
		$other_table_pk = $this->get_table_to_join_with()->get_pk_column();
		$fk = $this->get_fk_on_table();
		$join_sql = " LEFT JOIN $table_name AS $secondary_table_alias ON $primary_table_alias_with_model_chain_prefix.$other_table_pk = $secondary_table_alias.$fk ";
		if($this->get_extra_join_conditions()){
			$join_sql.="AND ".$this->get_extra_join_conditions();
		}
		return $join_sql;
	}


	/**
	 * Produces join SQL like get_join_sql, except instead of joining the primary table to the
	 * secondary table, does the inverse: joins the secondary table to the primary one. (Eg, isntead of
	 * " LEFT JOIN secondary_table_table AS Secondary ON ..." like get_join_sql, this function returns
	 * " LEFT JOIN primary_table AS Primary ON ...".
	 * This is useful if the secondary table is already included in the SQL, but the primary table is not yet.
	 * @return string
	 */
	function get_inverse_join_sql($secondary_table_alias_with_model_chain_prefix){
		$primary_table_name =$this->get_table_to_join_with()->get_table_name();
		$primary_table_alias = EE_Model_Parser::get_prefix_from_table_alias_with_model_relation_chain_prefix($secondary_table_alias_with_model_chain_prefix) . $this->get_table_to_join_with()->get_table_alias();
		$primary_table_pk = $this->get_table_to_join_with()->get_pk_column();//$this->get_pk_column();
		$fk = $this->get_fk_on_table();
		$join_sql = " LEFT JOIN $primary_table_name AS $primary_table_alias ON $primary_table_alias.$primary_table_pk = $secondary_table_alias_with_model_chain_prefix.$fk ";
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