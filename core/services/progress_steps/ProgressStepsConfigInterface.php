<?php
namespace EventEspresso\core\services\progress_steps;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface ProgressStepsConfigInterface
 * interface for persisting the state of a form's progress
 *
 * @package EventEspresso\core\services\progress_steps
 */
interface ProgressStepsConfigInterface {

	public function get();

	public function update();

}
// End of file ProgressStepsConfigInterface.php
// Location: /ProgressStepsConfigInterface.php