<?php
use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;

if ( ! defined( 'EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 * Class EE_DMS_Unknown_1_0_0
 *
 * This is a stub data migration that we can put in the array of data migrations when we have an error
 * finding the next data migration script.
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since                4.0
 *
 */
/**
 */
class EE_DMS_Unknown_1_0_0 extends EE_Data_Migration_Script_Base{

	/**
	 * Returns whether or not this data migration script can operate on the given version of the database.
	 * Eg, if this migration script can migrate from 3.1.26 or higher (but not anything after 4.0.0), and
	 * it's passed a string like '3.1.38B', it should return true
	 * @param string $version_string
	 * @return boolean
	 */
	public function can_migrate_from_version($version_string) {
		return false;
	}
	public function schema_changes_after_migration() {
		return;
	}
	public function schema_changes_before_migration() {
		return;
	}



	/**
	 * All children of this must call parent::__construct() at the end of their constructor or suffer the consequences!
	 *
	 * @param TableManager  $table_manager
	 * @param TableAnalysis $table_analysis
	 */
	public function __construct( TableManager $table_manager = null, TableAnalysis $table_analysis = null ) {
		$this->_migration_stages = array();
		$this->_pretty_name = __("Fatal Uncatchable Error Occurred", "event_espresso");
//		dd($this);
		parent::__construct( $table_manager, $table_analysis );
	}
	public function migration_page_hooks() {

	}



}
// end of file: /core/EE_DMS_Unknown_1_0_0.core.php