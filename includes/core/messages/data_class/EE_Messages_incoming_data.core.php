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
 * EE_Messages_incoming_data
 *
 * This is the parent class for all incoming data to EE_Messages objects.  We create different data handlers for different incoming data depending on the message types set requirements.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/data_class/EE_Messages_incoming_data.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

abstract class EE_Messages_incoming_data {


	/**
	 * user id for logged in user when data collected
	 * @var string
	 */
	public $user_id;


	/**
	 * IP Address of browser used
	 * @var
	 */
	public $ip_address;


	/**
	 * other browser info when data collected
	 */
	public $user_agent;
	public $init_access;
	public $last_access;


	/**
	 * Holds billing info about the transaction
	 * @var mixed (array|string)
	 */
	public $billing_info;


	/**
	 * The registrations details from the cart
	 * @var array
	 */
	public $reg_info;



	/**
	 * will hold an array of events assembled from $reg_info
	 * @var array
	 */
	public $events;



	/**
	 * will hold an array of attendees assembled from the $reg_info
	 * @var array
	 */
	public $attendees;




	/**
	 * Will hold billing data assembled from $billing_info (if present)
	 * @var mixed (array|null)
	 */
	public $billing;



	/**
	 * Will hold tax details from transaction (if present)
	 * @var int (?)
	 */
	public $taxes;



	/**
	 * holds the grand total price object
	 * @var obj
	 */
	public $grand_total_price_object;




	/**
	 * Will hold the final transaction object (EE_Transaction)
	 * @var array (of EE_Transaction objects);
	 */
	public $txn;



	/**
	 * Will hold the label for the txn status
	 * @var string
	 */
	public $txn_status;




	/**
	 * Will hold the final registration object (EE_Registration)
	 * @var array (of EE_Registration objects)
	 */
	public $reg_objs;



	/**
	 * Will hold an array of primary attendee data (if present)
	 * @var array
	 */
	public $primary_attendee_data;




	/**
	 * This is just an internal object used for passing around the incoming data.
	 * @var object
	 */
	protected $_data;




	/**
	 * constructor
	 * @param mixed $data incoming data object|array.  Suggested that child classes use typehinting for expected data object.  But here parent will be generic because we don't know what's coming in.
	 */
	public function __construct( $data ) {
		$this->_data = $data;
		$this->_setup_data();
		
	}



	/**
	 * Every child class has to setup the data object !
	 * @return void
	 */
	abstract protected function _setup_data();



	/**
	 * only purpose is to return the data 
	 *
	 * @access public
	 * @return object the formatted data object!
	 */
	public function data() {
		return $this->_data;
	}


} //end EE_Messages_incoming_data class