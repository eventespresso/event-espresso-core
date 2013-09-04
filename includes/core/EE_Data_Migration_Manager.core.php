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
 * over to the new database structure, and returns either: EE_Data_Migration_Script_Base::status_continue to indicate that
 * it's successfully migrated some data, but has more to do on the subsequent ajax request;  EE_Data_migration_Script_Base::status_completed
 * to indicate it succesfully migrate some data, and has nothing left to do; or EE_Data_Migration_Script_base::status_error to indicate
 * an error occured which means the ajax script should probably stop executing. 
 */
class EE_Data_Migration_Manager{
	
	
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
	 * Array of information concernign data migrations that have ran in the history 
	 * of this EE installation. 
	 * Top-level array keys are core version numbers (eg '4.1.0'),and possibly
	 * have a dash-with-an-addon-slug (eg '4.1.0-groups'),
	 * next-level down is an array with keys being function names that get run
	 * (in 4.1+ these should all be data_migration_step()), with keys being errors that
	 * occured when running that function, or a string descibing an error that occured
	 * which interupted the data migration. 
	 * @var array Eg 
	 *	array(
	 *		'3.1.36'=>array(
	 *			'some_random_function'=>NULL,
	 *		),
	 *		'4.1.0'=>array(
	 *			'migration_step'=>NULL
	 *			
	 *		),
	 *		'4.1.0-Core'=array(
	 *			'groups'=>'Couldnt find column GRP_ID and died'
	 *		)
	 *	)
	 */
	private $_data_migrations_ran;
	/**
	 * Gets the array describing what data migrations have run
	 * @return array like array(
	 *		'3.1.36'=>array(
	 *			'some_random_function'=>NULL,
	 *			'some_other_function'=>NULL,
	 *		),
	 *		'4.1.0'=>array(
	 *			'migration_step'=>NULL
	 *			
	 *		),
	 *		'4.1.0-Core'=array(
	 *			'groups'=>'Couldnt find column GRP_ID and died'
	 *		)
	 *	)
	 */
	public function get_data_migrations_ran(){
		return $this->_data_migrations_ran;
	}
	
	/**
	 * Gets the array of folders which contain data migration scripts
	 * @return array where each value is the full folderpath of a folder containing data migration scripts, WITH slashes at the end of the 
	 * folder name.
	 */
	public function get_data_migration_script_folders(){
		return apply_filters('FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders',array(EE_CORE.'data_migration_scripts'));
	}
	
	/**
	 * Checks if there are any data migration scripts that ought to be run. If found,
	 * returns the instantiated class. If none are found (ie, they've all already been run
	 * or they don't apply), returns null
	 * @return EE_Data_Migration_Script_Base
	 */
	public function check_for_applicable_data_migration_scripts(){
		//get the option describing what options have already run
		$scripts_ran = get_option(EE_Data_Migration_Manager::data_migrations_option_name);
		//$scripts_ran = array('4.1.0.core'=>array('monkey'=>null));
		$script_files_available = $this->get_all_data_migration_scripts_available();
		//determine which have already been run
		foreach($script_files_available as $classname => $filepath){
			preg_match('~EE_DMS_([0-9]*)_([0-9]*)_([0-9]*)_(.*)~',$classname,$matches);
			if( ! $matches || ! (isset($matches[1]) && isset($matches[2]) && isset($matches[3]) && isset($matches[4]))){
				throw new EE_Error(sprintf(__("%s is not a valid Data Migration Script. The classname should be like EE_DMS_w_x_y_z, where w x and y are numbers, and z is either 'core' or the slug of an addon", "event_espresso"),$classname));
			}
			$script_converts_to = $matches[1].".".$matches[2].".".$matches[3].".".$matches[4];
			//check if we've already ran this conversion script
			if( ! isset($scripts_ran[$script_converts_to])){
				//we haven't ran this conversion script before
				//now check if it applies
				require_once($filepath);
				$script = new $classname;
				/* @var $script EE_Data_Migration_Script_base */
				$current_database_state = get_option(self::current_database_state);
				if( ! $current_database_state ){
					//we've never set teh current database state... so this must be a new install!
					//obviously we don't want to run any data migrations on a new installation
					$this->_update_current_database_state_to();
					return NULL;
				}
				$can_migrate = $script->can_migrate_from_version($current_database_state);
				if($can_migrate){
					return $script;
				}
			}else{
				//we've already run it! dont run it again!
			}
		}
		//I guess we didn't find any data migration files that should have run.
		return null;
	}
	
	/**
	 * Runs the data migration scripts (well, each request to this method calls one of the
	 * data migration scripts' migration_step() functions). 
	 * @return array, where the first item is the
	 */
	public function migration_step(){
		//check for the currently executing migration script
		$current_script_name = get_option(self::currently_executing_script_option_name);
		if( ! $current_script_name){
			//no script is currently executing. Find the next one
		}else{
			//we are in the middle of a migration script. Continue rolling with it
		}
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
			preg_match('~([0-9]*)\.([0-9]*)\.([0-9]*)(.*)~', espresso_version(),$matches);
			$version = $matches[1].".".$matches[2].".".$matches[3];
		}
		update_option(self::current_database_state,$version);
	}
	
	/**
	 * Gets all the data mgiration scripts available in the core folder and folders
	 * in addons. 
	 * @return array keys are expected classnames, values are their filepaths
	 */
	public function get_all_data_migration_scripts_available(){
		$data_migration_scripts = array();
		foreach($this->get_data_migration_script_folders() as $folder_path){
			if($folder_path[count($folder_path-1)] != DS ){
				$folder_path.= DS;
			}
			$files = glob($folder_path."*.dms.php");
			foreach($files as $file){
				$pos_of_last_slash = strrpos($file,DS);
				$classname = str_replace(".dms.php","", substr($file, $pos_of_last_slash+1));
				$data_migration_scripts[$classname] = $file;
			}
			
		}
		return $data_migration_scripts;
	}
	
	/**
     * 	@var EE_Data_Migration_Manager $_instance
	 * 	@access 	private 	
     */
	private static $_instance = NULL;
	
	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Registry instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Data_Migration_Manager )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}	
}