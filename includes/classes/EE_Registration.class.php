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
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Registration class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Registration.class.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
//require_once ( 'EE_Base_Class.class.php' );
class EE_Registration extends EE_Base_Class {
	
    /**
    *	Registration ID
	* 
	* 	primary key
	*	
	* 	@access	protected
    *	@var int	
    */
	protected $_REG_ID = FALSE;

	
	
	
    /**
    *	Event ID
	* 
	*	foreign key from event table
	*  
	*	@access	protected
    *	@var int	
    */
	protected $_EVT_ID = NULL;
	
	
	
    /**
    *	Attendee ID
	* 
	* 	foreign key from attendee table
	*
	*	@access	protected
    *	@var int	
    */
	protected $_ATT_ID = NULL;	
	
	
    /**
    *	Transaction ID
	*
	*	foreign key from transaction table
	* 
	*	@access	protected
    *	@var int	
    */
	protected $_TXN_ID = NULL;
	
	
    /**
    *	Datetime ID
	* 
    *	foreign key from Datetime table
	* 
	*	@access	protected
    *	@var int	
    */
	protected $_DTT_ID = NULL;	
	
	
    /**
    *	Price ID
	* 
    *	foreign key from Price table
	* 
	*	@access	protected
    *	@var int	
    */
	protected $_PRC_ID = NULL;	
	
	
    /**
    *	Status ID
	* 
    *	registration status code - Pending, Complete, Incomplete
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_STS_ID = NULL;	
	
	
    /**
    *	Registration Date
	* 
    *	Unix timestamp
	* 
	*	@access	protected
    *	@var int	
    */
	protected $_REG_date = NULL;	
	
	
    /**
    *	Final Price
	* 
    *	Final Price for ticket after all modifications
	* 
	*	@access	protected
    *	@var float	
    */
	protected $_REG_final_price = NULL;	
	
	
	
    /**
    *	PHP Session ID
	*  
	*	@access	protected
    *	@var string	
    */
	protected $_REG_session = NULL;	
	
	
	
    /**
    *	Registration Code
	* 
    *	a unique string for public identification ( = existing registration_id )
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_REG_code = NULL;	
	
	
	
    /**
    *	Registration URL Link
	* 
    *	a unique string for use in email links, etc
	* 
	*	@access	protected
    *	@var string	
    */
	protected $_REG_url_link = NULL;	
	
	
	
    /**
    *	Attendee Number
	* 
    *	Simple attendee counter where the Primary Registrant is always #1
	* 
	*	@access	protected
    *	@var int	
    */
	protected $_REG_count = 1;		
	
	
    /**
    *	Group Size
	* 
    *	total number of registrations that were performed in the same session
	* 
	*	@access	protected
    *	@var int	
    */
	protected $_REG_group_size = 1;	
	
	
    /**
    *	Attendee Is Going
	* 
    *	whether or not the attendee has confirmed they will be going to the event
	* 
	*	@access	protected
    *	@var boolean	
    */
	protected $_REG_att_is_going = 0;	
	
	
    /**
    *	Attendee Checked In
	* 
    *	whether or not the attendee checked in at the event
	* 
	*	@access	protected
    *	@var boolean	
    */
	protected $_REG_att_checked_in = NULL;	

	
	/**
	 * Event for which this registration is for
	 * 
	 * @access protected
	 * @var EE_Event
	 */
	protected $_Event = NULL;
	
	
	/**
	 * Attendee data for this registration
	 * 
	 * @access protected
	 * @var EE_Attendee
	 */
	protected $_Attendee = NULL;
	
	
	/**
	 * Transaction of this Registration
	 * @access protected
	 * @var EE_Tranaction
	 */
	protected $_Transaction = NULL;
	
	
	/**
	 * Datetime of the Event this registratino is for
	 * @access protected
	 * @var EE_Datetime
	 */
	protected $_Datetime = NULL;
	
	
	/**
	 * Price of the Event this registration paid
	 * @access protected
	 * @var EE_Price
	 */
	protected $_Price = NULL;
	
	
	/**
	 * Status of the registration
	 * @access protected
	 * @var EE_Status (looks unfinished right now)
	 */
	protected $_Status = NULL;
	
	/**
	 * Answers made to questions for this registration
	 * @access protected 
	 * @var EE_Answer[]
	 */
	protected $_Answer = NULL;


	/**
	*  Registration constructor
	*
	* @access 		public
	* @param 		int/array 				$EVT_ID 							Event ID or array of column-values, where keys are column names
	* @param 		int 				$ATT_ID 							Attendee ID
	* @param 		int 				$TXN_ID 							Transaction ID
	* @param 		int 				$DTT_ID 							Transaction ID
	* @param 		int 				$PRC_ID 							Transaction ID
	* @param 		int				$STS_ID		 					Status ID
	* @param 		int				$REG_date					 	Registration Date
	* @param 		float				$REG_final_price			Price Paid
	* @param 		string			$REG_session  				PHP Session ID
	* @param 		string 			$REG_code  					Registration Code
	* @param 		string 			$REG_url_link					Registration URL Link
	* @param 		int				$REG_count 					Attendee Counter
	* @param 		boolean		$REG_group_size			Group Size
	* @param 		boolean		$REG_att_is_going		 	Attendee Is Going
	* @param 		boolean		$REG_att_checked_in	Attendee Checked In
	* @param 		int 				$REG_ID 							Registration ID
	*/
	public function __construct( 
													$EVT_ID = NULL, 
													$ATT_ID = NULL, 
													$TXN_ID = NULL, 
													$DTT_ID = NULL, 
													$PRC_ID = NULL, 
													$STS_ID = NULL, 
													$REG_date = NULL, 
													$REG_final_price = NULL, 
													$REG_session = NULL, 
													$REG_code = NULL, 
													$REG_url_link = NULL, 
													$REG_count = 1, 
													$REG_group_size = 1, 
													$REG_att_is_going = NULL, 
													$REG_att_checked_in = NULL, 
													$REG_ID = NULL 
												) {
		if(is_array($EVT_ID)){
			parent::__construct($EVT_ID);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);											
		// REG_ID 	EVT_ID 	ATT_ID 	TXN_ID 	DTT_ID 	PRC_ID 	STS_ID 	REG_date 	REG_session 	REG_code 	REG_count 	REG_group_size 	REG_att_is_going 	REG_att_checked_in
//		$this->_REG_ID 						= $REG_ID;
//		$this->_EVT_ID 						= $EVT_ID;
//		$this->_ATT_ID 						= $ATT_ID;
//		$this->_TXN_ID 						= $TXN_ID;
//		$this->_DTT_ID 						= $DTT_ID;
//		$this->_PRC_ID 						= $PRC_ID;
//		$this->_STS_ID 						= $STS_ID;
//		$this->_REG_date 					= $REG_date;
//		$this->_REG_final_price			= $REG_final_price;
//		$this->_REG_session 				= $REG_session;
//		$this->_REG_code					= $REG_code;
//		$this->_REG_url_link				= $REG_url_link;
//		$this->_REG_count 					= $REG_count;
//		$this->_REG_group_size 		= $REG_group_size;
//		$this->_REG_att_is_going 		= $REG_att_is_going;
//		$this->_REG_att_checked_in	= $REG_att_checked_in;
	}





	/**
	*		Set Event ID
	* 
	* 		@access		public		
	*		@param		int		$EVT_ID 		Event ID
	*/	
	public function set_event( $EVT_ID = FALSE ) {		
		$this->set('EVT_ID',$EVT_ID);
	}



	/**
	*		Set Attendee ID
	* 
	* 		@access		public		
	*		@param		int		$ATT_ID 		Attendee ID
	*/	
	public function set_attendee_id( $ATT_ID = FALSE ) {		
		$this->set('ATT_ID',$ATT_ID);
	}



	/**
	*		Set Transaction ID
	* 
	* 		@access		public		
	*		@param		int		$TXN_ID 		Transaction ID
	*/	
	public function set_transaction_id( $TXN_ID = FALSE ) {		
		$this->set('TXN_ID',$TXN_ID);
	}



	/**
	*		Set Session 
	* 
	* 		@access		public		
	*		@param		string		$REG_session 		PHP Session ID
	*/	
	public function set_session( $REG_session = FALSE ) {		
		$this->set('REG_session',$REG_session);
	}



	/**
	*		Set Registration Code 
	* 
	* 		@access		public		
	*		@param		string		$REG_code 		Registration Code
	*/	
	public function set_reg_code( $REG_code = FALSE ) {		
		$this->set('REG_code',$REG_code);
	}



	/**
	*		Set Registration URL Link 
	* 
	* 		@access		public		
	*		@param		string		$REG_url_link 		Registration URL Link 
	*/	
	public function set_reg_url_link( $REG_url_link = FALSE ) {		
		$this->set('REG_url_link',$REG_url_link);
	}



	/**
	*		Set Attendee Counter
	* 
	* 		@access		public		
	*		@param		boolean		$REG_count 		Primary Attendee
	*/	
	public function set_count( $REG_count = FALSE ) {		
		$this->set('REG_count',$REG_count);
	}



	/**
	*		Set Group Size
	* 
	* 		@access		public		
	*		@param		boolean		$REG_group_size 		Group Registration
	*/	
	public function set_group_size( $REG_group_size = FALSE ) {		
		$this->set('REG_group_size',$REG_group_size);
	}



	/**
	*		Set Status ID
	* 
	* 		@access		public		
	*		@param		int		$STS_ID 		Status ID
	*/	
	public function set_status( $STS_ID = FALSE ) {		
		$this->set('STS_ID',$STS_ID);
	}



	/**
	*		Set Registration Date
	* 
	* 		@access		public		
	*		@param		mixed ( int or string )		$REG_date 		Registration Date - Unix timestamp or string representation of Date
	*/	
	public function set_reg_date( $REG_date = FALSE ) {		
		$this->set('REG_date',$REG_date);
	}



	/**
	*		Set final Price Paid for ticket after all modifications
	* 
	* 		@access		public		
	*		@param		float		$REG_final_price 		Price Paid
	*/	
	public function set_price_paid( $REG_final_price = FALSE ) {		
		$this->set('REG_final_price',$REG_final_price);
	}



	/**
	*		Set Price ID
	* 
	* 		@access		public		
	*		@param		float		$PRC_ID 		Price ID
	*/	
	public function set_price_id( $PRC_ID = FALSE ) {		
		$this->set('PRC_ID',$PRC_ID);
	}



	/**
	*		Attendee Is Going
	* 
	* 		@access		public		
	*		@param		boolean		$REG_att_is_going 		Attendee Is Going
	*/	
	public function set_att_is_going( $REG_att_is_going = NULL ) {		
		$this->set('REG_att_is_going',$REG_att_is_going);
	}



	/**
	*		Attendee Checked In
	* 
	* 		@access		public		
	*		@param		boolean		$REG_att_checked_in 		Attendee Checked In
	*/	
	public function set_att_checked_in( $REG_att_checked_in = NULL ) {		
		$this->set('REG_att_checked_in',$REG_att_checked_in);
	}


	
	/**
	 * Returns the related EE_Transaction to this registration
	 * @return EE_Transaction	 
	 */
	public function transaction(){
		return $this->get_first_related('Transaction');
	}
	
	
	/**
	 * Gets the reltaed attendee
	 * @return EE_Attendee
	 */
	public function attendee(){
		return $this->get_first_related('Attendee');
	}




	/**
	*		get Event ID
	* 		@access		public
	*/	
	public function event_ID() {
		return $this->get('EVT_ID');
	}



	/**
	*		get Event ID
	* 		@access		public
	*/	
	public function event_name() {
		if ( empty( $this->_EVT_ID )) {
			return FALSE;
		}
		global $wpdb;
		$SQL = 'SELECT event_name, slug FROM ' . $wpdb->prefix . 'events_detail WHERE id = %d';
		return $wpdb->get_var( $wpdb->prepare( $SQL, $this->_EVT_ID ));
	}



	/**
	 * get Event daytime id
	 *
	 * @access public
	 * @return int
	 */
	public function event_daytime_id() {
		if ( empty( $this->_EVT_ID ) ) {
			return FALSE;
		}

		global $wpdb;
		$SQL = "SELECT DTT_ID FROM " . ESP_DATETIME . " WHERE EVT_ID = %s";
		return $wpdb->get_var( $wpdb->prepare( $SQL, $this->_EVT_ID ) );
	}


	/**
	 * just get the entire event
	 * @todo eventually this will change when events are in a proper model/class and can be retrieved with `get_first_related()`
	 *
	 * @access public
	 * @return object
	 */
	public function event() {
		if ( empty ( $this->_EVT_ID ) ) {
			return FALSE;
		}

		global $wpdb;
		$SQL = "SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id = %s";
		$event = $wpdb->get_row( $wpdb->prepare( $SQL, $this->_EVT_ID ) );
		return $event;
	}



	/**
	*		get Attendee ID
	* 		@access		public
	*/	
	public function attendee_ID() {
		return $this->get('ATT_ID');
	}



	/**
	*		get Transaction ID
	* 		@access		public
	*/	
	public function transaction_ID() {
		return $this->get('TXN_ID');
	}



	/**
	*		get PHP Session ID
	* 		@access		public
	*/	
	public function session_ID() {
		return $this->get('REG_session');
	}



	/**
	*		get Registration Code
	* 		@access		public
	*/	
	public function reg_code() {
		return $this->get('REG_code');
	}



	/**
	*		get Registration URL Link
	* 		@access		public
	*/	
	public function reg_url_link() {
		return $this->get('REG_url_link');
	}
	
	
	
	
	
	/**
	 * Echoes out invoice_url()
	 * @return void
	 */
	public function e_invoice_url(){
		echo $this->invoice_url();
	}
	
	
	
	
	
	/**
	 * Gets the string which represents the URL for the invoice PDF for this registration.
	 * Dependant on code in ee/includes/functions/init espresso_export_invoice
	 * @return string
	 */
	public function invoice_url(){
		return home_url() . '/?invoice_launch=true&amp;id=' . $this->reg_url_link();
	}

	
	
	
	
	
	/**
	 * Echoes out payment_overview_url
	 */
	public function e_payment_overview_url(){
		echo $this->payment_overview_url();
	}
	
	
	
	
	
	/**
	 * Gets the URL of the thank you page with this registraiton REG_url_link added as
	 * a query parameter
	 * @return string
	 */
	public function payment_overview_url(){
		global $org_options;
		return add_query_arg(array('e_reg_url_link'=>$this->reg_url_link()),get_permalink($org_options['return_url']));
	}


	
	
	/**
	*		get  Attendee Number
	* 		@access		public
	*/	
	public function count() {
		return $this->get('REG_count');
	}



	/**
	*		get Group Size
	* 		@access		public
	*/	
	public function group_size() {
		return $this->get('REG_group_size');
	}



	/**
	*		get Status ID
	* 		@access		public
	*/	
	public function status_ID() {
		return $this->get('STS_ID');
	}



	/**
	*		get Registration Date
	* 		@access		public
	*/	
	public function date() {
		return $this->get('REG_date');
	}
	
	/**
	 * get datetime object for this registration
	 *
	 * @access public
	 * @return EE_Datetime
	 */
	public function date_obj() {
		return $this->get_first_related('Datetime');
	}



	/**
	*		get Price Paid
	* 		@access		public
	*/	
	public function price_paid() {
		return $this->get('REG_final_price');
	}
	
	
	/**
	 * Returns a nice version of the status for displaying to customers
	 * @return string
	 */
	public function pretty_status(){
		require_once('EEM_Registration.model.php');
		switch($this->status_ID()){
			case EEM_Registration::status_id_approved:
				return __("Approved",'event_espresso');
			case EEM_Registration::status_id_not_approved:
				return __("Not Approved",'event_espresso');
			case EEM_Registration::status_id_pending:
				return __("Pending Approval",'event_espresso');
			case EEM_Registration::status_id_cancelled:
				return __("Cancelled",'event_espresso');
			default:
				return __("Unknown",'event_espresso');
		}
	}

	
	
	/**
	 * Prints out the return value of $this->pretty_status()
	 * @return void
	 */
	public function e_pretty_status(){
		echo $this->pretty_status();
	}


	/**
	*		get Price ID
	* 		@access		public
	*/	
	public function price_ID() {
		return $this->get('PRC_ID');
	}



	/**
	 * get price object for this registration
	 *
	 * @access public
	 * @return EE_Price
	 */
	public function price_obj() {
		return $this->get_first_related('Price');
	}



	/**
	*		get Attendee Is Going
	* 		@access		public
	*/	
	public function att_is_going() {
		return $this->get('REG_att_is_going');
	}



	/**
	*		get Attendee Checked In
	* 		@access		public
	*/	
	public function att_checked_in() {
		return $this->get('REG_att_checked_in');
	}
	
	/**
	 * Gets related answers
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Answer[]
	 */
	public function answers($query_params = null){
		return $this->get_many_related('Answer',$query_params);
	}
}


/* End of file EE_Registration.class.php */
/* Location: includes/classes/EE_Registration.class.php */	