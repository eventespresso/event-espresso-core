<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



/**
 * EE Factory Class for tickets
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 *
 */
class EE_UnitTest_Factory_For_Ticket extends WP_UnitTest_Factory_For_Thing {

	/**
	 * Tickets always have to be attached to an datetime, so this holds a datetime default.
	 *
	 * @since  4.3.0
	 * @var EE_Datetime
	 */
	protected $_datetime;

	/**
	 * Tickets have prices attached to them.  If this is chained then we attache a price to the ticket automatically.
	 *
	 * @since 4.3.0
	 * @var   EE_Price
	 */
	protected $_price;

	/**
	 * Used to indicate whether the generated objects are chained in the EE Model Heirarchy or not.  note currently multiple tickets can be attached to a single datetime, however at this time one cannot automatically generate multiple tickets to multiple datetimes via the chained process.
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
	 * @param bool $chained This indicates that we are chaining this ticket to a datetime (instead of creating an isolated Ticket).
	 */
	public function __construct( $factory = null, $chained = false ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating tickets
		$this->default_generation_definitions = array(
			'TKT_name'        => new WP_UnitTest_Generator_Sequence( 'Ticket %s' ),
			'TKT_description' => new WP_UnitTest_Generator_Sequence( 'Ticket Description %s' ),
			'TKT_start_date'  => strtotime( '+1 month' ),
			'TKT_end_date'    => strtotime( '+2 months' )
		);
	}



	/**
	 * This allows setting the $_datetime property to a new ticket object if the incoming args for the
	 * new ticket have a dtt_id (or set to default if no dtt_id)
	 *
	 * @since 4.3.0
	 * @param int $DTT_ID EE_Datetime ID
	 */
	private function _set_new_datetime( $DTT_ID = 0 ) {
		$this->_datetime = empty( $DTT_ID ) ? EEM_Datetime::instance()->get_one_by_ID( $DTT_ID ) : $this->factory->datetime_chained->create();
		//fail safe just in case (so we can be sure to have an datetime).
		if ( empty( $this->_datetime ) ) {
			$this->_datetime = $this->factory->datetime_chained->create();
		}
	}



	/**
	 * This allows setting the $_price property to a new ticket object if the incoming args for the new ticket have a PRC_ID (or set to default if no PRIC_ID) provided.
	 * Note that we are using the price_chained method to ensure that the price has a corresponding price type object applied.
	 *
	 * @since 4.3.0
	 * @param int $PRC_ID
	 * @return void
	 */
	private function _set_new_price( $PRC_ID = 0 ) {
		$this->_price = ! empty( $PRC_ID ) ? EEM_Price::instance()->get_one_by_ID( $PRC_ID ) : $this->factory->price_chained->create();
		//fail safe just in case (so we can be sure to have an price).
		if ( empty( $this->_price ) ) {
			$this->_price = $this->factory->price_chained->create();
		}

	}



	/**
	 * This handles connecting a ticket to the datetime and price object that's been generated.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Ticket $tkt
	 * @param array $args incoming arguments from caller for specifying overrides.
	 *
	 * @return EE_Ticket
	 */
	private function _maybe_chained( EE_Ticket $tkt, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_datetime ) ) {
				$DTT_ID = isset( $this->_special_args[ 'DTT_ID' ] ) ? $this->_special_args[ 'DTT_ID' ] : 0;
				$this->_set_new_datetime( $DTT_ID );
			}
			if ( empty( $this->_price ) ) {
				$PRC_ID = isset( $this->_special_args[ 'PRC_ID' ] ) ? $this->_special_args[ 'PRC_ID' ] : 0;
				$this->_set_new_price( $PRC_ID );
			}
			//add relation to datetime
			$tkt->_add_relation_to( $this->_datetime, 'Datetime' );
			//add relation to price
			$tkt->_add_relation_to( $this->_price, 'Price' );
			$tkt->save();
			return $tkt;
		}
		return $tkt;
	}



	/**
	 * used by factory to create ticket object
	 *
	 * @since 4.3.0
	 *
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Ticket|false
	 */
	public function create_object( $args ) {
		$this->_special_args[ 'PRC_ID' ] = isset( $args[ 'PRC_ID' ] ) ? $args[ 'PRC_ID' ] : 0;
		$this->_special_args[ 'DTT_ID' ] = isset( $args[ 'DTT_ID' ] ) ? $args[ 'DTT_ID' ] : 0;
		//maybe unset PRC_ID
		if ( isset( $args[ 'PRC_ID' ] ) ) {
			unset( $args[ 'PRC_ID' ] );
		}
		//maybe unset DTT_ID
		if ( isset( $args[ 'DTT_ID' ] ) ) {
			unset( $args[ 'DTT_ID' ] );
		}
		//timezone?
		if ( isset( $args[ 'timezone' ] ) ) {
			$timezone = $args[ 'timezone' ];
			unset( $args[ 'timezone' ] );
		} else {
			$timezone = '';
		}
		//date_formats?
		if ( isset( $args[ 'formats' ] ) && is_array( $args[ 'formats' ] ) ) {
			$formats = $args[ 'formats' ];
			unset( $args[ 'formats' ] );
		} else {
			$formats = array();
		}
		$tkt = EE_Ticket::new_instance( $args, $timezone, $formats );
		$tktID = $tkt->save();
		$tkt = $this->_maybe_chained( $tkt, $args );
		return $tktID ? $tkt : false;
	}



	/**
	 * Update ticket object for given ticket
	 *
	 * @since 4.3.0
	 *
	 * @param int $TKT_ID Ticket ID for the ticket to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Ticket|false.
	 */
	public function update_object( $TKT_ID, $cols_n_data ) {
		//all the stuff for updating an ticket.
		$tkt = EEM_Ticket::instance()->get_one_by_ID( $TKT_ID );
		if ( ! $tkt instanceof EE_Ticket ) {
			return null;
		}
		foreach ( $cols_n_data as $key => $val ) {
			$tkt->set( $key, $val );
		}
		$success = $tkt->save();
		return $success ? $tkt : false;
	}



	/**
	 * return the ticket object for a given ticket ID
	 *
	 * @since 4.3.0
	 *
	 * @param int $TKT_ID the ticket id for the ticket to attempt to retrieve
	 *
	 * @return mixed null|EE_Ticket
	 */
	public function get_object_by_id( $TKT_ID ) {
		return EEM_Ticket::instance()->get_one_by_ID( $TKT_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Ticket.class.php
// Location: /EE_UnitTest_Factory_For_Ticket.class.php