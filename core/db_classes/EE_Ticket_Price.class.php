<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link				{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Ticket_Price class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Ticket_Price.class.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Price extends EE_Base_Class{



	/**
	 * Primary Key for Ticket Price
	 * @var int
	 */
	protected $_TKP_ID;



	/**
	 * Foreign Key to related Ticket
	 * @var int
	 */
	protected $_TKT_ID;




	/**
	 * Foreign Key to related Price
	 * @var int
	 */
	protected $_PRC_ID;


	//related objects
	
	/**
	 * Related Ticket object
	 * @var EE_Ticket
	 */
	protected $_Ticket;




	/**
	 * Related Price object
	 * @var EE_Price
	 */
	protected $_Price;



	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}


}