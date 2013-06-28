<?php

//require_once('EE_Base.php');
/*
 * Experimental new multi-table model. Especially handles joins when querying.
 * An important note about values dealt with in models and model objects:
 * values used by models exist in basically 3 different domains, which the EE_Model_Fields help convert between:
 * 1. Client-code values (eg, controller code may refer to a date as "March 21, 2013")
 * 2. Model object values (eg, after the model object has called set() on teh value and saves it onto the model object, it may become a unix timestamp, eg 12312412412)
 * 3. Database values (eg, we may later decide to store dates as mysql dates, in which case they'd be stored as '2013-03-21 00:00:00')
 * Sometimes these values are the same, but often they are not. When your client code is using a model's functions, you need to be aware
 * which domain your data exists in. If it is client-code values (ie, it hasn't had a EE_Model_Field call prepare_for_set on it) then use the
 * model functions as normal. However, if you are calling the model functions with values from teh model object domain (ie, the code your writing is
 * probably within a model object, and all the values you're dealing with have had an EE_MOdel_Field call prepare_for_set on them), then you'll want
 * to set $values_already_prepared_by_model_object to FALSE within the argument-list of the functions you call (in order to avoid re-processing those values).
 * If your values are already in teh database values domain, you'll either way to convert them into the model object domain by creating model objects
 * from those raw db values (ie,using EEM_Base::_create_objects), or just use $wpdb directly.
 */
define('SP',' ');
//require all field, relation, and helper files, because we'll want 90% of them on every request using EEM_Base anyways.
$field_files = glob(dirname(__FILE__) . '/fields/*.php');
$helper_files = glob(dirname(__FILE__) . '/helpers/*.php');
$relation_files = glob(dirname(__FILE__) . '/relations/*.php');
$files =  array_merge( array_merge($field_files, $relation_files), $helper_files) ;
require_once('strategies/EE_Default_Where_Conditions.strategy.php');
foreach ($files as $file){
    require_once($file);   
}
abstract class EEM_Base extends EE_Base{
	protected $singular_item = 'Item';
	protected $plural_item = 'Items';
	/**
	 * @var EE_Table[] $_tables  array of EE_Table objects for defining which tables comprise this model.
	 */
	protected $_tables;
	
	
	
	/**
	 *
	 * @var array with two levels: top-leve has array keys which are database table aliases (ie, keys in _tables)
	 * and the value is an array. Each of those sub-arrays have keys of field names (eg 'ATT_ID', which should also be variable names
	 * on the model objects (eg, EE_Attendee), and the keys should be children of EE_Model_Field
	 */
	protected $_fields;
	/**
	 *
	 * @var EE_Model_Relation[] array of different kidns of relations
	 */
	protected $_model_relations;
	/**
	 * Defautls strategy for getting where conditions on this model. This strategy is used to get default
	 * where conditions which are added to get_all, update, and delete queries. They can be overriden
	 * by setting the same columns as used in these queries in the query yourself.
	 * @var EE_Default_Where_Conditions
	 */
	protected $_default_where_conditions_strategy;




	/**
	 * This is a flag typically set by updates so that we don't load the where strategy on updates because updates don't need it (particularly CPT models)
	 * @var bool
	 */
	protected $_ignore_where_strategy = FALSE;
	
	




	/**
	 * Timezone
	 * This gets set via the constructor so that we know what timezone incoming strings|timestamps are in when there are EE_Datetime_Fields in use.  This can also be used before a get to set what timezone you want strings coming out of the created objects.  NOT all EEM_Base child classes use this property but any that use a EE_Datetime_Field data type will have access to it.
	 * @var string
	 */
	protected $_timezone;




	
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
		'not in'=>'NOT IN',
		'between' => 'BETWEEN',
		'BETWEEN' => 'BETWEEN',
		'IS NOT NULL' => 'IS NOT NULL',
		'is not null' => 'IS NOT NULL',
		'IS NULL' => 'IS NULL',
		'is null' => 'IS NULL');
	/**
	 * operators that work like 'IN', accepting a comma-seperated list of values inside brackets. Eg '(1,2,3)'
	 * @var array 
	 */
	protected $_in_style_operators = array('IN','NOT_IN');



	/**
	 * operators that work like 'BETWEEN'.  Typically used for datetime calcs, i.e. "BETWEEN '12-1-2011' AND '12-31-2012'"
	 * @var array
	 */
	protected $_between_style_operators = array( 'BETWEEN' );


	/**
	 * operators that are used for handling NUll and !NULL queries.  Typically used for when checking if a row exists on a join table. 
	 * @var array
	 */
	protected $_null_style_operators = array( 'IS NOT NULL', 'IS NULL' );

	
	/**
	 * Allowed values for $query_params['order'] for ordering in queries
	 * @var array
	 */
	protected $_allowed_order_values = array('asc','desc','ASC','DESC');
	
	/**
	 * When these are keys in a WHERE or HAVING clause, they are handled much differently
	 * than regular field names. It is assumed that their values are an array of WHERE conditions
	 * @var array
	 */
	private $_logic_query_param_keys = array('not', 'and', 'or', 'NOT', 'AND', 'OR');
	/**
	 * Allowed keys in $query_params arrays passed into queries. Note that 0 is meant to always be a 
	 * 'where', but 'where' clauses are so common that we thought we'd omit it
	 * @var array
	 */
	private $_allowed_query_params = array(0, 'limit','order_by','group_by','having','force_join','order','on_join_limit');
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
	protected function __construct( $timezone = NULL ){
		foreach($this->_tables as $table_alias => $table_obj){
			$table_obj->_construct_finalize_with_alias($table_alias);
			if($table_obj instanceof EE_Secondary_Table){
				$table_obj->_construct_finalize_set_table_to_join_with($this->_get_main_table());
			}
		}
		foreach($this->_fields as $table_alis => $fields_for_table){
			if(!array_key_exists($table_alias,$this->_tables)){
				throw new EE_Error(sprintf(__("Table alias %s does not exist in EEM_Base child's _tables array. Only tables defined are %s",'event_espresso'),$table_alias,implode(",",$this->_fields)));
			}
			foreach($fields_for_table as $field_name => $field_obj){
				$field_obj->_construct_finalize($table_alis,$field_name);
			}
		}
				
			
		foreach($this->_model_relations as $model_name => $relation_obj){
			$relation_obj->_construct_finalize_set_models($this->get_this_model_name(), $model_name);
		}

		$this->set_timezone($timezone);
		//finalize default where condition strategy, or set default
		if( ! $this->_default_where_conditions_strategy){
			//nothing was set during chidl consturctor, so set default
			$this->_default_where_conditions_strategy = new EE_Default_Where_Conditions();
		}
		$this->_default_where_conditions_strategy->_finalize_construct($this);
		
	}





	/**
	 * This sets the _timezone property after model object has been instantiated.
	 * @param string $timezone valid PHP DateTimeZone timezone string
	 */
	public function set_timezone( $timezone ) {
		$this->_timezone = $timezone;

		//note we need to loop through relations and set the timezone on those objects as well.
		foreach ( $this->_model_relations as $relation ) {
			$relation->set_timezone($timezone);
		}

		//and finally we do the same for any datetime fields
		foreach ( $this->_fields as $field ) {
			if ( $field instanceof EE_Datetime_Field ) {
				$field->set_timezone( $timezone );
			}
		}
	}




	/**
	 * Gets all the EE_Base_Class objects which match the $query_params, by querying the DB.
	 * @param array $query_params array with the following array key indexes:
	 *		key			|					value
	 * -------------------------------------------------------------------------
	 *		0 (where)	|	an array of key-value pairs in its most basic form. Eg array('QST_display_text'=>'Are you bob?','QST_admin_text'=>'Determine if user is bob'
	 *					|	(which becomes SQL "...WHERE QST_display_text = 'Are you bob?' AND QST_admin_text = 'Determine if user is bob'...")
	 *					|	however, to change the operator (from the default of '='), change the value to an numerically-indexed array, where the
	 *					|	first item in the list is the operator. 
	 *					|	eg array( 'QST_display_text' => array('LIKE','%bob%'), 'QST_ID' => array('<',34), 'QST_wp_user' => array('in',array(1,2,7,23))) becomes
	 *					|	SQL "...WHERE QST_display_text LIKE '%bob%' AND QST_ID < 34 AND QST_wp_user IN (1,2,7,23)...".
	 *					|	Valid operators so far: =, !=, <, <=, >, >=, LIKE, NOT LIKE, IN (followed by numeric-indexed array), NOT IN (dido), others?
	 *					|	Also, by default all the where conditions are AND'd together. To override this, add an array key 'OR' (or 'AND') and the
	 *					|	array to be OR'd together. Eg array('OR'=>array('TXN_ID' => 23 , 'TXN_timestamp__>' => 345678912)), which becomes SQL 
	 *					|	"...WHERE TXN_ID = 23 OR TXN_timestamp = 345678912...". 
	 *					|	Also, to negate an entire set of
	 *					|	conditions, user 'NOT' as an array key. Eg array('NOT'=>array('TXN_total' => 50, 'TXN_paid'=>23) which becomes SQL to "...where ! (TXN_total =50 AND TXN_paid =23) 
	 *					|	They can be nested indefinetely. 
	 *					|	eg array('OR'=>array('TXN_total' => 23, 'NOT'=> array( 'TXN_timestamp'=> 345678912, 'AND'=>array('TXN_paid' => 53, 'STS_ID' => 'TIN)))) which 
	 *					|	becomes SQL: "...WHERE TXN_total = 23 OR ! (TXN_timestmap = 345678912 OR (TXN_paid = 53 AND STS_ID = 'TIN'))..."
	 *					|	GOTCHA: because this is an array, array keys must be unique, making it impossible to place two or more where conditions
	 *					|	applying to the same field. Eg: array('PAY_timestamp'=>array('>',$start_date),'PAY_timestamp'=>array('<',$end_date),'PAY_timestamp'=>array('!=',$special_date)),
	 *					|	as PHP enforces that the array keys must be unique, thus removing the first two array entries
	 *					|	with key 'PAY_timestamp'. (producign SQL "PAY_timestamp !=  4234232", ignoring the first two PAY_timestmap conditions).
	 *					|	To overcome this, you can add '*' characters to the end of the field's name.
	 *					|	These will be removed when generating the SQL string, but allow for the array keys to be unique.
	 *					|	Eg, you could rewrite the previous query as:
	 *					|	array('PAY_timestamp'=>array('>',$start_date),'PAY_timestamp*'=>array('<',$end_date),'PAY_timestamp**'=>array('!=',$special_date))
	 *					|	which will correctly generate SQL like "PAY_timestamp > 123412341 AND PAY_timestamp < 2354235235234 AND PAY_timestamp != 1241234123"
	 *		limit		|	adds a limit to the query just like the SQL limit clause, so limits of "23", "25,50" are both valid would become 
	 *					|	SQL "...LIMIT 23", "...LIMIT 25,50" respectively
	 *	 on_join_limit	|	allows the setting of a special select join with a internal limit so you can do paging on one-to-many multi-table-joins. Send an array in the following format array('on_join_limit' => array( 'table_alias', array(1,2) ) ).	
	 *		order_by	|	name of a column to order by, or an array where keys are field names and values are either 'ASC' or 'DESC'. 'limit'=>array('STS_ID'=>'ASC','REG_date'=>'DESC'),
	 *					|	which would becomes SQL "...ORDER BY TXN_timestamp..." and "...ORDER BY STS_ID ASC, REG_date DESC..." respectively.
	 *					|	Like the 'where' conditions, these fields can be on related models. 
	 *					|	Eg 'order_by'=>array('Registration.Tranaction.TXN_amount'=>'ASC') is perfectly valid from any model related to 'Registration' (like Event, Attendee, Price, Datetime, etc.)
	 *		order		|	If 'order_by' is used and its value is a string (NOT an array), then 'order' specifies whether to order the field specified in 'order_by' in ascending or
	 *					|	descending order. Acceptable values are 'ASC' or 'DESC'. If, 'order_by' isn't used, but 'order' is, then it is assumed you want to order by the primary key.
	 *					|	Eg, EEM_Event::instance()->get_all(array('order_by'=>'Datetime.DTT_EVT_start','order'=>'ASC'); //(will join with the Datetime model's table(s) and order by its field DTT_EVT_start)
	 *					|	or EEM_Registration::instance()->get_all(array('order'=>'ASC'));//will make SQL "SELECT * FROM wp_esp_registration ORDER BY REG_ID ASC"
	 *		group_by	|	name of field to order by, or an array of fields. Eg either 'group_by'=>'VNU_ID', or 'group_by'=>array('EVT_name','Registration.Transaction.TXN_total')
	 *		having		|	exactl like WHERE parameters array, except these conditions apply to the grouped results (whereas WHERE conditions apply to the pre-grouped results)
	 *		force_join	|	forces a join with the models named. Should be an numerically-indexed array where values are models to be joined in the query.Eg
	 *					|	array('Attendee','Payment','Datetime'). You may join with transient models using period, eg "Registration.Transaction.Payment".
	 *					|	You will probably only want to do this in hopes of increasing efficiency, as related models which belongs to the current model 
	 *					|	(ie, the current model has a foreign key to them, like how Registration belongs to Attendee) can be cached in order
	 *					|	to avoid future queries
	 * @param boolean $values_already_prepared_by_model_object
	 * Some full examples:
	 * get 10 transactions which have Scottish attendees:
	 * EEM_Transaction::instance()->get_all(array(
	 *		array(
	 *			'Registration.Attendee.ATT_fname'=>('like','Mc%'),
	 *		'limit'=>10,
	 *		'group_by'=>'TXN_ID'));
	 * get all the answers to the question titled "shirt size" for event iwth id 12, ordered by their answer
	 * EEM_Answer::instance()->get_all(array(
	 *		array(
	 *			'Question.QST_display_text'=>'shirt size',
	 *			'Registration.Event.EVT_ID'=>12),
	 *		'order_by'=>array('ANS_value'=>'ASC')
	 *		);
	 * 
	 *				
	 */
	function get_all($query_params = array(), $values_already_prepared_by_model_object = false){	
		return $this->_create_objects($this->_get_all_wpdb_results($query_params, ARRAY_A, NULL, $values_already_prepared_by_model_object));
	}
	
	
	
	/**
	 * Used internally to get WPDB results, because other functions, besides get_all, may want to do some queries, but may want to
	 * preserve the WPDB results (eg, update, which first queries to make sure we have all the tables on the model)
	 * @global type $wpdb
	 * @param array $query_params like EEMerimental_Base::get_all's $query_params
	 * @param string $output ARRAY_A, OBJECT_K, etc. Just like
	 * @param boolean $columns_to_select, What columns to select. By default, we select all columns specified by the fields on the model,
	 * and the models we joined to in the query. However, you can override this and set the select to "*", or a specific column name, like "ATT_ID", etc.
	 * @return stdClass[] like results of $wpdb->get_results($sql,OBJECT), (ie, output type is OBJECT)
	 */
	protected function  _get_all_wpdb_results($query_params = array(), $output = ARRAY_A, $columns_to_select = null, $values_already_prepared_by_model_object = false){
		global $wpdb;
		$model_query_info = $this->_create_model_query_info_carrier($query_params, $values_already_prepared_by_model_object);
		$select_expressions = $columns_to_select ? $columns_to_select : $this->_construct_select_sql($model_query_info);
		$SQL ="SELECT $select_expressions ".$this->_construct_2nd_half_of_select_query($model_query_info);
		$results =  $wpdb->get_results($SQL, $output);
		//echo "<br><br>_get_all_wpdb_results sql:$SQL";
		
		return $results;
	}
	
	/**
	 * Convenient wrapper for getting the primary key field's name. Eg, on Registration, this would be 'REG_ID'
	 * @return string
	 */
	function primary_key_name(){
		return $this->get_primary_key_field()->get_name();
	}

	/**
	 * Gets a single item for this model from the DB, given only its ID (or null if none is found).
	 * @param mixed $id int or string, depending on the type of the model's primary key
	 * @return EE_Base_Class
	 */
	function get_one_by_ID($id, $values_already_prepared_by_model_object = false){
		$primary_key_name = $this->get_primary_key_field()->get_name();
		return $this->get_one(array(array($primary_key_name => $id)), $values_already_prepared_by_model_object);
	}
	/**
	 * Gets a single item for this model from the DB, given the $query_params. Only returns a single class, not an array. If no item is found,
	 * null is rturned.
	 * @param array $query_params like EEMerimental_Base's $query_params variable.
	 * @return EE_Base_Class
	 */
	function get_one($query_params = array(), $values_already_prepared_by_model_object = false){
		$query_params['limit'] = 1;
		$items = $this->get_all($query_params);
		if(empty($items)){
			return null;
		}else{
			return array_shift($items);
		}
	}





	/**
	 * This just returns whatever is set for the current timezone.
	 *
	 * @access public
	 * @return string timezone string
	 */
	public function get_timezone() {
		return $this->_timezone;
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
	 * @param array $fields_n_values keys are model fields (exactly like keys in EEMerimental::_fields, NOT db columns!), values are strings, ints, floats, and maybe arrays if they are to be serialized.
	 * Basically, the values are what you'd expect to be values on the model, NOT necessarily what's in teh DB. For example, if we wanted to update only the TXN_details on any Transactions where its ID=34,
	 * we'd use this metho as follows: 
	 * EEM_Transaction::instance()->update(
	 *		array('TXN_details'=>array('detail1'=>'monkey','detail2'=>'banana'),
	 *		array(array('TXN_ID'=>34)));
	 * @param array $query_params very much like EEMerimental_Base::get_all's $query_params
	 * @param boolean $values_already_prepared_by_model_object is true, skips calling each field's prepare_for_set method (which converts values from what's expected
	 * in client code into what's expected to be stored on each field. Eg, consider updating Question's QST_admin_label field is of type Simple_HTML. If you use this function to update
	 * that field to $new_value = "<script>alert('I hack all');</script><b>boom baby</b>", then if you set $values_already_prepared_by_model_object to TRUE, 
	 * it is assumed that you've already called EE_Simple_HTML_Field->prepare_for_set($new_value), which removes the malicious javascript. However, if $values_already_prepared_by_model_object 
	 * is left as FALSE, then EE_Simple_HTML_Field->preapre_for_set($new_value) will be called on it, and every other field, before insertion. We provide this parameter because
	 * model objects perform their prepare_for_set function on all their values, and so don't need to be called again (and in many cases, shouldn't be called again. Eg: if we
	 * escape HTML characters in the prepare_for_set method...)
	 * @return int how many rows got updated
	 */
	function update($fields_n_values, $query_params, $values_already_prepared_by_model_object = false){
		global $wpdb;
		//need to verify that, for any entry we want to update, there are entries in each secondary table.
		//to do that, for each table, verify that it's PK isn't null.
		$tables= $this->get_tables();
		//if there are more than 1 tables, we'll want to verify that each table for this model has an entry in the other tables
		//and if the other tables don't have a row for each table-to-be-updated, we'll insert one with whatever values available in the current update query
		if(count($tables) > 1){
			//we want to make sure the default_where strategy is ignored
			$this->_ignore_where_strategy = TRUE;
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
						$this->_insert_into_specific_table($table_obj, $fields_n_values, $main_table_pk_value, $values_already_prepared_by_model_object);
					}
				}
			}
			//let's make sure default_where strategy is followed now
			$this->_ignore_where_strategy = FALSE;
		}
		
		$model_query_info = $this->_create_model_query_info_carrier($query_params);
		$SQL = "UPDATE ".$model_query_info->get_full_join_sql()." SET ".$this->_construct_update_sql($fields_n_values, $values_already_prepared_by_model_object).$model_query_info->get_where_sql();//note: doesn't use _construct_2nd_half_of_select_query() because doesn't accept LIMIT, ORDER BY, etc.
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
	function _construct_update_sql($fields_n_values, $values_already_prepared_by_model_object = false){
		global $wpdb;
		$cols_n_values = array();
		foreach($fields_n_values as $field_name => $value){
			$field_obj = $this->field_settings_for($field_name);
			$cols_n_values[] = $field_obj->get_qualified_column()."=".$wpdb->prepare($field_obj->get_wpdb_data_type(),
							$this->_prepare_value_for_use_in_db($value, $field_obj, $values_already_prepared_by_model_object));
		}
		return implode(",",$cols_n_values);
		
	}
	/**
	 * 
	 * @param array $query_params very much like EEMerimental_Base::get_all's $query_params
	 * @return int how many rows got deleted
	 */
	function delete($query_params){
		global $wpdb;
		//some MySQL databases may be running safe mode, which may restrict
		//deletion if there is no KEY column used in the WHERE statement of a deletion.
		//to get around this, we first do a SELECT, get all the IDs, and then run another query
		//to delete them
		$deletion_where = $this->_setup_ids_for_delete( $this->_get_all_wpdb_results($query_params) );
		if($deletion_where){
			//echo "objects for deletion:";var_dump($objects_for_deletion);
			$model_query_info = $this->_create_model_query_info_carrier($query_params);
			$table_aliases = array();
			foreach(array_keys($this->_tables) as $table_alias){
				$table_aliases[] = $table_alias;
			}
			$SQL = "DELETE ".implode(", ",$table_aliases)." FROM ".$model_query_info->get_full_join_sql()." WHERE ".$deletion_where;

	//		/echo "delete sql:$SQL";
			$rows_deleted = $wpdb->query($SQL);
			//$wpdb->print_error();
		}else{
			$rows_deleted = 0;
		}
		return $rows_deleted;//how many supposedly got updated
	}



	/**
	 * This sets up our delete where sql and accounts for if we have secondary tables that will have rows deleted as well.
	 * @param  array  $objects_for_deletion This should be the values returned by $this->_get_all_wpdb_results()
	 * @return string 	everything that comes after the WHERE statment.
	 */
	protected function _setup_ids_for_delete( $objects_for_deletion ) {
		$primary_table = $this->_get_main_table();
		$other_tables = $this->_get_other_tables();
		$deletes = $query = array();
		
		foreach ( $objects_for_deletion as $deobj ) {
			//primary table deletes
			if ( isset( $deobj[$primary_table->get_fully_qualified_pk_column()] ) )
				$deletes[$primary_table->get_fully_qualified_pk_column()][] = $deobj[$primary_table->get_fully_qualified_pk_column()];

			//other tables
			if ( !empty( $other_tables ) ) {
				foreach ( $other_tables as $ot ) {

					//first check if we've got the foreign key column here.
					if ( isset( $deobj[$ot->get_fully_qualified_fk_column()] ) )
						$deletes[$ot->get_fully_qualified_pk_column()][] = $deobj[$ot->get_fully_qualified_fk_column()];

					//wait! it's entirely possible that we'll have a the primary key for this table in here if it's a foreign key for one of the other secondary tables
					if ( isset( $deobj[$ot->get_fully_qualified_pk_column()] ) )
						$deletes[$ot->get_fully_qualified_pk_column()][] = $deobj[$ot->get_fully_qualified_pk_column()];

					//finally, it is possible that the fk for this table is found in the fully qualified pk column for the fk table, so let's see if that's there!
					if ( isset( $deobj[$ot->get_fully_qualified_pk_on_fk_table()]) ) 
						$deletes[$ot->get_fully_qualified_pk_column()][] = $deobj[$ot->get_fully_qualified_pk_column()];
				}
			}
		}
		
		//we should have deletes now, so let's just go through and setup the where statement
		foreach ( $deletes as $column => $values ) {
			//make sure we have unique $values;
			$values = array_unique($values);
			$query[] = $column . ' IN(' . implode(",",$values) . ')';
		}

		return !empty($query) ? implode(' AND ', $query ) : '';
	}
	
	/**
	 * Deletes a single row from the DB given the model object's primary key value. (eg, EE_Attendee->ID()'s value).
	 * Wrapper for EEM_Base::delete()
	 * @param mixed $id
	 * @return boolean whether the row got deleted or not
	 */
	function delete_by_ID($id){
		$query_params = array();
		$query_params[0] = array($this->get_primary_key_field()->get_name() => $id);
		$query_params['limit'] = 1;
		return $this->delete($query_params);
	}
	/**
	 * Count all the rows that match criteria expressed in $query_params (an array just like arg to EEMerimental_Base::get_all).
	 * If $field_to_count isn't provided, the model's primary key is used. Otherwise, we count by field_to_count's column
	 * @param array $query_params like EEMerimental_Base::get_all's
	 * @param string $field_to_count field on model to count by (not column name)
	 * @param bool 	 $distinct if we want to only count the distinct values for the column then you can trigger that by the setting $distinct to TRUE;
	 */
	function count($query_params =array(),$field_to_count = NULL, $distinct = FALSE){
		global $wpdb;
		$model_query_info = $this->_create_model_query_info_carrier($query_params);
		if($field_to_count){
			$field_obj = $this->field_settings_for($field_to_count);
			$column_to_count = $field_obj->get_qualified_column();
		}else{
			$pk_field_obj = $this->get_primary_key_field();
			$column_to_count = $pk_field_obj->get_qualified_column();
		}

		$column_to_count = $distinct ? "DISTINCT (" . $column_to_count . " )" : $column_to_count;
		$SQL ="SELECT COUNT(".$column_to_count.")" . $this->_construct_2nd_half_of_select_query($model_query_info);
		return (int)$wpdb->get_var($SQL);
	}
	
	/**
	 * Sums up the value of the $field_to_sum (defaults to the primary key, which isn't terribly useful)
	 * 
	 * @param array $query_params like EEMerimental_Base::get_all
	 * @param string $field_to_sum name of field (array key in $_fields array)
	 * @return int
	 */
	function sum($query_params, $field_to_sum = NULL, $values_already_prepared_by_model_object = false){
		global $wpdb;
		$model_query_info = $this->_create_model_query_info_carrier($query_params, $values_already_prepared_by_model_object);
		
		if($field_to_sum){
			$field_obj = $this->field_settings_for($field_to_sum);
			
		}else{
			$field_obj = $this->get_primary_key_field();
		}
		$column_to_count = $field_obj->get_qualified_column();

		$SQL ="SELECT SUM(".$column_to_count.")" . $this->_construct_2nd_half_of_select_query($model_query_info);
		$return_value = $wpdb->get_var($SQL);
		if($field_obj->get_wpdb_data_type() == '%d' || $field_obj->get_wpdb_data_type() == '%s' ){
			return (int)$return_value;
		}else{//must be %f
			return (float)$return_value;
		}
	}
	
	/**
	 * In order to avoid repeating this code for the get_all, sum, and count functions, put the code parts
	 * that are identical in here. Returns a string of SQL of everything in a SELECT query except the beginning
	 * SELECT clause, eg " FROM wp_posts AS Event INNER JOIN ... WHERE ... ORDER BY ... LIMIT ... GROUP BY ... HAVING ..."
	 * @param EE_Model_Query_Info_Carrier $model_query_info
	 * @return string
	 */
	private function _construct_2nd_half_of_select_query(EE_Model_Query_Info_Carrier $model_query_info){
		return " FROM ".$model_query_info->get_full_join_sql().
				$model_query_info->get_where_sql().
				$model_query_info->get_group_by_sql().
				$model_query_info->get_having_sql().
				$model_query_info->get_order_by_sql().
				$model_query_info->get_limit_sql();
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
	 * @param EE_Base_Class/int $thisModelObject
	 * @param EE_Base_Class/int $id_or_obj EE_base_Class or ID of other Model Object
	 * @param string $relationName, key in EEMerimental_Base::_relations
	 * an attendee to a group, you also want to specify which role they will have in that group. So you would use this parameter to specificy array('role-column-name'=>'role-id')
	 * @return EE_Base_Class which was added as a relation. Object referred to by $other_model_id_or_obj
	 */
	public function add_relationship_to($id_or_obj,$other_model_id_or_obj, $relationName){
		$relation_obj = $this->related_settings_for($relationName);
		return $relation_obj->add_relation_to($id_or_obj, $other_model_id_or_obj);
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
	 * @param EE_Base_Class/int $id_or_obj
	 * @param EE_Base_Class/int $other_model_id_or_obj EE_Base_Class or ID of other Model Object
	 * @param string $relationName key in EEMerimental_Base::_relations
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
	 * @param array $query_params like EEMerimental_Base::get_all
	 * @return EE_Base_Class
	 */
	function get_all_related($id_or_obj, $model_name, $query_params = null, $values_already_prepared_by_model_object = false){
		$model_obj = $this->ensure_is_obj($id_or_obj);
		$relation_settings = $this->related_settings_for($model_name);
		return $relation_settings->get_all_related($model_obj,$query_params,$values_already_prepared_by_model_object);
	}
	
	/**
	 * Insetad of getting the related model objects, simply counts them. 
	 * @param int/EE_Base_Class $id_or_obj
	 * @param string $model_name like 'Event', or 'Registration'
	 * @param array $query_params like EEM_Base::get_all's
	 * @param string $field_to_count name of field to count by. By default, uses primary key
	 * @return int
	 */
	function count_related($id_or_obj,$model_name,$query_params,$field_to_count = null){
		$related_model = $this->get_related_model_obj($model_name);
		//we're just going to use teh query params on the related model's normal get_all query,
		//except add a condition to say to match the curren't mod
		
		$this_model_name = $this->get_this_model_name();
		$this_pk_field_name = $this->get_primary_key_field()->get_name();
		$query_params[0][$this_model_name.".".$this_pk_field_name]=$id_or_obj;
		return $related_model->count($query_params,$field_to_count);
	}
	
	
	
	/**
	 * Insetad of getting the related model objects, simply sums up the values of the specified field.
	 * @param int/EE_Base_Class $id_or_obj
	 * @param string $model_name like 'Event', or 'Registration'
	 * @param array $query_params like EEM_Base::get_all's
	 * @param string $field_to_sum name of field to count by. By default, uses primary key
	 * @return int
	 */
	function sum_related($id_or_obj,$model_name,$query_params,$field_to_sum = null, $values_already_prepared_by_model_object = false){
		$related_model = $this->get_related_model_obj($model_name);
		//we're just going to use teh query params on the related model's normal get_all query,
		//except add a condition to say to match the curren't mod
		
		$this_model_name = $this->get_this_model_name();
		$this_pk_field_name = $this->get_primary_key_field()->get_name();
		$query_params[0][$this_model_name.".".$this_pk_field_name]=$id_or_obj;
		return $related_model->sum($query_params,$field_to_sum, $values_already_prepared_by_model_object);
	}
	
	
	/**
	 * Uses $this->_relatedModels info to find the first related model object of relation $relationName to the given $modelObject
	 * @param EE_Base_Class'child $modelObject one of EE_Answer, EE_Attendee, etc. 
	 * @param mixed $id_or_obj EE_Base_Class child or its ID
	 * @param string $other_model_name, key in $this->_relatedModels, eg 'Registration', or 'Events'
	 * @return EE_Base_Class
	 */
	public function get_first_related(EE_Base_Class $id_or_obj,$other_model_name,$query_params, $values_already_prepared_by_model_object = false){
		$query_params['limit']=1;
		$results = $this->get_all_related($id_or_obj,$other_model_name,$query_params, $values_already_prepared_by_model_object);
		if( $results ){
			return array_shift($results);
		}else{
			return null;
		}
		
	}
	
	/**
	 * Gets the model's name as it's expected in queries. For example, if this is EEM_Event model, that would be Event
	 * @return string
	 */
	function get_this_model_name(){
		return str_replace("EEM_","",get_class($this));
	}
	/**
	 * Inserts a new entry into the database, for each table
	 * @global type $wpdb
	 * @param array $field_n_values keys are field names, values are their values (in the clietn code's domain if $values_already_prepared_by_model_object is false,
	 * in the model object's domain if $values_already_prepared_by_model_object is true. See comment about this at th etop of EEM_Base)
	 * @param boolean $values_already_prepared_by_model_object
	 * @return int new primary key on main table that got inserted
	 * @throws EE_Error
	 */
	function insert($field_n_values, $values_already_prepared_by_model_object = false){
		$main_table = $this->_get_main_table();
		$new_id = $this->_insert_into_specific_table($main_table, $field_n_values, false, $values_already_prepared_by_model_object);
		foreach($this->_get_other_tables() as $other_table){
			$this->_insert_into_specific_table($other_table, $field_n_values,$new_id, $values_already_prepared_by_model_object);
		}
		return $new_id;
	}
	
	
	/**
	 * Inserts a new row in $table, using the $cols_n_values which apply to that table.
	 * If a $new_id is supplied and if $table is an EE_Other_Table, we assume
	 * we need to add a foreign key column to point to $new_id (which should be the primary key's value
	 * on the main table)
	 * This is protected rather than private because private is not accessible to any child methods and there MAY be cases where we want to call it directly rather than via insert().
	 * @access protected
	 * @param EE_Table_Base $table
	 * @param array $fields_n_values each key should be in _fields's keys, and value should be an int, string or float
	 * @param int $new_id for now we assume only int keys
	 * @param boolean $values_already_prepared_by_model_object whether EE_Model_Field::prepare_for_set already called on values used
	 * @return int ID of new row inserted
	 * @throws EE_Error
	 */
	protected function _insert_into_specific_table(EE_Table_Base $table, $fields_n_values, $new_id = false, $values_already_prepared_by_model_object = false){
		global $wpdb;
		$insertion_col_n_values = array();
		$format_for_insertion = array();
		$fields_on_table = $this->_get_fields_for_table($table->get_table_alias());
		foreach($fields_on_table as $field_name => $field_obj){
			//check if its an auto-incrementing column, in which case we should just leave it to do its autoincrement thing
			if($field_obj->is_auto_increment()){
				continue;
			}
			if( ! isset( $fields_n_values[$field_name]) ||  $fields_n_values[$field_name] === null){
				//they didnt include this field. so just use default
				$insertion_col_n_values[$field_obj->get_table_column()] = $this->_prepare_value_for_use_in_db($field_obj->get_default_value(), $field_obj, true);
			}else{
				//they have specified teh value for thi sfield, so use it
				$insertion_col_n_values[$field_obj->get_table_column()] = $this->_prepare_value_for_use_in_db($fields_n_values[$field_name], $field_obj,$values_already_prepared_by_model_object); ;
			
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
	 * Consolidates code for preparing  a value supplied to the model for use int eh db. Calls the field's prepare_for_use_in_db method on the value,
	 * and depending on $value_already_prepare_by_model_obj, may also call the field's prepare_for_set() method.
	 * @param mixed $value value in the client code domain if $value_already_preapred_by_model_object is false, otherwise a value
	 * in the model object's domain (see lengthy comment at top of file)
	 * @param EE_Model_Field_Base $field field which will be doing the preparing of the value
	 * @param boolean $value_already_prepared_by_model_object if FALSE, we'll also for the $field's prepare_for_set method on the value
	 * @return mixed a value ready for use in the database for insertions, updating, or in a where clause
	 */
	private function _prepare_value_for_use_in_db($value, EE_Model_Field_Base $field, $value_already_prepared_by_model_object){
		$value = $value_already_prepared_by_model_object ? $value : $field->prepare_for_set($value);
		return $field->prepare_for_use_in_db($value);
	}
	/**
	 * Returns the main table on this model
	 * @return EE_Primary_Table
	 * @throws EE_Error
	 */
	protected function _get_main_table(){
		foreach($this->_tables as $table){
			if($table instanceof EE_Primary_Table){
				return $table;
			}
		}
		throw new EE_Error(sprintf(__("THere are no main tables on %s. They should be added to _tables array in the constructor",'event_espresso'),get_class($this)));
	}
	/**
	 * Gets all the tables of type EE_Other_Table from EEMerimental_Model::_tables
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
	 * @param string $table_alias, array key in EEMerimental_Base::_tables
	 * @return EE_Model_Field[]
	 */
	function _get_fields_for_table($table_alias){
		return $this->_fields[$table_alias];
	}
	
	/**
	 * Recurses through all the where parameters, and finds all the related models we'll need
	 * to complete this query. Eg, given where parameters like array('EVT_ID'=>3) from within Event model, we won't need any
	 * related models. But if the array were array('Registrations.REG_ID'=>3), we'd need the related Registration model.
	 * If it were array('Registrations.Transactions.Payments.PAY_ID'=>3), then we'd need the related Registration, Tranaction, and Payment models.
	 * @param array $where_paramslike EEMerimental_Base::get_all's $query_parameters['where']
	 * @return EE_Model_Query_Info_Carrier
	 */
	function _extract_related_models_from_query($query_params){
		$query_info_carrier = new EE_Model_Query_Info_Carrier();
		if(array_key_exists(0,$query_params)){
			$this->_extract_related_models_from_sub_params_array_keys($query_params[0], $query_info_carrier,0);
		}
		if(array_key_exists('group_by', $query_params)){
			if(is_array($query_params['group_by'])){
				$this->_extract_related_models_from_sub_params_array_values($query_params['group_by'],$query_info_carrier,'group_by');
			}else{
				$this->_extract_related_model_info_from_query_param( $query_params['group_by'],$query_info_carrier,'group_by');
			}
		}
		if(array_key_exists('having',$query_params)){
			$this->_extract_related_models_from_sub_params_array_keys($query_params[0], $query_info_carrier,'having');
		}
		if(array_key_exists('order_by', $query_params)){
			if ( is_array( $query_params['order_by'] ) )
				$this->_extract_related_models_from_sub_params_array_keys($query_params['order_by'],$query_info_carrier,'order_by');
			else
				$this->_extract_related_model_info_from_query_param( $query_params['order_by'], $query_info_carrier,'order_by');
		}
		if(array_key_exists('force_join', $query_params)){
			$this->_extract_related_models_from_sub_params_array_values($query_params['force_join'],$query_info_carrier,'force_join');
		}
		return $query_info_carrier;
	}
	
	/**
	 * For extracting related models from WHERE (0), HAVING (having), ORDER BY (order_by) or forced joins (forece_join)
	 * @param array $sub_query_params like EEM_Base::get_all's $query_params[0] or $query_params['having'] 
	 * @param EE_Model_Query_Info_Carrier $model_query_info_carrier
	 * @param string $query_param_type one of $this->_allowed_query_params
	 */
	private function _extract_related_models_from_sub_params_array_keys($sub_query_params, EE_Model_Query_Info_Carrier $model_query_info_carrier,$query_param_type){
		if (!empty($sub_query_params)){
			$sub_query_params = (array) $sub_query_params;
			foreach($sub_query_params as $param => $possibly_array_of_params){
				//$param could be simply 'EVT_ID', or it could be 'Registrations.REG_ID', or even 'Registrations.Transactions.Payments.PAY_amount'
				$this->_extract_related_model_info_from_query_param( $param, $model_query_info_carrier,$query_param_type);
				
				//if $possibly_array_of_params is an array, try recursing into it, searching for keys which 
				//indicate needed joins. Eg, array('NOT'=>array('Registration.TXN_ID'=>23)). In this case, we tried
				//extracting models out of the 'NOT', which obviously wasn't successful, and then we recurse into the value
				//of array('Registration.TXN_ID'=>23)
				if(in_array($param, $this->_logic_query_param_keys,true)){
					if (! is_array($possibly_array_of_params)){
						throw new EE_Error(sprintf(__("You used a special where query param %s, but the value isnt an array of where query params, it's just %s'. It should be an array, eg array('EVT_ID'=>23,'OR'=>array('Venue.VNU_ID'=>32,'Venue.VNU_name'=>'monkeyland'))", "event_espresso"),
							$param,$possibly_array_of_params));
					}else{
						$this->_extract_related_models_from_sub_params_array_keys($possibly_array_of_params, $model_query_info_carrier,$query_param_type);
					}
				}
			}
		}
		return $model_query_info_carrier;
	}
	
	
	/**
	 * For extracting related models from forced_joins, where the array values contain the info about what
	 * models to join with. Eg an array like array('Attendee','Price.Price_Type');
	 * @param array $sub_query_params like EEM_Base::get_all's $query_params[0] or $query_params['having'] 
	 * @param EE_Model_Query_Info_Carrier $model_query_info_carrier
	 * @param string $query_param_type one of $this->_allowed_query_params
	 */
	private function _extract_related_models_from_sub_params_array_values($sub_query_params, EE_Model_Query_Info_Carrier $model_query_info_carrier,$query_param_type){
		if (!empty($sub_query_params)){
			if(!is_array($sub_query_params)){
				throw new EE_Error(sprintf(__("Query parameter %s should be an array, but it isn't.", "event_espresso"),$sub_query_params));
			}
			foreach($sub_query_params as $param){
				//$param could be simply 'EVT_ID', or it could be 'Registrations.REG_ID', or even 'Registrations.Transactions.Payments.PAY_amount'
				$this->_extract_related_model_info_from_query_param( $param, $model_query_info_carrier, $query_param_type);
			}
		}
		return $model_query_info_carrier;
	}
	
	/**
	 * Extract all the query parts from $query_params (an array like whats passed to EEMerimental_Base::get_all)
	 * and put into a EEM_Related_Model_Info_Carrier for easy extraction into a query. We create this object
	 * instead of directly constructing teh SQL because often we need to extract info from the $query_params
	 * but use them in a different order. Eg, we need to know what models we are querying
	 * before we know what joins to perform. However, we need to know what data types correspond to which fields on other
	 * models before we can finalize the where clause SQL.
	 * @param array $query_params
	 * @return EE_Model_Query_Info_Carrier
	 */
	function _create_model_query_info_carrier($query_params, $values_already_prepared_by_model_object = false){
		$query_object = $this->_extract_related_models_from_query($query_params);
		if(array_key_exists(0,$query_params)){
			$where_query_params = $query_params[0];
		}else{
			$where_query_params = array();
		}
		$where_query_params = array_merge($this->_get_default_where_conditions_for_models_in_query($query_object), $where_query_params );
		$query_object->set_where_sql( $this->_construct_where_clause($where_query_params, $values_already_prepared_by_model_object));


		//if this is a "on_join_limit" then we are limiting on on a specific table in a multi_table join.  So we need to setup a subquery and use that for the main join.  Note for now this only works on the primary table for the model.  So for instance, you could set the limit array like this:
		//array( 'on_join_limit' => array('Primary_Table_Alias', array(1,10) ) )
		if ( array_key_exists('on_join_limit', $query_params ) && $query_params['on_join_limit'] ) {
			$query_object->set_main_model_join_sql( $this->_construct_limit_join_select( $query_params['on_join_limit'][0], $query_params['on_join_limit'][1] ) );
		}


		//set limit
		if(array_key_exists('limit',$query_params) && $query_params['limit']){
			if(is_array($query_params['limit'])){
				//they passed us an array for the limit. Assume it's like array(50,25), meaning offset by 50, and get 25
				$query_object->set_limit_sql(" LIMIT ".$query_params['limit'][0].",".$query_params['limit'][1]);
			}else{
				$query_object->set_limit_sql((" LIMIT ".$query_params['limit']));
			}
		}
		//set order by
		if(array_key_exists('order_by',$query_params) && $query_params['order_by']){
			if(is_array($query_params['order_by'])){
				//if they're using 'order_by' as an array, they can't use 'order' (because 'order_by' must
				//specify whether to ascend or descend on each field. Eg 'order_by'=>array('EVT_ID'=>'ASC'). So 
				//including 'order' wouldn't make any sense if 'order_by' has already specified whihc way to order!
				if(array_key_exists('order', $query_params)){
					throw new EE_Error(sprintf(__("In querying %s, we are using query parameter 'order_by' as an array (keys:%s,values:%s), and so we can't use query parameter 'order' (value %s). You should just use the 'order_by' parameter ", "event_espresso"),
							get_class($this),implode(", ",array_keys($query_params['order_by'])),implode(", ",$query_params['order_by']),$query_params['order']));
				}
				 $this->_extract_related_models_from_sub_params_array_keys($query_params['order_by'],$query_object,'order_by');
				//assume it's an array of fields to order by
				$order_array = array();
				foreach($query_params['order_by'] as $field_name_to_order_by => $order){
					$order = $this->_extract_order($order);
					$field_to_order_by = $this->_deduce_field_from_query_param($field_name_to_order_by);
					$order_array[] = $field_to_order_by->get_qualified_column() .SP. $order ;
				}
				$query_object->set_order_by_sql(" ORDER BY ".implode(",",$order_array));
			}else{
				$this->_extract_related_model_info_from_query_param($query_params['order_by'],$query_object,'order',$query_params['order_by']);
				$field_to_order_by = $this->_deduce_field_from_query_param( $query_params['order_by'] );
				if(isset($query_params['order'])){
					$order = $this->_extract_order($query_params['order']);
				}else{
					$order = 'DESC';
				}
				$query_object->set_order_by_sql(" ORDER BY ".$field_to_order_by->get_qualified_column().SP.$order);
			}
		}
		
		//if 'order_by' wasn't set, maybe they are just using 'order' on its own?
		if( ! array_key_exists('order_by',$query_params) && array_key_exists('order',$query_params)){
			$pk_field = $this->get_primary_key_field();
			$order = $this->_extract_order($query_params['order']);
			$query_object->set_order_by_sql(" ORDER BY ".$pk_field->get_qualified_column().SP.$order);
		}
		
		//set group by
		if(array_key_exists('group_by',$query_params) && $query_params['group_by']){
			if(is_array($query_params['group_by'])){
				//it's an array, so assume we'll be grouping by a bunch of stuff
				$group_by_array = array();
				foreach($query_params['group_by'] as $field_name_to_group_by){
					$field_obj = $this->_deduce_field_from_query_param($field_name_to_group_by);//$this->field_settings_for($field_name_to_group_by);
					$group_by_array[] = $field_obj->get_qualified_column();
				}
				$query_object->set_group_by_sql(" GROUP BY ".implode(", ",$group_by_array));
			}else{
				$field_obj = $this->_deduce_field_from_query_param($query_params['group_by']);
				$query_object->set_group_by_sql(" GROUP BY ".$field_obj->get_qualified_column());
			}
		}
		//set having
		if(array_key_exists('having',$query_params) && $query_params['having']){
			$query_object->set_having_sql( $this->_construct_having_clause($query_params['having'], $values_already_prepared_by_model_object));
		}

		//now, just verify they didnt pass anything wack
		foreach($query_params as $query_key => $query_value){
			if( ! in_array($query_key,$this->_allowed_query_params,true)){
				throw new EE_Error(sprintf(__("You passed %s as a query parameter to %s, which is illegal!",'event_espresso'),$query_key,get_class($this)));
			}
		}
		$main_model_join_sql = $query_object->get_main_model_join_sql();
		if ( empty( $main_model_join_sql ) )
			$query_object->set_main_model_join_sql($this->_construct_internal_join());
		return $query_object;
	}
	
	/**
	 * Verifies that $should_be_order_string is in $this->_allowed_order_values,
	 * otherwise throws an exception
	 * @param string $should_be_order_string
	 * @return string either ASC, asc, DESC or desc
	 * @throws EE_Error
	 */
	private function _extract_order($should_be_order_string){
		if(in_array($should_be_order_string, $this->_allowed_order_values)){
			return $should_be_order_string;
		}else{
			throw new EE_Error(sprintf(__("While performing a query on %s, tried to use %s as an order parameter. ", "event_espresso"),get_class($this),$should_be_order_string));
		}
	}
	
	/**
	 * Looks at all the models which are included in this query, and asks each
	 * for their universal_where_params, and returns them in the same format as $query_params[0] (where),
	 * so they can be merged
	 * @param EE_Model_Query_Info_Carrier $query_info_carrier
	 */
	private function _get_default_where_conditions_for_models_in_query(EE_Model_Query_Info_Carrier $query_info_carrier){
		$universal_query_params = $this->_get_default_where_conditions();
		
		foreach($query_info_carrier->get_model_names_included() as $model_name =>$model_relation_path){
			$related_model = $this->get_related_model_obj($model_name);
			$related_model_universal_where_params = $related_model->_get_default_where_conditions($model_relation_path);
			$universal_query_params = array_merge($universal_query_params, $related_model_universal_where_params);
		}
		return $universal_query_params;
	}
	
	/**
	 * Uses the _default_where_conditions_strategy set during __construct() to get
	 * default where conditions on all get_all, update, and delete queries done by this model.
	 * Use the same syntax as client code. Eg on the Event model, use array('Event.EVT_post_type'=>'esp_event'), 
	 * NOT array('Event_CPT.post_type'=>'esp_event'). 
	 * @param string $model_relation_path eg, path from Event to Payment is "Registration.Transaction.Payment."
	 * @return array like EEM_Base::get_all's $query_params[0] (where conditions)
	 */
	private function _get_default_where_conditions($model_relation_path = null){
		if ( $this->_ignore_where_strategy )
			return array();

		return $this->_default_where_conditions_strategy->get_default_where_conditions($model_relation_path);
	}
	/**
	 * Creates the string of SQL for the select part of a select query, everything behind SELECT and before FROM.
	 * Eg, "Event.post_id, Event.post_name,Event_Detail.EVT_ID..."
	 * @param EE_Model_Query_Info_Carrier $model_query_info
	 * @return string
	 */
	public function _construct_select_sql(EE_Model_Query_Info_Carrier $model_query_info){
		$selects = $this->_get_columns_to_select_for_this_model();
		foreach($model_query_info->get_model_names_included() as $name_of_other_model_included=>$model_relation_chain){
			$other_model_included = $this->get_related_model_obj($name_of_other_model_included);
			$selects = array_merge($selects, $other_model_included->_get_columns_to_select_for_this_model());
		}
		return implode(", ",$selects);
	}
	
	/**
	 * Gets an array of columns to select for this model, which are necessary for it to create its objects.
	 * So that's going to be the columsn for all the fields on the model
	 * @return array numerically indexed, values are columns to select and rename, eg "Event.ID AS 'Event.ID'"
	 */
	public function _get_columns_to_select_for_this_model(){
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
		return $selects;
	}
	
	/**
	 * Given a $query_param like 'Registration.Transaction.TXN_ID', pops off 'Registration.',
	 * gets the join statement for it; gets the data types for it; and passes the remaining 'Transaction.TXN_ID'
	 * onto its related Transaction object to do the same. Returns an EE_Join_And_Data_Types object which contains the SQL
	 * for joining, and the data types
	 * @param string $query_param like Registration.Transaction.TXN_ID
	 * @param boolean $look_for_field_names. if true (default), we're working with strings like 'Event.Venue.VNU_ID' or 'Registration.REG_ID'
	 * @param boolean $allow_logic_query_params whether or not to allow logic_query_params like 'NOT','OR', or 'AND'
	 * or 'PAY_ID'. Otherwise, we don't expect there to be a column name. We only want model names, eg 'Event.Venue' or 'Registration's
	 * @return void only modifies the EEM_Related_Model_Info_Carrier passed into it
	 */	
	private function _extract_related_model_info_from_query_param($query_param, EE_Model_Query_Info_Carrier $passed_in_query_info, $query_param_type, $original_query_param = null){
		if($original_query_param == null){
			$original_query_param = $query_param;
		}
		$query_param = $this->_remove_stars_and_anything_after_from_condition_query_param_key($query_param);//str_replace("*", "", $query_param);
		$allow_logic_query_params = in_array($query_param_type,array('where','having'));
		$allow_fields = in_array($query_param_type,array('where','having','order_by','group_by','order'));
		//check to see if we have a field on this model
		$this_model_fields = $this->field_settings(true);
		if(array_key_exists($query_param,$this_model_fields)){
			if($allow_fields){
				return;
			}else{
				throw new EE_Error(sprintf(__("Using a field name (%s) on model %s is not allowed on this query param type '%s'. Original query param was %s", "event_espresso"),
						$query_param,get_class($this),$query_param_type,$original_query_param));
			}
		}
		//check if this is a special logic query param
		elseif(in_array($query_param, $this->_logic_query_param_keys)){
			if($allow_logic_query_params){
				return;
			}else{
				throw new EE_Error(sprintf(__("Logic query params (%s) are being used in the wrong quer params on model %s", "event_espresso"),implode(",",$this->_logic_query_param_keys),get_class($this)));
			}
		}	

		//check if has a model name at the beginning 
		//and
		//check if it's a field on a related model
		foreach($this->_model_relations as $valid_related_model_name=>$relation_obj){
			if(strpos($query_param, $valid_related_model_name.".") === 0){
				$this->_add_join_to_model($valid_related_model_name, $passed_in_query_info,$original_query_param);
				
				$query_param = str_replace($valid_related_model_name.".","",$query_param);
				if($query_param == ''){
					//nothing left to $query_param
					//we should actually end in a field name, not a model like this!
					throw new EE_Error(sprintf(__("Query param '%s' (of type %s on model %s) shouldn't end on a period (.) ", "event_espresso"),
							$query_param,$query_param_type,get_class($this),$valid_related_model_name));
				}else{
					$related_model_obj = $this->get_related_model_obj($valid_related_model_name);
					return $related_model_obj->_extract_related_model_info_from_query_param($query_param, $passed_in_query_info, $query_param_type, $original_query_param);
				}
			}elseif($query_param == $valid_related_model_name){
				$this->_add_join_to_model($valid_related_model_name, $passed_in_query_info,$original_query_param);
				return;
			}
		}


		//ok so $query_param didn't start with a model name
		//and we previously confirmed it wasn't a logic query param or field on the current model
		//it's wack, that's what it is
		throw new EE_Error(sprintf(__("There is no model named '%s' related to %s. Query param type is %s and original query param is %s", "event_espresso"),
				$query_param,get_class($this),$query_param_type,$original_query_param));
		
	}
	
	/**
	 * Privately used by _extract_related_model_info_from_query_param to add a join to $model_name 
	 * and store it on $passed_in_query_info
	 * @param string $model_name
	 * @param EE_Model_Query_Info_Carrier $passed_in_query_info
	 * @param string $original_query_param used to extract the relation chain between the queried model and $model_name.
	 * Eg, if we are querying Event, and are adding a join to 'Payment' with the original queyr param key 'Registration.Transaction.Payment.PAY_amount',
	 * we want to extract 'Registration.Transaction', in case Payment wants to add defautl query params so that it will know
	 * what models to prepend onto its default query params
	 * @return void
	 */
	private function _add_join_to_model($model_name, EE_Model_Query_Info_Carrier $passed_in_query_info,$original_query_param){
		$relation_obj = $this->related_settings_for($model_name);
		
		$model_relation_chain = $this->_extract_model_relation_chain($model_name, $original_query_param);
		//check if teh relation is HABTM, because then we're essentially doing two joins
		//If so, join first to the JOIN table, and add its data types, and then continue as normal
		if($relation_obj instanceof EE_HABTM_Relation){
			$join_model_obj = $relation_obj->get_join_model();
			$new_query_info = new EE_Model_Query_Info_Carrier(
					array($join_model_obj->get_this_model_name()=>''), 
					$relation_obj->get_join_to_intermediate_model_statement());
			$passed_in_query_info->merge( $new_query_info  );
		}
		//now just join to the other table pointed to by the relation object, and add its data types
		$new_query_info = new EE_Model_Query_Info_Carrier(
				array($model_name=>$model_relation_chain), 
				$relation_obj->get_join_statement());
		$passed_in_query_info->merge( $new_query_info  );
	}
	
	/**
	 * Gets the model relation chain to $model_name from the $original_query_param.
	 * Eg, if $model_name were 'Payment', and $originL-query_param were 'Registration.Transaction.Payment.PAY_ID',
	 * this would return 'Registration.Transaction.Payment'
	 * @param string $model_name
	 * @param string $original_query_param
	 * @return string
	 */
	private function _extract_model_relation_chain($model_name,$original_query_param){
		$pos_of_model_string = strpos($original_query_param, $model_name);
		//eg, if we're looking for the model relationp chain from Event to Payment, the original query param is probably something like
		//"Registration.Transaction.Payment.PAY_ID", $pos_of_modle_string points to the 'P' or Payment. We want the string
		//"Registration.Transaction.Payment"
		$model_relation_chain = substr($original_query_param, 0,$pos_of_model_string+strlen($model_name));
		return $model_relation_chain;
	}
	
	
	/**
	 * Constructs SQL for where clause, like "WHERE Event.ID = 23 AND Transaction.amount > 100" etc.
	 * @global type $wpdb
	 * @param array $where_params like EEMerimental_Base::get_all
	 * @return string of SQL
	 */
	private function _construct_where_clause($where_params, $values_already_prepared_by_model_object = false){
		$SQL = $this->_construct_condition_clause_recursive($where_params, ' AND ', $values_already_prepared_by_model_object);
		if($SQL){
			return " WHERE ". $SQL;
		}else{
			return '';
		}
	}
	
	/**
	 * Just like the _construct_where_clause, except prepends 'HAVING' instead of 'WHERE',
	 * and should be passed HAVING parameters, not HWERE parameters
	 * @param type $having_params
	 * @param type $values_already_prepared_by_model_object
	 * @return string
	 */
	private function _construct_having_clause($having_params, $values_already_prepared_by_model_object = false){
		$SQL = $this->_construct_condition_clause_recursive($having_params, ' AND ', $values_already_prepared_by_model_object);
		if($SQL){
			return " HAVING ". $SQL;
		}else{
			return '';
		}
		
	}
	
	/**
	 * Gets the EE_Model_Field on the model indicated by $model_name and the $field_name.
	 * Eg, if called with _get_field_on_model('ATT_ID','Attendee'), it will return the EE_Primary_Key_Field on EEM_Attendee.
	 * @param string $field_name
	 * @param string $model_name
	 * @return EE_Model_Field
	 * @throws EE_Error
	 */
	protected function _get_field_on_model($field_name,$model_name){
		$model_class = 'EEM_'.$model_name;
		$model_filepath = $model_class.".model.php";
		if(file_exists($model_filepath)){
			require_once($model_filepath);
			$model_instance=call_user_func($model_name."::instance");
			/* @var $model_instance EEM_Base */
			return $model_instance->field_settings_for($field_name);
		}else{
			throw new EE_Error(sprintf(__('No model named %s exists, with classname %s and filepath %s','event_espresso'),$model_name,$model_class,$model_filepath));
		}
	}
	
	/**
	 * Used for creating nested WHERE conditions. Eg "WHERE ! (Event.ID = 3 OR ( Event_Meta.meta_key = 'bob' AND Event_Meta.meta_value = 'foo'))"
	 * @param array $where_params see EEM_Base::get_all for documentation
	 * @param string $glue joins each subclause together. Should really only be " AND " or " OR "...
	 * @return string of SQL
	 */
	private function _construct_condition_clause_recursive($where_params, $glue = ' AND', $values_already_prepared_by_model_object = false){
		$where_clauses=array();
		foreach($where_params as $query_param => $op_and_value_or_sub_condition){
			$query_param = $this->_remove_stars_and_anything_after_from_condition_query_param_key($query_param);//str_replace("*",'',$query_param);
			if(in_array($query_param,$this->_logic_query_param_keys)){
				switch($query_param){
					case 'not':
					case 'NOT':
						$where_clauses[] = "! (". $this->_construct_condition_clause_recursive($op_and_value_or_sub_condition, $glue).")";
						break;
					case 'and':
					case 'AND':
						$where_clauses[] = " (". $this->_construct_condition_clause_recursive($op_and_value_or_sub_condition, ' AND ') .")";
						break;
					case 'or':
					case 'OR':
						$where_clauses[] = " (". $this->_construct_condition_clause_recursive($op_and_value_or_sub_condition, ' OR ') .")";
						break;
				}
			}else{
				$field_obj = $this->_deduce_field_from_query_param($query_param);
				$op_and_value_sql = $this->_construct_op_and_value($op_and_value_or_sub_condition, $field_obj, $values_already_prepared_by_model_object);
				$where_clauses[]=$field_obj->get_qualified_column().SP.$op_and_value_sql;
			}
		}
		if($where_clauses){
			$SQL = implode($glue,$where_clauses);
		}else{
			$SQL = '';
		}
		return $SQL;
	}
	
	/**
	 * Removes the * and anything after it from the condition query param key. It is useful to add the * to condition query
	 * param keys (eg, 'OR*', 'EVT_ID') in order for the array keys to still be unique, so that they don't get overwritten
	 * Takes a string like 'Event.EVT_ID*', 'TXN_total**', 'OR*1st', and 'DTT_reg_start*foobar' to
	 * 'Event.EVT_ID', 'TXN_total', 'OR', and 'DTT_reg_start', respectively.
	 * @param string $condition_query_param_key
	 * @return string
	 */
	private function _remove_stars_and_anything_after_from_condition_query_param_key($condition_query_param_key){
		$pos_of_star = strpos($condition_query_param_key, '*');
		if($pos_of_star === FALSE){
			return $condition_query_param_key;
		}else{
			$condition_query_param_sans_star = substr($condition_query_param_key, 0, $pos_of_star);
			return $condition_query_param_sans_star;
		}
	}
	
	/**
	 * creates the SQL 
	 * @param type $op_and_value
	 * @param EE_Model_Feild $field_obj
	 * @return string
	 */
	private function _construct_op_and_value($op_and_value, EE_Model_Field_Base $field_obj, $values_already_prepared_by_model_object = false){
		if(is_array( $op_and_value ) && preg_match( '/NULL/', $op_and_value[0]) ){
			//handle special operators that don't HAVE a value (such as "IS NOT NULL")
			$operator = $op_and_value[0];
			$value = NULL;
			
		}else if ( is_array($op_and_value) ) {
			//assume first arg is an aray
			$operator = $op_and_value[0];
			$value = $op_and_value[1];
		}else{
			$operator = '=';
			$value = $op_and_value;
		}

		if(in_array($operator, $this->_in_style_operators) && is_array($value)){
				//in this case, the value should be an array, or at least a comma-seperated list
				//it will need to handle a little differently
				$cleaned_value = $this->_construct_in_value($value, $field_obj, $values_already_prepared_by_model_object);
				//note: $cleaned_value has already been run through $wpdb->prepare()
				return $operator.SP.$cleaned_value;
		} elseif( in_array( $operator, $this->_between_style_operators ) && is_array( $value ) ) {
			//the value should be an array with count of two.
			if ( count($value) !== 2 )
				throw new EE_Error( sprintf( __("The '%s' operator must be used with an array of values and there must be exactly TWO values in that array.", 'event_espresso'), "BETWEEN" ) );
			$cleaned_value = $this->_construct_between_value( $value, $field_obj, $values_already_prepared_by_model_object );
			return $operator.SP.$cleaned_value;
		} else if( in_array( $operator, $this->_null_style_operators ) ) {
			return $operator;
		}elseif( ! in_array($operator, $this->_in_style_operators) && ! is_array($value)){
			global $wpdb;
			return $wpdb->prepare($operator.SP.$field_obj->get_wpdb_data_type(), $this->_prepare_value_for_use_in_db($value, $field_obj, $values_already_prepared_by_model_object));
		}elseif(in_array($operator, $this->_in_style_operators) && ! is_array($value)){
			throw new EE_Error(sprintf(__("Operator '%s' must be used with an array of values, eg 'Registration.REG_ID' => array('%s',array(1,2,3))",'event_espresso'),$operator, $operator));
		}elseif( ! in_array($operator, $this->_in_style_operators) && is_array($value)){
			throw new EE_Error(sprintf(__("Operator '%s' must be used with a single value, not an array. Eg 'Registration.REG_ID => array('%s',23))",'event_espresso'),$operator,$operator));
		}
	}




	function _construct_between_value( $values, EE_Model_Field_Base $field_obj, $values_already_prepared_by_model_object = false ) {
		global $wpdb;
		foreach ( $values as $value ) {
			$cleaned_values[] = $wpdb->prepare( $field_obj->get_wpdb_data_type(), $this->_prepare_value_for_use_in_db( $value, $field_obj, $values_already_prepared_by_model_object ) );
		}
		return "'" . $cleaned_values[0] . "' AND '" . $cleaned_values[1] . '"';
	}



	
	/**
	 * Takes an array or a comma-seperated list of $values and cleans them 
	 * according to $data_type using $wpdb->preapre, and then makes the list a 
	 * string surrounded by ( and ). Eg, _construct_in_value(array(1,2,3),'%d') would
	 * return '(1,2,3)'; _construct_in_value("1,2,hack",'%d') would return '(1,2,1)' (assuming
	 * I'm right that a string, when interpreted as a digit, becomes a 1. It might become a 0)
	 * @param mixed $values array or comma-seperated string
	 * @param EE_MOdel_Field_Base $field-OBj
	 * @return string of SQL to follow an 'IN' or 'NOT IN' operator
	 */
	function _construct_in_value($values, EE_Model_Field_Base $field_obj, $values_already_prepared_by_model_object = false){
		global $wpdb;
		//check if the value is a CSV'd list
		if(is_string($values)){
			//in which case, turn it into an array
			$values = explode(",",$values);
		}
		foreach($values as $value){
			$cleaned_values[] = $wpdb->prepare($field_obj->get_wpdb_data_type(),$this->_prepare_value_for_use_in_db($value, $field_obj, $values_already_prepared_by_model_object));
		}
		return "(".implode(",",$cleaned_values).")";
	}
	
	
	/**
	 * Takes the input parameter and extract the table name (alias) and column name
	 * @param string $query_param_name like Registration.Transaction.TXN_ID, Event.Datetime.start_time, or REG_ID
	 * @return string table alias and column name for SQL, eg "Transaction.TXN_ID"
	 */
	protected function _deduce_field_from_query_param($query_param_name){
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
		return $model_obj->field_settings_for($field_name);
	}
	
	
	/**
	 * Givena field's name (ie, a key in $this->field_settings()), uses the EE_Model_Field object to get the table's alias and column
	 * which corresponds to it
	 * @param string $field_name
	 */
	function _get_qualified_column_for_field($field_name){
		$all_fields = $this->field_settings();
		$field = isset($all_fields[$field_name]) ? $all_fields[$field_name] : FALSE;
		if($field){
			return $field->get_qualified_column();
		}else{
			throw new EE_Error(sprintf(__("There is no field titled %s on model %s. Either the query trying to use it is bad, or you need to add it to the list of fields on the model.",'event_espresos'),$field_name,get_class($this)));
		}
	}




	/**
	 * constructs the select use on special limit joins
	 * NOTE: for now this has only been tested and will work when the  table alias is for the PRIMARY table. Although its setup so the select query will be setup on and just doing the special select join off of the primary table (as that is typically where the limits would be set).
	 * @param  string $table_alias The table the select is being built for
	 * @param  mixed|string $limit The limit for this select
	 * @return string 				The final select join element for the query.
	 */
	function _construct_limit_join_select( $table_alias, $limit ) {
		$SQL = '';
		
		foreach ( $this->_tables as $table_obj ) {
			if ( $table_obj instanceof EE_Primary_Table ) {
				$SQL .= $table_alias == $table_obj->get_table_alias() ? $table_obj->get_select_join_limit( $limit ) : SP.$table_obj->get_table_name()." AS ".$table_obj->get_table_alias().SP;
			} elseif ( $table_obj instanceof EE_Secondary_Table ) {
				$SQL .= $table_alias == $table_obj->get_table_alias() ? $table_obj->get_select_join_limit_join($limit) : SP . $table_obj->get_join_sql().SP;
			}
		}
		return $SQL;
	}


	
	/**
	 * Constructs the internal join if there are multiple tables, or simply the table's name and alias
	 * Eg "wp_post AS Event" or "wp_post AS Event INNER JOIN wp_postmeta Event_Meta ON Event.ID = Event_Meta.post_id"
	 * @return string SQL 
	 */
	function _construct_internal_join(){
		$SQL = $this->_get_main_table()->get_table_sql();
		$SQL .= $this->_construct_internal_join_to_table_with_alias($this->_get_main_table()->get_table_alias());
		return $SQL;
	}

	
	/**
	 * Constructs the SQL for joining all the tables on this model.
	 * Normally $alias should be the primary table's alias, but in cases where
	 * we have already joined to a secondary table (eg, the secondary table has a foreign key and is joined before the primary table)
	 * then we should provide that secondary table's alias.
	 * Eg, with $alias being the primary table's alias, this will construct SQL like: 
	 * " INNER JOIN wp_esp_secondary_table AS Secondary_Table ON Primary_Table.pk = Secondary_Table.fk".
	 * With $alias being a secondary table's alias, this will construct SQL like:
	 * " INNER JOIN wp_esp_primary_table AS Primary_Table ON Primary_Table.pk = Secondary_Table.fk".
	 * 
	 * @param string $alias table alias to join to (this table should already be in the FROM SQL clause)
	 * @return string
	 */
	function _construct_internal_join_to_table_with_alias($alias){
		$SQL = '';
		foreach($this->_tables as $table_obj){
			if($table_obj instanceof EE_Secondary_Table){//table is secondary table
				if($alias == $table_obj->get_table_alias()){
					//so we're joining to this table, meaning the table is already in 
					//the FROM statement, BUT the primary table isn't. So we want
					//to add teh inverse join sql
					$SQL .= $table_obj->get_inverse_join_sql();
				}else{
					//just add a regular JOIN to this table from the primary table
					$SQL .= $table_obj->get_join_sql();
				}
			}//if it's a primary table, dont add any SQL. it should alredy be in the FROM statement
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
	 * @return EEM_Base
	 */
	function get_related_model_obj($model_name){
		
		$model_classname = "EEM_".$model_name;
		if(!class_exists($model_classname)){
			throw new EE_Error(sprintf(__("You specified a related model named %s in your query. No such model exists, if it did, it would have the classname %s",'event_espresso'),$model_name,$model_classname));
		}
		$model_obj = call_user_func($model_classname."::instance");
		return $model_obj;
	}
	
	
	/**
	 * Returns the array of EE_ModelRelations for this model.
	 * @return EE_Model_Relation[]
	 */
	public function relation_settings(){
		return $this->_model_relations;
	}
	
	
	
	/**
	 * Returns the specified EE_Model_Relation, or throws an exception
	 * @param string $relation_name name of relation, key in $this->_relatedModels
	 * @return EE_Model_Relation
	 */
	public function related_settings_for($relation_name){
		$relatedModels=$this->relation_settings();
		if(!array_key_exists($relation_name,$relatedModels)){
			throw new EE_Error(sprintf(__('Cannot get %s related to %s. There is no model relation of that type. There is, however, %s...','event_espresso'),$relation_name,  $this->_get_class_name(),implode(array_keys($relatedModels))));
		}
		return $relatedModels[$relation_name];
	}
	
	
	
	/**
	 * A convenience method for getting a specific field's settings, instead of getting all field settings for all fields
	 * @param string $fieldName
	 * @return EE_Model_Field
	 */
	public function field_settings_for($fieldName){
		$fieldSettings=$this->field_settings(true);
		if( ! array_key_exists($fieldName,$fieldSettings)){
			throw new EE_Error(sprintf(__("There is no field/column '%s' on '%s'",'event_espresso'),$fieldName,get_class($this)));
		}
		return $fieldSettings[$fieldName];
	}
	

	
	/**
	 * gets the name of the field of type 'primary_key' from the fieldsSettings attribute.
	 * Eg, on EE_Anwer that would be ANS_ID
	 * @return EE_Model_Field_Base
	 * @throws EE_Error
	 */
	public function get_primary_key_field(){
		foreach($this->field_settings(true) as $field_name=>$field_obj){
			if($field_obj instanceof EE_Primary_Key_Field_Base){
				return $field_obj;
			}
		}
		throw new EE_Error(sprintf(__("There is no Primary Key defined on model %s",'event_espresso'),get_class($this)));
	}
	/**
	 * Flag indicating whether this model has a primary key or not
	 * @var boolean
	 */
	protected $_has_primary_key_field=null;
	/**
	 * Returns whether or not not there is a primary key on this model.
	 * Internally does some caching.
	 * @return boolean
	 */
	public function has_primary_key_field(){
		if($this->_has_primary_key_field === null){
			try{
				$this->get_primary_key_field();
				$this->_has_primary_key_field = true;
			}catch(EE_Error $e){
				$this->_has_primary_key_field = false;
			}
		}
		return $this->_has_primary_key_field;
		
	}
	
	/**
	 * Finds the first field of type $field_class_name.
	 * @param string $field_class_name class name of field that you want to find. Eg, EE_Datetime_Field, EE_Foreign_Key_Field, etc
	 * @return EE_Model_Field_Base or null if none is found
	 */
	public function get_a_field_of_type($field_class_name){
		foreach($this->field_settings() as $field){
			if(is_a($field,  $field_class_name)){
				return $field;
			}
		}
		return null;
		
	}
	/**
	 * Gets a foreign key field pointing to model. 
	 * @param string $model_name eg Event, Registration, not EEM_Event
	 * @return EE_Foreign_Key_Field_Base
	 * @throws EE_Error
	 */
	public function get_foreign_key_to($model_name){
		foreach($this->field_settings() as $field){			
			if(is_subclass_of($field, 'EE_Foreign_Key_Field_Base')){
				if(is_array($field->get_model_name_pointed_to()) && in_array($model_name,$field->get_model_name_pointed_to())){
					return $field;
				}elseif( ! is_array($field->get_model_name_pointed_to()) && $field->get_model_name_pointed_to() == $model_name){
					return $field;
				}
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
	 * @param $include_db_only_fields flag indicating whether or not to include the db-only fields
	 * @return EE_Model_Field_Base[] where the keys are the field's name
	 */
	public function field_settings($include_db_only_fields = false){
		$all_fields = array();
		foreach($this->_fields as $table_alias => $fields_corresponding_to_table){
			foreach($fields_corresponding_to_table as $field_name => $field_obj){
				if( !$field_obj->is_db_only_field() || ($include_db_only_fields && $field_obj->is_db_only_field())){
					$all_fields[$field_name]=$field_obj;
				}
			}
		}
		return $all_fields;
	}
	
	/**
	*		cycle though array of attendees and create objects out of each item
	* 
	* 		@access		private
	* 		@param		array		$attendees		
	*		@return 	EE_Base_Class[]		array keys are primary keys (if there is a primary key on the model. if not, numerically indexed)
	*/	
	protected function _create_objects( $rows = array() ) {
		$this->_include_php_class();
		$array_of_objects=array();
		if(empty($rows)){
			return array();
		}
		$count_if_model_has_no_primary_key = 0;
		foreach ( $rows as $row ) {
			if(empty($row)){//wp did its weird thing where it returns an array like array(0=>null), which is totally not helpful...
				return array();
			}
			$classInstance=$this->instantiate_class_from_array_or_object($row);
			//set the timezone on the instantiated objects
			$classInstance->set_timezone( $this->_timezone );

			//make sure if there is any timezone setting present that we set the timezone for the object
			$array_of_objects[$this->has_primary_key_field() ? $classInstance->ID() : $count_if_model_has_no_primary_key++]=$classInstance;
			//also, for all the relations of type BelgonsTo, see if we can cache
			//those related models
			//(we could do this for other relations too, but if there are conditions
			//that filtered out some fo the results, then we'd be caching an incomplete set
			//so it requires a little more thought than just caching them immeidately...)
			foreach($this->_model_relations as $modelName => $relation_obj){
				if( $relation_obj instanceof EE_Belongs_To_Relation){
					//check if this model's INFO is present. If so, cache it on the model
					$other_model = $relation_obj->get_other_model();

					$other_model_obj_maybe = $other_model->instantiate_class_from_array_or_object($row);

					//if we managed to make a model object from the results, cache it on the main model object
					if( $other_model_obj_maybe ){
						//set timezone on these other model objects if they are present
						$other_model_obj_maybe->set_timezone( $this->_timezone );
						$classInstance->cache($modelName, $other_model_obj_maybe);
					}
				}
			}
		}
		return $array_of_objects;	
	}



	/**
	 * The purpose of this method is to allow us to create a model object that is not in the db that holds default values.  
	 * A typical example of where this is used is when creating a new item and the initial load of a form.  We dont' necessarily want to test for if the object is present but just assume it is BUT load the defaults from the object (as set in the model_field!).
	 * 
	 * @return EE_Base_Class single EE_Base_Class object with default values for the properties.
	 */
	public function create_default_object() {
		$this->_include_php_class();

		$this_model_fields_and_values = array();
		//setup the row using default values;
		foreach ( $this->field_settings() as $field_name => $field_obj ) {
			$this_model_fields_and_values[$field_name] = $field_obj->get_default_value();
		}

		$className = $this->_get_class_name();
		$classInstance = call_user_func_array( array( $className, 'new_instance' ), array( $this_model_fields_and_values ) );

		return $classInstance;
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
		if(!is_array($cols_n_values) && is_object( $cols_n_values ) ){
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
		//check we actually foudn results that we can use to build our model object
		//if not, return null
		if( ! $this_model_fields_n_values){
			return null;
		}
				
		//get the required info to instantiate the class whcih relates to this model.
		$className=$this->_get_class_name();

		$classInstance = call_user_func_array( array( $className, 'new_instance_from_db' ), array( $this_model_fields_n_values, $this->_timezone ) );

		//it is entirely possible that the instantiated class object has a set timezone_string db field and has set it's internal _timezone property accordingly (see new_instance_from_db in model objects particularly EE_Event for example).  In this case, we want to make sure the model object doesn't have its timezone string overwritten by any timezone property currently set here on the model so, we intentially override the model _timezone property with the model_object timezone property.
		$this->set_timezone( $classInstance->get_timezone() );

		return $classInstance;
	}
	/**
	 * Gets the EE class that corresponds to this model. Eg, for EEM_Answer that
	 * would be EE_Answer.To import that class, you'd just add ".class.php" to the name, like so
	 * require_once($this->_getClassName().".class.php");
	 * @return string
	 */
	private function _get_class_name(){
		return "EE_".$this->get_this_model_name();
	}
	
	/**
	 * Get the name of the items this model repesents, for teh quanitity specified. Eg, 
	 * if $quantity==1, on EEM_Event, it would 'Event' (internationalized), otherwise 
	 * it would be 'Events'.
	 * @param int $quantity
	 * @return string
	 */
	public function item_name($quantity = 1){
		if($quantity == 1){
			return $this->singular_item;
		}else{
			return $this->plural_item;
		}
	}
	
	/**
	 * Very handy general function to allow for plugins to extend any child of EE_TempBase.
	 * If a method is called on a child of EE_TempBase that doesn't exist, this function is called (http://www.garfieldtech.com/blog/php-magic-call)
	 * and passed the method's name and arguments.
	 * Instead of requiring a plugin to extend the EE_TempBase (which works fine is there's only 1 plugin, but when will that happen?)
	 * they can add a hook onto 'filters_hook_espresso__{className}__{methodName}' (eg, filters_hook_espresso__EE_Answer__my_great_function)
	 * and accepts 2 arguments: the object on which teh function was called, and an array of the original arguments passed to the function. Whatever their callbackfunction returns will be returned by this function.
	 * Example: in functions.php (or in a plugin):
	 * add_filter('FHEE__EE_Answer__my_callback','my_callback',10,3);
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
		$tagName="FHEE__{$className}__{$methodName}";
		if(!has_filter($tagName)){
			throw new EE_Error(sprintf(__("Method %s on model %s does not exist! You can create one with the following code in functions.php or in a plugin: add_filter('%s','my_callback',10,3);function my_callback(\$previousReturnValue,EEM_Base \$object\$argsArray=null){/*function body*/return \$whatever;}","event_espresso"),
										$methodName,$className,$tagName));
		}
		
		return apply_filters($tagName,null,$this,$args);
	}
	
	/**
	 * Ensures $base_class_obj_or_id is of the EE_Base_Class child that corresponds ot this model.
	 * If not, assumes its an ID, and uses $this->get_one_by_ID() to get the EE_Base_Class.
	 * @param EE_Base_Class/int $base_class_obj_or_id either teh EE_Base_Class taht corresponds to this Model, or its ID
	 * @param boolean $ensure_is_in_db if set, we will also verify this model object exists in the database. If it does not, we add it
	 * @return EE_Base_Class
	 */
	public function ensure_is_obj($base_class_obj_or_id, $ensure_is_in_db = false){ 
		if(is_a($base_class_obj_or_id,$this->_get_class_name())){
			$model_object = $base_class_obj_or_id;
		}elseif(is_int($base_class_obj_or_id)){//assume it's an ID
			$model_object = $this->get_one_by_ID($base_class_obj_or_id);
		}elseif(is_string($base_class_obj_or_id) && intval($base_class_obj_or_id)){//assume its a string representation of the object
			$model_object = $this->get_one_by_ID(intval($base_class_obj_or_id));
		}else{
			throw new EE_Error(sprintf(__("'%s' is neither an object of type %s, nor an ID! Its full valeu is '%s'",'event_espresso'),$base_class_obj_or_id,$this->_get_class_name(),print_r($base_class_obj_or_id,true)));
		}
		if( $model_object->ID() == NULL && $ensure_is_in_db){
			$model_object->save();
		}
		return $model_object;	
	}
	
	
	
}
