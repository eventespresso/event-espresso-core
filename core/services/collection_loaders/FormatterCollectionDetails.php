<?php
namespace EventEspresso\core\services\collection_loaders;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class FormatterCollectionDetails
 * Example class to illustrate how EventEspresso\core\services\collection_loaders\CollectionLoader works
 * when loading objects based on their FQCN
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
 class FormatterCollectionDetails extends CollectionDetails {

	 /**
	  * MessengerCollectionDetails constructor.
	  *
	  * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	  * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	  * @throws \EventEspresso\Core\Exceptions\InvalidInterfaceException
	  * @throws \EventEspresso\Core\Exceptions\InvalidIdentifierException
	  */
	 public function __construct() {
		 parent::__construct(
			 'formatter',
			 'EEI_Address_Formatter',
			 array(
				 '\EventEspresso\core\services\address\formatters\InlineAddressFormatter',
				 '\EventEspresso\core\services\address\formatters\MultiLineAddressFormatter',
				 '\EventEspresso\core\services\address\formatters\NullAddressFormatter',
			 ),
			 array(),
			 '',
			 CollectionDetails::ID_CLASS_NAME
		 );
	 }

 }
// End of file FormatterCollectionDetails.php
// Location: /FormatterCollectionDetails.php