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
  *		Price id
	*
	* 	primary key
	*
	* 	@access	private
  *		@var int
  */
	private $_PRC_id = FALSE;


  /**
  *	Price Type id
	*
	*	@access	private
  *	@var int
  */
	private $_PRT_id = NULL;


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
	*  Attendee constructor
	*
	* @access 		public
	* @param			int		 				$PRT_id						Price type id
	* @param			float					$PRC_amount				Price amount
	* @param			string 				$PRC_name					Price name
	* @param			string				$PRC_desc					Price description
	* @param	 		bool					$PRC_is_active		is the Price globally active
	* @param			int 					$PRC_id						Price id
	*/
	public function __construct( $PRT_id=NULL, $PRC_amount=0, $PRC_name='', $PRC_desc='', $PRC_is_active=TRUE, $PRC_id=FALSE ) {
		$this->_PRC_id 					= $PRC_id;
		$this->_PRT_id					= $PRT_id;
		$this->_PRC_amount 			= $PRC_amount;
		$this->_PRC_name				= $PRC_name;
		$this->_PRC_desc				= $PRC_desc;
		$this->_PRC_is_active		= $PRC_is_active;

		// load Price model object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EE_Price.model.php');
	}



	/**
	*		Set Price type id
	*
	* 		@access		public
	*			@param		int			$PRT_id
	*/
	public function set_type( $PRT_id = FALSE ) {

		global $espresso_notices;
		if ( ! $PRT_id ) {
			$espresso_notices['errors'][] = 'No price type was supplied.';
			return FALSE;
		}
		$this->_PRT_id = absint( $PRT_id );
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
	public function set_globally_active( $PRC_is_active = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_is_active || !is_bool($PRC_is_active)) {
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

		 $MODEL = EEM_Attendee::instance();

		$set_column_values = array(
				'PRT_id'					=> $this->_PRT_id,
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
		return $this->_save_to_db( array( 'ATT_ID' => $this->_ATT_ID ));
	}






	/**
	*		insert new db record
	*
	* 		@access		public
	*/
	public function insert() {
		return $this->_save_to_db();
	}






	/**
	*		get Price type
	* 		@access		public
	*/
	public function type() {
		return $this->_PRT_id;
	}



	/**
	*		get Price Amount
	* 		@access		public
	*/
	public function amount() {
		return $this->_PRC_amount;
	}



	/**
	*		get Price Name
	* 		@access		public
	*/
	public function name() {
		return $this->_PRC_name;
	}



	/**
	*		get Price description
	* 		@access		public
	*/
	public function desc() {
		return $this->_PRC_desc;
	}



	/**
	*		get is Price globally active?
	* 		@access		public
	*/
	public function is_active() {
		return $this->_PRC_is_active;
	}



	/**
	*		get Price id
	* 		@access		public
	*/
	public function id() {
		return $this->_PRT_id;
	}


	/**
	*		Search for an existing DB record for this Price
	* 		@access		public
	*/
	public function find_existing_price( $where_cols_n_values = FALSE ) {
		// load model
		$MODEL = EEM_Price::instance();
		// no search params means attendee object already exists
		if ( ! $where_cols_n_values ) {
			// search by combo of name, type, and amount
			$where_cols_n_values = array( 'PRT_id'=>$this->_PRT_id, 'PRC_amount'=>$this->_PRC_amount, 'PRC_name'=>$this->_PRC_name );
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