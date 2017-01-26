<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_DMS_4_6_0_payment_method_currencies
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_DMS_4_6_0_payment_method_currencies extends EE_Data_Migration_Script_Stage{
	protected $_currency_table_name;
	protected $_currency_payment_method_table_name;
	protected $_payment_method_table_name;
	/**
	 * each key is the name of a 4.1-style gateway we know how to migrate to 4.6
	 * @var array
	 */
	protected $_gateway_currencies = array(
		'Aim' => array(
			'AUD',
			'USD',
			'CAD',
			'EUR',
			'GBP',
			'NZD',
		),
		'Bank' => 'all',
		'Check' => 'all',
		'Invoice' => 'all',
		'Mijireh' => 'all',
		'Paypal_Pro' => array(
			'USD',
			'GBP',
			'CAD',
			'AUD',
			'BRL',
			'CHF',
			'CZK',
			'DKK',
			'EUR',
			'HKD',
			'HUF',
			'ILS',
			'JPY',
			'MXN',
			'MYR',
			'NOK',
			'NZD',
			'PHP',
			'PLN',
			'SEK',
			'SGD',
			'THB',
			'TRY',
			'TWD',
		),
		'Paypal_Standard' => array(
			'USD',
			'GBP',
			'CAD',
			'AUD',
			'BRL',
			'CHF',
			'CZK',
			'DKK',
			'EUR',
			'HKD',
			'HUF',
			'ILS',
			'JPY',
			'MXN',
			'MYR',
			'NOK',
			'NZD',
			'PHP',
			'PLN',
			'SEK',
			'SGD',
			'THB',
			'TRY',
			'TWD'
		)
	);
	public function __construct() {
		global $wpdb;
		$this->_pretty_name = __( 'Payment Method Currencies', 'event_espresso' );
		$this->_payment_method_table_name = $wpdb->prefix.'esp_payment_method';
		$this->_currency_payment_method_table_name = $wpdb->prefix.'esp_currency_payment_method';
		$this->_currency_table_name = $wpdb->prefix.'esp_currency';
		parent::__construct();
	}

	protected function _count_records_to_migrate() {
		$count = 0;
		foreach($this->_gateway_currencies as $currencies){
			if( $currencies == 'all'){
				$currencies = $this->_get_all_currencies();
			}
			$count += count($currencies);
		}
		return $count;
	}



	protected function _migration_step( $num_items_to_migrate = 50 ) {
		$items_actually_migrated = 0;
		$relations_to_add_this_step = $this->_gather_relations_to_add($num_items_to_migrate);
		foreach($relations_to_add_this_step as $pm_slug => $currencies){

			$id = $this->get_migration_script()->get_mapping_new_pk( 'EE_Gateway_Config', $pm_slug, $this->_payment_method_table_name );
			foreach( $currencies as $currency ){
				if( $id ){
					$this->_add_currency_relations( $id, $currency );
				}
				$items_actually_migrated++;
			}
		}
		if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
			$this->set_completed();
		}
		return $items_actually_migrated;
	}

	private function _gather_relations_to_add($num_items_to_migrate) {
		$relations_to_add_this_step = array();
		$migrate_up_to_count = $this->count_records_migrated() + $num_items_to_migrate;
		$iterator = 0;
		foreach($this->_gateway_currencies as $pm_slug => $currencies){
			if( $currencies == 'all' ){
				$currencies = $this->_get_all_currencies();
			}
			foreach($currencies as $currency_code){
				if( $this->count_records_migrated() <= $iterator &&
						$iterator < $migrate_up_to_count ){
					$relations_to_add_this_step[ $pm_slug ] [] = $currency_code;
				}
				$iterator++;
			}
		}
		return $relations_to_add_this_step;
	}
	/**
	 * Gets all the currency codes in the database
	 * @return array
	 */
	private function _get_all_currencies(){
		global $wpdb;
		$currencies = $wpdb->get_col("SELECT CUR_code FROM {$this->_currency_table_name}");
		return $currencies;
	}

	/**
	 * Adds teh relation between the payment method and the currencies it can be used for
	 * @param int $id
	 * @param string $gateway_slug
	 */
	private function _add_currency_relations($pm_id,$currency_code){
		global $wpdb;
		$cur_pm_relation = array(
					'CUR_code'=>$currency_code,
					'PMD_ID'=>$pm_id,
				);
		$success = $wpdb->insert($this->_currency_payment_method_table_name,
				$cur_pm_relation,
				array(
					'%s',//CUR_code
					'%d',//PMD_ID
				));
		if( ! $success ){
			$this->add_error( sprintf( __( 'Could not add currency relation %s because %s', "event_espresso" ), wp_json_encode( $cur_pm_relation ), $wpdb->last_error ) );
		}
	}
}

// End of file EE_DMS_4_6_0_payment_method_currencies.dmsstage.php