<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_DMS_4_6_0_billing_info
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_DMS_4_6_0_billing_info extends EE_Data_Migration_Script_Stage_Table{
	function __construct(){
		global $wpdb;
		$this->_old_table = $wpdb->postmeta;
		$this->_pretty_name = __('Billing Info', 'event_espresso');
		$this->_extra_where_sql = "WHERE meta_key LIKE 'billing_info_%'";
		parent::__construct();
	}
	protected function _migrate_old_row( $old_row ) {
		$new_billing_info = array();
		$old_billing_info = maybe_unserialize( $old_row[ 'meta_value' ] );
		$gateway_name = str_replace( "billing_info_",'',$old_row[ 'meta_key' ] );
		$repetitive_prefix = '_reg-page-billing-';
		$repetitive_suffix = "-" . $gateway_name;
		foreach( $old_billing_info as $old_input_name => $input_value ){
			$old_input_name_important_part = str_replace( array( $repetitive_prefix, $repetitive_suffix ), array( '', ''), $old_input_name );

			switch( $old_input_name_important_part ){
				case 'fname':
					$new_input_name = 'first_name';
					break;
				case 'lname':
					$new_input_name = 'last_name';
					break;
				case 'state':
					//we used to store the state's id ,but now we just store the name
					$new_input_name = $old_input_name_important_part;
					$input_value = $this->_get_state_name_by_ID( $input_value );
					break;
				case 'card-nmbr':
					$new_input_name = 'credit_card';
					break;
				case 'card-type'://paypal pro only
					$new_input_name = 'credit_card_type';
					break;
				case 'card-exp-date-mnth':
					$new_input_name = 'exp_month';
					$input_value = '';
					break;
				case 'card-exp-date-year':
					$new_input_name = 'exp_year';
					$input_value = 0;
					break;
				case 'ccv-code':
					$new_input_name = 'cvv';
					break;
				default:
					$new_input_name = $old_input_name_important_part;

			}
			$new_billing_info[ $new_input_name ] = $input_value;
		}
		update_post_meta( $old_row[ 'post_id' ], $old_row[ 'meta_key' ], $new_billing_info );
	}
	/**
	 *
	 * @global type $wpdb
	 * @param int $id
	 * @return string
	 */
	protected function _get_state_name_by_ID( $id ){
		global $wpdb;
		return $wpdb->get_var( $wpdb->prepare( "SELECT STA_name FROM " . $wpdb->prefix . "esp_state WHERE STA_ID = %d", $id ) );
	}


}

// End of file EE_DMS_4_6_0_billing_info.dmsstage.php