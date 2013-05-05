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
	 *
	 * @var EE_Price_Type
	 */
	protected $_Price_Type;
	
	
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
		$this->set('PRT_ID',$PRT_ID);
	}





	/**
	*		Set Price Amount
	*
	* 		@access		public
	*		@param		float		$PRC_amount
	*/
	public function set_amount( $PRC_amount = FALSE ) {
		$this->set('PRC_amount',$PRC_amount);
	}





	/**
	*		Set Price Name
	*
	* 		@access		public
	*		@param		string		$PRC_name
	*/
	public function set_name( $PRC_name = FALSE ) {
		$this->set('PRC_name',$PRC_name);
	}





	/**
	*		Set Price Description
	*
	*		@access		public
	*		@param		string		$PRC_desc
	*/
	public function set_description( $PRC_desc = FALSE ) {
		$this->Set('PRC_desc',$PRC_desc);
	}





	/**
	*		Set Reg Limit
	*
	*		@access		public
	*		@param		string		$PRC_desc
	*/
	public function set_reg_limit( $PRC_reg_limit = FALSE ) {
		$this->set('PRC_reg_limit',$PRC_reg_limit);
	}





	/**
	*		Set Tickets Left
	*
	*		@access		public
	*		@param		string		$PRC_desc
	*/
	public function set_tckts_left( $PRC_tckts_left = FALSE ) {
		$this->set('PRC_tckts_left',$PRC_tckts_left);
	}





	/**
	*		Set use dates boolean flag
	*
	* 		@access		public
	*		@param		boolean		$PRC_use_dates
	*/
	public function set_use_dates( $PRC_use_dates = NULL ) {
		$this->set('PRC_use_dates',$PRC_use_dates);
	}





	/**
	*		Set start date
	*
	* 		@access		public
	*		@param		mixed		$PRC_start_date
	*/
	public function set_start_date( $PRC_start_date = NULL ) {
		$this->set('PRC_start_date',$PRC_start_date);
	}





	/**
	*		Set end date
	*
	* 		@access		public
	*		@param		mixed		$PRC_use_dates
	*/
	public function set_end_date( $PRC_end_date = NULL ) {
		$this->set('PRC_end_date',$PRC_end_date);
	}





	/**
	*		Set Price Globally Active boolean flag
	*
	* 		@access		public
	*		@param		bool		$PRC_is_active
	*/
	public function set_globally_active( $PRC_is_active = NULL ) {
		$this->set('PRC_is_active',$PRC_is_active);
	}





	/**
	*		set deleted
	* 
	* 		@access		public
	*		@param		bool		PRC_deleted
	*/
	public function set_deleted( $PRC_deleted = NULL ) {
		$this->set('PRC_deleted',$PRC_deleted);
	}




	/**
	*	get Price type
	* @access		public
	* @return 		int
	*/
	public function type() {
		return $this->get('PRT_ID');
	}
	
	public function type_obj(){
		return $this->get_first_related('Price_Type');
	}

	/**
	*	get Event ID
	* @access		public
	* @return 		int
	*/
	public function event() {
		return $this->get('EVT_ID');
	}


	/**
	*	get Price Amount
	* @access		public
	* @return 		float
	*/
	public function amount() {
		return $this->get('PRC_amount');
	}


	/**
	*	get Price Name
	* @access		public
	* @return 		string
	*/
	public function name() {
		return $this->get('PRC_name' );
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
		return $this->get('PRC_reg_limit');
	}


	/**
	*	get # of Tickets Left 
	* @access		public
	* @return 		string
	*/
	public function tckts_left() {
		return $this->get('PRC_tckts_left');
	}


	/**
	*	get Price use_dates
	* @access		public
	* @return 		string
	*/
	public function use_dates() {
		return $this->get('PRC_use_dates');
	}


	/**
	*	get start date
	* @access		public
	* @param 		string		$format 	defaults to 'Y-m-d'  
	* @return 		string
	*/
	public function start_date( $format = 'Y-m-d' ) {
		return $this->get('PRC_start_date');
	}


	/**
	*	get end date
	* @access		public
	* @param 		string		$format 	defaults to 'Y-m-d'  
	* @return 		string
	*/
	public function end_date( $format = 'Y-m-d' ) {
		return $this->get('PRC_end_date');
	}


	/**
	*	get is Price globally active?
	* @access		public
	* @return 		bool
	*/
	public function is_active() {
		return $this->get('PRC_is_active');
	}


	/**
	*	get overrides
	* 	@access		public
	* 	@return 		int
	*/
	public function overrides() {
		return $this->get('PRC_overrides');
	}


	/**
	*	get order
	* 	@access		public
	* 	@return 		int
	*/
	public function order() {
		return $this->get('PRC_order');
	}


	/**
	*	get deleted
	* 	@access		public
	* 	@return 		bool
	*/
	public function deleted() {
		return $this->get('PRC_deleted');
	}



}

/* End of file EE_Price.class.php */
/* Location: /includes/classes/EE_Price.class.php */