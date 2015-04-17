<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



/**
 * EE Factory Class for Price Types.
 *
 * When this is called as a chained object - a default price will be created and attached to the given price type.
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 *
 */
class EE_UnitTest_Factory_For_Price_Type extends WP_UnitTest_Factory_For_Thing {

	/**
	 * If chained, the price will be added to this property.
	 *
	 * @since  4.3.0
	 * @var EE_Price
	 */
	protected $_price;

	/**
	 * For prices, this simply indicates whether a price will automatically be setup attached to the price type or not.
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
			'PRT_name' => new WP_UnitTest_Generator_Sequence( '%s Price Type' )
		);
	}



	/**
	 * This allows setting the $_price property to a new price object if the incoming args for the
	 * new price have a prc_id (or set to default if no prc_id).  This optionally will use any args for price type that is included in the incoming arguments.
	 *
	 * @since 4.3.0
	 * @param int $PRC_ID EE_Price ID
	 */
	private function _set_new_price( $PRC_ID = 0 ) {
		$this->_price = empty( $PRC_ID ) ? EEM_Price::instance()->get_one_by_ID( $PRC_ID ) : $this->factory->price->create();
		//fail safe just in case (so we can be sure to have an price).
		if ( empty( $this->_price ) ) {
			$this->_price = $this->factory->price->create();
		}
	}



	/**
	 * This handles connecting a ticket to the price object that's been generated.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Price_Type $price_type
	 * @param array $args incoming arguments from caller for specifying overrides.
	 *
	 * @return EE_Price_Type
	 */
	private function _maybe_chained( EE_Price_Type $price_type, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_price ) ) {
				$PRC_ID = isset( $args[ 'PRC_ID' ] ) ? $args[ 'PRC_ID' ] : 0;
				$this->_set_new_price_type( $PRC_ID );
			}
			//add relation to datetime
			$price_type->_add_relation_to( $this->_price, 'Price' );
			$price_type->save();
			return $price_type;
		}
		return $price_type;
	}



	/**
	 * used by factory to create price type object.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Price_Type|false
	 */
	public function create_object( $args ) {
		$this->_special_args[ 'PRC_ID' ] = isset( $args[ 'PRC_ID' ] ) ? $args[ 'PRC_ID' ] : 0;
		if ( isset( $args[ 'PRC_ID' ] ) ) {
			unset( $args[ 'PRC_ID' ] );
		}
		$price_type = EE_Price_Type::new_instance( $args );
		$price_typeID = $price_type->save();
		$price_type = $this->_maybe_chained( $price_type, $args );
		return $price_typeID ? $price_type : false;
	}



	/**
	 * Update price_type object for given price_type.
	 *
	 * @since 4.3.0
	 *
	 * @param int $PRT_ID Price_Type ID for the price_type to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Price_Type|false.
	 */
	public function update_object( $PRT_ID, $cols_n_data ) {
		//all the stuff for updating an price_type.
		$price_type = EEM_Price_Type::instance()->get_one_by_ID( $PRT_ID );
		if ( ! $price_type instanceof EE_Price_Type ) {
			return null;
		}
		foreach ( $cols_n_data as $key => $val ) {
			$price_type->set( $key, $val );
		}
		$success = $price_type->save();
		return $success ? $price_type : false;
	}



	/**
	 * return the price type object for a given price type ID.
	 *
	 * @since 4.3.0
	 *
	 * @param int $PRT_ID the price type id for the price type to attempt to retrieve
	 *
	 * @return mixed null|EE_Price_Type
	 */
	public function get_object_by_id( $PRT_ID ) {
		return EEM_Price_Type::instance()->get_one_by_ID( $PRT_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Price_Type.class.php
// Location: /EE_UnitTest_Factory_For_Price_Type.class.php