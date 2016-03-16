<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

/**
 * EE_Message_List_Table_Tips
 *
 * Qtip config for the event editor.
 *
 * @package		Event Espresso
 * @subpackage	/admin_pages/registrations/qtips/EE_Message_List_Table_Tips.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Message_List_Table_Tips extends EE_Qtip_Config {


	protected function _set_tips_array() {
		$this->_qtipsa = array(
			0 => array(
				'content_id' => 'message_status-' . EEM_Message::status_sent,
				'target' => '.msg-status-' . EEM_Message::status_sent,
				'content' => $this->_message_status_legend( EEM_Message::status_sent ),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						)
					)
				),
			1 => array(
				'content_id' => 'message_status-' . EEM_Message::status_idle,
				'target' => '.msg-status-' . EEM_Message::status_idle,
				'content' => $this->_message_status_legend( EEM_Message::status_idle ),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						)
					)
				),
			2 => array(
				'content_id' => 'message_status-' . EEM_Message::status_failed,
				'target' => '.msg-status-' . EEM_Message::status_failed,
				'content' => $this->_message_status_legend( EEM_Message::status_failed ),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						)
					)
				),
			3 => array(
				'content_id' => 'message_status-' . EEM_Message::status_resend,
				'target' => '.msg-status-' . EEM_Message::status_resend,
				'content' => $this->_message_status_legend( EEM_Message::status_resend ),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						)
					)
				),
			4 => array(
				'content_id' => 'message_status-' . EEM_Message::status_incomplete,
				'target' => '.msg-status-' . EEM_Message::status_incomplete,
				'content' => $this->_message_status_legend( EEM_Message::status_incomplete ),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						)
					)
				),
			5 => array(
				'content_id' => 'message_status-' . EEM_Message::status_retry,
				'target' => '.msg-status-' . EEM_Message::status_retry,
				'content' => $this->_message_status_legend( EEM_Message::status_retry ),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						)
					)
				),
			6 => array(
				'content_id' => 'message_status-' . EEM_Message::status_debug_only,
				'target' => '.msg-status-' . EEM_Message::status_debug_only,
				'content' => $this->_message_status_legend( EEM_Message::status_debug_only ),
				'options' => array(
					'position' => array(
						'target' => 'mouse',
						)
					)
				)
			);
	}





	/**
	 * output the relevant ee-status-legend with the designated status highlighted.
	 * @param  EEM_Message constant $status What status is set (by class)
	 * @return string         The status legend with the related status highlighted
	 */
	private function _message_status_legend( $status ) {

		$status_array = array(
			'sent_status' => EEM_Message::status_sent,
			'idle_status' => EEM_Message::status_idle,
			'failed_status' => EEM_Message::status_failed,
			'resend_status' => EEM_Message::status_resend,
			'incomplete_status' => EEM_Message::status_incomplete,
			'retry_status' => EEM_Message::status_retry,
			);

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$status_array['debug_only_status'] = EEM_Message::status_debug_only;
		}

		return EEH_Template::status_legend( $status_array, $status );
	}
}