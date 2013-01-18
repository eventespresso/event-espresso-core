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
	 * arary for defining all the fields on a model. May not replace all the 
	 * individual setters and getters, as these are convenient for PHP docs and developing,
	 * but sets a central place to define all these attributes, rather than repetitively
	 * coding them into functions, and in different classes.
	 * The keys must be field names (as they appear in the database),
	 * and the values must be an array of fieldSettings for that specified field.
	 * Eg: array('ANS_ID'=>array('type'=>'
	 * @var array 
	 */
	static protected $_fieldSettings=null;
	protected $_fieldValues=null;
	/**
	 * basic constructor for Event Espresso classes, performs any necessary initialization,
	 * and verifies it's children play nice
	 */
	public function __construct(){
		$this->verifyFieldSettings();
		$numArgs=func_num_args();
		if($numArgs==1){
			$fieldValues=  func_get_arg(0);
			foreach($fieldValues as  $fieldName=>$fieldValue){
				$this->set($fieldName,$fieldValue);
			}
		}
	}

	/**
	 * verifies that the fieldSettings array has been initialized properly
	 * @throws EE_Error
	 */
	private static function verifyFieldSettings(){
		//verify $_fieldSettings has been set and is valid
		if($this->_fieldSettings===null){
			throw new EE_Error(sprintf("Event Espressso error. _fieldSettings value on %s has nto been set.",get_class($this)),'event_espresso');
		}
		
		foreach($this->_fieldSettings as $fieldName=>$fieldSettings){
			$requiredFieldSettings=array('type','nullable','nicename');
			foreach($requiredFieldSettings as $requiredFieldSetting){
				if(!in_array($requiredFieldSetting,$fieldSettings)){
					throw new EE_Error(sprintf("Event Espressso error. '%s' settings is missing from %s field on class %s",$requiredFieldSetting,$fieldName,get_class($this)),'event_espresso');
				}
			}
			if($fieldSettings['type']=='foreign_key'){
				if(!in_array('class',$fieldSettings)){
					throw new EE_Error(sprintf("Event Espresso error. Field %s is of type 'foreign_key' on class %s, but is missing the 'class' setting",$fieldName,get_class($this)),'event_espresso');
				}
				//next verify the class is real
				$phpFilePath="EE_".$fieldSettings['class'].".class.php";
				if(file_exists($phpFilePath)){
					throw new EE_Error(sprintf("Event Espresso error. Class %s on field %s in class %s doesn't have a php file!",$phpFilePath,$fieldName,get_class($this)),'event_espresso');
				}
			}
		}
	}
	
	/**
	*		check that var has been passed to method
	* 
	* 		@access		protected
	*/	
	protected function _check_for( $var = FALSE, $var_name ) {

		if ( ! $var ) {
			$msg = sprintf( __( 'No value for %s was supplied.', 'event_espresso' ), $var_name );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		} else {
			return TRUE;
		}
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
	 * gets the field (class attribute) specified by teh given name
	 * @param string $fieldName if the field you want is named $_ATT_ID, use 'ATT_ID' (omit preceding underscore)
	 * @return mixed
	 */
	public function get($fieldName){
		$privateFieldName="_".$fieldName;
		return $this->$privateFieldName;
	}
	
	/**
	 * Sets the class attribute by the specified name to the value.
	 * Uses the _fieldSettings attribute to 
	 * @param type $attributeName
	 * @param type $value
	 */
	public function set($fieldName,$value){
		$fields=$this->getFieldSettings();
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
			if($this->verifyFieldIsOfCorrectType($value,$fieldSettings)){
				$internalFieldName="_".$fieldName;
				$this->$internalFieldName=$this->sanitizeFieldInput($value, $fieldSettings);
				return true;
			}else{
				$msg = sprintf( __( 'Event Espresso error setting value on field %s.||In trying to set field %s of class %s to value %s, it was found to not be of type %s', 'event_espresso' ), $fieldName,get_class($this),$value,$fieldSettings['type']);
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
	protected function sanitizeFieldInput($value,$fieldSettings){
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
			case 'fullhtml':
				$reutrn= htmlentities("$value",ENT_QUOTES,'UTF-8');
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
	protected function verifyFieldIsOfCorrectType($value,$fieldSettings){
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
	public static function getFieldSettings(){
		if(self::_fieldSettings==null){
			throw new EE_Error(sprintf("An unexpected error has occured with Event Espresso.||An Event Espresso class has not been fully implemented. %s does not override the \$_fieldSettings attribute.",get_class($this)),"event_espresso");
		}
		return self::_fieldSettings;
	}
}

?>
