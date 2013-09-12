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
	 * Output (warnings, errors) from doing the schema changes before the migration.
	 * If there are warnings this will be a string. If there are no warnings, it will
	 * simply be TRUE. If it hasn't run, it will be null.
	 * @var mixed
	 */
	protected $_schema_changes_before_migration_output = null;
	/**
	 * Output (warnings, errors) from doing the schema changes after the migration.
	 * If there are warnings this will be a string. If there are no warnings, it will
	 * simply be TRUE. If it hasn't run, it will be null.
	 * @var mixed
	 */
	protected $_schema_changes_after_migration_output = null;
	
	/**
	 * String which describes what's currently happening in this migration
	 * @var string
	 */
	protected $_feedback_message;
	/**
	 * Returns whether or not this data migration script can operate on the given version of the database.
	 * Eg, if this migration script can migrate from 3.1.26 or higher (but not anything after 4.0.0), and
	 * it's passed a string like '3.1.38B', it should return true
	 * @return boolean
	 */
	abstract public function  can_migrate_from_version($version_string);
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
			$count+= $stage->count_records_to_migrate();
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
		$this->_records_migrated = $count;
		return $count;
	}
	
	public function migration_step($num_records_to_migrate){
		
		//if wehaven't yet done the 1st schema changes, do them now. buffer any output
		$was_fatal = $this->_maybe_do_schema_changes(true);
		if($was_fatal){
			$this->_feedback_message = sprintf(__("Fatal error occcured in finalizing the database during %s", "event_espresso"),$this->pretty_name());
			return 0;
		}
		$items_actually_updated =0;
		//get the next stage that isn't complete
		foreach($this->stages() as $stage){
			if( in_array($stage->get_status(),array(EE_Data_Migration_Manager::status_continue,  EE_Data_Migration_Manager::status_error))){
				try{
					$items_actually_updated += $stage->migration_step($num_records_to_migrate);
				}catch(Exception $e){
					$stage->set_status(EE_Data_Migration_Manager::status_fatal_error);
				}
				if(in_array($stage->get_status(),array(
					EE_Data_Migration_Manager::status_error,
					EE_Data_Migration_Manager::status_fatal_error
				))){
					$this->set_status($stage->get_status());
				}
					
			}
			if ($items_actually_updated == $num_records_to_migrate){
				break;
			}
		}
		if($items_actually_updated < $num_records_to_migrate){
			//apparently we're done
			$this->set_status(EE_Data_Migration_Manager::status_completed);
			//do schema changes for after the migration now
			//first double-cehckw ehaven't already done this
			$was_fatal = $this->_maybe_do_schema_changes(false);
			if($was_fatal){
				$this->_feedback_message = sprintf(__("Fatal error occcured in finalizing the database during %s", "event_espresso"),$this->pretty_name());
			}
		}else{
			//update the feedback message
			$this->_feedback_message = sprintf(__("Migrated %d records successfully during %s", "event_espresso"),$items_actually_updated,$stage->pretty_name());
		}
		return $items_actually_updated;
	}
	/**
	 * Calls either schema_changes_before_migration() (if $before==true) or schema_changes_after_migration
	 * (if $before==false). Buffers their outputs and stores them on the class.
	 * @param boolean $before
	 */
	private function _maybe_do_schema_changes($before = true){
		//so this property will be ither _schema_changes_after_migration_output or _schema_changes_before_migration_output
		$property_name = '_schema_changes_'. ($before ? 'before' : 'after').'_migration_output';
		$fatal_error_occurred = false;
		$output = '';
		if ( ! $this->$property_name ){
			try{
				ob_start();
				if($before){
					$this->schema_changes_before_migration();
				}else{
					$this->schema_changes_after_migration();
				}
				$output = ob_get_contents();
				ob_end_clean();
			}catch(Exception $e){
				$output = print_r($e,true);
				$this->set_status(EE_Data_Migration_Manager::status_fatal_error);
				$fatal_error_occurred = true;
			}
			if( $output ){
				//there were some warnings
				$this->$property_name = $output;
			}else{
				//there were no warnings etc from the data migration changes
				$this->$property_name = TRUE;
			}
		}
		return apply_filters('FHEE__'.get_class($this).'__maybe_do_schema_changes__return',$fatal_error_occurred,$before,$output);
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
	 * Indicates whether or not this migration script shoudl continue
	 * @return boolean
	 */
	public function can_continue(){
		return in_array($this->get_status(),  EE_Data_Migration_Manager::instance()->stati_that_indicate_to_continue_single_migration_script);
	}
	
	/**
	 * Indicates there was a fatal error and the migration cannot possibly continue
	 * @return boolean
	 */
	public function is_borked(){
		return $this->get_status() == EE_Data_Migration_Manager::status_fatal_error;
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
	
	/**
	 * Gets a string which should describe what's going on currently with this migration, which
	 * can be displayed to the user
	 * @return string
	 */
	public function get_feedback_message(){
		return $this->_feedback_message;
	}
}

abstract class EE_Data_Migration_Script_Stage extends EE_Data_Migration_Class_Base{
	/**
	 *
	 * @var array
	 */
	protected $errors = array();
	
	public function migration_step($num_items_to_migrate=50){
		//before we run the migration step, we want ot take note of warnings that get outputted
		ob_start();
		$items_migrated = $this->_migration_step($num_items_to_migrate);
		$output = ob_get_contents();
		ob_end_clean();
		if( $output ){
			$this->add_error($output);
		}
		$this->_records_migrated += $items_migrated;
		return $items_migrated;
	}
	/**
	 * Note: if an error is encountered, or everything is finished, this stage should update its status property accordingly.
	 * Note: it should not alter teh count of items migrated. That is done in the public function that calls this.
	 * @return int number of items ACTUALLY migrated
	 */
	abstract protected function _migration_step($num_items_to_migrate=50);
	
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
	
}

/**
 * Base class for common functionality between EE_Data_migration_Script_base and EE_Data_migration_Script_Stage.
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
	 * Whether this mgiration script is done or not. This COULD be deduced by 
	 * _records_to_migrate and _records_migrated, but that might nto be accurate
	 * @var string one of status_completed, status_continue, or status_error
	 */
	protected $_status;
	
	public function __construct(){
		$this->set_status(EE_Data_Migration_Manager::status_continue);
	}
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