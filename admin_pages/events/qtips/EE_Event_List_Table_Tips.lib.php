<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Event_List_Table_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/events/qtips/EE_Event_List_Table_Tips.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_List_Table_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'attendee-column-tip',
				'target' => '.column-attendees .dashicons-groups',
				'content' => sprintf( __('%s Registrations', 'event_espresso'), EEH_Template::pretty_status(EEM_Registration::status_id_approved, FALSE, 'sentence') ),
				'options' => array( 
					'position' => array(
						'my' => 'bottom left',
						'at' => 'top right',
						'adjust' => array(
							'x' => 0,
							'y' => 0
							)
						)
					)
				),
			/** temporarily remove status qtips for for list table */
			/**1 => array(
				'content_id' => 'ee-event-status-' . EE_Datetime::active,
				'target' => '.event-status-' . EE_Datetime::active,
				'content' => $this->_event_status_legend(EE_Datetime::active),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			2 => array(
				'content_id' => 'ee-event-status-' . EE_Datetime::upcoming,
				'target' => '.event-status-' . EE_Datetime::upcoming,
				'content' => $this->_event_status_legend(EE_Datetime::upcoming),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			3 => array(
				'content_id' => 'ee-event-status-' . EE_Datetime::postponed,
				'target' => '.event-status-' . EE_Datetime::postponed,
				'content' => $this->_event_status_legend(EE_Datetime::postponed),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			4 => array(
				'content_id' => 'ee-event-status-' . EE_Datetime::sold_out,
				'target' => '.event-status-' . EE_Datetime::sold_out,
				'content' => $this->_event_status_legend(EE_Datetime::sold_out),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			5 => array(
				'content_id' => 'ee-event-status-' . EE_Datetime::cancelled,
				'target' => '.event-status-' . EE_Datetime::cancelled,
				'content' => $this->_event_status_legend(EE_Datetime::cancelled),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			6 => array(
				'content_id' => 'ee-event-status-' . EE_Datetime::expired,
				'target' => '.event-status-' . EE_Datetime::expired,
				'content' => $this->_event_status_legend(EE_Datetime::expired),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			7 => array(
				'content_id' => 'ee-event-status-' . EE_Datetime::inactive,
				'target' => '.event-status-' . EE_Datetime::inactive,
				'content' => $this->_event_status_legend(EE_Datetime::inactive),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),/**/
			);
	}

	/**
	 * output the relevant ee-status-legend with the designated status highlighted.
	 * @param  EE_Datetime constant $status What status is set (by class)
	 * @return string         The status legend with the related status highlighted
	 */
	private function _event_status_legend( $status ) {

		$status_array = array(
			'active_status' => EE_Datetime::active,
			'upcoming_status' => EE_Datetime::upcoming,
			'postponed_status' => EE_Datetime::postponed,
			'sold_out_status' => EE_Datetime::sold_out,
			'cancelled_status' => EE_Datetime::cancelled,
			'expired_status' => EE_Datetime::expired,
			'inactive_status' => EE_Datetime::inactive
		);

		return EEH_Template::status_legend( $status_array, $status );
	}

}