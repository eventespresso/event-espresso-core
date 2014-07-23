<?php

/**
 * Base class for defining the tables that comprise models. This is used to store information
 * about the table\s alias, private key, etc.
 */
abstract class EE_Table_Base{
	var $_table_name;
	var $_table_alias;
	/**
	 * Table's private key column
	 * @var string
	 */
	protected $_pk_column;
	
	function __construct($table_name, $pk_column){
		global $wpdb;
		$this->_table_name = $wpdb->prefix . $table_name;
		$this->_pk_column = $pk_column;
	}
	
	function _construct_finalize_with_alias($table_alias){
		$this->_table_alias = $table_alias;
	}
	
	function get_table_name(){
		return $this->_table_name;
	}
	function get_table_alias(){
		if( ! $this->_table_alias){
			throw new EE_Error("You must call _construct_finalize_with_alias before using the EE_Table_Base. Did you forget to call parent::__construct at the end of your EEMerimental_Base child's __construct?");
		}
		return $this->_table_alias;
	}
	
	/**
	 * 
	 * @return string name of column of PK
	 */
	function get_pk_column(){
		return $this->_pk_column;
	}
	
	
	
	/**
	 * returns a string with the table alias, a period, and the private key's column.
	 * @return string
	 */
	function get_fully_qualified_pk_column(){
		$sql =  $this->get_table_alias().".".$this->get_pk_column();
		return $sql;
	}


	/**
	 * returns the special sql for a inner select with a limit.
	 * @return string    SQL select
	 */
	public function get_select_join_limit( $limit ) {
		$limit = is_array( $limit ) ? 'LIMIT ' . implode(',', array_map( 'intval', $limit ) ) : 'LIMIT ' . (int) $limit;
		$SQL = SP . '(SELECT * FROM ' . $this->_table_name . SP . $limit . ') AS ' . $this->_table_alias;
		return $SQL;
	}
}
