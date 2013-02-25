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
 * EE_Messages_Validator class
 *
 * This class is the parent class for handling validation of message template fields.  Children classes follow a certain naming format (i.e. /email/EE_Messages_Email_Payment_Validator.class.php) and they simply serve the function of defining any special validation rules for the context->field for that messenger/message_type combination when templates are edited.
 *
 * @abstract
 * @package		Event Espresso
 * @subpackage	includes/core/messages/defaults
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Messages_Validator extends EE_Base {



	/**
	 * These properties just hold the name for the Messenger and Message Type (defined by child classes). These are used for retrieving objects etc.
	 * @var string
	 */
	protected $_m_name;
	protected $_mt_name;



	/**
	 * This will hold any error messages from the validation process.
	 * @var string
	 */
	protected $_error;




	/**
	 * holds the field being 
	 * @var [type]
	 */
	protected $_field;




	public function __construct() {

	}
}