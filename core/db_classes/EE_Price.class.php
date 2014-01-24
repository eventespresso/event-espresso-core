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
class EE_Price extends EE_Soft_Delete_Base_Class{
	
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
	 * Whether price is a default price or not
	 * @var boolean
	 */
	protected $_PRC_is_default = TRUE;


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
	 * This is the parent for the given PRC (will match another existing PRC_ID in the db).  This is so PRC's attached to revisions are relationally connected to the parent PRC.
	 * @var int
	 */
	protected $_PRC_parent;




	/**
	*	Whether this Price has been moved to the trash
	*
	*	@access	protected
	*	@var boolean
	*/
	protected $_PRC_deleted = NULL;



	/**
	 *
	 * @var EE_Ticket[]
	 */
	protected $_Ticket;
	
	
	
	/**
	 *
	 * @var EE_Price_Type
	 */
	protected $_Price_Type;



	/**
	 * 
	 * @param type $props_n_values
	 * @param type $timezone
	 * @return EE_Price
	 */
	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}




	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
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
	
	/**
	 * 
	 * @return EE_Price_Type
	 */
	public function type_obj(){
		return $this->get_first_related('Price_Type');
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


	public function parent() {
		return $this->get('PRC_parent');
	}

	
	//some helper methods for getting info on the price_type for this price
	
	/**
	 * return whether the price is a base price or not
	 * @return boolean 
	 */
	public function is_base_price() {
		$price_type = $this->type_obj();
		return $price_type->base_type() === 1;
	}


	
	/**
	 * Simply indicates whether this price increases or decreases the total
	 * @return boolean true = discount, otherwise adds to the total
	 */
	public function is_discount() {
		$price_type = $this->type_obj();
		return $price_type->is_discount();
	}



	/**
	 * whether the price is a percentage or not
	 * @return boolean 
	 */
	public function is_percent() {
		$price_type = $this->type_obj();
		return $price_type->get('PRT_is_percent');
	}


	public function pretty_price() {
		return $this->get_pretty('PRC_amount');
	}


	public function get_price_without_currency_symbol() {
		return str_replace( EE_Registry::instance()->CFG->currency->sign, '', $this->get_pretty('PRC_amount'));
	}

}

/* End of file EE_Price.class.php */
/* Location: /includes/classes/EE_Price.class.php */