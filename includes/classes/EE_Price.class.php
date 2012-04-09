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
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Price class
 *
 * @package			Event Espresso
 * @subpackage	includes/classes/EE_Price.class.php
 * @author			Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Price {

  /**
  *		Price ID
	*
	* 	primary key
	*
	* 	@access	private
  *		@var int
  */
	private $_PRC_ID = FALSE;


  /**
  *	Price Type ID
	*
	*	@access	private
  *	@var int
  */
	private $_PRT_ID = NULL;


  /**
  *	Price amount
	*
	*	@access	private
  *	@var int
  */
	private $_PRC_amount = NULL;


  /**
  *	Price name
	*
	*	@access	private
  *	@var string
  */
	private $_PRC_name = NULL;


  /**
  *	Price description
	*
	*	@access	private
  *	@var string
  */
	private $_PRC_desc = NULL;


  /**
  *	Price globally active?
	*
	*	@access	private
  *	@var bool
  */
	private $_PRC_is_active = NULL;


	/**
	 * Type Key, needed to changed Price Type object reference
	 *
	 * @access private
	 * @var string
	 */
	private $_Type_Key = NULL;


	/**
  *	Price adjustments
	*
	*	@access	private
  *	@var array
  */
	private $_PRC_adjustments = NULL;


	/**
	 *	Price Type object
	 *
	 *	@access private
	 *	@var object
	 */
	private $_Price_Type = NULL;


	/**
	*  Attendee constructor
	*
	* @access 		public
	* @param			int		 				$PRT_ID						Price type ID
	* @param			float					$PRC_amount				Price amount
	* @param			string 				$PRC_name					Price name
	* @param			string				$PRC_desc					Price description
	* @param	 		bool					$PRC_is_active		is the Price globally active
	* @param			int 					$PRC_ID						Price ID
	*/
	public function __construct( $PRT_ID=NULL, $PRC_amount=0, $PRC_name='', $PRC_desc='', $PRC_is_active=TRUE, $Price_Type=FALSE, $Type_Key=FALSE, $PRC_ID=FALSE ) {
		$this->_PRC_ID 					= $PRC_ID;
		$this->_PRT_ID					= $PRT_ID;
		$this->_PRC_amount 			= $PRC_amount;
		$this->_PRC_name				= $PRC_name;
		$this->_PRC_desc				= $PRC_desc;
		$this->_PRC_is_active		= $PRC_is_active;
		$this->_Price_Type      = $Price_Type;
		$this->_Type_Key        = $Type_Key;
		$this->_PRC_adjustments = array();


		// load Price model object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EE_Price.model.php');
	}


	/**
	 *	Add Price adjustment
	 *
	 *	@access public
	 *	@param $adj_name;
	 *	@param $adj_is_percent;
	 *	@param $adj_amount;
	 */
	public function add_adjustment( $adj_name = FALSE, $adj_is_percent = NULL, $adj_amount = FALSE ) {
		global $espresso_notices;
		if ( ! $adj_name || ! is_bool($adj_is_percent) || ! $adj_amount  ) {
			$espresso_notices['errors'][] = 'A valid price adjustment was not supplied.';
			return FALSE;
		}
		if (empty($this->_PRC_adjustments)) {
			$this->_PRC_adjustments[] = array('name'=>'base price', 'amount'=>$this->_PRC_amount);
		}

		if ($adj_is_percent) {
			$percent_adj = $adj_amount;
			$adj_amount = $this->_PRC_amount * $adj_amount;
			$this->_PRC_adjustments[] = array('name'=>wp_strip_all_tags( $adj_name ), 'is_percent'=>true, 'percent_adjustment'=>"$percent_adj %", 'adjustment'=>$adj_amount);
		} else {
			$this->_PRC_adjustments[] = array('name'=>wp_strip_all_tags( $adj_name ), 'is_percent'=>false, 'adjustment'=>$adj_amount);
		}

		$this->_PRC_amount = max($this->_PRC_amount+$adj_amount, 0);

	}


	/**
	*		Set Price type ID
	*
	* 		@access		public
	*			@param		int			$PRT_ID
	*/
	public function set_type( $PRT_ID = FALSE ) {
		$MODEL = EEM_Price::instance();
		global $espresso_notices;
		if ( ! $PRT_ID ) {
			$espresso_notices['errors'][] = 'No price type was supplied.';
			return FALSE;
		}
		$this->_PRT_ID = absint( $PRT_ID );
		$this->_Price_Type = $MODEL->get_price_type_reference( $PRT_ID, $this->_Type_Key );
		return TRUE;
	}


	/**
	*		Set Price Amount
	*
	* 	@access		public
	*		@param		float		$PRC_amount
	*/
	public function set_amount( $PRC_amount = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_amount ) {
			$espresso_notices['errors'][] = 'No amount was supplied.';
			return FALSE;
		}
		$this->_PRC_amount = abs( $PRC_amount );
		return TRUE;
	}


	/**
	*		Set Price Name
	*
	* 	@access		public
	*		@param		string		$PRC_name
	*/
	public function set_name( $PRC_name = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_name ) {
			$espresso_notices['errors'][] = 'No name was supplied.';
			return FALSE;
		}
		$this->_PRC_name = wp_strip_all_tags( $PRC_name );
		return TRUE;
	}


	/**
	*		Set Price Description
	*
	*		@access		public
	*		@param		string		$PRC_desc
	*/
	public function set_description( $PRC_desc = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_desc ) {
			$espresso_notices['errors'][] = 'No description was supplied.';
			return FALSE;
		}
		$this->_PRC_desc = wp_strip_all_tags( $PRC_desc );
		return TRUE;
	}


	/**
	*		Set Price Globally Active
	*
	* 	@access		public
	*		@param		bool		$PRC_is_active
	*/
	public function set_globally_active( $PRC_is_active = NULL ) {

		global $espresso_notices;
		if ( !is_bool($PRC_is_active)) {
			$espresso_notices['errors'][] = 'No globally active flag was supplied.';
			return FALSE;
		}
		$this->_PRC_is_active = $PRC_is_active;
		return TRUE;
	}

	/**
	*		save object to db
	*
	* 		@access		private
	* 		@param		array		$where_cols_n_values
	*/
	private function _save_to_db( $where_cols_n_values = FALSE ) {

		 $MODEL = EEM_Price::instance();

		$set_column_values = array(
				'PRT_ID'					=> $this->_PRT_ID,
				'PRC_amount'			=> $this->_PRC_amount,
				'PRC_name'				=> $this->_PRC_name,
				'PRC_desc'				=> $this->_PRC_desc,
				'PRC_is_active'		=> $this->_PRC_is_active
		);

		if ( $where_cols_n_values ){
			$results = $MODEL->update ( $set_column_values, $where_cols_n_values );
		} else {
			$results = $MODEL->insert ( $set_column_values );
		}

		return $results;
	}






	/**
	*		update existing db record
	*
	* 		@access		public
	*/
	public function update() {
		return $this->_save_to_db( array( 'PRC_ID' => $this->_PRC_ID ));
	}






	/**
	*	insert new db record
	*
	* @access		public
	*/
	public function insert() {
		return $this->_save_to_db();
	}

	/**
	*	get Price ID
	* @access		public
	* @return type int
	*/
	public function ID() {
		return $this->_PRC_ID;
	}


	/**
	*	get Price type
	* @access		public
	* @return type int
	*/
	public function type() {
		return $this->_PRT_ID;
	}



	/**
	*	get Price Amount
	* @access		public
	* @return type float
	*/
	public function amount() {
		return $this->_PRC_amount;
	}



	/**
	*	get Price Name
	* @access		public
	* @return type string
	*/
	public function name() {
		return $this->_PRC_name;
	}



	/**
	*	get Price description
	* @access		public
	* @return type string
	*/
	public function desc() {
		return $this->_PRC_desc;
	}



	/**
	*	get is Price globally active?
	* @access		public
	* @return type bool
	*/
	public function is_active() {
		return $this->_PRC_is_active;
	}


	/**
	 *	get adjustments array
	 *	@access public
	 * @return type array
	 */
	public function adjustments() {
		return $this->_PRC_adjustments;
	}

	/**
	 *	get type name
	 *	@access public
	 *	@return type string
	 */
	public function type_name() {
		return $this->_Price_Type->name();
	}

	/**
	 *	get is type tax
	 * @access public
	 * @return type bool
	 */
	public function type_is_tax() {
		return $this->_Price_Type->is_tax();
	}

	/**
	 * get is type percent
	 * @access public
	 * @return type bool
	 */
	public function type_is_percent() {
		return $this->_Price_Type->is_percent();
	}

	/**
	 * get is type global
	 * @access public
	 * @return type bool
	 */
	public function type_is_global() {
		return $this->_Price_Type->is_global();
	}

	/**
	 * get type order
	 * @access public
	 * @return type int
	 */
	public function type_order() {
		return $this->_Price_Type->order();
	}

	/**
	*		Search for an existing DB record for this Price
	* 		@access		public
	*/
	public function find_existing_price( $where_cols_n_values = FALSE ) {
		// load model
		$MODEL = EEM_Price::instance();
		// no search params means price object already exists
		if ( ! $where_cols_n_values ) {
			// search by combo of name, type, and amount
			$where_cols_n_values = array( 'PRT_ID'=>$this->_PRT_ID, 'PRC_amount'=>$this->_PRC_amount, 'PRC_name'=>$this->_PRC_name );
		}

		if ( $price = $MODEL->get_price( $where_cols_n_values )) {
			return $price;
		} else {
			return FALSE;
		}

	}









	/**
	 *		@ override magic methods
	 *		@ return void
	 */
	public function __get($a) { return FALSE; }
	public function __set($a,$b) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }


}

/* End of file EE_Price.class.php */
/* Location: /includes/classes/EE_Price.class.php */