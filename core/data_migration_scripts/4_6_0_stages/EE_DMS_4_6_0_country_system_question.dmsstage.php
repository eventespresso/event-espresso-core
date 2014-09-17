<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_DMS_4_6_0_country_system_question
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Brent Christensen
 *
 */
class EE_DMS_4_6_0_country_system_question extends EE_Data_Migration_Script_Stage{

	protected $_question_table_name;
	protected $_question_system_name;



	/**
	 * Just initializes the status of the migration
	 *
	 * @return EE_DMS_4_6_0_country_system_question
	 */
	public function __construct() {
		global $wpdb;
		$this->_pretty_name = __( 'Country - System Question', 'event_espresso' );
		$this->_question_table_name = $wpdb->prefix.'esp_question';
		$this->_question_system_name = 'COUNTRY';
		parent::__construct();
	}

	/**
	 * _count_records_to_migrate
	 *
	 * @return int
	 */
	protected function _count_records_to_migrate() {
		$questions_that_require_conversion = $this->_get_all_questions_that_require_conversion();
		$count = count( $questions_that_require_conversion );
		return $count;
	}


	/**
	 * _get_all_questions_that_require_conversion
	 *
	 * @param int $limit
	 * @param int $offset
	 * @return array
	 */
	private function _get_all_questions_that_require_conversion( $limit = 0, $offset = 0 ){
		global $wpdb;
		$SQL = "SELECT * FROM %s WHERE QST_system = %s";
		if ( $limit ) {
			$SQL .= "LIMIT %d OFFSET %d";
			$questions = $wpdb->query( $wpdb->prepare( $SQL, $this->_question_table_name, 'country', $limit, $offset ));
		} else {
			$questions = $wpdb->query( $wpdb->prepare( $SQL, $this->_question_table_name, 'country' ));
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
		$questions_to_convert_this_step = $this->_get_all_questions_that_require_conversion( $this->count_records_migrated(), $num_items_to_migrate );
		foreach( $questions_to_convert_this_step as $question ){
			if ( $question->QST_ID) {
				$this->update_question_type( $question->QST_ID, $this->_question_system_name );
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
	 * @param string $question_system_name
	 */
	private function update_question_type( $QST_ID, $question_system_name ){
		global $wpdb;
		$success = $wpdb->update(
			$this->_question_table_name,
			array( 'QST_type' => $question_system_name ),
			array( 'QST_ID' => $QST_ID ),
			array( '%s' ), //CUR_code
			array( '%d' ) //CUR_code
		);
		if ( ! $success ) {
			$this->add_error(
				sprintf(
					__( 'Could not update question system name "%1$s" for question ID=%2$d because "%3$s"', 'event_espresso' ),
					json_encode( $question_system_name ),
					$QST_ID,
					$wpdb->last_error
				)
			);
		}
	}
}

// End of file EE_DMS_4_6_0_question_types.dmsstage.php