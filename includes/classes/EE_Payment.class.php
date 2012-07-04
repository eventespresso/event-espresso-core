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
 * Payment class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Transaction.class.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Payment {


    /**
    *	Payment ID
	*
	* 	primary key
	*
	* 	@access	private
    *	@var int
    */
	private $_PAY_ID = FALSE;


    /**
    *	Transaction ID
	*
	*	@access	private
    *	@var int
    */
	private $_TXN_ID = NULL;


    /**
    *	Payment Status
	*
	*	@access	private
    *	@var string
    */
	private $_STS_ID = NULL;


    /**
    *	Payment Timestamp
	*
	*	@access	private
    *	@var int
    */
	private $_PAY_timestamp = NULL;


    /**
    *	Payment Method
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_method = NULL;


    /**
    *	Payment Amount
	*
	*	@access	private
    *	@var float
    */
	private $_PAY_amount = NULL;


    /**
    *	Payment Gateway utilized 
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_gateway = NULL;


    /**
    *	Gateway Response
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_gateway_response = NULL;


    /**
    *	Gateway Transaction ID
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_gateway_txn_id = NULL;

 	 	 	
    /**
    *	Purchase Order Number
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_po_number = NULL;

 	 	 	
    /**
    *	Extra Accounting Field
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_extra_accntng = NULL;


    /**
    *	Payment made via admin
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_via_admin = NULL;


    /**
    *	Payment Details
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_details = NULL;







	/**
	*  Payment constructor
	*
	* @access 		public
	* @param 		int					$TXN_ID		 							Transaction ID
	* @param 		string				$STS_ID		 							Payment Status
	* @param 		int 					$PAY_timestamp 					Payment Timestamp
	* @param 		string 				$PAY_method						Payment Method
	* @param 		float 				$PAY_amount						Payment Amount
	* @param 		string 				$PAY_gateway						Payment Gateway 
	* @param 		string 				$PAY_gateway_response		Payment Gateway Response
	* @param 		string 				$PAY_gateway_txn_id			Payment Gateway Transaction ID
	* @param 		string 				$PAY_po_number					Payment Purchase Order Number
	* @param 		string 				$PAY_extra_accntng				Payment Extra Accounting Field
	* @param 		string 				$PAY_via_admin					Payment made via admin
	* @param 		string 				$PAY_details							Payment Details
	* @param 		int 					$PAY_ID 									Payment ID
	*/
	public function __construct( $TXN_ID=FALSE, $STS_ID=FALSE, $PAY_timestamp=NULL, $PAY_method=NULL, $PAY_amount=NULL, $PAY_gateway=NULL, $PAY_gateway_response=NULL, $PAY_gateway_txn_id=NULL, $PAY_po_number=NULL, $PAY_extra_accntng=NULL, $PAY_via_admin=NULL, $PAY_details=NULL, $PAY_ID=FALSE ) {
		$this->_PAY_ID 								= $PAY_ID;
		$this->_TXN_ID 								= $TXN_ID;
		$this->_STS_ID 								= $STS_ID;
		$this->_PAY_timestamp			 	= $PAY_timestamp;
		$this->_PAY_method 					= $PAY_method;
		$this->_PAY_amount					= $PAY_amount;
		$this->_PAY_gateway					= $PAY_gateway;
		$this->_PAY_gateway_response	= $PAY_gateway_response;
		$this->_PAY_gateway_txn_id		= $PAY_gateway_txn_id;
		$this->_PAY_po_number				= $PAY_po_number;
		$this->_PAY_extra_accntng			= $PAY_extra_accntng;
		$this->_PAY_via_admin				= $PAY_via_admin;
		$this->_PAY_details						= $PAY_details;
	}





	/**
	*		Set Transaction ID
	*
	* 		@access		public
	*		@param		int		$TXN_ID
	*/
	public function set_transaction( $TXN_ID = FALSE ) {

		global $espresso_notices;
		if ( ! $TXN_ID ) {
			$espresso_notices['errors'][] = 'No Transaction ID was supplied.';
			return FALSE;
		}
		$this->_TXN_ID = absint( $TXN_ID );
		return TRUE;
	}






	/**
	*		Set Status
	*
	* 		@access		public
	*		@param		string		$STS_ID
	*/
	public function set_status( $STS_ID = FALSE ) {

		global $espresso_notices;
		if ( ! $STS_ID ) {
			$espresso_notices['errors'][] = 'No Status was supplied.';
			return FALSE;
		}
		$this->_STS_ID = wp_strip_all_tags( $STS_ID );
		return TRUE;
	}





	/**
	*		Set Payment Timestamp
	*
	* 		@access		public
	*		@param		int		$timestamp
	*/
	public function set_timestamp( $timestamp = FALSE ) {

		global $espresso_notices;
		if ( ! $timestamp ) {
			$espresso_notices['errors'][] = 'No Timestamp was supplied.';
			return FALSE;
		}
		$this->_PAY_timestamp = absint( $timestamp );
		return TRUE;
	}





	/**
	*		Set Payment Method
	*
	* 		@access		public
	*		@param		string		$pay_method
	*/
	public function set__method( $pay_method = FALSE ) {

		global $espresso_notices;
		if ( ! $pay_method ) {
			$espresso_notices['errors'][] = 'No Payment Method was supplied.';
			return FALSE;
		}
		$this->_PAY_method = wp_strip_all_tags( $pay_method );
		return TRUE;
	}





	/**
	*		Set Payment Amount
	*
	* 		@access		public
	*		@param		float		$amount
	*/
	public function set_amount( $amount = FALSE ) {

		global $espresso_notices;
		if ( ! $amount ) {
			$espresso_notices['errors'][] = 'No Payment Amount was supplied.';
			return FALSE;
		}
		$this->_PAY_amount = abs( $amount );
		return TRUE;
	}





	/**
	*		Set Payment Gateway 
	*
	* 		@access		public
	*		@param		string		$details
	*/
	public function set_gateway( $PAY_gateway = FALSE ) {

		global $espresso_notices;
		if ( ! $PAY_gateway ) {
			$espresso_notices['errors'][] = 'No Payment Gateway was supplied.';
			return FALSE;
		}
		$this->_PAY_gateway = wp_strip_all_tags( $PAY_gateway );
		return TRUE;
	}





	/**
	*		Set Payment Gateway Response
	*
	* 		@access		public
	*		@param		string		$details
	*/
	public function set_gateway_response( $PAY_gateway_response = FALSE ) {

		global $espresso_notices;
		if ( ! $PAY_gateway_response ) {
			$espresso_notices['errors'][] = 'No Payment Gateway Response was supplied.';
			return FALSE;
		}
		$this->_PAY_gateway_response = wp_strip_all_tags( $PAY_gateway_response );
		return TRUE;
	}





	/**
	*		Set Gateway Transaction ID
	*
	* 		@access		public
	*		@param		string		$details
	*/
	public function set_gateway_txn_id( $PAY_gateway_txn_id = FALSE ) {

		global $espresso_notices;
		if ( ! $PAY_gateway_txn_id ) {
			$espresso_notices['errors'][] = 'No Gateway Transaction ID was supplied.';
			return FALSE;
		}
		$this->_PAY_gateway_txn_id = wp_strip_all_tags( $PAY_gateway_txn_id );
		return TRUE;
	}




	/**
	*		Set Purchase Order Number
	*
	* 		@access		public
	*		@param		string		$PAY_po_number
	*/
	public function set_po_number( $PAY_po_number = FALSE ) {

		global $espresso_notices;
		if ( ! $PAY_po_number ) {
			$espresso_notices['errors'][] = 'No Purchase Order Number info was supplied.';
			return FALSE;
		}
		$this->_PAY_po_number = wp_strip_all_tags( $PAY_po_number );
		return TRUE;
	}





	/**
	*		Set Extra Accounting Field
	*
	* 		@access		public
	*		@param		string		$details
	*/
	public function set_extra_accntng( $PAY_extra_accntng = FALSE ) {

		global $espresso_notices;
		if ( ! $PAY_extra_accntng ) {
			$espresso_notices['errors'][] = 'No Extra Accounting Field info was supplied.';
			return FALSE;
		}
		$this->_PAY_extra_accntng = wp_strip_all_tags( $PAY_extra_accntng );
		return TRUE;
	}





	/**
	*		Set Payment made via admin flag
	*
	* 		@access		public
	*		@param		string		$details
	*/
	public function set_payment_made_via_admin( $PAY_via_admin = FALSE ) {

		global $espresso_notices;
		if ( ! is_bool( $PAY_via_admin )) {
			$espresso_notices['errors'][] = 'The supplied value for the "payment made via admin" flag was not a boolean.';
			return FALSE;
		}
		$this->_PAY_via_admin = (bool)absint( $PAY_via_admin );
		return TRUE;
	}





	/**
	*		Set Payment Details
	*
	* 		@access		public
	*		@param		string		$details
	*/
	public function set_details( $details = FALSE ) {

		global $espresso_notices;
		if ( ! $details ) {
			$espresso_notices['errors'][] = 'No Payment Details were supplied.';
			return FALSE;
		}
		$this->_PAY_details = wp_strip_all_tags( $details );
		return TRUE;
	}












	/**
	*		save object to db
	*
	* 		@access		private
	* 		@param		array		$where_cols_n_values
	*/
	private function _save_to_db( $where_cols_n_values = FALSE ) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php');
		$MODEL = EEM_Payment::instance();

		$set_column_values = array(
				'TXN_ID' 								=> $this->_TXN_ID,
				'STS_ID' 								=> $this->_STS_ID,
				'PAY_timestamp' 				=> $this->_PAY_timestamp,
				'PAY_method'						=> $this->_PAY_method,
				'PAY_amount'						=> $this->_PAY_amount,
				'PAY_gateway'					=> $this->_PAY_gateway,
				'PAY_gateway_response'	=> $this->_PAY_gateway_response,
				'PAY_gateway_txn_id'		=> $this->_PAY_gateway_txn_id,
				'PAY_extra_accntng'			=> $this->_PAY_extra_accntng,
				'PAY_details'						=> $this->_PAY_details
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
		return $this->_save_to_db( array( 'PAY_ID' => $this->_PAY_ID ));
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
	*		get Payment ID
	* 		@access		public
	*/
	public function ID() {
		return $this->_PAY_ID;
	}



	/**
	*		get Payment Transaction ID
	* 		@access		public
	*/
	public function TXN_ID() {
		return $this->_TXN_ID;
	}



	/**
	*		get Payment Status
	* 		@access		public
	*/
	public function STS_ID() {
		return $this->_STS_ID;
	}



	/**
	*		get Payment Timestamp
	* 		@access		public
	*/
	public function timestamp( $dt_frmt = FALSE ) {
		$dt_frmt = $dt_frmt ? $dt_frmt : 'D M j, Y,    g:i a';
		return date( $dt_frmt, $this->_PAY_timestamp );
	}



	/**
	*		get Payment Method
	* 		@access		public
	*/
	public function method() {
		return $this->_PAY_method;
	}



	/**
	*		get Payment Amount
	* 		@access		public
	*/
	public function amount() {
		return $this->_PAY_amount;
	}



	/**
	*		get Payment Gateway 
	* 		@access		public
	*/
	public function gateway() {
		return $this->_PAY_gateway;
	}



	/**
	*		get Payment Gateway Response
	* 		@access		public
	*/
	public function gateway_response() {
		return $this->_PAY_gateway_response;
	}



	/**
	*		get Payment Gateway Transaction ID
	* 		@access		public
	*/
	public function gateway_txn_id() {
		return $this->_PAY_gateway_txn_id;
	}



	/**
	*		get Purchase Order Number
	* 		@access		public
	*/
	public function po_number() {
		return $this->_PAY_po_number;
	}



	/**
	*		get Extra Accounting Field
	* 		@access		public
	*/
	public function extra_accntng() {
		return $this->_PAY_extra_accntng;
	}



	/**
	*		get Payment made via admin flag
	* 		@access		public
	*/
	public function payment_made_via_admin() {
		return $this->_PAY_via_admin;
	}



	/**
	*		get Payment Details
	* 		@access		public
	*/
	public function details() {
		return $this->_PAY_details;
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

/* End of file EE_Payment.class.php */
/* Location: /includes/classes/EE_Payment.class.php */