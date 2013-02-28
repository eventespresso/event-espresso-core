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
	 * @var EEM_TempBase 
	 */
	private $_model;
	
	/**
	 * basic constructor for Event Espresso classes, performs any necessary initialization,
	 * and verifies it's children play nice
	 */
	public function __construct($fieldValues=null){
		$className=get_class($this);
		do_action("action_hook_espresso__{$className}__construct",$this,$fieldValues);
		$this->_model=$this->_get_model();
		if($fieldValues!=null){
			foreach($fieldValues as  $fieldName=>$fieldValue){
				//"<br>set $fieldName to $fieldValue";
				$this->set($fieldName,$fieldValue,true);
			}
		}
		//verify we have all the attributes required in teh model
		foreach($this->_model->fields_settings() as $fieldName=>$fieldSettings){
			if(!property_exists($this,$this->_get_private_attribute_name($fieldName))){
				throw new EE_Error(sprintf(__('You have added an attribute titled \'%s\' to your model %s, but have not set a corresponding
					attribute on %s. Please add $%s to %s','event_espresso'),
						$fieldName,get_class($this->_model),get_class($this),$this->_get_private_attribute_name($fieldName),get_class($this)));
			}
		}
		//verify we have all the model relations
		foreach($this->_model->relation_settings() as $relationName=>$relationSettings){
			$privateAttributeName=$this->_get_private_attribute_name($relationName);
			if(!property_exists($this,$this->_get_private_attribute_name($relationName))){
				throw new EE_Error(sprintf(__('You have added a relation titled \'%s\' to your model %s, but have not set a corresponding
					attribute on %s. Please add protected $%s to %s','event_espresso'),
						$relationName,get_class($this->_model),get_class($this),$this->_get_private_attribute_name($relationName),get_class($this)));
			}
		}
	}
	
	/**
	 * Gets the EEM_*_Model for this class
	 * @access public now, as this is more convenient 
	 * @return EEM_TempBase
	 */
	public function  _get_model(){
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
	
	/**
	 * gets the field (class attribute) specified by teh given name
	 * @param string $fieldName if the field you want is named $_ATT_ID, use 'ATT_ID' (omit preceding underscore)
	 * @return mixed
	 */
	public function get($fieldName){
		$privateFieldName=$this->_get_private_attribute_name($fieldName);
		$fieldSettings=$this->get_fields_settings();
		if(array_key_exists($fieldName,$fieldSettings)){
			$value=$this->$privateFieldName;
			$thisFieldSettings=$fieldSettings[$fieldName];
			switch($thisFieldSettings->type()){
				case 'primary_key':
				case 'foreign_key':
				case 'int':
					return intval($value);
				case 'bool':
				case 'deleted_flag':
					//$value=intval($value);
					return $value==true;
					break;
				case 'primary_text_key':
				case 'foreign_text_key':
				case 'plaintext':
				case 'simplehtml':
				case 'fullhtml':
					return $value;
				case 'float':
					return floatval($value);
				case 'date':
					return intval($value);
				case 'enum':
					return $value;
					break;
				case 'serialized_text'://accept anything. even if it's not an array, or if it's not yet serialized. we'll deal with it.
					if(is_array($value)){
						return $value;
					}else{
						return unserialize($value);
					}
			}
		}else{
			EE_Error::add_error(sprintf(__("You have requested a field named %s on model %s",'event_espresso'),$fieldName,get_class($this)), __FILE__, __FUNCTION__, __LINE__);
			RETURN FALSE;
		}
	}
	
	
	/**
	 * Sets the class attribute by the specified name to the value.
	 * Uses the _fieldSettings attribute to 
	 * @param string $attributeName, as it appears on teh DB column (no _ prefix)
	 * @param mixed $value
	 * @param boolean $useDefault if $value is null and $useDefault is true, retrieve a default value from the EEM_TempBase's EE_Model_Field.
	 * @return null
	 */
	public function set($fieldName,$value,$useDefault=false){
		$fields=$this->get_fields_settings();
		if(!array_key_exists($fieldName, $fields)){
			throw new EE_Error(sprintf(__("An internal Event Espresso error has occured. Please contact Event Espresso.||The field %s doesnt exist on Event Espresso class %s",'event_espresso'),$fieldName,get_class($this)));
		}
		$fieldSettings=$fields[$fieldName];
		//if this field doesn't allow nulls, check it isn't null
		if($value===null && $useDefault){
			$privateAttributeName=$this->_get_private_attribute_name($fieldName);
			$modelFields=$this->_get_model()->fields_settings();
			$defaultValue=$modelFields[$fieldName]->default_value();
			$this->$privateAttributeName=$defaultValue;
			return true;
		}elseif($value===null & !$useDefault){
			if(!$fieldSettings->nullable()){
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
				$internalFieldName=$this->_get_private_attribute_name($fieldName);
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
			case 'bool':
			case 'deleted_flag':
				if($value){
					$return=true;
				}else{
					$return=false;
				}
				break;
			case 'plaintext':
			case 'primary_text_key':
			case 'foreign_text_key':
				$return=htmlentities(wp_strip_all_tags("$value"), ENT_QUOTES, 'UTF-8' );
				break;
			case 'simplehtml':
				global $allowedtags;
				$allowedtags['ol']=array();
				$allowedtags['ul']=array();
				$allowedtags['li']=array();
				$return=  htmlentities(wp_kses("$value",$allowedtags),ENT_QUOTES,'UTF-8');
				break;
			case 'fullhtml':
				$return= htmlentities("$value",ENT_QUOTES,'UTF-8');
				break;
			case 'float':
				$return=floatval($value);
				break;
			case 'date':
				//check if we've been given a string representing a time.
				if(intval($value)!==0 && intval($value)!==1){
					//if so, try to convert it to unix timestamp
					$value=strtotime($value);
				}
				$return = intval($value);
				break;
			case 'enum':
				$return=$value;
				break;
			case 'serialized_text':
				if(is_array($value)){
					$value=serialize($value);
				}
				$return=$value;
				break;
		}
		$return=apply_filters('filter_hook_espresso_sanitizeFieldInput',$return,$value,$fieldSettings);//allow to be overridden
		if(is_null($return)){
			throw new EE_Error(sprintf(__("Internal Event Espresso error. Field %s on class %s is of type %s","event_espresso"),$fieldSettings->nicename(),get_class($this),$fieldSettings->type()));
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
			case 'foreign_key':
			case 'int':
				if(ctype_digit($value) || is_numeric($value)){
					$return= true;
				}
				break;
			case 'bool':
			case 'deleted_flag':
				//$value=intval($value);
				if(is_bool($value) || is_int($value) || ctype_digit($value)){
					$return=true;
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
			case 'date':
				//@todo could verify date format here maybe.
				//if we were to do that, the EE_Model_Field should take an input
				//specifying teh date's format
				if(is_int($value) || is_string($value)){
					$return = true;
				}
				break;
			case 'enum':
				$allowedValues=$fieldSettings->allowed_enum_values();
				if(in_array($value,$allowedValues) || in_array(intval($value),$allowedValues)){
					$return=true;
				}
				break;
			case 'serialized_text'://accept anything. even if it's not an array, or if it's not yet serialized. we'll deal with it.
				$return=true;
		}
		$return= apply_filters('filter_hook_espresso_verifyFieldIsOfCorrectType',$return,$value,$fieldSettings);//allow to be overridden
		if(is_null($return)){
			throw new EE_Error(sprintf(__("Internal Event Espresso error. Field %s on class %s is of type %s","event_espresso"),$fieldSettings->nicename,get_class($this),$fieldSettings->type()));
		}
		return $return;
	}
	
	
	
	/**
	 * To be used in template to immediately echo out the value, and format it for output.
	 * Eg, shoudl call stripslashes and whatnought before echoing
	 * @param string $fieldName the name of the field as it appears in teh DB
	 * @return void
	 */
	public function e($fieldName){
		$privateFieldName=$this->_get_private_attribute_name($fieldName);
		$fieldSettings=$this->get_fields_settings();
		if(array_key_exists($fieldName,$fieldSettings)){
			$value=$this->$privateFieldName;
			$thisFieldSettings=$fieldSettings[$fieldName];
			switch($thisFieldSettings->type()){
				case 'primary_key':
				case 'foreign_key':
				case 'int':
					echo intval($value);
					break;
				case 'bool':
				case 'deleted_flag':
					if($value){
						_e("Yes",'event_espresso');
					}else{
						_e("No",'event_espresso');
					}
					break;
				case 'primary_text_key':
				case 'foreign_text_key':
				case 'plaintext':
				case 'simplehtml':
				case 'fullhtml':
					echo stripslashes($value);
					break;
				case 'float':
					echo floatval($value);
					break;
				case 'date':
					
					$format = get_option('date_format');
					if ( empty( $value )) {
						_e("Unknown",'event_espresso');
					} else {
						echo date_i18n( $format, strtotime( $value )); 
					}
					break;
				case 'enum':
					echo stripslashes($value);
					break;
				case 'serialized_text'://accept anything. even if it's not an array, or if it's not yet serialized. we'll deal with it.
					if(is_array($value)){
						echo stripslashes($value);
					}else{
						echo stripslashes(unserialize($value));
					}
			}
		}else{
			EE_Error::add_error(sprintf(__("You have requested a field named %s on model %s",'event_espresso'),$fieldName,get_class($this)), __FILE__, __FUNCTION__, __LINE__);
			return;
		}
	}
	
	/**
	 * retrieves all the fieldSettings on this class
	 * @return array
	 * @throws EE_Error
	 */
	public function get_fields_settings(){
		if($this->_get_model()->fields_settings()==null){
			throw new EE_Error(sprintf("An unexpected error has occured with Event Espresso.||An Event Espresso class has not been fully implemented. %s does not override the \$_fieldSettings attribute.",get_class($this)),"event_espresso");
		}
		return $this->_get_model()->fields_settings();
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
		foreach($set_cols_n_values as $column=>$value){
			$this->set($column,$value);
		}
		$save_cols_n_values = array();
		foreach(array_keys($this->get_fields_settings()) as $fieldName){
			$attributeName=$this->_get_private_attribute_name($fieldName);
			$save_cols_n_values[$fieldName]=$this->$attributeName;
		}
		if ( $save_cols_n_values[$this->_get_primary_key_name()]!=null ){
			$results = $this->_get_model()->update ( $save_cols_n_values, array($this->_get_primary_key_name()=>$this->get_primary_key()) );
		} else {
			unset($save_cols_n_values[$this->_get_primary_key_name()]);
			$results = $this->_get_model()->insert ( $save_cols_n_values );
			if($results){//if successful, set the primary key
				$results=$results['new-ID'];
				$this->set($this->_get_primary_key_name(),$results);//for some reason the new ID is returned as part of an array,
				//where teh only key is 'new-ID', and it's value is the new ID.
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
		$pk=$this->_get_private_attribute_name($this->_get_primary_key_name());
		return $this->$pk;//$pk is the primary key's NAME, so get the attribute with that name and return it
	}
	
	/**
	 * Functions through which all other calls to get a single related model object is passed.
	 * Handy for common logic between them, eg: caching.
	 * @param string $relationName
	 * @return EE_Base_Class
	 */
	public function get_first_related( $relationName, $where_col_n_values = null, $orderby = null, $order = null, $operators = '=', $output = 'OBJECT_K'){
		$internalName=$this->_get_private_attribute_name($relationName);
		//cache the related object
		if($this->$internalName==null){
			$model=$this->_get_model();
			$relationRequested=$model->get_first_related($this, $relationName,$where_col_n_values,$orderby,$order,$operators,$output);
			$this->$internalName=$relationRequested;
		}
		//return teh now-cahced related object
		return $this->$internalName;
	}
	
	/**
	 * Removes all caches on relations. E.g., on EE_Question, if you've previously asked for
	 * all teh related EE_Answers -and had that list automatically cahced- and remove one of those EE_Answers, this function will clear that cache.
	 * @param string $specificRelationName if you know exactly which relation cache needs to be cleared. If not set, all of them will be cleared.
	 */
	public function clear_relation_cache( $specificRelationName = null ){
		if(!$specificRelationName){
			$model=$this->_get_model();
			$relations=array_keys($model->relation_settings());
			foreach($relations as $relationName){
				$privateAttributeName=$this->_get_private_attribute_name($relationName);
				$this->$privateAttributeName=null;
			}
		}else{
			$privateAttributeName=$this->_get_private_attribute_name($specificRelationName);
			$this->$privateAttributeName=null;
		}
	}
	
	/**
	 * Function through which all other calls to get many related model objects is passed.
	 * Handy for common lgoci between them, eg: caching.
	 * @param string $relationName
	 * @param array $where_col_n_vals keys are field/column names, values are their values
	 * @return EE_Base_Class[]
	 */
	public function get_many_related($relationName,$where_col_n_values=null,$orderby=null,$order='ASC',$operators='=',$limit=null,$output='OBJECT_K'){
		$privateRelationName=$this->_get_private_attribute_name($relationName);
		if($this->$privateRelationName==null){
			$model=$this->_get_model();
			$relationRequested=$model->get_many_related($this, $relationName,$where_col_n_values,$orderby,$order,$operators,$limit,$output);
			$this->$privateRelationName=$relationRequested;
		}
		return $this->$privateRelationName;
	}
	
	/**
	 * Adds a relationship to the specified EE_Base_Class object, given the relationship's name. Eg, if the curren tmodel is related
	 * to a group of events, the $relationName should be 'Events', and should be a key in the EE Model's $_model_relations array
	 * @param mixed $otherObjectModelObjectOrID EE_Base_Class or the ID of the other object
	 * @param string $relationName eg 'Events','Question',etc.
	 * @param array $extraColumnsForHABTM mapping from column/attribute names to values for JOIN tables with extra columns. Eg, when adding 
	 * an attendee to a group, you also want to specify which role they will have in that group. So you would use this parameter to specificy array('role-column-name'=>'role-id')
	 
	 * @return boolean success
	 */
	public function _add_relation_to($otherObjectModelObjectOrID,$relationName,$extraColumnsForHABTM=null){
		$model=$this->_get_model();
		$success= $model->_add_relation_to($this, $otherObjectModelObjectOrID, $relationName,$extraColumnsForHABTM);
		if($success){
			//invalidate cached relations
			//@todo: this could be optimized. Instead, we could just add $otherObjectModel toteh array if it's an array, or set it if it isn't an array
			$this->clear_relation_cache($relationName);
			if($otherObjectModelObjectOrID instanceof EE_Base_Class){
				$otherObjectModelObjectOrID->clear_relation_cache();
			}
			return $success;
		}else{
			return $success;
		}
	}
	
	/**
	 * Removes a relationship to the psecified EE_Base_Class object, given the relationships' name. Eg, if the curren tmodel is related
	 * to a group of events, the $relationName should be 'Events', and should be a key in the EE Model's $_model_relations array
	 * @param mixed $otherObjectModelObjectOrID EE_Base_Class or the ID of the other object
	 * @param string $relationName
	 * @return boolean success
	 */
	public function _remove_relation_to($otherObjectModelObjectOrID,$relationName){
		$model=$this->_get_model();
		$success= $model->remove_relationship_to($this, $otherObjectModelObjectOrID, $relationName);
		if($success){
			//invalidate cached relations
			//@todo: this could be optimized. Instead, we could just remove $otherObjectModel toteh array if it's an array, or unset it if it isn't an array
			$this->clear_relation_cache($relationName);
			if($otherObjectModelObjectOrID instanceof EE_Base_Class){
				$otherObjectModelObjectOrID->clear_relation_cache();
			}
			return $success;
		}else{
			return $success;
		}
	}
	/**
	 * Wrapper for get_primary_key(). Gets the value of the primary key.
	 * @return mixed, if the primary key is of type INT it'll be an int. Otherwise it could be a string
	 */
	public function ID(){
		$r=$this->get_primary_key();
		return $r;
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