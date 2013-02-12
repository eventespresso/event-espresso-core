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
 * @ version		3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_Messages_Email_Payment_Defaults class
 *
 * Handles all the defaults for Email messenger, Payment message type templates
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/defaults/email
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messages_Email_Payment_Defaults extends EE_Message_Template_Defaults {



	public function __construct( EE_Messages $messages ) {
		parent::construct( $messages );
	}


	protected function _set_props() {
		$this->_m_name = 'email';
		$this->_mt_name = 'payment';
	}


	protected function _change_templates() {
		//make sure admin context has correct "To" email address
		$this->_templates['admin']['to'] = '[ADMIN_EMAIL]';
	}
}