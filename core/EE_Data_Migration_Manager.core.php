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
 * to indicate it succesfully migrate some data, and has nothing left to do; or EE_Data_Migration_Manager::status_fatal_error to indicate
 * an error occurred which means the ajax script should probably stop executing. 
 */
class EE_Data_Migration_Manager{
	
	/**
	 *
	 * @var EE_Registry
	 */
	//protected $EE;
	/**
	 * name of the wordpress option which stores an array of data about
	 */
	const data_migrations_option_name = 'ee_data_migration';
	
	
	const data_migration_script_option_prefix = 'ee_data_migration_script_';
	
	const data_migration_script_mapping_option_prefix = 'ee_dms_map_';
	
	/**
	 * name of the wordpress option which stores the database' current version. IE, the code may be at version 4.2.0,
	 * but as migrations are performed the database will progress from 3.1.35 to 4.1.0 etc.
	 */
	const current_database_state = 'ee_data_migration_current_db_state';
	
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
	 * string indicating a fatal error occurred and the data migration should be completedly aborted
	 */
	const status_fatal_error = 'status_fatal_error';
	
	/**
	 * the number of 'items' (usually DB rows) to migrate on each 'step' (ajax request sent
	 * during migration)
	 */
	const step_size = 50;
	/**
	 * Array of information concernign data migrations that have ran in the history 
	 * of this EE installation. Keys should be the name of the version the script upgraded to
	 * @var EE_Data_Migration_Script_Base[]
	 */
	private $_data_migrations_ran =null;
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
		
		$this->stati_that_indicate_to_continue_migrations = array(self::status_continue,self::status_completed);
		$this->stati_that_indicate_to_stop_migrations = array(self::status_fatal_error,self::status_no_more_migration_scripts);
		$this->stati_that_indicate_to_continue_single_migration_script = array(self::status_continue);
		$this->stati_that_indicate_to_stop_single_migration_script = array(self::status_completed,self::status_fatal_error);//note: status_no_more_migration_scripts doesn't apply
		//make sure we've included teh base migration script, because we may need the EE_Data_Migration_Script_Error class
		//to be defined, because right now it doesn't get autoloaded on its own
		EE_Registry::instance()->load_core('Data_Migration_Script_Base');
	}
	
	/**
	 * Gets the array describing what data migrations have run
	 * @return EE_Data_Migration_Script_Base[] (but also has a few legacy arrays in there - which should probalby be ignored)
	 */
	public function get_data_migrations_ran(){
		if( ! $this->_data_migrations_ran ){
			//setup autoloaders for each of the scripts in there
			$this->get_all_data_migration_scripts_available();
			$data_migrations_options = $this->get_all_migration_script_options();//get_option(EE_Data_Migration_Manager::data_migrations_option_name,get_option('espresso_data_migrations',array()));
			
			$data_migrations_ran = array();
			//convert into data migration script classes where possible
			foreach($data_migrations_options as $data_migration_option){
				$version_string = str_replace(EE_Data_Migration_Manager::data_migration_script_option_prefix, "", $data_migration_option['option_name']);
				$data_migration_data = maybe_unserialize($data_migration_option['option_value']);
				if(isset($data_migration_data['class']) && class_exists($data_migration_data['class'])){
					$class = new $data_migration_data['class'];
					if($class instanceof EE_Data_Migration_Script_Base){
						$class->instantiate_from_array_of_properties($data_migration_data);
						$data_migrations_ran[$version_string] = $class;
					}else{
						//huh, so its an object but not a data migration script?? that shouldn't happen
						//just leave it as an array (which'll probably just get ignored)
						$data_migrations_ran[$version_string] = $data_migration_data;
					}
				}else{
					//so the data doesn't specify a class. So it must either be a legacy array of info or some array (which we'll probabl yjust ignore)
					$data_migrations_ran[$version_string] = $data_migration_data;
				}
			}
			//so here the array of $data_migrations_ran is actually a mix of classes and a few legacy arrays
			$this->_data_migrations_ran = $data_migrations_ran;
			 if ( ! $this->_data_migrations_ran || ! is_array($this->_data_migrations_ran) ){
				$this->_data_migrations_ran = array();
			}
		}
		return $this->_data_migrations_ran;
	}
	
	/**
	 * Gets all the options containing migration scripts that have been run
	 * @return array
	 */
	 public function get_all_migration_script_options(){
		global $wpdb;
		return $wpdb->get_results("SELECT * FROM {$wpdb->options} WHERE option_name like '".EE_Data_Migration_Manager::data_migration_script_option_prefix."%'",ARRAY_A);
	}
	
	/**
	 * Gets the array of folders which contain data migration scripts. Also adds them to be auto-loaded
	 * @return array where each value is the full folderpath of a folder containing data migration scripts, WITH slashes at the end of the 
	 * folder name.
	 */
	public function get_data_migration_script_folders(){
		return  apply_filters( 'FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders',array(EE_CORE.'data_migration_scripts') );
	}
	
	/**
	 * Gets the version the migration script upgrades to
	 * @param string $migration_script_name eg 'EE_DMS_4_1_0'
	 * @return stringeg 4.1.0P
	 * @throws EE_Error
	 */
	public function script_migrates_to_version($migration_script_name){
		preg_match('~EE_DMS_([0-9]*)_([0-9]*)_(.*)~',$migration_script_name,$matches);
			if( ! $matches || ! (isset($matches[1]) && isset($matches[2]) && isset($matches[3]))){
				throw new EE_Error(sprintf(__("%s is not a valid Data Migration Script. The classname should be like EE_DMS_w_x_y_z, where w x and y are numbers, and z is either 'core' or the slug of an addon", "event_espresso"),$migration_script_name));
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
			$script_converts_to = $this->script_migrates_to_version($classname);
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
				if( $script->get_status() != self::status_completed){
					//this script is already underway... keep going with it
					$script_classes_that_should_run[$classname] = $script;
				}else{
					//it must have a status that indicates it has finished, so we don't want to try and run it again
				}
			}else{
				//it exists but it's not  a proper data migration script
				throw new EE_Error(sprintf(__("%s is not a proper data migration script, but its in your list of data migration scripts that have ran", "event_espresso"),get_class($scripts_ran[$script_converts_to])));
			}
		}
		ksort($script_classes_that_should_run);
		return $script_classes_that_should_run;
	}
	
	/**
	 * Gets the script which is currently being ran, if thereis one. If $include_completed_scripts is set to TRUE
	 * it will return the last ran script even if its complete
	 * @return EE_Data_Migration_Script_Base
	 * @throws EE_Error
	 */
	public function get_last_ran_script($include_completed_scripts = false){
		//make sure data migration script classes have autoloaders
		$scripts_ran = $this->get_data_migrations_ran();
		if( ! $scripts_ran ){
			return null;
		}
		//get the LAST one, and see if it's marked for continuing
		$last_ran_script = end($scripts_ran);
		if( $last_ran_script instanceof EE_Data_Migration_Script_Base ){
			if($include_completed_scripts){
				return $last_ran_script;
			}else{
				//in this case, we only want to show a script that isn't complete
				if( $last_ran_script->get_status() != self::status_completed){
					return $last_ran_script;
				}else{
					return null;
				}
			}
		}else{
			//its not a data migration script class, so it must be a 3.1 legacy array. That's ok
			//but because thsi is 4.0 code we can be pretty certain it's done running
			//(and we don't know how to run it anyways)
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
		try{
			$currently_executing_script = $this->get_last_ran_script();

			if( ! $currently_executing_script){
				//Find the next script that needs to execute
				$scripts = $this->check_for_applicable_data_migration_scripts();
				if( ! $scripts ){
					//huh, no more scripts to run... apparently we're done!
					//but dont forget to make sure intial data is there
					EE_Registry::instance()->load_helper('Activation');
					//we should be good to allow them to exit maintenance mode now
					EE_Maintenance_Mode::instance()->set_maintenance_level(intval(EE_Maintenance_Mode::level_0_not_in_maintenance));
					EEH_Activation::initialize_db_content();
					//make sure the datetime and ticket total sold are correct
					$this->_save_migrations_ran();
					return array(
						'records_to_migrate'=>1,
						'records_migrated'=>1,
						'status'=>self::status_no_more_migration_scripts,  
						'script'=>__("Data Migration Completed Successfully", "event_espresso"),
						'message'=>  __("All done!", "event_espresso"));
				}
				$currently_executing_script = array_shift($scripts);
				//and add to the array/wp option showing the scripts ran
				$this->_data_migrations_ran[$this->script_migrates_to_version(get_class($currently_executing_script))] = $currently_executing_script;
			}
			$current_script_class = $currently_executing_script;
			$current_script_name = get_class($current_script_class);
		}catch(Exception $e){
			//an exception occurred while trying to get migration scripts
			
			$message =  sprintf(__("Error Message: %s<br>Stack Trace:%s", "event_espresso"),$e->getMessage(),$e->getTraceAsString());
			//record it on the array of data mgiration scripts ran. This will be overwritten next time we try and try to run data migrations
			//but thats ok-- it's just an FYI to support that we coudln't even run any data migrations
			$this->add_error_to_migrations_ran(sprintf(__("Could not run data migrations because: %s", "event_espresso"),$message));
			return array(
				'records_to_migrate'=>1,
				'records_migrated'=>0,
				'status'=>self::status_fatal_error,
				'script'=>  __("Error loading data migration scripts", "event_espresso"),
				'message'=> $message
			);
		}
		//ok so we definitely have a data migration script
		try{
			//how big of a bite do we want to take? Allow users to easily override via their wp-config
			$step_size = defined('EE_MIGRATION_STEP_SIZE') ? EE_MIGRATION_STEP_SIZE : EE_Data_Migration_Manager::step_size;
			//do what we came to do!
			$current_script_class->migration_step($step_size);
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
					$this->update_current_database_state_to($this->script_migrates_to_version($current_script_name, false));
					$respons_update_current_database_state_toe_array =  array(
							'records_to_migrate'=>$current_script_class->count_records_to_migrate(),
							'records_migrated'=>$current_script_class->count_records_migrated(),
							'status'=> EE_Data_Migration_Manager::status_completed,
							'message'=>$current_script_class->get_feedback_message(),
							'script'=> sprintf(__("%s Completed",'event_espresso'),$current_script_class->pretty_name())
						);
					//check if there are any more after this one. 
					$scripts_remaining = $this->check_for_applicable_data_migration_scripts();
					if( ! $scripts_remaining ){
						//we should be good to allow them to exit maintenance mode now
						EE_Maintenance_Mode::instance()->set_maintenance_level(intval(EE_Maintenance_Mode::level_0_not_in_maintenance));
						////huh, no more scripts to run... apparently we're done!
						//but dont forget to make sure intial data is there
						EE_Registry::instance()->load_helper('Activation');
						EEH_Activation::initialize_db_content();
						$response_array['status'] = self::status_no_more_migration_scripts;
					}
					break;
				default:
					$response_array = array(
						'records_to_migrate'=>$current_script_class->count_records_to_migrate(),
						'records_migrated'=>$current_script_class->count_records_migrated(),
						'status'=> $current_script_class->get_status(),
						'message'=>  sprintf(__("Minor errors occurred during %s: %s", "event_espresso"), $current_script_class->pretty_name(), implode(", ",$current_script_class->get_errors())),
						'script'=>$current_script_class->pretty_name()
					);
					break;
			}
		}catch(Exception $e){
			//ok so some exception was thrown which killed the data migration script
			//double-check we have a real script
			if($current_script_class instanceof EE_Data_Migration_Script_Base){
				$script_name = $current_script_class->pretty_name();
				$current_script_class->set_borked();
				$current_script_class->add_error($e->getMessage());
			}else{
				$script_name = __("Error getting Migration Script", "event_espresso");
			}
			$response_array = array(
				'records_to_migrate'=>1,
				'records_migrated'=>0,
				'status'=>self::status_fatal_error,
				'message'=>  sprintf(__("A fatal error occurred during the migration: %s", "event_espresso"),$e->getMessage()),
				'script'=>$script_name
			);
		}
		$succesful_save = $this->_save_migrations_ran();
		if($succesful_save !== TRUE){
			//ok so teh current wp option didn't save. that's tricky, because we'd like to update it
			//and mark it as having a fatal error, but remember- WE CAN'T SAVE THIS WP OPTION!
			//however, if we throw an exception, and return that, then the next request
			//won't have as much info in it, and it may be able to save
			throw new EE_Error(sprintf(__("The error '%s' occurred updating the status of the migration. This is a FATAL ERROR, but the error is preventing the system from remembering that. Please contact event espresso support.", "event_espresso"),$succesful_save));
		}
		return $response_array;
	}
	
	/**
	 * Echo out JSON response to migration script AJAX requests. Takes precautions
	 * to buffer output so that we don't throw junk into our json.
	 * @return array with keys:
	 * 'records_to_migrate' which counts ALL the records for the current migration, and should remain constant. (ie, it's NOT the count of hwo many remain)
	 * 'records_migrated' which also coutns ALL the records which have been migrated (ie, percent_complete = records_migrated/records_to_migrate)
	 * 'status'=>a string, one of EE_Data_migratino_Manager::status_*
	 * 'message'=>a string, containing any message you want to show to the user. We may decide to split this up into errors, notifications, and successes
	 * 'script'=>a pretty name of the script currently running
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
			$this->add_error_to_migrations_ran($e->getMessage."; Stack trace:".$e->getTraceAsString());
		}
		$warnings_etc = '';
		$warnings_etc = @ob_get_contents();
		ob_end_clean();
		$response['message'] .=$warnings_etc;
		return $response;
	}
	
	/**
	 * Updates the wordpress option that keeps track of which which EE version the database
	 * is at (ie, the code may be at 4.1.0, but the database is still at 3.1.35)
	 * @param string $version
	 * @return void
	 */
	public function update_current_database_state_to($version = null){
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
			EEH_Autoloader::register_autoloader($this->_data_migration_class_to_filepath_map);
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
	
	/**
	 * Once we have an addon that works with EE4.1, we will actually want to fetch the PUE slugs
	 * from each addon, and check if they need updating,
	 * @return boolean
	 */
	public function addons_need_updating(){
		return false;
	}
	/**
	 * Adds this error string to the data_migrations_ran array, but we dont necessarily know
	 * where to put it, so we just throw it in there... better than nothing...
	 * @param type $error_message
	 * @throws EE_Error
	 */
	public function add_error_to_migrations_ran($error_message){
		//get last-ran migraiton script
		global $wpdb;
		$last_migration_script_option = $wpdb->get_row("SELECT * FROM ".$wpdb->options." WHERE option_name like '".EE_Data_Migration_Manager::data_migration_script_option_prefix."%' ORDER BY option_id DESC LIMIT 1",ARRAY_A);
		
		$last_ran_migration_script_properties = isset($last_migration_script_option['option_value']) ? maybe_unserialize($last_migration_script_option['option_value']) : null;
		//now, tread lightly because we're here because a FATAL non-catchable error
		//was thrown last time when we were tryign to run a data migration script
		//so the fatal error could have happened while getting the mgiration script
		//or doing running it...
		$versions_migrated_to = isset($last_migration_script_option['option_name']) ? str_replace(EE_Data_Migration_Manager::data_migration_script_option_prefix,"",$last_migration_script_option['option_name']) : null;
		
		//check if it THINKS its a data migration script
		if(isset($last_ran_migration_script_properties['class'])){
			//ok then just add this error to its list of errors
			$last_ran_migration_script_properties['_errors'] = $error_message;
			$last_ran_migration_script_properties['_status'] = self::status_fatal_error;
		}else{
			//so we don't even know which script was last running
			//use the data migration error stub, which is designed specifically for this type of thing
			//require the migration script base class file, which also has teh error class

			$general_migration_error = new EE_Data_Migration_Script_Error();
			$general_migration_error->add_error($error_message);
			$general_migration_error->set_borked();
			$last_ran_migration_script_properties = $general_migration_error->properties_as_array();
			$versions_migrated_to = 'Unknown';
		}
		update_option(self::data_migration_script_option_prefix.$versions_migrated_to,$last_ran_migration_script_properties);
		
	}
	/**
	 * saves what data migrations have ran to teh database
	 * @return mixed TRUE if successfully saved migrations ran, string if an error occurred
	 */
	protected function _save_migrations_ran(){
		if($this->_data_migrations_ran == null){
			$this->get_data_migrations_ran();
		}
		//now, we don't want to save actual classes to the DB because that's messy
		$successful_updates = true;
		foreach($this->_data_migrations_ran as $version_string => $array_or_migration_obj){
//			echo "saving migration script to $version_string<br>";
			$old_option_value = get_option(self::data_migration_script_mapping_option_prefix.$version_string);
			if($array_or_migration_obj instanceof EE_Data_Migration_Script_Base){
				$script_array_for_saving = $array_or_migration_obj->properties_as_array();
				if( $old_option_value != $script_array_for_saving){
					$successful_updates = update_option(self::data_migration_script_option_prefix.$version_string,$script_array_for_saving);
				}
			}else{
//				$array_of_migrations[$version_string] = $array_or_migration_obj;
				if($old_option_value != $array_or_migration_obj){
					$successful_updates = update_option(self::data_migration_script_option_prefix.$version_string,$array_or_migration_obj);
				}
			}
//			if( ! $successful_updates ){
//					global $wpdb;
//				return $wpdb->last_error;
//			}
		}	
		return true;
//		$updated = update_option(self::data_migrations_option_name, $array_of_migrations);
//		if( $updated !== TRUE){
//			global $wpdb;
//			return $wpdb->last_error;
//		}else{
//			return TRUE;
//		}
//				wp_mail("michael@eventespresso.com", time()." price debug info", "updated: $updated, last error: $last_error, byte length of option: ".strlen(serialize($array_of_migrations)));
	}
	
	/**
	 * Takes an array of data migration script properties and re-creates the class from
	 * them. The argumetn $propertis_array is assumed to have been made by EE_Data_MIgration_Script_Base::properties_as_array()
	 * @param array $properties_array
	 * @return EE_Data_Migration_Script_Base
	 * @throws EE_Error
	 */
	function _instantiate_script_from_properties_array($properties_array){
		if( ! isset($properties_array['class'])){
			throw new EE_Error(sprintf(__("Properties array  has no 'class' properties. Here's what it has: %s", "event_espresso"),implode(",",$properties_array)));
		}
		$class_name = $properties_array['class'];
		if( ! class_exists($class_name)){
			throw new EE_Error(sprintf(__("There is no migration script named %s", "event_espresso"),$class_name));
		}
		$class = new $class_name;
		if( ! $class instanceof EE_Data_Migration_Script_Base){
			throw new EE_Error(sprintf(__("Class '%s' is supposed to be a migration script. Its not, its a '%s'", "event_espresso"),$class_name,get_class($class)));
		}
		$class->instantiate_from_array_of_properties($properties_array);
		return $class;
	}
}
