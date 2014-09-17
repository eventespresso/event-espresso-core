<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_DMS_4_6_0_state_system_question
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Brent Christensen
 *
 */
class EE_DMS_4_6_0_state_system_question extends EE_Data_Migration_Script_Stage{

	protected $_table_name;
	protected $_field_name;
	protected $_old_field_value;
	protected $_new_field_value;



	/**
	 * Just initializes the status of the migration
	 *
	 * @return EE_DMS_4_6_0_state_system_question
	 */
	public function __construct() {
		global $wpdb;
		$this->_pretty_name = __( 'State - System Question', 'event_espresso' );
		$this->_table_name = $wpdb->prefix.'esp_question';
		$this->_field_name = 'QST_system';
		$this->_old_field_value = 'state';
		$this->_new_field_value = 'STATE';
		parent::__construct();
	}

	/**
	 * _count_records_to_migrate
	 *
	 * @return int
	 */
	protected function _count_records_to_migrate() {
		$questions_that_require_conversion = $this->_get_all_records_that_require_conversion();
		$count = count( $questions_that_require_conversion );
		return $count;
	}


	/**
	 * _get_all_records_that_require_conversion
	 *
	 * @param int $limit
	 * @param int $offset
	 * @return array
	 */
	private function _get_all_records_that_require_conversion( $limit = 0, $offset = 0 ){
		global $wpdb;
		$SQL = "SELECT * FROM %s WHERE %s = %s";
		if ( $limit ) {
			$SQL .= "LIMIT %d OFFSET %d";
			$questions = $wpdb->query( $wpdb->prepare( $SQL, $this->_table_name, $this->_field_name, $this->_old_field_value, $limit, $offset ));
		} else {
			$questions = $wpdb->query( $wpdb->prepare( $SQL, $this->_table_name, $this->_field_name, $this->_old_field_value ));
		}
		return $questions;
	}


	/**
	 * _migration_step
	 *
	 * @param int $num_items_to_migrate
	 * @return int number of items ACTUALLY migrated
	 */
	protected function _migration_step( $num_items_to_migrate = 50 ) {
		$items_actually_migrated = 0;
		$questions_to_convert_this_step = $this->_get_all_records_that_require_conversion( $this->count_records_migrated(), $num_items_to_migrate );
		foreach( $questions_to_convert_this_step as $question ){
			if ( $question->QST_ID) {
				$this->update_question_type( $question->QST_ID, $this->_new_field_value );
			}
			$items_actually_migrated++;
		}
		if ( $this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate() ) {
			$this->set_completed();
		}
		return $items_actually_migrated;
	}



	/**
	 * updates the question with the new question type
	 * @param int $QST_ID
	 * @param string $new_field_value
	 */
	private function update_question_type( $QST_ID, $new_field_value ){
		global $wpdb;
		$success = $wpdb->update(
			$this->_table_name,
			array( $this->_field_name => $new_field_value ),  // data
			array( 'QST_ID' => $QST_ID ),  // where
			array( '%s' ),   // data format
			array( '%d' )  // where format
		);
		if ( ! $success ) {
			$this->add_error(
				sprintf(
					__( 'Could not update question system name "%1$s" for question ID=%2$d because "%3$s"', 'event_espresso' ),
					json_encode( $new_field_value ),
					$QST_ID,
					$wpdb->last_error
				)
			);
		}
	}



}
// End of file EE_DMS_4_6_0_question_types.dmsstage.php