<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_DMS_4_8_0_payments
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_DMS_4_8_0_event_subtotals extends EE_Data_Migration_Script_Stage_Table{
	function __construct(){
		global $wpdb;
		$this->_old_table = $wpdb->prefix . 'esp_line_item';
		$this->_extra_where_sql = ' WHERE LIN_type="sub-total" AND LIN_code="pre-tax-subtotal"';
		$this->_pretty_name = __('Event Sub-total line items', 'event_espresso');
		parent::__construct();
	}
	protected function _migrate_old_row( $line_item_row ) {
		global $wpdb;
		//what event is this line item for? this can be found by looking at its transaction's registration's EVT_ID
		$event_id = $wpdb->get_var( $wpdb->prepare( 'SELECT EVT_ID FROM ' . $wpdb->prefix . 'esp_registration WHERE TXN_ID=%d LIMIT 1', $line_item_row[ 'TXN_ID' ] ) );
		$new_line_item_data = array(
					'LIN_code' => 'event-' . $event_id,
					'TXN_ID' => $line_item_row[ 'TXN_ID' ],
					'LIN_name' => __( 'Event', 'event_espresso' ),
					'LIN_desc' => $line_item_row[ 'LIN_desc' ],
					'LIN_unit_price' => $line_item_row[ 'LIN_unit_price' ],
					'LIN_percent' => $line_item_row[ 'LIN_percent' ],
					'LIN_is_taxable' => $line_item_row[ 'LIN_is_taxable' ],
					'LIN_order' => $line_item_row[ 'LIN_order' ],
					'LIN_total' => $line_item_row[ 'LIN_total' ],
					'LIN_quantity' => $line_item_row[ 'LIN_quantity' ],
					'LIN_parent' => $line_item_row[ 'LIN_ID'],
					'LIN_type' => 'sub-total',
					'OBJ_type' => 'Event',
					'OBJ_ID' => $event_id,
				);
		$new_line_item_datatypes = array(
					'%s',//LIN_code
					'%d',//TXN_ID
					'%s',//LIN_name
					'%s',//LIN_desc
					'%f',//LIN_unit_price
					'%f',//LIN_percent
					'%d',//LIN_is_taxable
					'%d',//LIN_order
					'%f',//LIN_total
					'%d',//LIN_quantity
					'%d',//LIN_parent
					'%s',//LIN_type
					'%s',//OBJ_type
					'%d',//OBJ_ID
				);
		//insert the new event subtotal line item, pointing to this line item
		$success = $wpdb->insert( $this->_old_table, $new_line_item_data, $new_line_item_datatypes );
		if( ! $success ) {
			$this->add_error( $this->_create_error_message_for_db_insertion( $this->_old_table, $line_item_row, $this->_old_table, $new_line_item_data, $new_line_item_datatypes ) );
		}
		$new_line_item_id = $wpdb->insert_id;
		$this->get_migration_script()->set_mapping($this->_old_table, $line_item_row[ 'LIN_ID' ], $this->_old_table, $new_line_item_id );
		$query = $wpdb->prepare(
					"UPDATE {$this->_old_table} SET LIN_parent=%d WHERE LIN_parent = %d AND LIN_ID != %d LIMIT 100",
					$new_line_item_id,
					$line_item_row[ 'LIN_ID' ],
					$new_line_item_id );
		$success = $wpdb->query( $query );
		if( $success === false ) {
			$this->add_error(
					sprintf( __( 'Error updating rows to new event subtotal %1$s from %2$s. Error was: %3$s, while using query %4$s which had a result of %5$s', 'event_espresso' ),
					$new_line_item_id,
					$line_item_row[ 'LIN_ID' ],
					$wpdb->last_error,
					$query,
					$success) );
		}
		return 1;
	}
}

// End of file EE_DMS_4_8_0_payments.dmsstage.php