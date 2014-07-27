<?php
/**
 * This file contains the EE_Messages_Template_ Pack_Default
 * @package      Event Espresso
 * @subpackage messages
 * @since           4.5.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This is the default messages template pack.
 *
 * @package        Event Espresso
 * @subpackage  messages
 * @since            4.5.0
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
				),
			'html' => array(
				'receipt'
				)
			);
		$this->_default_variation_labels= array(
			'email' => __('Default', 'event_espresso' ),
			'html' =>  __('Simple', 'event_espresso' )
			 );
		$this->_variations = array(
			'html' => array(
				'receipt' =>
					array(
					'bauhaus' => __('Bauhaus', 'event_espresso'),
					'ejs' => __('Elliot Jay Stocks', 'event_espresso'),
					'horizon' => __('Horizon', 'event_espresso'),
					'lola' => __('Lola', 'event_espresso'),
					'tranquility' => __('Tranquility', 'event_espresso'),
					'union' => __('Union', 'event_espresso')
					)
				)
			);
	}
}
