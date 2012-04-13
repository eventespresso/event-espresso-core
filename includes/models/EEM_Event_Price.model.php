<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * Event - Price Model
 *
 * @package				Event Espresso
 * @subpackage		includes/models/EEM_Event_Price.model.php
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );

class EEM_Event_Price extends EEM_Base {

	// private instance of the EEM_Event_Price object
	private static $_instance = NULL;

	// A multi-dimensional array to hold the active status of prices / events from the event_price table.
	// ie. $_active_status[event_id][price_id] = true
	private $_active_status = NULL;

	// A cache of the select all from the db
	// ie. $_select_all[0] = ('EVT_ID'=>1, 'PRC_ID'=>2, 'is_active'=>true)
	private $_select_all = NULL;

	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access private
	 * 		@return void
	 */
	private function __construct() {
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_event_price';
		// array representation of the price table and the data types for each field
		$this->table_data_types = array(
				'EVT_ID' => '%d',
				'PRC_ID' => '%d',
				'is_active' => '%d');
		if ($statuses = $this->select_all(FALSE, '', ARRAY_A)) {
			foreach ($statuses as $status) {
				$this->_active_status[$status['EVT_ID']][$status['PRC_ID']] = $status['is_active'];
			}
			$this->_select_all = $statuses;
		}
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event_Price.class.php');
	}

	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 * 		@access public
	 * 		@return EEM_Event_Price instance
	 */
	public static function instance() {

		// check if instance of EEM_Event_Price already exists
		if (self::$_instance === NULL) {
			// instantiate Event_Price_model
			self::$_instance = &new self();
		}
		// EEM_Event_Price object
		return self::$_instance;
	}

	private function _create_objects($base_prices = FALSE) {

		if (!$base_prices) {
			return FALSE;
		}

		if ( is_object( $base_prices )){
			$base_prices = array( $base_prices );
		}

		foreach ($base_prices as $base_price) {
			$array_of_objects[$base_price->ID()] = new EE_Event_Price(
							$base_price->amount(),
							$base_price->name(),
							$base_price->desc(),
							$base_price->ID()
			);
		}
		return $array_of_objects;
	}

	/**
	 * return is a price active for a particular event (per event_price table)
	 *
	 * @param type int $PRC_ID
	 * @param type int $EVT_ID
	 * @return boolean
	 */
	public function is_price_active_for_event ($PRC_ID=FALSE,$EVT_ID=FALSE) {
		if (!$PRC_ID || !$EVT_ID) {
			return FALSE;
		}
		if (!empty($this->_active_status[(bool)$EVT_ID][$PRC_ID])) {
			return TRUE;
		} else {
			return FALSE;
		}
	}

	/**
	 * returns an array of the price ids active for an event
	 *
	 * @param type int $event_id
	 * @return array of price ids
	 */
	private function _get_price_ids_by_event_id( $event_id = FALSE ) {
		if (!$event_id) {
			return FALSE;
		}
		$prices = array();
		foreach ($this->_active_status[$event_id] as $price_id => $is_active) {
			if (!$is_active) {
				continue;
			}
			$prices[] = $price_id;
		}
		return $prices;
	}

	/**
	 *
	 * @param type array $prices
	 * @return array
	 */
	private function _order_non_tax_prices ( $prices=FALSE ) {
		if (!$prices) {
			return FALSE;
		}
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
		$ordered_prices = array();
		foreach($prices as $price) {
			$price = $PRC->get_price_by_ID($price);
			if (!$PRT->type[$price->type()]->is_tax()) {
				$ordered_prices[$PRT->type[$price->type()]->order()][] = $price;
			}
		}
		return $ordered_prices;
	}

	/**
	 *
	 * @param type array $adjustments
	 * @param type array $base_prices
	 * @return array
	 */
	private function _apply_adjustments_to_base_prices ($adjustments=FALSE, $base_prices=FALSE) {
		if (!$base_prices) {
			return FALSE;
		}
		if (!$adjustments) {
			return $base_prices;
		}
		foreach($adjustments as $price_order) {
			foreach($price_order as $adjustment) {
				foreach($base_prices as $base_price) {
					$base_price->add_adjustment($adjustment->ID(), $adjustment->name(), $PRT->type[$adjustment->type()]->is_percent(), $adjustment->amount());
				}
			}
		}
		return $base_prices;
	}

		/**
	 *	get all the final computed prices for an event
	 *
	 *	@access public
	 *	@param int $event_id
	 *	@return array of price objects
	 */
	public function get_final_event_prices( $event_id = FALSE ) {
		if (!$event_id) {
			return FALSE;
		}
		$event_id = absint($event_id);
		$computed_prices = array();
		if ($prices = $this->_get_price_ids_by_event_id($event_id)) {
			if ($ordered_prices = $this->_order_non_tax_prices( $prices )) {
				$base_prices = $this->_create_objects($ordered_prices[0]);
				unset($ordered_prices[0]);
				$computed_prices = $this->_apply_adjustments_to_base_prices($ordered_prices, $base_prices);
			}
		}
		return $computed_prices;
	}


	public function insert($set_column_values) {

		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values ) );

		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_insert($this->table_name, $this->table_data_types, $set_column_values);

		// set some table specific success messages
		if ($results['rows'] == 1) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Event_Price details have been successfully saved to the database.';
		} elseif ($results['rows'] > 1) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for ' . $results . ' event_prices have been successfully saved to the database.';
		} else {
			// error message
			$espresso_notices['errors'][] = 'An error occured and the event_price has not been saved to the database. ' . $this->_get_error_code(__FILE__, __FUNCTION__, __LINE__);
		}

		$rows_n_ID = array('rows' => $results['rows'], 'new-ID' => $results['new-ID']);
		return $rows_n_ID;
	}

	/**
	 * 		This function updates table data
	 *
	 * 		@access public
	 * 		@param array $set_column_values - array of column names and values for the SQL SET clause
	 * 		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 * 		@return array
	 */
	public function update($set_column_values, $where_cols_n_values) {

		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );

		global $espresso_notices;

		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = $this->_update($this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values);

		// set some table specific success messages
		if ($results['rows'] == 1) {
			// one row was successfully updated
			$espresso_notices['success'][] = 'Event_Price details have been successfully updated.';
		} elseif ($results['rows'] > 1) {
			// multiple rows were successfully updated
			$espresso_notices['success'][] = 'Details for ' . $results . ' event_prices have been successfully updated.';
		} else {
			// error message
			$espresso_notices['errors'][] = 'An error occured and the event_price has not been updated. ' . $this->_get_error_code(__FILE__, __FUNCTION__, __LINE__);
		}

		return $results['rows'];
	}

}