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
	*  Transaction constructor
	*
	* @access 		public
	* @param 		int 					$TXN_ID 						Transaction ID
	* @param 		timestamp 		$TXN_timestamp 		Unix timestamp
	* @param 		float 				$TXN_total 					Transaction Total
	* @param 		string				$STS_ID  						Transaction Status - foreign key from status type table
	* @param 		string 				$TXN_details  			notes regarding the transaction
	* @param 		string				$TXN_session_data 	dump off the entire session object 
	* @param 		string				$TXN_hash_salt 			required for some payment gateways
	* @param 		string				$TXN_tax_data		 	information regarding taxes
	*/
	public function __construct( $TXN_ID=FALSE, $TXN_timestamp=FALSE, $TXN_total=0, $STS_ID=NULL, $TXN_details=NULL, $TXN_session_data=NULL, $TXN_hash_salt=NULL, $TXN_tax_data=NULL ) {
		$this->_TXN_ID 						= $TXN_ID;
		$this->_TXN_timestamp 		= $TXN_timestamp ? $TXN_timestamp : time();
		$this->_TXN_total 					= $TXN_total;
		$this->_STS_ID 						= $STS_ID;
		$this->_TXN_details 				= $TXN_details;
		$this->_TXN_session_data	= maybe_serialize( $TXN_session_data );
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
		$this->_TXN_details = wp_strip_all_tags( $details );
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
		$this->_TXN_session_data = maybe_serialize( wp_strip_all_tags( $session_data ));
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
	public function set_txn_session_data( $tax_data = FALSE ) {
		
		global $espresso_notices;
		if ( ! $tax_data ) {
			$espresso_notices['errors'][] = 'No session data was supplied.';
			return FALSE;
		}	
		$this->_TXN_tax_data = maybe_serialize( wp_strip_all_tags( $tax_data ));
		return TRUE;
	}






	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values		
	*/	
	private function _save_to_db( $where_cols_n_values = FALSE ) {
		
		 $TXN_MDL = EEM_Transaction::instance();
		
		$set_column_values = array(		
				'TXN_timestamp' 		=> $this->_TXN_timestamp,
				'TXN_total' 					=> $this->_TXN_total,
				'STS_ID' 						=> $this->_STS_ID,
				'TXN_details' 				=> $this->_TXN_details,
				'TXN_session_data'		=> maybe_serialize( $this->_TXN_session_data ),
				'TXN_hash_salt' 			=> $this->_TXN_hash_salt,
				'TXN_tax_data' 			=> $this->_TXN_tax_data
		);

		if ( $where_cols_n_values ){
			$results = $TXN_MDL->update ( $set_column_values, $where_cols_n_values );
		} else {
			$results = $TXN_MDL->insert ( $set_column_values );
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

	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/Espresso_base.model.php' );
	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/Event_datetime.model.php' );
	$EVT_TXN = Event_datetime::instance();
//	$EVT_TXN->convert_existing_event_datetimes();	

	$start_dates = $EVT_TXN->get_event_start_dates( 8 );
	$end_dates = $EVT_TXN->get_event_end_dates( 8 );
	$reg_start_dates = $EVT_TXN->get_reg_start_dates( 8 );
	$reg_end_dates = $EVT_TXN->get_reg_end_dates( 8 );
	
	foreach( $start_dates as $start_date ) {
		echo $start_date->show_date() . '<br />';
		echo $start_date->show_time() . '<br />';
		echo $start_date->show_date_and_time() . '<br />';
		echo $start_date->show_date_and_time( 'l \t\h\e jS \of F, Y,', '\a\t h:i:s A' ) . '<br />';
	}
*/


/* End of file EE_Transaction.class.php */
/* Location: includes/classes/EE_Transaction.class.php */	
	