<?php
/**
 * This file contains the EE Unit Test Factory
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * This is a factory for more quickly setting up objects/items needed for EE Unit Tests.
 *
 * Examples of things we might setup using the factory are events, registrations, tickets etc.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 * @todo 		This is not done yet.  Just a shell as an example of what can be done.
 */
class EE_UnitTest_Factory extends WP_UnitTest_Factory {


	/**
	 * @var EE_UnitTest_Factory_For_Event
	 */
	public $event;


	/**
	 * @var EE_UnitTest_Factory_For_Datetime
	 */
	public $datetime;
	public $datetime_chained;

	/**
	 * @var EE_UnitTest_Factory_For_Ticket
	 */
	public $ticket;
	public $ticket_chained;


	/**
	 * @var EE_UnitTest_Factory_For_Price
	 */
	public $price;
	public $price_chained;


	/**
	 * @var EE_UnitTest_Factory_For_Price_Type
	 */
	public $price_type;
	public $price_type_chained;


	/**
	 * @var EE_UnitTest_Factory_For_Registration
	 */
	public $registration;
	public $registration_chained;


	/**
	 * @var EE_UnitTest_Factory_For_Transaction
	 */
	public $transaction;
	public $transaction_chained;



	/**
	 * @var EE_UnitTest_Factory_For_Attendee
	 */
	public $attendee;
	public $attendee_chained;



	/**
	 * @var EE_UnitTest_Factory_For_Status
	 */
	public $status;



	public function __construct() {
		parent::__construct();

		//setup any properties containing various test factory objects. EE_Test_Factories should extend the WP_UnitTest_Factory_for_Thing abstract class ( @see wp tests/includes/factory.php).
		$this->event = new EE_UnitTest_Factory_For_Event( $this );
		$this->datetime = new EE_UnitTest_Factory_For_Datetime( $this );
		$this->datetime_chained = new EE_UnitTest_Factory_For_Datetime( $this, true );
		$this->ticket = new EE_UnitTest_Factory_For_Ticket( $this );
		$this->ticket_chained = new EE_UnitTest_Factory_For_Ticket( $this, true );
		$this->price = new EE_UnitTest_Factory_For_Price( $this );
		$this->price_chained = new EE_UnitTest_Factory_For_Price( $this, true );
		$this->price_type = new EE_UnitTest_Factory_For_Price_Type( $this );
		$this->price_type_chained = new EE_UnitTest_Factory_For_Price_Type( $this, true );
		$this->registration = new EE_UnitTest_Factory_For_Registration( $this );
		$this->registration_chained = new EE_UnitTest_Factory_For_Registration( $this, true );
		$this->transaction = new EE_UnitTest_Factory_For_Transaction( $this );
		$this->transaction_chained = new EE_UnitTest_Factory_For_Transaction( $this, true );
		$this->attendee = new EE_UnitTest_Factory_For_Attendee( $this );
		$this->attendee_chained = new EE_UnitTest_Factory_For_Attendee( $this, true );
		$this->status = new EE_UnitTest_Factory_For_Status( $this );
	}
}




/**
 * EE Factory Class for Events
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 */
class EE_UnitTest_Factory_For_Event extends WP_UnitTest_Factory_For_Thing {

	public function __construct( $factory = NULL ) {
		parent::__construct( $factory );
		//default args for creating events.
		$this->default_generation_definitions = array(
			'EVT_name' => new WP_UnitTest_Generator_Sequence( 'Event %s' ),
			'EVT_desc' => new WP_UnitTest_Generator_Sequence( 'Event content %s' ),
			'EVT_short_desc' => new WP_UnitTest_Generator_Sequence( 'Event excerpt %s' ),
		);
	}


	/**
	 * used by factory to create event object
	 *
	 * @since 4.3.0
	 *
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Event|false
	 */
	public function create_object( $args ) {
		$event = EE_Event::new_instance( $args );
		$evtID = $event->save();
		return $evtID ? $event : false;
	}


	/**
	 * Update event object for given event
	 *
	 * @since 4.3.0
	 *
	 * @param int      $EVT_ID         Event ID for the event to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Event|false
	 */
	public function update_object( $EVT_ID, $cols_n_data ) {
		//all the stuff for updating an event.
		$event = EEM_Event::instance()->get_one_by_ID( $EVT_ID );
		if ( ! $event instanceof EE_Event )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$event->set( $key, $val );
		}
		$success = $event->save();
		return $success ? $event : false;
	}



	/**
	 * return the event object for a given event ID
	 *
	 * @since 4.3.0
	 *
	 * @param int  $EVT_ID the event id for the event to attemp to retrieve
	 *
	 * @return mixed null|EE_Event
	 */
	public function get_object_by_id( $EVT_ID ) {
		return EEM_Event::instance()->get_one_by_ID( $EVT_ID );
	}
}




/**
 * EE Factory Class for Datetimes
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 */
class EE_UnitTest_Factory_For_Datetime extends WP_UnitTest_Factory_For_Thing {

	/**
	 * Datetimes always have to be attached to an event, so this holds a Event default.
	 *
	 * @since  4.3.0
	 * @var EE_Event
	 */
	protected $_event;


	/**
	 * Used to indicate whether the generated objects are chained in the EE Model Heirarchy or not.
	 *
	 * @var bool
	 */
	protected $_chained;



	/**
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 * @param bool   $chained        This indicates that we are chaining this datetime to an event (instead of creating a isolated Datetime).
	 */
	public function __construct( $factory = NULL, $chained = FALSE ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating datetimes
		$this->default_generation_definitions = array(
			'DTT_name' => new WP_UnitTest_Generator_Sequence( 'Datetime %s' ),
			'DTT_description' => new WP_UnitTest_Generator_Sequence( 'Datetime Description %s' ),
			'DTT_EVT_start' => strtotime( '+1 month', current_time('timestamp') ),
			'DTT_EVT_end' => strtotime( '+2 months', current_time('timestamp') )
		);
	}


	/**
	 * This allows setting the $_event property to a new event object if the incoming args for the
	 * new dtt have an event id (orset to default if no evt_id)
	 *
	 * @since 4.3.0
	 * @param int $EVT_ID EE_Event ID
	 */
	private function _set_new_event( $EVT_ID = 0 ) {
		$this->_event = empty( $EVT_ID ) ? EEM_Event::instance()->get_one_by_ID( $EVT_ID ) : $this->factory->event->create();

		//failsafe just in case (so we can be sure to have an event).
		if ( empty( $this->_event ) ) {
			$this->_event = $this->factory->event->create();
		}
	}



	/**
	 * This handles connecting a datetime to the event object that's been generated.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Datetime $dtt
	 * @param array $args incoming arguments from caller for specifying overrides.
	 *
	 * @return EE_Datetime
	 */
	private function _maybe_chained( EE_Datetime $dtt, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_event ) ) {
				$EVT_ID = isset( $args['EVT_ID'] ) ? $args['EVT_ID'] : 0;
				$this->_set_new_event( $EVT_ID );
			}
			//add relation to event
			$dtt->_add_relation_to( $this->_event, 'EE_Event' );
			$dtt->save();
			return $dtt;
		}
		return $dtt;
	}


	/**
	 * used by factory to create datetime object
	 *
	 * @since 4.3.0
	 *
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Datetime|false
	 */
	public function create_object( $args ) {
		$dtt = EE_Datetime::new_instance( $args );
		$dttID = $dtt->save();
		$dtt = $this->_maybe_chained( $dtt, $args );
		return $dttID ? $dtt : false;
	}



	/**
	 * Update datetime object for given datetime
	 *
	 * @since 4.3.0
	 *
	 * @param int      $DTT_ID         Datetime ID for the datetime to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Datetime|false.
	 */
	public function update_object( $DTT_ID, $cols_n_data ) {
		//all the stuff for updating an datetime.
		$dtt = EEM_Datetime::instance()->get_one_by_ID( $DTT_ID );
		if ( ! $dtt instanceof EE_Datetime )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$dtt->set( $key, $val );
		}
		$success = $dtt->save();
		return $success ? $dtt : false;
	}




	/**
	 * return the datetime object for a given datetime ID
	 *
	 * @since 4.3.0
	 *
	 * @param int  $DTT_ID the datetime id for the datetime to attemp to retrieve
	 *
	 * @return mixed null|EE_Datetime
	 */
	public function get_object_by_id( $DTT_ID ) {
		return EEM_Datetime::instance()->get_one_by_ID( $DTT_ID );
	}
}


/**
 * EE Factory Class for tickets
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
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
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 * @param bool   $chained        This indicates that we are chaining this ticket to a datetime (instead of creating an isolated Ticket).
	 */
	public function __construct( $factory = NULL, $chained = FALSE ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating tickets
		$this->default_generation_definitions = array(
			'TKT_name' => new WP_UnitTest_Generator_Sequence( 'Ticket %s' ),
			'TKT_description' => new WP_UnitTest_Generator_Sequence( 'Ticket Description %s' ),
			'TKT_start_date' => strtotime( '+1 month', current_time('timestamp') ),
			'TKT_end_date' => strtotime( '+2 months', current_time('timestamp') )
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

		//failsafe just in case (so we can be sure to have an datetime).
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
		$this->_price = empty( $PRC_ID ) ? EEM_Price::instance()->get_one_by_ID( $PRC_ID ) : $this->factory->price_chained->create();

		//failsafe just in case (so we can be sure to have an price).
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
				$DTT_ID = isset( $args['DTT_ID'] ) ? $args['DTT_ID'] : 0;
				$this->_set_new_datetime( $DTT_ID );
			}

			if ( empty( $this->_price ) ) {
				$PRC_ID = isset( $args['PRC_ID'] ) ? $args['PRC_ID'] : 0;
				$this->_set_new_price( $PRC_ID );
			}

			//add relation to datetime
			$tkt->_add_relation_to( $this->_datetime, 'EE_Datetime' );

			//add relation to price
			$tkt->_add_relation_to( $this->_price, 'EE_Price' );
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
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Ticket|false
	 */
	public function create_object( $args ) {
		$tkt = EE_ticket::new_instance( $args );
		$tktID = $tkt->save();
		$tkt = $this->_maybe_chained( $tkt, $args );
		return $tktID ? $tkt : false;
	}



	/**
	 * Update ticket object for given ticket
	 *
	 * @since 4.3.0
	 *
	 * @param int      $TKT_ID         Ticket ID for the ticket to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Ticket|false.
	 */
	public function update_object( $TKT_ID, $cols_n_data ) {
		//all the stuff for updating an ticket.
		$tkt = EEM_Ticket::instance()->get_one_by_ID( $TKT_ID );
		if ( ! $tkt instanceof EE_Ticket )
			return null;
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
	 * @param int  $TKT_ID the ticket id for the ticket to attemp to retrieve
	 *
	 * @return mixed null|EE_Ticket
	 */
	public function get_object_by_id( $TKT_ID ) {
		return EEM_Ticket::instance()->get_one_by_ID( $TKT_ID );
	}
}



/**
 * EE Factory Class for Prices
 *
 * Note that prices do  have a chained option.  However, this only applies to a price type automatically created and attached to the price.  Details about this price type can be included with the (optional) arguments for create, and create many.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
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
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 */
	public function __construct( $factory = NULL, $chained = FALSE ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating prices
		$this->default_generation_definitions = array(
			'PRC_name' => new WP_UnitTest_Generator_Sequence( 'Price %s' ),
			'PRC_desc' => new WP_UnitTest_Generator_Sequence( 'Price Description %s' ),
			'PRC_amount' => 0,
			/**
			 * Options for price type are:
			 * 'base': This will result in a base price type created for EEM_Price_type::base_type_base_price
			 * 'discount': This will result in a discount price type created for EEM_Price_type::base_type_discount
			 * 'surcharge': This will result in a surcharge price type created for EEM_Price_Type::base_type_surcharge
			 * 'tax': This will result in a tax price type created for EEM_Price_Type::base_type_tax
			 */
			'PRT_name' => 'Base Price Type',
			'PRC_type' => 'base',
			'PRC_type_is_percent' => false, //true if percent for price type, false if dollar
			'TKT_end_date' => strtotime( '+2 months', current_time('timestamp') )
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

		//failsafe just in case (so we can be sure to have an price_type).
		if ( empty( $this->_price_type ) ) {
			$this->_price_type = $this->_create_price_type( $args );
		}
	}



	/**
	 * Create a EE_Price_Type (optionally using provided args )
	 *
	 * @since 4.3.0
	 *
	 * @param array  $args incoming arguments
	 *
	 * @return EE_Price_Type
	 */
	private function _create_price_type( $args ) {
		//BASE PRICE TYPE
		$base_price_type = ! emtpy( $args['PRC_type'] ) ? $args['PRC_type'] : $this->default_generation_args['PRC_type'];
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
			'PRT_name' => ! empty( $args['PRT_name'] ) ? $args['PRT_name'] : $this->default_generation_args['PRT_name'],
			'PBT_ID' => $base_type,
			'PRT_is_percent' => ! empty( $args['PRC_type_is_percent'] ) ? $args['PRC_type_is_percent'] : $this->default_generation_args['PRC_type_is_percent']
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
				$PRT_ID = isset( $args['PRT_ID'] ) ? $args['PRT_ID'] : 0;
				$this->_set_new_price_type( $PRT_ID, $args );
			}
			//add relation to datetime
			$price->_add_relation_to( $this->_price_type, 'EE_Price_Type' );
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
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Price|false
	 */
	public function create_object( $args ) {
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
	 * @param int      $PRC_ID         Price ID for the price to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Price|false.
	 */
	public function update_object( $PRC_ID, $cols_n_data ) {
		//all the stuff for updating an price.
		$price = EEM_Price::instance()->get_one_by_ID( $PRC_ID );
		if ( ! $price instanceof EE_Price )
			return null;
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
	 * @param int  $PRC_ID the price id for the price to attempt to retrieve
	 *
	 * @return mixed null|EE_Price
	 */
	public function get_object_by_id( $PRC_ID ) {
		return EEM_Price::instance()->get_one_by_ID( $PRC_ID );
	}
}




/**
 * EE Factory Class for Price Types.
 *
 * When this is called as a chained object - a default price will be created and attached to the given price type.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
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
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 */
	public function __construct( $factory = NULL, $chained = FALSE ) {
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
	 * @param int $PRT_ID EE_Price_Type ID
	 */
	private function _set_new_price( $PRC_ID = 0 ) {
		$this->_price = empty( $PRC_ID ) ? EEM_Price::instance()->get_one_by_ID( $PRC_ID ) : $this->factory->price->create();

		//failsafe just in case (so we can be sure to have an price).
		if ( empty( $this->_price ) ) {
			$this->_price = $this->factory->price->create();
		}
	}




	/**
	 * This handles connecting a ticket to the price object that's been generated.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Price_Type $price
	 * @param array $args incoming arguments from caller for specifying overrides.
	 *
	 * @return EE_Price_Type
	 */
	private function _maybe_chained( EE_Price_Type $price_type, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_price ) ) {
				$PRC_ID = isset( $args['PRC_ID'] ) ? $args['PRC_ID'] : 0;
				$this->_set_new_price_type( $PRC_ID );
			}
			//add relation to datetime
			$price_type->_add_relation_to( $this->_price, 'EE_Price' );
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
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Price_Type|false
	 */
	public function create_object( $args ) {
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
	 * @param int      $PRT_ID         Price_Type ID for the price_type to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Price_Type|false.
	 */
	public function update_object( $PRT_ID, $cols_n_data ) {
		//all the stuff for updating an price_type.
		$price_type = EEM_Price_Type::instance()->get_one_by_ID( $PRT_ID );
		if ( ! $price_type instanceof EE_Price_Type )
			return null;
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
	 * @param int  $PRT_ID the price type id for the price type to attempt to retrieve
	 *
	 * @return mixed null|EE_Price_Type
	 */
	public function get_object_by_id( $PRT_ID ) {
		return EEM_Price_Type::instance()->get_one_by_ID( $PRT_ID );
	}
}




/**
 * EE Factory Class for registrations
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 */
class EE_UnitTest_Factory_For_Registration extends WP_UnitTest_Factory_For_Thing {

	/**
	 * Registrations are related to a transaction - this is used when automatically generating a transaction object to relate to the registration.
	 *
	 * @since  4.3.0
	 * @var EE_Transaction
	 */
	protected $_transaction;



	/**
	 * Registrations are related to a ticket.
	 *
	 * @since 4.3.0
	 * @var   EE_Ticket
	 */
	protected $_ticket;



	/**
	 * Registrations are related to an Attendee.
	 *
	 * @since 4.3.0
	 * @var   EE_Attendee
	 */
	protected $_attendee;



	/**
	 * Registrations are related to an status.
	 *
	 * @since 4.3.0
	 * @var   EE_status
	 */
	protected $_status;


	/**
	 * Used to indicate whether the generated objects are chained in the EE Model Heirarchy or not.  Note that the only relations that are automatically generated and setup when the chained method is use are,  Registrations->Tickets (which also means the EVT_ID is set), Registrations->transaction, Registrations->attendee, Registrations->status.  Registrations to custom questions and answers are NOT set.  Also the transaction is just a base transaction, there are NO relations via transaction to line items.
	 *
	 * @var bool
	 */
	protected $_chained;



	/**
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 * @param bool   $chained        This indicates that we are chaining this registrations to related objects.
	 */
	public function __construct( $factory = NULL, $chained = FALSE ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating registrations
		$this->default_generation_definitions = array(
			'REG_url_link' => new WP_UnitTest_Generator_Sequence( '%s-' . md5( uniqid() ) )
			);
	}



	/**
	 * This generates the dummy relation objects for use in a new registration.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args
	 */
	private function _set_new_relations( $args ) {
		//transaction
		$this->_transaction = empty( $args['TXN_ID'] ) ? $this->factory->transaction->create() : EEM_Transaction::instance()->get_one_by_ID( $args['TXN_ID'] );
		$this->_transaction = empty( $this->_transaction ) ? $this->factory->transaction->create() : $this->_transaction;

		//ticket
		$this->_ticket = empty( $args['TKT_ID'] ) ? $this->factory->ticket_chained->create() : EEM_Ticket::instance()->get_one_by_ID( $args['TKT_ID'] );
		$this->_ticket = empty( $this->_ticket ) ? $this->factory->ticket_chained->create() : $this->_ticket;

		//attendee
		$this->_attendee = empty( $args['ATT_ID'] ) ? $this->factory->attendee->create() : EEM_Attendee::instance()->get_one_by_ID( $args['ATT_ID'] );
		$this->_attendee = empty( $this->_attendee ) ? $this->factory->attendee->create() : $this->_attendee;

		//status
		$this->_status = empty( $arg['STS_ID'] ) ? $this->factory->status->create( array( 'STS_ID' => EEM_Registration::status_id_pending_payment, 'STS_type' => 'registration', 'STS_code' => 'PENDING_PAYMENT' ) ) : EEM_Status::instance()->get_one_by_ID( $args['STS_ID'] );
		$this->_status = empty( $this->_status ) ? $this->factory->status->create( array( 'STS_ID' => EEM_Registration::status_id_pending_payment, 'STS_type' => 'registration', 'STS_code' => 'PENDING_PAYMENT' ) ) : $this->_status;
	}



	/**
	 * This handles connecting a registration to related items when the chained flag is true.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Registration $registration
	 * @param array $args incoming arguments from caller for specifying overrides.
	 *
	 * @return EE_Registration
	 */
	private function _maybe_chained( EE_Registration $registration, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_transaction ) || empty( $this->_ticket ) || empty( $this->_attendee ) || empty( $this->_status ) ) {
				$this->_set_new_relations( $args );
			}

			//add relation to transaction
			$registration->_add_relation_to( $this->_transaction, 'EE_Transaction' );

			//add relation to ticket
			$registration->_add_relation_to( $this->_ticket, 'EE_Ticket' );

			//add relation to event
			$event = $this->_ticket->get_first_related( 'Datetime' )->get_first_related( 'Event' );
			$registration->_add_relation_to( $event, 'EE_Event' );

			//add relation to attendee
			$registration->_add_relation_to( $this->_attendee, 'EE_Attendee' );

			//add relation to status
			$registration->_add_relation_to( $this->_status, 'EE_Status' );

			$registration->save();
			return $registration;
		}
		return $registration;
	}




	/**
	 * used by factory to create registration object.
	 *
	 * @since 4.3.0
	 *
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Registration|false
	 */
	public function create_object( $args ) {
		static $att_nmbr = 0;
		$registration = EE_Registration::new_instance( $args );
		//some things have to be set after the registration has been instantiated.
		$registration->set( 'REG_session', uniqid() );
		$registrationID = $registration->save();
		$registration = $this->_maybe_chained( $registration, $args );
		//only run finalize if $chained because it requires EE_Transaction
		if ( $this->_chained ) {
			$p = new EE_Registration_Processor();
			$att_nmbr++;
			$registration->set_reg_url_link( $p->generate_reg_url_link( $att_nmbr, md5( 'ticket' . $registrationID . time() )));
			$registration->set_reg_code( $p->generate_reg_code( $registration ) );
			$registration->save();
		}
		return $registrationID ? $registration : false;
	}



	/**
	 * Update registration object for given registration.
	 *
	 * @since 4.3.0
	 *
	 * @param int      $REG_ID         Registration ID for the registration to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Registration|false.
	 */
	public function update_object( $REG_ID, $cols_n_data ) {
		//all the stuff for updating an registration.
		$registration = EEM_Registration::instance()->get_one_by_ID( $REG_ID );
		if ( ! $registration instanceof EE_Registration )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$registration->set( $key, $val );
		}
		$success = $registration->save();
		return $success ? $registration : false;
	}




	/**
	 * return the registration object for a given registration ID.
	 *
	 * @since 4.3.0
	 *
	 * @param int  $REG_ID the registration id for the registration to attempt to retrieve
	 *
	 * @return mixed null|EE_Registration
	 */
	public function get_object_by_id( $REG_ID ) {
		return EEM_Registration::instance()->get_one_by_ID( $REG_ID );
	}

}




/**
 * EE Factory Class for Transaction.
 *
 * When this is called as a chained object - the following relations will be also generated and attached:
 * - Registration (note this also sets all the relations on a registration up)
 * - Status.
 *
 * Chained does NOT setup (currently):
 * - Payment
 * - Line_Item
 *
 * Also with the chained flag active, the transaction object does not get its TXN_session_data() value set (@todo)
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 */
class EE_UnitTest_Factory_For_Transaction extends WP_UnitTest_Factory_For_Thing {


	/**
	 * If chained, the registration will be added to this property.
	 *
	 * @since  4.3.0
	 * @var EE_Registration
	 */
	protected $_registration;



	/**
	 * If chained, the EE_Status objecdt.
	 *
	 * @since  4.3.0
	 * @var EE_Status
	 */
	protected $_status;


	/**
	 * For transactions, this simply indicates whether a registration and status will automatically be setup and attached to the transaction or not.
	 * Note.  When create_many() method is called for the transaction factory, NEW registrations will be created for each transaction (instead of reusing any existing created ones).  However the EXISTING status is reused.
	 *
	 * @var bool
	 */
	protected $_chained;


	/**
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 */
	public function __construct( $factory = NULL, $chained = FALSE ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating transactions
		$this->default_generation_definitions = array();
	}



	/**
	 * This generates the dummy relation objects for use in a new transaction if the $_chained flag is set.  Note this is called on EVERY new transaction created when create_many() is called.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args arguments that are sent to the factory that *may contain registration id.
	 * @param int     $TXN_ID required to make sure that when registration_chained is called, it does not create a new transaction object but uses THIS transaction and sets the relation.
	 */
	private  function _set_new_relations( $args, $TXN_ID ) {
		//registration
		$this->_registration = empty( $args['REG_ID'] ) ? $this->factory->registration_chained->create( array( 'TXN_ID' => $TXN_ID ) ) : EEM_Registration::instance()->get_one_by_ID( $args['REG_ID'] );
		$this->_registration = empty( $this->_registration ) ? $this->factory->registration_chained->create( array( 'TXN_ID' => $TXN_ID ) ) : $this->_registration;
	}




	/**
	 * This generates the dummy relation objects for use in a new transaction if the $_chained flag is true.  Note this is called just once when create_many() method is used.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args arguments that are sent to the factory that *may contain registration id.
	 * @param int     $TXN_ID required to make sure that when registration_chained is called, it does not create a new transaction object but uses THIS transaction and sets the relation.
	 */
	private function _set_repeated_relation( $args, $TXN_ID ) {
		//status
		$this->_status = empty( $args['STS_ID'] ) ? $this->factory->status->create( array( 'STS_ID' => EEM_Transaction::incomplete_status_code, 'STS_type' => 'transaction', 'STS_code' => 'INCOMPLETE' ) ) : EEM_Status::instance()->get_one_by_ID( $args['STS_ID'] );
		$this->_status = empty( $this->_status ) ? $this->factory->status->create( array( 'STS_ID' => EEM_Transaction::incomplete_status_code, 'STS_type' => 'transaction', 'STS_code' => 'INCOMPLETE' ) ) : $this->_status;
	}



	/**
	 * This handles connecting a tranaction to related items when the chained flag is true.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Transaction $transaction
	 * @param array $args incoming arguments from caller for specifying overrides.
	 *
	 * @return EE_Transaction
	 */
	private function _maybe_chained( EE_Transaction $transaction, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_status ) ) {
				$this->_set_repeated_relation( $args, $transaction->ID() );
			}

			//YES we DO want to set brand new relation objects because multiple transactions do not share the same related objects (for the purpose of tests at least)
			$this->_set_new_relations( $args, $transaction->ID() );

			//note relation to registration should already be set via the factory->registration_chained->create() method.

			//add relation to status
			$transaction->_add_relation_to( $this->_status, 'EE_Status' );

			$transaction->save();
			return $transaction;
		}
		return $transaction;
	}


	/**
	 * used by factory to create transaction object.
	 *
	 * @since 4.3.0
	 *
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Transaction|false
	 */
	public function create_object( $args ) {
		$transaction = EE_Transaction::new_instance( $args );
		$transactionID = $transaction->save();
		$transaction = $this->_maybe_chained( $transaction, $args );
		$transaction->save();
		return $transactionID ? $transaction : false;
	}



	/**
	 * Update transaction object for given transaction.
	 *
	 * @since 4.3.0
	 *
	 * @param int      $TXN_ID         Transaction ID for the transaction to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Transaction|false.
	 */
	public function update_object( $TXN_ID, $cols_n_data ) {
		//all the stuff for updating an transaction.
		$transaction = EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
		if ( ! $transaction instanceof EE_Transaction )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$transaction->set( $key, $val );
		}
		$success = $transaction->save();
		return $success ? $transaction : false;
	}




	/**
	 * return the transaction object for a given transaction ID.
	 *
	 * @since 4.3.0
	 *
	 * @param int  $TXN_ID the transaction id for the transaction to attempt to retrieve
	 *
	 * @return mixed null|EE_Transaction
	 */
	public function get_object_by_id( $TXN_ID ) {
		return EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
	}

}





/**
 * EE Factory Class for Attendee.
 *
 * When this is called as a chained object - the following relations will be also generated and attached:
 * - Registration (note this also sets all the relations on a registration up)
 *
 * relations that are NOT currently setup (@todo)
 * - State
 * - Country
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 */
class EE_UnitTest_Factory_For_Attendee extends WP_UnitTest_Factory_For_Thing {


	/**
	 * If chained, the registration will be added to this property.
	 *
	 * @since  4.3.0
	 * @var EE_Registration
	 */
	protected $_registration;



	/**
	 * For EE_Attendee objects, this simply indicates whether a registration will automatically be setup and attached to the attendee or not.
	 * Note.  When create_many() method is called for the transaction factory, NEW registrations will be created for each attendee (instead of reusing any existing created ones).
	 *
	 * @var bool
	 */
	protected $_chained;


	/**
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 */
	public function __construct( $factory = NULL, $chained = FALSE ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating attendees
		$this->default_generation_definitions = array(
			'ATT_fname' => 'Anonymous',
			'ATT_lname' => new WP_UnitTest_Generator_Sequence( 'Llama %s' ),
			'ATT_address' => new WP_UnitTest_Generator_Sequence( '%s Farm Lane' ),
			'ATT_city' => 'Some Town',
			'ATT_zip' => new WP_UnitTest_Generator_Sequence('00000%s'),
			'ATT_email' => new WP_UnitTest_Generator_Sequence('llamasrule%s@llama.lm'),
			'ATT_phone' => new WP_UnitTest_Generator_Sequence('%s%s%s-%s%s%s-%s%s%s%s')
			);
	}



	/**
	 * This generates the dummy relation objects for use in a new attendee if the $_chained flag is set.  Note this is called on EVERY new attendee created when create_many() is called.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args arguments that are sent to the factory that *may contain registration id.
	 * @param int     $ATT_ID required to make sure that when registration_chained is called, it does not create a new attendee object but uses THIS attendee and sets the relation.
	 */
	private  function _set_new_relations( $args, $ATT_ID ) {
		//registration
		$this->_registration = empty( $args['REG_ID'] ) ? $this->factory->registration_chained->create( array( 'ATT_ID' => $ATT_ID ) ) : EEM_Registration::instance()->get_one_by_ID( $args['REG_ID'] );
		$this->_registration = empty( $this->_registration ) ? $this->factory->registration_chained->create( array( 'ATT_ID' => $ATT_ID ) ) : $this->_registration;
	}



	/**
	 * This handles connecting a attendee to related items when the chained flag is true.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Attendee $attendee
	 * @param array $args incoming arguments from caller for specifying overrides.
	 *
	 * @return EE_Attendee
	 */
	private function _maybe_chained( EE_Attendee $attendee, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_status ) ) {
				$this->_set_repeated_relation( $args, $attendee->ID() );
			}

			//YES we DO want to set brand new relation objects because multiple attendees do not share the same related objects (for the purpose of tests at least)
			$this->_set_new_relations( $args, $attendee->ID() );

			//note relation to registration should already be set via the factory->registration_chained->create() method.

			//add relation to status
			$attendee->_add_relation_to( $this->_status, 'EE_Status' );

			$attendee->save();
			return $attendee;
		}
		return $attendee;
	}


	/**
	 * used by factory to create attendee object.
	 *
	 * @since 4.3.0
	 *
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Attendee|false
	 */
	public function create_object( $args ) {
		$attendee = EE_Attendee::new_instance( $args );
		$attendeeID = $attendee->save();
		$attendee = $this->_maybe_chained( $attendee, $args );
		$attendee->save();
		return $attendeeID ? $attendee : false;
	}



	/**
	 * Update attendee object for given attendee.
	 *
	 * @since 4.3.0
	 *
	 * @param int      $ATT_ID         Attendee ID for the attendee to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Attendee|false.
	 */
	public function update_object( $ATT_ID, $cols_n_data ) {
		//all the stuff for updating an attendee.
		$attendee = EEM_Attendee::instance()->get_one_by_ID( $ATT_ID );
		if ( ! $attendee instanceof EE_Attendee )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$attendee->set( $key, $val );
		}
		$success = $attendee->save();
		return $success ? $attendee : false;
	}




	/**
	 * return the attendee object for a given attendee ID.
	 *
	 * @since 4.3.0
	 *
	 * @param int  $ATT_ID the attendee id for the attendee to attempt to retrieve
	 *
	 * @return mixed null|EE_Attendee
	 */
	public function get_object_by_id( $ATT_ID ) {
		return EEM_Attendee::instance()->get_one_by_ID( $ATT_ID );
	}
}





/**
 * EE Factory Class for EE_Status
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 */
class EE_UnitTest_Factory_For_Status extends WP_UnitTest_Factory_For_Thing {

	public function __construct( $factory = NULL ) {
		parent::__construct( $factory );
		//default args for creating events.
		$this->default_generation_definitions = array();
	}


	/**
	 * used by factory to create status object
	 *
	 * @since 4.3.0
	 *
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Status|false
	 */
	public function create_object( $args ) {
		$status = EE_Status::new_instance( $args );
		$statusID = $status->save();
		return $statusID ? $status : false;
	}


	/**
	 * Update status object for given status
	 *
	 * @since 4.3.0
	 *
	 * @param int      $STS_ID         Status ID for the status to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Status|false
	 */
	public function update_object( $STS_ID, $cols_n_data ) {
		//all the stuff for updating an status.
		$status = EEM_Status::instance()->get_one_by_ID( $STS_ID );
		if ( ! $status instanceof EE_Status )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$status->set( $key, $val );
		}
		$success = $status->save();
		return $success ? $status : false;
	}



	/**
	 * return the status object for a given status ID
	 *
	 * @since 4.3.0
	 *
	 * @param int  $STS_ID the status id for the status to attemp to retrieve
	 *
	 * @return mixed null|EE_Status
	 */
	public function get_object_by_id( $STS_ID ) {
		return EEM_Status::instance()->get_one_by_ID( $STS_ID );
	}
}
