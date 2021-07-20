<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_DMS_New_Addon_0_0_1
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_DMS_New_Addon_1_0_0 extends EE_Data_Migration_Script_Base{

	public function __construct() {
		$this->_pretty_name = esc_html__("Data Migration to New Addon 0.0.2", "event_espresso");
		$this->_migration_stages = array(
			/*
			 * add children of EE_Data_Migration_Script_Stage or EE_Data_Migration_Script_Stage_Table
			 * it's easiest to add these classes onto this same file, or use EEH_Autoloader to autoload them
			 * BEFORE declaring this class' name (because on some requests only THIS file is auto-loaded
			 * and the class is unserialized from the DB- ie used but NOT constructed)
			 */
		);
		parent::__construct();
	}
	/**
	 * Indicates whether or not this data migration script should migrate data or not
	 * @param array $current_database_state_of keys are EE plugin slugs like
	 *				'Core', 'Calendar', 'Mailchimp',etc, Your addon's slug can be retrieved
	 *				using $this->slug(). Your addon's entry database state is located
	 *				at $current_database_state_of[ $this->slug() ] if it was previously
	 *				intalled; if it wasn't previously installed its NOT in the array
	 * @return boolean
	 */
	public function can_migrate_from_version($current_database_state_of) {
		/* NOTE: if this is your addon's only DMS and your addon will NOT be migrating data from pre-event-espresso-4,
		 * then this should just return FALSE. Eg, if there is NO EQUIVALENT EE3 addon,
		 * then return FALSE. If there was, and this DMS will be migrating data from it,
		 * then we should return TRUE if we know the old data exists in this system, otherwise FALSE.
		 */
		if( isset( $current_database_state_of[ $this->slug() ] ) ) {
			if( version_compare( '1.0.0.dev.000', $current_database_state_of[ $this->slug() ], '>')) {
				//db state is old. this applies
				return TRUE;
			} else {
				//db state is at 1.0.0.dev.000 or higher. this doesnt apply
				return FALSE;

			}
		} else {
			/* apparently this EE4 addon was never installed previously.
			 * If there was an EE3 equivalent, you could use \EventEspresso\core\services\database\TableAnalysis::tableExists(),
			 * and EE_Data_Migration_Manager::get_migration_ran() to see if the old
			 * EE3 tables exist and if the core DMS migrated core data from EE3.
			 * If so, you probably want to migrate (return TRUE).
			 * If there was NO EE3 equivalent addon, return FALSE (indicating you don't want
			 * to migrate. Normal activation processes will take care of calling the most
			 * up-to-date DMS's schema_changes_before_migration() and schema_changes_after_migration()
			 * for your addon to setup your database.)
			 */
			return FALSE;
		}
	}

	public function schema_changes_after_migration() {

	}

	public function schema_changes_before_migration() {
		$this->_table_is_new_in_this_version('esp_new_addon_thing', '
			NEW_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			NEW_name VARCHAR(10) NOT NULL,
			NEW_wp_user bigint unsigned NOT NULL,
			PRIMARY KEY  (NEW_ID)'
				);
		$this->_table_is_new_in_this_version('esp_new_addon_attendee_meta', '
			NATT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			ATT_ID int(10) unsigned NOT NULL,
			ATT_foobar int(10) unsigned NOT NULL,
			PRIMARY KEY  (NATT_ID)'
				);
	}
}

// End of file EE_DMS_New_Addon_0_0_1.dms.php