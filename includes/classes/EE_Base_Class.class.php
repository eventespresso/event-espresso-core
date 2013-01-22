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
abstract class EE_Base_Class extends EE_Base{
	/**
	 * Instance of model that corresponds to this class.
	 * This should be lazy-loaded to avoid recursive loop
	 * @var EEM_Base 
	 */
	private $_model;
	
	/**
	 * basic constructor for Event Espresso classes, performs any necessary initialization,
	 * and verifies it's children play nice
	 */
	public function __construct($fieldValues=null){
		$this->_model=$this->_get_model();
		/*if($fieldValues!=null){
			foreach($fieldValues as  $fieldName=>$fieldValue){
				$this->set($fieldName,$fieldValue);
			}
		}	*/
	}
	
	/**
	 * Gets the 
	 * @return EEM+Base
	 */
	protected function  _get_model(){
		if(!$this->_model){
			//find model for this class
			$modelName=$this->_get_model_name();
			require_once($modelName.".model.php");
			//$modelObject=new $modelName;
			$this->_model=call_user_func($modelName."::instance");
		}
		return $this->_model;
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
	 * converts a field name to the private attribute's name on teh class.
	 * Eg, converts "ANS_ID" to "_ANS_ID", which can be used like so $attr="_ANS_ID"; $this->$attr;
	 * @param string $fieldName
	 * @return string
	 */
	private function _get_private_attribute_name($fieldName){
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
		$privateFieldName=$this->_get_private_attribute_name($fieldName);
		return $this->$privateFieldName;
	}
	
	
	/**
	 * Sets the class attribute by the specified name to the value.
	 * Uses the _fieldSettings attribute to 
	 * @param type $attributeName
	 * @param type $value
	 */
	public function set($fieldName,$value){
		$fields=$this->_get_fields_settings();
		if(!array_key_exists($fieldName, $fields)){
			throw new EE_Error(sprintf(__("An internal Event Espresso error has occured. Please contact Event Espresso.||The field %s doesnt exist on Event Espresso class %s",'event_espresso'),$fieldName,get_class($this)));
		}
		$fieldSettings=$fields[$fieldName];
		//if this field doesn't allow nulls, check it isn't null
		if($value===null){
			if(!$fieldSettings->nullable){
				$msg = sprintf( __( 'Event Espresso error setting value on field %s.||Field %s on class %s cannot be null, but you are trying to set it to null!', 'event_espresso' ), $fieldName,$fieldName,get_class($this));
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				return false;
			}else{
				$privateAttributeName=$this->_get_private_attribute_name($fieldName);
				$this->$privateAttributeName=$value;
				return true;
			}
		}else{
			//verify its of the right type
			if($this->_verify_field_type($value,$fieldSettings)){
				$internalFieldName="_".$fieldName;
				$this->$internalFieldName=$this->_sanitize_field_input($value, $fieldSettings);
				return true;
			}else{
				$msg = sprintf( __( 'Event Espresso error setting value on field %s.||In trying to set field %s of class %s to value %s, it was found to not be of type %s', 'event_espresso' ), $fieldName,$fieldName,get_class($this),print_r($value,true),$fieldSettings->type());
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
	protected function _sanitize_field_input($value,$fieldSettings){
		$return=null;
		switch($fieldSettings->type()){
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
			case 'primary_text_key':
			case 'foreign_text_key':
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
			throw new EE_Error(sprintf(__("Internal Event Espresso error. Field %s on class %s is of type %s","event_espresso"),$fieldSettings->nicename,get_class($this),$fieldSettings->type()));
		}
		return $return;
	}
	
	/**
	 * verifies that the specified field is of the correct type
	 * @param mixed $value the value to check if it's of the correct type
	 * @param EE_Model_Field $fieldSettings settings for a specific field. 
	 * @return boolean
	 * @throws EE_Error if fieldSettings is misconfigured
	 */
	protected function _verify_field_type($value,  EE_Model_Field $fieldSettings){
		$return=false;
		switch($fieldSettings->type()){
			case 'primary_key':
				$value=intval($value);
				if(is_int($value) && $value>0){
					$return= true;
				}
			case 'foreign_key':
				$value=intval($value);
				if(is_int($value) && $value>0){
					$return= true;
				}
				break;
			case 'int':
				$value=intval($value);
				if(is_int($value)){
					$return= true;
				}
				break;
			case 'primary_text_key':
			case 'foreign_text_key':
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
			throw new EE_Error(sprintf(__("Internal Event Espresso error. Field %s on class %s is of type %s","event_espresso"),$fieldSettings->nicename,get_class($this),$fieldSettings->type()));
		}
		return $return;
	}
	
	/**
	 * retrieves all the fieldSettings on this class
	 * @return array
	 * @throws EE_Error
	 */
	protected function _get_fields_settings(){
		if($this->_get_model()->fieldsSettings()==null){
			throw new EE_Error(sprintf("An unexpected error has occured with Event Espresso.||An Event Espresso class has not been fully implemented. %s does not override the \$_fieldSettings attribute.",get_class($this)),"event_espresso");
		}
		return $this->_get_model()->fieldsSettings();
	}
	
	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values		
	*		@return int, 1 on a successful update, the ID of
	*					the new entry on insert; 0 on failure		
	
	*/	
	public function save() {
		$set_column_values = array();
		foreach(array_keys($this->_get_fields_settings()) as $fieldName){
			$attributeName=$this->_get_private_attribute_name($fieldName);
			$set_column_values[$fieldName]=$this->$attributeName;
		}
		if ( $set_column_values[$this->_get_primary_key_name()]!=null ){
			$results = $this->_get_model()->update ( $set_column_values, array($this->_get_primary_key_name()=>$this->get_primary_key()) );
		} else {
			unset($set_column_values[$this->_get_primary_key_name()]);
			$results = $this->_get_model()->insert ( $set_column_values );
			if($results){//if successful, set the primary key
				$this->set($this->_get_primary_key_name(),$results);
			}
		}
		
		return $results;
	}
	
	/**
	 * returns the name of the primary key attribute
	 * @return string
	 */
	private function _get_primary_key_name(){
		return $this->_get_model()->primary_key_name();
	}
	
	/**
	 * Returns teh value of the primary key for this class. false if there is none
	 * @return int
	 */
	public function get_primary_key(){
		$pk=$this->_get_primary_key_name();
		return $this->$pk;//$pk is the primary key's NAME, so get the attribute with that name and return it
	}
	
	
	
}

?>
