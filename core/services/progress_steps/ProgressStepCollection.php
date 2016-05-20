<?php
namespace EventEspresso\core\services\progress_steps;

use EventEspresso\core\services\collections\Collection;


if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ProgressStepCollection
 * an SplObjectStorage container for objects that implement
 * \EventEspresso\core\services\progress_steps\ProgressStepInterface
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class ProgressStepCollection extends Collection {

	/**
	 * ProgressStepCollection constructor.
	 *
	 * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
	 */
	public function __construct() {
		parent::__construct( '\EventEspresso\core\services\progress_steps\ProgressStepInterface' );
	}

}
// End of file ProgressStepCollection.php
// Location: /ProgressStepCollection.php