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
 * @subpackage	includes/classes/EE_Payment.class.php
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
    *	Gateway Transaction ID or Cheque #
	*
	*	@access	private
    *	@var string
    */
	private $_PAY_txn_id_chq_nmbr = NULL;

 	 	 	
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
	* @param 		string 				$PAY_method							Payment Method
	* @param 		float 				$PAY_amount							Payment Amount
	* @param 		string 				$PAY_gateway						Payment Gateway 
	* @param 		string 				$PAY_gateway_response		Payment Gateway Response
	* @param 		string 				$PAY_txn_id_chq_nmbr			Payment Gateway Transaction ID
	* @param 		string 				$PAY_po_number					Payment Purchase Order Number
	* @param 		string 				$PAY_extra_accntng				Payment Extra Accounting Field
	* @param 		string 				$PAY_via_admin						Payment made via admin
	* @param 		string 				$PAY_details							Payment Details
	* @param 		int 					$PAY_ID 									Payment ID
	*/
	public function __construct( 
														$TXN_ID = FALSE, 
														$STS_ID = FALSE, 
														$PAY_timestamp = NULL, 
														$PAY_method = NULL, 
														$PAY_amount = NULL, 
														$PAY_gateway = NULL, 
														$PAY_gateway_response = NULL, 
														$PAY_txn_id_chq_nmbr = NULL, 
														$PAY_po_number = NULL, 
														$PAY_extra_accntng = NULL, 
														$PAY_via_admin = NULL, 
														$PAY_details = NULL, 
														$PAY_ID = FALSE 
													) {
													
		// filter out unwanted junk from Pay_details
		if ( is_array( $PAY_details )) {
			array_walk_recursive( $PAY_details, array( $this, '_strip_all_tags_within_array' ));
		} else {
			$PAY_details =  wp_strip_all_tags( $PAY_details );
		}

		$this->_PAY_ID 								= absint( $PAY_ID );
		$this->_TXN_ID 								= absint( $TXN_ID );
		$this->_STS_ID 								= strtoupper( sanitize_key( $STS_ID ));
		$this->_PAY_timestamp			 	= $PAY_timestamp != NULL ? ( is_numeric( $PAY_timestamp ) ? absint( $PAY_timestamp ) : strtotime( $PAY_timestamp )) : time();
		$this->_PAY_method 					= strtoupper( sanitize_key( $PAY_method ));
		$this->_PAY_amount					= floatval( preg_replace( '/[^-0-9.]*/', '', preg_replace( '/,/', '.', $PAY_amount )));
		$this->_PAY_gateway					= wp_strip_all_tags( $PAY_gateway );
		$this->_PAY_gateway_response	= htmlentities( wp_strip_all_tags( $PAY_gateway_response ), ENT_QUOTES, 'UTF-8' ); 
		$this->_PAY_txn_id_chq_nmbr		= sanitize_key( $PAY_txn_id_chq_nmbr );
		$this->_PAY_po_number				= sanitize_key( $PAY_po_number );
		$this->_PAY_extra_accntng			= wp_strip_all_tags( $PAY_extra_accntng );
		$this->_PAY_via_admin				= absint( $PAY_via_admin ) ? TRUE : FALSE;
		$this->_PAY_details						= maybe_serialize( $PAY_details );
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
		$this->_STS_ID = strtoupper( wp_strip_all_tags( $STS_ID ));
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
		if (  $amount === FALSE || ! is_numeric( $amount ) ) {
			$espresso_notices['errors'][] = 'No Payment Amount or an invalid Payment Amount was supplied.';
			return FALSE;
		}
		// change commas to decimals
		$amount = ( preg_replace( '/,/', '.', $amount ));
		// remove all other characters and cast as float
		$this->_PAY_amount = floatval( preg_replace( '/[^-0-9.]*/', '', $amount ));
		return TRUE;
	}





	/**
	*		Set Payment Gateway 
	*
	* 		@access		public
	*		@param		string		$gateway
	*/
	public function set_gateway( $gateway = FALSE ) {

		global $espresso_notices;
		if ( ! $gateway ) {
			$espresso_notices['errors'][] = 'No Payment Gateway was supplied.';
			return FALSE;
		}
		$this->_PAY_gateway = wp_strip_all_tags( $gateway );
		return TRUE;
	}





	/**
	*		Set Payment Gateway Response
	*
	* 		@access		public
	*		@param		string		$gateway_response
	*/
	public function set_gateway_response( $gateway_response = FALSE ) {

		global $espresso_notices;
		if ( ! $gateway_response ) {
			$espresso_notices['errors'][] = 'No Payment Gateway Response was supplied.';
			return FALSE;
		}
		$this->_PAY_gateway_response = htmlentities( wp_strip_all_tags( $gateway_response ), ENT_QUOTES, 'UTF-8' );
		return TRUE;
	}





	/**
	*		Set Gateway Transaction ID
	*
	* 		@access		public
	*		@param		string		$txn_id_chq_nmbr
	*/
	public function set_txn_id_chq_nmbr( $txn_id_chq_nmbr = FALSE ) {

		global $espresso_notices;
		if ( ! $txn_id_chq_nmbr ) {
			$espresso_notices['errors'][] = 'No Gateway Transaction ID or Cheque # was supplied.';
			return FALSE;
		}
		$this->_PAY_txn_id_chq_nmbr = wp_strip_all_tags( $txn_id_chq_nmbr );
		return TRUE;
	}




	/**
	*		Set Purchase Order Number
	*
	* 		@access		public
	*		@param		string		$po_number
	*/
	public function set_po_number( $po_number = FALSE ) {

		global $espresso_notices;
		if ( ! $po_number ) {
			$espresso_notices['errors'][] = 'No Purchase Order Number info was supplied.';
			return FALSE;
		}
		$this->_PAY_po_number = wp_strip_all_tags( $po_number );
		return TRUE;
	}





	/**
	*		Set Extra Accounting Field
	*
	* 		@access		public
	*		@param		string		$extra_accntng
	*/
	public function set_extra_accntng( $extra_accntng = FALSE ) {

		global $espresso_notices;
		if ( ! $extra_accntng ) {
			$espresso_notices['errors'][] = 'No Notes or Extra Accounting Field info was supplied.';
			return FALSE;
		}
		$this->_PAY_extra_accntng = wp_strip_all_tags( $extra_accntng );
		return TRUE;
	}





	/**
	*		Set Payment made via admin flag
	*
	* 		@access		public
	*		@param		string		$via_admin
	*/
	public function set_payment_made_via_admin( $via_admin = FALSE ) {

		global $espresso_notices;
		if ( ! is_bool( $via_admin )) {
			$espresso_notices['errors'][] = 'The supplied value for the "payment made via admin" flag was not a boolean.';
			return FALSE;
		}
		$this->_PAY_via_admin = (bool)absint( $via_admin );
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
		$PAY_MODEL = EEM_Payment::instance();
		
//	TXN_ID 	STS_ID 	PAY_timestamp 	PAY_method 	PAY_amount 	PAY_gateway 	PAY_gateway_response 	PAY_txn_id_chq_nmbr 	PAY_po_number 	PAY_extra_accntng 	PAY_via_admin 	PAY_details
		$set_column_values = array(
				'TXN_ID' 								=> $this->_TXN_ID,
				'STS_ID' 								=> $this->_STS_ID,
				'PAY_timestamp' 				=> $this->_PAY_timestamp,
				'PAY_method'					=> $this->_PAY_method,
				'PAY_amount'						=> $this->_PAY_amount,
				'PAY_gateway'					=> $this->_PAY_gateway,
				'PAY_gateway_response'	=> $this->_PAY_gateway_response,
				'PAY_txn_id_chq_nmbr'		=> $this->_PAY_txn_id_chq_nmbr,
				'PAY_po_number'				=> $this->_PAY_po_number,
				'PAY_extra_accntng'			=> $this->_PAY_extra_accntng,
				'PAY_via_admin'					=> $this->_PAY_via_admin,
				'PAY_details'						=> $this->_PAY_details
		);

		if ( $where_cols_n_values ){
			$results = $PAY_MODEL->update ( $set_column_values, $where_cols_n_values );
		} else {
			$results = $PAY_MODEL->insert ( $set_column_values );
			if ( isset( $results['new-ID'] )) {
				$this->_PAY_ID = $results['new-ID'];
			}
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
		return $this->_PAY_gateway_response ? stripslashes( html_entity_decode( $this->_PAY_gateway_response, ENT_QUOTES, 'UTF-8' )) : '';
	}



	/**
	*		get Payment Gateway Transaction ID
	* 		@access		public
	*/
	public function txn_id_chq_nmbr() {
		return $this->_PAY_txn_id_chq_nmbr ? $this->_PAY_txn_id_chq_nmbr : '';
	}



	/**
	*		get Purchase Order Number
	* 		@access		public
	*/
	public function po_number() {
		return $this->_PAY_po_number ? $this->_PAY_po_number : '';
	}



	/**
	*		get Extra Accounting Field
	* 		@access		public
	*/
	public function extra_accntng() {
		return $this->_PAY_extra_accntng ? $this->_PAY_extra_accntng : '';
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
	*		Apply a Payment to a Transaction, update all totals, and save payment info to db
	* 		@param		boolean 		$via_admin
	* 		@access		public
	*/
	public function apply_payment_to_transaction( $via_admin = FALSE ) {

		global $espresso_notices;
		
		// is this an existing payment ?			
		if ( $this->_PAY_ID ) {
			$payment_made = $this->update();
		} else {
			$payment_made = $this->insert();
		}
		
		if ( $payment_made ) {

			// recalculate and set  total paid
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php');
			$PAY_MODEL = EEM_Payment::instance();
			$return_data = $PAY_MODEL->update_payment_transaction( $this, 'processed' );
			return $return_data;
						
		} else {
		
			if ( $via_admin ) {
				$espresso_notices['errors'][] = __('An error occured. The payment has not been processed succesfully.', 'event_espresso');
				return FALSE;
			} else {
				return __('There was a problem inserting your payment into our records. Do not attempt the transaction again. Please contact support.', 'event_espresso');
			}
		}
		
	}





	/**
	*		apply wp_strip_all_tags to all elements within an array
	*
	* 		@access		private
	*		@param		mixed		$item
	*		@param		mixed		$key
	*/
	private function _strip_all_tags_within_array( &$item, $key ){
	        wp_strip_all_tags( $item );
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