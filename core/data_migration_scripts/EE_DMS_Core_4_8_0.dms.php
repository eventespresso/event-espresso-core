<?php
/**
 * meant to convert DBs between 4.6 and 4.6
 * mostly just
 * -move payment methods from EE_Config into a separate table just for them
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
		$this->_pretty_name = __("Data Migration to Event Espresso 4.6.0.P", "event_espresso");
		$this->_priority = 10;
		$this->_migration_stages = array(
			new EE_DMS_4_8_0_pretax_totals()
//			new EE_DMS_4_8_0_gateways(),
//			new EE_DMS_4_8_0_payment_method_currencies(),
//			new EE_DMS_4_8_0_question_types(),
//			new EE_DMS_4_8_0_country_system_question(),
//			new EE_DMS_4_8_0_state_system_question(),
//			new EE_DMS_4_8_0_billing_info(),
//			new EE_DMS_4_8_0_transactions(),
//			new EE_DMS_4_8_0_payments(),
//			new EE_DMS_4_8_0_invoice_settings()
		);
		parent::__construct();
	}



	/**
	 * @param array $version_array
	 * @return bool
	 */
	public function can_migrate_from_version($version_array) {
		$version_string = $version_array['Core'];
		if($version_string <= '4.8.0' && $version_string >= '4.6.0' ){
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










