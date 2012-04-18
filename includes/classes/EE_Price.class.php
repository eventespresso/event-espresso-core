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
	*	The Promo Code to be entered to receive a discount (or a maybe scoobie snack ?)
	*
	*	@access	private
	*	@var boolean
	*/
	private $_PRC_disc_code = NULL;


	/**
	*	Whether to use dates to control when pricing starts and ends
	*
	*	@access	private
	*	@var boolean
	*/
	private $_PRC_use_dates = NULL;


	/**
	*	Whether to limit the number of discount codes available
	*
	*	@access	private
	*	@var boolean
	*/
	private $_PRC_disc_limit_qty = NULL;


	/**
	*	The number of discounts available at this price level
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_disc_qty = NULL;


	/**
	*	Does discount apply to all attendees being registered?
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_disc_apply_all = NULL;


	/**
	*	WP user id of the admin that created the discount
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_disc_wp_user = NULL;


	/**
	*	Price globally active?
	*
	*	@access	private
	*	@var boolean
	*/
	private $_PRC_is_active = NULL;





	/**
	*  Price constructor
	*
	* @access 			public
	* @param			int		 			$PRT_ID							Price type ID
	* @param			float					$PRC_amount				Price amount
	* @param			string 				$PRC_name					Price name
	* @param			string				$PRC_desc						Price description
	* @param	 		bool					$PRC_use_dates				Whether to use dates to control when pricing starts and ends
	* @param	 		bool					$PRC_disc_code				The Promo Code to be entered to receive a discount (or a maybe scoobie snack ?)
	* @param	 		int					$PRC_disc_limit_qty		Whether to limit the number of discount codes available
	* @param	 		int					$PRC_disc_qty				The number of discounts available at this price level
	* @param	 		bool					$PRC_disc_apply_all		Does discount apply to all attendees being registered?
	* @param	 		int 					$PRC_disc_wp_user		WP user id of the admin that created the discount
	* @param	 		bool					$PRC_is_active				is the Price globally active
	* @param			int 					$PRC_ID							Price ID
	*/
	public function __construct( $PRT_ID=NULL, $PRC_amount=0, $PRC_name='', $PRC_desc='', $PRC_use_dates=FALSE, $PRC_disc_code=NULL, $PRC_disc_limit_qty=FALSE, $PRC_disc_qty=0, $PRC_disc_apply_all=TRUE, $PRC_disc_wp_user=0, $PRC_is_active=TRUE, $PRC_ID=FALSE ) {
	
		$this->_PRC_ID 						= absint($PRC_ID);
		$this->_PRT_ID						= absint($PRT_ID);
		$this->_PRC_amount			= abs($PRC_amount);
		$this->_PRC_name				= wp_strip_all_tags($PRC_name);
		$this->_PRC_desc					= wp_strip_all_tags($PRC_desc);
		$this->_PRC_use_dates			= (bool)absint( $PRC_use_dates );
		$this->_PRC_disc_code			= wp_strip_all_tags( $PRC_disc_code );
		$this->_PRC_disc_limit_qty	= (bool)absint( $PRC_disc_limit_qty );
		$this->_PRC_disc_qty			= absint( $PRC_disc_qty );
		$this->_PRC_disc_apply_all	= (bool)absint( $PRC_disc_apply_all );
		$this->_PRC_disc_wp_user	= absint( $PRC_disc_wp_user );
		$this->_PRC_is_active			= (bool)absint( $PRC_is_active );

		// load Price model object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	}





	/**
	*		Set Price type ID
	*
	* 		@access		public
	*		@param		int			$PRT_ID
	*/
	public function set_type( $PRT_ID = FALSE ) {
		global $espresso_notices;
		if ( ! $PRT_ID ) {
			$espresso_notices['errors'][] = 'No price type was supplied.';
			return FALSE;
		}
		$this->_PRT_ID = absint( $PRT_ID );
		return TRUE;
	}





	/**
	*		Set Price Amount
	*
	* 		@access		public
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
	* 		@access		public
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
	*		Set use dates boolean flag
	*
	* 		@access		public
	*		@param		boolean		$PRC_use_dates
	*/
	public function set_use_dates( $PRC_use_dates = NULL ) {

		global $espresso_notices;
		if ( ! is_bool( $PRC_use_dates )) {
			$espresso_notices['errors'][] = 'No use dates boolean flag was supplied.';
			return FALSE;
		}
		$this->_PRC_use_dates = (bool)absint( $PRC_use_dates );
		return TRUE;
	}





	/**
	*		Set discount code
	*
	* 		@access		public
	*		@param		float		$PRC_disc_code
	*/
	public function set_disc_code( $PRC_disc_code = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_disc_code ) {
			$espresso_notices['errors'][] = 'No discount code was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_code = wp_strip_all_tags( $PRC_disc_code );
		return TRUE;
	}





	/**
	*		Set discount limit qty boolean flag
	*
	* 		@access		public
	*		@param		float		$PRC_disc_limit_qty
	*/
	public function set_disc_limit_qty( $PRC_disc_limit_qty = NULL ) {

		global $espresso_notices;
		if ( ! is_bool( $PRC_is_active )) {
			$espresso_notices['errors'][] = 'No discount limit qty boolean flag was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_limit_qty = (bool)absint( $PRC_disc_limit_qty );
		return TRUE;
	}





	/**
	*		Set discount qty
	*
	* 		@access		public
	*		@param		float		$PRC_disc_qty
	*/
	public function set_disc_qty( $PRC_disc_qty = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_disc_qty ) {
			$espresso_notices['errors'][] = 'No discount qty was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_qty = absint( $PRC_disc_qty );
		return TRUE;
	}





	/**
	*		Set discount applies to all boolean flag
	*
	* 		@access		public
	*		@param		float		$PRC_disc_apply_all
	*/
	public function set_disc_apply_all( $PRC_disc_apply_all = NULL ) {

		global $espresso_notices;
		if ( ! is_bool( $PRC_is_active )) {
			$espresso_notices['errors'][] = 'No disc_apply_all was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_apply_all = (bool)absint( $PRC_disc_apply_all );
		return TRUE;
	}





	/**
	*		Set Price discount WP user id
	*
	* 		@access		public
	*		@param		float		$PRC_disc_wp_user
	*/
	public function set_disc_wp_user( $PRC_disc_wp_user = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_disc_wp_user ) {
			$espresso_notices['errors'][] = 'No WP user id was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_wp_user = absint( $PRC_disc_wp_user );
		return TRUE;
	}





	/**
	*		Set Price Globally Active boolean flag
	*
	* 		@access		public
	*		@param		bool		$PRC_is_active
	*/
	public function set_globally_active( $PRC_is_active = NULL ) {

		global $espresso_notices;
		if ( ! is_bool( $PRC_is_active )) {
			$espresso_notices['errors'][] = 'No globally active boolean flag was supplied.';
			return FALSE;
		}
		$this->_PRC_is_active = (bool)absint( $PRC_is_active );
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
				'PRT_ID'						=> $this->_PRT_ID,
				'PRC_amount'				=> $this->_PRC_amount,
				'PRC_name'					=> $this->_PRC_name,
				'PRC_desc'					=> $this->_PRC_desc,
				'PRC_use_dates'			=> $this->_PRC_use_dates,
				'PRC_disc_code'			=> $this->_PRC_disc_code,
				'PRC_disc_limit_qty'	=> $this->_PRC_disc_limit_qty,
				'PRC_disc_qty'				=> $this->_PRC_disc_qty,
				'PRC_disc_apply_all'	=> $this->_PRC_disc_apply_all,
				'PRC_disc_wp_user'	=> $this->_PRC_disc_wp_user,
				'PRC_is_active'			=> $this->_PRC_is_active
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
	*	get Price use_dates
	* @access		public
	* @return type string
	*/
	public function use_dates() {
		return $this->_PRC_use_dates;
	}


	/**
	*	get Price disc_limit_qty
	* @access		public
	* @return type string
	*/
	public function disc_limit_qty() {
		return $this->_PRC_disc_limit_qty;
	}


	/**
	*	get Price disc_code
	* @access		public
	* @return type string
	*/
	public function disc_code() {
		return $this->_PRC_disc_code;
	}


	/**
	*	get Price disc_qty
	* @access		public
	* @return type string
	*/
	public function disc_qty() {
		return $this->_PRC_disc_qty;
	}


	/**
	*	get Price disc_apply_all
	* @access		public
	* @return type string
	*/
	public function disc_apply_all() {
		return $this->_PRC_disc_apply_all;
	}


	/**
	*	get Price disc_wp_user
	* @access		public
	* @return type string
	*/
	public function disc_wp_user() {
		return $this->_PRC_disc_wp_user;
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