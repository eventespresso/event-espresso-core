<?php

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_DMS_4_6_0_question_types
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Brent Christensen
 *
 */
class EE_DMS_4_6_0_question_types extends EE_Data_Migration_Script_Stage_Table {

	protected $_question_type_conversions = array();



	/**
	 * Just initializes the status of the migration
	 *
	 * @return EE_DMS_4_6_0_question_types
	 */
	public function __construct() {
		global $wpdb;
		$this->_pretty_name = __( 'Question Types', 'event_espresso' );
		$this->_old_table = $wpdb->prefix.'esp_question';
		$this->_question_type_conversions = array(
			'MULTIPLE' 			=> 'CHECKBOX',
			'SINGLE' 				=> 'RADIO_BTN'
		);
		//when fetching rows, because we automatically use a limit and offset
		//rows counted before migrating any rows, need to ALSO be counted after a bunch of rows were counted
		//so we need to include both the migrated rows as well as the non-migrated rows
		$QST_types_to_count = array_merge( array_keys( $this->_question_type_conversions ), $this->_question_type_conversions );
		$this->_extra_where_sql = "WHERE QST_type IN ('" . implode( "', '", $QST_types_to_count ) . "')" ;
		parent::__construct();
	}

	/**
	 * @param array $question an associative array where keys are column names and values are their values.
	 * @return null
	 */
	protected function _migrate_old_row( $question ) {
		global $wpdb;
		if ( $question['QST_ID'] && isset( $this->_question_type_conversions[ $question['QST_type'] ] )) {
			$success = $wpdb->update(
				$this->_old_table,
				array( 'QST_type' => $this->_question_type_conversions[ $question['QST_type'] ] ), 	// data
				array( 'QST_ID' => $question['QST_ID'] ),  // where
				array( '%s' ),   // data format
				array( '%d' )  // where format
			);
			if ( ! $success ) {
				$this->add_error(
					sprintf(
						__( 'Could not update question type %1$s for question ID=%2$d because "%3$s"', 'event_espresso' ),
						wp_json_encode( $question['QST_type'] ),
						$question['QST_ID'],
						$wpdb->last_error
					)
				);
			}
		}
	}
}

// End of file EE_DMS_4_6_0_question_types.dmsstage.php