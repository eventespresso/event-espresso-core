<?php
/**
 * Contains stage for 4.4.0 migrations
 * @package 		Event Espresso
 * @subpackage 	migrations
 * @since 			4.4
 */
 if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


/**
 * EE_DMS_4_4_0_event_message_templates
 *
 * This is the migration stage for converting any custom event message templates in EE < EE4.4 to the new system in EE > 4.4
 *
 * @package 		Event Espresso
 * @subpackage 	migrations
 * @since 			4.4
 * @author 			Darren Ethier
 */
 class EE_DMS_4_4_0_event_message_templates extends EE_Data_Migration_Script_Stage_Table {

 	/**
 	 * This property will hold the table name for event_message_templates
 	 * @var string
 	 */
 	private $_emt_table;


 	public function __construct() {
 		global $wpdb;
 		$this->_pretty_name = __('Event Message Templates', 'event_espresso');
 		$this->_old_table = $wpdb->prefix."esp_message_template_group";
 		$this->_emt_table = $wpdb->prefix."esp_event_message_template";
 		parent::__construct();
 	}



 	protected function _migrate_old_row( $old_row ) {
 		//foreach row that has an evt_id ..let's create an equivalent entry in the new event_messages_template table to link the message template to the event (since EVT_ID is no longer referenced in esp_message_template_groups )
 		global $wpdb;
 		if ( $old_row['EVT_ID'] > 0 ) {
 			$inserted = $wpdb->insert(
 				$this->_emt_table,
 				array(
 					'EVT_ID' => $old_row['EVT_ID'],
 					'GRP_ID' => $old_row['GRP_ID'],
 					),
 				array( '%d', '%d' )
 				);
 			if ( FALSE === $inserted ) {
 				$this->add_error( sprintf( __("Error in inserting a row into {$this->_emt_table} setting EVT_ID = %d and GRP_ID = %d", "event_espresso"), $old_row['EVT_ID'], $old_row['GRP_ID'] ) );
 			}
 		}
 	}
 }  //end EE_DMS_4_4_0_event_message_template
