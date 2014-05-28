<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_DMS_4_5_0_gateways
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * Migrates 4.1-4.3-style gateway settings (which were stores in EE_Config)
 * to 4.5-style payment methods (which have their database table)
 */
class EE_DMS_4_5_0_gateways extends EE_Data_Migration_Script_Stage{
	protected $_new_table_name;
	protected $_extra_meta_table_name;
	/**
	 * each key is the name of a 4.1-style gateway we know how to migrate to 4.5
	 * @var array
	 */
	protected $_gateways_we_know_how_to_migrate = array(
		'Aim',
		'Bank',
		'Check',
		'Invoice',
		'Mijireh',
		'Paypal_Pro',
		'Paypal_Standard',
	);

	public function __construct() {
		global $wpdb;
		$this->_new_table_name = $wpdb->prefix."esp_payment_method";
		$this->_extra_meta_table_name = $wpdb->prefix."esp_extra_meta";
		$this->_pretty_name = __('Gateways', 'event_espresso');
		parent::__construct();
	}

	protected function _count_records_to_migrate() {
		return count(EE_Config::instance()->gateway->payment_settings);
	}


	protected function _migration_step($num_items_to_migrate = 50) {
		$items_actually_migrated = 0;
		$gateways_to_deal_with = array_slice(EE_Config::instance()->gateway->payment_settings,$this->count_records_migrated(),$num_items_to_migrate);
		foreach($gateways_to_deal_with as $old_gateway_slug => $old_gateway_settings){

			if( in_array( $old_gateway_slug, $this->_gateways_we_know_how_to_migrate ) ) {
				if( ! $old_gateway_settings){
					//no settings existed for this gateway anyways... weird...
					$items_actually_migrated++;
					continue;
				}
				//now prepare the settings to make sure they're in the 4.1 format
				$success = $this->_convert_gateway_settings(
						$old_gateway_slug,
						$old_gateway_settings,
						isset( EE_Config::instance()->gateway->active_gateways[ $old_gateway_slug ] ) );
				if( $success ) {
					unset(EE_Config::instance()->gateway->payment_settings[ $old_gateway_slug ] );
				}
			}
			$items_actually_migrated++;
		}
		//if we can keep going, and it hasn' tbeen done yet, convert active gateways
		if($items_actually_migrated < $num_items_to_migrate){
			$this->_converted_active_gateways = true;
		}

		EE_Config::instance()->update_espresso_config(false,false);
		if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
			$this->set_completed();
		}
		return $items_actually_migrated;
	}

	/**
	 * Converts the 4.1-style gateway to a 4.5-style paymetn method and saves it to the DB
	 * @param string $old_gateway_slug
	 * @param array $old_gateway_settings
	 * @param boolean $active indicates the gatewya is currently active
	 * @return boolean success
	 */
	protected function _convert_gateway_settings($old_gateway_slug,$old_gateway_settings,$active){
		$extra_meta_key_values = array();
		switch($old_gateway_slug){
			case 'Aim':
				$extra_meta_key_values = array(
					'login_id'=>$old_gateway_settings['authnet_aim_login_id'],
					'transaction_key'=>$old_gateway_settings['authnet_aim_transaction_key'],
					'test_transactions'=>$old_gateway_settings['test_transactions']
				);
				break;
			case 'Bank':
				$extra_meta_key_values = array(
					'page_title'=>$old_gateway_settings['page_title'],
					'payment_instructions'=>$old_gateway_settings['bank_instructions'],
				'name_on_bank_account'=>$old_gateway_settings['account_name'],
				'bank_account_number'=>$old_gateway_settings['account_number'],
				'bank_name'=>$old_gateway_settings['bank_name'],
				'bank_address'=>$old_gateway_settings['bank_address']
				);
				break;
			case 'Check':
				$extra_meta_key_values = array(
					'check_title'=> $old_gateway_settings['check_title'],
					'payment_instructions'=>$old_gateway_settings['check_instructions'],
					'payable_to'=>$old_gateway_settings['payable_to'],
					'address_to_send_payment'=>$old_gateway_settings['payment_address']
				);
				break;
			case 'Invoice':
				$extra_meta_key_values = array(
					'pdf_stylesheet' => isset( $old_gateway_settings[ 'invoice_css' ] ) ? $old_gateway_settings[ 'invoice_css' ] : NULL,
					'pdf_instructions' => $old_gateway_settings[ 'pdf_instructions' ],
					'pdf_logo_image' => $old_gateway_settings[ 'invoice_logo_url' ],
					'show_on_page' => $old_gateway_settings[ 'show' ],
					'page_title' => isset( $old_gateway_settings[ 'page_title' ] ) ? $old_gateway_settings[ 'page_title' ] : '',
					'page_instructions' => isset( $old_gateway_settings[ 'page_instructions' ] ) ? $old_gateway_settings[ 'page_instructions' ] : '',
					'page_payable_to' => isset( $old_gateway_settings[ 'payable_to' ] ) ? $old_gateway_settings[ 'payable_to' ] : '',
					'page_address_payable' => isset( $old_gateway_settings[ 'address_payable' ] ) ? $old_gateway_settings[ 'address_payable' ] : '',
				);
				break;
			case 'Mijireh':
				$extra_meta_key_values = array(
					'access_key' => $old_gateway_settings[ 'access_key' ]
				);
				break;
			case 'Paypal_Pro':
				$extra_meta_key_values = array(
					'username'=>$old_gateway_settings['username'],
					'password'=>$old_gateway_settings['password'],
					'signature'=>$old_gateway_settings['signature'],
					'credit_card_types'=>$old_gateway_settings['credit_cards'],
				);
				break;
			case 'Paypal_Standard':
				$extra_meta_key_values = array(
					'paypal_id' => $old_gateway_settings[ 'paypal_id' ],
					'image_url' => $old_gateway_settings[ 'image_url' ],
					'shipping_details' => isset( $old_gateway_settings[ 'no_shippping' ] ) ? $old_gateway_settings[ 'no_shippping' ] : false,

				);
				break;
			default:
				//if we don't recognize the payment method, just put everything in it into
				//extra metas. At least this way its preserved somewhere
				$extra_meta_key_values = $old_gateway_settings;
		}
		$pretty_name = isset( $old_gateway_settings[ 'display_settings' ] ) ? $old_gateway_settings[ 'display_settings' ] : $old_gateway_slug;
		$offline_gateways = array( 'Bank', 'Check', 'Invoice' );
		if( $active && in_array( $old_gateway_slug, $offline_gateways ) ) {
			$scope = array( 'CART', 'ADMIN');
		}elseif( $active && ! in_array( $old_gateway_slug, $offline_gateways ) ) {
			$scope = array( 'CART' );
		}elseif( ! $active && in_array($old_gateway_slug,$offline_gateways ) ) {
			$scope = array( 'ADMIN' );
		}else{// ! active && ! in_array($old_gateway_slug, $offline_gateways) )
			$scope = array();
		}
		$payment_method_col_values = array(
			'PMD_type' => $old_gateway_slug,
			'PMD_name' => $pretty_name,
			'PMD_admin_name' => $pretty_name,
			'PMD_slug' => sanitize_key( $old_gateway_slug ),
			'PMD_debug_mode' => isset( $old_gateway_settings[ 'use_sandbox' ] ) ? $old_gateway_settings['use_sandbox'] : FALSE,
			'PMD_button_url' => isset( $old_gateway_settings[ 'button_url' ] ) ? $old_gateway_settings[ 'button_url' ] : NULL,
			'PMD_scope' =>  serialize( $scope )
		);
		$db_types = array(
			'%s',//PMD_type
			'%s',//PMD_name
			'%s',//PMD_admin_name
			'%s',//PMD_slug
			'%d',//PMD_debug_mode
			'%s',//PMD_button_url
			'%s',//PMD_scope
		);
		global $wpdb;
		//first: check if it already exists
		$id = $wpdb->get_var( $wpdb->prepare( "SELECT PMD_ID FROM {$this->_new_table_name} WHERE PMD_slug=%s", $payment_method_col_values[ 'PMD_slug' ] ) );
		if( $id ){
			//just update that payment method instead of creatin ga new one
			$success = $wpdb->update(
					$this->_new_table_name,
					$payment_method_col_values,
					array(
						'PMD_ID'=>$id
					),
					$db_types,
					array(
						'%d',//PMD_ID
					));
			if( ! $success ){
				$this->add_error(sprintf(__('Could not update payment method %d with properties %s because %s', "event_espresso"),$id,json_encode($payment_method_col_values),$wpdb->last_error));
			}
		}else{
			$success = $wpdb->insert(
					$this->_new_table_name,
					$payment_method_col_values,
					$db_types);
			if ( ! $success ) {
				$this->add_error($wpdb->last_error);
				return false;
			}else{
				$id = $wpdb->insert_id;
			}
		}

		if( $id ){
			foreach( $extra_meta_key_values as $key => $value ){
				$exm_args = array(
					'OBJ_ID'=>$id,
					'EXM_type'=>'Payment_Method',
					'EXM_key'=>$key,
					'EXM_value'=> maybe_serialize($value )
				);
				$success = $wpdb->insert(
						$this->_extra_meta_table_name,
						$exm_args,
						array(
							'%d',//OBJ_ID
							'%s',//EXM_type
							'%s',//EXM_key
							'%s',//EXM_value
						));
				if( ! $success ){
					$this->add_error(sprintf(__('Could not insert extra meta key with values %s. %s', "event_espresso"),json_encode($exm_args),$wpdb->last_error));
				}
			}
			return true;
		}
	}
}

// End of file EE_DMS_4_5_0_gateways.dmsstage.php