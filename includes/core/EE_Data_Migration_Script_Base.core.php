<?php

/**
 * 
 */
abstract class EE_Data_Migration_Script_Base extends EE_Data_Migration_Class_Base{
	
	
	
	/**
	 * numerically-indexed array where each value is EE_Data_Migration_Script_Stage object
	 * @var EE_Data_Migration_Script_Stage[] $migration_functions 
	 */
	protected $_migration_stages;
	
	
	/**
	 * Returns whether or not this data migration script can operate on the given version of the database.
	 * Eg, if this migration script can migrate from 3.1.26 or higher (but not anything after 4.0.0), and
	 * it's passed a string like '3.1.38B', it should return true
	 * @return boolean
	 */
	abstract static public function  can_migrate_from_version($version_string);
	/**
	 * Performs database schema changes that need to occur BEFORE the data is migrated.
	 * Eg, if we were going to change user passwords from plaintext to encoded versions
	 * during this migration, this would probably add a new column called somethign like
	 * "encoded_password".
	 * @return boolean of success
	 */
	abstract public function schema_changes_before_migration();
	/**
	 * Performs the database schema changes that need to occur AFTER the data has been migrated.
	 * Usually this will mean we'll be removing old columns. Eg, if we were changing passwords
	 * from plaintext to encoded versions, and we had added a column called "encoded_password",
	 * this function would probably remove the old column "password" (which still holds the plaintext password)
	 * and possibly rename "encoded_password" to "password"
	 * @return boolean of success
	 */
	abstract public function schema_changes_after_migration();
	/**
	 * Counts all the records that will be migrated during this data migration.
	 * For example, if we were changing old user passwords from plaintext to encoded versions, 
	 * this would be a count of all users who have passwords. If we were going to also split
	 * attendee records into transactions, registrations, and attendee records, this would include
	 * the count of all attendees currently in existence in the DB (ie, users + attendees).
	 * If you can't determine how many records there are to migrate, just provide a guess: this
	 * number will only be used in calculating the percent complete. If you estimate there to be
	 * 100 records to migrate, and it turns out there's 120, we'll just show the migration as being at 
	 * 99% until the function "migration_step" returns EE_Data_Migration_Script_Base::status_complete.
	 * @return int
	 */
	protected function _count_records_to_migrate(){
		$count = 0;
		foreach($this->stages() as $stage){
			$count+= $stage->count_records_migrated();
		}
		return $count;
	}
	
	/**
	 * Returns the number of records updated so far. Usually this is easiest to do
	 * by just setting a transient and updating it after each migration_step
	 * @return int
	 */
	public function count_records_migrated(){
		$count = 0;
		foreach($this->stages() as $stage){
			$count+= $stage->count_records_migrated();
		}
		return $count;
	}
	
	public function migration_step($num_records_to_migrate){
		
		$items_actually_updated =0;
		//get the next stage that isn't complete
		foreach($this->stages() as $stage){
			if( in_array($stage->get_status(),array(EE_Data_Migration_Manager::status_continue,  EE_Data_Migration_Manager::status_error))){
				$items_actually_updated += $stage->migration_step($num_records_to_migrate);
				$this->set_status($stage->get_status());
			}
			//check for errors
			if ($items_actually_updated == $num_records_to_migrate){
				break;
			}
		}
		return $items_actually_updated;
	}
	/**
	 * returns an arrya of strings describing errors by all the script's stages
	 * @return array
	 */
	public function get_errors(){
		$all_errors = array();
		foreach($this->stages() as $stage){
			$all_errors = array_merge($stage->get_errors(),$all_errors);
		}
		return $all_errors;
	}
	
	/**
	 * Gets all the data migration stages associated with this script. Note:
	 * addons can filter this list to add their own stages, and because the list is
	 * numerically-indexed, they can insert their stage wherever they like and it will
	 * get ordered by the indexes
	 * @return EE_Data_Migration_Stage
	 */
	protected function stages(){
		$stages = apply_filters('FHEE__EE_Data_Migration_Script_Base__stages',$this->_migration_stages);
		ksort($stages);
		return $stages;
	}
}

abstract class EE_Data_Migration_Script_Stage extends EE_Data_Migration_Class_Base{
	/**
	 *
	 * @var array
	 */
	protected $errors;
	/**
	 * Note: if an error is encountered, or everything is finished, this stage should update its status property accordingly
	 * @return int number of items ACTUALLY migrated
	 */
	abstract public function migration_step($num_items_to_migrate=50);
	
	/**
	 * returns an arrya of strings describing errors
	 * @return array
	 */
	public function get_errors(){
		return $this->errors;
	}
	
	protected function add_error($error){
		$this->errors[] = $error;
	}
	
	public function count_records_migrated() {
		return $this->_records_migrated;
	}
	protected function _mark_x_records_migrated($num_migrated = 1){
		$this->_records_migrated += $num_migrated;
	}
	
}

/**
 * Base class for common functionality between EE_Data_migration_Script_base and EE_Data_migration_Script_Stage.
 */
abstract class EE_Data_Migration_Class_Base{
	/**
	 * @var $records_to_migrate int count of all that have been migrated
	 */
	protected $_records_to_migrate;
	/**
	 *
	 * @var $records_migrated int
	 */
	protected $_records_migrated;
	
	
	/**
	 * Whether this mgiration script is done or not. This COULD be deduced by 
	 * _records_to_migrate and _records_migrated, but that might nto be accurate
	 * @var string one of status_completed, status_continue, or status_error
	 */
	protected $_status;
	public function count_records_to_migrate(){
		if( $this->_records_to_migrate == null){
			$this->_records_to_migrate = $this->_count_records_to_migrate();
		}
		return $this->_records_to_migrate;
	}
	
	abstract public function count_records_migrated();
	/**
	 * Counts the records to migrate; the public version may cache it
	 * @return int
	 */
	abstract protected function _count_records_to_migrate();
	/**
	 * Returns a pretty, internationalized name of the script which can be used on
	 * the frontend
	 * @return string
	 */
	abstract public function pretty_name();
	public function get_status(){
		return $this->_status;
	}
	protected function set_status($status){
		$this->_status = $status;
	}	
	/**
	 * @return array
	 */
	abstract public function get_errors();
}