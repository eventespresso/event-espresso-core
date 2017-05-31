<?php
use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;

if ( ! defined( 'EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 * Class EE_Data_Migration_Script_Base
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since                4.0
 *
 */
abstract class EE_Data_Migration_Script_Base extends EE_Data_Migration_Class_Base {

	/**
	 * Set by client code to indicate this DMS is being ran as part of a proper migration,
	 * instead of being used to merely setup (or verify) the database structure.
	 * Defaults to TRUE, so client code that's NOT using this DMS as part of a proper migration
	 * should call EE_Data_Migration_Script_Base::set_migrating( FALSE )
	 * @var boolean
	 */
	protected $_migrating = TRUE;

	/**
	 * numerically-indexed array where each value is EE_Data_Migration_Script_Stage object
	 * @var EE_Data_Migration_Script_Stage[] $migration_functions
	 */
	protected $_migration_stages = array();

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
	 * Indicates the script's priority. Like wp's add_action and add_filter, lower numbers
	 * correspond to earlier execution
	 * @var int
	 */
	protected $_priority = 5;

	/**
	 * Multi-dimensional array that defines the mapping from OLD table Primary Keys
	 * to NEW table Primary Keys.
	 * Top-level array keys are OLD table names (minus the "wp_" part),
	 * 2nd-level array keys are NEW table names (again, minus the "wp_" part),
	 * 3rd-level array keys are the OLD table primary keys
	 * and 3rd-level array values are the NEW table primary keys
	 * @var array
	 */
	protected $_mappings = array();



	/**
	 * Returns whether or not this data migration script can operate on the given version of the database.
	 * Eg, if this migration script can migrate from 3.1.26 or higher (but not anything after 4.0.0), and
	 * it's passed a string like '3.1.38B', it should return true.
	 * If this DMS is to migrate data from an EE3 addon, you will probably want to use
	 * EventEspresso\core\services\database\TableAnalysis::tableExists() to check for old EE3 tables, and
	 * EE_Data_Migration_Manager::get_migration_ran() to check that core was already
	 * migrated from EE3 to EE4 (ie, this DMS probably relies on some migration data generated
	 * during the Core 4.1.0 DMS. If core didn't run that DMS, you probably don't want
	 * to run this DMS).
	 * If this DMS migrates data from a previous version of this EE4 addon, just
	 * comparing $current_database_state_of[ $this->slug() ] will probably suffice.
	 * If this DMS should never migrate data, because it's only used to define the initial
	 * database state, just return FALSE (and core's activation process will take care
	 * of calling its schema_changes_before_migration() and
	 * schema_changes_after_migration() for you. )
	 *
	 * @param array $current_database_state_of keys are EE plugin slugs (eg 'Core', 'Calendar', 'Mailchimp', etc)
	 * @return boolean
	 */
	abstract public function  can_migrate_from_version($current_database_state_of);



	/**
	 * Performs database schema changes that need to occur BEFORE the data is migrated.
	 * Eg, if we were going to change user passwords from plaintext to encoded versions
	 * during this migration, this would probably add a new column called something like
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
	 * All children of this must call parent::__construct()
	 * at the end of their constructor or suffer the consequences!
	 *
	 * @param TableManager  $table_manager
	 * @param TableAnalysis $table_analysis
	 */
	public function __construct( TableManager $table_manager = null, TableAnalysis $table_analysis = null ) {
		$this->_migration_stages = (array) apply_filters('FHEE__'.get_class($this).'__construct__migration_stages',$this->_migration_stages);
		foreach($this->_migration_stages as $migration_stage){
			if ( $migration_stage instanceof EE_Data_Migration_Script_Stage ) {
				$migration_stage->_construct_finalize($this);
			}
		}
		parent::__construct( $table_manager, $table_analysis );
	}



	/**
	 * Place to add hooks and filters for tweaking the migrations page, in order
	 * to customize it
	 */
	public function migration_page_hooks(){
		//by default none are added because we normally like the default look of the migration page
	}



	/**
	 * Sets the mapping from old table primary keys to new table primary keys.
	 * This mapping is automatically persisted as a property on the migration
	 * @param string $old_table with wpdb prefix (wp_). Eg: wp_events_detail
	 * @param int|string $old_pk old primary key. Eg events_detail.id's value
	 * @param string $new_table with wpdb prefix (wp_). Eg: wp_posts
	 * @param int|string $new_pk eg posts.ID
	 * @return void
	 */
	public function set_mapping($old_table,$old_pk,$new_table,$new_pk){
		//make sure it has the needed keys
		if( ! isset($this->_mappings[$old_table]) || ! isset($this->_mappings[$old_table][$new_table])){
			$this->_mappings[$old_table][$new_table] = $this->_get_mapping_option($old_table, $new_table);
		}
		$this->_mappings[$old_table][$new_table][$old_pk] = $new_pk;
	}



	/**
	 * Gets the new primary key, if provided with the OLD table and the primary key
	 * of an item in the old table, and the new table
	 * @param string $old_table with wpdb prefix (wp_). Eg: wp_events_detail
	 * @param int|string $old_pk old primary key. Eg events_detail.id's value
	 * @param string $new_table with wpdb prefix (wp_). Eg: wp_posts
	 * @return mixed the primary key on the new table
	 */
	public function get_mapping_new_pk($old_table,$old_pk,$new_table){
		if( ! isset($this->_mappings[$old_table]) ||
			! isset($this->_mappings[$old_table][$new_table])){
			//try fetching the option
			$this->_mappings[$old_table][$new_table] = $this->_get_mapping_option($old_table, $new_table);
		}
		return isset($this->_mappings[$old_table][$new_table][$old_pk]) ? $this->_mappings[$old_table][$new_table][$old_pk] : null;
	}



	/**
	 * Gets the old primary key, if provided with the OLD table,
	 * and the new table and the primary key of an item in the new table
	 * @param string $old_table with wpdb prefix (wp_). Eg: wp_events_detail
	 * @param string $new_table with wpdb prefix (wp_). Eg: wp_posts
	 * @param mixed $new_pk
	 * @return mixed
	 */
	public function get_mapping_old_pk($old_table,$new_table,$new_pk){
		if( ! isset($this->_mappings[$old_table]) ||
			! isset($this->_mappings[$old_table][$new_table])){
			//try fetching the option
			$this->_mappings[$old_table][$new_table] = $this->_get_mapping_option($old_table, $new_table);
		}
		if(isset($this->_mappings[$old_table][$new_table])){
			$new_pk_to_old_pk = array_flip($this->_mappings[$old_table][$new_table]);
			if(isset($new_pk_to_old_pk[$new_pk])){
				return $new_pk_to_old_pk[$new_pk];
			}
		}
		return null;
	}



	/**
	 * Gets the mapping array option specified by the table names
	 * @param string $old_table_name
	 * @param string $new_table_name
	 * @return array
	 */
	protected function _get_mapping_option($old_table_name,$new_table_name){
		$option =  get_option($this->_get_mapping_option_name($old_table_name, $new_table_name),array());
		return $option;
	}



	/**
	 * Updates the mapping option specified by the table names with the array provided
	 * @param string $old_table_name
	 * @param string $new_table_name
	 * @param array $mapping_array
	 * @return boolean success of updating option
	 */
	protected function _set_mapping_option($old_table_name,$new_table_name,$mapping_array){
//		echo "set mapping for $old_table_name $new_table_name".count($mapping_array)."<br>";
		$success =  update_option($this->_get_mapping_option_name($old_table_name, $new_table_name),$mapping_array);
		return $success;
	}



	/**
	 * Gets the option name for this script to map from $old_table_name to $new_table_name
	 * @param string $old_table_name
	 * @param string $new_table_name
	 * @return string
	 */
	protected function _get_mapping_option_name($old_table_name,$new_table_name){
		global $wpdb;
		$old_table_name_sans_wp = str_replace($wpdb->prefix,"",$old_table_name);
		$new_table_name_sans_wp = str_replace($wpdb->prefix,"",$new_table_name);
		$migrates_to = EE_Data_Migration_Manager::instance()->script_migrates_to_version(get_class($this));
		return substr( EE_Data_Migration_Manager::data_migration_script_mapping_option_prefix . $migrates_to [ 'slug' ] . '_' . $migrates_to[ 'version' ] . '_' . $old_table_name_sans_wp . '_' . $new_table_name_sans_wp, 0, 64 );
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



	/**
	 * @param int $num_records_to_migrate_limit
	 * @return int
	 * @throws EE_Error
	 * @throws Exception
	 */
	public function migration_step($num_records_to_migrate_limit){
		//reset the feedback message
		$this->_feedback_message = '';
		//if we haven't yet done the 1st schema changes, do them now. buffer any output
		$this->_maybe_do_schema_changes(true);

		$num_records_actually_migrated =0;
		$records_migrated_per_stage = array();
		//setup the 'stage' variable, which should hold the last run stage of the migration  (or none at all if nothing runs)
		$stage = null;
		//get the next stage that isn't complete
		foreach($this->stages() as $stage){
			if( $stage->get_status() == EE_Data_Migration_Manager::status_continue){
				try{
					$records_migrated_during_stage = $stage->migration_step($num_records_to_migrate_limit - $num_records_actually_migrated);
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
				if($stage->is_broken()){
					$this->set_broken();
					throw new EE_Error($stage->get_last_error());
				}
			}
			//once we've migrated all the number we intended to (possibly from different stages), stop migrating
			//or if we had a fatal error
			//or if the current script stopped early- its not done, but it's done all it thinks we should do on this step
			if ($num_records_actually_migrated >= $num_records_to_migrate_limit || $stage->is_broken() || $stage->has_more_to_do()){
				break;
			}
		}
		//check if we're all done this data migration...
		//which is indicated by being done early AND the last stage claims to be done
		if($stage == NULL){
			//this migration script apparently has NO stages... which is super weird, but whatever
			$this->set_completed();
			$this->_maybe_do_schema_changes(false);
		}else if( $num_records_actually_migrated < $num_records_to_migrate_limit && ! $stage->has_more_to_do()){
			//apparently we're done, because we couldn't migrate the number we intended to
			$this->set_completed();
			$this->_update_feedback_message(array_reverse($records_migrated_per_stage));
			//do schema changes for after the migration now
			//first double-check we haven't already done this
			$this->_maybe_do_schema_changes(false);
		}else{
			//update feedback message, keeping in mind that we show them with the most recent at the top
			$this->_update_feedback_message(array_reverse($records_migrated_per_stage));
		}
		return $num_records_actually_migrated;
	}



	/**
	 * Updates the feedback message according to what was done during this migration stage.
	 * @param array $records_migrated_per_stage KEYS are pretty names for each stage; values are the count of records migrated from that stage
	 * @return void
	 */
	private function _update_feedback_message($records_migrated_per_stage){
		$feedback_message_array = array();
		foreach($records_migrated_per_stage as $migration_stage_name => $num_records_migrated){
			$feedback_message_array[] = sprintf(__("Migrated %d records successfully during %s", "event_espresso"),$num_records_migrated,$migration_stage_name) ;
		}
		$this->_feedback_message .= implode("<br>",$feedback_message_array);
	}



	/**
	 * Calls either schema_changes_before_migration() (if $before==true) or schema_changes_after_migration
	 * (if $before==false). Buffers their outputs and stores them on the class.
	 * @param boolean $before
	 * @throws Exception
	 * @return void
	 */
	private function _maybe_do_schema_changes($before = true){
		//so this property will be either _schema_changes_after_migration_ran or _schema_changes_before_migration_ran
		$property_name = '_schema_changes_'. ($before ? 'before' : 'after').'_migration_ran';
		if ( ! $this->{$property_name} ){
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
				$this->set_status(EE_Data_Migration_Manager::status_fatal_error);
				throw $e;
			}
			//record that we've done these schema changes
			$this->{$property_name} = true;
			//if there were any warnings etc, record them as non-fatal errors
			if( $output ){
				//there were some warnings
				$this->_errors[] = $output;
			}
		}
	}



	/**
	 * Wrapper for EEH_Activation::create_table. However, takes into account the request type when
	 * deciding what to pass for its 4th arg, $drop_pre_existing_tables. Using this function, instead
	 * of _table_should_exist_previously, indicates that this table should be new to the EE version being migrated to or
	 * activated currently. If this is a brand new activation or a migration, and we're indicating this table should not
	 * previously exist, then we want to set $drop_pre_existing_tables to TRUE (ie, we shouldn't discover that this table exists in the
	 * DB in EEH_Activation::create_table- if it DOES exist, something's wrong and the old table should be nuked.
	 *
	 * Just for a bit of context, the migration script's db_schema_changes_* methods
	 * are called basically in 3 cases: on brand new activation of EE4 (ie no previous version of EE existed and the plugin is being activated and we want to add
	 * all the brand new tables), upon reactivation of EE4 (it was deactivated and then reactivated, in which case we want to just verify the DB structure is ok)
	 * that table should be dropped), and during a migration when we're moving the
	 * DB to the state of the migration script
	 *
	 * @param string $table_name
	 * @param string $table_definition_sql
	 * @param string $engine_string
	 */
	protected function _table_is_new_in_this_version($table_name,$table_definition_sql,$engine_string='ENGINE=InnoDB '){
//		EEH_Debug_Tools::instance()->start_timer( '_table_is_new_in_this_version_' . $table_name );
		$this->_create_table_and_catch_errors($table_name, $table_definition_sql, $engine_string, $this->_pre_existing_table_should_be_dropped(  true ) );
//		EEH_Debug_Tools::instance()->stop_timer( '_table_is_new_in_this_version_' . $table_name  );
	}

	/**
	 * Like _table_is_new_in_this_version and _table_should_exist_previously, this function verifies the given table exists.
	 * But we understand that this table has CHANGED in this version since the previous version. So it's not completely new,
	 * but it's different. So we need to treat it like a new table in terms of verifying it's schema is correct on
	 * activations, migrations, upgrades; but if it exists when it shouldn't, we need to be as lenient as _table_should_exist_previously.
	 * 8656]{Assumes only this plugin could have added this table (ie, if its a new activation of this plugin, the table shouldn't exist).
	 * @param string $table_name
	 * @param string $table_definition_sql
	 * @param string $engine_string
	 */
	protected function _table_is_changed_in_this_version($table_name,$table_definition_sql,$engine_string = 'ENGINE=MyISAM'){
//		EEH_Debug_Tools::instance()->start_timer( '_table_is_changed_in_this_version' . $table_name );
		$this->_create_table_and_catch_errors($table_name, $table_definition_sql, $engine_string, $this->_pre_existing_table_should_be_dropped(  false ) );
//		EEH_Debug_Tools::instance()->stop_timer( '_table_is_changed_in_this_version' . $table_name  );
	}


	/**
	 * _old_table_exists
	 * returns TRUE if the requested table exists in the current database
	 * @param string $table_name
	 * @return boolean
	 */
	protected function _old_table_exists( $table_name ) {
		return $this->_get_table_analysis()->tableExists( $table_name );
	}


	/**
	 * _delete_table_if_empty
	 * returns TRUE if the requested table was empty and successfully empty
	 * @param string $table_name
	 * @return boolean
	 */
	protected function _delete_table_if_empty( $table_name ) {
		return EEH_Activation::delete_db_table_if_empty( $table_name );
	}



	/**
	 * It is preferred to use _table_has_not_changed_since_previous or _table_is_changed_in_this_version
	 * as these are significantly more efficient or explicit.
	 * Please see description of _table_is_new_in_this_version. This function will only set
	 * EEH_Activation::create_table's $drop_pre_existing_tables to TRUE if it's a brand
	 * new activation. ie, a more accurate name for this method would be "_table_added_previously_by_this_plugin" because the table will be cleared out if this is a new activation (ie, if its a new activation, it actually should exist previously).
	 * Otherwise, we'll always set $drop_pre_existing_tables to FALSE
	 * because the table should have existed. Note, if the table is being MODIFIED in this
	 * version being activated or migrated to, then you want _table_is_changed_in_this_version NOT this one.
	 * We don't check this table's structure during migrations because apparently it hasn't changed since the previous one, right?
	 * @param string $table_name
	 * @param string $table_definition_sql
	 * @param string $engine_string
	 */
	protected function _table_should_exist_previously($table_name,$table_definition_sql,$engine_string = 'ENGINE=MyISAM'){
//		EEH_Debug_Tools::instance()->start_timer( '_table_should_exist_previously' . $table_name );
		$this->_create_table_and_catch_errors($table_name, $table_definition_sql, $engine_string, $this->_pre_existing_table_should_be_dropped(  false ) );
//		EEH_Debug_Tools::instance()->stop_timer( '_table_should_exist_previously' . $table_name );
	}

	/**
	 * Exactly the same as _table_should_exist_previously(), except if this migration script is currently doing
	 * a migration, we skip checking this table's structure in the database and just assume it's correct.
	 * So this is useful only to improve efficiency when doing migrations (not a big deal for single site installs,
	 * but important for multisite where migrations can take a very long time otherwise).
	 * If the table is known to have changed since previous version, use _table_is_changed_in_this_version().
	 * Assumes only this plugin could have added this table (ie, if its a new activation of this plugin, the table shouldn't exist).
	 * @param string $table_name
	 * @param string $table_definition_sql
	 * @param string $engine_string
	 */
	protected function _table_has_not_changed_since_previous( $table_name,$table_definition_sql,$engine_string = 'ENGINE=MyISAM'){
		if( $this->_currently_migrating() ) {
			//if we're doing a migration, and this table apparently already exists, then we don't need do anything right?
//			EEH_Debug_Tools::instance()->stop_timer( '_table_should_exist_previously' . $table_name );
			return;
		}
		$this->_create_table_and_catch_errors($table_name, $table_definition_sql, $engine_string, $this->_pre_existing_table_should_be_dropped(  false ) );
	}

	/**
	 * Returns whether or not this migration script is being used as part of an actual migration
	 * @return boolean
	 */
	protected function _currently_migrating() {
		//we want to know if we are currently performing a migration. We could just believe what was set on the _migrating property, but let's double-check (ie the script should apply and we should be in MM)
		return $this->_migrating &&
					$this->can_migrate_from_version( EE_Data_Migration_Manager::instance()->ensure_current_database_state_is_set() ) &&
					EE_Maintenance_Mode::instance()->real_level() == EE_Maintenance_Mode::level_2_complete_maintenance;
	}

	/**
	 * Determines if a table should be dropped, based on whether it's reported to be new in $table_is_new,
	 * and the plugin's request type.
	 * Assumes only this plugin could have added the table (ie, if its a new activation of this plugin, the table shouldn't exist no matter what).
	 * @param boolean $table_is_new
	 * @return boolean
	 */
	protected function _pre_existing_table_should_be_dropped( $table_is_new ) {
		if( $table_is_new ) {
			if( $this->_get_req_type_for_plugin_corresponding_to_this_dms() == EE_System::req_type_new_activation  || $this->_currently_migrating() ){
				return true;
			}else{
				return false;
			}
		}else{
			if(in_array($this->_get_req_type_for_plugin_corresponding_to_this_dms(),array(EE_System::req_type_new_activation))){
				return true;
			}else{
				return false;
			}
		}
	}

	/**
	 * Just wraps EEH_Activation::create_table, but catches any errors it may throw and adds them as errors on the DMS
	 * @param string $table_name
	 * @param string $table_definition_sql
	 * @param string $engine_string
	 * @param boolean $drop_pre_existing_tables
	 */
	private function _create_table_and_catch_errors( $table_name, $table_definition_sql, $engine_string = 'ENGINE=MyISAM', $drop_pre_existing_tables = FALSE ){
		try{
			EEH_Activation::create_table($table_name,$table_definition_sql, $engine_string, $drop_pre_existing_tables);
		}catch( EE_Error $e ) {
			$message = $e->getMessage() . '<br>Stack Trace:' . $e->getTraceAsString();
			$this->add_error( $message  );
			$this->_feedback_message .= $message;
		}
	}



	/**
	 * Gets the request type for the plugin (core or addon) that corresponds to this DMS
	 * @return int one of EE_System::_req_type_* constants
	 * @throws EE_Error
	 */
	private function _get_req_type_for_plugin_corresponding_to_this_dms(){
		if($this->slug() == 'Core'){
			return EE_System::instance()->detect_req_type();
		}else{//it must be for an addon
			$addon_name = $this->slug();
			if( EE_Registry::instance()->get_addon_by_name($addon_name)){
				return EE_Registry::instance()->get_addon_by_name($addon_name)->detect_req_type();
			}else{
				throw new EE_Error(sprintf(__("The DMS slug '%s' should correspond to the addon's name, which should also be '%s', but no such addon was registered. These are the registered addons' names: %s", "event_espresso"),$this->slug(),$addon_name,implode(",",array_keys( EE_Registry::instance()->get_addons_by_name() ) ) ) ) ;
			}
		}
	}



	/**
	 * returns an array of strings describing errors by all the script's stages
	 * @return array
	 */
	public function get_errors(){
		$all_errors = $this->_errors;
		if( ! is_array($all_errors)){
			$all_errors = array();
		}
		foreach($this->stages() as $stage){
			$all_errors = array_merge($stage->get_errors(),$all_errors);
		}
		return $all_errors;
	}



	/**
	 * Indicates whether or not this migration script should continue
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
		$stages = apply_filters( 'FHEE__'.get_class($this).'__stages',$this->_migration_stages );
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
		unset($properties['_mappings']);

		foreach($this->_mappings as $old_table_name => $mapping_to_new_table){
			foreach($mapping_to_new_table as $new_table_name => $mapping){
				$this->_set_mapping_option($old_table_name, $new_table_name, $mapping);
			}
		}
		return $properties;
	}



	/**
	 * Sets all of the properties of this script stage to match what's in the array, which is assumed
	 * to have been made from the properties_as_array() function.
	 * @param array $array_of_properties like what's produced from properties_as_array() method
	 * @return void
	 */
	public function instantiate_from_array_of_properties($array_of_properties){
		$stages_properties_arrays = $array_of_properties['_migration_stages'];
		unset($array_of_properties['_migration_stages']);
		unset($array_of_properties['class']);
		foreach($array_of_properties as $property_name => $property_value){
			$this->{$property_name} = $property_value;
		}
		//_migration_stages are already instantiated, but have only default data
		foreach($this->_migration_stages as $stage){
			$stage_data = $this->_find_migration_stage_data_with_classname(get_class($stage),$stages_properties_arrays);
			//SO, if we found the stage data that was saved, use it. Otherwise, I guess the stage is new? (maybe added by
			//an addon? Unlikely... not sure why it wouldn't exist, but if it doesn't just treat it like it was never started yet)
			if($stage_data){
				$stage->instantiate_from_array_of_properties($stage_data);
			}
		}
	}



	/**
	 * Gets the migration data from the array $migration_stage_data_arrays (which is an array of arrays, each of which
	 * is pretty well identical to EE_Data_Migration_Stage objects except all their properties are array indexes)
	 * for the given classname
	 * @param string $classname
	 * @param array $migration_stage_data_arrays
	 * @return null
	 */
	private function _find_migration_stage_data_with_classname($classname,$migration_stage_data_arrays){
		foreach($migration_stage_data_arrays as $migration_stage_data_array){
			if(isset($migration_stage_data_array['class']) && $migration_stage_data_array['class'] == $classname){
				return $migration_stage_data_array;
			}
		}
		return null;
	}



	/**
	 * Returns the version that this script migrates to, based on the script's name.
	 * Cannot be overwritten because lots of code needs to know which version a script
	 * migrates to knowing only its name.
	 * @return array where the first key is the plugin's slug, the 2nd is the version of that plugin
	 * that will be updated to. Eg array('Core','4.1.0')
	 */
	public final function migrates_to_version(){
		return EE_Data_Migration_Manager::instance()->script_migrates_to_version( get_class( $this ) );
	}



	/**
	 * Gets this addon's slug as it would appear in the current_db_state wp option,
	 * and if this migration script is for an addon, it SHOULD match the addon's slug
	 * (and also the addon's classname, minus the 'EE_' prefix.). Eg, 'Calendar' for the EE_Calendar addon.
	 * Or 'Core' for core (non-addon).
	 * @return string
	 */
	public function slug(){
		$migrates_to_version_info = $this->migrates_to_version();
		//the slug is the first part of the array
		return $migrates_to_version_info[ 'slug' ];
	}



	/**
	 * Returns the script's priority relative to DMSs from other addons. However, when
	 * two DMSs from the same addon/core apply, this is ignored (and instead the version that
	 * the script migrates to is used to determine which to run first). The default is 5, but all core DMSs
	 * normally have priority 10. (So if you want a DMS "A" to run before DMS "B", both of which are from addons,
	 * and both of which CAN run at the same time (ie, "B" doesn't depend on "A" to set
	 * the database up so it can run), then you can set "A" to priority 3 or something.
	 * @return int
	 */
	public function priority(){
		return $this->_priority;
	}



	/**
	 * Sets whether or not this DMS is being ran as part of a migration, instead of
	 * just being used to setup (or verify) the current database structure matches
	 * what the latest DMS indicates it should be
	 * @param boolean $migrating
	 * @return void
	 */
	public function set_migrating( $migrating = TRUE ){
		$this->_migrating = $migrating;
	}

	/**
	 * Marks that we think this migration class can continue to migrate
	 */
	public function reattempt(){
		parent::reattempt();
		//also, we want to reattempt any stages that were marked as borked
		foreach( $this->stages() as $stage ) {
			if( $stage->is_broken() ) {
				$stage->reattempt();
			}
		}
	}
}


// end of file: /core/EE_Data_Migration_Script_Base.core.php
