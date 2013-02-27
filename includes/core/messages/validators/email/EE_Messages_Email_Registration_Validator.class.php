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
 * EE_Messages_Email_Registration_Validator class
 *
 * Holds any special validation rules for template fields with Email messenger and Registration message type.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/validators/email/EE_Messages_Email_Registration_Validator.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messages_Email_Registration_Validator extends EE_Messages_Validator {


	public function __construct( $fields, $context ) {
		$this->_m_name = 'email';
		$this->_mt_name = 'registration';

		parent::__construct( $fields, $context );
	}

	/**
	 * at this point no custom validation needed for this messenger/message_type combo.
	 */
	protected function _modify_validator() {}

} //end class EE_Messages_Email_Registration_Validator