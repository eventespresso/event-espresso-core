<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * Price Model
 *
 * @package				Event Espresso
 * @subpackage		includes/classes/EE_Event_Price.class.php
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Price {

	/**
  *	Event-Price adjustments
	*
	*	@access	private
  *	@var array
  */
	private $_EP_adjustments = NULL;

	/**
  *	Event-Price amount
	*
	*	@access	private
  *	@var int
  */
	private $_EP_amount = NULL;

	/**
  *	Event-Price name
	*
	*	@access	private
  *	@var string
  */
	private $_EP_name = NULL;

	/**
  *	Event-Price description
	*
	*	@access	private
  *	@var string
  */
	private $_EP_desc = NULL;

	/**
	 * Event-Price ID
	 *
	 * @access private
	 * @var type int
	 */
	private $_EP_ID = NULL;

	/**
	 *
	 * @param type float $EP_amount
	 * @param type string $EP_name
	 * @param type string $EP_desc
	 */
	public function __construct( $EP_amount=0, $EP_name='', $EP_desc='', $Base_ID=FALSE) {
		if (!$Base_ID) {
			return FALSE;
		}
		$this->_EP_ID = $Base_ID;
		$this->_EP_amount = $EP_amount;
		$this->_EP_name = $EP_name;
		$this->_EP_desc = $EP_desc;
		$this->_EP_adjustments[] = array('name'=>'Base Price', 'ID'=>$Base_ID ,'amount'=>$EP_amount);
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Event_Price.model.php');
	}

	/**
	 *	Add Event-Price adjustment
	 *
	 *	@access public
	 *	@param $adj_name;
	 *	@param $adj_is_percent;
	 *	@param $adj_amount;
	 */
	public function add_adjustment( $adj_ID=FALSE, $adj_name = FALSE, $adj_is_percent = NULL, $adj_amount = FALSE ) {
		global $espresso_notices;
		
		if ( ! $adj_ID || ! $adj_name || ! is_bool($adj_is_percent) || ! $adj_amount  ) {
			$espresso_notices['errors'][] = 'A valid price adjustment was not supplied.';
			return FALSE;
		}

		if ($adj_is_percent) {
			$percent_adj = $adj_amount;
			$adj_amount = $this->_EP_amount * $adj_amount;
			$this->_EP_adjustments[] = array('name'=>wp_strip_all_tags( $adj_name ), 'ID'=>$adj_ID, 'is_percent'=>true, 'percent_adjustment'=>"$percent_adj %", 'adjustment'=>$adj_amount);
		} else {
			$this->_EP_adjustments[] = array('name'=>wp_strip_all_tags( $adj_name ), 'ID'=>$adj_ID, 'is_percent'=>false, 'adjustment'=>$adj_amount);
		}
		
		$this->_EP_amount = max($this->_EP_amount+$adj_amount, 0);

	}

	/**
	 * return array of adjustments done to arrive at the final price
	 * @return type array
	 */
	public function adjustments() {
		return $this->_EP_adjustments;
	}

	/**
	 * return the ID of the base price
	 * @return type int
	 */
	public function ID() {
		return $this->_EP_ID;
	}

	/**
	 * return final price amount
	 * @return type float
	 */
	public function amount() {
		return $this->_EP_amount;
	}

	/**
	 * return final price name
	 * @return type string
	 */
	public function name() {
		return $this->_EP_name;
	}

	/**
	 * return final price description
	 * @return type string
	 */
	public function description() {
		return $this->_EP_desc;
	}
}

// End of file EE_Event_Price.class.php
// Location: /includes/classes/EE_Event_Price.class.php