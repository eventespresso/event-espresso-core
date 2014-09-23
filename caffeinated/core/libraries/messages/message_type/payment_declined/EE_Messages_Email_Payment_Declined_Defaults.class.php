<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Messages_Payment_Declined_Defaults class
 *
 * Handles all the defaults for Email messenger, Payment message type templates
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/defaults/email
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messages_Email_Payment_Declined_Defaults extends EE_Message_Template_Defaults {


	protected function _set_props() {
		$this->_m_name = 'email';
		$this->_mt_name = 'payment_declined';
	}


	protected function _change_templates() {
		//make sure admin context has correct "To" email address
		$this->_templates['admin']['to'] = '[EVENT_AUTHOR_FORMATTED_EMAIL]';
		$this->_templates['primary_attendee']['to'] = '[PRIMARY_REGISTRANT_EMAIL]';
		$this->_templates['admin']['content']['main'] = file_get_contents( EE_CAF_LIBRARIES . 'messages/message_type/payment_declined/templates/admin/payment-declined-message-type-admin-content.template.php', TRUE );
		$this->_templates['admin']['content']['event_list'] = '';
		$this->_templates['admin']['content']['ticket_list'] = '';
		$this->_templates['admin']['content']['attendee_list'] = '';
	}
}
