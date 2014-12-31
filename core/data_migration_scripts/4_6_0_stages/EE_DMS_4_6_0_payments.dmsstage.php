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
		$PMD_ID = apply_filters( 'FHEE__EE_DMS_4_6_0_payments__migrate_old_row__PMD_ID', $this->_get_payment_method_id_by_gateway_name( $payment_row[ 'PAY_gateway' ], $payment_row[ 'PAY_method'] ) );
		if( ! $PMD_ID ){
			$this->add_error( sprintf( __( 'Could not find payment method with PMD_type = \'%1$s\' when migrating payment row %2$s so just assigned it an unknown payment method', 'event_espresso' ), $payment_row[ 'PAY_gateway' ], $this->_json_encode( $payment_row ) ) );
			$PMD_ID = 0;
		}
		$new_values = array(
			'PMD_ID' => $PMD_ID,
			'PAY_source' => ( $payment_row[ 'PAY_via_admin' ] ? 'ADMIN' : 'CART' ) );
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
	 *  array(
			'PP' => __( 'PayPal', 'event_espresso' ),
			'CC' => __( 'Credit Card', 'event_espresso' ),
			'DB'=>  __("Debit Card", 'event_espresso'),
			'CHQ' => __( 'Cheque', 'event_espresso' ),
			'CSH' => __( 'Cash', 'event_espresso' ),
			'BK'=>  __("Bank", 'event_espresso'),
			'IV'=>  __("Invoice", 'event_espresso'),
			'MO'=>  __("Money Order", 'event_espresso'),
	 * @global type $wpdb
	 * @param int $id
	 * @return string
	 */
	protected function _get_payment_method_id_by_gateway_name( $gateway_name, $old_pay_method_column ){
		global $wpdb;
		//convert from old known PAY_method values to their corresponding
		//PMD_type or default PMD_name
		switch( $old_pay_method_column ) {
			case 'PP':
				$pmd_type = 'Paypal_Standard';
				break;
			case 'CC':
				$pmd_type = 'Credit_Card';
				break;
			case 'DB':
				$pmd_type = 'Debit_Card';
				break;
			case 'CHQ':
				$pmd_type = 'Check';
				break;
			case 'CSH':
				$pmd_type = 'Cash';
				break;
			case 'BK':
				$pmd_type = 'Bank';
				break;
			case 'IV':
				$pmd_type = 'Invoice';
				break;
			case 'MO':
				$pmd_type = 'Money_Order';
				break;
			default:
				$pmd_type = $gateway_name;
		}
		$pmd_name = str_replace( "_", " ", $pmd_type );
		return $wpdb->get_var( $wpdb->prepare( "SELECT PMD_ID FROM " . $wpdb->prefix . "esp_payment_method WHERE PMD_type = %s OR PMD_name = %s", $pmd_type, $pmd_name ) );
	}


}

// End of file EE_DMS_4_6_0_payments.dmsstage.php