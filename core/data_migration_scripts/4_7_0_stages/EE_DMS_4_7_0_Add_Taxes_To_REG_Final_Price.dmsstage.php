<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_DMS_4_7_0_Add_Taxes_To_REG_Final_Price
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Brent Christensen
 *
 */
class EE_DMS_4_7_0_Add_Taxes_To_REG_Final_Price extends EE_Data_Migration_Script_Stage_Table{

	protected $_payment_table;

	protected $_registration_table;

	protected $_registration_payment_table;

	function __construct(){
		/** @type WPDB $wpdb */
		global $wpdb;
		$this->_pretty_name = __( 'Registration Final Price Tax Calculations', 'event_espresso' );
		// define tables
		$this->_old_table 				= $wpdb->prefix . 'esp_registration';
		$this->_line_item_table 	= $wpdb->prefix . 'esp_line_item';
		parent::__construct();
	}



	/**
	 * Gets the rows for each migration stage from the old table
	 * @global wpdb $wpdb
	 * @param int $limit
	 * @return array of arrays like $wpdb->get_results($sql, ARRAY_A)
	 */
	protected function _get_rows( $limit ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$start_at_record = $this->count_records_migrated();
		$query = "SELECT reg.TXN_ID, reg.REG_final_price, tkt.TKT_ID, tkt.TKT_taxable FROM {$this->_old_table} AS reg ";
		$query .= "JOIN {$this->_line_item_table} as line ON reg.TXN_ID = line.TXN_ID ";
		$query .= "{$this->_extra_where_sql} " . $wpdb->prepare( "LIMIT %d, %d", $start_at_record, $limit );
		return $wpdb->get_results( $query, ARRAY_A );
	}



	/**
	 * @param array $registration
	 * @return void
	 */
	protected function _migrate_old_row( $registration ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$REG_ID = absint( $registration[ 'REG_ID' ] );
		if ( ! $REG_ID ) {
			$this->add_error(
				sprintf(
					__( 'Invalid registration with ID=%1$d. Error: "%2$s"', 'event_espresso' ),
					$REG_ID,
					$wpdb->last_error
				)
			);
			return;
		}



	}



	/**
	 * _get_registration_ticket
	 *
	 * @param int $REG_ID
	 * @return array
	 */
	protected function _get_registration_ticket( $REG_ID ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$SQL = "SELECT * FROM $this->_registration_table WHERE TXN_ID = %d AND STS_ID IN ( 'RPP', 'RAP' )";
		return $wpdb->get_results( $wpdb->prepare( $SQL, $REG_ID ), OBJECT_K );
	}




}
// End of file EE_DMS_4_7_0_Add_Taxes_To_REG_Final_Price.dmsstage.php