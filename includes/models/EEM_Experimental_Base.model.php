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
	protected function __construct(){
		foreach($this->_tables as $table_alias => $table_obj){
			$table_obj->_construct_finalize_with_alias($table_alias);
			if($table_obj instanceof EE_Secondary_Table){
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
	/**
	 * Gets an array of objects that correspond to the current model according to the $query_params
	 * @param array $query_params
	 * @return EE_Exp_Base_Class[]
	 */
	function get_all($query_params = array()){
		return $this->_create_objects($this->_get_all_wpdb_results($query_params));
	}
	
	
	
	/**
	 * Used internally to get WPDB results, because other functions, besides get_all, may want to do some queries, but may want to
	 * preserve the WPDB results (eg, update, which first queries to make sure we have all the tables on the model)
	 * @global type $wpdb
	 * @param array $query_params like EEM_Experimental_Base::get_all's $query_params
	 * @return stdClass[] like results of $wpdb->get_results($sql,OBJECT), (ie, output type is OBJECT)
	 */
	private function _get_all_wpdb_results($query_params = array()){
		global $wpdb;
		$model_query_info = $this->_create_model_query_info_carrier($query_params);
		$SQL ="SELECT ".$this->_construct_select_sql()." FROM ".$model_query_info->get_full_join_sql()." WHERE ".$model_query_info->get_where_sql();
		echo "get all SQL:".$SQL;
		return $wpdb->get_results($SQL, ARRAY_A);
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
	 * Gets all the tables comprising this model. Array keys are the table aliases, and values are EE_Table objects
	 * @return EE_Table[]
	 */
	function get_tables(){
		return $this->_tables;
	}
	/**
	 * Updates all the entries (in each table for this model) according to $fields_n_values, where the criteria expressed in $query_params are met..
	 * Also note: if this model has multiple tables, this update verifies all the secondary tables have an entry for each row (in the primary table) we're trying to update; if not,
	 * it inserts an entry in the secondary table.
	 * Eg: if our model has 2 tables: wp_posts (primary), and wp_esp_event (seconary). Let's say we are trying to update a model object with EVT_ID = 1 
	 * (which means where wp_posts has ID = 1, because wp_posts.ID is the primary key's column), which exists, but there is no entry in wp_esp_event for this entry in wp_posts.
	 * So, this update script will insert a row into wp_esp_event, using any available parameters from $fields_n_values (eg, if "EVT_limit" => 40 is in $fields_n_values,
	 * the new entry in wp_esp_event will set EVT_limit = 40, and use default for other columns which are not specified)
	 * @param array $fields_n_values keys are model fields (exactly like keys in EEM_Experimental::_fields, NOT db columns!), values are strings, ints, floats, and maybe arrays if they are to be serialized
	 * @param array $query_params very much like EEM_Experimental_Base::get_all's $query_params
	 * @return int how many rows got updated
	 */
	function update($fields_n_values, $query_params){
		global $wpdb;
		//need to verify that, for any entry we want to update, there are entries in each secondary table.
		//to do that, for each table, verify that it's PK isn't null.
		$tables= $this->get_tables();
		//if there are more than 1 tables, we'll want to verify that each table for this model has an entry in the other tables
		//and if the other tables don't have a row for each table-to-be-updated, we'll insert one with whatever values available in the current update query
		if(count($tables) > 1){
			$wpdb_select_results = $this->_get_all_wpdb_results($query_params);
			foreach($wpdb_select_results as $wpdb_result){
				//get the model object's PK, as we'll want this if we need to insert a row into secondary tables
				$main_table_pk_column = $this->get_primary_key_field()->get_qualified_column();
				$main_table_pk_value = $wpdb_result[ $main_table_pk_column ];
				//foreach matching row in the DB, ensure that each table's PK isn't null. If so, there must not be an entry 
				//in that table, and so we'll want to insert one
				foreach($tables as $table_alias => $table_obj){
					$this_table_pk_column = $table_obj->get_fully_qualified_pk_column();
					//if there is no private key for this table on the results, it means there's no entry
					//in this table, right? so insert a row in the current table, using any fields available
					if( ! (array_key_exists($this_table_pk_column, $wpdb_result)  &&  $wpdb_result[ $this_table_pk_column ]) ){
						$this->_insert_into_specific_table($table_obj, $fields_n_values, $main_table_pk_value);
					}
				}
			}
		}
		
		$model_query_info = $this->_create_model_query_info_carrier($query_params);
		$SQL = "UPDATE ".$model_query_info->get_full_join_sql()." SET ".$this->_construct_update_sql($fields_n_values)." WHERE ".$model_query_info->get_where_sql();
		$rows_affected = $wpdb->query($SQL);
		return $rows_affected;//how many supposedly got updated
	}	
	
	
	/**
	 * Makes the SQL for after "UPDATE tablex inner join tabley..." and before "...WHERE". Eg "Question.name='party time?', Question.desc='what do you think?',..."
	 * Values are filtered through wpdb->prepare to avoid against SQL injection, but currently no further filtering is done
	 * @global type $wpdb
	 * @param array $fields_n_values array keys are field names on this model, and values are what those fields should be updated to in the DB
	 * @return string of SQL 
	 */
	function _construct_update_sql($fields_n_values){
		global $wpdb;
		$cols_n_values = array();
		foreach($fields_n_values as $field_name => $value){
			$field = $this->field_settings_for($field_name);
			$cols_n_values[] = $field->get_qualified_column()."=".$wpdb->prepare($field->get_wpdb_data_type(),$value);
		}
		return implode(",",$cols_n_values);
		
	}
	/**
	 * 
	 * @param array $query_params very much like EEM_Experimental_Base::get_all's $query_params
	 * @return int how many rows got deleted
	 */
	function delete($query_params){
		global $wpdb;
		//some MySQL databases may be running safe mode, which may restrict
		//deletion if there is no KEY column used in the WHERE statement of a deletion.
		//to get around this, we first do a SELECT, get all the IDs, and then run another query
		//to delete them
		$objects_for_deletion = $this->get_all($query_params);
		//echo "objects for deletion:";var_dump($objects_for_deletion);
		$model_query_info = $this->_create_model_query_info_carrier($query_params);
		$table_aliases = array();
		foreach(array_keys($this->_tables) as $table_alias){
			$table_aliases[] = $table_alias;
		}
		$SQL = "DELETE ".implode(", ",$table_aliases)." FROM ".$model_query_info->get_full_join_sql()." WHERE ".$this->get_primary_key_field()->get_qualified_column()." IN (".implode(",",array_keys($objects_for_deletion)).")";
//		/echo "delete sql:$SQL";
		$rows_deleted = $wpdb->query($SQL);
		//$wpdb->print_error();
		return $rows_deleted;//how many supposedly got updated
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
	 * @param EE_Exp_Base_Class/int $thisModelObject
	 * @param EE_Exp_Base_Class/int $id_or_obj EE_base_Class or ID of other Model Object
	 * @param string $relationName, key in EEM_Experimental_Base::_relations
	 * an attendee to a group, you also want to specify which role they will have in that group. So you would use this parameter to specificy array('role-column-name'=>'role-id')
	 * @return boolean of success
	 */
	public function add_relationship_to($id_or_obj,$other_model_id_or_obj, $relationName){
		$relation_obj = $this->related_settings_for($relationName);
		$relation_obj->add_relation_to($id_or_obj, $other_model_id_or_obj);
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
	 * @param EE_Exp_Base_Class/int $id_or_obj
	 * @param EE_Exp_Base_Class/int $other_model_id_or_obj EE_Exp_Base_Class or ID of other Model Object
	 * @param string $relationName key in EEM_Experimental_Base::_relations
	 * @return boolean of success
	 */
	public function remove_relationship_to($id_or_obj,  $other_model_id_or_obj, $relationName){
		$relation_obj = $this->related_settings_for($relationName);
		$relation_obj->remove_relation_to($id_or_obj, $other_model_id_or_obj);
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
	 * @param type $field_n_values
	 * @return int primary key on main table from insertions
	 * @throws EE_Error
	 */
	function insert($field_n_values){
		$main_table = $this->_get_main_table();
		$new_id = $this->_insert_into_specific_table($main_table, $field_n_values);
		foreach($this->_get_other_tables() as $other_table){
			$this->_insert_into_specific_table($other_table, $field_n_values,$new_id);
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

		if($table instanceof EE_Secondary_Table && $new_id){
			//its not the main table, so we should have already saved teh main table's PK which we just inserted
			//so add the fk to the main table as a column
			$insertion_col_n_values[$table->get_fk_on_table()] = $new_id;
			$format_for_insertion[]='%d';//yes right now we're only allowing these foreign keys to be INTs
		}
		//insert the new entry
		$result = $wpdb->insert($table->get_table_name(),$insertion_col_n_values,$format_for_insertion);
		if(!$result){
			throw new EE_Error(sprintf(__("Error inserting values %s for columns %s, using data types %s, into table %s. Error was %s",'event_espresso'),
					implode(",",$insertion_col_n_values),
					implode(",",array_keys($insertion_col_n_values)),
					implode(",",$format_for_insertion),
					$table->get_table_name(),
					$wpdb->last_error
					));
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
	 * @return EE_Secondary_Table[]
	 */
	protected function _get_other_tables(){
		$other_tables =array();
		foreach($this->_tables as $table_alias => $table){
			if($table instanceof EE_Secondary_Table){
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
			$query_object = $this->_extract_related_models_from_query($where_array);
			$query_object->set_where_sql( $this->_construct_where_clause($where_array, $query_object->get_data_types()));
		}else{
			$query_object = $this->_extract_related_models_from_query(array());
		}
		$query_object->set_main_model_join_sql($this->_construct_internal_join());
		return $query_object;
	}
	
	/**
	 * Creates the string of SQL for the select part of a select query, everything behind SELECT and before FROM.
	 * Eg, "Event.post_id, Event.post_name,Event_Detail.EVT_ID..."
	 * @return string
	 */
	public function _construct_select_sql(){
		$fields = $this->field_settings();
		$selects = array();
		foreach($fields as $field_name => $field_obj){
			$selects[] = $field_obj->get_table_alias().".".$field_obj->get_table_column()." AS '".$field_obj->get_table_alias().".".$field_obj->get_table_column()."'";
		}
		//make sure we are also getting the PKs of each table
		$tables = $this->get_tables();
		if(count($tables) > 1){
			foreach($tables as $table_alias => $table_obj){
				$qualified_pk_column = $table_obj->get_fully_qualified_pk_column();
				if( ! in_array($qualified_pk_column,$selects)){
					$selects[] = "$qualified_pk_column AS '$qualified_pk_column'";
				}
			}
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
	 * Givena field's name (ie, a key in $this->field_settings()), uses the EE_Model_Field object to get the table's alias and column
	 * which corresponds to it
	 * @param string $field_name
	 */
	function _get_qualified_column_for_field($field_name){
		$all_fields = $this->field_settings();
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
			}elseif($table_obj instanceof EE_Secondary_Table){
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
		foreach(array_values($this->field_settings()) as $field_obj){
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
	 * Returns the array of EE_ModelRelations for this model.
	 * @return EE_Exp_Model_Relation[]
	 */
	public function relation_settings(){
		return $this->_model_relations;
	}
	
	
	
	/**
	 * Returns the specified EE_Exp_Model_Relation, or throws an exception
	 * @param string $relation_name name of relation, key in $this->_relatedModels
	 * @return EE_Model_Relation
	 */
	public function related_settings_for($relation_name){
		$relatedModels=$this->relation_settings();
		if(!array_key_exists($relation_name,$relatedModels)){
			throw new EE_Error(sprintf(__('Cannot get %s related to %s. There is no model relation of that type. There is, however, %s...','event_espresso'),$relation_name,  $this->_getClassName(),implode(array_keys($relatedModels))));
		}
		return $relatedModels[$relation_name];
	}
	
	
	
	/**
	 * A convenience method for getting a specific field's settings, instead of getting all field settings for all fields
	 * @param string $fieldName
	 * @return EE_Model_Field
	 */
	public function field_settings_for($fieldName){
		$fieldSettings=$this->field_settings();
		if(!array_key_exists($fieldName,$fieldSettings)){
			throw new EE_Error(sprintf(__('There is no field/column %s on %s','event_espresso'),$fieldName,get_class($this)));
		}
		return $fieldSettings[$fieldName];
	}
	

	
	/**
	 * gets the name of the field of type 'primary_key' from the fieldsSettings attribute.
	 * Eg, on EE_Anwer that would be ANS_ID
	 * @return EE_Exp_Model_Field
	 * @throws EE_Error
	 */
	public function get_primary_key_field(){
		foreach($this->field_settings() as $field){
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
		foreach($this->field_settings() as $field){
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
	public function field_settings(){
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
		$filepath = $className.".class.php";
		if(!class_exists($className)){
			if(file_exists($filepath)){
				require_once($filepath);
			}else{
				throw new EE_Error(sprintf(__('There is no file titled %s, nor class %s. They must exist in order for %s to work','event_espresso'),$filepath,$className, get_class($this)));
			}
		}
		if(!class_exists($className)){
			throw new EE_Error(sprintf(__('There is class with name %s contained in file %s.class.php. You must create one','event_espresso'),$className,$className));
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
			foreach($this->field_settings() as $field_name => $field_obj){
				//ask the field what it think it's table_name.column_name should be, and call it the "qualified column"
				$field_qualified_column = $field_obj->get_qualified_column();
				//does the field on the model relate to this column retrieved from teh db? 
				//or is it a db-only field? (not relating to the model)
				if($field_qualified_column == $col && !$field_obj->is_db_only_field()){
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
	 * @param EE_Exp_Base_Class/int $base_class_obj_or_id either teh EE_Base_Class taht corresponds to this Model, or its ID
	 * @param boolean $ensure_is_in_db if set, we will also verify this model object exists in the database. If it does not, we add it
	 * @return EE_Exp_Base_Class
	 */
	public function ensure_is_obj($base_class_obj_or_id, $ensure_is_in_db = false){ 
		if(is_a($base_class_obj_or_id,$this->_get_class_name())){
			$model_object = $base_class_obj_or_id;
		}elseif(is_int($base_class_obj_or_id)){//assume it's an ID
			$model_object = $this->get_one_by_ID($base_class_obj_or_id);
		}else{
			throw new EE_Exception(sprintf(__("'%s' is neither an object of type %s, nor an ID!",'event_espresso'),$base_class_obj_or_id,$this->_getClasssName()));
		}
		if( $model_object->ID() == NULL && $ensure_is_in_db){
			$model_object->save();
		}
		return $model_object;
		
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

	
	protected function __construct(){
		$this->_tables = array(
			'Event' => new EE_Main_Table('posts','ID'),
			'Event_Meta' => new EE_Secondary_Table('postmeta','meta_id', 'post_id',"Event.post_type = 'page'"));
		$this->_model_relations = array(
			'Registration'=>new EE_Exp_Has_Many(),
			'Question_Group'=>new EE_Exp_HABTM('Event_Question_Group'),
			'Event_Question_Group'=>new EE_Exp_Has_Many());
		$this->_fields = array(
				'Event'=>array(
					'EVT_ID'=>new EE_Primary_Key_Int_Field('ID', 'Event ID', false, 0),
					'EVT_desc'=>new EE_HTML_Field('post_content','Event Description',true,''),
					'db_only_post_type'=>new EE_DB_Only_Text_Field('post_type','All Post types for Events should be \'event\'',false,'event')),
				'Event_Meta'=>array(
					'EVT_metakey1'=>new EE_Plain_Text_Field('meta_key','Dunno',true,'foobarplaintext'),
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

	protected function __construct(){
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
				'QSG_name'=>new EE_HTML_Field('QSG_name', 'Question Gruop Name', false, time()),
				'QSG_identifier'=>new EE_Plain_Text_Field('QSG_identifier', 'Unique ID for Question Group', false, time())
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

	protected function __construct(){
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

	protected function __construct(){
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

	
	protected function __construct(){
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
/**
 * Base class for all EE_Exp_*_Field classes. These classes are for providing information and functions specific to each
 * field. They define the field's data type for insertion into the db (eg, if the value should be treated as an int, float, or string),
 * what values for the field are acceptable (eg, if setting EVT_ID to a float is acceptable), and generally any functionality within 
 * EEM_Experimental_Base or EE_Exp_Base_Class which depend on the field's type. (ie, you shouldn't need any logic within your model
 * or model object which are dependent on the field's type, ideally). For example, EE_Serialized_Text_Field, specifies that any fields of this type
 * should be serialized before insertion into the db (prepare_for_insertion_into_db()), 
 * should be considered a string when inserting, updating, or using in a where clause for any queries (get_wpdb_data_type()),
 * should be unserialized when being retrieved from the db (prepare_for_set_from_db()), and whatever else.
 */
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
	/**
	 * When get() is called on a model object (eg EE_Event), before returning its value,
	 * call this function on it, allowing us to customize the returned value based on
	 * the field's type. Eg, we may want ot serialize it, strip tags, etc. By default,
	 * we simply return it.
	 * @param mixed $value_of_field_on_model_object
	 * @return mixed
	 */
	function prepare_for_get($value_of_field_on_model_object){
		return $value_of_field_on_model_object;
	}
	/**
	 * When inserting or updating a field on a model object, run this function on each
	 * value to prepare it for insertion into the db. We may want to add slashes, serialize it, etc.
	 * By default, we do nothing.
	 * @param mixed $value_of_field_on_model_object
	 * @return mixed
	 */
	function prepare_for_insertion_into_db($value_of_field_on_model_object){
		return $value_of_field_on_model_object;
	}
	
	/**
	 * When creating a brand-new model object, or setting a particular value for one of its fields, this function
	 * is called before setting it on the model object. We may want to strip slashes, unserialize the value, etc.
	 * By default, we do nothing.
	 * @param mixed $value_inputted_for_field_on_model_object
	 * @return mixed
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object){
		return $value_inputted_for_field_on_model_object;
	}
	
	
	/**
	 * When instantiating a model object from DB results, this function is called before setting each field.
	 * We may want to serialize the value, etc. By default, we do nothing.
	 * @param mixed $value_found_in_db_for_model_object
	 * @return mixed
	 */
	function prepare_for_set_from_db($value_found_in_db_for_model_object){
		return $value_found_in_db_for_model_object;
	}
	
	/**
	 * When echoing a field's value on a model object, this function is run to prepare the value for presentation in a webpage.
	 * For example, we may want to output floats with 2 decimal places by default, dates as "Monday Jan 12, 2013, at 3:23pm" instead of
	 * "8765678632", or any other modifications to how the value should be displayed, but not modified itself. 
	 * @param mixed $value_on_field_to_be_outputted
	 * @return mixed
	 */
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted){
		return $value_on_field_to_be_outputted;
	}
	
	abstract function get_wpdb_data_type();
	
	/**
	 * Some fields are in the database-only, (ie, used in queries etc), but shouldn't necessarily be part
	 * of the model objects (ie, client code shouldn't care to ever see their value... if client code does
	 * want to see their value, then they shouldn't be db-only fields!)
	 * Eg, when doing events as custom post types, querying the post_type is essential, but
	 * post_type is irrelevant for EE_Exp_Event objects (because they will ALL be of post_type 'esp_event').
	 * By default, all fields aren't db-only.
	 * @return boolean
	 */
	function is_db_only_field(){
		return false;
	}
}
/**
 * Text_Fields is a base class for any fields which are have text value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
abstract class EE_Text_Field_Base extends EE_Exp_Model_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%s';
	}
}
/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Integer_Field_Base extends EE_Exp_Model_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%d';
	}
}
/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
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
class EE_Plain_Text_Field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	/**
	 * removes all tags when setting
	 * @param string $value_inputted_for_field_on_model_object
	 * @return string
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return strip_tags($value_inputted_for_field_on_model_object);
	}
}
class EE_Enum_Field extends EE_Text_Field_Base{
	var $_allowed_enum_values;
	function __construct($table_column, $nicename, $nullable, $default_value, $allowed_enum_values){
		$this->_allowed_enum_values = $allowed_enum_values;
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
}
/**
 * Serialized text field should basically: accept either an array or serialized text as input.
 * When initally set by client code (ie, not EEM_Experimental_Base or children), the value should remain an array.
 * However, when inserting into the DB, it should be serialized.
 * Upon retrieval from the DB, it should be unserialized back into an array.
 */
class EE_Serialized_Text_Field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	/**
	 * Value SHOULD be an array, and we want to now convert it to a serialized string
	 * @param array $value_of_field_on_model_object
	 * @return string
	 */
	function prepare_for_insertion_into_db($value_of_field_on_model_object) {
		return maybe_serialize($value_of_field_on_model_object);
	}
	/**
	 * Value provided should definetely be a serialized string. We should unserialize into an array
	 * @param string $value_found_in_db_for_model_object
	 * @return array
	 */
	function prepare_for_set_from_db($value_found_in_db_for_model_object) {
		return maybe_unserialize($value_found_in_db_for_model_object);
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
	/**
	 * All these children classes are for the db-only (meaning, we should select them
	 * on get_all queries, update, delete, and will still want to set their default value
	 * on inserts, but the model object won't have reference to these fields)
	 * @return boolean
	 */
	function is_db_only_field() {
		return true;
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
	 * @return EEM_Experimental_Base
	 */
	function get_this_model(){
		return $this->_get_model($this->_this_model_name);
	}
	/**
	 * 
	 * @return EEM_Experimental_Base
	 */
	function get_other_model(){
		return $this->_get_model($this->_other_model_name);
	}
	/**
	 * 
	 * @param string $model_name like Event, Question_Group, etc. omit the EEM_Exp_
	 * @return EEM_Experimental_Base
	 */
	protected function _get_model($model_name){
		$modelInstance=call_user_func("EEM_Exp_".$model_name."::instance");
		return $modelInstance;
	}
	
	
	protected function _left_join($other_table,$other_table_alias,$other_table_column,$this_table_alias,$this_table_join_column, $extra_join_sql = ''){
		return " LEFT JOIN ".$other_table." AS ".$other_table_alias. " ON ".$other_table_alias.".".$other_table_column."=".$this_table_alias.".".$this_table_join_column." ".$extra_join_sql." ";
	}
	/**
	 * Gets the SQL string for performing the join between this model and the other model.
	 * @return string of SQL, eg "LEFT JOIN table_name AS table_alias ON this_model_primary_table.pk = other_model_primary_table.fk" etc
	 */
	abstract function get_join_statement();
	
	
	/**
	 * Adds a reltionships between the two model objects provided. Each type of relationship handles this differently (EE_Exp_Belongs_To is a 
	 * slight exception, it should more accurately be called set_relation_to(...), as this relationship only allows this model to be related
	 * to a signel other model of this type)
	 */
	abstract function add_relation_to($this_obj_or_id, $other_obj_or_id);
	/**
	 * Similar to 'add_relation_to(...)', performs the opposite action of removing the relationship between the two model objects
	 */
	abstract function remove_relation_to($this_obj_or_id, $other_obj_or_id);
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
	/**
	 * Sets the other model object's foreign key to this model object's primary key. Feel free to do this manually if you like.
	 * @param EE_Exp_Base_Class/int $this_obj_or_id
	 * @param EE_Exp_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function add_relation_to($this_obj_or_id, $other_obj_or_id ){
		 $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		 
		 //find the field on th eother model which is a foreign key to this model
		 $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 //set that field on the other model to this model's ID
		 $other_model_obj->set($fk_field_on_other_model->get_name(), $this_model_obj->ID());
		 $other_model_obj->save();
	 }
	/**
	 * Sets the other model object's foreign key to its default, instead of pointing to this model object
	 * @param EE_Exp_Base_Class/int $this_obj_or_id
	 * @param EE_Exp_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function remove_relation_to($this_obj_or_id, $other_obj_or_id){
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		 //find the field on th eother model which is a foreign key to this model
		 $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 //set that field on the other model to this model's ID
		 $other_model_obj->set($fk_field_on_other_model->get_name(),null, true);
		 $other_model_obj->save();
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
	/**
	 * Sets this model object's foreign key to the other model object's primary key. Feel free to do this manually if you like.
	 * @param EE_Exp_Base_Class/int $this_obj_or_id
	 * @param EE_Exp_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function add_relation_to($this_obj_or_id, $other_obj_or_id ){
		 $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		 //find the field on th eother model which is a foreign key to this model
		 $fk_on_this_model = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		 //set that field on the other model to this model's ID
		 $this_model_obj->set($fk_on_this_model->get_name(), $other_model_obj->ID());
		 $this_model_obj->save();
	 }
	/**
	 * Sets the this model object's foreign key to its default, instead of pointing to the other model object
	 * @param EE_Exp_Base_Class/int $this_obj_or_id
	 * @param EE_Exp_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function remove_relation_to($this_obj_or_id, $other_obj_or_id){
		 $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 //find the field on th eother model which is a foreign key to this model
		 $fk_on_this_model = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		 //set that field on the other model to this model's ID
		 $this_model_obj->set($fk_on_this_model->get_name(),null, true);
		 $this_model_obj->save();
	 }
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
	
	/**
	 * Ensures there is an entry in the join table between these two models. Feel free to do this manually if you like.
	 * If the join table has additional columns (eg, the Event_Question_Group table has a is_primary column), then you'll
	 * want to directly use the EEM_Exp_Event_Question_Group model to add the entry to the table and set those other columns' values
	 * @param EE_Exp_Base_Class/int $this_obj_or_id
	 * @param EE_Exp_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function add_relation_to($this_obj_or_id, $other_obj_or_id ){
		 $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 echo "this model obj";var_dump($this_model_obj);
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		//check if such a relationship already exists
		 $join_model_fk_to_this_model = $this->get_join_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 $join_model_fk_to_other_model = $this->get_join_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		 $existing_entry_in_join_table = $this->get_join_model()->get_one(array(
			 array(
				 $join_model_fk_to_this_model->get_name() => $this_model_obj->ID(),
				 $join_model_fk_to_other_model->get_name() => $other_model_obj->ID())));
		//if there is already an entry in the join table, indicating a relationship, we're done
		 //again, if you want more sophisticated logic or insertions (handling more columns than just 2 foreign keys to
		 //the other tables, use the joining model directly!
		 if( ! $existing_entry_in_join_table ){
			$this->get_join_model()->insert(
					array(
						$join_model_fk_to_this_model->get_name() => $this_model_obj->ID(),
						$join_model_fk_to_other_model->get_name() => $other_model_obj->ID()
					));
		}
	 }
	/**
	 * Deletes any rows in the join table that have foreign keys matching the other model objects specified
	 * @param EE_Exp_Base_Class/int $this_obj_or_id
	 * @param EE_Exp_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function remove_relation_to($this_obj_or_id, $other_obj_or_id){
		  $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		//check if such a relationship already exists
		 $join_model_fk_to_this_model = $this->get_join_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 $join_model_fk_to_other_model = $this->get_join_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		 $existing_entry_in_join_table = $this->get_join_model()->delete(array(
			 array(
				 $join_model_fk_to_this_model->get_name() => $this_model_obj->ID(),
				 $join_model_fk_to_other_model->get_name() => $other_model_obj->ID())));
		
	 }
}



///////////////////////////////////////////////////////////////////////////////////////////////
//model table classes
abstract class EE_Table{
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
			throw new EE_Error("You must call _construct_finalize_with_alias before using thie EE_Table. Did you forget to call parent::__construct at the end of your EEM_Experimental_Base child's __construct?");
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
}

class EE_Secondary_Table extends EE_Table{
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
	function _construct_finalize_set_table_to_join_with(EE_Table $table){
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
}
class EE_Main_Table extends EE_Table{
	
	function __construct($table_name, $pk_column = null, $extra_join_conditions = null){
		parent::__construct($table_name, $pk_column,  $extra_join_conditions);
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
	 * @param array $fieldValues where each key is a field (ie, array key in the 2nd layer of the model's _fields array, (eg, EVT_ID, TXN_amount, QST_name, etc)
	 * and valuse are their values
	 */
	public function __construct($fieldValues=null){
		$className=get_class($this);
		do_action("action_hook_espresso__{$className}__construct",$this,$fieldValues);
		$model=$this->_get_model();
		//if the primary key field is provided in $fieldValues, assume we're constructing it from DB results
		//and call prepare_for_set_from_db instead of prepare_for_set on the field object
		$pk_field_obj = $this->_get_model()->get_primary_key_field();
		if(array_key_exists($pk_field_obj->get_name(), $fieldValues)){
			//the primary key is in the constructor's first arg's array, so assume we're constructing from teh DB
			//(otherwise: why would we already know the primary key's value, unless we fetched it from the DB?)
			foreach($fieldValues as $field_name => $field_value_from_db){
				$this->set_from_db($field_name,$field_value_from_db);
			}
		}else{
			//the primary key  isn't in the constructor's first arg's array, so assume we're constructing a brand
			//new instance of the model object. Generally, this means we'll need to do more field validation
			foreach($fieldValues as $fieldName => $fieldValue){
				$this->set($fieldName,$fieldValue,true);
			}
		}
		//verify we have all the attributes required in teh model
		foreach($model->field_settings() as $fieldName=>$field_obj){
			if( ! $field_obj->is_db_only_field() && ! property_exists($this,$this->_get_private_attribute_name($fieldName))){
				throw new EE_Error(sprintf(__('You have added an attribute titled \'%s\' to your model %s, but have not set a corresponding
					attribute on %s. Please add $%s to %s','event_espresso'),
						$fieldName,get_class($model),get_class($this),$this->_get_private_attribute_name($fieldName),get_class($this)));
			}
		}
//		//verify we have all the model relations
		foreach($model->relation_settings() as $relationName=>$relationSettings){
			if(!property_exists($this,$this->_get_private_attribute_name($relationName))){
				throw new EE_Error(sprintf(__('You have added a relation titled \'%s\' to your model %s, but have not set a corresponding
					attribute on %s. Please add protected $%s to %s','event_espresso'),
						$relationName,get_class($model),get_class($this),$this->_get_private_attribute_name($relationName),get_class($this)));
			}
		}
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
		$field_obj = $this->_get_model()->field_settings_for($field_name);
		 $holder_of_value = $field_obj->prepare_for_set($field_value);
		 if( ($holder_of_value === NULL || $holder_of_value ==='') && $use_default){
			 $this->$privateAttributeName = $field_obj->get_default_value();
		 }else{
			$this->$privateAttributeName = $holder_of_value; 
		 }
		 
	}
	
	
	/**
	 * Overrides parent because parent expects old models.
	 * This also doesn't do any validation, and won't work for serialized arrays
	 * @param type $field_name
	 * @param type $field_value_from_db
	 * @param type $use_default
	 */
	public function set_from_db($field_name,$field_value_from_db){
		$privateAttributeName=$this->_get_private_attribute_name($field_name);
		$field_obj = $this->_get_model()->field_settings_for($field_name);
		$this->$privateAttributeName = $field_obj->prepare_for_set_from_db($field_value_from_db);
	}
	
	
	/**
	 * gets the field (class attribute) specified by teh given name
	 * @param string $fieldName if the field you want is named $_ATT_ID, use 'ATT_ID' (omit preceding underscore)
	 * @return mixed
	 */
	public function get($fieldName){
		$privateAttributeName=$this->_get_private_attribute_name($field_name);
		$field_obj = $this->_get_model()->field_settings_for($field_name);
		return $field_obj->prepare_for_get($this->$privateAttributeName);
	}
	
	/**
	 * To be used in template to immediately echo out the value, and format it for output.
	 * Eg, shoudl call stripslashes and whatnought before echoing
	 * @param string $field_name the name of the field as it appears in teh DB
	 * @return void
	 */
	public function e($field_name){
		$field_value = $this->get($field_name);
		$field_obj = $this->_get_model()->field_settings_for($field_name);
		echo $field_obj->prepare_for_pretty_echoing($field_value);
	}
	
	/**
	 * Deletes this model object. That may mean just 'soft deleting' it though.
	 * @return boolean success
	 */
	public function delete(){
		$model=$this->_get_model();
		$result=$model->delete_by_ID($this->ID());
		if($result){
			return true;
		}else{
			return false;
		}
	}
	
	
	
	/**
	*		Saves this object to teh database. An array may be supplied to set some values on this
	 * object just before saving.
	* 
	* 		@access		public
	* 		@param		array		$set_cols_n_values		
	*		@return int, 1 on a successful update, the ID of
	*					the new entry on insert; 0 on failure		
	
	*/	
	public function save($set_cols_n_values=array()) {
		//set attributes as provided in $set_cols_n_values
		foreach($set_cols_n_values as $column=>$value){
			$this->set($column,$value);
		}
		//now get current attribute values
		$save_cols_n_values = array();
		foreach($this->_get_model()->field_settings() as $fieldName=>$field_obj){
			$attributeName=$this->_get_private_attribute_name($fieldName);
			$save_cols_n_values[$fieldName] = $field_obj->prepare_for_insertion_into_db($this->$attributeName);
	
		}
		//if the object already has an ID, update it. Otherwise, insert it
		if ( $save_cols_n_values[$this->_get_primary_key_name()] != null ){
			$results = $this->_get_model()->update ( $save_cols_n_values, array(array($this->_get_primary_key_name()=>$this->ID())) );
		} else {
			unset($save_cols_n_values[$this->_get_primary_key_name()]);
			
			$results = $this->_get_model()->insert ( $save_cols_n_values );
			if($results){//if successful, set the primary key
				$this->set($this->_get_primary_key_name(),$results);//for some reason the new ID is returned as part of an array,
				//where teh only key is 'new-ID', and it's value is the new ID.
			}
		}
		
		return $results;
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
	
	/**
	 * Adds a relationship to the specified EE_Base_Class object, given the relationship's name. Eg, if the curren tmodel is related
	 * to a group of events, the $relationName should be 'Events', and should be a key in the EE Model's $_model_relations array
	 * @param mixed $otherObjectModelObjectOrID EE_Base_Class or the ID of the other object
	 * @param string $relationName eg 'Events','Question',etc.
	 * an attendee to a group, you also want to specify which role they will have in that group. So you would use this parameter to specificy array('role-column-name'=>'role-id')
	 
	 * @return boolean success
	 */
	public function _add_relation_to($otherObjectModelObjectOrID,$relationName){
		$this->_get_model()->add_relationship_to($this, $otherObjectModelObjectOrID, $relationName);
	}
	
	
	
	/**
	 * Removes a relationship to the psecified EE_Base_Class object, given the relationships' name. Eg, if the curren tmodel is related
	 * to a group of events, the $relationName should be 'Events', and should be a key in the EE Model's $_model_relations array
	 * @param mixed $otherObjectModelObjectOrID EE_Base_Class or the ID of the other object
	 * @param string $relationName
	 * @return boolean success
	 */
	public function _remove_relation_to($otherObjectModelObjectOrID,$relationName){
		$this->_get_model()->remove_relationship_to($this, $otherObjectModelObjectOrID, $relationName);
	}
	
	/**
	 * 
	 * @param type $relationName
	 * @param type $query_params
	 */
	public function get_many_related($relationName,$query_params){
		$this->_get_model()->get_all_related($this, $relationName, $query_params);
	}
	
	/**
	 * Very handy general function to allow for plugins to extend any child of EE_Base_Class.
	 * If a method is called on a child of EE_Base_Class that doesn't exist, this function is called (http://www.garfieldtech.com/blog/php-magic-call)
	 * and passed the method's name and arguments.
	 * Instead of requiring a plugin to extend the EE_Base_Class (which works fine is there's only 1 plugin, but when will that happen?)
	 * they can add a hook onto 'filters_hook_espresso__{className}__{methodName}' (eg, filters_hook_espresso__EE_Answer__my_great_function)
	 * and accepts 2 arguments: the object on which teh function was called, and an array of the original arguments passed to the function. Whatever their callbackfunction returns will be returned by this function.
	 * Example: in functions.php (or in a plugin):
	 * add_filter('filter_hook_espresso__EE_Answer__my_callback','my_callback',10,3);
	 * function my_callback($previousReturnValue,EE_Base_Class $object,$argsArray){
			$returnString= "you called my_callback! and passed args:".implode(",",$argsArray);
	 *		return $previousReturnValue.$returnString;
	 * }
	 * require('EE_Answer.class.php');
	 * $answer=new EE_Answer(2,3,'The answer is 42');
	 * echo $answer->my_callback('monkeys',100);
	 * //will output "you called my_callback! and passed args:monkeys,100"
	 * @param string $methodName name of method which was called on a child of EE_Base_Class, but which 
	 * @param array $args array of original arguments passed to the function
	 * @return mixed whatever the plugin which calls add_filter decides
	 */
	public function __call($methodName,$args){
		$className=get_class($this);
		$tagName="filter_hook_espresso__{$className}__{$methodName}";
		if(!has_filter($tagName)){
			throw new EE_Error(sprintf(__("Method %s on class %s does not exist! You can create one with the following code in functions.php or in a plugin: add_filter('%s','my_callback',10,3);function my_callback(\$previousReturnValue,EE_Base_Class \$object, \$argsArray){/*function body*/return \$whatever;}","event_espresso"),
										$methodName,$className,$tagName));
		}
		return apply_filters($tagName,null,$this,$args);
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
	public function __construct( $EVT_desc=NULL, $EVT_metakey1='', $EVT_metaval1 ='') {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		//@todo: need to generalize constructor
		if(is_array($EVT_desc)){
			parent::__construct($EVT_desc);
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

class EE_Exp_Question_Group extends EE_Exp_Base_Class{
	protected $_Event;
	protected $_QSG_ID;
	protected $_QSG_name;
	protected $_QSG_identifier;
	
/**
	 * Constructor
	 * @param int $REG_ID registration ID OR an array of all field values, where keys match these arguments' names
	 * @param int $QST_ID question ID
	 * @param string $ANS_value text representing the answer. Could be CSV'd
	 */
	public function __construct( $QSG_name=NULL, $QSG_identifier = NULL) {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		//@todo: need to generalize constructor
		if(is_array($QSG_name)){
			parent::__construct($QSG_name);
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

class EE_Exp_Event_Question_Group extends EE_Exp_Base_Class{
	protected $_Question_Group;
	protected $_Event;
	protected $_EQG_ID;
	protected $_EVT_ID;
	protected $_QSG_II;
	protected $_EQG_primary;
	public function __construct( $EVT_ID=NULL, $QSG_ID = NULL, $EQG_primary = NULL) {
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

class EE_Exp_Registration extends EE_Exp_Base_Class{
	protected $_Transaction;
	protected $_Event;
	protected $_REG_ID;
	protected $_EVT_ID;
	protected $_TXN_ID;
	protected $_STS_ID;
	public function __construct( $EVT_ID=NULL, $TXN_ID = NULL, $STS_ID = NULL) {
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
//		$this->_model_relations = array(
//			//woudl add a BelongsTorelation to events and other relations here
//			'Transaction'=> new EE_Exp_Belongs_To(),
//			'Event'=>new EE_Exp_Belongs_To()
//		);
//		$this->_fields = array(
//			'Registration'=>array(
//				'REG_ID'=>new EE_Primary_Key_Int_Field('REG_ID', 'Registration ID', false, 0),
//				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', 'Event ID', false, 0, 'Event'),
//				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID','Transaction ID',false, 0, 'Transaction'),
//				'STS_ID'=>new EE_Enum_Field('STS_ID','Status Code',false,'RNA',array('RAP','RCN','RNA','RPN'))
//			)
//			
//		);
}