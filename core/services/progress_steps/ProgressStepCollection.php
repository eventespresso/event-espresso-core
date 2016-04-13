<?php
namespace EventEspresso\core\services\progress_steps;

use EventEspresso\core\services\collection_loaders\CollectionInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ProgressStepCollection
 * Description

 *
*@package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ProgressStepCollection extends \EE_Object_Collection implements CollectionInterface{

	/**
	 * ProgressStepCollection constructor.
	 */
	public function __construct() {
		$this->interface = 'ProgressStepInterface';
	}

}
// End of file ProgressStepCollection.php
// Location: /ProgressStepCollection.php