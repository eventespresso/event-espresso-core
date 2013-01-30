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
	*	Price Type ID
	* 	primary key
	*
	* 	@access	private
	*		@var int
	*/
	private $_PRT_ID = FALSE;

	/**
	*	Price Type name
	*
	*	@access	private
	*	@var string
	*/
	private $_PRT_name = NULL;

	/**
	*	Price Base Type ID
	* 	1 = Event Price , 2 = Discount , 3 = Surcharge , 4 = Tax
	*
	*	@access	private
	*	@var int
	*/
	private $_PBT_ID = NULL;

	/**
	*	Price type a member Price?
	*
	*	@access	private
	*	@var bool
	*/
	private $_PRT_is_member = NULL;

	/**
	*	Price type a discount?
	*
	*	@access	private
	*	@var bool
	*/
	private $_PRT_is_discount = NULL;

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
	*	is Price type deleted
	*
	*	@access	private
	*	@var int
	*/
	private $_PRT_deleted = NULL;






		/**
	*  Attendee constructor
	*
	* @access 	public
	* @param	string	$PRT_name			Price Type name
	* @param	int		$PBT_ID	 				Price Base Type ID
	* @param	bool	$PRT_is_member	is price type a member price?
	* @param	bool	$PRT_is_percent		is price type a percent?
	* @param	bool	$PRT_is_global		is price type a global?
	* @param	int 		$PRT_order				Price Type order
	* @param	int		$PRT_ID					Price type ID
	*/
	public function __construct( $PRT_name='', $PBT_ID=FALSE, $PRT_is_member=FALSE, $PRT_is_percent=FALSE, $PRT_is_global=FALSE, $PRT_order=0, $PRT_deleted, $PRT_ID=FALSE ) {
	
		$this->_PRT_ID					= $PRT_ID;
		$this->_PRT_name			= $PRT_name;
		$this->_PBT_ID					= $PBT_ID;
		$this->_PRT_is_member	= $PRT_is_member;
		$this->_PRT_is_percent		= $PRT_is_percent;
		$this->_PRT_is_global		= $PRT_is_global;
		$this->_PRT_order				= $PRT_order;
		$this->_PRT_deleted			= $PRT_deleted;

		// load Price model object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	}





	/**
	*		Set Price Type Name
	*
	* 	@access		public
	*		@param		string		$PRT_name
	*/
	public function set_name( $PRT_name = FALSE ) {

		if ( ! $PRT_name ) {
			$msg = __( 'No name was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRT_name = wp_strip_all_tags( $PRT_name );
		return TRUE;
	}





	/**
	*		Set Price Type is member price
	*
	* 		@access		public
	*		@param		bool		$PRT_is_member
	*/
	public function set_is_member( $PRT_is_member = NULL ) {

		if (!is_bool($PRT_is_member)) {
			$msg = __( 'No member flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRT_is_member = $PRT_is_member;
		return TRUE;
	}





	/**
	*		Set Price Type is discount
	*
	* 		@access		public
	*		@param		bool		$PRT_is_discount
	*/
	public function set_is_discount( $PRT_is_discount = NULL ) {

		if (!is_bool($PRT_is_discount)) {
			$msg = __( 'No discount flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRT_is_discount = $PRT_is_discount;
		return TRUE;
	}





	/**
	*		Set Price Type is tax
	*
	* 		@access		public
	*		@param		bool		$PRT_is_tax
	*/
	public function set_is_tax( $PRT_is_tax = NULL ) {

		if (!is_bool($PRT_is_tax)) {
			$msg = __( 'No tax flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRT_is_tax = $PRT_is_tax;
		return TRUE;
	}





	/**
	*		Set Price Type a percent
	*
	* 		@access		public
	*		@param		bool		$PRT_is_percent
	*/
	public function set_is_percent( $PRT_is_percent = NULL ) {

		if (!is_bool($PRT_is_percent)) {
			$msg = __( 'No percent flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRT_is_percent = $PRT_is_percent;
		return TRUE;
	}





	/**
	*		Set Price Type a global
	*
	* 		@access		public
	*		@param		bool		$PRT_is_global
	*/
	public function set_is_global ( $PRT_is_global = NULL ) {

		if (!is_bool($PRT_is_global)) {
			$msg = __( 'No global flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRT_is_global = $PRT_is_global;
		return TRUE;
	}





	/**
	*		Set Price Type order
	*
	* 		@access		public
	*		@param		bool		$PRT_order
	*/
	public function set_order( $PRT_order = FALSE ) {

		if ( ! $PRT_order ) {
			$msg = __( 'No order was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRT_order = absint( $PRT_order );
		return TRUE;
	}

	public function move_to_trash() {
		$this->_PRT_deleted = TRUE;
	}

	public function restore_from_trash() {
		$this->_PRT_deleted = FALSE;
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
				'PBT_ID'					=> $this->_PBT_ID,
				'PRT_is_member'	=> $this->_PRT_is_member,
				'PRT_is_percent'		=> $this->_PRT_is_percent,
				'PRT_is_global'		=> $this->_PRT_is_global,
				'PRT_order'				=> $this->_PRT_order,
				'PRT_deleted'			=> $this->_PRT_deleted
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
		return $this->_save_to_db( array( 'PRT_ID' => $this->_PRT_ID ));
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
	*		get Price Type ID
	* 		@access		public
	*/
	public function ID() {
		return $this->_PRT_ID;
	}



	/**
	*		get Price Type Name
	* 		@access		public
	*/
	public function name() {
		return $this->_PRT_name;
	}



	/**
	*		get is Price Type a discount?
	* 		@access		public
	*/
	public function base_type() {
		return $this->_PBT_ID;
	}



	/**
	*		get is Price Type a member price?
	* 		@access		public
	*/
	public function is_member() {
		return $this->_PRT_is_member;
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
	*		get  is Price Type deleted ?
	* 		@access		public
	*/
	public function deleted() {
		return $this->_PRT_deleted;
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


}

/* End of file EE_Price_Type.class.php */
/* Location: /includes/classes/EE_Price_Type.class.php */