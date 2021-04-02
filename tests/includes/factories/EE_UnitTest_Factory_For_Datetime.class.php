<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE Factory Class for Datetimes
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
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
	 * Used to indicate whether the generated objects are chained in the EE Model Hierarchy or not.
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
	 * @param bool $chained This indicates that we are chaining this datetime to an event (instead of creating a isolated Datetime).
	 */
	public function __construct( $factory = null, $chained = false ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating datetimes
		$this->default_generation_definitions = array(
			'DTT_name'        => new WP_UnitTest_Generator_Sequence( 'Datetime %s' ),
			'DTT_description' => new WP_UnitTest_Generator_Sequence( 'Datetime Description %s' ),
			'DTT_EVT_start'   => strtotime( '+1 month' ),
			'DTT_EVT_end'     => strtotime( '+2 months' )
		);
	}



	/**
	 * This allows setting the $_event property to a new event object if the incoming args for the
	 * new dtt have an event id (or set to default if no evt_id)
	 *
	 * @since 4.3.0
	 * @param int $EVT_ID EE_Event ID
	 */
	private function _set_new_event( $EVT_ID = 0 ) {
		$this->_event = empty( $EVT_ID ) ? EEM_Event::instance()->get_one_by_ID( $EVT_ID ) : $this->factory->event->create();
		//fail safe just in case (so we can be sure to have an event).
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
				$EVT_ID = isset( $this->_special_args[ 'EVT_ID' ] ) ? $this->_special_args[ 'EVT_ID' ] : 0;
				$this->_set_new_event( $EVT_ID );
			}
			//add relation to event
			$dtt->_add_relation_to( $this->_event, 'Event' );
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
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Datetime|false
	 */
	public function create_object( $args ) {
		$this->_special_args[ 'EVT_ID' ] = isset( $args[ 'EVT_ID' ] ) ? $args[ 'EVT_ID' ] : 0;
		if ( isset( $args[ 'EVT_ID' ] ) ) {
			unset( $args[ 'EVT_ID' ] );
		}
		//timezone?
		if ( isset( $args[ 'timezone' ] ) ) {
			$timezone = $args[ 'timezone' ];
			unset( $args[ 'timezone' ] );
		} else {
			$timezone = '';
		}
        //date formats?
		if ( isset( $args[ 'formats' ] ) && is_array( $args[ 'formats' ] ) ) {
			$formats = $args[ 'formats' ];
			unset( $args[ 'formats' ] );
		} else {
			$formats = array();
		}
		$dtt = EE_Datetime::new_instance( $args, $timezone, $formats );
		$dttID = $dtt->save();
		$dtt = $this->_maybe_chained( $dtt, $args );
		return $dttID ? $dtt : false;
	}



	/**
	 * Update datetime object for given datetime
	 *
	 * @since 4.3.0
	 *
	 * @param int $DTT_ID Datetime ID for the datetime to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Datetime|false.
	 */
	public function update_object( $DTT_ID, $cols_n_data ) {
		//all the stuff for updating an datetime.
		$dtt = EEM_Datetime::instance()->get_one_by_ID( $DTT_ID );
		if ( ! $dtt instanceof EE_Datetime ) {
			return null;
		}
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
	 * @param int $DTT_ID the datetime id for the datetime to attempt to retrieve
	 *
	 * @return mixed null|EE_Datetime
	 */
	public function get_object_by_id( $DTT_ID ) {
		return EEM_Datetime::instance()->get_one_by_ID( $DTT_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Datetime.class.php
// Location: /EE_UnitTest_Factory_For_Datetime.class.php