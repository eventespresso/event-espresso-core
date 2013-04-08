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
class EE_Payment extends EE_Base_Class{


    /**
    *	Payment ID
	*
	* 	primary key
	*
	* 	@access	protected
    *	@var int
    */
	protected $_PAY_ID = FALSE;


    /**
    *	Transaction ID
	*
	*	@access	protected
    *	@var int
    */
	protected $_TXN_ID = NULL;


    /**
    *	Payment Status
	*
	*	@access	protected
    *	@var string
    */
	protected $_STS_ID = NULL;


    /**
    *	Payment Timestamp
	*
	*	@access	protected
    *	@var int
    */
	protected $_PAY_timestamp = NULL;


    /**
    *	Payment Method
	*
	*	@access	protected
    *	@var string
    */
	protected $_PAY_method = NULL;


    /**
    *	Payment Amount
	*
	*	@access	protected
    *	@var float
    */
	protected $_PAY_amount = NULL;


    /**
    *	Payment Gateway utilized 
	*
	*	@access	protected
    *	@var string
    */
	protected $_PAY_gateway = NULL;


    /**
    *	Gateway Response
	*
	*	@access	protected
    *	@var string
    */
	protected $_PAY_gateway_response = NULL;


    /**
    *	Gateway Transaction ID or Cheque #
	*
	*	@access	protected
    *	@var string
    */
	protected $_PAY_txn_id_chq_nmbr = NULL;

 	 	 	
    /**
    *	Purchase Order Number
	*
	*	@access	protected
    *	@var string
    */
	protected $_PAY_po_number = NULL;

 	 	 	
    /**
    *	Extra Accounting Field
	*
	*	@access	protected
    *	@var string
    */
	protected $_PAY_extra_accntng = NULL;


    /**
    *	Payment made via admin
	*
	*	@access	protected
    *	@var string
    */
	protected $_PAY_via_admin = NULL;


    /**
    *	Payment Details
	*
	*	@access	protected
    *	@var string
    */
	protected $_PAY_details = NULL;

	
	
	/**
	 * Transaction this payment was for
	 * @var EE_Transaction
	 */
	protected $_Transaction = NULL;

	
	
	
	/**
	 * Status of this payment
	 * @var EE_Status
	 */
	protected $_Status = NULL;




	/**
	*  Payment constructor
	*
	* @access 		public
	* @param 		int/array				$TXN_ID		 							Transaction ID or array of all column values, where keys are column names
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
		if(is_array($TXN_ID)){
			parent::__construct($TXN_ID);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);											
		// filter out unwanted junk from Pay_details
//		if ( is_array( $PAY_details )) {
//			array_walk_recursive( $PAY_details, array( $this, '_strip_all_tags_within_array' ));
//		} else {
//			$PAY_details =  wp_strip_all_tags( $PAY_details );
//		}
//
//		$this->_PAY_ID 								= absint( $PAY_ID );
//		$this->_TXN_ID 								= absint( $TXN_ID );
//		$this->_STS_ID 								= strtoupper( sanitize_key( $STS_ID ));
//		$this->_PAY_timestamp			 	= $PAY_timestamp != NULL ? ( is_numeric( $PAY_timestamp ) ? absint( $PAY_timestamp ) : strtotime( $PAY_timestamp )) : time();
//		$this->_PAY_method 					= strtoupper( sanitize_key( $PAY_method ));
//		$this->_PAY_amount					= floatval( preg_replace( '/[^-0-9.]*/', '', preg_replace( '/,/', '.', $PAY_amount )));
//		$this->_PAY_gateway					= wp_strip_all_tags( $PAY_gateway );
//		$this->_PAY_gateway_response	= htmlentities( wp_strip_all_tags( $PAY_gateway_response ), ENT_QUOTES, 'UTF-8' ); 
//		$this->_PAY_txn_id_chq_nmbr		=  wp_strip_all_tags( $PAY_txn_id_chq_nmbr );
//		$this->_PAY_po_number				=  wp_strip_all_tags( $PAY_po_number ) ;
//		$this->_PAY_extra_accntng			= wp_strip_all_tags( $PAY_extra_accntng );
//		$this->_PAY_via_admin				= absint( $PAY_via_admin ) ? TRUE : FALSE;
//		$this->_PAY_details						= maybe_serialize( $PAY_details );
	}





	/**
	*		Set Transaction ID
	*
	* 		@access		public
	*		@param		int		$TXN_ID
	*/
	public function set_transaction( $TXN_ID = FALSE ) {

		if ( ! $TXN_ID ) {
			$msg = __( 'No Transaction ID was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_TXN_ID = absint( $TXN_ID );
		return TRUE;
	}
	
	
	
	
	/**
	 * Gets the transaction related to this payment
	 * @return EE_Transaction
	 */
	public function transaction(){
		return $this->get_first_related('Transaction');
	}






	/**
	*		Set Status
	*
	* 		@access		public
	*		@param		string		$STS_ID
	*/
	public function set_status( $STS_ID = FALSE ) {

		if ( ! $STS_ID ) {
			$msg = __( 'No Status was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( ! $timestamp ) {
			$msg = __( 'No Timestamp was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( ! $pay_method ) {
			$msg = __( 'No Payment Method was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if (  $amount === FALSE || ! is_numeric( $amount ) ) {
			$msg = __( 'No Payment Amount or an invalid Payment Amount was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( ! $gateway ) {
			$msg = __( 'No Payment Gateway was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( ! $gateway_response ) {
			$msg = __( 'No Payment Gateway Response was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( ! $txn_id_chq_nmbr ) {
			$msg = __( 'No Gateway Transaction ID or Cheque # was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( ! $po_number ) {
			$msg = __( 'No Purchase Order Number info was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( ! $extra_accntng ) {
			$msg = __( 'No Notes or Extra Accounting Field info was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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

		if ( ! is_bool( $via_admin )) {
			$msg = __( 'The supplied value for the "payment made via admin" flag was not a boolean.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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
		if ( is_array( $details )) {
			array_walk_recursive( $details, array( $this, '_strip_all_tags_within_array' ));
		} else {
			$details =  wp_strip_all_tags( $details );
		}
		return $this->set('PAY_details',$details);
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
				'PAY_details'						=> maybe_serialize($this->_PAY_details)
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
		return $this->get('PAY_details');
	}
	
	
	/**
	 * returns a pretty version of the status, good for displayign to users
	 * @return string
	 */
	public function pretty_status(){
		switch($this->STS_ID()){
			case EEM_Payment::status_id_approved:
				return __("Accepted",'event_espresso');
			case EEM_Payment::status_id_pending:
				return __("Pending",'event_espresso');
			case EEM_Payment::status_id_cancelled:
				return __('Cancelled','event_espresso');
			case EEM_Payment::status_id_declined:
				return __('Declined','event_espresso');
			case EEM_Payment::status_id_failed:
				return __('Failed','event_espresso');
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
	 * Generally determines if teh status of this payment equals
	 * the $STS_ID string
	 * @param string $STS_ID an ID from the esp_status table/
	 * one of the status_id_* on the EEM_Payment model
	 * @return boolean whether the status of this payment equals the status id
	 */
	protected function status_is($STS_ID){
		if($STS_ID == $this->STS_ID()){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * For determining the statsu of teh payment
	 * @return boolean whether the payment is approved or not
	 */
	public function is_approved(){
		return $this->status_is(EEM_Payment::status_id_approved);
	}
	
	
	
	
	/**
	 * For determining the statsu of teh payment
	 * @return boolean whether the payment is pending or not
	 */
	public function is_pending(){
		return $this->status_is(EEM_Payment::status_id_pending);
	}
	
	
	
	
	/**
	 * For determining the statsu of teh payment
	 * @return boolean
	 */
	public function is_cancelled(){
		return $this->status_is(EEM_Payment::status_id_cancelled);
	}
	
	
	
	/**
	 * For determining the statsu of teh payment
	 * @return boolean
	 */
	public function is_declined(){
		return $this->status_is(EEM_Payment::status_id_declined);
	}
	
	
	
	
	/**
	 * For determining the statsu of teh payment
	 * @return boolean
	 */
	public function is_failed(){
		return $this->status_is(EEM_Payment::status_id_failed);
	}
	
	
	/**
	 * Echoes out the payment overview HTML from the gateway used on this payment
	 */
	public function e_gateway_payment_overview_content(){
		echo $this->gateway_payment_overview_content();
	}
	
	/**
	 * Gets the payment overview content from the gateway used on this payment.
	 * @return string
	 */
	public function gateway_payment_overview_content(){
		$gateway_name = $this->gateway();
		$EEM_Gateways = EEM_Gateways::instance();	
		//call its render payment results, feeding it the current payment
		return $EEM_Gateways->get_payment_overview_content($gateway_name,$this);
	}




	/**
	*		Apply a Payment to a Transaction, update all totals, and save payment info to db
	* 		@param		boolean 		$via_admin
	* 		@access		public
	*/
	public function apply_payment_to_transaction( $via_admin = FALSE ) {		
		if( ! $this->ID()){
			$this->save();
		}
		// recalculate and set  total paid
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php');
		$PAY_MODEL = EEM_Payment::instance();
		$success = $PAY_MODEL->update_payment_transaction( $this, 'processed' );
		return $success;
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



}

/* End of file EE_Payment.class.php */
/* Location: /includes/classes/EE_Payment.class.php */
