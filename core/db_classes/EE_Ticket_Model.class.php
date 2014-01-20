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
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Ticket_Template class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Ticket_Template.class.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Template extends EE_Base_Class{

	/**
	 * Ticket Template Primary Key
	 * @var INT
	 */
	protected $_TTM_ID;




	/**
	 * Name of the Ticket Template
	 * @var string
	 */
	protected $_TTM_name;





	/**
	 * Description of the Ticket Template
	 * @var string
	 */
	protected $_TTM_description;






	/**
	 * Name of the file for the ticket template
	 * @var string
	 */
	protected $_TTM_file;


	//relations




	/**
	 * Cached ticket objects attached to this ticket template
	 * @var EE_Ticket[]
	 */
	protected $_Ticket;






	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



} //end EE_Ticket_Template class