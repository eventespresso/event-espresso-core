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
	 * @var array with two levels: top-leve has array keys which are database table aliases (ie, keys in _tables)
	 * and the value is an array. Each of those sub-arrays have keys of field names (eg 'ATT_ID', which should also be variable names
	 * on the model objects (eg, EE_Attendee), and the keys should be children of EE_Exp_Model_Field
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
	
	/**
	 * About all child constructors:
	 * they should define the _tables, _fields and _model_relations arrays. 
	 * Should ALWAYS be called after child constructor.
	 * In order to make the child constructors to be as simple as possible, this parent constructor
	 * finalizes constructing all the object's attributes. 
	 * Generally, rather than requiring a child to code
	 * $this->_tables = array(
	 *		'Event_Post_Table' => new EE_Table('Event_Post_Table','wp_posts')
	 *		...);
	 *  (thus repeating itself in the array key and in the constructor of the new EE_Table,)
	 * each EE_Table has a function to set the table's alias after the constructor, using
	 * the array key ('Event_Post_Table'), instead of repeating it. The model fields and model relations
	 * do something similar.
	 */
	function __construct(){
		foreach($this->_tables as $table_alias => $table_obj){
			$table_obj->_construct_finalize_with_alias($table_alias);
			if($table_obj instanceof EE_Other_Table){
				$table_obj->_construct_finalize_set_table_to_join_with($this->_get_main_table());
			}
		}
		foreach($this->_fields as $table_alis => $fields_for_table){
			if(!array_key_exists($table_alias,$this->_tables)){
				throw new EE_Error(sprintf(__("Table alias %s does not exist in EEM_Experimental_Base child's _tables array. Only tables defined are %s",'event_espresso'),$table_alias,implode(",",$this->_fields)));
			}
			foreach($fields_for_table as $field_name => $field_obj){
				$field_obj->_construct_finalize($table_alis,$field_name);
			}
		}
				
			
		foreach($this->_model_relations as $model_name => $relation_obj){
			$relation_obj->_construct_finalize_set_models($this->get_this_model_name(), $model_name);
		}
	}
	
	function get_all($query_params = array()){
		global $wpdb;
		$model_query_info = $this->_create_model_query_info_carrier($query_params);
		$SQL ="SELECT ".$this->_construct_select_sql_for_this_model()." FROM ".$model_query_info->get_full_join_sql()." WHERE ".$model_query_info->get_where_sql();
		//echo "sql to run:$SQL";
		return $this->_create_objects($wpdb->get_results($SQL));
	}
	
	/**
	 * Gets a single item for this model from the DB, given only its ID (or null if none is found).
	 * @param mixed $id int or string, depending on the type of the model's primary key
	 * @return EE_Exp_Base_Class
	 */
	function get_one_by_ID($id){
		$primary_key_name = $this->get_primary_key_field()->get_name();
		return $this->get_one(array(array($primary_key_name => $id)));
	}
	/**
	 * Gets a single item for this model from the DB, given the $query_params. Only returns a single class, not an array. If no item is found,
	 * null is rturned.
	 * @param array $query_params like EEM_Experimental_Base's $query_params variable.
	 * @return EE_Exp_Base_Class
	 */
	function get_one($query_params = array()){
		$query_params['limit'] = 1;
		$items = $this->get_all($query_params);
		if(empty($items)){
			return null;
		}else{
			return array_shift($items);
		}
	}
	
	
	function _extract_where_parameters($query_params){
		if(array_key_exists(0,$query_params)){
			$where_array = $query_params[0];
		}else{
			$where_array = array();
		}
		return $where_array;
	}
	/**
	 * 
	 * @param array $cols_n_values keys are model fields (exactly like keys in EEM_Experimental::_fields), values are strings, ints, floats, and maybe arrays if theyare to be serialized
	 * @param array $query_params very much like EEM_Experimental_Base::get_all's $query_params
	 * @return int how many rows got updated
	 */
	function update($cols_n_values, $query_params){
		$model_query_info = $this->_create_model_query_info_carrier($query_params);
		//$SQL =
		EE_Error::add_error("EEM_ExperimetnaL_Base::update not yet implemented");
		return 25;//how many supposedly got updated
	}
	/**
	 * 
	 * @param array $query_params very much like EEM_Experimental_Base::get_all's $query_params
	 * @return int how many rows got deleted
	 */
	function delete($query_params){
		EE_Error::add_error("EEM_ExperimetnaL_Base::delete not yet implemented");
		return 23;//how many supposedly got delteed
	}
	/**
	 * Adds a relationship of the correct type between $modelObject and $otherModelObject. 
	 * There are the 3 cases:
	 * 
	 * 'belongsTo' relationship: sets $modelObject's foreign_key to be $otherModelObejct's primary_key. If $otherModelObject has no ID, it is first saved.
	 * 
	 * 'hasMany' relationship: sets $otherModelObject's foreign_key to be $modelObject's primary_key. If $modelObject has no ID, it is first saved.
	 * 
	 * 'hasAndBelongsToMany' relationships: checks that there isn't already an entry in the join table, and adds one.
	 * If one of the model Objects has not yet been saved to teh database, it is saved before adding the entry in the join table
	 * 
	 * @param EE_Base_Class $thisModelObject
	 * @param mixed $id_or_obj EE_base_Class or ID of other Model Object
	 * @param string $relationName
	 * @param array $extraColumnsForHABTM mapping from column/attribute names to values for JOIN tables with extra columns. Eg, when adding 
	 * an attendee to a group, you also want to specify which role they will have in that group. So you would use this parameter to specificy array('role-column-name'=>'role-id')
	 * @return boolean of success
	 */
	public function add_relationship_to($id_or_obj,$otherModelObjectOrID, $relationName,$extraColumnsForHABTM=null){
		EE_Error::add_error("EEM_ExperimetnaL_Base::add_relation_to not yet implemented");
		
	}
	
	/**
	 * Removes a relationship of the correct type between $modelObject and $otherModelObject. 
	 * There are the 3 cases:
	 * 
	 * 'belongsTo' relationship: sets $modelObject's foreign_key to null, if that field is nullable.Otherwise throws an error
	 * 
	 * 'hasMany' relationship: sets $otherModelObject's foreign_key to null,if that field is nullable.Otherwise throws an error
	 * 
	 * 'hasAndBelongsToMany' relationships:remoevs any existing entry in the join table between the two models.
	 * 
	 * @param EE_TempBase $id_or_obj
	 * @param mixed $otherModelObjectOrID EE_base_Class or ID of other Model Object
	 * @param string $relationName
	 * @return boolean of success
	 */
	public function remove_relationship_to($id_or_obj,  $otherModelObjectOrID, $relationName){
		EE_Error::add_error("EEM_ExperimetnaL_Base::remove_relation_to not yet implemented");
	}
	
	
	/**
	 * 
	 * @global type $wpdb
	 * @param mixed $id_or_obj EE_Base_Class child or its ID
	 * @param string $model_name like 'Event', 'Registration', etc. always singular
	 * @param array $query_params like EEM_Experimental_Base::get_all
	 * @return EE_Base_Class
	 */
	function get_all_related($id_or_obj, $model_name, $query_params = null){
		//get that related model
		$related_model = $this->get_related_model_obj($model_name);
		//we're just going to use teh query params on the related model's normal get_all query,
		//except add a condition to say to match the curren't mod
		
		$query_params['where']['Event.EVT_ID']=$id_or_obj;
		return $related_model->get_all($query_params);
	}
	/**
	 * Uses $this->_relatedModels info to find the first related model object of relation $relationName to the given $modelObject
	 * @param EE_Base_Class'child $modelObject one of EE_Answer, EE_Attendee, etc. 
	 * @param mixed $id_or_obj EE_Base_Class child or its ID
	 * @param string $other_model_name, key in $this->_relatedModels, eg 'Registration', or 'Events'
	 * @return EE_Base_Class
	 */
	public function get_first_related(EE_Base_Class $id_or_obj,$other_model_name,$query_params){
		$query_params['limit']=1;
		$results = get_all_related($id_or_obj,$other_model_name,$query_params);
		return array_shift($results);
	}
	
	/**
	 * Gets the model's name as it's expected in queries. For example, if this is EEM_Exp_Event model, that would be Event
	 * @return string
	 */
	function get_this_model_name(){
		return str_replace("EEM_Exp_","",get_class($this));
	}
	/**
	 * Inserts a new entry into the database, for each table
	 * @global type $wpdb
	 * @param type $cols_n_values
	 * @return int primary key on main table from insertions
	 * @throws EE_Error
	 */
	function insert($cols_n_values){
		$main_table = $this->_get_main_table();
		$new_id = $this->_insert_into_specific_table($main_table, $cols_n_values);
		foreach($this->_get_other_tables() as $other_table){
			$this->_insert_into_specific_table($other_table, $cols_n_values,$new_id);
		}
		return $new_id;
	}
	
	
	/**
	 * Inserts a new row in $table, using the $cols_n_values which apply to that table.
	 * If a $new_id is supplied and if $table is an EE_Other_Table, we assume
	 * we need to add a foreign key column to point to $new_id (which should be the primary key's value
	 * on the main table)
	 * @param EE_Table $table
	 * @param array $cols_n_values each key should be in _fields's keys, and value should be an int, string or float
	 * @param int $new_id for now we assume only int keys
	 * @return int ID of new row inserted
	 * @throws EE_Error
	 */
	private function _insert_into_specific_table(EE_Table $table, $cols_n_values, $new_id = false){
		global $wpdb;
		$insertion_col_n_values = array();
		$format_for_insertion = array();
		$fields_on_table = $this->_get_fields_for_table($table->get_table_alias());
		foreach($fields_on_table as $field_name => $field_obj){
			//first check if this is a primary key field. If so, that should be auto-incremented, not set during insertion
			if($field_obj instanceof EE_Primary_Key_Int_Field){
				continue;
			}
			if(array_key_exists($field_name, $cols_n_values)){
				//they have specified teh value for thi sfield, so use it
				$insertion_col_n_values[$field_obj->get_table_column()] = $cols_n_values[$field_name];
			}else{
				//they didnt include this field. so just use default
				$insertion_col_n_values[$field_obj->get_table_column()] = $field_obj->get_default_value();
			}
			$format_for_insertion[] = $field_obj->get_wpdb_data_type();
		}

		if($table instanceof EE_Other_Table && $new_id){
			//its not the main table, so we should have already saved teh main table's PK which we just inserted
			//so add the fk to the main table as a column
			$insertion_col_n_values[$table->get_fk_on_table()] = $new_id;
			$format_for_insertion[]='%d';//yes right now we're only allowing these foreign keys to be INTs
		}
		//insert the new entry
		$result = $wpdb->insert($table->get_table_name(),$insertion_col_n_values,$format_for_insertion);
		if(!$result){
			throw new EE_Error(sprintf(__("Error inserting values %s for columns %s, using data types %s, into table %s",'event_espresso'),
					implode(",",$insertion_col_n_values),
					implode(",",array_keys($insertion_col_n_values)),
					implode(",",$format_for_insertion)));
		}
		return $wpdb->insert_id;
	}	
	/**
	 * Returns the main table on this model
	 * @return EE_Main_Table
	 * @throws EE_Error
	 */
	protected function _get_main_table(){
		foreach($this->_tables as $table){
			if($table instanceof EE_Main_Table){
				return $table;
			}
		}
		throw new EE_Error(sprintf(__("THere are no main tables on %s. They should be added to _tables array in the constructor",'event_espresso'),get_class($this)));
	}
	/**
	 * Gets all the tables of type EE_Other_Table from EEM_Experimental_Model::_tables
	 * @return EE_Other_Table[]
	 */
	protected function _get_other_tables(){
		$other_tables =array();
		foreach($this->_tables as $table_alias => $table){
			if($table instanceof EE_Other_Table){
				$other_tables[$table_alias] = $table;
			}
		}
		return $other_tables;
	}
	/**
	 * Finds all the fields that correspond to the given table
	 * @param string $table_alias, array key in EEM_Experimental_Base::_tables
	 * @return EE_Exp_Model_Field[]
	 */
	function _get_fields_for_table($table_alias){
		return $this->_fields[$table_alias];
	}
	
	/**
	 * Recurses through all the where parameters, and finds all the related models we'll need
	 * to complete this query. Eg, given where parameters like array('EVT_ID'=>3) from within Event model, we won't need any
	 * related models. But if the array were array('Registrations.REG_ID'=>3), we'd need the related Registration model.
	 * If it were array('Registrations.Transactions.Payments.PAY_ID'=>3), then we'd need the related Registration, Tranaction, and Payment models.
	 * @param array $where_paramslike EEM_Experimental_Base::get_all's $query_parameters['where']
	 * @return EE_Model_Query_Info_Carrier
	 */
	function _extract_related_models_from_query($where_params){
		$join_sql_and_data_types = new EE_Model_Query_Info_Carrier();
		if(!empty($where_params)){
			foreach(array_keys($where_params) as $param){
				//$param could be simply 'EVT_ID', or it could be 'Registrations.REG_ID', or even 'Registrations.Transactions.Payments.PAY_amount'
				$this->_extract_related_model_info_from_query_param( $param, $join_sql_and_data_types);
			}
		}
		return $join_sql_and_data_types;
	}
	
	/**
	 * Extract all the query parts from $query_params (an array like whats passed to EEM_Experimental_Base::get_all)
	 * and put into a EEM_Exp_Related_Model_Info_Carrier for easy extraction into SQL. We create this object
	 * instead of directly constructing teh SQL because often we need to extract info from the $query_params
	 * but use them in a different order. Eg, we need to know what models we are querying
	 * before we know what joins to perform. However, we need to know what data types correspond to which fields on other
	 * models before we can finalize the where clause SQL.
	 * @param array $query_params
	 * @return EE_Model_Query_Info_Carrier
	 */
	function _create_model_query_info_carrier($query_params){
		$where_array = $this->_extract_where_parameters($query_params);
		if($where_array){
			$query_objects = $this->_extract_related_models_from_query($where_array);
			$query_objects->set_where_sql( $this->_construct_where_clause($where_array, $query_objects->get_data_types()));
		}
		$query_objects->set_main_model_join_sql($this->_construct_internal_join());
		return $query_objects;
	}
	
	/**
	 * Creates the string of SQL for the select part of a select query, everything behind SELECT and before FROM.
	 * Eg, "Event.post_id, Event.post_name,Event_Detail.EVT_ID..."
	 * @return string
	 */
	public function _construct_select_sql_for_this_model(){
		$fields = $this->_get_all_fields();
		$selects = array();
		foreach($fields as $field_name => $field_obj){
			$selects[] = $field_obj->get_table_alias().".".$field_obj->get_table_column()." AS '".$field_obj->get_table_alias().".".$field_obj->get_table_column()."'";
		}
		return implode(", ",$selects);
	}
	
	/**
	 * Given a $query_param like 'Registration.Transaction.TXN_ID', pops off 'Registration.',
	 * gets the join statement for it; gets the data types for it; and passes the remaining 'Transaction.TXN_ID'
	 * onto its related Transaction object to do the same. Returns an EE_Join_And_Data_Types object which contains the SQL
	 * for joining, and the data types
	 * @param string $query_param like Registration.Transaction.TXN_ID
	 * @return void only modifies the EEM_Exp_Related_Model_Info_Carrier passed into it
	 */
	function _extract_related_model_info_from_query_param($query_param, EE_Model_Query_Info_Carrier $join_sql_and_data_types){
		foreach($this->_model_relations as $valid_related_model_name=>$relation_obj){
			//check to see if the $query_param starts with $valid_related_model_name
			//eg if 'Registration' is at the start of 'Registration.Transaction.TXN_ID'
			if(strpos($query_param, $valid_related_model_name) === 0){
				//it is, so pop it off
				$query_param = str_replace($valid_related_model_name.".","",$query_param);
				//get that related model's join info and data types
				
				$related_model_obj = $this->get_related_model_obj($valid_related_model_name);
				//check if teh relation is HABTM, because then we're essentially doing two joins
				//If so, join first to the JOIN table, and add its data types, and then continue as normal
				if($relation_obj instanceof EE_Exp_HABTM){
					$join_model_obj = $relation_obj->get_join_model();
					$new_join_sql_and_data_types = new EE_Model_Query_Info_Carrier(
							array($join_model_obj->get_this_model_name()), 
							$relation_obj->get_join_to_intermediate_model_statement(), 
							$join_model_obj->_get_data_types());
					$join_sql_and_data_types->merge( $new_join_sql_and_data_types  );
				}
				//now just join to the other table pointed to by the relation object, and add its data types
				$new_join_sql_and_data_types = new EE_Model_Query_Info_Carrier(
						array($valid_related_model_name), 
						$relation_obj->get_join_statement(), 
						$related_model_obj->_get_data_types());
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
		foreach($where_params as $query_param => $op_and_value){
			//@todo split out model names, and op
//			$operator = $this->_extract_operator($query_param);
			$qualified_column_sql = $this->_deduce_table_and_column_name($query_param);
			$data_type = $data_types[$qualified_column_sql];
			$op_and_value_sql = $this->_construct_op_and_value($op_and_value, $data_type);
			$where_clauses[]=$qualified_column_sql.SP.$op_and_value_sql;
		}
		$SQL = implode($glue,$where_clauses);
		return $SQL;
	}
	
	/**
	 * creates the SQL 
	 * @param type $op_and_value
	 * @param type $data_type
	 */
	private function _construct_op_and_value($op_and_value, $data_type){
		
		//check if teh value is an array
		if(is_array($op_and_value)){
			//assume first arg is an aray
			$operator = $op_and_value[0];
			$value = $op_and_value[1];
		}else{
			$operator = '=';
			$value = $op_and_value;
		}
		
		if(in_array($operator, $this->_in_style_operators)){
				//in this case, the value should be an array, or at least a comma-seperated list
				//it will need to handle a little differently
				$cleaned_value = $this->_construct_in_value($value, $data_type);
				//note: $cleaned_value has already been run through $wpdb->prepare()
				return $operator.SP.$cleaned_value;
			}else{
				global $wpdb;
				return $wpdb->prepare($operator.SP.$data_type, $value);
			}
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
		return "(".implode(",",$cleaned_values).")";
	}
	
	
	/**
	 * Takes the input parameter and extract the table name (alias) and column name
	 * @param string $query_param_name like Registration__Transaction__TXN_ID, Event__Datetime__start_time, or REG_ID
	 * @return string table alias and column name for SQL, eg "Transaction.TXN_ID"
	 */
	function _deduce_table_and_column_name($query_param_name){
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
	 * Givena field's name (ie, a key in $this->_get_all_fields()), uses the EE_Model_Field object to get the table's alias and column
	 * which corresponds to it
	 * @param string $field_name
	 */
	function _get_qualified_column_for_field($field_name){
		$all_fields = $this->_get_all_fields();
		$field = $all_fields[$field_name];
		return $field->get_qualified_column();
	}
	
	/**
	 * Constructs the internal join if there are multiple tables, or simply the table's name and alias
	 * Eg "wp_post AS Event" or "wp_post AS Event INNER JOIN wp_postmeta Event_Meta ON Event.ID = Event_Meta.post_id"
	 * @return string SQL 
	 */
	function _construct_internal_join(){
		$SQL = '';
//		$first = true;
		foreach($this->_tables as $table_obj){
			if($table_obj instanceof EE_Main_Table){
				$SQL .= SP.$table_obj->get_table_name()." AS ".$table_obj->get_table_alias().SP;
			}elseif($table_obj instanceof EE_Other_Table){
				$SQL .= SP.$table_obj->get_join_sql().SP;
			}
		}
		return $SQL;
	}
	
	
	/**
	 * Gets an array for storing all the data types on the next-to-be-executed-query. 
	 * This should be a growing array of keys being table-columns (eg 'EVT_ID' and 'Event.EVT_ID'), and values being their data type (eg, '%s', '%d', etc)
	 * @return array
	 */
	function _get_data_types(){
		$data_types = array();
		foreach(array_values($this->_get_all_fields()) as $field_obj){
			//$data_types[$field_obj->get_table_column()] = $field_obj->get_wpdb_data_type();
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
	 * @return EE_Exp_Model_Field
	 * @throws EE_Error
	 */
	public function get_primary_key_field(){
		foreach($this->_get_all_fields() as $field){
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
		foreach($this->_get_all_fields() as $field){
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
	/**
	 * Returns a flat array of all field son this model, instead of organizing them 
	 * by table_alias as they are in the constructor. 
	 * @return EE_Exp_Model_Field_Base[] where the keys are the field's name
	 */
	protected function _get_all_fields(){
		$all_fields = array();
		foreach($this->_fields as $table_alias => $fields_corresponding_to_table){
			foreach($fields_corresponding_to_table as $field_name => $field_obj){
				$all_fields[$field_name]=$field_obj;
			}
		}
		return $all_fields;
	}
	
	/**
	*		cycle though array of attendees and create objects out of each item
	* 
	* 		@access		private
	* 		@param		array		$attendees		
	*		@return 	EE_Base_Class[]		array on success, FALSE on fail
	*/	
	protected function _create_objects( $rows = array() ) {
		$this->_include_php_class();
		$array_of_objects=array();
		if(empty($rows)){
			return array();
		}
		foreach ( $rows as $row ) {
			if(empty($row)){//wp did its weird thing where it returns an array like array(0=>null), which is totally not helpful...
				return array();
			}
			$classInstance=$this->instantiate_class_from_array_or_object($row);
			$array_of_objects[$classInstance->ID()]=$classInstance;
		}
		return $array_of_objects;	
	}
	/**
	 * takes care of including the PHP file with the corresponding .class file to this model.
	 */
	private function _include_php_class(){
		$className=$this->_get_class_name();
		if(!class_exists($className)){
			require_once($className.".class.php");
		}
	}
	
	/**
	 * 
	 * @param mixed $cols_n_values either an array of where each key is the name of a field, and the value is its value
	 * or an stdClass where each property is the name of a column,
	 * @return EE_Base_Class
	 */
	public function instantiate_class_from_array_or_object($cols_n_values){
		if(!is_array($cols_n_values)){
			$cols_n_values=get_object_vars($cols_n_values);
		}
		//make sure the array only has keys that are fields/columns on this model
		$this_model_fields_n_values = array();
		foreach($cols_n_values as $col => $val){
			foreach($this->_get_all_fields() as $field_name => $field_obj){
				//ask the field what it think it's table_name.column_name should be, and call it the "qualified column"
				$field_qualified_column = $field_obj->get_qualified_column();
				//does the field on the model relate to this column retrieved from teh db?
				if($field_qualified_column == $col){
					//OK, this field apparently relates to this model.
					//now we can add it to the array 
					$this_model_fields_n_values[$field_name] = $val;
				}
			}
		}
		
		//get the ID of the object, and remove it from cols_n_values for now
//		$pkName=$this->get_primary_key_field()->get_name();
//		$pkValue=$cols_n_values[$pkName];
//		unset($cols_n_values[$pkName]);
		
		//get the required info to instantiate the class whcih relates to this model.
		$className=$this->_get_class_name();
		$class=new ReflectionClass($className);
		//call the constructor of the EE_Base_Class, passing it an array of all the fields, except
		//the ID, because we set that later
		$classInstance=$class->newInstanceArgs(array($this_model_fields_n_values));
		
		/* @var $classInstance EE_Base_Class */
		//now set the ID on this new EE_Base_Class instance, so we realize it's 
		//already in teh DB
		//$classInstance->set($pkName,$pkValue);
		return $classInstance;
	}
	/**
	 * Gets the EE class that corresponds to this model. Eg, for EEM_Answer that
	 * would be EE_Answer.To import that class, you'd just add ".class.php" to the name, like so
	 * require_once($this->_getClassName().".class.php");
	 * @return string
	 */
	private function _get_class_name(){
		return "EE_Exp_".$this->get_this_model_name();
	}
	
	/**
	 * Very handy general function to allow for plugins to extend any child of EE_TempBase.
	 * If a method is called on a child of EE_TempBase that doesn't exist, this function is called (http://www.garfieldtech.com/blog/php-magic-call)
	 * and passed the method's name and arguments.
	 * Instead of requiring a plugin to extend the EE_TempBase (which works fine is there's only 1 plugin, but when will that happen?)
	 * they can add a hook onto 'filters_hook_espresso__{className}__{methodName}' (eg, filters_hook_espresso__EE_Answer__my_great_function)
	 * and accepts 2 arguments: the object on which teh function was called, and an array of the original arguments passed to the function. Whatever their callbackfunction returns will be returned by this function.
	 * Example: in functions.php (or in a plugin):
	 * add_filter('filter_hook_espresso__EE_Answer__my_callback','my_callback',10,3);
	 * function my_callback($previousReturnValue,EE_TempBase $object,$argsArray){
			$returnString= "you called my_callback! and passed args:".implode(",",$argsArray);
	 *		return $previousReturnValue.$returnString;
	 * }
	 * require('EEM_Answer.model.php');
	 * $answer=EEM_Answer::instace();
	 * echo $answer->my_callback('monkeys',100);
	 * //will output "you called my_callback! and passed args:monkeys,100"
	 * @param string $methodName name of method which was called on a child of EE_TempBase, but which 
	 * @param array $args array of original arguments passed to the function
	 * @return mixed whatever the plugin which calls add_filter decides
	 */
	public function __call($methodName,$args){
		$className=get_class($this);
		$tagName="filter_hook_espresso__{$className}__{$methodName}";
		if(!has_filter($tagName)){
			throw new EE_Error(sprintf(__("Method %s on model %s does not exist! You can create one with the following code in functions.php or in a plugin: add_filter('%s','my_callback',10,3);function my_callback(\$previousReturnValue,EEM_TempBase \$object\$argsArray=null){/*function body*/return \$whatever;}","event_espresso"),
										$methodName,$className,$tagName));
		}
		
		return apply_filters($tagName,null,$this,$args);
	}
	
	/**
	 * Ensures $base_class_obj_or_id is of the EE_Base_Class child that corresponds ot this model.
	 * If not, assumes its an ID, and uses $this->get_one_by_ID() to get the EE_Base_Class.
	 * @param EE_Base_Class/int $base_class_obj_or_id either teh EE_Base_Class taht corresponds to this Model, or its ID
	 * @return EE_Base_Class
	 */
	public function ensure_is_obj($base_class_obj_or_id){ 
		if(is_a($base_class_obj_or_id,$this->_get_class_name())){
			return $base_class_obj_or_id;
		}elseif(is_int($base_class_obj_or_id)){//assume it's an ID
			return $this->get_one_by_ID($base_class_obj_or_id);
		}else{
			throw new EE_Exception(sprintf(__("'%s' is neither an object of type %s, nor an ID!",'event_espresso'),$base_class_obj_or_id,$this->_getClasssName()));
		}
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
			'Event' => new EE_Main_Table('posts','ID'),
			'Event_Meta' => new EE_Other_Table('postmeta','post_id',"Event.post_type = 'page'"));
		$this->_model_relations = array(
			'Registration'=>new EE_Exp_Has_Many(),
			'Question_Group'=>new EE_Exp_HABTM('Event_Question_Group'),
			'Event_Question_Group'=>new EE_Exp_Has_Many());
		$this->_fields = array(
				'Event'=>array(
					'EVT_ID'=>new EE_Primary_Key_Int_Field('ID', 'Event ID', false, 0),
					'EVT_desc'=>new EE_HTML_Field('post_content','Event Description',true,''),),
				'Event_Meta'=>array(
					'EVT_metakey1'=>new EE_HTML_Field('meta_key','Dunno',true,'foobar'),
					'EVT_metaval1'=>new EE_HTML_Field('meta_value', 'DUnnoeither', true, 'foobrarval')
				)
			
			);
		parent::__construct();
	}
}
class EEM_Exp_Question_Group extends EEM_Experimental_Base{
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
			'Question_Group'=>new EE_Main_Table('esp_question_group','QSG_ID')
		);
		$this->_model_relations = array(
			//woudl add a BelongsTorelation to events and other relations here
			'Event'=> new EE_Exp_HABTM('Event_Question_Group'),
		);
		$this->_fields = array(
			'Question_Group'=>array(
				'QSG_ID'=>new EE_Primary_Key_Int_Field('QSG_ID', 'Question Group ID', false, 0),
				'QSG_name'=>new EE_HTML_Field('QSG_name', 'Question Gruop Name', false, time())
			)
		);
		parent::__construct();
	}
}
//model for the joining between events and question groups
class EEM_Exp_Event_Question_Group extends EEM_Experimental_Base{
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
			'Event_Question_Group'=>new EE_Main_Table('esp_event_question_group','EQG_ID')
		);
		$this->_model_relations = array(
			//woudl add a BelongsTorelation to events and other relations here
			'Question_Group'=> new EE_Exp_Belongs_To(),
			'Event'=>new EE_Exp_Belongs_To()
		);
		$this->_fields = array(
			'Event_Question_Group'=>array(
				'EQG_ID'=>new EE_Primary_Key_Int_Field('EQG_ID', 'Relation ID between Event and Question Group', false, 0),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', 'Event ID', false, 0, 'Event'),
				'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID','Question Group ID',false, 0, 'Question_Group'),
				'EQG_primary'=>new EE_Integer_Field_Base('EQG_primary','Whether this Question Group only applies to primary attendees',false,0)
			)
		);
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
			'Registration'=>new EE_Main_Table('esp_registration','REG_ID')
		);
		$this->_model_relations = array(
			//woudl add a BelongsTorelation to events and other relations here
			'Transaction'=> new EE_Exp_Belongs_To(),
			'Event'=>new EE_Exp_Belongs_To()
		);
		$this->_fields = array(
			'Registration'=>array(
				'REG_ID'=>new EE_Primary_Key_Int_Field('REG_ID', 'Registration ID', false, 0),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', 'Event ID', false, 0, 'Event'),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID','Transaction ID',false, 0, 'Transaction'),
				'STS_ID'=>new EE_Enum_Field('STS_ID','Status Code',false,'RNA',array('RAP','RCN','RNA','RPN'))
			)
			
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
			'Transaction'=>new EE_Main_Table('esp_transaction','TXN_ID')
		);
		$this->_model_relations = array(
			'Registration'=>new EE_Exp_Has_Many(),
			//woudl add a BelongsTorelation to events and other relations here
		);
		$this->_fields = array(
			'Transaction'=>array(
				'TXN_ID'=>new EE_Primary_Key_Int_Field('TXN_ID', 'Transaction ID', false, 0),
				'STS_ID'=>new EE_Enum_Field('STS_ID','Status Code',false,'RNA',array('TIN','TCM','TPN','TOP'))
			)
			
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
	function __construct($table_column, $nicename, $nullable, $default_value){
		$this->_table_column = $table_column;
		$this->_nicename = $nicename;
		$this->_nullable = $nullable;
		$this->_default_value = $default_value;
	}
	function _construct_finalize($table_alias, $name){
				$this->_table_alias = $table_alias;
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
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%s';
	}
}
class EE_Integer_Field_Base extends EE_Exp_Model_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%d';
	}
}
abstract class EE_Float_Field_Base extends EE_Exp_Model_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%f';
	}
}
abstract class EE_Primary_Key_Field extends EE_Exp_Model_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct( $table_column, $nicename, $nullable, $default_value);
	}
}
class EE_Primary_Key_Int_Field extends EE_Primary_Key_Field{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%d';
	}
}
class EE_Primary_Key_String_Field extends EE_Primary_Key_Field{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%s';
	}
}
abstract class EE_Foreign_Key_Field extends EE_Exp_Model_Field_Base{
	protected $_model_name;
	function __construct($table_column, $nicename, $nullable, $default_value,$model_name){
		$this->_model_name = $model_name;
		parent::__construct($table_column, $nicename, $nullable, $default_value);	
	}
	function get_model_name_pointed_to(){
		return $this->_model_name;
	}
}
class EE_Foreign_Key_Int_Field extends EE_Foreign_Key_Field{
	function __construct($table_column, $nicename, $nullable, $default_value,$model_name){
		parent::__construct($table_column, $nicename, $nullable, $default_value,$model_name);	
	}
	function get_wpdb_data_type(){
		return '%d';
	}
}
class EE_Foreign_Key_String_Field extends EE_Foreign_Key_Field{
	function __construct($table_column, $nicename, $nullable, $default_value,$model_name){
		parent::__construct($table_column, $nicename, $nullable, $default_value,$model_name);	
	}
	function get_wpdb_data_type(){
		return '%s';
	}
}
class EE_HTML_Field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}
class EE_Enum_Field extends EE_Text_Field_Base{
	var $_allowed_enum_values;
	function __construct($table_column, $nicename, $nullable, $default_value, $allowed_enum_values){
		$this->_allowed_enum_values = $allowed_enum_values;
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}

class EE_Serialized_text_field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}
/**
 * Field for DB columns which don't correspond to model fields. Eg, on the Event model, which
 * should use the wp_posts and wp_esp_events_detail tables, there will be many fields on the wp_posts
 * table that don't correspond to any event model fields (eg, post_password). We may want to provide
 * special defautl values for them, or some other column-specific functionality. So we can add them as fields,
 * but db-only ones
 */
abstract class EE_DB_Only_Field extends EE_Exp_Model_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}
class EE_DB_Only_Int_Field extends EE_DB_Only_Field{
	function get_wpdb_data_type(){
		return '%d';
	}
}
class EE_DB_Only_Text_Field extends EE_DB_Only_Field{
	function get_wpdb_data_type(){
		return '%s';
	}
}
class EE_DB_Only_Float_Field extends EE_DB_Only_Field{
	function get_wpdb_data_type(){
		return '%f';
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
//model relation classes

/**
 * Model Relation classes are for defining relationships between models, and facilitating JOINs
 * between them during querying. They require knowing at least the model names of the two models
 * they join, and require each to have proper Private and Foreign key fields setup. (HABTM are different)
 * Once those two models are setup correctly, and the relation object has the names of each, it can
 * magically figure out what tables must be joined on what fields during querying.
 */
abstract class EE_Exp_Model_Relation{
	/**
	 * The model name of which this relation is a component (ie, the model taht called new EE_Exp_Model_Relation)
	 * @var string eg Event, Question_Group, Registration
	 */
	private $_this_model_name;
	/**
	 * The model name pointed to by this relation (ie, the model we want to establish a relationship to)
	 * @var string eg Event, Question_Group, Registration
	 */
	private $_other_model_name;
	/**
	 * Any extra SQL that we'd like to add when joining to the other model. Eg " AND Event.post_type = 'monkey'"
	 * @var string 
	 */
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
		return $this->_get_model($this->_this_model_name);
	}
	/**
	 * 
	 * @return EE_Experimental_Base
	 */
	function get_other_model(){
		return $this->_get_model($this->_other_model_name);
	}
	/**
	 * 
	 * @param string $model_name like Event, Question_Group, etc. omit the EEM_Exp_
	 * @return EE_Experimental_Base
	 */
	protected function _get_model($model_name){
		$modelInstance=call_user_func("EEM_Exp_".$model_name."::instance");
		return $modelInstance;
	}
	
	
	protected function _left_join($other_table,$other_table_alias,$other_table_column,$this_table_alias,$this_table_join_column, $extra_join_sql = ''){
		return " LEFT JOIN ".$other_table." AS ".$other_table_alias. " ON ".$other_table_alias.".".$other_table_column."=".$this_table_alias.".".$this_table_join_column." ".$extra_join_sql." ";
	}
	
	abstract function get_join_statement();
}

/**
 * In this relation, the OTHER model ahs the foreign key pointing to this model
 */
class EE_Exp_Has_Many extends EE_Exp_Model_Relation{	
	function __construct($extra_join_conditions = null){
		parent::__construct($extra_join_conditions);
	}
	function get_join_statement(){
		//create the sql string like
		// LEFT JOIN other_table AS table_alias ON this_table_alias.pk = other_table_alias.fk extra_join_conditions
		$this_table_pk_field = $this->get_this_model()->get_primary_key_field();
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
		$other_table_pk_field = $this->get_other_model()->get_primary_key_field();
		$this_table_alias = $this_table_fk_field->get_table_alias();
		$other_table_alias = $other_table_pk_field->get_table_alias();
		$other_table = $this->get_other_model()->get_table_for_alias($other_table_alias);		
		return $this->_left_join($other_table, $other_table_alias, $other_table_pk_field->get_table_column(), $this_table_alias, $this_table_fk_field->get_table_column(), $this->_extra_join_conditions);
	}
	//so far EE_Exp_Belongs_To is identical to EE_Exp_Has_Many
	//this is probably because we're explicitly requiring the relation
	//to identify the private key and foreign keys, where those could be determined from the models themselves
}

class EE_Exp_HABTM extends EE_Exp_Model_Relation{
	/**
	 * Model whicih defines the relation between two other models. Eg, the EE_Exp_Event_Question_Group model,
	 * which joins EE_Exp_Event and EE_Question_Group
	 * @var EEM_Experimental_Base
	 */
	private $_joining_model_name;
	function __construct($joining_model_name,$extra_join_conditions =''){
		$this->_joining_model_name = $joining_model_name;
		parent::__construct($extra_join_conditions);
	}
	/**
	 * Gets the joining model's object
	 * @return EEM_Experimental_Base
	 */
	function get_join_model(){
		return $this->_get_model($this->_joining_model_name);
	}
	/**
	 * Gets the SQL string for joining the main model's table containing the pk to the join table. Eg "LEFT JOIN real_join_table AS join_table_alias ON this_table_alias.pk = join_table_alias.fk_to_this_table"
	 * @return string of SQL
	 */
	function get_join_to_intermediate_model_statement(){
		//create sql like
		//LEFT JOIN join_table AS join_table_alias ON this_table_alias.this_table_pk = join_table_alias.join_table_fk_to_this
		//LEFT JOIN other_table AS other_table_alias ON join_table_alias.join_table_fk_to_other = other_table_alias.other_table_pk
		
		$this_table_pk_field = $this->get_this_model()->get_primary_key_field();//get_foreign_key_to($this->get_other_model()->get_this_model_name());
		$join_table_fk_field_to_this_table = $this->get_join_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		$this_table_alias = $this_table_pk_field->get_table_alias();
		
		$join_table_alias = $join_table_fk_field_to_this_table->get_table_alias();
		$join_table = $this->get_join_model()->get_table_for_alias($join_table_alias);	
		
		//phew! ok, we have all the info we need, now we can create the SQL join string
		$SQL = $this->_left_join($join_table, $join_table_alias, $join_table_fk_field_to_this_table->get_table_column(), $this_table_alias, $this_table_pk_field->get_table_column());
				
		return $SQL;
	}
	/**
	 * Gets the SQL string for joining the join table to the other model's pk's table. Eg "LEFT JOIN real_other_table AS other_table_alias ON join_table_alias.fk_to_other_table = other_table_alias.pk"
	 * If you want to join between modelA -> joinModelAB -> modelB (eg, Event -> Event_Question_Group -> Question_Group),
	 * you shoudl prepend the result of this function with results from get_join_to_intermediate_model_statement(),
	 * so that you join first to the intermediate join table, and then to the other model's pk's table
	 * @return string of SQL
	 */
	function get_join_statement(){
		$join_table_fk_field_to_this_table = $this->get_join_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		$join_table_alias = $join_table_fk_field_to_this_table->get_table_alias();
		
		$other_table_pk_field = $this->get_other_model()->get_primary_key_field();
		$join_table_fk_field_to_other_table = $this->get_join_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		$other_table_alias = $other_table_pk_field->get_table_alias();
		$other_table = $this->get_other_model()->get_table_for_alias($other_table_alias);
		
		$SQL = $this->_left_join($other_table, $other_table_alias, $other_table_pk_field->get_table_column(), $join_table_alias, $join_table_fk_field_to_other_table->get_table_column(), $this->_extra_join_conditions);
		return $SQL;
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////
//model table classes
abstract class EE_Table{
	var $_table_name;
	var $_table_alias;
	var $_extra_join_conditions;
	
	function __construct($table_name, $extra_join_conditions = null){
		global $wpdb;
		$this->_table_name = $wpdb->prefix . $table_name;
		
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
	
	function get_extra_join_conditions(){
		return $this->_extra_join_conditions;
	}
}

class EE_Other_Table extends EE_Table{
	protected $_fk_on_table;
	/**
	 * 
	 * @var EE_Main_Table 
	 */
	protected $_table_to_join_with;
	function __construct($table_name, $fk_column = null, $extra_join_conditions = null){
		$this->_fk_on_table = $fk_column;
		parent::__construct($table_name, $extra_join_conditions);
	}
	function get_fk_on_table(){
		return $this->_fk_on_table;
	}
	function _construct_finalize_set_table_to_join_with(EE_Table $table){
		$this->_table_to_join_with = $table;
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
		return " LEFT JOIN $table_name AS $table_alias ON $other_table_alias.$other_table_pk = $table_alias.$fk ";
	}
}
class EE_Main_Table extends EE_Table{
	/**
	 *
	 * @var string
	 */
	protected $_pk_column;
	function __construct($table_name, $pk_column = null, $extra_join_conditions = null){
		$this->_pk_column = $pk_column;
		parent::__construct($table_name, $extra_join_conditions);
	}
	/**
	 * 
	 * @return string name of column of PK
	 */
	function get_pk_column(){
		return $this->_pk_column;
	}
}
/**
* Internal class for simply carrying data during the EEM_Experimental_Base::_extract_related_model_info_from_query_param method.
* We could have returned an array
* with two keys 'join_sql' and 'data_types', but this better-defines the data being passed around
*/
class EE_Model_Query_Info_Carrier extends EE_Base{
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
   /**
    * After we've acquired all the data types, we can create this sql.
    * @var string 
    */
   private $_where_sql;
   /**
    * Full join sql. Eg, in a select query, that's everything after the "FROM", and before the "WHERE", so it includes
    * the declaration of the main model's tables, and then appends all the joining sql to other models
    * @var string 
    */
   private $_main_join_sql;
   /**
    * 
    * @param type $model_included_name
    * @param type $join_sql
    * @param type $data_types
    */
   public function __construct($model_included_name= array(), $join_sql = '', $data_types =array()){
	   $this->_models_included = $model_included_name;
	   $this->_join_sql = $join_sql;
	   $this->_data_types = $data_types;
   }
   
   /**
    * Merges info from the other EEM_Exp_Related_Model_Info_Carrier into this one.
    * @param EE_Model_Query_Info_Carrier $other_join_sql_and_data_types_carrier
    */
   public function merge( $other_join_sql_and_data_types_carrier ){
	   if( $other_join_sql_and_data_types_carrier && ! $this->_have_already_included_one_of_these_models($other_join_sql_and_data_types_carrier->get_model_names_included())){
		   $model_included_on_other_join_sql_and_data_types_carrier =  $other_join_sql_and_data_types_carrier->get_model_names_included();
		   $this->_models_included = array_merge( $this->_models_included, $model_included_on_other_join_sql_and_data_types_carrier );
			$this->_join_sql .= $other_join_sql_and_data_types_carrier->_join_sql;
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
   public function get_data_types(){
	   return $this->_data_types;
   }
   /**
    * sets the $where_sql for later use from client code
    * @param string $where_sql
    */
   public function set_where_sql($where_sql){
	   $this->_where_sql = $where_sql;
   }
   public function get_where_sql(){
	   return $this->_where_sql;
   }
   /**
    * Prepends the main model join sql onto the already-added other-model-join-sql,
    * to make the full join sql statement (in a select, that's everything after the FROM and before
    * the WHERE. In an update that's everything after the UPDATE and before the SET. In a delete, that's
    * after the FROM and before the WHERE.)
    * @param string $join_sql
    */
   public function set_main_model_join_sql($join_sql){
	   $this->_main_join_sql = $join_sql;
   }
   public function get_full_join_sql(){
	   return $this->_main_join_sql . $this->_join_sql;
   }
}

class EE_Exp_Base_Class{
	/**
	 * basic constructor for Event Espresso classes, performs any necessary initialization,
	 * and verifies it's children play nice
	 */
	public function __construct($fieldValues=null){
		$className=get_class($this);
		do_action("action_hook_espresso__{$className}__construct",$this,$fieldValues);
		//$model=$this->_get_model();
		if($fieldValues!=null){
			foreach($fieldValues as  $fieldName=>$fieldValue){
				//"<br>set $fieldName to $fieldValue";
				$this->set($fieldName,$fieldValue,true);
			}
		}
		//verify we have all the attributes required in teh model
//		foreach($model->fields_settings() as $fieldName=>$fieldSettings){
//			if(!property_exists($this,$this->_get_private_attribute_name($fieldName))){
//				throw new EE_Error(sprintf(__('You have added an attribute titled \'%s\' to your model %s, but have not set a corresponding
//					attribute on %s. Please add $%s to %s','event_espresso'),
//						$fieldName,get_class($model),get_class($this),$this->_get_private_attribute_name($fieldName),get_class($this)));
//			}
//		}
//		//verify we have all the model relations
//		foreach($model->relation_settings() as $relationName=>$relationSettings){
//			if(!property_exists($this,$this->_get_private_attribute_name($relationName))){
//				throw new EE_Error(sprintf(__('You have added a relation titled \'%s\' to your model %s, but have not set a corresponding
//					attribute on %s. Please add protected $%s to %s','event_espresso'),
//						$relationName,get_class($model),get_class($this),$this->_get_private_attribute_name($relationName),get_class($this)));
//			}
//		}
	}
	/**
	 * Overrides parent because parent expects old models.
	 * This also doesn't do any validation, and won't work for serialized arrays
	 * @param type $field_name
	 * @param type $field_value
	 * @param type $use_default
	 */
	public function set($field_name,$field_value,$use_default= false){
		$privateAttributeName=$this->_get_private_attribute_name($field_name);
		$this->$privateAttributeName = $field_value;
	}
	/**
	 * converts a field name to the private attribute's name on teh class.
	 * Eg, converts "ANS_ID" to "_ANS_ID", which can be used like so $attr="_ANS_ID"; $this->$attr;
	 * @param string $fieldName
	 * @return string
	 */
	private function _get_private_attribute_name($fieldName){
		return "_".$fieldName;
	}
	/**
	 * Gets the EEM_*_Model for this class
	 * @access public now, as this is more convenient 
	 * @return EEM_Experimental_Base
	 */
	public function  _get_model(){
		//find model for this class
		$modelName=$this->_get_model_name();
		//@todo: make all these classes exist, so requiring WILL be appropriate require_once($modelName.".model.php");
		//include_once($modelName.".model.php");
		//$modelObject=new $modelName;
		$model=call_user_func($modelName."::instance");
		return $model;
	}
	/**
	 * Gets the model's name for this class. Eg, if this class' name is 
	 * EE_Answer, it will return EEM_Answer.
	 * @return string
	 */
	private function _get_model_name(){
		$className=get_class($this);
		$modelName=str_replace("EE_","EEM_",$className);
		return $modelName;
	}
	
	/**
	 * returns the name of the primary key attribute
	 * @return string
	 */
	protected function _get_primary_key_name(){
		return $this->_get_model()->get_primary_key_field()->get_name();
	}
	/**
	 * Gets the value of the primary key.
	 * @return mixed, if the primary key is of type INT it'll be an int. Otherwise it could be a string
	 */
	public function ID(){
		//get the name of teh primary key for this class' model, then find what php class attribute's name
		$pk_field_parameter = $this->_get_private_attribute_name($this->_get_primary_key_name());
		//now that we know the name of the variable, use a variable variable to get its value and return its 
		return $this->$pk_field_parameter;
	}
	
	
}

/**
 * Small example class for Events.
 */
class EE_Exp_Event extends EE_Exp_Base_Class{
	protected $_EVT_ID;
	protected $_EVT_desc;
	protected $_EVT_metakey1;
	protected $_EVT_metaval1;
	/**
	 *
	 * @var EE_Registration[]
	 */
	protected $_Registration;
	/**
	 *
	 * @var EE_Event_Question_Group[]
	 */
	protected $_Event_Question_Group;
	/**
	 * @var EE_Question_Group
	 */
	protected $_Question_Group;
	/**
	 * Constructor
	 * @param int $REG_ID registration ID OR an array of all field values, where keys match these arguments' names
	 * @param int $QST_ID question ID
	 * @param string $ANS_value text representing the answer. Could be CSV'd
	 */
	public function __construct( $EVT_ID=NULL, $EVT_desc=NULL, $EVT_metakey1='', $_EVT_metaval1 ='') {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		//@todo: need to generalize constructor
		if(is_array($EVT_ID)){
			parent::__construct($EVT_ID);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
		
	}
	
	
	
}