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
 * EE_Transaction class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Transaction.class.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Transaction {
	
    /**
    *	Transaction ID
	* 
	* 	primary key
	*	
	* 	@access	private
    *	@var int	
    */
	private $_TXN_ID = FALSE;

	
	
	
    /**
    *	Timestamp
	* 
	*	date / time
	*  
	*	@access	private
    *	@var timestamp	
    */
	private $_TXN_timestamp = NULL;
	
	
	
    /**
    *	Total Cost for Transaction
	* 
	* 	note: always use Decimal(10,2) as SQL type for money
	*
	*	@access	private
    *	@var float	
    */
	private $_TXN_total = 0;	
	
	
    /**
    *	Transaction Status
	*
	*	foreign key from status type table - 3 character string
	* 
	*	@access	private
    *	@var string	
    */
	private $_STS_ID = NULL;
	
	
	
    /**
    *	Transaction Details
	* 
    *	notes regarding the transaction
	*  
	*	@access	private
    *	@var string	
    */
	private $_TXN_details = NULL;	
	
	
	
    /**
    *	session data
	* 
    *	dump off the entire session object 
	* 
	*	@access	private
    *	@var string	
    */
	private $_TXN_session_data = NULL;	
	
	
	
    /**
    *	Hash Salt
	* 
    *	required for some payment gateways
	* 
	*	@access	private
    *	@var string	
    */
	private $_TXN_hash_salt = NULL;		



    /**
    *	Tax Data
	* 
    *	information regarding taxes
	* 
	*	@access	private
    *	@var array	
    */
	private $_TXN_tax_data = NULL;	



    /**
    *	datetime format
	* 
    *	pattern or format for displaying dates and times
	* 
	*	@access	private
    *	@var string	
    */
	private $dt_frmt = 'F j, Y g:i a';	






	/**
	*  Transaction constructor
	*
	* @access 		public
	* @param 		float 				$TXN_total 					Transaction Total
	* @param 		string				$STS_ID  						Transaction Status - foreign key from status type table
	* @param 		string 				$TXN_details  			notes regarding the transaction
	* @param 		string				$TXN_session_data 	dump off the entire session object 
	* @param 		string				$TXN_hash_salt 			required for some payment gateways
	* @param 		string				$TXN_tax_data		 	information regarding taxes
	* @param 		timestamp 		$TXN_timestamp 		Unix timestamp
	* @param 		int 					$TXN_ID 						Transaction ID
	*/
	public function __construct( $TXN_total=0.00, $STS_ID=NULL, $TXN_details=NULL, $TXN_session_data=NULL, $TXN_hash_salt=NULL, $TXN_tax_data=NULL,$TXN_timestamp=FALSE,$TXN_ID=FALSE ) {
		$this->_TXN_ID 						= $TXN_ID;
		$this->_TXN_timestamp 		= $TXN_timestamp ? $TXN_timestamp : time();
		$this->_TXN_total 					= $TXN_total;
		$this->_STS_ID 						= $STS_ID;
		$this->_TXN_details 				= $TXN_details;
		$this->_TXN_session_data	= $TXN_session_data;
		$this->_TXN_hash_salt 			= $TXN_hash_salt;
		$this->_TXN_tax_data 			= $TXN_tax_data;
	}






	/**
	*		Set transaction total
	* 
	* 		@access		public		
	*		@param		float		$total 		total value of transaction 
	*/	
	public function set_total( $total = FALSE ) {
		
		global $espresso_notices;
		if ( ! $total || ! is_numeric( $total )) {
			$espresso_notices['errors'][] = 'No total or an invalid total was supplied.';
			return FALSE;
		}	
		$this->_TXN_total = $total;
		return TRUE;
	}






	/**
	*		Set transaction status
	* 
	* 		@access		public		
	*		@param		string		$status 		whether the transaction is open, declined, accepted, or any number of custom values that can be set
	*/	
	public function set_status( $status = FALSE ) {
		
		global $espresso_notices;
		if ( ! $status ) {
			$espresso_notices['errors'][] = 'No status was supplied.';
			return FALSE;
		}	
		$this->_STS_ID = wp_strip_all_tags( $status );
		return TRUE;
	}






	/**
	*		Set transaction total
	* 
	* 		@access		public		
	*		@param		string		$details 		notes regarding the transaction
	*/	
	public function set_details( $details = FALSE ) {
		
		global $espresso_notices;
		if ( ! $details ) {
			$espresso_notices['errors'][] = 'No details were supplied.';
			return FALSE;
		}	
		$this->_TXN_details = stripslashes_deep( $details );
		return TRUE;
	}






	/**
	*		Set session data
	* 
	* 		@access		public		
	*		@param		string		$details 		dump off the entire session object 
	*/	
	public function set_session_data( $session_data = FALSE ) {
		
		global $espresso_notices;
		if ( ! $session_data ) {
			$espresso_notices['errors'][] = 'No session data was supplied.';
			return FALSE;
		}	
		$this->_TXN_session_data = stripslashes_deep( $session_data );
		return TRUE;
	}





	/**
	*		Set hash salt
	* 
	* 		@access		public		
	*		@param		string		$hash_salt 		required for some payment gateways
	*/	
	public function set_hash_salt( $hash_salt = FALSE ) {
		
		global $espresso_notices;
		if ( ! $hash_salt ) {
			$espresso_notices['errors'][] = 'No hash salt was supplied.';
			return FALSE;
		}	
		$this->_TXN_hash_salt = wp_strip_all_tags( $hash_salt );
		return TRUE;
	}






	/**
	*		Set tax data
	* 
	* 		@access		public		
	*		@param		string		$tax_data 		information regarding taxes
	*/	
	public function set_tax_data( $tax_data = FALSE ) {
		
		global $espresso_notices;
		if ( ! $tax_data ) {
			$espresso_notices['errors'][] = 'No session data was supplied.';
			return FALSE;
		}	
		$this->_TXN_tax_data = stripslashes_deep( $tax_data ); 
		return TRUE;
	}






	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values		
	*/	
	private function _save_to_db( $where_cols_n_values = FALSE ) {
		
		 $MODEL = EEM_Transaction::instance();
		
		$set_column_values = array(		
				'TXN_timestamp' 		=> $this->_TXN_timestamp,
				'TXN_total' 					=> $this->_TXN_total,
				'STS_ID' 						=> $this->_STS_ID,
				'TXN_details' 				=> maybe_serialize( $this->_TXN_details ),
				'TXN_session_data'		=> maybe_serialize( $this->_TXN_session_data ),
				'TXN_hash_salt' 			=> $this->_TXN_hash_salt,
				'TXN_tax_data' 			=> maybe_serialize( $this->_TXN_tax_data )
		);

		if ( $where_cols_n_values ){
			$results = $MODEL->update ( $set_column_values, $where_cols_n_values );
		} else {
			$results = $MODEL->insert ( $set_column_values );
			$this->_TXN_ID = $results['new-ID'];
			return $results;
		}
		
		return $results;
	}






	/**
	*		update existing db record
	* 
	* 		@access		public
	*/	
	public function update() {
		return $this->_save_to_db( array( 'TXN_ID' => $this->_TXN_ID ));
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
	*		get Transaction ID
	* 		@access		public
	*/	
	public function ID() {
		return $this->_TXN_ID;
	}





	/**
	*		get Transaction Total
	* 		@access		public
	*/	
	public function total() {
		return $this->_TXN_total;
	}




	/**
	*		get Transaction Status 
	* 		@access		public
	*/	
	public function status_ID() {
		return $this->_STS_ID;
	}




	/**
	*		get Transaction Details
	* 		@access		public
	*/	
	public function details() {
		return maybe_unserialize( $this->_TXN_details );
	}




	/**
	*		get Transaction session data
	* 		@access		public
	*/	
	public function session_data() {
		return maybe_unserialize( $this->_TXN_session_data );
	}




	/**
	*		get Transaction hash salt
	* 		@access		public
	*/	
	public function hash_salt_() {
		return $this->_TXN_hash_salt;
	}




	/**
	*		get Transaction tax data
	* 		@access		public
	*/	
	public function tax() {
		return $this->_TXN_tax_data;
	}




	/**
	*		get Transaction datetime
	* 		@param 		boolean		$format - whether to format date  - defaults to FALSE (return timestamp)
	* 		@param 		string			$dt_frmt - defaults to 'F j, Y g:i a'
	* 		@access		public
	*/	
	public function datetime( $format = FALSE, $dt_frmt = FALSE ) {
		if ( $format ) {
			// set datetime format
			$dt_frmt = $dt_frmt ? $dt_frmt : $this->dt_frmt;		
			return date( $dt_frmt, $this->_TXN_timestamp );
		} else {
			return $this->_TXN_timestamp;
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


/*
	EXAMPLE USAGE

	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	$TXN = EEM_Transaction::instance();	

	$txn_1 = new EE_Transaction( '80.00', 'TPN', 'some txn details', array('session-data'), md5('some hash salt'),'some tax details' );
	$results = $txn_1->insert();
	
	$txn_2 = new EE_Transaction( '400.00', 'TPN', 'some more txn details', array('different session data'), md5('some other hash salt'),'some other tax details' );
	$results = $txn_2->insert();
	
	$transactions = $TXN->get_all_transactions();
	echo printr( $transactions, 'get_all_transactions' );

	$transaction = $TXN->get_transaction( 1 );
	echo printr( $transaction, 'get_transaction( 1 )' );

	$transaction = $TXN->get_transaction( 2 );
	echo printr( $transaction, 'get_transaction( 2 )' );
	
*/


/* End of file EE_Transaction.class.php */
/* Location: includes/classes/EE_Transaction.class.php */	
	