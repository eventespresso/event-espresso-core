<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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
 * @subpackage			includes/classes/EE_Event_Price.class.php
 * @author					Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Price {



	/**
	 * Event ID
	 *
	 * @access private
	 * @var int
	 */
	private $_EVT_ID = NULL;


	/**
	 * Price ID
	 *
	 * @access 	private
	 * @var int
	 */
	private $_PRC_ID = NULL;


    /**
	 *	Event-Price amount - can be used to override global prices
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_EPR_amount = NULL;


	/**
	 * Price Reg Limit - the maximum number of tickets that can be sold for this price level
	 *
	 * @access 	private
	 * @var int
	 */
	private $_EPR_reg_limit = NULL;


	/**
	*	Event-Price start date - used for discounts like early bird pricing
	*
	*	@access	private
	*	@var int
	*/
	private $_EPR_start_date = NULL;
	

	/**
	*	Event-Price end date
	*
	*	@access	private
	*	@var int
	*/
	private $_EPR_end_date = NULL;


    /**
	 *	Event-Price adjustments
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_EPR_adjustments = NULL;





	/**
	 * @param  int 				$EVT_ID
	 * @param  int 				$PRC_ID
	 * @param  int 				$EPR_reg_limit
	 * @param  int 				$EPR_start_date
	 * @param  int 				$EPR_end_date
	 * @param  boolean 		$EPR_is_active
	 */
	public function __construct( $EPR_amount=0, $EPR_name='', $EPR_desc='', $Base_ID=FALSE) {
	
		if ( ! $Base_ID ) {
			return FALSE;
		}
		
		$this->_EPR_ID = $Base_ID;
		$this->_EPR_amount = $EPR_amount;
		$this->_EPR_name = $EPR_name;
		$this->_EPR_desc = $EPR_desc;
		$this->_EPR_base_price = array('name'=>'Base Price', 'ID'=>$Base_ID ,'amount'=>$EPR_amount);
		$this->_EPR_adjustments = array();
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Event_Price.model.php');
	}





	/**
	*		Set Price Type Name
	*
	* 		@access		public
	*		@param		string		$PRT_name
	*/
//	public function set_name( $PRT_name = FALSE ) {
//
//		global $espresso_notices;
//		if ( ! $PRT_name ) {
//			$espresso_notices['errors'][] = 'No name was supplied.';
//			return FALSE;
//		}
//		$this->_PRT_name = wp_strip_all_tags( $PRT_name );
//		return TRUE;
//	}





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
			$adj_amount = $this->_EPR_amount * $adj_amount;
			$this->_EPR_adjustments[] = array( 
																		'ID'=>$adj_ID,
																		'name'=>wp_strip_all_tags( $adj_name ),
																		'is_percent'=>true,
																		'percent_adjustment'=>"$percent_adj %",
																		'adjustment'=>$adj_amount
																	);
		} else {
			$this->_EPR_adjustments[] = array(
																		'ID'=>$adj_ID,
																		'name'=>wp_strip_all_tags( $adj_name ),
																		'is_percent'=>false,
																		'adjustment'=>$adj_amount
																	);
		}
		
		$this->_EPR_amount = max($this->_EPR_amount+$adj_amount, 0);

	}





	/**
	 * return array of adjustments done to arrive at the final price
	 * @return type array
	 */
	public function adjustments() {
		return $this->_EPR_adjustments;
	}





	/**
	 * return the ID of the base price
	 * @return type int
	 */
	public function ID() {
		return $this->_EPR_ID;
	}





	/**
	 * return final price amount
	 * @return type float
	 */
	public function amount() {
		return $this->_EPR_amount;
	}





	/**
	 * return final price name
	 * @return type string
	 */
	public function name() {
		return $this->_EPR_name;
	}





	/**
	 * return final price description
	 * @return type string
	 */
	public function description() {
		return $this->_EPR_desc;
	}





}

// End of file EE_Event_Price.class.php
// Location: /includes/classes/EE_Event_Price.class.php