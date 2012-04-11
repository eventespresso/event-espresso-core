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
	* @param 		int					$TXN_ID		 				Transaction ID
	* @param 		int 					$PAY_timestamp 		Payment Timestamp
	* @param 		string 				$PAY_method				Payment Method
	* @param 		float 				$PAY_amount				Payment Amount
	* @param 		string 				$PAY_details				Payment Details
	* @param 		int 					$PAY_ID 						Payment ID
	*/
	public function __construct( $TXN_ID=FALSE, $PAY_timestamp=NULL, $PAY_method=NULL, $PAY_amount=NULL, $PAY_details=NULL, $PAY_ID=FALSE ) {
		$this->_PAY_ID 					= $PAY_ID;
		$this->_TXN_ID 					= $TXN_ID;
		$this->_PAY_timestamp 	= $PAY_timestamp;
		$this->_PAY_method 		= $PAY_method;
		$this->_PAY_amount			= $PAY_amount;
		$this->_PAY_details			= $PAY_details;
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
		
		 $MODEL = EEM_Payment::instance();
		
		$set_column_values = array(		
				'TXN_ID' 					=> $this->_TXN_ID,
				'PAY_timestamp' 	=> $this->_PAY_timestamp,
				'PAY_method'			=> $this->_PAY_method,
				'PAY_amount'			=> $this->_PAY_amount,
				'PAY_details'			=> $this->_PAY_details
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
	*		get Payment Timestamp
	* 		@access		public
	*/	
	public function timestamp() {
		return $this->_PAY_timestamp;
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