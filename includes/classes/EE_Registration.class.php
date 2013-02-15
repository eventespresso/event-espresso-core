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
    *	Is Primary Attendee
	* 
    *	whether or not this is the primary attendee for a group of registrations
	* 
	*	@access	protected
    *	@var boolean	
    */
	protected $_REG_is_primary = NULL;		
	
	
    /**
    *	Is Group Registration
	* 
    *	whether or not this registration is part of a group of registrations
	* 
	*	@access	protected
    *	@var boolean	
    */
	protected $_REG_is_group_reg = NULL;	
	
	
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
	 * @var object (should be EE_Event, but its not create dyet)
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
	protected $_Answers = NULL;


	/**
	*  Registration constructor
	*
	* @access 		public
	* @param 		int 				$EVT_ID 							Event ID
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
	* @param 		boolean		$REG_is_primary 			Is Primary Attendee
	* @param 		boolean		$REG_is_group_reg		Is Group Registration
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
													$REG_is_primary = NULL, 
													$REG_is_group_reg = NULL, 
													$REG_att_is_going = NULL, 
													$REG_att_checked_in = NULL, 
													$REG_ID = NULL 
												) {
												
		// REG_ID 	EVT_ID 	ATT_ID 	TXN_ID 	DTT_ID 	PRC_ID 	STS_ID 	REG_date 	REG_session 	REG_code 	REG_is_primary 	REG_is_group_reg 	REG_att_is_going 	REG_att_checked_in
		$this->_REG_ID 						= $REG_ID;
		$this->_EVT_ID 						= $EVT_ID;
		$this->_ATT_ID 						= $ATT_ID;
		$this->_TXN_ID 						= $TXN_ID;
		$this->_DTT_ID 						= $DTT_ID;
		$this->_PRC_ID 						= $PRC_ID;
		$this->_STS_ID 						= $STS_ID;
		$this->_REG_date 					= $REG_date;
		$this->_REG_final_price		= $REG_final_price;
		$this->_REG_session 				= $REG_session;
		$this->_REG_code					= $REG_code;
		$this->_REG_url_link				= $REG_url_link;
		$this->_REG_is_primary 		= $REG_is_primary;
		$this->_REG_is_group_reg 	= $REG_is_group_reg;
		$this->_REG_att_is_going 	= $REG_att_is_going;
		$this->_REG_att_checked_in= $REG_att_checked_in;
	}





	/**
	*		Set Event ID
	* 
	* 		@access		public		
	*		@param		int		$EVT_ID 		Event ID
	*/	
	public function set_event( $EVT_ID = FALSE ) {		
		if ( ! $this->_check_for( $EVT_ID, 'Event ID' )) { return FALSE; }
		$this->_EVT_ID = absint( $EVT_ID );
		return TRUE;
	}



	/**
	*		Set Attendee ID
	* 
	* 		@access		public		
	*		@param		int		$ATT_ID 		Attendee ID
	*/	
	public function set_attendee( $ATT_ID = FALSE ) {		
		if ( ! $this->_check_for( $ATT_ID, 'Attendee ID' )) { return FALSE; }
		$this->_ATT_ID = absint( $ATT_ID );
		return TRUE;
	}



	/**
	*		Set Transaction ID
	* 
	* 		@access		public		
	*		@param		int		$TXN_ID 		Transaction ID
	*/	
	public function set_transaction( $TXN_ID = FALSE ) {		
		if ( ! $this->_check_for( $TXN_ID, 'Transaction ID' )) { return FALSE; }
		$this->_TXN_ID = absint( $TXN_ID );
		return TRUE;
	}



	/**
	*		Set Session 
	* 
	* 		@access		public		
	*		@param		string		$REG_session 		PHP Session ID
	*/	
	public function set_session( $REG_session = FALSE ) {		
		if ( ! $this->_check_for( $REG_session, 'PHP Session ID' )) { return FALSE; }
		$this->_REG_session = wp_strip_all_tags( $REG_session );
		return TRUE;
	}



	/**
	*		Set Registration Code 
	* 
	* 		@access		public		
	*		@param		string		$REG_code 		Registration Code
	*/	
	public function set_reg_code( $REG_code = FALSE ) {		
		if ( ! $this->_check_for( $REG_code, 'Registration Code' )) { return FALSE; }
		$this->_REG_code = wp_strip_all_tags( $REG_code );
		return TRUE;
	}



	/**
	*		Set Registration URL Link 
	* 
	* 		@access		public		
	*		@param		string		$REG_url_link 		Registration URL Link 
	*/	
	public function set_reg_url_link( $REG_url_link = FALSE ) {		
		if ( ! $this->_check_for( $REG_url_link, 'Registration URL Link' )) { return FALSE; }
		$this->_REG_url_link = wp_strip_all_tags( $REG_url_link );
		return TRUE;
	}



	/**
	*		Set Is Primary Attendee
	* 
	* 		@access		public		
	*		@param		boolean		$REG_is_primary 		Primary Attendee
	*/	
	public function set_is_primary( $REG_is_primary = FALSE ) {		
		if ( ! $this->_check_for( $REG_is_primary, 'Primary Attendee' )) { return FALSE; }
		$this->_REG_is_primary = absint( $REG_is_primary );
		return TRUE;
	}



	/**
	*		Set Is Group Registration
	* 
	* 		@access		public		
	*		@param		boolean		$REG_is_group_reg 		Group Registration
	*/	
	public function set_is_group_reg( $REG_is_group_reg = FALSE ) {		
		if ( ! $this->_check_for( $REG_is_group_reg, 'Group Registration' )) { return FALSE; }
		$this->_REG_is_group_reg = absint( $REG_is_group_reg );
		return TRUE;
	}



	/**
	*		Set Status ID
	* 
	* 		@access		public		
	*		@param		int		$STS_ID 		Status ID
	*/	
	public function set_status( $STS_ID = FALSE ) {		
		if ( ! $this->_check_for( $STS_ID, 'Status ID' )) { return FALSE; }
		$this->_STS_ID = absint( $STS_ID );
		return TRUE;
	}



	/**
	*		Set Registration Date
	* 
	* 		@access		public		
	*		@param		mixed ( int or string )		$REG_date 		Registration Date - Unix timestamp or string representation of Date
	*/	
	public function set_reg_date( $REG_date = FALSE ) {		
		if ( ! $this->_check_for( $REG_date, 'Registration Date' )) { return FALSE; }
		// check if supplied date is a timestamp
		if( is_numeric( $REG_date )) {
			$this->_REG_date = absint( $REG_date );
		} else {
			$this->_REG_date = strtotime( $REG_date );
		}
		return TRUE;
	}



	/**
	*		Set final Price Paid for ticket after all modifications
	* 
	* 		@access		public		
	*		@param		float		$REG_final_price 		Price Paid
	*/	
	public function set_price_paid( $REG_final_price = FALSE ) {		
		if ( ! $REG_final_price ) { return FALSE; }
		$this->_REG_final_price = abs( $REG_final_price );
		return TRUE;
	}



	/**
	*		Set Price ID
	* 
	* 		@access		public		
	*		@param		float		$PRC_ID 		Price ID
	*/	
	public function set_price( $PRC_ID = FALSE ) {		
		if ( ! $this->_check_for( $PRC_ID, 'Price ID' )) { return FALSE; }
		$this->_PRC_ID = preg_replace('/^[0-9.]+$/', '', $PRC_ID);
		return TRUE;
	}



	/**
	*		Attendee Is Going
	* 
	* 		@access		public		
	*		@param		boolean		$REG_att_is_going 		Attendee Is Going
	*/	
	public function set_att_is_going( $REG_att_is_going = FALSE ) {		
		if ( ! $this->_check_for( $REG_att_is_going, 'Attendee Is Going' )) { return FALSE; }
		$this->_REG_att_is_going = absint( $REG_att_is_going );
		return TRUE;
	}



	/**
	*		Attendee Checked In
	* 
	* 		@access		public		
	*		@param		boolean		$REG_att_checked_in 		Attendee Checked In
	*/	
	public function set_att_checked_in( $REG_att_checked_in = FALSE ) {		
		if ( ! $this->_check_for( $REG_att_checked_in, 'Attendee Checked In' )) { return FALSE; }
		$this->_REG_att_checked_in = absint( $REG_att_checked_in );
		return TRUE;
	}





	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values
	*		@return int, 1 on a successful update, the ID of
	*					the new entry on insert; 0 on failure				
	*/	
	private function _save_to_db( $where_cols_n_values = FALSE ) {
		
		 $MODEL = EEM_Registration::instance();
		
		$set_column_values = array(		
				'EVT_ID' 						=> $this->_EVT_ID,
				'ATT_ID' 						=> $this->_ATT_ID,
				'TXN_ID' 						=> $this->_TXN_ID,
				'DTT_ID' 						=> $this->_DTT_ID,
				'PRC_ID' 						=> $this->_PRC_ID,
				'STS_ID' 						=> $this->_STS_ID,
				'REG_date' 					=> $this->_REG_date,
				'REG_final_price' 		=> $this->_REG_final_price,
				'REG_session' 				=> $this->_REG_session,
				'REG_code'					=> $this->_REG_code,
				'REG_url_link'				=> $this->_REG_url_link,
				'REG_is_primary' 		=> $this->_REG_is_primary,
				'REG_is_group_reg' 	=> $this->_REG_is_group_reg,
				'REG_att_is_going' 		=> $this->_REG_att_is_going,
				'REG_att_checked_in' => $this->_REG_att_checked_in
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
		return $this->save();
	}


	/**
	*	insert new db record
	*
	* @access		public
	*/
	public function insert() {
		return $this->save();
	}


	/**
	*		get Registration ID
	* 		@access		public
	*/	
	public function ID() {
		return $this->_REG_ID;
	}



	/**
	*		get Event ID
	* 		@access		public
	*/	
	public function event_ID() {
		return $this->_EVT_ID;
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
	*		get Attendee ID
	* 		@access		public
	*/	
	public function attendee_ID() {
		return $this->_ATT_ID;
	}



	/**
	*		get Transaction ID
	* 		@access		public
	*/	
	public function transaction_ID() {
		return $this->_TXN_ID;
	}



	/**
	*		get PHP Session ID
	* 		@access		public
	*/	
	public function session_ID() {
		return $this->_REG_session;
	}



	/**
	*		get Registration Code
	* 		@access		public
	*/	
	public function reg_code() {
		return $this->_REG_code;
	}



	/**
	*		get Registration URL Link
	* 		@access		public
	*/	
	public function reg_url_link() {
		return $this->_REG_url_link;
	}



	/**
	*		get Is Primary Attendee
	* 		@access		public
	*/	
	public function is_primary() {
		return $this->_REG_is_primary;
	}



	/**
	*		get Is Group Registration
	* 		@access		public
	*/	
	public function is_group_reg() {
		return $this->_REG_is_group_reg;
	}



	/**
	*		get Status ID
	* 		@access		public
	*/	
	public function status_ID() {
		return $this->_STS_ID;
	}



	/**
	*		get Registration Date
	* 		@access		public
	*/	
	public function date() {
		return $this->_REG_date;
	}



	/**
	*		get Price Paid
	* 		@access		public
	*/	
	public function price_paid() {
		return $this->_REG_final_price;
	}



	/**
	*		get Price ID
	* 		@access		public
	*/	
	public function price_ID() {
		return $this->_PRC_ID;
	}



	/**
	*		get Attendee Is Going
	* 		@access		public
	*/	
	public function att_is_going() {
		return $this->_REG_att_is_going;
	}



	/**
	*		get Attendee Checked In
	* 		@access		public
	*/	
	public function att_checked_in() {
		return $this->_REG_att_checked_in;
	}

	/**
	 * Gets all the answers for this registration, and prepopulates their related
	 * questions onto each EE_Answer object
	 * @param array $where_col_n_values
	 * @param string $orderby
	 * @param string $order
	 * @param array $operators
	 * @param mixed $limit
	 * @param string $output
	 * @return EE_Answer[]
	 */
	public function answers_and_questions( $where_col_n_values=null, $orderby=null, $order=null, $operators='=', $limit=null, $output='OBJECT_K'){
		$answers= $this->get_many_related('Answers', $where_col_n_values, $orderby, $order, $operators, $limit, $output);
		$reg_model=$this->_get_model();
		$answers_with_questions=$reg_model->preload_related_models_of_type_onto('Question', $answers);
		return $answers_with_questions;
	}




}


/* End of file EE_Registration.class.php */
/* Location: includes/classes/EE_Registration.class.php */	