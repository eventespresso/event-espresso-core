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
	 * Multi-dimensional array that defines teh mapping from OLD table Primary Keys
	 * to NEW table Primary Keys.
	 * Top-level array keys are OLD table names (minus the "wp_" part),
	 * 2nd-level array skeys are NEW table names (again, minus the "wp_" part),
	 * 3rd-level array keys are the OLD table primary keys
	 * and 3rd-level array values are the NEW table primary keys
	 * @var array
	 */
	protected $_mappings = array();
	
	/**
	 * All chidlren of this must call parent::__construct() or suffer teh consequences!
	 */
	public function __construct() {
		foreach($this->_migration_stages as $migration_stage){
			$migration_stage->_construct_finalize($this);
		}
		parent::__construct();
	}
	
	/**
	 * Sets the mapping from old table primary keys to new table primary keys.
	 * This mapping is automatically persisted as a property on the migration
	 * @param string $old_table with no wpdb prefix (wp_). Eg: events_detail
	 * @param int|string $old_pk old primary key. Eg events_detail.id's value
	 * @param string $new_table with no wpdb prefix (wp_). Eg: posts
	 * @param int|string $new_pk eg posts.ID
	 * @return void
	 */
	public function set_mapping($old_table,$old_pk,$new_table,$new_pk){
		if( ! $this->_mappings ){
			$this->_mappings = get_option(get_class($this)."_mappings");
		}
		//if it still doesn't exist, just initialize it to an array
		if ( ! $this->_mappings){
			$this->_mappings = array();
		}
		//make sure it has the needed keys
		if( ! isset($this->_mappings[$old_table])){
			$this->_mappings[$old_table] = array();
		}
		if( ! isset($this->_mappings[$old_table][$new_table])){
			$this->_mappings[$old_table][$new_table] = array();
		}
		$this->_mappings[$old_table][$new_table][$old_pk] = $new_pk;
	}
	
	/**
	 * Gets the new primary key, if provided with the OLD table and the primary key
	 * of an item in the old table, and the new table
	 * @param string $old_table with no wpdb prefix (wp_). Eg: events_detail
	 * @param int|string $old_pk old primary key. Eg events_detail.id's value
	 * @param string $new_table with no wpdb prefix (wp_). Eg: posts
	 * @return mixed the primary key on the new table
	 */
	public function get_mapping_new_pk($old_table,$old_pk,$new_table){
		if( ! $this->_mappings ){
			$this->_mappings = get_option(get_class($this)."_mappings");
		}
		if(is_array($this->_mappings) && isset($this->_mappings[$old_table][$new_table][$old_pk])){
			return $this->_mappings[$old_table][$new_table][$old_pk];
		}
		return null;
	}
	
	/**
	 * Gets the old primary key, if provided with the OLD table,
	 * and the new table and the primary key of an item in teh new table
	 * @param string $old_table with no wpdb prefix (wp_). Eg: events_detail
	 * @param int|string $old_pk old primary key. Eg events_detail.id's value
	 * @param string $new_table with no wpdb prefix (wp_). Eg: posts
	 * @return mixed the primary key on the new table
	 */
	public function get_mapping_old_pk($old_table,$new_table,$new_pk){
		if( ! $this->_mappings ){
			$this->_mappings = get_option(get_class($this)."_mappings");
		}
		if(is_array($this->_mappings) && isset($this->_mappings[$old_table][$new_table])){
			$new_pk_to_old_pk = array_flip($this->_mappings[$old_table][$new_table]);
			if(isset($new_pk_to_old_pk[$new_pk])){
				return $new_pk_to_old_pk[$new_pk];
			}
		}
		return null;
	}
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
		$records_migrated_per_stage = array();
		//setup the 'stage' variable, which should hold the last run stage of the migration  (or none at all if nothing runs)
		$stage = null;
		//get the next stage that isn't complete
		foreach($this->stages() as $stage){
			if( $stage->get_status() == EE_Data_Migration_Manager::status_continue){
				try{
					$records_migrated_during_stage = $stage->migration_step($num_records_to_migrate_limit);
					$num_records_actually_migrated += $records_migrated_during_stage;
					$records_migrated_per_stage[$stage->pretty_name()] = $records_migrated_during_stage;
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
			//or if the current script stopped early- its not done, butit's done all it thinks we shoudl do on this step
			if ($num_records_actually_migrated >= $num_records_to_migrate_limit || $stage->is_borked() || $stage->has_more_to_do()){
				break;
			}
		}
		//check if we're all done this data migration...
		//which is indicated by being done early AND the last stage claims to be done
		if( $num_records_actually_migrated < $num_records_to_migrate_limit && $stage!=null && ! $stage->has_more_to_do()){
			//apparently we're done, because we couldn't migrate the number we intended to
			$this->set_status(EE_Data_Migration_Manager::status_completed);
			//do schema changes for after the migration now
			//first double-cehckw ehaven't already done this
			$this->_maybe_do_schema_changes(false);
		}else{
			$this->_update_feedback_message($records_migrated_per_stage);
		}
		return $num_records_actually_migrated;
	}
	
	/**
	 * Updates teh feedback message according to what was done during this migration stage.
	 * @param array $records_migrated_per_stage KEYS are pretty names for each stage; values are the count of records migrated from that stage
	 * @return void
	 */
	private function _update_feedback_message($records_migrated_per_stage){
		$feedback_message_array = array();
		foreach($records_migrated_per_stage as $migration_stage_name => $num_records_migrated){
			$feedback_message_array[] = sprintf(__("Migrated %d records successfully during %s", "event_espresso"),$num_records_migrated,$migration_stage_name) ;
		}
		$this->_feedback_message = implode("<br>",$feedback_message_array);
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
		$stages = apply_filters('FHEE__'.get_class($this).'__stages',$this->_migration_stages);
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
	
	/**
	 * A lot like "__sleep()" magic method in purpose, this is meant for persisting this class'
	 * properties to the DB. However, we don't want to use __sleep() because its quite
	 * possible that this class is defined when it goes to sleep, but NOT available when it
	 * awakes (eg, this class is part of an addon that is deactivated at some point). 
	 */
	public function properties_as_array(){
		$properties = parent::properties_as_array();
		$properties['_migration_stages'] = array();
		foreach($this->_migration_stages as $migration_stage_priority => $migration_stage_class){
			$properties['_migration_stages'][$migration_stage_priority] = $migration_stage_class->properties_as_array();
		}
		return $properties;
	}
	
	/**
	 * Sets all of the properties of this script stage to match what's in the array, whcih is assumed
	 * to ahve been made from the properties_as_array() function.
	 * @param array $array_of_properties like what's produced from properties_as_array() method
	 * @return void
	 */
	public function instantiate_from_array_of_properties($array_of_properties){
		$stages_properties_arrays = $array_of_properties['_migration_stages'];
		unset($array_of_properties['_migration_stages']);
		unset($array_of_properties['class']);
		foreach($array_of_properties as $property_name => $property_value){
			$this->$property_name = $property_value;
		}
		//_migration_stages are already instantiated, but have only default data
		foreach($this->_migration_stages as $priority => $stage){
			$stage_data = $this->_find_migration_stage_data_with_classname(get_class($stage),$stages_properties_arrays);
			//SO, if we found the stage data that was saved, use it. Otherwise, I guess the stage is new? (maybe added by
			//an addon? Unlikely... not sure why it wouldn't exist, but if it doesn't just treat it like it was never started yet)
			if($stage_data){
				$stage->instantiate_from_array_of_properties($stage_data);
			}
		}
//		foreach($stages as $stage_priority => $stage_properties_array){
//			$stage_class_name = $stage_properties_array['class'];
//			//if the script is done, we just want to preserve old data because it wont run again
//			//but if it isn't done, then we want to only have valid migration stages on this script
//			if($this->is_borked() || $this->is_completed()){
//				$include_invalid_stages = true;
//			}else{
//				$include_invalid_stages = false;
//			}
//			if( ! class_exists($stage_class_name) ){
//				if($include_invalid_stages){
//					$this->_migration_stages[$stage_priority] = $stage_properties_array;
//				}
//				//ie, if we're not leaving ivnalid stages alone, we drop it
//				continue;
//			}
//			$stage = new $stage_class_name;
//			if( ! $stage instanceof EE_Data_Migration_Script_Stage){
//				if($include_invalid_stages){
//					$this->_migration_stages[$stage_priority] = $stage;
//				}
//				//ie, if we're not leaving invalid srtages alone, we drop it
//				continue;
//			}
//			
//			$stage->instantiate_from_array_of_properties($stage_properties_array);
//			$this->_migration_stages[$stage_priority] = $stage;
//		}
	}
	/**
	 * Gets the migration data from the array $migration_stage_data_arrays (which is an array of arrays, each of which
	 * is pretty well identical to EE_Data_Migration_Stage objects except all their properties are array indexes)
	 * for the given classname
	 * @param type $classname
	 * @param type $migration_stage_data_arrays
	 * @return null
	 */
	private function _find_migration_stage_data_with_classname($classname,$migration_stage_data_arrays){
		foreach($migration_stage_data_arrays as $priority => $migration_dstage_data_array){
			if(isset($migration_dstage_data_array['class']) && $migration_dstage_data_array['class'] == $classname){
				return $migration_dstage_data_array;
			}
		}
		return null;
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
	 * The migration script this is a stage of
	 * @var EE_Data_Migration_Script_Base
	 */
	protected $_migration_script;
	
	/**
	 * This should eb called to essentially 'finalize' construction of the stage.
	 * This isnt done on the main constructor in order to avoid repetitive code. Instead, this is 
	 * called by EE_Data_Migration_Script_Base's __construct() method so children don't have to
	 * @param EE_Data_Migration_Script_Base $migration_script
	 */
	public function _construct_finalize($migration_script){
		$this->_migration_script = $migration_script;
	}
		
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
	
	
	/**
	 * Sets all of the properties of this script stage to match what's in the array, whcih is assumed
	 * to ahve been made from the properties_as_array() function.
	 * @param array $array_of_properties like what's produced from properties_as_array() method
	 */
	public function instantiate_from_array_of_properties($array_of_properties){
		unset($array_of_properties['class']);
		foreach($array_of_properties as $property_name => $property_value){
			$this->$property_name = $property_value;
		}
	}
	
	/**
	 * Gets the script this is a stage of
	 * @return EE_Data_Migration_Script_Base
	 */
	protected function get_migration_script(){
		return $this->_migration_script;
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
	 * Return sthe last error that occurred. If none occurred, returns null
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
	 * Sets all of the properties of this script stage to match what's in the array, whcih is assumed
	 * to ahve been made from the properties_as_array() function.
	 * @param array $array_of_properties like what's produced from properties_as_array() method
	 */
	abstract public function instantiate_from_array_of_properties($array_of_properties);
	
	/**
	 * Convenience method for showing a database insertion error
	 * @param string $old_table
	 * @param array $old_row_as_array
	 * @param string $new_table
	 * @param array $new_row_as_array columsn=>values like used in wpdb->insert
	 * @param array $datatypes numerically indexed
	 * @return string
	 */
	protected function _create_error_message_for_db_insertion($old_table, $old_row_as_array, $new_table, $new_row_as_array, $datatypes){
		global $wpdb;
		$old_columns_and_values_for_string = array();
		foreach($old_row_as_array as $column => $value){
			$old_columns_and_values_for_string[] = "$column => $value";
		}
		$new_columns_and_values_for_string = array();
		$count = 0;
		foreach($new_row_as_array as $column => $value){
			$new_columns_and_values_for_string[] = " $column => $value (".$datatypes[$count++].")";
		}
		return sprintf(__('Received error "%6$s" inserting row %5$s %1$s %5$s into table %2$s.%5$s Data used was %5$s %3$s %5$s from table %4%s.', "event_espresso"),
				implode(", ",$new_columns_and_values_for_string),
				$new_table,
				implode(", ",$old_columns_and_values_for_string),
				$old_table,
				'<br/>',
				$wpdb->last_error);
	}
}

/**
 * Migration stages which simply cycle through all the rows of an old table and somehow migrate them to the new DB
 * should probably extend Stage_Table in order to avoid code repetition. To extend this, implement the _migrate_old_row() method,
 * and create a constructor which defines $this->_old_table to be the name of teh old table.
 */
abstract class EE_Data_Migration_Script_Stage_Table extends EE_Data_Migration_Script_Stage{
	protected $_old_table;
	function _migration_step($num_items=50){
		global $wpdb;
		$start_at_record = $this->count_records_migrated();
		$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
		$items_actually_migrated = 0;
		foreach($rows as $old_row){
			$this->_migrate_old_row($old_row);
			$items_actually_migrated++;
		}
		if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
			$this->set_completed();
		}
		return $items_actually_migrated;
	}
	function _count_records_to_migrate() {
		global $wpdb;
		$count = $wpdb->get_var("SELECT COUNT(id) FROM ".$this->_old_table);
		return $count;
	}
	
	/**
	 * takes care of migrating this particular row from the OLD table to whatever its
	 * representation is in the new database. If there are errors, use $this->add_error to log them. If there is a fatal error
	 * which prevents all future migrations, throw an exception describing it
	 * @param $old_row an associative array where keys are column names and values are their values.
	 * @return null
	 */
	abstract protected function _migrate_old_row($old_row);
}
/**
 * This is a stub data migraiton that we can put in the array of data migrations when we have an aerror
 * finding the next data migration script.
 */
class EE_Data_Migration_Script_Error extends EE_Data_Migration_Script_Base{
	public function can_migrate_from_version($version_string) {
		return false;
	}
	public function schema_changes_after_migration() {
		return;
	}
	public function schema_changes_before_migration() {
		return;
	}
	public function __construct() {
		
		$this->_migration_stages = array();
		$this->_pretty_name = __("Fatal Uncatchable Error Occurred", "event_espresso");
//		dd($this);
		parent::__construct();
	}
}