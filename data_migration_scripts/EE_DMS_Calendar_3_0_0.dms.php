<?php
/**
 * meant to convert DBs between 4.1.x to 4.2.0
 * mostly just 
 * -adds QGQ_order to teh question-group_question table;
 * -adds DTT_name and DTT_description to the datetime table;
 */
//make sure we have all the stages loaded too
//unfortunately, this needs to be done upon INCLUSION of this file,
//instead of construction, because it only gets constructed on first page load 
//(all other times it gets resurrected from a wordpress option)
$stages = glob(EE_CALENDAR_DMS_PATH.'3_0_0_stages/*');
$class_to_filepath = array();
foreach($stages as $filepath){
	$matches = array();
	preg_match('~3_0_0_stages/(.*).dmsstage.php~',$filepath,$matches);
	$class_to_filepath[$matches[1]] = $filepath;
}
EEH_Autoloader::register_autoloader($class_to_filepath);

class EE_DMS_Calendar_3_0_0 extends EE_Data_Migration_Script_Base{

	public function __construct() {
		$this->_pretty_name = __("Data Migration of Calendar Data from EE3 to EE4", "event_espresso");
		$this->_migration_stages = array(
			new EE_DMS_Calendar_3_0_0_options(),
			new EE_DMS_Calendar_3_0_0_metadata()
		);
		parent::__construct();
	}
	public function can_migrate_from_version($version_array) {
		$core_version_string = $version_array['Core'];
		$calendar_version_string = isset($version_array['Calendar']) ? $version_array['Calendar'] : '0.0.0';
		//find if the ee3 table for calendar data exists or not
		global $wpdb;
		$table_name = $wpdb->prefix."events_category_detail";
		if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
			//ee3 category tables don't exist still
			$an_ee3_table_exists = false;
		}else{
			$an_ee3_table_exists = true;
		}
		if($core_version_string >= '4.1.0' &&//only run it if core is at least at 4.1.0
				$calendar_version_string < '3.0.0' && //and if calendar data ISN'T at 3.0.0 or greater already
				$an_ee3_table_exists //and the EE3 calendar tables exist
				){
			return true;
		}else{
			//migration doesnt' apply.
			//eg they installed ee4.1.0 and then activated calendar, but no previous version of ee3
			//or they installed ee3, then ee4.1, but deleted their ee3 tables, then activated teh calendar
			return false;
		}
	}
	public function pretty_name() {
		return __("Calendar Data Migration to 3.0.0", "event_espresso");
	}
	public function schema_changes_before_migration() {
		return true;
	}
	/**
	 * We COULD clean up the esp_question.QST_order field here. We'll leave it for now
	 * @return boolean
	 */
	public function schema_changes_after_migration() {
		return true;
	}
}