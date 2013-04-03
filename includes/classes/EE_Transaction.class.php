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
require_once('EE_Base_Class.class.php');
class EE_Transaction extends EE_Base_Class{
	
    /**
    *	Transaction ID
	* 
	* 	primary key
	*	
	* 	@access	protected
    *	@var int	
    */
	protected $_TXN_ID = FALSE;

	
	
	
    /**
    *	Timestamp
	* 
	*	date / time
	*  
	*	@access	protected
    *	@var timestamp	
    */
	protected $_TXN_timestamp = NULL;
	
	
	
    /**
    *	Total Cost for Transaction
	* 
	* 	note: always use Decimal(10,2) as SQL type for money
	*
	*	@access	protected
    *	@var float	
    */
	protected $_TXN_total = 0;	
	
	
	
    /**
    *	Total Amount Paid to Date
	* 
	* 	note: always use Decimal(10,2) as SQL type for money
	*
	*	@access	protected
    *	@var float	
    */
	protected $_TXN_paid = 0;	
	
	
    /**
    *	Transaction Status
	*
	*	foreign key from status type table - 3 character string
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_STS_ID = NULL;
	
	
	
    /**
    *	Transaction Details
	* 
    *	notes regarding the transaction
	*  
	*	@access	protected
    *	@var string	
    */
	protected $_TXN_details = NULL;	
	
	
	
    /**
    *	session data
	* 
    *	dump off the entire session object 
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_TXN_session_data = NULL;	
	
	
	
    /**
    *	Hash Salt
	* 
    *	required for some payment gateways
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_TXN_hash_salt = NULL;		



    /**
    *	Tax Data
	* 
    *	information regarding taxes
	* 
	*	@access	protected
    *	@var array	
    */
	protected $_TXN_tax_data = NULL;	



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
	 * Registrations on this transaction
	 * @var EE_Registration[]
	 */
	protected $_Registrations = NULL;
	
	
	
	/**
	 * Payments for this transaction
	 * @var EE_Payment[]
	 */
	protected $_Payments = NULL;




	/**
	*  Transaction constructor
	*
	* @access 		public
	* @param 		timestamp/array 		$TXN_timestamp 		Unix timestamp or array where keys are column names
	* @param 		float 				$TXN_total 					Transaction Total
	* @param 		float 				$TXN_paid 					Total Amount Paid to Date
	* @param 		string				$STS_ID  						Transaction Status - foreign key from status type table
	* @param 		string 				$TXN_details  			notes regarding the transaction
	* @param 		string				$TXN_session_data 	dump off the entire session object 
	* @param 		string				$TXN_hash_salt 			required for some payment gateways
	* @param 		string				$TXN_tax_data		 	information regarding taxes
	* @param 		int 					$TXN_ID 						Transaction ID
	*/
	public function __construct( 
														$TXN_timestamp = FALSE, 
														$TXN_total = 0.00, 
														$TXN_paid = 0.00, 
														$STS_ID = NULL, 
														$TXN_details = NULL, 
														$TXN_session_data = NULL, 
														$TXN_hash_salt = NULL, 
														$TXN_tax_data = NULL, 
														$TXN_ID = FALSE 
													) {
		if(is_array($TXN_timestamp)){
			parent::__construct($TXN_timestamp);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);											
//		$this->_TXN_ID 						= absint( $TXN_ID );
//		$this->_TXN_timestamp 		= $TXN_timestamp != NULL ? ( is_numeric( $TXN_timestamp ) ? absint( $TXN_timestamp ) : strtotime( $TXN_timestamp )) : time();
//		$this->_TXN_total 					= floatval( preg_replace( "/^[^0-9\.]-/", "", preg_replace( "/,/", ".", $TXN_total ) ));
//		$this->_TXN_paid 					= floatval( preg_replace( "/^[^0-9\.]-/", "", preg_replace( "/,/", ".", $TXN_paid ) ));
//		$this->_STS_ID 						= wp_strip_all_tags( $STS_ID );
//		$this->_TXN_details 				= maybe_unserialize($TXN_details);
//		$this->_TXN_session_data	= maybe_unserialize($TXN_session_data); //!is_serialized( $TXN_session_data ) ? maybe_serialize($TXN_session_data) : $TXN_session_data;
//		$this->_TXN_hash_salt 			= $TXN_hash_salt;
//		$this->_TXN_tax_data 			= maybe_unserialize($TXN_tax_data);//!is_serialized( $TXN_tax_data ) ? maybe_serialize( $TXN_tax_data ) : $TXN_tax_data;
	}





	/**
	*		Set transaction total
	* 
	* 		@access		public		
	*		@param		float		$total 		total value of transaction 
	*/	
	public function set_total( $total = FALSE ) {
		
		if ( $total === FALSE || ! is_numeric( $total )) {
			$msg = __( 'No total or an invalid total was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		// change commas to decimals
		$total = ( preg_replace( '/,/', '.', $total ));
		// remove all other characters and cast as float
		$this->_TXN_total = floatval( preg_replace( '/[^-0-9.]*/', '', $total ));

		return TRUE;
	}





	/**
	*		Set Total Amount Paid to Date
	* 
	* 		@access		public		
	*		@param		float		$total_paid 		total amount paid to date (sum of all payments)
	*/	
	public function set_paid( $total_paid = FALSE ) {
		
		if ( $total_paid === FALSE || ! is_numeric( $total_paid )) {
			$msg = __( 'No payment amount or an invalid payment amount was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		// change commas to decimals
		$total_paid = ( preg_replace( '/,/', '.', $total_paid ));
		// remove all other characters and cast as float
		$this->_TXN_paid = floatval( preg_replace( '/[^-0-9.]*/', '', $total_paid ));

		return TRUE;
	}





	/**
	*		Set transaction status
	* 
	* 		@access		public		
	*		@param		string		$status 		whether the transaction is open, declined, accepted, or any number of custom values that can be set
	*/	
	public function set_status( $status = FALSE ) {
		
		if ( ! $status ) {
			$msg = __( 'No status was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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
		return $this->set('TXN_details',$details);
		/*
		if ( ! $details ) {
			$msg = __( 'No details were supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_TXN_details = $details;
		return TRUE;*/
	}






	/**
	*		Set session data within the TXN object
	* 
	* 		@access		public		
	*		@param		string		$details 		dump off the entire session object 
	*/	
	public function set_txn_session_data( $session_data = FALSE ) {	
		return	$this->set('TXN_session_data',$session_data);
		/*if ( ! $session_data ) {
			$msg = __( 'No session data was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_TXN_session_data = $session_data;
		return TRUE;*/
	}





	/**
	*		Set hash salt
	* 
	* 		@access		public		
	*		@param		string		$hash_salt 		required for some payment gateways
	*/	
	public function set_hash_salt( $hash_salt = FALSE ) {
		
		if ( ! $hash_salt ) {
			$msg = __( 'No hash salt was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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
		
		if ( ! $tax_data ) {
			$msg = __( 'No tax data was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}	
		$this->_TXN_tax_data = $tax_data; 
		return TRUE;
	}






	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values		
	*/	
	private function _save_to_db( $where_cols_n_values = FALSE ) {
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php');
		$MODEL = EEM_Transaction::instance();
		
		//TXN_ID 	TXN_timestamp 	TXN_total 	TXN_paid 	STS_ID 	TXN_details 	TXN_tax_data 	TXN_session_data 	TXN_hash_salt
		$set_column_values = array(		
				'TXN_timestamp' 		=> $this->_TXN_timestamp,
				'TXN_total' 					=> $this->_TXN_total,
				'TXN_paid' 					=> $this->_TXN_paid,
				'STS_ID' 						=> $this->_STS_ID,
				'TXN_details' 				=> !is_serialized( $this->_TXN_details) ?maybe_serialize( $this->_TXN_details ) : $this->_TXN_details,
				'TXN_tax_data' 			=> !is_serialized( $this->_TXN_tax_data) ? maybe_serialize( $this->_TXN_tax_data ) : $this->_TXN_tax_data,
				'TXN_session_data'		=> !is_serialized( $this->_TXN_session_data ) ? maybe_serialize( $this->_TXN_session_data ) : $this->_TXN_session_data,
				'TXN_hash_salt' 			=> $this->_TXN_hash_salt
		);

		if ( $where_cols_n_values ){
			$results = $MODEL->update ( $set_column_values, $where_cols_n_values );
		} else {
			$results = $MODEL->insert ( $set_column_values );
			$this->_TXN_ID = $results['new-ID'];
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
		return (float)$this->_TXN_total;
	}





	/**
	*		get Total Amount Paid to Date
	* 		@access		public
	*		@return float
	*/	
	public function paid() {
		return (float)$this->_TXN_paid;
	}



	/**
	 * calculate the amount remaining for this transaction and return;
	 *
	 * @access public
	 * @return float amount remaining
	 */
	public function remaining() {
		return $this->total() - $this->paid();
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
		return $this->get('TXN_details');
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
		return $this->get('TXN_tax_data');
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
	 * Gets registrations on this transaction
	 * @return EE_Registration[]
	 */
	public function registrations(){
		return $this->get_many_related('Registrations');
	}
	
	/**
	 * Gets all the attendees for this transaction (handy for use with EE_Attendee's get_registrations_for_event function
	 * for getting attendees and how many registrations they each have for an event)
	 * @param string $output like 'OBJECT_K' or 'COUNT', like EEM_Base's select_all_where's $output parameter
	 * @return mixed EE_Attendee[] by default, int if $output is set to 'COUNT'
	 */
	public function attendees($output='OBJECT_K'){
		require_once('EEM_Attendee.model.php');
		$ATT = EEM_Attendee::instance();
		return $ATT->get_attendees_for_transaction($this,$output);
	}
	
	/**
	 * Gets teh primary registration only
	 * @return EE_Registration
	 */
	public function primary_registration( $return_obj = FALSE ){
		require_once('EEM_Registration.model.php');
		$result = $this->get_first_related('Registrations', array('REG_count'=>  EEM_Registration::PRIMARY_REGISTRANT_COUNT));
		return $result;//$return_obj ? array_shift($result) : $result;
	}
	
	
	
	/**
	 * Gets payments for this transaction. Unlike other such functions, order by 'DESC' by default
	 * @param type $where_col_n_vals all parameters just like EEM_Base's select_all_where
	 * @param type $orderby
	 * @param type $order
	 * @param type $operators
	 * @param type $limit
	 * @param type $output
	 * @return EE_Payment[]
	 */
	public function payments($where_col_n_vals = array(), $orderby = null, $order = 'DESC',$operators = '=', $limit = null, $output= 'OBJECT_K' ){
		return $this->get_many_related('Payments',$where_col_n_vals,$orderby,$order,$operators,$limit,$output);
	}
	
	
	/**
	 * gets only approved payments for this transaction
	 * @return EE_Payment[]
	 */
	public function approved_payments(){
		require_once('EEM_Payment.model.php');
		return $this->get_first_related('Payments', array('STS_ID'=>  EEM_Payment::status_id_approved), 'PAY_timestamp', 'DESC');
	}
	
	
	/**
	 * returns a pretty version of the status, good for displayign to users
	 * @return string
	 */
	public function pretty_status(){
		switch($this->status_ID()){
			case EEM_Transaction::complete_status_code:
				return __("Complete",'event_espresso');
			case EEM_Transaction::incomplete_status_code:
				return __('Incomplete','event_espresso');
			case EEM_Transaction::pending_status_code:
				return __('Pending Payment','event_espresso');
			default:
				return __('Unknown','event_espresso');
		}
	}
	
	
	/**
	 * echoes $this->pretty_status()
	 * @return void
	 */
	public function e_pretty_status(){
		echo $this->pretty_status();
	}
	
	
	
	/**
	 * Returns whether this transaction is complete
	 * Useful in templates and other logic for deciding if we should ask for another payment...
	 * @return boolean
	 */
	public function is_completed(){
		if($this->status_ID()==EEM_Transaction::complete_status_code){
			return true;
		}else{
			return false;
		}
	}
	
	
	
	/**
	 * Returns whether this transaction is pending
	 * Useful in templates and other logic for deciding if we should ask for another payment...
	 * @return boolean
	 */
	public function is_pending(){
		if($this->status_ID() == EEM_Transaction::pending_status_code){
			return true;
		}else{
			return false;
		}
	}
	
	
	
	
	/**
	 * Returns whether this transaction is incomplete
	 * Useful in templates and other logic for deciding if we should ask for another payment...
	 * @return boolean
	 */
	public function is_incomplete(){
		if($this->status_ID() == EEM_Transaction::incomplete_status_code){
			return true;
		}else{
			return false;
		}
	}



	/**
	 * This returns the url for the invoice of this transaction
	 *
	 * @access public
	 * @return string
	 */
	public function invoice_url() {
		$REG = $this->primary_registration();
		if ( empty( $REG ) ) return false;
		return $REG->invoice_url();
	}



	/**
	 * Gets the URL of the thank you page with this registraiton REG_url_link added as
	 * a query parameter
	 *
	 * @access public
	 * @return string
	 */
	public function payment_overview_url() {
		$REG = $this->primary_registration();
		if ( empty($REG) ) return false;
		return $REG->payment_overview_url();
	}



}



/* End of file EE_Transaction.class.php */
/* Location: includes/classes/EE_Transaction.class.php */		