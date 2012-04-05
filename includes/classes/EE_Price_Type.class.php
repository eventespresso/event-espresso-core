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
 * @subpackage	includes/classes/EE_Price_Type.class.php
 * @author			Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Price_Type {

  /**
  *		Price Type id
	*
	* 	primary key
	*
	* 	@access	private
  *		@var int
  */
	private $_PRT_id = FALSE;


  /**
  *	Price Type name
	*
	*	@access	private
  *	@var string
  */
	private $_PRT_name = NULL;


  /**
  *	Price type a tax?
	*
	*	@access	private
  *	@var bool
  */
	private $_PRT_is_tax = NULL;


  /**
  *	Price type a percentage?
	*
	*	@access	private
  *	@var bool
  */
	private $_PRT_is_percent = NULL;


  /**
  *	Price type a global?
	*
	*	@access	private
  *	@var bool
  */
	private $_PRT_is_global = NULL;


  /**
  *	Price type order
	*
	*	@access	private
  *	@var int
  */
	private $_PRT_order = NULL;


		/**
	*  Attendee constructor
	*
	* @access 		public
	* @param			int		 				$PRT_id						Price type id
	* @param			string				$PRT_name					Price Type name
	* @param			bool	 				$PRT_is_tax				is price type a tax?
	* @param			bool					$PRT_is_percent		is price type a percent?
	* @param	 		bool					$PRT_is_global		is price type a global?
	* @param			int 					$PRT_order						Price Type order
	*/
	public function __construct( $PRT_name='', $PRT_is_tax=FALSE, $PRT_is_percent=FALSE, $PRT_is_global=FALSE, $PRT_order=0, $PRT_id=FALSE ) {
		$this->_PRT_id					= $PRT_id;
		$this->_PRT_name				= $PRT_name;
		$this->_PRT_is_tax			= $PRT_is_tax;
		$this->_PRT_is_percent	= $PRT_is_percent;
		$this->_PRT_is_global		= $PRT_is_global;
		$this->_PRT_order				= $PRT_order;

		// load Price model object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EE_Price_Type.model.php');
	}



	/**
	*		Set Price Type Name
	*
	* 	@access		public
	*		@param		string		$PRT_name
	*/
	public function set_name( $PRT_name = FALSE ) {

		global $espresso_notices;
		if ( ! $PRT_name ) {
			$espresso_notices['errors'][] = 'No name was supplied.';
			return FALSE;
		}
		$this->_PRT_name = wp_strip_all_tags( $PRT_name );
		return TRUE;
	}


	/**
	*		Set Price Type is tax
	*
	* 	@access		public
	*		@param		bool		$PRT_is_tax
	*/
	public function set_is_tax( $PRT_is_tax = NULL ) {

		global $espresso_notices;
		if (!is_bool($PRT_is_tax)) {
			$espresso_notices['errors'][] = 'No tax flag was supplied.';
			return FALSE;
		}
		$this->_PRT_is_tax = $PRT_is_tax;
		return TRUE;
	}


	/**
	*		Set Price Type a percent
	*
	* 	@access		public
	*		@param		bool		$PRT_is_percent
	*/
	public function set_is_percent( $PRT_is_percent = NULL ) {

		global $espresso_notices;
		if (!is_bool($PRT_is_percent)) {
			$espresso_notices['errors'][] = 'No percent flag was supplied.';
			return FALSE;
		}
		$this->_PRT_is_percent = $PRT_is_percent;
		return TRUE;
	}


	/**
	*		Set Price Type a global
	*
	* 	@access		public
	*		@param		bool		$PRT_is_global
	*/
	public function set_is_global ( $PRT_is_global = NULL ) {

		global $espresso_notices;
		if (!is_bool($PRT_is_global)) {
			$espresso_notices['errors'][] = 'No percent flag was supplied.';
			return FALSE;
		}
		$this->_PRT_is_global = $PRT_is_global;
		return TRUE;
	}


	/**
	*		Set Price Type order
	*
	* 	@access		public
	*		@param		bool		$PRT_order
	*/
	public function set_order( $PRT_order = FALSE ) {

		global $espresso_notices;
		if ( ! $PRT_order ) {
			$espresso_notices['errors'][] = 'No order was supplied.';
			return FALSE;
		}
		$this->_PRT_order = absint( $PRT_order );
		return TRUE;
	}

	/**
	*		save object to db
	*
	* 		@access		private
	* 		@param		array		$where_cols_n_values
	*/
	private function _save_to_db( $where_cols_n_values = FALSE ) {

		 $MODEL = EEM_Price_Type::instance();

		$set_column_values = array(
				'PRT_name'				=> $this->_PRT_name,
				'PRT_is_tax'			=> $this->_PRT_is_tax,
				'PRT_is_percent'	=> $this->_PRT_is_percent,
				'PRT_is_global'		=> $this->_PRT_is_global,
				'PRT_order'				=> $this->_PRT_order
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
		return $this->_save_to_db( array( 'PRT_id' => $this->_PRT_id ));
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
	*		get Price Type id
	* 		@access		public
	*/
	public function id() {
		return $this->_PRT_id;
	}



	/**
	*		get Price Type Name
	* 		@access		public
	*/
	public function name() {
		return $this->_PRT_name;
	}



	/**
	*		get is Price Type a tax?
	* 		@access		public
	*/
	public function is_tax() {
		return $this->_PRT_is_tax;
	}



	/**
	*		get is Price Type a percent?
	* 		@access		public
	*/
	public function is_percent() {
		return $this->_PRT_is_percent;
	}


	/**
	*		get is Price Type a global?
	* 		@access		public
	*/
	public function is_global() {
		return $this->_PRT_is_global;
	}


	/**
	*		get Price Type order
	* 		@access		public
	*/
	public function order() {
		return $this->_PRT_order;
	}


	/**
	*		Search for an existing DB record for this Price Type
	* 		@access		public
	*/
	public function find_existing_price_type( $where_cols_n_values = FALSE ) {
		// load model
		$MODEL = EEM_Price_Type::instance();
		// no search params means price type object already exists
		if ( ! $where_cols_n_values ) {
			// search by combo of name and order
			$where_cols_n_values = array( 'PRT_name'=>$this->_PRT_name, 'PRT_order'=>$this->_PRT_order );
		}

		if ( $price_type = $MODEL->get_price_type( $where_cols_n_values )) {
			return $price_type;
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

/* End of file EE_Price_Type.class.php */
/* Location: /includes/classes/EE_Price_Type.class.php */