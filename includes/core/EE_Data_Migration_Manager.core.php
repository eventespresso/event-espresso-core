<?php

/**
 *
 * Class which determines what data migration files CAN be run, and compares
 * that list to those which have ALREADY run, and determines if there are any that
 * SHOULD run. Also, takes care of running them upon the admin's request in conjunction
 * with the AJAX code on the data migration admin page
 * 
 * When determining what data migration scripts ought to run, compares
 * the wordpress option with name 'espresso_data_migrations' to all the data migration scripts
 * contained in the appointed folders (includes/core/data_migration_scripts in core,
 * but addons can add their own folder). See EE_Data_Migration_Script_Base.php for the data 
 * migration script naming rules (not just conventions).
 * 
 * When performing the migrations, the ajax code on the client-side repeatedly pings
 * a URL which calls EE_Data_Migration_Manager::migration_step(), which in turn calls the currently-executing
 * data migration script and calls its function also named migration_step(), which migrates a few records
 * over to the new database structure, and returns either: EE_Data_Migration_Manager::status_continue to indicate that
 * it's successfully migrated some data, but has more to do on the subsequent ajax request;  EE_Data_Migration_Manager::status_completed
 * to indicate it succesfully migrate some data, and has nothing left to do; or EE_Data_Migration_Manager::status_error to indicate
 * an error occured which means the ajax script should probably stop executing. 
 */
class EE_Data_Migration_Manager{
	
	/**
	 *
	 * @var EE_Registry
	 */
	protected $EE;
	/**
	 * name of the wordpress option which stores an array of data about
	 */
	const data_migrations_option_name = 'espresso_data_migrations';
	
	/**
	 * name of the wordpress option which stores the name of the currently-executing data migration script
	 */
	const currently_executing_script_option_name = 'espresso_data_migration_currenctly_executing_migration_script';
	
	/**
	 * name of the wordpress option which stores the database' current version. IE, the code may be at version 4.2.0,
	 * but as migrations are performed the database will progress from 3.1.35 to 4.1.0 etc.
	 */
	const current_database_state = 'espresso_data_migration_current_db_state';
	
	/**
	 * Special status string returned when we're positive there are no more data migration
	 * scripts that can be run.
	 */
	const status_no_more_migration_scripts = 'no_more_migration_scripts';
	/**
	 * string indicating the migration should continue
	 */
	const status_continue = 'status_continue';
	/**
	 * string indicating the migration has completed and should be ended
	 */
	const status_completed = 'status_completed';
	/**
	 * string indicating the migration had an ERROR but it was non-fatal
	 */
	const status_error = 'status_error';
	/**
	 * string indicating a fatal error occured and the data migration should be completedly aborted
	 */
	const status_fatal_error = 'status_fatal_error';
	/**
	 * Array of information concernign data migrations that have ran in the history 
	 * of this EE installation. Keys should be the name of the version the script upgraded to
	 * @var EE_Data_Migration_Script_Base[]
	 */
	private $_data_migrations_ran;
	/**
	 * array where keys are classnames, and values are filepaths of all teh known migration scripts
	 * @var array
	 */
	private $_data_migration_class_to_filepath_map;
	/**
	 * the following 4 properties are fully set on construction.
	 * Note: teh first two apply to whether to conitnue runnign ALL migration scripts (ie, even though we're finished
	 * one, we may want to start the next one); whereas teh last two indicate whether to continue running a single
	 * data migration script
	 * @var array
	 */
	var $stati_that_indicate_to_continue_migrations = array();
	var $stati_that_indicate_to_stop_migrations = array();
	var $stati_that_indicate_to_continue_single_migration_script = array();
	var $stati_that_indicate_to_stop_single_migration_script = array();
	private function __construct(){
		$this->EE = EE_Registry::instance();
		$this->stati_that_indicate_to_continue_migrations = array(self::status_continue,self::status_error,self::status_completed);
		$this->stati_that_indicate_to_stop_migrations = array(self::status_fatal_error,self::status_no_more_migration_scripts);
		$this->stati_that_indicate_to_continue_single_migration_script = array(self::status_continue,self::status_error);
		$this->stati_that_indicate_to_stop_single_migration_script = array(self::status_completed,self::status_fatal_error);//note: status_no_more_migration_scripts doesn't apply
	}
	/**
	 * Gets the array describing what data migrations have run
	 * @return EE_Data_Migration_Script_Base[]
	 */
	public function get_data_migrations_ran(){
		if( ! $this->_data_migrations_ran ){
			$this->_data_migrations_ran = get_option(EE_Data_Migration_Manager::data_migrations_option_name);
			if ( ! $this->_data_migrations_ran || ! is_array($this->_data_migrations_ran) ){
				$this->_data_migrations_ran = array();
			}
		}
		return $this->_data_migrations_ran;
	}
	
	/**
	 * Gets the array of folders which contain data migration scripts. Also adds them to be auto-loaded
	 * @return array where each value is the full folderpath of a folder containing data migration scripts, WITH slashes at the end of the 
	 * folder name.
	 */
	public function get_data_migration_script_folders(){
		return  apply_filters('FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders',array(EE_CORE.'data_migration_scripts'));
	}
	
	/**
	 * Gets the version (with a ".core" or ".addon_slug") that this data migration file should update to.
	 * If $incldue_slug_suffix is false, just returns the version (eg "4.1.0" instead of "4.1.0.core")
	 * @param string $migration_script_name eg 'EE_DMS_4_1_0_core'
	 * @param boolean $include_slug_suffix
	 * @return string
	 * @throws EE_Error
	 */
	private function _migrates_to_version($migration_script_name){
		preg_match('~EE_DMS_([0-9]*)_([0-9]*)_(.*)~',$migration_script_name,$matches);
			if( ! $matches || ! (isset($matches[1]) && isset($matches[2]) && isset($matches[3]))){
				throw new EE_Error(sprintf(__("%s is not a valid Data Migration Script. The classname should be like EE_DMS_w_x_y_z, where w x and y are numbers, and z is either 'core' or the slug of an addon", "event_espresso"),$classname));
			}
		$version =   $matches[1].".".$matches[2].".".$matches[3]; 
		return $version;
	}
	/**
	 * Ensures that the option indicating the current DB version is set. This should only be 
	 * a concern when activating EE for teh first time, THEORETICALLY. 
	 * If we detect that we're activating EE4 overtop of EE3.1, then we set the current db state to 3.1.x, otherwise
	 * to 4.1.x. 
	 * @return string of current db state
	 */
	public function ensure_current_database_state_is_set(){
		$espresso_db_update = get_option( 'espresso_db_update', array() );
		$db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		if( ! $db_state ){
			//mark teh DB as being in teh state as teh last version in there.
			//this is done to trigger maintenance mode and do data migration scripts
			//if the admin installed this version of EE over 3.1.x or 4.0.x
			//otherwise, the normal maintenance mode code is fine
			$previous_versions_installed = array_keys($espresso_db_update);
			$previous_version_installed = end($previous_versions_installed);
			if(version_compare('4.1.0', $previous_version_installed)){
				//last installed version was less than 4.1
				//so we want the data migrations to happen. SO, we're going to say the DB is at that state
//				echo "4.1.0 is great erhtan $previous_version_installed! update the option";
				$db_state = $previous_version_installed;
			}else{
//					echo "4.1.0 is SMALLER than $previous_version_installed";
					$db_state = EVENT_ESPRESSO_VERSION;
			}
			update_option(EE_Data_Migration_Manager::current_database_state,$db_state);
		}
		return $db_state;
	}

	/**
	 * Checks if there are any data migration scripts that ought to be run. If found,
	 * returns the instantiated classes. If none are found (ie, they've all already been run
	 * or they don't apply), returns an empty array
	 * @return EE_Data_Migration_Script_Base[]
	 */
	public function check_for_applicable_data_migration_scripts(){
		//get the option describing what options have already run
		$scripts_ran = $this->get_data_migrations_ran();
		//$scripts_ran = array('4.1.0.core'=>array('monkey'=>null));
		$script_class_and_filespaths_available = $this->get_all_data_migration_scripts_available();
		
		$script_classes_that_should_run = array();
		
		$current_database_state = $this->ensure_current_database_state_is_set();
		//determine which have already been run
		
		foreach($script_class_and_filespaths_available as $classname => $filepath){
			$script_converts_to = $this->_migrates_to_version($classname);
			//check if this version script is DONE or not; or if it's never been ran
			if(		! $scripts_ran || 
					! isset($scripts_ran[$script_converts_to])){
				//we haven't ran this conversion script before
				//now check if it applies... note that we've added an autoloader for it on get_all_data_migration_scripts_available
				$script = new $classname;
				/* @var $script EE_Data_Migration_Script_base */
				$can_migrate = $script->can_migrate_from_version($current_database_state);
				if($can_migrate){
					$script_classes_that_should_run[$classname] = $script;
				}
			} elseif($scripts_ran[$script_converts_to] instanceof EE_Data_Migration_Script_Base){
				$script = $scripts_ran[$script_converts_to];
				if(in_array($script->get_status(),$this->stati_that_indicate_to_continue_single_migration_script)){
					//this script is already underway... keep going with it
					$script_classes_that_should_run[$classname] = $script;
				}elseif($script->get_status() == self::status_fatal_error){
					throw new EE_Error(sprintf(__("Script %s had a fatal error and cannot be run. You should revert your database", "event_espresso"),$script->pretty_name()));
				}else{
					//it must have a status that indicates it has finished, so we don't want to try and run it again
				}
			}else{
				//it exists but it's not  a proper data migration script
				throw new EE_Error(sprintf(__("%s is not a proper data migration script, but its in your list of data migration scripts that have ran", "event_espresso"),get_class($scripts_ran[$script_converts_to])));
			}
		}
		ksort($script_classes_that_should_run);
		//NOTE: scripts should be listed in alphabetic order... meaning
		//if two scripts apply to 4.1.0, one called 4.1.0.core and another called 4.1.0.groups,
		//4.1.0.core will run first.
		return $script_classes_that_should_run;
	}
	
	/**
	 * Gets the script which is currently being ran, if thereis one.
	 * @return EE_Data_Migration_Script_Base
	 * @throws EE_Error
	 */
	public function get_currently_executing_script(){
		$scripts_ran = $this->get_data_migrations_ran();
		if( ! $scripts_ran ){
			return null;
		}
		//get the LAST one, and see if it's marked for continuing, or just a minor error
		$last_ran_script = end($scripts_ran);
		if( $last_ran_script instanceof EE_Data_Migration_Script_Base ){
			if( in_array($last_ran_script->get_status(),array(self::status_continue,self::status_error))){
				return $last_ran_script;
			}elseif($last_ran_script->get_status() == self::status_fatal_error){
				throw new EE_Error(sprintf(__("Last script ran had a fatal error. You must revert your database to where it was BEFORE the migration", "event_espresso")));
			}else{
				//it must be marked as complete
				return null;
			}
		}else{
			//its not a data migration script class, so it must be a 3.1 legacy array. That's ok
			//but because thsi is 4.0 code we can be pretty certain it's done running
			return null;
		}
		
	}
	
	/**
	 * Runs the data migration scripts (well, each request to this method calls one of the
	 * data migration scripts' migration_step() functions). 
	 * @return array, where the first item is one EE_Data_Migration_Script_Base's stati, and the second
	 * item is a string describing what was done
	 */
	public function migration_step(){
		//first: add all dms scripts to the autoloader
		$this->get_all_data_migration_scripts_available();
		$currently_executing_script = $this->get_currently_executing_script();
		if( ! $currently_executing_script){
			//Find the next script that needs to execute
			$scripts = $this->check_for_applicable_data_migration_scripts();
			if( ! $scripts ){
				//huh, no more scripts to run... apparently we're done!
				//but dont forget to make sure intial data is there
				$this->EE->load_helper('Activation');
				EEH_Activation::initialize_db_content();
				//we should be good to allow them to exit maintenance mode now
				return array(
					'records_to_migrate'=>1,
					'records_migrated'=>1,
					'status'=>self::status_no_more_migration_scripts,  
					'script'=>null,
					'message'=>__("Data Migration Completed Successfully", "event_espresso"));
			}
			$currently_executing_script = array_shift($scripts);
			//and add to the array/wp option showing the scripts ran
			$this->_data_migrations_ran[$this->_migrates_to_version(get_class($currently_executing_script))] = $currently_executing_script;
		}
		$current_script_class = $currently_executing_script;
		$current_script_name = get_class($current_script_class);

		/* @var $current_script_class EE_Data_Migration_Script_Base */
		$current_script_class->migration_step(1);
		switch($current_script_class->get_status()){
			case EE_Data_Migration_Manager::status_continue:
				$response_array = array(
					'records_to_migrate'=>$current_script_class->count_records_to_migrate(),
					'records_migrated'=>$current_script_class->count_records_migrated(),
					'status'=>EE_Data_Migration_Manager::status_continue,
					'message'=>$current_script_class->get_feedback_message(),
					'script'=>$current_script_class->pretty_name());
				break;
			case EE_Data_Migration_Manager::status_completed:
				//ok so THAT script has completed
				$this->_update_current_database_state_to($this->_migrates_to_version($current_script_name, false));
				$response_array =  array(
					'records_to_migrate'=>$current_script_class->count_records_to_migrate(),
					'records_migrated'=>$current_script_class->count_records_to_migrate(),//so we're done, so just assume we've finished ALL records
					'status'=> EE_Data_Migration_Manager::status_completed,
					'message'=>$current_script_class->get_feedback_message(),
					'script'=> $current_script_class->pretty_name()
				);
				break;
			case EE_Data_Migration_Manager::status_error:
			default:
				$response_array = array(
					'records_to_migrate'=>$current_script_class->count_records_to_migrate(),
					'records_migrated'=>$current_script_class->count_records_migrated(),
					'status'=> $current_script_class->get_status(),
					'message'=>  sprintf(__("Minor errors occured during %s: %s", "event_espresso"), $current_script_class->pretty_name(), implode(", ",$current_script_class->get_errors())),
					'script'=>$current_script_class->pretty_name()
				);
				break;
		}
		update_option(self::data_migrations_option_name, $this->_data_migrations_ran);
		return $response_array;
	}
	
	/**
	 * Echo out JSON response to migration script AJAX requests. Takes precautions
	 * to buffer output so that we don't throw junk into our json
	 */
	public function response_to_migration_ajax_request(){
//		//start output buffer just to make sure we don't mess up the json
		ob_start();
		try{
			$response = $this->migration_step();
		}catch(Exception $e){
			$response = array(
				'records_to_migrate'=>0,
				'records_migrated'=>0,
				'status'=> EE_Data_Migration_Manager::status_fatal_error,
				'message'=> sprintf(__("Unknown fatal error occurred: %s", "event_espresso"),$e->getMessage()),
				'script'=>'Unknown');
		}
		$warnings_etc = '';
		$warnings_etc = @ob_get_contents();
		ob_end_clean();
		$response['message'] .=$warnings_etc;
		echo json_encode($response);
		die;
	}
	
	/**
	 * Updates the wordpress option that keeps track of which which EE version the database
	 * is at (ie, the code may be at 4.1.0, but the database is still at 3.1.35)
	 * @param string $version
	 * @return void
	 */
	private function _update_current_database_state_to($version = null){
		if( ! $version ){
			//no version was provided, assume it should be at the current code version
			$version = espresso_version();
		}
		update_option(self::current_database_state,$version);
	}
	
	/**
	 * Gets all the data mgiration scripts available in the core folder and folders
	 * in addons. Has teh side effect of adding them for autoloading
	 * @return array keys are expected classnames, values are their filepaths
	 */
	public function get_all_data_migration_scripts_available(){
		if( ! $this->_data_migration_class_to_filepath_map){
			$this->_data_migration_class_to_filepath_map = array();
			foreach($this->get_data_migration_script_folders() as $folder_path){
				if($folder_path[count($folder_path-1)] != DS ){
					$folder_path.= DS;
				}
				$files = glob($folder_path."*.dms.php");
				foreach($files as $file){
					$pos_of_last_slash = strrpos($file,DS);
					$classname = str_replace(".dms.php","", substr($file, $pos_of_last_slash+1));
					$this->_data_migration_class_to_filepath_map[$classname] = $file;
				}

			}
			$this->EE->register_autoloader($this->_data_migration_class_to_filepath_map);
		}
		return $this->_data_migration_class_to_filepath_map;
	}
	
	/**
     * 	@var EE_Data_Migration_Manager $_instance
	 * 	@access 	private 	
     */
	private static $_instance = NULL;
	
	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Data_Migratino_Manager instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Data_Migration_Manager )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}	
}