<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_DMS_4_6_0_payments
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_DMS_4_6_0_payments extends EE_Data_Migration_Script_Stage_Table{
	protected $_payment_method_table;
	function __construct(){
		global $wpdb;
		$this->_old_table = $wpdb->prefix . 'esp_payment';
		$this->_payment_method_table = $wpdb->prefix . 'esp_payment_method';
		$this->_pretty_name = __('Payment-Payment Method Relations', 'event_espresso');
		parent::__construct();
	}
	protected function _migrate_old_row( $payment_row ) {
		global $wpdb;
		//get the payment method's ID
		$PMD_ID = $this->_get_payment_method_id_by_gateway_name( $payment_row[ 'PAY_gateway' ] );
		if( ! $PMD_ID ){
			$this->add_error( sprintf( __( 'Could not find payment method with PMD_type = \'%1$s\' when migrating payment row %2$s', 'event_espresso' ), $payment_row[ 'EXM_value' ], $this->_json_encode( $payment_row ) ) );
			return;
		}
		$new_values = array( 'PMD_ID' => $PMD_ID, 'PAY_source' => $payment_row[ 'PAY_method' ] );
		$wheres = array( 'PAY_ID' => $payment_row[ 'PAY_ID' ] );
		$new_value_datatypes = array( '%d', '%s' );
		$where_datatypes = array( '%d' );
		$success = $wpdb->update( $this->_old_table,
				$new_values,
				$wheres,
				$new_value_datatypes,
				$where_datatypes
				);
		if( ! $success ){
			$this->add_error( sprintf( __( 'Couldnt set %1$s row in table %2$s where %3$s', 'event_espresso' ), $this->_json_encode( $new_values ), $this->_old_table, $this->_json_encode( $wheres ) ) );
		}
	}
	/**
	 *
	 * @global type $wpdb
	 * @param int $id
	 * @return string
	 */
	protected function _get_payment_method_id_by_gateway_name( $gateway_name ){
		global $wpdb;
		return $wpdb->get_var( $wpdb->prepare( "SELECT PMD_ID FROM " . $wpdb->prefix . "esp_payment_method WHERE PMD_type = %s", $gateway_name ) );
	}


}

// End of file EE_DMS_4_6_0_payments.dmsstage.php