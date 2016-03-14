<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) exit( 'No direct script access allowed' );

/**
 * This prepares data for message types that send messages for multiple registrations (that could span multiple transactions)
 * and handles when the incoming data is an array of EE_Registration objects.
 *
 * @package        Event Espresso
 * @subpackage     messages
 * @since          4.8.36.rc.002
 * @author         Darren Ethier
 */
class EE_Messages_Registrations_incoming_data extends EE_Messages_incoming_data {


	/**
	 * Constructor.
	 *
	 * @param  EE_Registration[]     $data expecting an array of EE_Registration objects.
	 * @throws EE_Error
	 * @access protected
	 */
	public function __construct( $data = array() ) {

		//validate that the first element in the array is an EE_Registration object.
		if ( ! reset( $data ) instanceof EE_Registration ) {
			throw new EE_Error( __( 'The EE_Message_Registrations_incoming_data class expects an array of EE_Registration objects.', 'event_espresso' ) );
		}
		parent::__construct( $data );
	}



	/**
	 * setup the data.
	 *
	 * Sets up the expected data object for the messages prep using incoming registration objects.
	 *
	 * @return void
	 * @access protected
	 */
	protected function _setup_data() {

		//we'll loop through each contact and setup the data needed.  Note that many properties will just be set as empty
		//because this data handler is for a very specific set of data (i.e. just what's related to the registration).

		//there could be multiple transactions represented so we leave at null.
		$this->txn = null;
		$this->reg_objs = $this->data();
		$this->_assemble_data();
	}
}
