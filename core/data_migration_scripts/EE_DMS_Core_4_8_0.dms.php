<?php
/**
 * meant to convert DBs from 4.6 (OR 4.7, which basically supports MER and wasn't clear if it was
 * going to be released before this version) to 4.8 (which basiclaly supports promotions)
 * mostly just
 * -refacotrs line item trees, so that there are subtotals for EACH event purchased,
 * which is especially convenient for applying event-wide promotions
 * -does NOT actually make any database schema changes
 */
//make sure we have all the stages loaded too
//unfortunately, this needs to be done upon INCLUSION of this file,
//instead of construction, because it only gets constructed on first page load
//(all other times it gets resurrected from a wordpress option)
$stages = glob(EE_CORE.'data_migration_scripts/4_8_0_stages/*');
$class_to_filepath = array();
foreach($stages as $filepath){
	$matches = array();
	preg_match('~4_8_0_stages/(.*).dmsstage.php~',$filepath,$matches);
	$class_to_filepath[$matches[1]] = $filepath;
}
//give addons a chance to autoload their stages too
$class_to_filepath = apply_filters('FHEE__EE_DMS_4_8_0__autoloaded_stages',$class_to_filepath);
EEH_Autoloader::register_autoloader($class_to_filepath);





/**
 * Class EE_DMS_Core_4_8_0
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Mike Nelson
 * @since                4.6.0
 *
 */
class EE_DMS_Core_4_8_0 extends EE_Data_Migration_Script_Base{

	/**
	 * return EE_DMS_Core_4_8_0
	 */
	public function __construct() {
		$this->_pretty_name = __("Data Migration to Event Espresso 4.8.0.P (for promotions)", "event_espresso");
		$this->_priority = 10;
		$this->_migration_stages = array(
			new EE_DMS_4_8_0_pretax_totals(),
			new EE_DMS_4_8_0_event_subtotals(),
		);
		parent::__construct();
	}



	/**
	 * Because this is being done at basically the same time as the MER-ready branch
	 * of core, it's possible people might have installed MEr-ready branch first,
	 * and then this one, in which case we still want to perform this migration,
	 * even though the version might not have increased
	 * @param array $version_array
	 * @return bool
	 */
	public function can_migrate_from_version($version_array) {
		$version_string = $version_array['Core'];
		if( $version_string <= '4.8.0' && $version_string >= '4.6.0' ){
//			echo "$version_string can be migrated from";
			return true;
		}elseif( ! $version_string ){
//			echo "no version string provided: $version_string";
			//no version string provided... this must be pre 4.3
			return false;//changed mind. dont want people thinking they should migrate yet because they cant
		}else{
//			echo "$version_string doesnt apply";
			return false;
		}
	}



	/**
	 * @return string|void
	 */
	public function pretty_name() {
		return __("Core Data Migration to version 4.8.0", "event_espresso");
	}



	/**
	 * @return bool
	 */
	public function schema_changes_before_migration() {
		//the schema is actually the same as the last DMS


		/** @var EE_DMS_Core_4_6_0 $script_4_1_defaults */
		$script_4_6_defaults = EE_Registry::instance()->load_dms('Core_4_6_0');

		//(because many need to convert old string states to foreign keys into the states table)
		return $script_4_6_defaults->schema_changes_before_migration();
	}
	/**
	 * @return boolean
	 */
	public function schema_changes_after_migration() {
		//this is actually the same as the last DMS
		/** @var EE_DMS_Core_4_6_0 $script_4_1_defaults */
		$script_4_6_defaults = EE_Registry::instance()->load_dms('Core_4_6_0');
		return $script_4_6_defaults->schema_changes_after_migration();
	}

	public function migration_page_hooks(){

	}
}










