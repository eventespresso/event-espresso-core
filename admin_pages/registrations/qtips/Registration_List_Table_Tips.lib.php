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
 * Registration_List_Table_Tips	
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/registrations/qtips/Registration_List_Table_Tips.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Registration_List_Table_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'registration-trash-lock',
				'target' => '.ee-lock-icon',
				'content' => $this->_registration_trash_message(),
				),
			/** removing status strips for now because they are triggered anywhere on the row. */
			/**1 => array(
				'content_id' => 'registration-status-' . EEM_Registration::status_id_approved,
				'target' => '.reg-status-' . EEM_Registration::status_id_approved,
				'content' => $this->_registration_status_legend(EEM_Registration::status_id_approved),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			2 => array(
				'content_id' => 'registration-status-' . EEM_Registration::status_id_pending_payment,
				'target' => '.reg-status-' . EEM_Registration::status_id_pending_payment,
				'content' => $this->_registration_status_legend(EEM_Registration::status_id_pending_payment),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			3 => array(
				'content_id' => 'registration-status-' . EEM_Registration::status_id_not_approved,
				'target' => '.reg-status-' . EEM_Registration::status_id_not_approved,
				'content' => $this->_registration_status_legend(EEM_Registration::status_id_not_approved),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			4 => array(
				'content_id' => 'registration-status-' . EEM_Registration::status_id_declined,
				'target' => '.reg-status-' . EEM_Registration::status_id_declined,
				'content' => $this->_registration_status_legend(EEM_Registration::status_id_declined),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				),
			5 => array(
				'content_id' => 'registration-status-' . EEM_Registration::status_id_cancelled,
				'target' => '.reg-status-' . EEM_Registration::status_id_cancelled,
				'content' => $this->_registration_status_legend(EEM_Registration::status_id_cancelled),
				'options' => array(
					'position' => array(
						'target' => 'mouse'
						)
					)
				)/**/
			);
	}



	private function _registration_trash_message() {
		return '<p>' . __('This lock-icon means that this registration cannot be trashed.  Registrations that belong to a transaction that has payments cannot be trashed.  If you wish to trash this registration then you must delete all payments attached to the related transaction first.', 'event_espresso') . '</p>';
	}





	/**
	 * output the relevant ee-status-legend with the designated status highlighted.
	 * @param  EEM_Registration constant $status What status is set (by class)
	 * @return string         The status legend with the related status highlighted
	 */
	private function _registration_status_legend( $status ) {

		$status_array = array(
			'approved_status' => EEM_Registration::status_id_approved,
			'pending_status' => EEM_Registration::status_id_pending_payment,
			'not_approved' => EEM_Registration::status_id_not_approved,
			'declined_status' => EEM_Registration::status_id_declined,
			'cancelled_status' => EEM_Registration::status_id_cancelled
			);

		return EEH_Template::status_legend( $status_array, $status );
	}
}