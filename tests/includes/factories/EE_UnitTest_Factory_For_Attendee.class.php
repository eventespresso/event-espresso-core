<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



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
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
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
	public function __construct( $factory = null, $chained = false ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating attendees
		$this->default_generation_definitions = array(
			'ATT_fname'   => 'Anonymous',
			'ATT_lname'   => new WP_UnitTest_Generator_Sequence( 'Llama %s' ),
			'ATT_address' => new WP_UnitTest_Generator_Sequence( '%s Farm Lane' ),
			'ATT_city'    => 'Some Town',
			'ATT_zip'     => new WP_UnitTest_Generator_Sequence( '00000%s' ),
			'ATT_email'   => new WP_UnitTest_Generator_Sequence( 'llamasrule%s@llama.lm' ),
			'ATT_phone'   => new WP_UnitTest_Generator_Sequence( '%1$s%1$s%1$s-%1$s%1$s%1$s-%1$s%1$s%1$s%1$s' )
		);
	}



	/**
	 * This generates the dummy relation objects for use in a new attendee if the $_chained flag is set.  Note this is called on EVERY new attendee created when create_many() is called.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args arguments that are sent to the factory that *may contain registration id.
	 * @param int $ATT_ID required to make sure that when registration_chained is called, it does not create a new attendee object but uses THIS attendee and sets the relation.
	 */
	private function _set_new_relations( $args, $ATT_ID ) {
		//registration
		$this->_registration = empty( $args[ 'REG_ID' ] ) ? $this->factory->registration_chained->create( array( 'ATT_ID' => $ATT_ID ) ) : EEM_Registration::instance()->get_one_by_ID( $args[ 'REG_ID' ] );
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
			$attendee->_add_relation_to( $this->_status, 'Status' );
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
	 * @param array $args Incoming field values to set on the new object
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
	 * @param int $ATT_ID Attendee ID for the attendee to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Attendee|false.
	 */
	public function update_object( $ATT_ID, $cols_n_data ) {
		//all the stuff for updating an attendee.
		$attendee = EEM_Attendee::instance()->get_one_by_ID( $ATT_ID );
		if ( ! $attendee instanceof EE_Attendee ) {
			return null;
		}
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
	 * @param int $ATT_ID the attendee id for the attendee to attempt to retrieve
	 *
	 * @return mixed null|EE_Attendee
	 */
	public function get_object_by_id( $ATT_ID ) {
		return EEM_Attendee::instance()->get_one_by_ID( $ATT_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Attendee.class.php
// Location: /EE_UnitTest_Factory_For_Attendee.class.php