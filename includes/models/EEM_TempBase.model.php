<?php
require_once('EEM_Base.model.php');
abstract class EEM_TempBase extends EEM_Base{
	/**
	 * arary for defining all the fields on a model. May not replace all the 
	 * individual setters and getters, as these are convenient for PHP docs and developing,
	 * but sets a central place to define all these attributes, rather than repetitively
	 * coding them into functions, and in different classes.
	 * The keys must be field names (as they appear in the database),
	 * and the values must be an array of fieldSettings for that specified field.
	 * Eg: array('ANS_ID'=>array('type'=>'
	 * @var array 
	 */
	protected $_fieldsSettings=null;
	
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
	public function getFieldsSettings(){
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
		foreach($this->getFieldsSettings() as $fieldName=>$fieldSettings){
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
			$dataTypes[$fieldName]=apply_filters('filter_hook_espresso_getTableDataType',$type,$this->getFieldsSettings());
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
	public function getPrimaryKeyName(){
		foreach($this->getFieldsSettings() as $field=>$settings){
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