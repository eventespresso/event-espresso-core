<?php

/**
 * Base class for all EE_*_Field classes. These classes are for providing information and functions specific to each
 * field. They define the field's data type for insertion into the db (eg, if the value should be treated as an int, float, or string),
 * what values for the field are acceptable (eg, if setting EVT_ID to a float is acceptable), and generally any functionality within 
 * EEM_Base or EE_Base_Class which depend on the field's type. (ie, you shouldn't need any logic within your model
 * or model object which are dependent on the field's type, ideally). For example, EE_Serialized_Text_Field, specifies that any fields of this type
 * should be serialized before insertion into the db (prepare_for_insertion_into_db()), 
 * should be considered a string when inserting, updating, or using in a where clause for any queries (get_wpdb_data_type()),
 * should be unserialized when being retrieved from the db (prepare_for_set_from_db()), and whatever else.
 */
abstract class EE_Model_Field_Base{
	var $_table_alias;
	var $_table_column;
	var $_name;
	var $_nicename;
	var $_nullable;
	var $_default_value;
	var $_other_config;
	function __construct($table_column, $nicename, $nullable, $default_value = null){
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
		if($this->_name){
			return $this->_name;
		}else{
			throw new EE_Error(sprintf(__("Model field '%s' has no name set. Did you make a model and forget to call the parent model constructor?", "event_espresso"),get_class($this)));
		}
	}
	function get_nicename(){
		return $this->_nicename;
	}
	function is_nullable(){
		return $this->_nullable;
	}
	/**
	 * returns whether this field is an auto-increment field or not. If it is, then
	 * on insertion it can be null. However, on updates it must be present.
	 * @return boolean
	 */
	function is_auto_increment(){
		return false;
	}
	/**
	 * The default value in the model object's value domain. See lengthy comment about
	 * value domains at the top of EEM_Base
	 * @return mixed
	 */
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
	function prepare_for_use_in_db($value_of_field_on_model_object){
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
	 * We may want to serialize the value, etc. By default, we return the value using prepare_for_set() method as that is the one child classes will most often define.
	 * @param mixed $value_found_in_db_for_model_object
	 * @return mixed
	 */
	function prepare_for_set_from_db($value_found_in_db_for_model_object){
		return $this->prepare_for_set($value_found_in_db_for_model_object);
	}
	
	/**
	 * When echoing a field's value on a model object, this function is run to prepare the value for presentation in a webpage.
	 * For example, we may want to output floats with 2 decimal places by default, dates as "Monday Jan 12, 2013, at 3:23pm" instead of
	 * "8765678632", or any other modifications to how the value should be displayed, but not modified itself. 
	 * @param mixed $value_on_field_to_be_outputted
	 * @return mixed
	 */
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null){
		return $value_on_field_to_be_outputted;
	}
	
	abstract function get_wpdb_data_type();
	
	/**
	 * Some fields are in the database-only, (ie, used in queries etc), but shouldn't necessarily be part
	 * of the model objects (ie, client code shouldn't care to ever see their value... if client code does
	 * want to see their value, then they shouldn't be db-only fields!)
	 * Eg, when doing events as custom post types, querying the post_type is essential, but
	 * post_type is irrelevant for EE_Event objects (because they will ALL be of post_type 'esp_event').
	 * By default, all fields aren't db-only.
	 * @return boolean
	 */
	function is_db_only_field(){
		return false;
	}
}