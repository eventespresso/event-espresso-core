<?php
/**
 * This file contains the EE_Messages_Template_ Pack_Default
 * @package      Event Espresso
 * @subpackage messages
 * @since           %VER%
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This is the default messages template pack.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            %VER%
 * @author          Darren Ethier
 */
class  EE_Messages_Template_Pack_Default extends EE_Messages_Template_Pack {

	public function _set_props() {
		$this->label = __('Default', 'event_espresso');
		$this->dbref = 'default';
		$this->description = __('This is the default template pack included with Event Espress core messages system.', 'event_espresso');
		$this->_base_url = EE_PLUGIN_DIR_URL . 'core/libraries/messages/defaults/default/';
		$this->_base_path = EE_LIBRARIES . 'messages/defaults/default/';
		$this->_supports = array(
			'email' => array(
				'cancelled_registration', 'declined_registration', 'not_approved_registration', 'pending_approval', 'registration',
				'payment_declined', 'payment', 'payment_refund', 'payment_reminder'
				)
			);
		$this->_variations = array(
			'email' => array( 'default' => __( 'Default', 'event_espresso' ) )
			);
	}
}
