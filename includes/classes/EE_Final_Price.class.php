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
 * Final Price class
 *
 * @package				Event Espresso
 * @subpackage		includes/classes/EE_Final_Price.class.php
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Final_Price {


	/**
	 * Base Price ID
	 *
	 * @access 	private
	 * @var int
	 */
	private $_PRC_ID = NULL;


    /**
	 *	Final-Price amount - can be used to override global prices
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_FPR_amount = NULL;

    /**
	 *	Final-Price name
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_FPR_name = NULL;
	
    /**
	 *	Final-Price name
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_FPR_desc = NULL;
	
	/**
	 * Price Reg Limit - the maximum number of tickets that can be sold for this price level
	 *
	 * @access 	private
	 * @var int
	 */
	private $_FPR_reg_limit = NULL;


    /**
	 *	Event-Price adjustments
	 *
	 *	@access	private
	 *	@var array
	 */
	private $_FPR_adjustments = NULL;





/**
 * @param type $Base_ID
 * @return boolean 
 */
	public function __construct( $Base_ID=FALSE ) {
	
		if ( ! $Base_ID ) {
			return FALSE;
		}
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$EPM = EEM_Price::instance();
		$base_price = $EPM->get_price_by_ID($Base_ID);
		$this->_EPR_ID = $Base_ID;
		$this->_FPR_amount = $base_price->amount();
		$this->_FPR_name = $base_price->name();
		$this->_FPR_desc = $base_price->desc();
		$this->_FPR_reg_limit = $base_price->reg_limit();
		$this->_FPR_adjustments[] = array('name'=>'Base Price', 'ID'=>$Base_ID ,'amount'=>$base_price->amount());
		return TRUE;
	}


	
	/**
	 *	Add Final-Price adjustment
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
			$adj_amount = $this->_FPR_amount * $adj_amount;
			$this->__FPR_adjustments[] = array( 
																		'ID'=>$adj_ID,
																		'name'=>wp_strip_all_tags( $adj_name ),
																		'is_percent'=>true,
																		'percent_adjustment'=>"$percent_adj %",
																		'adjustment'=>$adj_amount
																	);
		} else {
			$this->__FPR_adjustments[] = array(
																		'ID'=>$adj_ID,
																		'name'=>wp_strip_all_tags( $adj_name ),
																		'is_percent'=>false,
																		'adjustment'=>$adj_amount
																	);
		}
		
		$this->_FPR_amount = max($this->_FPR_amount+$adj_amount, 0);

	}





	/**
	 * return array of adjustments done to arrive at the final price
	 * @return type array
	 */
	public function adjustments() {
		return $this->__FPR_adjustments;
	}





	/**
	 * return the ID of the base price
	 * @return type int
	 */
	public function ID() {
		return $this->_PRC_ID;
	}





	/**
	 * return final price amount
	 * @return type float
	 */
	public function amount() {
		return $this->_FPR_amount;
	}





	/**
	 * return final price name
	 * @return type string
	 */
	public function name() {
		return $this->_FPR_name;
	}





	/**
	 * return final price description
	 * @return type string
	 */
	public function description() {
		return $this->_FPR_desc;
	}





}

// End of file EE_Final_Price.class.php
// Location: /includes/classes/EE_Final_Price.class.php