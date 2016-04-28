<?php
namespace EventEspresso\core\services\collection_loaders;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class MessengerCollectionDetails

 * Example class to illustrate how EventEspresso\core\services\collection_loaders\CollectionLoader works

 *
*@package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
 class MessengerCollectionDetails extends CollectionDetails {

	 /**
	  * MessengerCollectionDetails constructor.
	  *
	  * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	  * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	  * @throws \EventEspresso\Core\Exceptions\InvalidInterfaceException
	  */
	 public function __construct() {
		 parent::__construct(
			 'messengers',
			 'EE_messenger',
			 array(),
			 array( EE_LIBRARIES . 'messages' . DS . 'messenger' ),
			 '*.class.php'
		 );
	 }

 }
// End of file MessengerCollectionDetails.php
// Location: /MessengerCollectionDetails.php