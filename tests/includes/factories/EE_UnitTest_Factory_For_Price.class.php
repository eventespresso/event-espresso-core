<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



/**
 * EE Factory Class for Prices
 *
 * Note that prices do  have a chained option.  However, this only applies to a price type automatically created and attached to the price.  Details about this price type can be included with the (optional) arguments for create, and create many.
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 *
 */
class EE_UnitTest_Factory_For_Price extends WP_UnitTest_Factory_For_Thing {

	/**
	 * Prices always have to be attached to an price type, so this holds a price type default.
	 *
	 * @since  4.3.0
	 * @var EE_Price_Type
	 */
	protected $_price_type;

	/**
	 * For prices, this simply indicates whether the price will automatically be setup attached to a price type or not.
	 *
	 * @var bool
	 */
	protected $_chained;

	/**
	 * This is a cache holder for args that cannot be used to instantiate the object but are used for
	 * chaining to other previously created objects.
	 *
	 * @var array
	 */
	protected $_special_args = array();



	/**
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 */
	public function __construct( $factory = null, $chained = false ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating prices
		$this->default_generation_definitions = array(
			'PRC_name'            => new WP_UnitTest_Generator_Sequence( 'Price %s' ),
			'PRC_desc'            => new WP_UnitTest_Generator_Sequence( 'Price Description %s' ),
			'PRC_amount'          => 0,
			/**
			 * Options for price type are:
			 * 'base': This will result in a base price type created for EEM_Price_type::base_type_base_price
			 * 'discount': This will result in a discount price type created for EEM_Price_type::base_type_discount
			 * 'surcharge': This will result in a surcharge price type created for EEM_Price_Type::base_type_surcharge
			 * 'tax': This will result in a tax price type created for EEM_Price_Type::base_type_tax
			 */
			'PRT_name'            => 'Base Price Type',
			'PRC_type'            => 'base',
			'PRC_type_is_percent' => false, //true if percent for price type, false if dollar
			'TKT_end_date'        => strtotime( '+2 months' )
		);
	}



	/**
	 * This allows setting the $_price_type property to a new price_type object if the incoming args for the
	 * new price have a prt_id (or set to default if no prt_id).  This optionally will use any args for price type that is included in the incoming arguments.
	 *
	 * @since 4.3.0
	 * @param int $PRT_ID EE_Price_Type ID
	 */
	private function _set_new_price_type( $PRT_ID = 0, $args ) {
		$this->_price_type = empty( $PRT_ID ) ? EEM_Price_Type::instance()->get_one_by_ID( $PRT_ID ) : $this->_create_price_type( $args );
		//fail safe just in case (so we can be sure to have an price_type).
		if ( empty( $this->_price_type ) ) {
			$this->_price_type = $this->_create_price_type( $args );
		}
	}



	/**
	 * Create a EE_Price_Type (optionally using provided args )
	 *
	 * @since 4.3.0
	 *
	 * @param array $args incoming arguments
	 *
	 * @return EE_Price_Type
	 */
	private function _create_price_type( $args ) {
		//BASE PRICE TYPE
		$base_price_type = ! empty( $args[ 'PRC_type' ] ) ? $args[ 'PRC_type' ] : $this->default_generation_definitions[ 'PRC_type' ];
		switch ( $base_price_type ) {
			case 'base' :
				$base_type = EEM_Price_Type::base_type_base_price;
				break;
			case 'discount' :
				$base_type = EEM_Price_Type::base_type_discount;
				break;
			case 'surcharge' :
				$base_type = EEM_Price_Type::base_type_surcharge;
				break;
			default :
				$base_type = EEM_Price_Type::base_type_tax;
				break;
		}
		//set the properties for the price type depending on the args
		$prt_args = array(
			'PRT_name'       => ! empty( $args[ 'PRT_name' ] ) ? $args[ 'PRT_name' ] : $this->default_generation_definitions[ 'PRT_name' ],
			'PBT_ID'         => $base_type,
			'PRT_is_percent' => ! empty( $args[ 'PRC_type_is_percent' ] ) ? $args[ 'PRC_type_is_percent' ] : $this->default_generation_definitions[ 'PRC_type_is_percent' ]
		);
		return $this->factory->price_type->create( $prt_args );
	}



	/**
	 * This handles connecting a ticket to the price type object that's been generated.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Price $price
	 * @param array $args incoming args to override defaults.
	 *
	 * @return EE_Price
	 */
	private function _maybe_chained( EE_Price $price, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_price_type ) ) {
				$PRT_ID = isset( $this->_special_args[ 'PRT_ID' ] ) ? $this->_special_args[ 'PRT_ID' ] : 0;
				$this->_set_new_price_type( $PRT_ID, $args );
			}
			//add relation to datetime
			$price->_add_relation_to( $this->_price_type, 'Price_Type' );
			$price->save();
			return $price;
		}
		return $price;
	}



	/**
	 * used by factory to create price object.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Price|false
	 */
	public function create_object( $args ) {
		$this->_special_args[ 'PRT_ID' ] = isset( $args[ 'PRT_ID' ] ) ? $args[ 'PRT_ID' ] : 0;
		if ( isset( $args[ 'PRT_ID' ] ) ) {
			unset( $args[ 'PRT_ID' ] );
		}
		$price = EE_Price::new_instance( $args );
		$priceID = $price->save();
		$price = $this->_maybe_chained( $price, $args );
		return $priceID ? $price : false;
	}



	/**
	 * Update price object for given price.
	 *
	 * @since 4.3.0
	 *
	 * @param int $PRC_ID Price ID for the price to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Price|false.
	 */
	public function update_object( $PRC_ID, $cols_n_data ) {
		//all the stuff for updating an price.
		$price = EEM_Price::instance()->get_one_by_ID( $PRC_ID );
		if ( ! $price instanceof EE_Price ) {
			return null;
		}
		foreach ( $cols_n_data as $key => $val ) {
			$price->set( $key, $val );
		}
		$success = $price->save();
		return $success ? $price : false;
	}



	/**
	 * return the price object for a given price ID.
	 *
	 * @since 4.3.0
	 *
	 * @param int $PRC_ID the price id for the price to attempt to retrieve
	 *
	 * @return mixed null|EE_Price
	 */
	public function get_object_by_id( $PRC_ID ) {
		return EEM_Price::instance()->get_one_by_ID( $PRC_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Price.class.php
// Location: /EE_UnitTest_Factory_For_Price.class.php