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
	protected $_fieldsSettings=null;
	/**
	 *
	 * @var type 
	 */
	protected $_relatedModels;
	protected function __construct() {
		
		$this->__verifyFieldSettings();
		$this->table_name=$this->_getTableName();
		$this->table_data_types=$this->_getTableDataTypes();
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
	 * @return array
	 */
	public function fieldsSettings(){
		return $this->_fieldsSettings;
	}
	
	/**
	 * verifies that the fieldSettings array has been initialized properly
	 * @throws EE_Error
	 */
	private function __verifyFieldSettings(){
		//verify $_fieldSettings has been set and is valid
		if($this->_fieldsSettings===null){
			throw new EE_Error(sprintf("Event Espressso error. _fieldSettings value on %s has nto been set.",'event_espresso'),get_class($this));
		}
		
		foreach($this->_fieldsSettings as $fieldName=>$fieldSettings){
			
			//verify the class attribute exists for this var
			/*if(!property_exists($this,$this->__getPrivateAttributeName($fieldName))){
				throw new EE_Error(sprintf(__("Event Espresso error. Class %s's field settings has a field named %s, but no attribute named \$%s",'event_espresso'),get_class($this),$fieldName,$this->__getPrivateAttributeName($fieldName)));
			}*/
		}
	}
	
	/**
	 * gets the wordpress insertion datatype for each field in fieldsSettings 
	 * (ie, whether ot use '%s' or '%d').
	 * @return array like array('ATT_ID'=>'%d','ATT_fname'=>'%s',...)
	 */
	protected function _getTableDataTypes(){
		$dataTypes=array();
		foreach($this->fieldsSettings() as $fieldName=>$fieldSettings){
			switch($fieldSettings->type()){
				case 'primary_key':
				case 'foreign_key':
				case 'int':
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
				default:
					$type='%s';
					break;
			}
			$dataTypes[$fieldName]=apply_filters('filter_hook_espresso_getTableDataType',$type,$this->fieldsSettings());
		}
		return $dataTypes;
	}
	
	/**
	 * gets the database table name for this 
	 * @global type $wpdb
	 * @return string
	 */
	protected function _getTableName(){
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
	public function primaryKeyName(){
		foreach($this->fieldsSettings() as $field=>$settings){
			if($settings->type()=='primary_key' || $settings->type()=='primary_text_key'){
				return $field;
			}
		}
		throw new EE_Error(sprintf(__("Class %s has no primary key set in its fieldsSettings",'event_espresso'),get_class($this)));
	}
	
	/**
	*		cycle though array of attendees and create objects out of each item
	* 
	* 		@access		private
	* 		@param		array		$attendees		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	protected function _create_objects( $rows = FALSE ) {

		if ( ! $rows ) {
			return FALSE;
		} 		
		foreach ( $rows as $row ) {
				$args=get_object_vars($row);
				$class=new ReflectionClass($this->_getClassName());
				$classInstance=$class->newInstanceArgs($args);
				$array_of_objects[$classInstance->getPrimaryKey()]=$classInstance;
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
	 * @return array
	 */
	public function relationSettings(){
		return $this->_relatedModels;
	}
	
	/**
	 * Returns the specified EE_ModelRelation, or throws an exception
	 * @param string $relationName name of relation, key in $this->_relatedModels
	 * @return object EE_ModelRelation
	 */
	public function relatedSettingsFor($relationName){
		$relatedModels=$this->relationSettings();
		if(!array_key_exists($relationName,$relatedModels)){
			throw new EE_Error(sprintf(__('Cannot get %s related to %s. There is no model relation of that type. There is, however, %s...','event_espresso'),$relationName,  $this->_getClassName(),implode(array_keys($relatedModels))));
		}
		return $relatedModels[$relationName];
	}
	/**
	 * Uses $this->_relatedModels info to find the related model objects of relation $relationName to the given $modelObject
	 * @param EE_Base_Class'child $modelObject one of EE_Answer, EE_Attendee, etc. 
	 * @param string $relationName, key in $this->_relatedModels, eg 'Registration', or 'Events'
	 * @return array of EE_Base_Class
	 */
	public function getManyRelated(EE_Base_Class $modelObject,$relationName){
		$relatedModelInfo=$this->relatedSettingsFor($relationName);
		/* $relatedModeInfo EEM_TempBase*/
		$relatedModel=$relatedModelInfo->modelInstance();
		
		switch($relatedModelInfo->type){
			case 'hasOne':
				$foreign_key=$relatedModelInfo->fieldName;
				$row=$relatedModel->select_row_where(array($relatedModel->primaryKeyName()=>$modelObject->$foreign_key));
				$relatedObjects=$relatedModel->_create_objects(array($row,));
				break;
			case 'belongsTo':
				$foreignKeyOnOtherModel=$relatedModel->fieldName;
				$rows=$relatedModel->select_row_where(array($foreignKeyOnOtherModel=>$modelObject->$modelObject->primaryKey()));
				$relatedObjects=$relatedModel->_create_objects(array($rows));
				break;
			
			case 'hasAndBelongsToMany':
				$joinTable=$relatedModeInfo->joinTable();
				$otherTableName=$relatedModel->_getTableName();
				$otherTablePK=$relatedModel->primaryKeyName();
				$joinSQL="$joinTable LEFT JOIN $otherTableName ON $joinTable.$otherTablePK=$otherTableName.$otherTablePK ";
				//$rows=$
				$thisTablePK=$this->primaryKeyName();
				$wheres=array($thisTablePK=>$modelObject->getPrimaryKey());
				$rows=$relatedModel->select_all_join_where($joinSQL,$where);
				$relatedObjects=$relatedModel->_create_objects($rows);
				break;
		}
		return apply_filters('filter_hook_espresso_getRelated',$relatedObjects,$this,$modelObject,$relationName);
	}
	
	/**
	 * Uses $this->_relatedModels info to find the first related model object of relation $relationName to the given $modelObject
	 * @param EE_Base_Class'child $modelObject one of EE_Answer, EE_Attendee, etc. 
	 * @param string $relationName, key in $this->_relatedModels, eg 'Registration', or 'Events'
	 * @return array of EE_Base_Class
	 */
	public function getFirstRelated($modelObject,$relationName){
		$relatedObjects=$this->getManyRelated($modelObject, $relationName);
		if(empty($relatedObjects)){
			return null;
		}else{
			return array_shift($relatedObjects);
		}
	}
}

/**
 * Class for representing field on models/columns on database tables.
 */
class EE_ModelField{
	/**
	 * all the types of ModelFields which are allowed
	 * @var type 
	 */
	private $allowedTypes=array('primary_key','primary_text_field','foreign_key','foreign_text_field','int','float','plaintext','simplehtml','fullhtml','enum');
	private $nicename;
	private $type;
	private $nullable;
	private $defaultValue;
	private $allowedEnumValues;
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
	 * @param boolean $nullable whehter this field should be allowed to be null or not. If not, 
	 * @param mixed $defaultValue optional. When initially creating the object, if this field's value is set to null, this value will be used instead
	 * @param array $allowedEnumValues array of allowed values. Eg, array('textfield','textarea','checkbox') or array(1,2,3)
	 * @param string $class required when $type=='foreign_key' or $type=='foreign_text_key'. The name of the related class. Eg, 'Question'
	 */
	public function __construct($nicename,$type,$nullable,$defaultValue=null,$allowedEnumValues=array(),$class=null){
		$this->nicename=$nicename;
		$this->type=$type;
		$this->nullable=$nullable;
		$this->defaultValue=$defaultValue;
		$this->allowedEnumValues=$allowedEnumValues;
		$this->class=$class;
		if(!in_array($type,$this->allowedTypes)){
			throw new EE_Error(sprintf(__("Event Espresso error. Field %s is of type %s, but only these are the only allowed types %s",'event_espresso'),$nicename,$type,implode(",",$this->allowedTypes)));
		}
		if($type=='foreign_key' || $type=='foreign_text_field'){
			if(!$class){
				throw new EE_Error(sprintf(__("Event Espresso error. Field %s is of type 'foreign_key' on class %s, but is missing the 'class' setting",'event_espresso'),$nicename));
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
	public function defaultValue(){
		return $this->defaultValue;
	}
	/**
	 * Returns an array of allowed Enum values, if any has been set.
	 * @return array
	 */
	public function allowedEnumValues(){
		return $this->allowedEnumValues;
	}
	/**
	 * If the field is 'foreign_key' or 'foreign_text_key', this will return a string of the name of the related model. Eg, 'Question' or 'Attendee'.
	 * @return string
	 */
	public function getClass(){
		return $this->class;
	}
}

/**
 * a PHP class for representing a relationship between a model and another. Handles 'belongsTo','hasOne' and 'hasAndBelongsToMany'.
 * Useful for the model so it can can queries on the related models.
 */
class EE_ModelRelation{
	private $type;
	private $model;
	private $fieldName;
	private $joinTable;
	
	private $allowedTypes=array('hasOne','belongsTo','hasAndBelongsToMany');
	/**
	 * 
	 * @param string $relationType one of 
	 * 
	 *						'hasOne': the current model has a ModelField which is a foreign_key pointing to the primary key on the other model
	 * 
	 *						'belongsTo': the other model has a ModelField which is a forieng_key pointing to the primary key on THIS model
	 * 
	 *						'hasAndBelongsToMany': there is a join table joining this model to the other. For this, you must specify a 'join table'
	 * @param string $model eg 'Question','Registration', etc.
	 * @param string $fieldName represents different things for differnet relationship types:
	 *			
	 *						for 'hasOne': the name of the field on the current model which points to the other model
	 * 
	 *						for 'belongsTo': the name of the field on the OTHER model whcih points ot the current model
	 * 
	 *						for 'hasAndBelongsToMany': the name of the primary_key on the OTHER model, 
	 *						AND the foreign_key in the join table which points to the other model's primary_key.
	 * 
	 * @param string joinTable name of the join table in cases of 'hasAndBelongsToMany'. Eg, 'question_group_question', or 'answer', etc. So no prepending of 'wp_' or even 'esp_'. Those are assumed.
	 */
	public function __construct($type,$model,$fieldName,$joinTable=null){
		$this->type=$type;
		$this->model=$model;
		$this->fieldName=$fieldName;
		$this->joinTable=$joinTable;
		if(!in_array($type,$this->allowedTypes)){
			throw new EE_Error(sprintf(__('A modelReation of type %s is not valid','event_espresso'),$type));
		}
		if($type=='hasAndBelongsToMany' && $joinTable==null){
			throw new EE_Error(sprintf(__('You specified a modelRelation as a hasAndBleongsToMany, but didnt specify a join table','event_espresso')));
		}
	}
	/**
	 * Returns the type of this relationship. One of 'hasOne','belongsTo', or 'hasAndBelongsToMany'
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
	 * @return object EEM_Base
	 */
	public function modelInstance(){
		$modelName="EEM_".$this->model();
		require_once($modelName.".model.php");
		//$modelObject=new $modelName;
		$modelInstance=call_user_func($modelName."::instance");
		return $modelInstance;
	}
	/**
	 * Returns the name of the modelField/db-column for this relation. This represents different things for differnet relationship types:
	 *			
	 *						for 'hasOne': the name of the field on the current model which points to the other model
	 * 
	 *						for 'belongsTo': the name of the field on the OTHER model whcih points ot the current model
	 * 
	 *						for 'hasAndBelongsToMany': the name of the primary_key on the OTHER model, 
	 *						AND the foreign_key in the join table which points to the other model's primary_key.
	 * @return string
	 */
	public function fieldName(){
		$this->fieldName;
	}
	/**
	 * Returns the name of the join table in cases of 'hasAndBelongsToMany'. Eg, 'question_group_question', or 'answer', etc. So no prepending of 'wp_' or even 'esp_'. Those are assumed.
	 * @return string
	 */
	public function joinTable(){
		return $this->joinTable;
	}
}