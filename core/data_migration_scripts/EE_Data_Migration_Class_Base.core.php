<?php
use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 * Class EE_Data_Migration_Class_Base
 *
 * Base class for common functionality between EE_Data_migration_Script_base and EE_Data_migration_Script_Stage.
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since                4.0
 *
 */



abstract class EE_Data_Migration_Class_Base{

	/**
	 * @var $records_to_migrate int count of all that have been migrated
	 */
	protected $_records_to_migrate = 0;

	/**
	 *
	 * @var $records_migrated int
	 */
	protected $_records_migrated = 0;

	/**
	 * Whether this migration script is done or not. This COULD be deduced by
	 * _records_to_migrate and _records_migrated, but that might nto be accurate
	 *
	 * @var string one of EE_Data_migration_Manager::status_* constants
	 */
	protected $_status = null;

	/**
	 * internationalized name of this class. Convention is to NOT restate that
	 * this class if a migration script or a migration script stage
	 *
	 * @var string (i18ned)
	 */
	protected $_pretty_name = null;

	/**
	 * @var array
	 */
	protected $_errors = array();

	/**
	 * @var \EventEspresso\core\services\database\TableManager $table_manager
	 */
	protected $_table_manager;

	/**
	 * @var \EventEspresso\core\services\database\TableAnalysis $table_analysis
	 */
	protected $_table_analysis;



	/**
	 * Just initializes the status of the migration
	 *
	 * @param TableManager  $table_manager
	 * @param TableAnalysis $table_analysis
	 */
	public function __construct( TableManager $table_manager = null, TableAnalysis $table_analysis = null ){
		$this->_table_manager = $table_manager;
		$this->_table_analysis = $table_analysis;
		$this->set_status(EE_Data_Migration_Manager::status_continue);
	}



	/**
	 * Just gets the pretty name for this migration script or stage
	 * @throws EE_Error
	 * @return string
	 */
	public function pretty_name(){
		if($this->_pretty_name === null){
			throw new EE_Error(sprintf(__("Please give a pretty name to the migration script stage %s by assigning the property _pretty_name in the constructor", "event_espresso"),get_class($this)));
		}
		return $this->_pretty_name;
	}
	/**
	 *
	 * @return int
	 */
	public function count_records_to_migrate(){
		if( $this->_records_to_migrate == null){
			$this->_records_to_migrate = $this->_count_records_to_migrate();
		}
		return $this->_records_to_migrate;
	}
	/**
	 * Counts records already migrated. This should only be implemented by EE_Data_Migration_Script_base and EE_Data_migration_Script_Stage
	 * @return int
	 */
	abstract public function count_records_migrated();
	/**
	 * Counts the records to migrate; the public version may cache it
	 * @return int
	 */
	abstract protected function _count_records_to_migrate();
	/**
	 * Returns a string indicating the migration script's status.
	 * @return string one of EE_Data_Migration_Manager::status_* constants
	 * @throws EE_Error
	 */
	public function get_status(){
		if($this->_status === null){
			throw new EE_Error(sprintf(__("Trying to get status of Migration class %s, but it has not been initialized yet. It should be set in the constructor.", "event_espresso"),get_class($this)));
		}
		return $this->_status;
	}
	/**
	 *
	 * @param string $status
	 * @return void
	 */
	protected function set_status($status){
		$this->_status = $status;
	}
	/**
	 * @return array of strings
	 */
	abstract public function get_errors();

	/**
	 * Returns the last error that occurred. If none occurred, returns null
	 * @return string
	 */
	public function get_last_error(){
		$errors = $this->get_errors();
		if($errors){
			return end($errors);
		}else{
			return null;
		}
	}
	/**
	 * Adds an error to the array of errors on this class.
	 * @param string $error a string describing the error that will be useful for debugging. Consider including all the data that led to the error, and a stack trace etc.
	 * @param boolean $force force the error to be added (because otherwise we have a limit). If forcing and errors are already at their limit, we will purposefully forget the first half
	 */
	public function add_error($error, $force = FALSE ){
		if( ! defined( 'EE_DMS_ERROR_LIMIT' ) ){
			$limit = 50;
		}else{
			$limit = EE_DMS_ERROR_LIMIT;
		}
		//make sure errors is an array, see ticket #8261
		if( is_string( $this->_errors ) ){
			$this->_errors = array( $this->_errors );
		}
		if(count($this->_errors) >= $limit ){
			if( $force ){
				//get rid of the first half of the errors and any above the limit
				$this->_errors = array_slice( $this->_errors, $limit / 2, $limit / 2 );
				$this->_errors[] = "Limit reached; removed first half of errors to save space";
				$this->_errors[] = $error;
			}else{
				$this->_errors[ $limit ] = 'More, but limit reached...';
			}
		}else{
			$this->_errors[] = $error;
		}
	}

	/**
	 * Indicates there was a fatal error and the migration cannot possibly continue
	 * @return boolean
	 */
	public function is_broken(){
		return $this->get_status() == EE_Data_Migration_Manager::status_fatal_error;
	}
	/**
	 * @deprecated since 4.6.12
	 */
	public function is_borked(){
		EE_Error::doing_it_wrong('is_borked', __( 'The cheeky "is_borked" method had been replaced with the more proper "is_broken"', 'event_espresso' ), '4.6.12');
		return $this->is_broken();
	}
	/**
	 * Sets the status to as having a fatal error
	 */
	public function set_broken(){
		$this->_status = EE_Data_Migration_Manager::status_fatal_error;
	}
	/**
	 *
	 * @deprecated since 4.6.12
	 */
	public function set_borked(){
		EE_Error::doing_it_wrong('is_borked', __( 'The cheeky "is_borked" method had been replaced with the more proper "is_broken"', 'event_espresso' ), '4.6.12');
		return $this->set_broken();
	}
	/**
	 * Checks if this thing believes it is completed
	 * @return boolean
	 */
	public function is_completed(){
		return $this->get_status() == EE_Data_Migration_Manager::status_completed;
	}
	/**
	 * Checks if the current script has more to do or not (ie, if it's status is CONTINUE)
	 * @return boolean
	 */
	public function has_more_to_do(){
		return $this->get_status() == EE_Data_Migration_Manager::status_continue;
	}
	/**
	 * Marks that we believe this migration thing is completed
	 */
	public function set_completed(){
		$this->_status = EE_Data_Migration_Manager::status_completed;
	}

	/**
	 * Marks that we think this migration class can continue to migrate
	 */
	public function reattempt(){
		$this->_status = EE_Data_Migration_Manager::status_continue;
		$this->add_error( __( 'Reattempt migration', 'event_espresso' ), TRUE );
	}

	/**
	 * A lot like "__sleep()" magic method in purpose, this is meant for persisting this class'
	 * properties to the DB. However, we don't want to use __sleep() because its quite
	 * possible that this class is defined when it goes to sleep, but NOT available when it
	 * awakes (eg, this class is part of an addon that is deactivated at some point).
	 */
	public function properties_as_array(){
		$properties =  get_object_vars($this);
		$properties['class'] = get_class($this);
		unset($properties['_migration_script']);
		return $properties;
	}
	/**
	 * Sets all of the properties of this script stage to match what's in the array, which is assumed
	 * to have been made from the properties_as_array() function.
	 * @param array $array_of_properties like what's produced from properties_as_array() method
	 */
	abstract public function instantiate_from_array_of_properties($array_of_properties);

	/**
	 * Convenience method for showing a database insertion error
	 * @param string $old_table
	 * @param array $old_row_as_array
	 * @param string $new_table
	 * @param array $new_row_as_array columns=>values like used in wpdb->insert
	 * @param array $data_types numerically indexed
	 * @return string
	 */
	protected function _create_error_message_for_db_insertion($old_table, $old_row_as_array, $new_table, $new_row_as_array, $data_types){
		global $wpdb;
		$old_columns_and_values_for_string = array();
		foreach($old_row_as_array as $column => $value){
			$old_columns_and_values_for_string[] = "$column => $value";
		}
		$new_columns_and_values_for_string = array();
		$count = 0;
		foreach($new_row_as_array as $column => $value){
			$new_columns_and_values_for_string[] = " $column => $value (".$data_types[$count++].")";
		}
		return sprintf(
			__('Received error "%6$s" inserting row %5$s %1$s %5$s into table %2$s.%5$s Data used was %5$s %3$s %5$s from table %4%s.', "event_espresso"),
			implode(", ",$new_columns_and_values_for_string),
			$new_table,
			implode(", ",$old_columns_and_values_for_string),
			$old_table,
			'<br/>',
			$wpdb->last_error
		);
	}



	/**
	 * Same as json_encode, just avoids putting
	 * serialized arrays into the http build query, as that would
	* @param array $array_of_data
	* @return string
	*/
	protected function _json_encode($array_of_data){
		//we'd rather NOT serialize the transaction details
		$fields_to_include = array();
		foreach($array_of_data as $name => $value){
			$unserialized_data = @unserialize($value);
			if($unserialized_data === FALSE){
				$fields_to_include[$name] = $value;
			}
		}
		return wp_json_encode($fields_to_include);
	}
	
	/**
	 * Gets the table manager (or throws an exception if it cannot be retrieved)
	 * @return TableManager
	 * @throws EE_Error
	 */
	protected function _get_table_manager() {
		if( $this->_table_manager instanceof TableManager ) {
			return $this->_table_manager;
		} else {
			throw new EE_Error( 
				sprintf( 
					__( 'Table manager on migration class %1$s is not set properly.', 'event_espresso'), 
					get_class( $this ) 
				) 	
			);
		}
	}
	
	/**
	 * Gets the injected table analyzer, or throws an exception
	 * @return TableAnalysis
	 * @throws EE_Error
	 */
	protected function _get_table_analysis() {
		if( $this->_table_analysis instanceof TableAnalysis ) {
			return $this->_table_analysis;
		} else {
			throw new EE_Error( 
				sprintf( 
					__( 'Table analysis class on migration class %1$s is not set properly.', 'event_espresso'), 
					get_class( $this ) 
				) 
			);
		}
	}
}
// end of file: /core/EE_Data_Migration_Class_Base.core.php