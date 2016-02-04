<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 * Class EE_Data_Migration_Script_Stage
 *
 * Each migration script is meant to be composed of different stages. Often, each stage corresponds
 * to a table that needs to be migrated: eg migrating 3.1 events to 4.1 event CPTs. However, each migration stage does
 * NOT NEED to correspond to migrating a single table: it could also correspond to a group of wp options, files, etc.
 * Only 3 functions need to be implemented for each migration stage: the constructor (it needs to set the _pretty_name property),
 *  _count_records_to_migrate() (which, when migrating a database table, would usually just return the count of records in the table, but
 * doesn't need to return the exactly correct number, as its mostly only used in the UI), and _migration_step() (which converts X records from their
 * old format to the new format. Whatever definition your migration stage uses for "record" in _count_records_to_migrate() should be the same definition in
 * _migration_step() (ie, it its a count of rows in the old attendees table in _count_records_to_migrate(), it should also be OLD attendee rows migrated
 * on each call to _migration_step().
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since                4.0
 *
 */

/**
 * Each migration script is meant to be composed of different stages. Often, each stage corresponds
 * to a table that needs to be migrated: eg migrating 3.1 events to 4.1 event CPTs. However, each migration stage does
 * NOT NEED to correspond to migrating a single table: it could also correspond to a group of wp options, files, etc.
 * Only 3 functions need to be implemented for each migration stage: the constructor (it needs to set the _pretty_name property),
 *  _count_records_to_migrate() (which, when migrating a database table, would usually just return the count of records in the table, but
 * doesn't need to return the exactly correct number, as its mostly only used in the UI), and _migration_step() (which converts X records from their
 * old format to the new format. Whatever definition your migration stage uses for "record" in _count_records_to_migrate() should be the same definition in
 * _migration_step() (ie, it its a count of rows in the old attendees table in _count_records_to_migrate(), it should also be OLD attendee rows migrated
 * on each call to _migration_step().
 */
abstract class EE_Data_Migration_Script_Stage extends EE_Data_Migration_Class_Base{
	/**
	 * The migration script this is a stage of
	 * @var EE_Data_Migration_Script_Base
	 */
	protected $_migration_script;

	/**
	 * This should eb called to essentially 'finalize' construction of the stage.
	 * This isn't done on the main constructor in order to avoid repetitive code. Instead, this is
	 * called by EE_Data_Migration_Script_Base's __construct() method so children don't have to
	 * @param EE_Data_Migration_Script_Base $migration_script
	 */
	public function _construct_finalize($migration_script){
		$this->_migration_script = $migration_script;
	}

	/**
	 * Migrates X old records to the new format. If a fatal error is encountered it is NOT caught here,
	 * but is propagated upwards for catching. So basically, the _migration_step() function implemented by children
	 * needs to catch exceptions and decide what's a fatal error and what isn't.
	 * @param int $num_items_to_migrate
	 * @return int
	 */
	public function migration_step($num_items_to_migrate=50){
		//before we run the migration step, we want ot take note of warnings that get outputted
		ob_start();
		$items_migrated = $this->_migration_step($num_items_to_migrate);
		$output = ob_get_contents();
		ob_end_clean();
		if( $output ){
			$this->add_error($output);
		}
		$this->_records_migrated += $items_migrated;
		return $items_migrated;
	}



	/**
	 * IMPORTANT: if an error is encountered, or everything is finished, this stage should update its status property accordingly.
	 * Note: it should not alter the count of items migrated. That is done in the public function that calls this.
	 * IMPORTANT: The count of items migrated should ONLY be less than $num_items_to_migrate when it's the last migration step, otherwise it
	 * should always return $num_items_to_migrate. (Eg, if we're migrating attendees rows from the database, and $num_items_to_migrate is set to 50,
	 * then we SHOULD actually migrate 50 rows,but at very least we MUST report/return 50 items migrated)
	 * @param int $num_items_to_migrate
	 * @return int number of items ACTUALLY migrated
	 */
	abstract protected function _migration_step($num_items_to_migrate=50);

	/**
	 * Counts the records that have been migrated so far
	 * @return int
	 */
	public function count_records_migrated() {
		return $this->_records_migrated;
	}

	/**
	 * returns an array of strings describing errors
	 * @return array
	 */
	public function get_errors(){
		return $this->_errors;
	}


	/**
	 * Sets all of the properties of this script stage to match what's in the array, which is assumed
	 * to have been made from the properties_as_array() function.
	 * @param array $array_of_properties like what's produced from properties_as_array() method
	 */
	public function instantiate_from_array_of_properties($array_of_properties){
		unset($array_of_properties['class']);
		foreach($array_of_properties as $property_name => $property_value){
			$this->{$property_name} = $property_value;
		}
	}

	/**
	 * Gets the script this is a stage of
	 * @return EE_Data_Migration_Script_Base
	 */
	protected function get_migration_script(){
		return $this->_migration_script;
	}
}
// end of file: /core/EE_Data_Migration_Script_Stage.core.php