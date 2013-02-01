<?php
require_once('EEM_Base.model.php');
abstract class EEM_TempBase extends EEM_Base{
	/** 
	 * arary for defining all the fields on a model. May not replace all the 
	 * individual setters and getters, as these are convenient for PHP docs and developing,
	 * but sets a central place to define all these attributes, rather than repetitively
	 * coding them into functions, and in different classes.
	 * The keys must be field names (as they appear in the database),
	 * and the values must be an EE_ModelField of fieldSettings for that specified field.
	 * Eg: array('ANS_ID'=>new EE_ModelField(...),...)
	 * @var array 
	 */
	protected $_fields_settings=null;
	/**
	 * Array containing information about the related models to this one. Each key in the array
	 * identifies the model (eg 'Questions', or 'Answer'), and each value is an EE_Model_Relation containing
	 * information about the type of relationship
	 * @var EE_Model_Relation[] 
	 */
	protected $_related_models;
	
	/**
	 * Important note for classes which override EEM_TempBase.
	 * In your constructor, you must define $_fields_settings, which should be an array of EE_Model_Field, where the keys
	 * are the db column names (on the related class, you must add these as attributes, prepended with an "_".) See the implementation of
	 * EEM_Answer's constructor for an example. Also note on EE_Answer (the class for the Model) there are attributes $_ANS_ID, $_ANS_value,etc.'
	 * You must also defin $_related_models. This is an array of EE_Model_Relation where the keys are a string that explains the relationship, and
	 * that must also be an attribute on the class prepended with an "_". Again, see EEM_Answer, which has a relationship to 'Question', and that 
	 * EE_Answer (the class for EEM_Answer) has an attribute $_Question, which is used for storing the EE_Question array once it is requested.
	 */
	protected function __construct() {
		$this->table_name=$this->_get_table_name();
		$this->table_data_types=$this->_get_table_data_types();
	}
	/**
	 * Returns the item's name. If there are many of these items, returns a plural version fo the name
	 * @param int $count
	 * @return string the item's name pluralized. Eg, for the model 'EEM_Question_Group' the singular name would be 
	 * 'Question Group' and the plural version would be 'Question Groups'
	 */
	public function item_name($count=0){
		$modelName=get_class($this);
		$className=str_replace("EEM_","",$modelName);
		if($count>1){
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH.'/helpers/EE_Pluralize.helper.php');
			return str_replace("_"," ", EE_Pluralize::pluralize_if($count, $className));
		}else{
			return $className;
		}
	}
	
	/**
	 * Gets the EE class that corresponds to this model. Eg, for EEM_Answer that
	 * would be EE_Answer.To import that class, you'd just add ".class.php" to the name, like so
	 * require_once($this->_getClassName().".class.php");
	 * @return string
	 */
	private function _getClassName(){
		$modelName=get_class($this);
		$className=str_replace("EEM_","EE_",$modelName);
		return $className;
	}
	/**
	 * Allows other models to know about the fieldson this model
	 * Returns an array of EE_Model_Field relating to this model.
	 * @return EE_Model_Field[]
	 */
	public function fields_settings(){
		return $this->_fields_settings;
	}
	
	/**
	 * A convenience method for getting a specific field's settings, instead of getting all field settings for all fields
	 * @param string $fieldName
	 * @return EE_Model_Field
	 */
	public function field_settings_for($fieldName){
		$fieldSettings=$this->fields_settings();
		if(!array_key_exists($fieldName,$fieldSettings)){
			throw new EE_Error(sprintf(__('There is no field/column %s on %s','event_espresso'),$fieldName,get_class($this)));
		}
		return $fieldSettings[$fieldName];
	}
	
	/**
	 * For internal use in order to avoid duplicated code. This is used to get the table data types
	 * on both THIS model's fields, and the data types on the join_tables related to it.
	 * @param string $tableName without the prefixed 'wp_esp_'. Eg 'question', or 'question_group_question'
	 * @param EE_Model_Field[] $fields where the keys are the column names
	 * @return type
	 */
	private function _get_table_data_types_for($tableName,$fields){
		$dataTypes=array();
		foreach($fields as $fieldName=>/*@var $fieldSettings EE_Model_Field */$fieldSettings){
			switch($fieldSettings->type()){
				case 'primary_key':
				case 'foreign_key':
				case 'int':
				case 'bool':
				case 'deleted_flag':
					$type='%d';
					break;
				case 'float':
					$type='%f';
					break;
				case 'plaintext':
				case 'simplehtml':
				case 'fullhtml':
				case 'primary_text_key':
				case 'foreign_text_key':
				case 'enum':
				
					$type='%s';
					break;
			}
			$dataType=apply_filters('filter_hook_espresso_getTableDataType',$type,$tableName,$fields);
			$dataTypes[$fieldName]=$dataType;
			$dataTypes[$tableName.".".$fieldName]=$dataType;
		}
		return $dataTypes;
	}
	/**
	 * gets the wordpress insertion datatype for each field in fieldsSettings 
	 * (ie, whether ot use '%s' or '%d').
	 * @return array like array('ATT_ID'=>'%d','ATT_fname'=>'%s',...)
	 */
	protected function _get_table_data_types(){
		$dataTypes=$this->_get_table_data_types_for($this->_get_table_name(), $this->fields_settings());
		//if there are relations of type 'hasAndBelongsToMany', we need to add those fields to our data_types array
		$joinTableFieldSettings=array();
		foreach($this->relation_settings() as $relatedModelName=>$relatedModelSettings){
			if($relatedModelSettings->type()=='hasAndBelongsToMany'){
				$joinTableDataTypes=$this->_get_table_data_types_for($relatedModelSettings->join_table(), $relatedModelSettings->join_table_fields());
				$dataTypes=array_merge($dataTypes,$joinTableDataTypes);
			}
		}
		return $dataTypes;
	}
	
	/**
	 * gets the database table name for this 
	 * @global type $wpdb
	 * @return string
	 */
	protected function _get_table_name(){
		global $wpdb;
		$modelName=get_class($this);
		$tableNameCapitalized=str_replace("EEM_","",$modelName);
		$tableName=$wpdb->prefix."esp_".strtolower($tableNameCapitalized);
		return $tableName;
	}
	
	/**
	 * gets the name of the field of type 'primary_key' from the fieldsSettings attribute.
	 * Eg, on EE_Anwer that would be ANS_ID
	 * @return string
	 * @throws EE_Error
	 */
	public function primary_key_name(){
		return $this->_get_field_of_types(array('primary_key','primary_text_key'));	
	}
	
	
	/**
	 * Used internally by primary_key_name and deleted_field_name to find a field
	 * of teh given type on this model.
	 * @param array $types eg array('primary_key','primary_text_key'
	 * @return type
	 * @throws EE_Error
	 */
	protected function _get_field_of_types($types=array()){
		foreach($this->fields_settings() as $field=>$settings){
			if(in_array($settings->type(),$types)){
				return $field;
			}
		}
		throw new EE_Error(sprintf(__("Class %s has no field of type %s set in its fieldsSettings",'event_espresso'),get_class($this),implode(",",$types)));

	}
	
	/**
	*		cycle though array of attendees and create objects out of each item
	* 
	* 		@access		private
	* 		@param		array		$attendees		
	*		@return 	EE_Base_Class[]		array on success, FALSE on fail
	*/	
	protected function _create_objects( $rows = FALSE ) {	
		$array_of_objects=array();
		foreach ( $rows as $row ) {
			if(empty($row)){//wp did its weird thing where it returns an array like array(0=>null), which is totally not helpful...
				return FALSE;
			}
				$fields=$this->fields_settings();//get_object_vars($row);
				//remove the primary key, because it's not part of the constructors. we'll just add it after the fact
				$pkName=$this->primary_key_name();
				unset($fields[$pkName]);
				$argNames=array_keys($fields);
				$args=array();
				foreach($argNames as $argName){
					$args[]=$row->$argName;
				}
				$class=new ReflectionClass($this->_getClassName());
				$classInstance=$class->newInstanceArgs($args);
				/* @var $classInstance EE_Base_Class */
				$classInstance->set($pkName,$row->$pkName);
				$array_of_objects[$classInstance->get_primary_key()]=$classInstance;
		}	
		return $array_of_objects;	
	}
	
	
	
	/**
	 *		This function inserts table data
	 *		
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL INSERT 
	 *		@return array
	 */	
	public function insert ($set_column_values) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_insert( $this->table_name, $this->table_data_types, $set_column_values );
	}
	
	/**
	 *		This function updates table data
	 *		
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL SET clause
	 *		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 *		@return array
	 */	
	public function update ($set_column_values, $where_cols_n_values) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );	
	}
	/**
	 * Returns the array of EE_ModelRelations for this model.
	 * @return EE_Model_Relation[]
	 */
	public function relation_settings(){
		return $this->_related_models;
	}
	
	/**
	 * Returns the specified EE_ModelRelation, or throws an exception
	 * @param string $relationName name of relation, key in $this->_relatedModels
	 * @return EE_Model_Relation
	 */
	public function related_settings_for($relationName){
		$relatedModels=$this->relation_settings();
		if(!array_key_exists($relationName,$relatedModels)){
			throw new EE_Error(sprintf(__('Cannot get %s related to %s. There is no model relation of that type. There is, however, %s...','event_espresso'),$relationName,  $this->_getClassName(),implode(array_keys($relatedModels))));
		}
		return $relatedModels[$relationName];
	}
	/**
	 * Uses $this->_relatedModels info to find the related model objects of relation $relationName to the given $modelObject
	 * @param EE_Base_Class'child $modelObject one of EE_Answer, EE_Attendee, etc. 
	 * @param string $relationName, key in $this->_relatedModels, eg 'Registration', or 'Events'
	 * @param array $where_col_n_values for extra select clause on hasAndBelongsToMany or hasMany
	 * @return EE_Base_Class[]
	 */
	public function get_many_related(EE_Base_Class $modelObject,$relationName,$where_col_n_values=array()){
		$relatedModelInfo=$this->related_settings_for($relationName);
		/* @var $relatedModeInfo EE_Model_Relation*/
		$relatedModel=$relatedModelInfo->model_instance();
		/* @var $relatedModel EEM_TempBase*/
		switch($relatedModelInfo->type()){
			case 'belongsTo':
				$foreign_key=$relatedModelInfo->field_name();
				$args=array($relatedModel->primary_key_name()=>$modelObject->get($foreign_key));
				$relatedObjects=$relatedModel->get_all_where($args);
				//$relatedObjects=$relatedModel->_create_objects(array($row,));
				break;
			case 'hasMany':
				if(!$modelObject->ID()){
					$relatedObjects=array();
					break;
				}
				$foreignKeyOnOtherModel=$relatedModelInfo->field_name();
				if(!array_key_exists($foreignKeyOnOtherModel, $where_col_n_values)){
					$where_col_n_values[$foreignKeyOnOtherModel]=$modelObject->ID();
				}
				$relatedObjects=$relatedModel->get_all_where($where_col_n_values);
				//$relatedObjects=$relatedModel->_create_objects(array($rows));
				break;
			case 'hasAndBelongsToMany':
				if(!$modelObject->ID()){
					$relatedObjects=array();
					break;
				}
				$joinTable=$relatedModelInfo->join_table();
				$otherTableName=$relatedModel->_get_table_name();
				$otherTablePK=$relatedModel->primary_key_name();
				$joinSQL="$joinTable LEFT JOIN $otherTableName ON $joinTable.$otherTablePK=$otherTableName.$otherTablePK ";
				//$rows=$
				$thisTablePK=$this->primary_key_name();
				$where_col_n_values[$thisTablePK]=$modelObject->ID();
				$rows=$relatedModel->select_all_join_where($joinSQL,$where_col_n_values);
				$relatedObjects=$relatedModel->_create_objects($rows);
				break;
		}
		return apply_filters('filter_hook_espresso_getRelated',$relatedObjects,$this,$modelObject,$relationName);
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
	 * @param EE_Base_Class $thisModelObject
	 * @param mixed $otherModelObjectOrID EE_base_Class or ID of other Model Object
	 * @param string $relationName
	 * @return boolean of success
	 */
	public function remove_relationship_to(EE_Base_Class $thisModelObject,  $otherModelObjectOrID, $relationName){
		/* @var $relatedModeInfo EE_Model_Relation*/
		$relatedModelInfo=$this->related_settings_for($relationName);
		$relatedModel=$relatedModelInfo->model_instance();
		
		switch($relatedModelInfo->type()){
			case 'belongsTo':
				//check: is this field nullable?
				$fieldSettings=$this->field_settings_for($relatedModelInfo->field_name());
				
				if(!$fieldSettings->nullable()){
					EE_Error::add_error(sprintf(__('Trying to set field %s to null in order to remove the relationship between %s and %s. However, this field cannot be null','event_espresso'),
							$relatedModelInfo->field_name(),get_class($thisModelObject),$relationName
							), __FILE__, __FUNCTION__, __LINE__);
					return false;
				}
				//just set its foreign_key to be null 
				$thisModelObject->set($relatedModelInfo->field_name(),null);
				return $thisModelObject->save();
				break;
			case 'hasMany':
				//check: is the othe rmodel's foreign key nullable?
				$fieldSettings=$relatedModel->field_settings_for($relatedModelInfo->field_name());
				
				if(!$fieldSettings->nullable()){
					EE_Error::add_error(sprintf(__('Trying to set field %s to null in order to remove the relationship between %s and %s. However, this field cannot be null','event_espresso'),
							$relatedModelInfo->field_name(),get_class($thisModelObject),get_class($otherModelObjectOrID)
							), __FILE__, __FUNCTION__, __LINE__);
					return false;
				}
				if(!($otherModelObjectOrID instanceof EE_Base_Class)){
					$otherModelId=$otherModelObjectOrID;
					$otherModelSettings=$this->related_settings_for($relationName);
					$otherModelInstance=$otherModelSettings->model_instance();
					$otherModelObject=$otherModelInstance->get_one_by_ID($otherModelId);
				}else{
					$otherModelObject=$otherModelObjectOrID;
				}
				
				//just set the other object's foreign key to null
				$otherModelObject->set($relatedModelInfo->field_name(),null);
				return $otherModelObject->save();
				break;
			case 'hasAndBelongsToMany':
				//first, if one of the modelObjects doesn't have an ID, it couldn't have this kind of relationship!
				if($otherModelObjectOrID instanceof EE_Base_Class && (!$thisModelObject->ID() || !$otherModelObjectOrID->ID())){
					return true;//we removed teh relationship that doesn't exist. That's pretty successful right?
				}
				
				if($otherModelObjectOrID instanceof EE_Base_Class){
					$otherModelID=$otherModelObjectOrID->ID();
				}else{
					$otherModelID=$otherModelObjectOrID;
				}
				
				/* @var $relatedModel EEM_TempBase*/
				//check for this relationship
				$thisPk=$this->primary_key_name();
				$otherPk=$relatedModelInfo->field_name();
				$success=$this->_delete($relatedModelInfo->join_table(),$this->_get_table_data_types(),array($thisPk=>$thisModelObject->ID(),
																								$otherPk=>$otherModelID));
				return $success;
				break;	
			default:
				throw new EE_Error(sprintf(__('Relationship of type %s is not allowed','event_espresso'),$relatedModelInfo->type()));
		}
		
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
	 * @param mixed $otherModelObjectOrID EE_base_Class or ID of other Model Object
	 * @param string $relationName
	 * @return boolean of success
	 */
	public function add_relation_to(EE_Base_Class $thisModelObject,$otherModelObjectOrID, $relationName){
		/* @var $relatedModeInfo EE_Model_Relation*/
		$relatedModelInfo=$this->related_settings_for($relationName);
		
		
		switch($relatedModelInfo->type()){
			case 'belongsTo':
				//just set its foreign_key to be that 
				if($otherModelObjectOrID instanceof EE_Base_Class){
					if(!$otherModelObjectOrID->ID()){
						$otherModelObjectOrID->save();
					}
					$ID=$otherModelObjectOrID->ID();
				}
				if(is_int($otherModelObjectOrID) || is_string($otherModelObjectOrID)){
					$ID=$otherModelObjectOrID;
				}
				$thisModelObject->set($relatedModelInfo->field_name(),$ID);
				return $thisModelObject->save();
				break;
			case 'hasMany':
				if(!$thisModelObject->ID()){
					$thisModelObject->save();
				}
				if(!($otherModelObjectOrID instanceof EE_TempBase)){
					$otherModelId=$otherModelObjectOrID;
					$otherModelSettings=$this->related_settings_for($relationName);
					$otherModelInstance=$otherModelSettings->model_instance();
					$otherModelObject=$otherModelInstance->get_one_by_ID($otherModelId);
				}else{
					$otherModelObject=$otherModelObjectOrID;
				}
				$otherModelObject->set($relatedModelInfo->field_name(),$thisModelObject->ID());
				return $otherModelObject->save();
				break;
			case 'hasAndBelongsToMany':
				//first, we need to make sure both modelObjects have an ID, so save them if they don't
				if(!$thisModelObject->ID()){
					$thisModelObject->save();
				}
				if($otherModelObjectOrID instanceof EE_Base_Class){
					if(!$otherModelObjectOrID->ID()){
						$otherModelObjectOrID->save();
					}
					$otherModelID=$otherModelObjectOrID->ID();
				}
				if(!($otherModelObjectOrID instanceof EE_Base_Class)){
					$otherModelID=$otherModelObjectOrID;
				}
								
				$relatedModel=$relatedModelInfo->model_instance();
				/* @var $relatedModel EEM_TempBase*/
				//check for this relationship
				$thisPk=$this->primary_key_name();
				$otherPk=$relatedModelInfo->field_name();
				$relationsToOtherObject=$this->get_many_related($thisModelObject,$relationName,array($thisPk=>$thisModelObject->ID(),
																								$relatedModel->_get_table_name().".".$otherPk=>$otherModelID));
				//if it doesn't exist, add it
				if(empty($relationsToOtherObject)){
					$result=$this->_insert($relatedModelInfo->join_table(), 
								array($thisPk=>'%d',$otherPk=>'%d'), 
								array($thisPk=>$thisModelObject->ID(),$otherPk=>$otherModelID));
					return !empty($result);
				}else{
					return false;
				}
				break;	
			default:
				throw new EE_Error(sprintf(__('Relationship of type %s is not allowed','event_espresso'),$relatedModelInfo->type()));
		}
	}
	
	/**
	 * Uses $this->_relatedModels info to find the first related model object of relation $relationName to the given $modelObject
	 * @param EE_Base_Class'child $modelObject one of EE_Answer, EE_Attendee, etc. 
	 * @param string $relationName, key in $this->_relatedModels, eg 'Registration', or 'Events'
	 * @return EE_Base_Class[]
	 */
	public function get_first_related(EE_Base_Class $modelObject,$relationName){
		$relatedObjects=$this->get_many_related($modelObject, $relationName);
		if(empty($relatedObjects)){
			return null;
		}else{
			return array_shift($relatedObjects);
		}
	}
	
	/**
	*		retreive  a single item from db via their ID
	* 
	* 		@access		public
	* 		@param		$id		
	*		@return 	EE_Base_Class or FALSE on fail
	*/	
	public function get_one_by_ID( $id = FALSE ) {

		if ( ! $id ) {
			return FALSE;
		}
		// retreive a particular transaction
		$where_cols_n_values = array( $this->primary_key_name() => $id );
		if ( $row = $this->select_row_where ( $where_cols_n_values )) {
			$object_of_model = $this->_create_objects( array( $row ));
			return array_shift( $object_of_model );
		} else {
			return FALSE;
		}

	}
	
	/**
	*		retreive  a single item from db via array of key value pairs
	* 
	* 		@access		public
	* 		@param		$where_cols_n_values	 array, where keys are strings for DB columns, and values are their model values	
	*		@return 	EE_Base_Class		array on success, FALSE on fail
	*/	
	public function get_one( $where_cols_n_values = FALSE ) {

		if ( ! $where_cols_n_values ) {
			return FALSE;
		}

		if ( $row = $this->select_row_where ( $where_cols_n_values )) {
			$objects_of_model = $this->_create_objects( array( $row ));
			return array_shift( $objects_of_model );
		} else {
			return FALSE;
		}

	}
	
	/**
	*		retreive  ALL objects of this model from db
	* 
	* 		@access		public
	*		@return mixed EE_Base_Class is output='OBJECT_K', int is output='count'
	*/	
	public function get_all( $orderby = null, $order = 'ASC',$limit=array(0,10),$output='OBJECT_K' ) {
		return $this->get_all_where(array(),$orderby,$order,'=',$limit,$output);
	}
	
	/**
	 * retrieves all objects that meet the specified conditions
	 * @param array $where_cols_n_values keys are column names, values are column values
	 * @param string $orderby name of a column
	 * @param string $sort 'ASC' or 'DESC'
	 * @param mixed $operators string for a single operator, or an array of operators
	 * @param string $limit
	 * @return mixed EE_Base_Class is output='OBJECT_K', int is output='count'
	 */
	public function get_all_where($where_cols_n_values,$orderby=null,$sort='ASC',$operators=null,$limit=null,$output='OBJECT_K'){
		if($orderby==null){
			$orderby=$this->primary_key_name();
		}
		$results=$this->select_all_where($where_cols_n_values, $orderby, $sort, $operators,$limit,$output);
		if ( is_wp_error( $results )) {
			return FALSE;
		}			
		//echo "get all where results:$results, output: $output<br>";
		//return the count OR create objects out of data
		$results = $output == 'COUNT' ? $results : $this->_create_objects($results);
		return $results;
	}
	
}

/**
 * Class for representing field on models/columns on database tables.
 */
class EE_Model_Field{
	/**
	 * all the types of ModelFields which are allowed
	 * @var type 
	 */
	private $allowed_types=array('primary_key','primary_text_key','foreign_key','foreign_text_key','int','float','plaintext','simplehtml','fullhtml','enum','bool','deleted_flag');
	private $nicename;
	private $type;
	private $nullable;
	private $default_value;
	private $allowed_enum_values;
	private $class;
	/**
	 * Constructs basic EE_ModelField.
	 * @param string $nicename the string that displays this field's name nicely. Eg, "First Name" isntead of "fname"
	 * @param string $type, allowed values include: 
	 *				
	 *				primary_key (only allows positive integer, and is the primary key of the model)
	 *												
	 *				primary_text_key (allows strings, and is the primary key of the model),
	 *						
					foreign_key (only allows positive integers, and is the primary key of a different Model. $class MUST be set for this type)
	 * 
	 *				foreign_text_key (allows strings, and is the primary key of a differnet model. $class MUST be set for this type)
					
	 *				int (only allows integers)
					
	 *				float (only allows floats)
					
	 *				plaintext (allows strings, but filters out all HTML tags)
					
	 *				simplehtml (like plaintext, but allows a few basic HTML tags)
					
	 *				fullhtml (allows all strings, and does not filter HTML tags at all)
	 * 
	 *				enum (allows only a limited set of values. $allowedEnumValues MUST be set for this type)
	 * 
	 *				bool (boolean, only allows 1 or 0)
	 * 
	 *				deleted_flag (special bool used to indicate whehter a modelhas been deleted or not)
	 * @param boolean $nullable whehter this field should be allowed to be null or not. If not, 
	 * @param mixed $defaultValue optional. When initially creating the object, if this field's value is set to null, this value will be used instead
	 * @param array $allowedEnumValues array of allowed values. Eg, array('textfield','textarea','checkbox') or array(1,2,3)
	 * @param string $class required when $type=='foreign_key' or $type=='foreign_text_key'. The name of the related class. Eg, 'Question'
	 */
	public function __construct($nicename,$type,$nullable,$defaultValue=null,$allowedEnumValues=array(),$class=null){
		$this->nicename=$nicename;
		$this->type=$type;
		$this->nullable=$nullable;
		$this->default_value=$defaultValue;
		$this->allowed_enum_values=$allowedEnumValues;
		$this->class=$class;
		if(!in_array($type,$this->allowed_types)){
			throw new EE_Error(sprintf(__("Event Espresso error. Field %s is of type %s, but only these are the only allowed types %s",'event_espresso'),$nicename,$type,implode(",",$this->allowed_types)));
		}
		if($type=='foreign_key' || $type=='foreign_text_field'){
			if(!$class){
				throw new EE_Error(sprintf(__("Event Espresso error. Field %s is of type 'foreign_key', but is missing the 'class' setting",'event_espresso'),$nicename));
			}
			//next verify the class is real
			$phpFilePath="EE_".$class.".class.php";
			if(file_exists($phpFilePath)){
				throw new EE_Error(sprintf(__("Event Espresso error. Class %s on field %s in class %s doesn't have a php file!",'event_espresso'),$phpFilePath,$nicename));
			}
		}
		if($type=='enum' && !$allowedEnumValues){
			throw new EE_Error(sprintf(__("Event Espresso error. Field %s is of type 'enum' is missing the \$allowedEnumValues parameter in the constructor.",'event_espresso'),$nicename));
		}
	}
	/**
	 * Returns the human-readable string of the field's name. Eg, 'First Name' instead of 'fname'
	 * @return string
	 */
	public function nicename(){
		return $this->nicename;
	}
	/**
	 * Returns teh type of the field. Allowed values include: 
	 *				
	 *				primary_key (only allows positive integer, and is the primary key of the model)
	 *												
	 *				primary_text_key (allows strings, and is the primary key of the model),
	 *						
					foreign_key (only allows positive integers, and is the primary key of a different Model. $class MUST be set for this type)
	 * 
	 *				foreign_text_key (allows strings, and is the primary key of a differnet model. $class MUST be set for this type)
					
	 *				int (only allows integers)
					
	 *				float (only allows floats)
					
	 *				plaintext (allows strings, but filters out all HTML tags)
					
	 *				simplehtml (like plaintext, but allows a few basic HTML tags)
					
	 *				fullhtml (allows all strings, and does not filter HTML tags at all)
	 * 
	 *				enum (allows only a limited set of values. $allowedEnumValues MUST be set for this type)
	 * 
	 *				bool (allows only true or false)
	 * 
	 *				deleted_flag (allows true or false)
	 * @return string
	 */
	public function type(){
		return $this->type;
	}
	/**
	 * Returns whether the field may be set to NULL or not
	 * @return boolean
	 */
	public function nullable(){
		return $this->nullable;
	}
	/**
	 * Returns the default value of the field. Eg, 12 or 'monkey'
	 * @return mixed
	 */
	public function default_value(){
		return $this->default_value;
	}
	/**
	 * Returns an array of allowed Enum values, if any has been set.
	 * @return array
	 */
	public function allowed_enum_values(){
		return $this->allowed_enum_values;
	}
	/**
	 * If the field is 'foreign_key' or 'foreign_text_key', this will return a string of the name of the related model. Eg, 'Question' or 'Attendee'.
	 * @return string
	 */
	public function get_class(){
		return $this->class;
	}
}

/**
 * a PHP class for representing a relationship between a model and another. Handles 'hasMany','belongsTo' and 'hasAndBelongsToMany'.
 * Useful for the model so it can can queries on the related models.
 */
class EE_Model_Relation{
	private $type;
	private $model;
	private $field_name;
	private $join_table;
	private $join_table_fields;
	
	private $allowed_types=array('belongsTo','hasMany','hasAndBelongsToMany');
	/**
	 * 
	 * @param string $relationType one of 
	 * 
	 *						'belongsTo': the current model has a ModelField which is a foreign_key pointing to the primary key on the other model
	 * 
	 *						'hasMany': the other model has a ModelField which is a forieng_key pointing to the primary key on THIS model
	 * 
	 *						'hasAndBelongsToMany': there is a join table joining this model to the other. For this, you must specify a 'join table'
	 * @param string $model eg 'Question','Registration', etc.
	 * @param string $fieldName represents different things for differnet relationship types:
	 *			
	 *						for 'belongsTo': the name of the foreign_key on the current model which points to the other model's primary key
	 * 
	 *						for 'hasMany': the name of the foreign_key on the OTHER model whcih points ot the current model's primary key
	 * 
	 *						for 'hasAndBelongsToMany': the name of the primary_key on the OTHER model, 
	 *						AND the foreign_key in the join table which points to the other model's primary_key.
	 * 
	 * @param string joinTable name of the join table in cases of 'hasAndBelongsToMany'. Eg, 'question_group_question', or 'answer', etc. So no prepending of 'wp_' or even 'esp_'. Those are assumed.
	 * @param EE_Model_Field[] array of fields on the join table. Yes this will need to be repeated once because it's on both models (but not more)
	 */
	public function __construct($type,$model,$fieldName,$joinTable=null,$joinTableFields=null){
		$this->type=$type;
		$this->model=$model;
		$this->field_name=$fieldName;
		$this->join_table=$joinTable;
		$this->join_table_fields=$joinTableFields;
		if(!in_array($type,$this->allowed_types)){
			throw new EE_Error(sprintf(__('A modelReation of type %s is not valid','event_espresso'),$type));
		}
		if($type=='hasAndBelongsToMany'){
			if($joinTable==null){
				throw new EE_Error(sprintf(__('You specified a modelRelation as a hasAndBleongsToMany, but didnt specify a join table','event_espresso')));
			}
			if($joinTableFields==null){
				throw new EE_Error(sprintf(__('You specified a modelRelation as a hasAndBleongsToMany, but didnt specify the join table fields. It must be an array of EE_Model_Field, where the keys are the column names.','event_espresso')));
			}
			foreach($joinTableFields as $fieldName=>$fieldSettings){
				if(!($fieldSettings instanceof EE_Model_Field)){
					throw new EE_Error(sprintf(__('You specified a modelRelation as a hasAndBleongsToMany, but didnt your list of join table fields isnt a list of EE_Model_Field. It must be an array of EE_Model_Field, where the keys are the column names.','event_espresso')));
				}
			}
		}
	}
	/**
	 * Returns the type of this relationship. One of 'belongsTo','hasMany', or 'hasAndBelongsToMany'
	 * @return string
	 */
	public function type(){
		return $this->type;
	}
	/**
	 * Returns the name of the model for this modelRelation. Eg 'Attendee', 'Event', etc.
	 * @return string
	 */
	public function model(){
		return $this->model;
	}
	/**
	 * Using the info in this ModelRelation, fetches an instance of the related model,
	 * which can then be used for querying.
	 * @return EEM_TempBase
	 */
	public function model_instance(){
		$modelName="EEM_".$this->model();
		require_once($modelName.".model.php");
		//$modelObject=new $modelName;
		$modelInstance=call_user_func($modelName."::instance");
		return $modelInstance;
	}
	/**
	 * Returns the name of the modelField/db-column for this relation. This represents different things for differnet relationship types:
	 *			
	 *						for 'belongsTo': the name of the field on the current model which points to the other model
	 * 
	 *						for 'hasMany': the name of the field on the OTHER model whcih points ot the current model
	 * 
	 *						for 'hasAndBelongsToMany': the name of the primary_key on the OTHER model, 
	 *						AND the foreign_key in the join table which points to the other model's primary_key.
	 * @return string
	 */
	public function field_name(){
		return $this->field_name;
	}
	/**
	 * Returns the name of the join table in cases of 'hasAndBelongsToMany'. Eg, 'question_group_question', or 'answer', etc. So no prepending of 'wp_' or even 'esp_'. Those are assumed.
	 * @return string
	 */
	public function join_table(){
		global $wpdb;
		return $wpdb->prefix."esp_".$this->join_table;
	}
	
	/**
	 * Returns an array of all the fields on the join table. Exactly like the fields on each model. Eg array('QGQ_ID'=>EE_Model_Field('QuestionGroup-Question ID','primary_key'),
	 *	'QSG_ID'=>EE_Model_Field('QUestion Group Foreign Key','foreign_key'),
	 *	'QST_ID'=>EE_Model_Field('Question Foreign Key','foreign_key'))
	 * @return EE_Model_Field[]
	 */
	public function join_table_fields(){
		return $this->join_table_fields;
	}
}