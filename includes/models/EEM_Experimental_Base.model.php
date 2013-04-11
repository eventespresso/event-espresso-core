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
	var $_model_relations;
	
	/**
	 *	List of valid operators that can be used for querying.
	 * The keys are all operators we'll accept, the values are the real SQL
	 * operators used
	 * @var array 
	 */
	protected $_valid_operators = array(
		'='=>'=',
		'<='=>'<=',
		'<'=>'<',
		'>='=>'>=',
		'>'=>'>',
		'LIKE'=>'LIKE',
		'like'=>'LIKE',
		'NOT_LIKE'=>'NOT LIKE',
		'not_like'=>'NOT LIKE',
		'NOT LIKE'=>'NOT LIKE',
		'not like'=>'NOT LIKE',
		'IN'=>'IN',
		'in'=>'IN',
		'NOT_IN'=>'NOT IN',
		'not_in'=>'NOT IN',
		'NOT IN'=>'NOT IN',
		'not in'=>'NOT IN');
	/**
	 * operators that work like 'IN', accepting a comma-seperated list of values inside brackets. Eg '(1,2,3)'
	 * @var string 
	 */
	protected $_in_style_operators = array('IN','NOT_IN');
	
	function __construct(){
		foreach($this->_tables as $table_alias => $table_obj){
			$table_obj->_construct_finalize_with_alias($table_alias);
		}
		foreach($this->_fields as $field_name => $field_obj){
			$field_obj->_construct_finalize_name($field_name);
		}
		foreach($this->_model_relations as $model_name => $relation_obj){
			$relation_obj->_construct_finalize_set_models($this->get_this_model_name(), $model_name);
		}
	}
	
	function get_all($query_params = array()){
		global $wpdb;
		
		if(array_key_exists('where',$query_params)){
			$join_sql_and_data_types = $this->_extract_related_models_from_query($query_params['where']);
			$extra_joins = $join_sql_and_data_types->get_join_sql();
			$where_clause = $this->_construct_where_clause($query_params['where'], $join_sql_and_data_types->get_data_types());
		}else{
			$where_clause = '';
			$extra_joins = '';
		}
		
		$SQL ="SELECT * FROM ".$this->_construct_internal_join().$extra_joins." WHERE $where_clause";
		echo "sql to run:$SQL";
		return $wpdb->get_results($SQL);
		
	}
	
	/**
	 * 
	 * @global type $wpdb
	 * @param mixed $id_or_obj EE_Base_Class child or its ID
	 * @param string $model_name like 'Event', 'Registration', etc. always singular
	 * @param array $query_params like EEM_Experimental_Base::get_all
	 * @return EE_Base_Class
	 */
	function get_related($id_or_obj, $model_name, $query_params = null){
		//get that related model
		$related_model = $this->get_related_model_obj($model_name);
		//we're just going to use teh query params on the related model's normal get_all query,
		//except add a condition to say to match the curren't mod
		
		$query_params['where']['Event.EVT_ID']=$id_or_obj;
		return $related_model->get_all($query_params);
	}
	
	/**
	 * Gets the model's name as it's expected in queries. For example, if this is EEM_Exp_Event model, that would be Event
	 * @return string
	 */
	function get_this_model_name(){
		return str_replace("EEM_Exp_","",get_class($this));
	}
	
	/**
	 * Recurses through all the where parameters, and finds all the related models we'll need
	 * to complete this query. Eg, given where parameters like array('EVT_ID'=>3) from within Event model, we won't need any
	 * related models. But if the array were array('Registrations.REG_ID'=>3), we'd need the related Registration model.
	 * If it were array('Registrations.Transactions.Payments.PAY_ID'=>3), then we'd need the related Registration, Tranaction, and Payment models.
	 * @param array $where_paramslike EEM_Experimental_Base::get_all's $query_parameters['where']
	 * @return EEM_Exp_Related_Model_Info_Carrier
	 */
	function _extract_related_models_from_query($where_params){
		$join_sql_and_data_types = new EEM_Exp_Related_Model_Info_Carrier();
		if(!empty($where_params)){
			foreach(array_keys($where_params) as $param){
				//$param could be simply 'EVT_ID', or it could be 'Registrations.REG_ID__<', or even 'Registrations.Transactions.Payments.PAY_amount__LIKE'
				$this->_extract_related_model_info_from_query_param( $param, $join_sql_and_data_types);
			}
		}
		return $join_sql_and_data_types;
	}
	
	/**
	 * Given a $query_param like 'Registration.Transaction.TXN_ID', pops off 'Registration.',
	 * gets the join statement for it; gets the data types for it; and passes the remaining 'Transaction.TXN_ID'
	 * onto its related Transaction object to do the same. Returns an EE_Join_And_Data_Types object which contains the SQL
	 * for joining, and the data types
	 * @param string $query_param like Registration.Transaction.TXN_ID
	 * @return void only modifies the EEM_Exp_Related_Model_Info_Carrier passed into it
	 */
	function _extract_related_model_info_from_query_param($query_param, EEM_Exp_Related_Model_Info_Carrier $join_sql_and_data_types){
		foreach(array_keys($this->_model_relations) as $valid_related_model_name){
			//check to see if the $query_param starts with $valid_related_model_name
			//eg if 'Registration' is at the start of 'Registration.Transaction.TXN_ID'
			if(strpos($query_param, $valid_related_model_name) === 0){
				//it is, so pop it off
				$query_param = str_replace($valid_related_model_name.".","",$query_param);
				//get that related model's join info and data types
				$join_sql = $this->_construct_join_with($valid_related_model_name);
				$related_model_obj = $this->get_related_model_obj($valid_related_model_name);
				$data_types = $related_model_obj->_get_data_types();
				$new_join_sql_and_data_types = new EEM_Exp_Related_Model_Info_Carrier(array($valid_related_model_name), $join_sql, $data_types);
				$join_sql_and_data_types->merge( $new_join_sql_and_data_types  );
				//recurse, passing along the growing $join_sql_and_data_types object
				$related_model_obj->_extract_related_model_info_from_query_param($query_param, $join_sql_and_data_types);
			}
		}
	}
	
	
	
	
	function _construct_where_clause($where_params, $joined_data_types = null){
		global $wpdb;
		//@todo pop off the top-layer arguments in future. For now assume single layer
		$data_types = $this->_get_data_types() + $joined_data_types;
		$glue = ' AND ';
		$where_clauses=array();
		foreach($where_params as $query_param_name_and_op => $value){
			//@todo split out model names, and op
			$operator = $this->_extract_operator($query_param_name_and_op);
			$qualified_column = $this->_deduce_table_and_column_name($query_param_name_and_op);
			//check for special case of 'in' operators like 'IN' or 'NOT_IN'
			if(in_array($operator, $this->_in_style_operators)){
				//in this case, the value should be an array, or at least a comma-seperated list
				//it will need to handle a little differently
				$cleaned_value = $this->_construct_in_value($value, $data_types[$qualified_column]);
				//note: $cleaned_value has already been run through $wpdb->prepare()
				$where_clauses[] = $wpdb->prepare( $qualified_column.$operator).$cleaned_value;
			}else{
				$where_clauses[] = $wpdb->prepare( $qualified_column.$operator.$data_types[$qualified_column],$value);
			}
		}
		$SQL = implode($glue,$where_clauses);
		return $SQL;
		//@todo recurse
		
	}
	
	
	
	/**
	 * Takes an array or a comma-seperated list of $values and cleans them 
	 * according to $data_type using $wpdb->preapre, and then makes the list a 
	 * string surrounded by ( and ). Eg, _construct_in_value(array(1,2,3),'%d') would
	 * return '(1,2,3)'; _construct_in_value("1,2,hack",'%d') would return '(1,2,1)' (assuming
	 * I'm right that a string, when interpreted as a digit, becomes a 1. It might become a 0)
	 * @param mixed $values array or comma-seperated string
	 * @param string data_type like '%s','%d','%f'
	 * @return string of SQL to follow an 'IN' or 'NOT IN' operator
	 */
	function _construct_in_value($values, $data_type){
		global $wpdb;
		//check if the value is a CSV'd list
		if(is_string($values)){
			//in which case, turn it into an array
			$values = explode(",",$values);
		}
		foreach($values as $value){
			$cleaned_values[] = $wpdb->prepare($data_type,$value);
		}
		return $cleaned_values;
	}
	
	/**
	 * Takes teh same input as _deduce_table_and_column_name, namely a key in teh 'where' array of $query_params passed to EEM_Experimental_Base::get_all(),
	 * eg Registration.Transaction.TXN_ID__<
	 * Extracts the operator, or if none is provided, assumes it's =
	 * @param string $query_param_name
	 * @return string mysql operator
	 */
	function _extract_operator($query_param_name){
		$parts = explode("__",$query_param_name);
		if( count($parts) == 2 ){
			//there are two parts, so teh 2nd must be the operator
			if(array_key_exists($parts[1], $this->_valid_operators)){
				//confirmed: it's an operator
				$last_part = $parts[1];
				return $this->_valid_operators[$last_part];
			}else{
				//it should have been an operator, but it didn't match any of teh vali dones
				throw new EE_Error(sprintf(__("%s is not a valid operator, provided in %s",'event_espresso'),$parts[1],$query_param_name));
			}
		}elseif( count($parts) == 1 ){
			//no operator provided
			return '=';
		}else{
			//what the?! they submited something like Registration__Transaction.TXN_ID__< when it hsould ahve been like Registration.Transaction.TXN_ID__<
			throw new EE_Error(sprintf(__("Invalid query parameter. Doubel underscore __) is only used to precede an operator, and periods (.) are used to seperate model names. You provided %s",'event_espresso'),$query_param_name));
		}
	}
	/**
	 * Takes the input parameter and extract the table name (alias) and column name
	 * @param string $query_param_name like Registration__Transaction__TXN_ID, Event__Datetime__start_time__<, or REG_ID
	 * @return string table alias and column name for SQL, eg "Transaction.TXN_ID"
	 */
	function _deduce_table_and_column_name($query_param_name){
		//remove the operator, we don't care about that here
		$query_param_and_operator = explode("__",$query_param_name);
		$query_param_name = $query_param_and_operator[0];
		//ok, now proceed with deducing which part is the model's name, and which is the field's name
		//which will help us find the database table and column
		$query_param_parts = explode(".",$query_param_name);
		if(empty($query_param_parts)){
			throw new EE_Error(sprintf(__("_extract_column_name is empty when trying to extract column and table name from %s",'event_espresso'),$query_param_name));
		}
		$number_of_parts = count($query_param_parts);
		$last_query_param_part = $query_param_parts[ count($query_param_parts) - 1 ];
		if($number_of_parts == 1){
			$field_name = $last_query_param_part;
			$model_obj = $this;
		}else{// $number_of_parts >= 2
			//the last part is the column name, and there are only 2parts. tehrefore...
			$field_name = $last_query_param_part;
			$model_obj = $this->get_related_model_obj( $query_param_parts[ $number_of_parts - 2 ]);
		}
		return $model_obj->_get_qualified_column_for_field($field_name);
	}
	
	
	/**
	 * Givena field's name (ie, a key in $this->_fields), uses the EE_Model_Field object to get the table's alias and column
	 * which corresponds to it
	 * @param string $field_name
	 */
	function _get_qualified_column_for_field($field_name){
		$field = $this->_fields[$field_name];
		return $field->get_qualified_column();
	}
	function _construct_internal_join(){
		$SQL = '';
		$first = true;
		foreach($this->_tables as $table){
			if( ! $first){
				$SQL .= " LEFT JOIN ".$table->get_table_name()." AS ".$table->get_table_alias() ." ON ". $table->get_join_column_on_prev_table() ."=". $table->get_join_column_on_next_table() .SP;
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
		$relation_obj = $this->_model_relations[$relation_name];
		return $relation_obj->get_join_statement();
//		if($relation_obj instanceof EE_Exp_Has_Many || $relation_obj instanceof EE_Exp_Belongs_To){
//			$other_table_alias = $relation_obj->get_other_model_table_alias();
//			$other_model = $this->get_related_model_obj($relation_name);
//			/* @var $other_model EEM_Experimental_Base */
//			$other_table_name = $other_model->_tables[$other_table_alias]->get_table_name();
//				$SQL = "LEFT JOIN ".$other_table_name." AS ".$other_table_alias." ON ".$relation_obj->get_join_conditions().SP;
//		}
//			return $SQL;
	}
	
	/**
	 * Gets an array for storing all the data types on the next-to-be-executed-query. 
	 * This should be a growing array of keys being table-columns (eg 'EVT_ID' and 'Event.EVT_ID'), and values being their data type (eg, '%s', '%d', etc)
	 * @return array
	 */
	function _get_data_types(){
		$data_types = array();
		foreach(array_values($this->_fields) as $field_obj){
			$data_types[$field_obj->get_table_column()] = $field_obj->get_wpdb_data_type();
			$data_types[$field_obj->get_qualified_column()] = $field_obj->get_wpdb_data_type();
		}
		return $data_types;
	}
	
	/**
	 * Gets the model object given the relation's name / model's name (eg, 'Event', 'Registration',etc. Always singular)
	 * @param type $model_name
	 * @return EEM_Experimental_Base
	 */
	function get_related_model_obj($model_name){
		
		$model_classname = "EEM_Exp_".$model_name;
		$model_obj = call_user_func($model_classname."::instance");
		return $model_obj;
	}

	
	/**
	 * gets the name of the field of type 'primary_key' from the fieldsSettings attribute.
	 * Eg, on EE_Anwer that would be ANS_ID
	 * @return string
	 * @throws EE_Error
	 */
	public function get_primary_key(){
		foreach($this->_fields as $field){
			if($field instanceof EE_Primary_Key_Field){
				return $field;
			}
		}
		throw new EE_Error(sprintf(__("There is no Primary Key defined on model %s",'event_espresso'),get_class($this)));
	}
	/**
	 * Gets a foreign key field pointing to model. 
	 * @param string $model_name eg Event, Registration, not EEM_Exp_Event
	 * @return EE_Foreign_Key_Field
	 * @throws EE_Error
	 */
	public function get_foreign_key_to($model_name){
		foreach($this->_fields as $field){
			if($field instanceof EE_Foreign_Key_Field 
					&&
					$field->get_model_name_pointed_to() == $model_name){
				return $field;
			}
		}
		throw new EE_Error(sprintf(__("There is no foreign key field pointing to model %s on model %s",'event_espresso'),$model_name,get_class($this)));
	}
	/**
	 * Gets the actual table for the table alias
	 * @param string $table_alias eg Event, Event_Meta, Registration, Transaction
	 * @return string
	 */
	function get_table_for_alias($table_alias){
		return $this->_tables[$table_alias]->get_table_name();
	}
	
}
/**
* Internal class for simply carrying data during the EEM_Experimental_Base::_extract_related_model_info_from_query_param method.
* We could have returned an array
* with two keys 'join_sql' and 'data_types', but this better-defines the data being passed around
*/
class EEM_Exp_Related_Model_Info_Carrier extends EE_Base{
   /**
	* @var string SQL for performing joins (Eg, "INNER JOIN blah ON blah=blah INNER JOIN FOO ON foo=foo...")
	*/
   private $_join_sql;
   /**
	*
	* @var array an array of data types like returned from EEM_Experimental_Base::_get_data_types() 
	*/
   private  $_data_types;
   /**
    *
    * @var array numerically-indexed array stating all the models that have been included thus far,so we don't get duplicates
    */
   private $_models_included;
   public function __construct($model_included_name= array(), $join_sql = '', $data_types =array()){
	   $this->_models_included = $model_included_name;
	   $this->_join_sql = $join_sql;
	   $this->_data_types = $data_types;
   }
   
   /**
    * Merges info from the other EEM_Exp_Related_Model_Info_Carrier into this one.
    * @param EEM_Exp_Related_Model_Info_Carrier $other_join_sql_and_data_types_carrier
    */
   public function merge( $other_join_sql_and_data_types_carrier ){
	   if( $other_join_sql_and_data_types_carrier && ! $this->_have_already_included_one_of_these_models($other_join_sql_and_data_types_carrier->get_model_names_included())){
		   $model_included_on_other_join_sql_and_data_types_carrier =  $other_join_sql_and_data_types_carrier->get_model_names_included();
		   $this->_models_included = array_merge( $this->_models_included, $model_included_on_other_join_sql_and_data_types_carrier );
			$this->_join_sql .= $other_join_sql_and_data_types_carrier->get_join_sql();
			$this->_data_types = $this->_data_types + $other_join_sql_and_data_types_carrier->get_data_types();
	   }
	   //otherwise don't merge our data.
	   //yes, this means that we must immediately merge any model data into our grand list
	   //as soon as we get some from ONE model, or else we could reject a EEM_Exp_Related_Model_Info_Carrier
	   //which is carrying info from two models WHERE one is already included but the other is NOT
	  
   }
   protected function  _have_already_included_one_of_these_models($model_names){
	   foreach($this->_models_included as $model_included){
		   if(in_array($model_included, $model_names)){
			   return true;
		   }
	   }
	   return false;
   }
   
   protected function get_first_model_name_included(){
	   return array_shift($this->_models_included);
   }
   public function get_model_names_included(){
	   return $this->_models_included;
   }
   public function get_join_sql(){
	   return $this->_join_sql;
   }
   public function get_data_types(){
	   return $this->_data_types;
   }
}
///////////////////////////////////////////////////////////////////////////////////////////////
//concrete children of EEM_Experimental_Base
class EEM_Exp_Event extends EEM_Experimental_Base{
	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Attendee instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}

	
	function __construct(){
		$this->_tables = array(
			'Event' => new EE_Table('posts'),
			'Event_Meta' => new EE_Table('postmeta','ID','post_id',"Event.post_type = 'page'"));
		$this->_model_relations = array(
			'Registration'=>new EE_Exp_Has_Many());
		$this->_fields = array(
			'EVT_ID'=>new EE_Primary_Key_Int_Field('Event', 'ID', 'Event ID', false, 0),
			'EVT_desc'=>new EE_HTML_Field('Event','post_content','Event Description',true,''));
		parent::__construct();
	}
}
class EEM_Exp_Registration extends EEM_Experimental_Base{
	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Attendee instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}

	function __construct(){
		$this->_tables = array(
			'Registration'=>new EE_Table('esp_registration')
		);
		$this->_model_relations = array(
			//woudl add a BelongsTorelation to events and other relations here
			'Transaction'=> new EE_Exp_Belongs_To(),
			'Event'=>new EE_Exp_Belongs_To()
		);
		$this->_fields = array(
			'REG_ID'=>new EE_Primary_Key_Int_Field('Registration', 'REG_ID', 'Registration ID', false, 0),
			'EVT_ID'=>new EE_Foreign_Key_Int_Field('Registration', 'EVT_ID', 'Event ID', false, 0, 'Event'),
			'TXN_ID'=>new EE_Foreign_Key_Int_Field('Registration','TXN_ID','Transaction ID',false, 0, 'Transaction'),
			'STS_ID'=>new EE_Enum_Field('Registration','STS_ID','Status Code',false,'RNA',array('RAP','RCN','RNA','RPN'))
		);
		parent::__construct();
	}
}
class EEM_Exp_Transaction extends EEM_Experimental_Base{
	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Attendee instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}

	
	function __construct(){
		$this->_tables = array(
			'Transaction'=>new EE_Table('esp_transaction')
		);
		$this->_model_relations = array(
			'Registration'=>new EE_Exp_Has_Many(),
			//woudl add a BelongsTorelation to events and other relations here
		);
		$this->_fields = array(
			'TXN_ID'=>new EE_Primary_Key_Int_Field('Transaction', 'TXN_ID', 'Transaction ID', false, 0),
			'STS_ID'=>new EE_Enum_Field('Transaction','STS_ID','Status Code',false,'RNA',array('TIN','TCM','TPN','TOP'))
		);
		parent::__construct();
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
	function get_qualified_column(){
		return $this->get_table_alias().".".$this->get_table_column();
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
abstract class EE_Float_Field_Base extends EE_Exp_Model_Field_Base{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%f';
	}
}
abstract class EE_Primary_Key_Field extends EE_Exp_Model_Field_Base{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
}
class EE_Primary_Key_Int_Field extends EE_Primary_Key_Field{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%d';
	}
}
class EE_Primary_Key_String_Field extends EE_Primary_Key_Field{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%s';
	}
}
abstract class EE_Foreign_Key_Field extends EE_Exp_Model_Field_Base{
	protected $_model_name;
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value,$model_name){
		$this->_model_name = $model_name;
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value);	
	}
	function get_model_name_pointed_to(){
		return $this->_model_name;
	}
}
class EE_Foreign_Key_Int_Field extends EE_Foreign_Key_Field{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value,$model_name){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value,$model_name);	
	}
	function get_wpdb_data_type(){
		return '%d';
	}
}
class EE_Foreign_Key_String_Field extends EE_Foreign_Key_Field{
	function __construct($table_alias, $table_column, $nicename, $nullable, $default_value,$model_name){
		parent::__construct($table_alias, $table_column, $nicename, $nullable, $default_value,$model_name);	
	}
	function get_wpdb_data_type(){
		return '%s';
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
	/**
	 *
	 * @var string 
	 */
	private $_this_model_name;
	/**
	 *
	 * @var string 
	 */
	private $_other_model_name;
	protected $_extra_join_conditions;
	function __construct($extra_join_conditions){
		$this->_extra_join_conditions=$extra_join_conditions;
	}
	function _construct_finalize_set_models($this_model_name, $other_model_name){
		$this->_this_model_name = $this_model_name;
		$this->_other_model_name = $other_model_name;
	}
	/**
	 * 
	 * @return EE_Experimental_Base
	 */
	function get_this_model(){
		$modelInstance=call_user_func("EEM_Exp_".$this->_this_model_name."::instance");
		return $modelInstance;
	}
	/**
	 * 
	 * @return EE_Experimental_Base
	 */
	function get_other_model(){
		$modelInstance=call_user_func("EEM_Exp_".$this->_other_model_name."::instance");
		return $modelInstance;
	}
	
	
	protected function _left_join($other_table,$other_table_alias,$other_table_column,$this_table_alias,$this_table_join_column, $extra_join_sql){
		return " LEFT JOIN ".$other_table." AS ".$other_table_alias. " ON ".$other_table_alias.".".$other_table_column."=".$this_table_alias.".".$this_table_join_column." ".$extra_join_sql." ";
	}
	abstract function get_join_statement();
}

class EE_Exp_Has_Many extends EE_Exp_Model_Relation{	
	function __construct($extra_join_conditions = null){
		parent::__construct($extra_join_conditions);
	}
	function get_join_statement(){
		//create the sql string like
		// LEFT JOIN other_table AS table_alias ON this_table_alias.pk = other_table_alias.fk extra_join_conditions
		$this_table_pk_field = $this->get_this_model()->get_primary_key();
		$other_table_fk_field = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		$pk_table_alias = $this_table_pk_field->get_table_alias();
		$fk_table_alias = $other_table_fk_field->get_table_alias();
		$fk_table = $this->get_other_model()->get_table_for_alias($fk_table_alias);
		
		return $this->_left_join($fk_table, $fk_table_alias, $other_table_fk_field->get_table_column(), $pk_table_alias, $this_table_pk_field->get_table_column(), $this->_extra_join_conditions);
	}
}
/**
 * The current model has the foreign key pointing to the other model. Eg, Registration belongs to Transaction 
 * (because Registration's TXN_ID field is on Registration, and points to teh Transaction's PK) 
 */
class EE_Exp_Belongs_To extends EE_Exp_Model_Relation{
	function __construct($extra_join_conditions = null){
		parent::__construct($extra_join_conditions);
	}
	function get_join_statement(){
		//create the sql string like
		// LEFT JOIN other_table AS table_alias ON this_table_alias.pk = other_table_alias.fk extra_join_conditions
		$this_table_fk_field = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		$other_table_pk_field = $this->get_other_model()->get_primary_key();
		$this_table_alias = $this_table_fk_field->get_table_alias();
		$other_table_alias = $other_table_pk_field->get_table_alias();
		$other_table = $this->get_other_model()->get_table_for_alias($other_table_alias);		
		return $this->_left_join($other_table, $other_table_alias, $other_table_pk_field->get_table_column(), $this_table_alias, $this_table_fk_field->get_table_column(), $this->_extra_join_conditions);
	}
	//so far EE_Exp_Belongs_To is identical to EE_Exp_Has_Many
	//this is probably because we're explicitly requiring the relation
	//to identify the private key and foreign keys, where those could be determined from the models themselves
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
