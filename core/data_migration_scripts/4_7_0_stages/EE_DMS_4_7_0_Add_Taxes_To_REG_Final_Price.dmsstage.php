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

	protected $_ticket_table;

	protected $_line_item_table;

	function __construct(){
		/** @type WPDB $wpdb */
		global $wpdb;
		$this->_pretty_name = __( 'Registration Final Price Tax Calculations', 'event_espresso' );
		// define tables
		$this->_old_table 				= $wpdb->prefix . 'esp_registration';
		$this->_ticket_table 			= $wpdb->prefix . 'esp_ticket';
		$this->_line_item_table 	= $wpdb->prefix . 'esp_line_item';
		parent::__construct();
	}



	/**
	 * @return string
	 */
	protected function _get_rest_of_sql_for_query() {
		$SQL = "FROM {$this->_old_table} AS reg ";
		$SQL .= "JOIN {$this->_ticket_table} as tkt ON reg.TKT_ID = tkt.TKT_ID ";
		$SQL .= "JOIN {$this->_line_item_table} as line ON reg.TXN_ID = line.TXN_ID ";
		$SQL .= "WHERE tkt.TKT_taxable = 1 ";
		$SQL .= "AND line.LIN_code = 'total' ";
		$SQL .= "AND reg.REG_final_price > 0 ";
		return $SQL;
	}



	/**
	 * Counts the records to migrate; the public version may cache it
	 * @return int
	 */
	public function _count_records_to_migrate() {
		/** @type WPDB $wpdb */
		global $wpdb;
		$SQL = "SELECT count( reg.REG_ID ) ";
		$SQL .= $this->_get_rest_of_sql_for_query();
		$count = $wpdb->get_var( $SQL );
		return $count;
	}



	/**
	 * Gets data for all registrations with taxable tickets in the esp_line_item table
	 * @global wpdb $wpdb
	 * @param int $limit
	 * @return array of arrays like $wpdb->get_results($sql, ARRAY_A)
	 */
	protected function _get_rows( $limit ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$start_at_record = $this->count_records_migrated();
		$SQL = "SELECT reg.REG_ID,  reg.REG_final_price, line.LIN_ID ";
		$SQL .= $this->_get_rest_of_sql_for_query();
		$SQL .= $wpdb->prepare( "LIMIT %d, %d", $start_at_record, $limit );

		// produces something like:
		/*
			SELECT
			  reg.REG_ID,
			  reg.REG_final_price,
			  line.LIN_ID

			FROM `wp_esp_registration` AS reg
			  JOIN `wp_esp_ticket` AS tkt ON reg.TKT_ID = tkt.TKT_ID
			  JOIN `wp_esp_line_item` AS line ON reg.TXN_ID = line.TXN_ID

			WHERE tkt.TKT_taxable = 1
				AND line.LIN_code = 'total'
				AND reg.REG_final_price > 0

			LIMIT 1, 50
		 */

		return $wpdb->get_results( $SQL, ARRAY_A );
	}



	/**
	 * @param array $row
	 * @return void
	 */
	protected function _migrate_old_row( $row ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		// ensure all required values are present
		if ( ! isset( $row[ 'REG_ID' ], $row[ 'REG_final_price' ], $row[ 'LIN_ID' ] )) {
			$this->add_error(
				sprintf(
					__( 'Invalid query results returned with the following data:%1$s REG_ID=%2$d, REG_final_price=%3$d, LIN_ID=%4$f. Error: "%5$s"', 'event_espresso' ),
					'<br />',
					isset( $row[ 'REG_ID' ] ) ? $row[ 'REG_ID' ] : '',
					isset( $row[ 'REG_final_price' ] ) ? $row[ 'REG_final_price' ] : '',
					isset( $row[ 'LIN_ID' ] ) ? $row[ 'LIN_ID' ] : '',
					$wpdb->last_error
				)
			);
			return;
		}
		// get tax subtotal
		$tax_subtotal_line_item_ID = $this->_get_line_item_ID_for_tax_subtotal( $row['LIN_ID'] );
		if ( ! $tax_subtotal_line_item_ID ) {
			$this->add_error(
				sprintf(
					__( 'Invalid line item ID returned. Error: "%1$s"', 'event_espresso' ),
					$wpdb->last_error
				)
			);
			return;
		}
		// now get taxes
		$taxes = $this->_get_tax_amounts( $tax_subtotal_line_item_ID );
		// apply taxes to registration final price
		$this->_apply_taxes( $row[ 'REG_ID' ], $row[ 'REG_final_price' ], $taxes );

	}



	/**
	 * _get_tax_subtotal
	 *
	 * @param int $LIN_ID
	 * @return int
	 */
	protected function _get_line_item_ID_for_tax_subtotal( $LIN_ID ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$SQL = "SELECT LIN_ID ";
		$SQL .= "FROM {$this->_line_item_table} ";
		$SQL .= "WHERE LIN_parent = %d ";
		$SQL .= "AND LIN_code = 'taxes'";
		return $wpdb->get_var( $wpdb->prepare( $SQL, $LIN_ID ) );
	}



	/**
	 * _get_tax_subtotal
	 *
	 * @param int $LIN_ID
	 * @return array
	 */
	protected function _get_tax_amounts( $LIN_ID ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$SQL = "SELECT LIN_percent ";
		$SQL .= "FROM {$this->_line_item_table} ";
		$SQL .= "WHERE LIN_parent = %d";
		return $wpdb->get_results( $wpdb->prepare( $SQL, $LIN_ID ), OBJECT_K );
	}



	/**
	 * _apply_taxes
	 *
	 * @param int $REG_ID
	 * @param float $final_price
	 * @param array $taxes
	 * @return void
	 */
	protected function _apply_taxes( $REG_ID = 0, $final_price = 0.00, $taxes = array() ) {
		if ( is_array( $taxes ) && ! empty( $taxes ) ) {
			$total_taxes = 0;
			foreach ( $taxes as $tax ) {
				$total_taxes += $final_price * ( $tax->LIN_percent / 100 );
			}
			$final_price += $total_taxes;
			$this->_update_registration_final_price( $REG_ID, $final_price );
		}
	}



	/**
	 * _update_registration_final_price
	 *
	 * @param int $REG_ID
	 * @param float $REG_final_price
	 * @return void
	 */
	protected function _update_registration_final_price( $REG_ID = 0, $REG_final_price = 0.00 ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$success = $wpdb->update(
			$this->_old_table,
			array( 'REG_final_price' => $REG_final_price ),  // data
			array( 'REG_ID' => $REG_ID ),  // where
			array( '%f' ),   // data format
			array( '%d' )  // where format
		);
		if ( $success === false ) {
			$this->add_error(
				sprintf(
					__( 'Could not update registration final price value for registration ID=%1$d because "%2$s"', 'event_espresso' ),
					$REG_ID,
					$wpdb->last_error
				)
			);
		}
	}

}
// End of file EE_DMS_4_7_0_Add_Taxes_To_REG_Final_Price.dmsstage.php