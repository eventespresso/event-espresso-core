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
	 * Indicates we've already ran the schema changes that needed to happen BEFORE the data migration
	 * @var boolean
	 */
	protected $_schema_changes_before_migration_ran = null;
	/**
	 * Indicates we've already ran the schema changes that needed to happen AFTER the data migration
	 * @var boolean
	 */
	protected $_schema_changes_after_migration_ran = null;
	
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
	
	public function migration_step($num_records_to_migrate_limit){
		
		//if wehaven't yet done the 1st schema changes, do them now. buffer any output
		$this->_maybe_do_schema_changes(true);

		$num_records_actually_migrated =0;
		//get the next stage that isn't complete
		foreach($this->stages() as $stage){
			if( $stage->get_status() == EE_Data_Migration_Manager::status_continue){
				try{
					$num_records_actually_migrated += $stage->migration_step($num_records_to_migrate_limit);
				}catch(Exception $e){
					//yes if we catch an exception here, we consider that migration stage borked.
					$stage->set_status(EE_Data_Migration_Manager::status_fatal_error);
					$this->set_status(EE_Data_Migration_Manager::status_fatal_error);
					$stage->add_error($e->getMessage().". Stack-trace:".$e->getTraceAsString());
					throw $e;
				}
				//check that the migration stage didn't mark itself as having a fatal error
				if($stage->is_borked()){
					$this->set_borked();
					throw new EE_Error($stage->get_last_error());
				}
			}
			//once we've migrated all the number we intended to (possibly from different stages), stop migrating
			//or if we had a fatal error
			if ($num_records_actually_migrated >= $num_records_to_migrate_limit || $stage->is_borked()){
				break;
			}
		}
		//check if we're all done this data migration...
		if( $num_records_actually_migrated < $num_records_to_migrate_limit){
			//apparently we're done, because we couldn't migrate the number we intended to
			$this->set_status(EE_Data_Migration_Manager::status_completed);
			//do schema changes for after the migration now
			//first double-cehckw ehaven't already done this
			$this->_maybe_do_schema_changes(false);
		}else{
			//update the feedback message
			$this->_feedback_message = sprintf(__("Migrated %d records successfully during %s", "event_espresso"),$num_records_actually_migrated,$stage->pretty_name());
		}
		return $num_records_actually_migrated;
	}
	/**
	 * Calls either schema_changes_before_migration() (if $before==true) or schema_changes_after_migration
	 * (if $before==false). Buffers their outputs and stores them on the class.
	 * @param boolean $before
	 * @return void
	 */
	private function _maybe_do_schema_changes($before = true){
		//so this property will be ither _schema_changes_after_migration_ran or _schema_changes_before_migration_ran
		$property_name = '_schema_changes_'. ($before ? 'before' : 'after').'_migration_ran';
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
				throw $e;
			}
			//record that we've done these schema changes
			$this->$property_name = true;
			//if there were any warnings etc, record them as non-fatal errors
			if( $output ){
				//there were some warnings
				$this->_errors[] = $output;
			}
		}
	}
	
	/**
	 * returns an arrya of strings describing errors by all the script's stages
	 * @return array
	 */
	public function get_errors(){
		$all_errors = $this->_errors;
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
	 * Gets all the data migration stages associated with this script. Note:
	 * addons can filter this list to add their own stages, and because the list is
	 * numerically-indexed, they can insert their stage wherever they like and it will
	 * get ordered by the indexes
	 * @return EE_Data_Migration_Script_Stage[]
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

/**
 * Each migration script is meant to be composed of different stages. Often, each stage corresponds
 * to a table that needs to be migrated: eg migrating 3.1 events to 4.1 event CPTs. However, each migration stage does 
 * NOT NEED to correspond to migrating a single table: it could also correspond to a group of wp options, files, etc.
 * Only 3 functions need to be implemented for each migration stage: the constructor (it needs to set the _pretty_name property),
 *  _count_records_to_migrate() (which, when migrating a database table, would usually just return the count of records in teh table, but
 * doesn't need to return the exactly correct number, as its mostly only used in the UI), and _migration_step() (which converts X records from their
 * old format to teh new format. Whatever definition your migration stage uses for "record" in _count_records_to_migrate() should be the same definition in
 * _migration_step() (ie, it its a count of rows in teh old attendees table in _count_records_to_migrate(), it should also be OLD attendee rows migrated
 * on each call to _migration_step(). 
 */
abstract class EE_Data_Migration_Script_Stage extends EE_Data_Migration_Class_Base{
	
	/**
	 * Migrates X old records to the new format. If a fatal error is encountered it is NOT caught here,
	 * but is propagated upwards for catching. So basically, the _migration_step() function implemented by children
	 * needs to catch exceptions and decide what's a fatal error and what isn't.
	 * @param int $num_items_to_migrate
	 * @return int
	 */
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
	 * IMPORTANT: if an error is encountered, or everything is finished, this stage should update its status property accordingly.
	 * Note: it should not alter teh count of items migrated. That is done in the public function that calls this.
	 * IMPORTANT: The count of items migrated should ONLY be less than $num_items_to_migrate when it's the last migration step, otherwise it
	 * should always return $num_items_to_migrate. (Eg, if we're migrating attendees rows from teh database, and $num_items_to_migrate is set to 50, 
	 * then we SHOULD actually migrate 50 rows,but at very least we MUST report/return 50 items migrated)
	 * @return int number of items ACTUALLY migrated
	 */
	abstract protected function _migration_step($num_items_to_migrate=50);
	
	/**
	 * Counts the records that have been migrated so far
	 * @return int
	 */
	public function count_records_migrated() {
		return $this->_records_migrated;
	}
	
	/**
	 * returns an arrya of strings describing errors
	 * @return array
	 */
	public function get_errors(){
		return $this->_errors;
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
	 * @var string one of EE_Data_migration_Manager::status_* constants
	 */
	protected $_status = null;
	/**
	 *interntaniotalized name fo this class. Convention is to NOT restate that
	 * this class if a migration script or a migration script stage
	 * @var string (i18ned)
	 */
	protected $_pretty_name = null;
	/**
	 *
	 * @var array
	 */
	protected $_errors = array();
	/**
	 * Just initializes the status of the migration
	 * @throws EE_Error
	 */
	public function __construct(){
		$this->set_status(EE_Data_Migration_Manager::status_continue);
	}
	/**
	 * Just gets the pretty name for this migration script or stage
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
	 * Returns a string indicating the migraiton script's status. 
	 * @return string one of EE_Data_Migration_Manager::statu_* constants
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
	 * Return sthe last error that occurred. If none occured, returns null
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
	 */
	public function add_error($error){
		$this->_errors[] = $error;
	}
	
	/**
	 * Indicates there was a fatal error and the migration cannot possibly continue
	 * @return boolean
	 */
	public function is_borked(){
		return $this->get_status() == EE_Data_Migration_Manager::status_fatal_error;
	}
	/**
	 * Sets teh status to as having a fatal error
	 */
	public function set_borked(){
		$this->_status = EE_Data_Migration_Manager::status_fatal_error;
	}
}