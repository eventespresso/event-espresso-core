<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EE_Base_Class
 *
 * @author mnelson4
 */
abstract class EE_Base_Class {
	/**
	 * Instance of model that corresponds to this class.
	 * This should be lazy-loaded to avoid recursive loop
	 * @var type 
	 */
	private $_model;
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
	/**
	 * basic constructor for Event Espresso classes, performs any necessary initialization,
	 * and verifies it's children play nice
	 */
	public function __construct($fieldValues=null){
		$this->__verifyFieldSettings();
		if($fieldValues!=null){
			foreach($fieldValues as  $fieldName=>$fieldValue){
				$this->set($fieldName,$fieldValue);
			}
		}
		
	}
	
	/**
	 * Gets the 
	 * @return type
	 */
	protected function _getModel(){
		if(!$this->_model){
			//find model for this class
			$modelName=$this->__getModelName();
			require_once($modelName.".model.php");
			//$modelObject=new $modelName;
			$this->_model=call_user_func($modelName."::instance");
		}
		return $this->_model;
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
			$requiredFieldSettings=array('type','nullable','nicename');
			foreach($requiredFieldSettings as $requiredFieldSetting){
				if(!array_key_exists($requiredFieldSetting,$fieldSettings)){
					throw new EE_Error(sprintf(__("Event Espressso error. '%s' settings is missing from %s field on class %s",'event_espresso'),$requiredFieldSetting,$fieldName,get_class($this)));
				}
			}
			if($fieldSettings['type']=='foreign_key'){
				if(!array_key_exists('class',$fieldSettings)){
					throw new EE_Error(sprintf(__("Event Espresso error. Field %s is of type 'foreign_key' on class %s, but is missing the 'class' setting",'event_espresso'),$fieldName,get_class($this)));
				}
				//next verify the class is real
				$phpFilePath="EE_".$fieldSettings['class'].".class.php";
				if(file_exists($phpFilePath)){
					throw new EE_Error(sprintf(__("Event Espresso error. Class %s on field %s in class %s doesn't have a php file!",'event_espresso'),$phpFilePath,$fieldName,get_class($this)));
				}
			}
			//verify the class attribute exists for this var
			if(!property_exists($this,$this->__getPrivateAttributeName($fieldName))){
				throw new EE_Error(sprintf(__("Event Espresso error. Class %s's field settings has a field named %s, but no attribute named \$%s",'event_espresso'),get_class($this),$fieldName,$this->__getPrivateAttributeName($fieldName)));
			}
		}
	}
	/**
	 * Gets the model's name for this class. Eg, if this class' name is 
	 * EE_Answer, it will return EEM_Answer.
	 * @return string
	 */
	private function __getModelName(){
		$className=get_class($this);
		$modelName=str_replace("EE_","EEM_",$className);
		return $modelName;
	}
	
	
	/**
	 * converts a field name to the private attribute's name on teh class.
	 * Eg, converts "ANS_ID" to "_ANS_ID", which can be used like so $attr="_ANS_ID"; $this->$attr;
	 * @param string $fieldName
	 * @return string
	 */
	private function __getPrivateAttributeName($fieldName){
		return "_".$fieldName;
	}
	//@todo remove duplicate insert() functions in subclasses
	/**
	*		insert new db record
	* 
	* 		@access		public
	*/	
	public function insert() {
		return $this->_save_to_db();
	}
	/**
	 * update this existing class in the database
	 */
	abstract public function update();
	
	/**
	 * gets the field (class attribute) specified by teh given name
	 * @param string $fieldName if the field you want is named $_ATT_ID, use 'ATT_ID' (omit preceding underscore)
	 * @return mixed
	 */
	public function get($fieldName){
		$privateFieldName=$this->__getPrivateAttributeName($fieldName);
		return $this->$privateFieldName;
	}
	
	
	/**
	 * Sets the class attribute by the specified name to the value.
	 * Uses the _fieldSettings attribute to 
	 * @param type $attributeName
	 * @param type $value
	 */
	public function set($fieldName,$value){
		$fields=$this->_getFieldsSettings();
		if(!array_key_exists($fieldName, $fields)){
			throw new EE_Error(sprintf(__("An internal Event Espresso error has occured. Please contact Event Espresso.||The field %s doesnt exist on Event Espresso class %s",'event_espresso'),$fieldName,get_class($this)));
		}
		$fieldSettings=$fields[$fieldName];
		//if this field doesn't allow nulls, check it isn't null
		if($value===null){
			if(!$fieldSettings['nullable']){
				$msg = sprintf( __( 'Event Espresso error setting value on field %s.||Field %s on class %s cannot be null, but you are trying to set it to null!', 'event_espresso' ), $fieldName,$fieldName,get_class($this));
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				return false;
			}else{
				$this->fieldValues=$value;
				return true;
			}
		}else{
			//verify its of the right type
			if($this->_verifyFieldIsOfCorrectType($value,$fieldSettings)){
				$internalFieldName="_".$fieldName;
				$this->$internalFieldName=$this->_sanitizeFieldInput($value, $fieldSettings);
				return true;
			}else{
				$msg = sprintf( __( 'Event Espresso error setting value on field %s.||In trying to set field %s of class %s to value %s, it was found to not be of type %s', 'event_espresso' ), $fieldName,$fieldName,get_class($this),$value,$fieldSettings['type']);
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				return false;
			}
		}
	}
	
	/**
	 * Sanitizes (or cleans) the value. Ie, 
	 * @param type $value
	 * @param type $fieldSettings
	 * @return type
	 * @throws EE_Error
	 */
	protected function _sanitizeFieldInput($value,$fieldSettings){
		$return=null;
		switch($fieldSettings['type']){
			case 'primary_key':
				$return=absint($value);
				break;
			case 'foreign_key':
				$return=absint($value);
				break;
			case 'int':
				$return=intval($value);
				break;
			case 'plaintext':
				$return=htmlentities(wp_strip_all_tags("$value"), ENT_QUOTES, 'UTF-8' );
				break;
			case 'simplehtml':
				global $allowedtags;
				$return=  htmlentities(wp_kses("$value",$allowedtags),ENT_QUOTES,'UTF-8');
				break;
			case 'fullhtml':
				$return= htmlentities("$value",ENT_QUOTES,'UTF-8');
				break;
			case 'float':
				$return=floatval($value);
				break;
		}
		$return=apply_filters('filter_hook_espresso_sanitizeFieldInput',$return,$value,$fieldSettings);//allow to be overridden
		if(is_null($return)){
			throw new EE_Error(sprintf(__("Internal Event Espresso error. Field %s on class %s is of type %s","event_espresso"),$fieldSettings['nicename'],get_class($this),$fieldSettings['type']));
		}
		return $return;
	}
	
	/**
	 * verifies that the specified field is of the correct type
	 * @param mixed $value the value to check if it's of the correct type
	 * @param array $fieldSettings settings for a specific field. ie, should contain indexes 'type','nullable', 
	 * @return boolean
	 * @throws EE_Error if fieldSettings is misconfigured
	 */
	protected function _verifyFieldIsOfCorrectType($value,$fieldSettings){
		$return=false;
		switch($fieldSettings['type']){
			case 'primary_key':
				if(is_int($value) && $value>0){
					$return= true;
				}
			case 'foreign_key':
				if(is_int($value) && $value>0){
					$return= true;
				}
				break;
			case 'int':
				if(is_int($value)){
					$return= true;
				}
				break;
			case 'plaintext':
			case 'simplehtml':
			case 'fullhtml':
				if(is_string($value)){
					$return= true;
				}
				break;
			case 'float':
				if(is_float($value)){
					$return= true;
				}
				break;
		}
		$return= apply_filters('filter_hook_espresso_verifyFieldIsOfCorrectType',$return,$value,$fieldSettings);//allow to be overridden
		if(is_null($return)){
			throw new EE_Error(sprintf(__("Internal Event Espresso error. Field %s on class %s is of type %s","event_espresso"),$fieldSettings['nicename'],get_class($this),$fieldSettings['type']));
		}
		return $return;
	}
	
	/**
	 * retrieves all the fieldSettings on this class
	 * @return array
	 * @throws EE_Error
	 */
	protected function _getFieldsSettings(){
		if($this->_fieldsSettings==null){
			throw new EE_Error(sprintf("An unexpected error has occured with Event Espresso.||An Event Espresso class has not been fully implemented. %s does not override the \$_fieldSettings attribute.",get_class($this)),"event_espresso");
		}
		return $this->_fieldsSettings;
	}
	
	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values		
	*		@return int, 1 on a successful update, the ID of
	*					the new entry on insert; 0 on failure		
	
	*/	
	public function save( $where_cols_n_values = FALSE ) {
		if($where_cols_n_values!=FALSE){
			foreach($where_cols_n_values as $column=>$value){
				$this->set($column,$value);
			}
		}
		$set_column_values = array();
		foreach($this->_getFieldsSettings() as $fieldName=>$fieldSettings){
			$attributeName=$this->__getPrivateAttributeName($fieldName);
			$set_column_values[$fieldName]=$this->$attributeName;
		}
		
		if ( $set_column_values[$this->__getPrimaryKey()]!=null ){
			$results = $this->_getModel()->update ( $set_column_values, $where_cols_n_values );
		} else {
			unset($set_column_values[$this->__getPrimaryKey()]);
			$results = $this->_getModel()->insert ( $set_column_values );
			if($results){//if successful, set the primary key
				$this->set($this->__getPrimaryKey(),$results);
			}
		}
		
		return $results;
	}
	
	/**
	 * gets the name of the field of type 'primary_key' from the fieldsSettings attribute.
	 * Eg, on EE_Anwer that would be ANS_ID
	 * @return string
	 * @throws EE_Error
	 */
	private function __getPrimaryKey(){
		foreach($this->_getFieldsSettings() as $field=>$settings){
			if($settings['type']=='primary_key'){
				return $field;
			}
		}
		throw new EE_Error(sprintf(__("Class %s has no primary key set in its fieldsSettings",'event_espresso'),get_class($this)));
	}
	
	/**
	 * gets the wordpress insertion datatype for each field in fieldsSettings 
	 * (ie, whether ot use '%s' or '%d').
	 * @return array like array('ATT_ID'=>'%d','ATT_fname'=>'%s',...)
	 */
	public function getTableDataTypes(){
		$dataTypes=array();
		foreach($this->_getFieldsSettings() as $fieldName=>$fieldSettings){
			switch($fieldSettings['type']){
				case 'primary_key':
				case 'foreign_key':
				case 'int':
				case 'float':
					$type='%d';
					break;
				case 'plaintext':
				case 'simplehtml':
				case 'fullhtml':
				default:
					$type='%s';
					break;
			}
			$dataTypes[$fieldName]=apply_filters('filter_hook_espresso_getTableDataType',$type,$this->_getFieldsSettings());
		}
		return $dataTypes;
	}
	
	/**
	 * gets the database table name for this 
	 * @global type $wpdb
	 * @return string
	 */
	public function getTableName(){
		global $wpdb;
		$className=get_class($this);
		$tableNameCapitalized=str_replace("EE_","",$className);
		$tableName=$wpdb->prefix."esp_".strtolower($tableNameCapitalized);
		return $tableName;
	}
}

?>
