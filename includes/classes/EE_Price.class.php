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
	*  Price constructor
	*
	* @access 		public
	* @param			int		 				$PRT_ID						Price type ID
	* @param			float					$PRC_amount				Price amount
	* @param			string 				$PRC_name					Price name
	* @param			string				$PRC_desc					Price description
	* @param	 		bool					$PRC_is_active		is the Price globally active
	* @param			int 					$PRC_ID						Price ID
	*/
	public function __construct( $PRT_ID=NULL, $PRC_amount=0, $PRC_name='', $PRC_desc='', $PRC_is_active=TRUE, $PRC_ID=FALSE ) {
		$this->_PRC_ID 					= $PRC_ID;
		$this->_PRT_ID					= $PRT_ID;
		$this->_PRC_amount 			= $PRC_amount;
		$this->_PRC_name				= $PRC_name;
		$this->_PRC_desc				= $PRC_desc;
		$this->_PRC_is_active		= $PRC_is_active;

		// load Price model object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	}


	/**
	*		Set Price type ID
	*
	* 		@access		public
	*			@param		int			$PRT_ID
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