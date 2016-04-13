<?php
namespace EventEspresso\core\services\progress_steps;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ProgressStepManager
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ProgressStepManager {

	protected $collection;



	/**
	 * ProgressStepManager constructor.
	 *
	 * @param \CollectionInterface $collection
	 */
	public function __construct( CollectionInterface $collection ) {
		$this->collection = $collection;
	}



	public function prevStep() {

	}

	public function currentStep() {

	}

	public function nextStep() {

	}

}

// End of file ProgressStepManager.php
// Location: /ProgressStepManager.php