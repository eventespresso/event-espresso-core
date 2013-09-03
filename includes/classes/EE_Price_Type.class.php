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
class EE_Price_Type extends EE_Soft_Delete_Base_Class{

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
	* 	1 = Base Price , 2 = Discount , 3 = Surcharge , 4 = Tax
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
  *	Price type a percentage?
	*
	*	@access	protected
  *	@var bool
  */
	protected $_PRT_is_percent = NULL;


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



	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values );
	}




	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
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
	*		Set Price Type a percent
	*
	* 		@access		public
	*		@param		bool		$PRT_is_percent
	*/
	public function set_is_percent( $PRT_is_percent = NULL ) {
		$this->set('PRT_is_percent',$PRT_is_percent);
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


	public function is_discount() {
		return $this->get('PBT_ID') == 2 ? TRUE : FALSE;
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