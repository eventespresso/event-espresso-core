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
 * EE_Checkin class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Checkin.class.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Checkin extends EE_Base_Class{
	
	/**
	 * Primary Key for the Check-in
	 * @var int
	 */
	protected $_CHK_ID;



	/**
	 * Foreign Key to the Registration for this Checkin
	 * @var int
	 */
	protected $_REG_ID;




	/**
	 * Foreign Key to the Datetime for this Check-in
	 * @var int
	 */
	protected $_DTT_ID;





	/**
	 * Flag for indicating whether a person has Checked in OR out. (TRUE = IN)
	 * @var bool
	 */
	protected $_CHK_in = 1;




	/**
	 * Timestamp for when the row is modified
	 * @var bool
	 */
	protected $_CHK_timestamp;




	//cached related objects
	
	/**
	 * Datetime Check-in references
	 * @var EE_Datetime
	 */
	protected $_Datetime;





	/**
	 * Registration the Check-in references
	 * @var EE_Registration
	 */
	protected $_Registration;





	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}


}