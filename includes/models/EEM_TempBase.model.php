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
			if($settings['type']=='primary_key'){
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
	protected function _create_objects( $attendees = FALSE ) {

		if ( ! $attendees ) {
			return FALSE;
		} 		
		foreach ( $attendees as $attendee ) {
				$args=get_object_vars($attendee);
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