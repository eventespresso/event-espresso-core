<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * Has Sending Messenger Interface
 * This interface is implemented on messenger classes that have an explicit sending messenger.
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.9.0
 * @author     Darren Ethier
 */
interface EEI_Has_Sending_Messenger {


	/**
	 * Expect a EE_messenger object back that is serving as the sending messenger for a message.
	 * @return EE_messenger
	 */
	public function sending_messenger();
}