<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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
 * EE_Status class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_CLASSES . 'EE_Base_Class.class.php' );
class EE_Status extends EE_Base_Class{
	
	/**
	 * status primary key
	 * 
	 * @access protected
	 * @var int
	 */
	protected $_STS_ID=FALSE;
	
	/**
	 * staus code (one-word description)
	 * @var string
	 */
	protected $_STS_code=NULL;
	
	/**
	 * type
	 * @access protected
	 * @var string
	 */
	protected $_STS_type=NULL;
	/**
	 * whetehr this status is editable
	 * @var boolean
	 */
	protected $_STS_can_edit=NULL;
	/**
	 * Longer description of the status
	 * @var string
	 */
	protected $_STS_desc=NULL;
	/**
	 * Whether or not to consider this status open. The definition of 'open' varies depending
	 * on the STS_type, but it's generally synonymous with 'ok','active','available',etc.
	 * @var boolean
	 */
	protected $_STS_open=NULL;
	
	/**
	 *
	 * @var EE_Registration[]
	 */
	protected $_Registration;
	/**
	 * 
	 * @var EE_Payment[] 
	 */
	protected $_Payment;
	/**
	 *
	 * @var EE_Transaction[]
	 */
	protected $_Transaction;


	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
	
	/**
	 * Gets code
	 * @return string
	 */
	function code() {
		$translated_code = '';
		switch ( $this->get('STS_code' ) ) {
			case 'ACTIVE' :
				$translated_code = __('ACTIVE', 'event_espresso');
				break;
			case 'REGISTRATION_CLOSED' :
				$translated_code = __('REGISTRATION CLOSED', 'event_espresso');
				break;
			case 'DELETED' :
				$translated_code = __('DELETED', 'event_espresso');
				break;
			case 'DENIED' :
				$translated_code = __('DENIED', 'event_espresso');
				break;
			case 'DRAFT' :
				$translated_code = __('DRAFT', 'event_espresso');
				break;
			case 'SENT' :
				$translated_code = __('SENT', 'event_espresso');
				break;
			case 'EXPIRED' :
				$translated_code = __('EXPIRED', 'event_espresso');
				break;
			case 'NOT_ACTIVE' :
				$translated_code = __('NOT ACTIVE', 'event_espresso');
				break;
			case 'REGISTRATION_NOT_OPEN' :
				$translated_code = __('REGISTRATION NOT OPEN', 'event_espresso');
				break;
			case 'ONGOING' :
				$translated_code = __('ONGOING', 'event_espresso');
				break;
			case 'REGISTRATION_OPEN' :
				$translated_code = __('REGISTRATION OPEN', 'event_espresso');
				break;
			case 'CANCELLED' :
				$translated_code = __('CANCELLED', 'event_espresso');
				break;
			case 'DECLINED' :
				$translated_code = __('DECLINED', 'event_espresso');
				break;
			case 'FAILED' :
				$translated_code = __('FAILED', 'event_espresso');
				break;
			case 'PENDING' :
				$translated_code = __('PENDING', 'event_espresso');
				break;
			case 'APPROVED' :
				$translated_code = __('APPROVED', 'event_espresso');
				break;
			case 'NOT_APPROVED' :
				$translated_code = __('NOT APPROVED', 'event_espresso');
				break;
			case 'SECONDARY' :
				$translated_code = __('SECONDARY', 'event_espresso');
				break;
			case 'COMPLETE' :
				$translated_code = __('COMPLETE', 'event_espresso');
				break;
			case 'INCOMPLETE' :
				$translated_code = __('INCOMPLETE', 'event_espresso');
				break;
			case 'OVERPAID' :
				$translated_code = __('OVERPAID', 'event_espresso');
				break;
			case 'OPEN' :
				$translated_code = __('OPEN', 'event_espresso');
				break;

			default :
				$translated_code = $this->get('STS_code');
				break;
	    }

	    //return filtered translated code so if addons add their own code they can make sure it's translatable as well (if they want to do it this way).
	    return apply_filters('FHEE__EE_Status__code__translated_status_code', $translated_code);
	}

	/**
	 * Sets code
	 * @param string $code
	 * @return boolean
	 */
	function set_code($code) {
		return $this->set('STS_code', $code);
	}
	/**
	 * Gets desc
	 * @return string
	 */
	function desc() {
		return $this->get('STS_desc');
	}

	/**
	 * Sets desc
	 * @param string $desc
	 * @return boolean
	 */
	function set_desc($desc) {
		return $this->set('STS_desc', $desc);
	}
	/**
	 * Gets type
	 * @return string
	 */
	function type() {
		return $this->get('STS_type');
	}

	/**
	 * Sets type
	 * @param string $type
	 * @return boolean
	 */
	function set_type($type) {
		return $this->set('STS_type', $type);
	}
	/**
	 * Gets can_edit
	 * @return boolean
	 */
	function can_edit() {
		return $this->get('STS_can_edit');
	}

	/**
	 * Sets can_edit
	 * @param boolean $can_edit
	 * @return boolean
	 */
	function set_can_edit($can_edit) {
		return $this->set('STS_can_edit', $can_edit);
	}
	/**
	 * Gets open
	 * @return boolean
	 */
	function open() {
		return $this->get('STS_open');
	}

	/**
	 * Sets open
	 * @param boolean $open
	 * @return boolean
	 */
	function set_open($open) {
		return $this->set('STS_open', $open);
	}


}

/* End of file EE_Answer.class.php */
/* Location: /includes/classes/EE_Answer.class.php */