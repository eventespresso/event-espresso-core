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
 * EE_Price class
 *
 * @package			Event Espresso
 * @subpackage	includes/classes/EE_Price.class.php
 * @author			Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Price {
	
	/**
	*		Price ID
	*
	* 	primary key
	*
	* 	@access	private
	*		@var int
	*/
	private $_PRC_ID = FALSE;


	/**
	*	Price Type ID
	*
	*	@access	private
	*	@var int
	*/
	private $_PRT_ID = NULL;


	/**
	 * Event ID
	 *
	 * @access private
	 * @var int
	 */
	private $_EVT_ID = NULL;


	/**
	*	Price amount
	*
	*	@access	private
	*	@var int
	*/
	private $_PRC_amount = NULL;


	/**
	*	Price name
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_name = NULL;


	/**
	*	Price description
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_desc = NULL;


	/**
	*	Registration Limit for this Price Level
	*
	*	@access	private
	*	@var int
	*/
	private $_PRC_reg_limit = NULL; 				


	/**
	*	Number of tickets left or spaces available at this Price Level
	*
	*	@access	private
	*	@var int
	*/
	private $_PRC_tckts_left = NULL; 				


	/**
	*	Whether to use dates to control when pricing starts and ends
	*
	*	@access	private
	*	@var boolean
	*/
	private $_PRC_use_dates = NULL;


	/**
	*	If use dates is active, this is when this price becomes active
	*
	*	@access	private
	*	@var int
	*/
	private $_PRC_start_date	 = NULL;


	/**
	*	If use dates is active, this is when this price becomes inactive
	*
	*	@access	private
	*	@var int
	*/
	private $_PRC_end_date = NULL;


	/**
	*	The Promo Code to be entered to receive a discount (or a maybe scoobie snack ?)
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_disc_code = NULL;


	/**
	*	Whether to limit the number of discount codes available
	*
	*	@access	private
	*	@var boolean
	*/
	private $_PRC_disc_limit_qty = NULL;


	/**
	*	The number of discounts available at this price level
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_disc_qty = NULL;


	/**
	*	Does discount apply to all attendees being registered?
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_disc_apply_all = NULL;


	/**
	*	WP user id of the admin that created the discount
	*
	*	@access	private
	*	@var string
	*/
	private $_PRC_disc_wp_user = NULL;


	/**
	*	Price globally active?
	*
	*	@access	private
	*	@var boolean
	*/
	private $_PRC_is_active = NULL;


	/**
	*	Price ID for a global Price that will be overridden by this Price  ( for replacing default prices )
	*
	*	@access	private
	*	@var int
	*/
	private $_PRC_overrides = NULL;


	/**
	*	Order that this price is applied ( overrides price type order )
	*
	*	@access	private
	*	@var int
	*/
	private $_PRC_order = NULL;


	/**
	*	Whether this Price has been moved to the trash
	*
	*	@access	private
	*	@var boolean
	*/
	private $_PRC_deleted = NULL;





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
	* @param				bool					$PRC_disc_code				The Promo Code to be entered to receive a discount (or a maybe scoobie snack ?)
	* @param				int					$PRC_disc_limit_qty		Whether to limit the number of discount codes available
	* @param				int					$PRC_disc_qty				The number of discounts available at this price level
	* @param				bool					$PRC_disc_apply_all		Does discount apply to all attendees being registered?
	* @param				int 					$PRC_disc_wp_user		WP user id of the admin that created the discount
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
					/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
					$PRC_reg_limit=NULL,
					$PRC_tckts_left=NULL,*/
					$PRC_use_dates=FALSE,
					$PRC_start_date=NULL,
					$PRC_end_date=NULL,
					$PRC_disc_code=NULL,
					$PRC_disc_limit_qty=FALSE,
					$PRC_disc_qty=0,
					$PRC_disc_apply_all=TRUE,
					$PRC_disc_wp_user=0,
					$PRC_is_active=TRUE,
					$PRC_overrides=NULL,
					$PRC_order=NULL,
					$PRC_deleted=NULL,
					$PRC_ID=FALSE ) {
	
		$this->_PRC_ID							= absint($PRC_ID);
		$this->_EVT_ID							= absint($EVT_ID);
		$this->_PRT_ID							= absint($PRT_ID);
		$this->_PRC_amount				= (float)abs($PRC_amount);
		$this->_PRC_name					= wp_strip_all_tags($PRC_name);
		$this->_PRC_desc						= wp_strip_all_tags($PRC_desc);
		/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
		$this->_PRC_reg_limit				= $PRC_reg_limit != NULL ? absint( $PRC_reg_limit ) : NULL;
		$this->_PRC_tckts_left				= $PRC_tckts_left != NULL ? absint( $PRC_tckts_left ) : NULL;*/
		$this->_PRC_use_dates				= absint( $PRC_use_dates ) ? TRUE : FALSE;
		$this->_PRC_start_date				= is_numeric( $PRC_start_date ) ? absint( $PRC_start_date ) : strtotime( $PRC_start_date );
		$this->_PRC_end_date				= is_numeric( $PRC_end_date ) ? absint( $PRC_end_date ) : strtotime( $PRC_end_date );
		$this->_PRC_disc_code				= $PRC_disc_code != NULL ? wp_strip_all_tags( $PRC_disc_code ): NULL;
		$this->_PRC_disc_limit_qty		= absint( $PRC_disc_limit_qty ) ? TRUE : FALSE;
		$this->_PRC_disc_qty				= absint( $PRC_disc_qty );
		$this->_PRC_disc_apply_all		= absint( $PRC_disc_apply_all ) ? TRUE : FALSE;
		$this->_PRC_disc_wp_user		= absint( $PRC_disc_wp_user );
		$this->_PRC_is_active				= absint( $PRC_is_active ) ? TRUE : FALSE;
		$this->_PRC_overrides				= $PRC_overrides != NULL ? absint($PRC_overrides) : FALSE;
		$this->_PRC_deleted					= $PRC_deleted != NULL ? absint($PRC_deleted) : FALSE;
		$this->_PRC_order						= $PRC_order != NULL ? absint($PRC_order) : NULL;

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
		global $espresso_notices;
		if ( ! $PRT_ID ) {
			$espresso_notices['errors'][] = 'No price type was supplied.';
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

		global $espresso_notices;
		if ( ! $PRC_amount ) {
			$espresso_notices['errors'][] = 'No amount was supplied.';
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

		global $espresso_notices;
		if ( ! $PRC_name ) {
			$espresso_notices['errors'][] = 'No name was supplied.';
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

		global $espresso_notices;
		if ( ! $PRC_desc ) {
			$espresso_notices['errors'][] = 'No description was supplied.';
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

		global $espresso_notices;
		if ( ! $PRC_reg_limit ) {
			$espresso_notices['errors'][] = 'No registration limit was supplied.';
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

		global $espresso_notices;
		if ( ! $PRC_tckts_left ) {
			$espresso_notices['errors'][] = 'No tickets left quantity was supplied.';
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

		global $espresso_notices;
		if ( ! is_bool( $PRC_use_dates )) {
			$espresso_notices['errors'][] = 'No use dates boolean flag was supplied.';
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

		global $espresso_notices;
		if ( ! $PRC_start_date ) {
			$espresso_notices['errors'][] = 'No start date was supplied.';
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

		global $espresso_notices;
		if ( ! $PRC_end_date ) {
			$espresso_notices['errors'][] = 'No end date was supplied.';
			return FALSE;
		}
		
		$this->_PRC_end_date = is_numeric( $PRC_end_date ) ? absint( $PRC_end_date ) : strtotime( wp_strip_all_tags( $PRC_end_date ));
		return TRUE;
	}





	/**
	*		Set discount code
	*
	* 		@access		public
	*		@param		float		$PRC_disc_code
	*/
	public function set_disc_code( $PRC_disc_code = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_disc_code ) {
			$espresso_notices['errors'][] = 'No discount code was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_code = wp_strip_all_tags( $PRC_disc_code );
		return TRUE;
	}





	/**
	*		Set discount limit qty boolean flag
	*
	* 		@access		public
	*		@param		float		$PRC_disc_limit_qty
	*/
	public function set_disc_limit_qty( $PRC_disc_limit_qty = NULL ) {

		global $espresso_notices;
		if ( ! is_bool( $PRC_disc_limit_qty )) {
			$espresso_notices['errors'][] = 'No discount limit qty boolean flag was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_limit_qty = (bool)absint( $PRC_disc_limit_qty );
		return TRUE;
	}





	/**
	*		Set discount qty
	*
	* 		@access		public
	*		@param		float		$PRC_disc_qty
	*/
	public function set_disc_qty( $PRC_disc_qty = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_disc_qty ) {
			$espresso_notices['errors'][] = 'No discount qty was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_qty = absint( $PRC_disc_qty );
		return TRUE;
	}





	/**
	*		Set discount applies to all boolean flag
	*
	* 		@access		public
	*		@param		float		$PRC_disc_apply_all
	*/
	public function set_disc_apply_all( $PRC_disc_apply_all = NULL ) {

		global $espresso_notices;
		if ( ! is_bool( $PRC_disc_apply_all )) {
			$espresso_notices['errors'][] = 'No disc_apply_all was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_apply_all = (bool)absint( $PRC_disc_apply_all );
		return TRUE;
	}





	/**
	*		Set Price discount WP user id
	*
	* 		@access		public
	*		@param		float		$PRC_disc_wp_user
	*/
	public function set_disc_wp_user( $PRC_disc_wp_user = FALSE ) {

		global $espresso_notices;
		if ( ! $PRC_disc_wp_user ) {
			$espresso_notices['errors'][] = 'No WP user id was supplied.';
			return FALSE;
		}
		$this->_PRC_disc_wp_user = absint( $PRC_disc_wp_user );
		return TRUE;
	}





	/**
	*		Set Price Globally Active boolean flag
	*
	* 		@access		public
	*		@param		bool		$PRC_is_active
	*/
	public function set_globally_active( $PRC_is_active = NULL ) {

		global $espresso_notices;
		if ( ! is_bool( $PRC_is_active )) {
			$espresso_notices['errors'][] = 'No globally active boolean flag was supplied.';
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
		global $espresso_notices;
		if ( $PRC_deleted == NULL ) {
			$espresso_notices['errors'][] = 'No deleted boolean flag was supplied.';
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
				/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
				'PRC_reg_limit'					=> $this->_PRC_reg_limit,
				'PRC_tckts_left'					=> $this->_PRC_tckts_left,*/
				'PRC_use_dates'					=> $this->_PRC_use_dates,
				'PRC_start_date'					=> $this->_PRC_start_date,
				'PRC_end_date'					=> $this->_PRC_end_date,
				'PRC_disc_code'					=> $this->_PRC_disc_code,
				'PRC_disc_limit_qty'			=> $this->_PRC_disc_limit_qty,
				'PRC_disc_qty'						=> $this->_PRC_disc_qty,
				'PRC_disc_apply_all'			=> $this->_PRC_disc_apply_all,
				'PRC_disc_wp_user'			=> $this->_PRC_disc_wp_user,
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
		return $this->_PRC_name;
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
	*	get Price disc_limit_qty
	* @access		public
	* @return 		string
	*/
	public function disc_limit_qty() {
		return $this->_PRC_disc_limit_qty;
	}


	/**
	*	get Price disc_code
	* @access		public
	* @return 		string
	*/
	public function disc_code() {
		return $this->_PRC_disc_code;
	}


	/**
	*	get Price disc_qty
	* @access		public
	* @return 		string
	*/
	public function disc_qty() {
		return $this->_PRC_disc_qty;
	}


	/**
	*	get Price disc_apply_all
	* @access		public
	* @return 		string
	*/
	public function disc_apply_all() {
		return $this->_PRC_disc_apply_all;
	}


	/**
	*	get Price disc_wp_user
	* @access		public
	* @return 		string
	*/
	public function disc_wp_user() {
		return $this->_PRC_disc_wp_user;
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

/* End of file EE_Price.class.php */
/* Location: /includes/classes/EE_Price.class.php */