<?php
/**
 * Special DMS which is meant to generally not run. Usually just the 4.8.0 DMS does everything
 * needed. But some users upgraded to 4.8.0 BEFORE the email system question stage was added:
 * so they've ran the 4.8.0 DMS but their email question still isn't updated.
 * So this DMS mostly just checks for evidence that the email system question stage was ran
 * and if not, this it applies. Otherwise it shouldn't really ever run.
 */
//we actually use teh 4.8.0's stages too eh
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
 * Class EE_DMS_Core_4_8_1
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Mike Nelson
 * @since                4.6.0
 *
 */
class EE_DMS_Core_4_8_1 extends EE_Data_Migration_Script_Base{

	/**
	 * return EE_DMS_Core_4_8_1
	 */
	public function __construct() {
		$this->_pretty_name = __("Data Migration to Event Espresso 4.8.1.P (for those who upgraded to 4.8.0 when it was in beta)", "event_espresso");
		$this->_priority = 10;
		$this->_migration_stages = array(
			new EE_DMS_4_8_0_Email_System_Question(),
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
		global $wpdb;
		$email_question_type = $wpdb->get_var( "SELECT QST_type FROM {$wpdb->prefix}esp_question WHERE QST_system = 'email' LIMIT 1" );
		if( version_compare( $version_string, '4.8.1', '<=') && version_compare( $version_string, '4.8.0', '>=' ) && $email_question_type === 'TEXT' ){
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
		return __("Core Data Migration to version 4.8.1 (for those who started using 4.8.0 while it was in beta)", "event_espresso");
	}



	/**
	 * @return bool
	 */
	public function schema_changes_before_migration() {
		//the schema is actually the same as the last DMS
		/** @var EE_DMS_Core_4_7_0 $script_4_7_defaults */
		$script_4_8_defaults = EE_Registry::instance()->load_dms('Core_4_8_0');
		//(because many need to convert old string states to foreign keys into the states table)
		return $script_4_8_defaults->schema_changes_before_migration();
	}
	/**
	 * @return boolean
	 */
	public function schema_changes_after_migration() {
		//this is actually the same as the last DMS
		/** @var EE_DMS_Core_4_7_0 $script_4_7_defaults */
		$script_4_8_defaults = EE_Registry::instance()->load_dms('Core_4_8_0');
		return $script_4_8_defaults->schema_changes_after_migration();
	}

	public function migration_page_hooks(){

	}
}










