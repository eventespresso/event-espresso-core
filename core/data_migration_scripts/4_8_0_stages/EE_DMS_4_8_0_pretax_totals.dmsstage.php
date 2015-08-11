<?php
if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_DMS_4_8_0_gateways
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * Migrates line items that used to have LIN_code="tickets" to "pre-tax-total"
 */
class EE_DMS_4_8_0_pretax_totals extends EE_Data_Migration_Script_Stage{

	protected $_line_item_table_name;


	/**
	 * Just initializes the status of the migration
	 */
	public function __construct() {
		global $wpdb;
		$this->_line_item_table_name = $wpdb->prefix."esp_line_item";
		$this->_pretty_name = __('Pre-tax total line items', 'event_espresso');
		parent::__construct();
	}



	/**
	 * Counts the records to migrate; the public version may cache it
	 * @return int
	 */
	protected function _count_records_to_migrate() {
		return 1;
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
	protected function _migration_step($num_items_to_migrate = 50) {
		global $wpdb;
		$rows_updated = $wpdb->update(
				$this->_line_item_table_name,
				array( 'LIN_code' => 'pre-tax-subtotal' ),
				array( 'LIN_code' => 'tickets' ),
				array( '%s' ),
				array( '%s' ) );
		$this->set_completed();
		return 1;
	}
}

// End of file EE_DMS_4_8_0_gateways.dmsstage.php