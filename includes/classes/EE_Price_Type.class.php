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
 * @subpackage	includes/classes/EE_Price_Type.class.php
 * @author			Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
class EE_Price_Type extends EE_Base_Class{

	/**
	*	Price Type ID
	* 	primary key
	*
	* 	@access	protected
	*		@var int
	*/
	protected $_PRT_ID = FALSE;

	/**
	*	Price Type name
	*
	*	@access	protected
	*	@var string
	*/
	protected $_PRT_name = NULL;

	/**
	*	Price Base Type ID
	* 	1 = Event Price , 2 = Discount , 3 = Surcharge , 4 = Tax
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PBT_ID = NULL;

	/**
	*	Price type a member Price?
	*
	*	@access	protected
	*	@var bool
	*/
	protected $_PRT_is_member = NULL;

	/**
	*	Price type a discount?
	*
	*	@access	protected
	*	@var bool
	*/
	protected $_PRT_is_discount = NULL;

	/**
	*	Price type a tax?
	*
	*	@access	protected
	*	@var bool
	*/
	protected $_PRT_is_tax = NULL;

  /**
  *	Price type a percentage?
	*
	*	@access	protected
  *	@var bool
  */
	protected $_PRT_is_percent = NULL;

	/**
	*	Price type a global?
	*
	*	@access	protected
	*	@var bool
	*/
	protected $_PRT_is_global = NULL;

	/**
	*	Price type order
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRT_order = NULL;

	/**
	*	is Price type deleted
	*
	*	@access	protected
	*	@var int
	*/
	protected $_PRT_deleted = NULL;

	/**
	 *
	 * @var EE_Price[]
	 */
	protected $_Price;


		/**
	*  Attendee constructor
	*
	* @access 	public
	* @param	string	$PRT_name			Price Type name
	* @param	int		$PBT_ID	 				Price Base Type ID
	* @param	bool	$PRT_is_member	is price type a member price?
	* @param	bool	$PRT_is_percent		is price type a percent?
	* @param	bool	$PRT_is_global		is price type a global?
	* @param	int 		$PRT_order				Price Type order
	* @param	int		$PRT_ID					Price type ID
	*/
	public function __construct( $PRT_name='', $PBT_ID=FALSE, $PRT_is_member=FALSE, $PRT_is_percent=FALSE, $PRT_is_global=FALSE, $PRT_order=0, $PRT_deleted = false, $PRT_ID=FALSE ) {
	
		if(is_array($PRT_name)){
			parent::__construct($PRT_name);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);	

		// load Price model object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	}





	/**
	*		Set Price Type Name
	*
	* 	@access		public
	*		@param		string		$PRT_name
	*/
	public function set_name( $PRT_name = FALSE ) {
		$this->set('PRT_name',$PRT_name);
	}





	/**
	*		Set Price Type is member price
	*
	* 		@access		public
	*		@param		bool		$PRT_is_member
	*/
	public function set_is_member( $PRT_is_member = NULL ) {
		$this->set('PRT_is_member',$PRT_is_member);
	}





	/**
	*		Set Price Type is discount
	*
	* 		@access		public
	*		@param		bool		$PRT_is_discount
	*/
	public function set_is_discount( $PRT_is_discount = NULL ) {
		$this->set('PRT_is_discount',$PRT_is_discount);
	}





	/**
	*		Set Price Type is tax
	*
	* 		@access		public
	*		@param		bool		$PRT_is_tax
	*/
	public function set_is_tax( $PRT_is_tax = NULL ) {
		$this->set('PRT_is_tax',$PRT_is_tax);
	}





	/**
	*		Set Price Type a percent
	*
	* 		@access		public
	*		@param		bool		$PRT_is_percent
	*/
	public function set_is_percent( $PRT_is_percent = NULL ) {
		$this->set('PRT_is_percent',$PRT_is_percent);
	}





	/**
	*		Set Price Type a global
	*
	* 		@access		public
	*		@param		bool		$PRT_is_global
	*/
	public function set_is_global ( $PRT_is_global = NULL ) {
		$this->set('PRT_is_global',$PRT_is_global);
	}





	/**
	*		Set Price Type order
	*
	* 		@access		public
	*		@param		bool		$PRT_order
	*/
	public function set_order( $PRT_order = FALSE ) {
		$this->set('PRT_order',$PRT_order);
	}

	public function move_to_trash() {
		$this->set('PRT_deleted',true);
	}

	public function restore_from_trash() {
		$this->set('PRT_deleted',false);
	}







	/**
	*		get Price Type Name
	* 		@access		public
	*/
	public function name() {
		return $this->get('PRT_name');
	}



	/**
	*		get is Price Type a discount?
	* 		@access		public
	*/
	public function base_type() {
		return $this->get('PBT_ID');
	}
	
	public function base_type_name(){
		return $this->get_pretty('PBT_ID');
	}



	/**
	*		get is Price Type a member price?
	* 		@access		public
	*/
	public function is_member() {
		return $this->get('PRT_is_member');
	}




	/**
	*		get is Price Type a percent?
	* 		@access		public
	*/
	public function is_percent() {
		return $this->get('PRT_is_percent');
	}


	/**
	*		get is Price Type a global?
	* 		@access		public
	*/
	public function is_global() {
		return $this->get('PRT_is_global');
	}


	/**
	*		get Price Type order
	* 		@access		public
	*/
	public function order() {
		return $this->get('PRT_order');
	}


	/**
	*		get  is Price Type deleted ?
	* 		@access		public
	*/
	public function deleted() {
		return $this->get('PRT_deleted');
	}
}

/* End of file EE_Price_Type.class.php */
/* Location: /includes/classes/EE_Price_Type.class.php */