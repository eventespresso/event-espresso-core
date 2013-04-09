<?php

/*
 * Experimental new multi-table model. Especially handles joins when querying.
 */
define('SP',' ');
abstract class EEM_Experimental_Base{
	
	/**
	 * @var EE_Table[] $_tables  array of EE_Table objects for defining which tables comprise this model.
	 */
	var $_tables;
	
	
	
	/**
	 *
	 * @var EE_Exp_Model_Field_Base[] fieldson this model
	 */
	var $_fields;
	/**
	 *
	 * @var EE_Exp_Model_Relation[] array of different kidns of relations
	 */
	var $_related_models;
	
	function __construct(){
		foreach($this->_tables as $table_alias => $table_obj){
			$table_obj->_construct_finalize_with_alias($table_alias);
		}
		foreach($this->_fields as $field_name => $field_obj){
			$field_obj->_construct_finalize_name($field_name);
		}
	}
	
	function get_all($query_params = null){
		global $wpdb;
		$SQL ="SELECT * FROM ".$this->_construct_internal_join()."WHERE ID=1";
		echo "sql to run:$SQL";
		return $wpdb->get_results($SQL);
		
	}
	
	function get_related($relation_name, $query_params = null){
		//join
		global $wpdb;
		$SQL = "SELECT * FROM ".$this->_construct_internal_join().$this->_construct_join_with($relation_name)." WHERE ID=1";
		echo "get_related query:".$SQL;
		return $wpdb->get_results($SQL);
	}
	
	function _construct_internal_join(){
		$SQL = '';
		$first = true;
		foreach($this->_tables as $table){
			if( ! $first){
				$SQL .= " LEFT JOIN ".$table->get_table_name().SP.$table->get_table_alias() ." ON ". $table->get_join_column_on_prev_table() ."=". $table->get_join_column_on_next_table() .SP;
				if( $table->get_extra_join_conditions()){
					$SQL .= "AND ".$table->get_extra_join_conditions().SP;
				}
			}else{
				$SQL.= $table->get_table_name().SP.$table->get_table_alias().SP;
				$first = FALSE;
			}
		}
		return $SQL;
	}
	
	function _construct_join_with($relation_name){
		$relation_obj = $this->_related_models[$relation_name];
		if($relation_obj instanceof EE_Exp_Has_Many){
			$other_table_alias = $relation_obj->get_other_model_table_alias();
			$other_model_name = "EEM_".$relation_obj->get_model_name();
			$other_model = new $other_model_name;
			/* @var $other_model EEM_Experimental_Base */
			$other_table_name = $other_model->_tables[$other_table_alias]->get_table_name();
				$SQL = "LEFT JOIN ".$other_table_name.SP.$other_table_alias." ON ".$relation_obj->get_join_conditions();
			}
			return $SQL;
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
//concrete children of EEM_Experimental_Base
class EEM_Exp_Event extends EEM_Experimental_Base{
	function __construct(){
		$this->_tables = array(
		'Event' => new EE_Table('posts'),
		'Event_Meta' => new EE_Table('postmeta','ID','post_id',"Event.post_type = 'page'"));
		$this->_related_models = array(
			'Registrations'=>new EE_Exp_Has_Many('Exp_Registration', 'Event', 'ID', 'Registration', 'EVT_ID')
		);
		
		parent::__construct();
	}
}
class EEM_Exp_Registration extends EEM_Experimental_Base{
	function __construct(){
		$this->_tables = array(
			'Registration'=>new EE_Table('esp_registration')
		);
		$this->_related_models = array();
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
//model field classes
abstract class EE_Exp_Model_Field_Base{
	var $_table_alias;
	var $_table_column;
	var $_name;
	var $_nicename;
	var $_nullable;
	var $_default_value;
	var $_other_config;
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		$this->_table_alias = $table_alias;
		$this->_table_column = $table_column;
		$this->_nicename = $nicename;
		$this->_nullable = $nullable;
		$this->_default_value = $default_value;
	}
	function _construct_finalize_name($name){
		$this->_name = $name;
	}
	function get_table_alias(){
		return $this->_table_alias;
	}
	function get_table_column(){
		return $this->_table_column;
	}
	function get_name(){
		return $this->_name;
	}
	function get_nicename(){
		return $this->_nicename;
	}
	function get_nullable(){
		return $this->_nullable;
	}
	function get_default_value(){
		return $this->_default_value;
	}
	abstract function get_wpdb_data_type();
}
abstract class EE_Text_Field_Base extends EE_Exp_Model_Field_Base{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%s';
	}
}
abstract class EE_Integer_Field_Base extends EE_Exp_Model_Field_Base{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%d';
	}
}
class EE_HTML_Field extends EE_Text_Field_Base{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
}
class EE_Enum_Field extends EE_Text_Field_Base{
	var $_allowed_enum_values;
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value, $allowed_enum_values){
		$this->_allowed_enum_values = $allowed_enum_values;
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
}

class EE_Serialized_text_field extends EE_Text_Field_Base{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
//model relation classes

abstract class EE_Exp_Model_Relation{
	var $_model_name;
	function __construct($modelName){
		$this->_model_name = $modelName;
	}
	function get_model_name(){
		return $this->_model_name;
	}
}
class EE_Exp_Has_Many extends EE_Exp_Model_Relation{
	var $_this_model_table_alias;
	var $_this_model_table_pk;
	var $_other_model_table_alias;
	var $_other_model_table_fk;
	var $_extra_join_conditions;
	function __construct($model_name,$this_model_table_alias, $primary_key_on_this_model,$other_model_table_alias, $foreign_key_on_other_model,$extra_join_conditions = null){
		$this->_this_model_table_alias = $this_model_table_alias;
		$this->_this_model_table_pk = $primary_key_on_this_model;
		$this->_other_model_table_alias = $other_model_table_alias;
		$this->_other_model_table_fk = $foreign_key_on_other_model;
		$this->_extra_join_conditions = $extra_join_conditions;
		parent::__construct($model_name);
	}
	function get_this_model_table_alias(){
		return $this->_this_model_table_alias;
	}
	function get_this_model_table_pk(){
		return $this->_this_model_table_pk;
	}
	function get_other_model_table_alias(){
		return $this->_other_model_table_alias;
	}
	function get_other_model_table_fk(){
		return $this->_other_model_table_fk;
	}
	function get_extra_join_conditions(){
		return $this->_extra_join_conditions;
	}
	function get_this_model_qualified_join_column(){
		return $this->get_this_model_table_alias().".".$this->get_this_model_table_pk();
	}
	function get_other_model_qualified_join_column(){
		return $this->get_other_model_table_alias().".".$this->get_other_model_table_fk();
	}
	function get_join_conditions(){
		$join_conditions = $this->get_this_model_qualified_join_column()."=".$this->get_other_model_qualified_join_column();
		if( $this->get_extra_join_conditions()){
			$join_conditions .= "AND ".$this->get_extra_join_conditions();
		}
		return $join_conditions;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////
//model table classes
class EE_Table{
	var $_table_name;
	var $_join_column_on_prev_table;
	var $_join_column_on_this_table;
	var $_extra_join_conditions;
	
	function __construct($table_name, $join_table_on_prev_table = null, $join_table_on_this_table = null, $extra_join_conditions = null){
		global $wpdb;
		$this->_table_name = $wpdb->prefix . $table_name;

		$this->_join_column_on_prev_table = $join_table_on_prev_table;
		$this->_join_column_on_this_table = $join_table_on_this_table;
		$this->_extra_join_conditions = $extra_join_conditions;
	}
	
	function _construct_finalize_with_alias($table_alias){
		$this->_table_alias = $table_alias;
	}
	
	function get_table_name(){
		return $this->_table_name;
	}
	function get_table_alias(){
		if( ! $this->_table_alias){
			throw new EE_Error("You must call _construct_finalize_with_alias before using thie EE_Table. Did you forget to call parent::__construct at the end of your EEM_Experimental_Base child's __construct?");
		}
		return $this->_table_alias;
	}
	function get_join_column_on_prev_table(){
		return $this->_join_column_on_prev_table;
	}
	function get_join_column_on_next_table(){
		return $this->_join_column_on_this_table;
	}
	function get_extra_join_conditions(){
		return $this->_extra_join_conditions;
	}
}
