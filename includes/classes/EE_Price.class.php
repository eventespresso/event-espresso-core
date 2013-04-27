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
 * EE_Price class
 *
 * @package			Event Espresso
 * @subpackage	includes/classes/EE_Price.class.php
 * @author			Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Price extends EE_Base_Class{
	
	/**
	*		Price ID
	*
	* 	primary key
	*
	* 	@access	protected
	*		@var int
	*/
	protected $_PRC_ID = FALSE;


	/**
	*	Price Type ID
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRT_ID = NULL;


	/**
	 * Event ID
	 *
	 * @access protected
	 * @var int
	 */
	protected $_EVT_ID = NULL;


	/**
	*	Price amount
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRC_amount = NULL;


	/**
	*	Price name
	*
	*	@access	protected
	*	@var string
	*/
	protected $_PRC_name = NULL;


	/**
	*	Price description
	*
	*	@access	protected
	*	@var string
	*/
	protected $_PRC_desc = NULL;


	/**
	*	Registration Limit for this Price Level
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRC_reg_limit = NULL; 				


	/**
	*	Number of tickets left or spaces available at this Price Level
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRC_tckts_left = NULL; 				


	/**
	*	Whether to use dates to control when pricing starts and ends
	*
	*	@access	protected
	*	@var boolean
	*/
	protected $_PRC_use_dates = NULL;


	/**
	*	If use dates is active, this is when this price becomes active
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRC_start_date	 = NULL;


	/**
	*	If use dates is active, this is when this price becomes inactive
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRC_end_date = NULL;


	/**
	*	Price globally active?
	*
	*	@access	protected
	*	@var boolean
	*/
	protected $_PRC_is_active = NULL;


	/**
	*	Price ID for a global Price that will be overridden by this Price  ( for replacing default prices )
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRC_overrides = NULL;


	/**
	*	Order that this price is applied ( overrides price type order )
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRC_order = NULL;


	/**
	*	Whether this Price has been moved to the trash
	*
	*	@access	protected
	*	@var boolean
	*/
	protected $_PRC_deleted = NULL;

	/**
	 *
	 * @var EE_Event
	 */
	protected $_Event;
	
	
	/**
	 * @var EE_Registration
	 */
	protected $_Registration;

	
	
	
	/**
	*  Price constructor
	*
	* @access 			public
	* @param				int					$PRT_ID							Price type ID
	* @param				int					$EVT_ID							Event ID
	* @param				float					$PRC_amount				Price amount
	* @param				string 				$PRC_name					Price name
	* @param				string				$PRC_desc						Price description
	* @param				int					$PRC_reg_limit				Registration Limit for this Price Level
	* @param				int					$PRC_tckts_left				Registration Limit for this Price Level
	* @param				bool					$PRC_use_dates				Whether to use dates to control when pricing starts and ends
	* @param				int					$PRC_start_date				If use dates is active, this is when this price becomes active
	* @param				int					$PRC_end_date				If use dates is active, this is when this price becomes inactive
	* @param				bool					$PRC_is_active				is the Price globally active
	* @param				int 					$PRC_overrides				Price ID for a global Price that will be overridden by this Price  ( for replacing default prices )
	* @param				int 					$PRC_order						Order that this price is applied ( overrides price type order )
	* @param				int 					$PRC_deleted					Whether this Price has been moved to the trash
	* @param				int 					$PRC_ID							Price ID
	*/
	public function __construct( 
					$PRT_ID=NULL,
					$EVT_ID=NULL,
					$PRC_amount=0,
					$PRC_name='',
					$PRC_desc='',
					$PRC_reg_limit=NULL,
					$PRC_tckts_left=NULL,
					$PRC_use_dates=FALSE,
					$PRC_start_date=NULL,
					$PRC_end_date=NULL,
					$PRC_is_active=TRUE,
					$PRC_overrides=NULL,
					$PRC_order=NULL,
					$PRC_deleted=NULL,
					$PRC_ID=FALSE ) {
	if(is_array($PRT_ID)){
			parent::__construct($PRT_ID);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);	
		// load Price model file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	}





	/**
	*		Set Price type ID
	*
	* 		@access		public
	*		@param		int			$PRT_ID
	*/
	public function set_type( $PRT_ID = FALSE ) {

		if ( ! $PRT_ID ) {
			$msg = __( 'No price type was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRT_ID = absint( $PRT_ID );
		return TRUE;
	}





	/**
	*		Set Price Amount
	*
	* 		@access		public
	*		@param		float		$PRC_amount
	*/
	public function set_amount( $PRC_amount = FALSE ) {

		if ( ! $PRC_amount ) {
			$msg = __( 'No amount was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRC_amount = abs( $PRC_amount );
		return TRUE;
	}





	/**
	*		Set Price Name
	*
	* 		@access		public
	*		@param		string		$PRC_name
	*/
	public function set_name( $PRC_name = FALSE ) {

		if ( ! $PRC_name ) {
			$msg = __( 'No name was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRC_name = wp_strip_all_tags( $PRC_name );
		return TRUE;
	}





	/**
	*		Set Price Description
	*
	*		@access		public
	*		@param		string		$PRC_desc
	*/
	public function set_description( $PRC_desc = FALSE ) {

		if ( ! $PRC_desc ) {
			$msg = __( 'No description was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRC_desc = wp_strip_all_tags( $PRC_desc );
		return TRUE;
	}





	/**
	*		Set Reg Limit
	*
	*		@access		public
	*		@param		string		$PRC_desc
	*/
	public function set_reg_limit( $PRC_reg_limit = FALSE ) {

		if ( ! $PRC_reg_limit ) {
			$msg = __( 'No registration limit was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRC_reg_limit = absint( $PRC_reg_limit );
		return TRUE;
	}





	/**
	*		Set Tickets Left
	*
	*		@access		public
	*		@param		string		$PRC_desc
	*/
	public function set_tckts_left( $PRC_tckts_left = FALSE ) {

		if ( ! $PRC_tckts_left ) {
			$msg = __( 'No tickets left quantity was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRC_tckts_left = absint( $PRC_tckts_left );
		return TRUE;
	}





	/**
	*		Set use dates boolean flag
	*
	* 		@access		public
	*		@param		boolean		$PRC_use_dates
	*/
	public function set_use_dates( $PRC_use_dates = NULL ) {

		if ( ! is_bool( $PRC_use_dates )) {
			$msg = __( 'No use dates boolean flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRC_use_dates = (bool)absint( $PRC_use_dates );
		return TRUE;
	}





	/**
	*		Set start date
	*
	* 		@access		public
	*		@param		mixed		$PRC_start_date
	*/
	public function set_start_date( $PRC_start_date = NULL ) {

		if ( ! $PRC_start_date ) {
			$msg = __( 'No start date was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$this->_PRC_start_date = is_numeric( $PRC_start_date ) ? absint( $PRC_start_date ) : strtotime( wp_strip_all_tags( $PRC_start_date ));
		return TRUE;
	}





	/**
	*		Set end date
	*
	* 		@access		public
	*		@param		mixed		$PRC_use_dates
	*/
	public function set_end_date( $PRC_end_date = NULL ) {

		if ( ! $PRC_end_date ) {
			$msg = __( 'No end date was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		
		$this->_PRC_end_date = is_numeric( $PRC_end_date ) ? absint( $PRC_end_date ) : strtotime( wp_strip_all_tags( $PRC_end_date ));
		return TRUE;
	}





	/**
	*		Set Price Globally Active boolean flag
	*
	* 		@access		public
	*		@param		bool		$PRC_is_active
	*/
	public function set_globally_active( $PRC_is_active = NULL ) {

		if ( ! is_bool( $PRC_is_active )) {
			$msg = __( 'No globally active boolean flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRC_is_active = (bool)absint( $PRC_is_active );
		return TRUE;
	}





	/**
	*		set deleted
	* 
	* 		@access		public
	*		@param		bool		PRC_deleted
	*/
	public function set_deleted( $PRC_deleted = NULL ) {

		if ( $PRC_deleted == NULL ) {
			$msg = __( 'No deleted boolean flag was supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$this->_PRC_deleted = (bool)absint( $PRC_deleted );
		return TRUE;
	}





	/**
	*		save object to db
	*
	* 		@access		private
	* 		@param		array		$where_cols_n_values
	*/
	private function _save_to_db( $where_cols_n_values = FALSE ) {

		 $MODEL = EEM_Price::instance();

		$set_column_values = array(
				'PRT_ID'								=> $this->_PRT_ID,
				'EVT_ID'								=> $this->_EVT_ID,
				'PRC_amount'						=> $this->_PRC_amount,
				'PRC_name'							=> $this->_PRC_name,
				'PRC_desc'							=> $this->_PRC_desc,
				'PRC_reg_limit'					=> $this->_PRC_reg_limit,
				'PRC_tckts_left'					=> $this->_PRC_tckts_left,
				'PRC_use_dates'					=> $this->_PRC_use_dates,
				'PRC_start_date'					=> $this->_PRC_start_date,
				'PRC_end_date'					=> $this->_PRC_end_date,
				'PRC_is_active'					=> $this->_PRC_is_active,
				'PRC_overrides'					=> $this->_PRC_overrides,
				'PRC_order'							=> $this->_PRC_order,
				'PRC_deleted'						=> $this->_PRC_deleted
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
		return $this->_save_to_db( array( 'PRC_ID' => $this->_PRC_ID ));
	}


	/**
	*	insert new db record
	*
	* @access		public
	*/
	public function insert() {
		return $this->_save_to_db();
	}


	/**
	*	get Price ID
	* @access		public
	* @return 		int
	*/
	public function ID() {
		return $this->_PRC_ID;
	}


	/**
	*	get Price type
	* @access		public
	* @return 		int
	*/
	public function type() {
		return $this->_PRT_ID;
	}

	/**
	*	get Event ID
	* @access		public
	* @return 		int
	*/
	public function event() {
		return $this->_EVT_ID;
	}


	/**
	*	get Price Amount
	* @access		public
	* @return 		float
	*/
	public function amount() {
		return $this->_PRC_amount;
	}


	/**
	*	get Price Name
	* @access		public
	* @return 		string
	*/
	public function name() {
		return stripslashes( $this->_PRC_name );
	}


	/**
	*	get Price description
	* @access		public
	* @return 		string
	*/
	public function desc() {
		return $this->_PRC_desc;
	}


	/**
	*	get Reg Limit
	* @access		public
	* @return 		string
	*/
	public function reg_limit() {
		return $this->_PRC_reg_limit;
	}


	/**
	*	get # of Tickets Left 
	* @access		public
	* @return 		string
	*/
	public function tckts_left() {
		return $this->_PRC_tckts_left;
	}


	/**
	*	get Price use_dates
	* @access		public
	* @return 		string
	*/
	public function use_dates() {
		return $this->_PRC_use_dates ? TRUE : FALSE;
	}


	/**
	*	get start date
	* @access		public
	* @param 		string		$format 	defaults to 'Y-m-d'  
	* @return 		string
	*/
	public function start_date( $format = 'Y-m-d' ) {
		if ( $this->_PRC_start_date ) {
			if ( $format === FALSE ) {
				return $this->_PRC_start_date;
			} else {
				return date( $format, $this->_PRC_start_date );
			}
		} else {
			return NULL;
		}		
	}


	/**
	*	get end date
	* @access		public
	* @param 		string		$format 	defaults to 'Y-m-d'  
	* @return 		string
	*/
	public function end_date( $format = 'Y-m-d' ) {
		if ( $this->_PRC_end_date ) {
			if ( $format === FALSE ) {
				return $this->_PRC_end_date;
			} else {
				return date( $format, $this->_PRC_end_date );
			}			
		} else {
			return NULL;
		}		
	}


	/**
	*	get is Price globally active?
	* @access		public
	* @return 		bool
	*/
	public function is_active() {
		return $this->_PRC_is_active;
	}


	/**
	*	get overrides
	* 	@access		public
	* 	@return 		int
	*/
	public function overrides() {
		return $this->_PRC_overrides;
	}


	/**
	*	get order
	* 	@access		public
	* 	@return 		int
	*/
	public function order() {
		return $this->_PRC_order;
	}


	/**
	*	get deleted
	* 	@access		public
	* 	@return 		bool
	*/
	public function deleted() {
		return $this->_PRC_deleted;
	}



}

/* End of file EE_Price.class.php */
/* Location: /includes/classes/EE_Price.class.php */