<?php
namespace EventEspresso\core\domain\services;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class DomainService
 * Abstract parent class for all Domain Services
 * A Domain Service is defined as follows:
 *  - a stateless object that performs an action
 *  - should have little to no dependencies
 *  - should not interact with other layers ( application or infrastructure )
 *    therefore it should not access the application framework, external APIs, etc
 *  - does not contain logic that should belong to a model,
 *    but is often logic that implements or coordinates logic from multiple models
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
abstract class DomainService implements DomainServiceInterface {

	/**
	 * DomainService constructor.
	 */
	public function __construct()
	{
	}

}
// End of file DomainService.php
// Location: /DomainService.php