<?php
namespace EventEspresso\core\services\progress_steps;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface ProgressStepInterface
 *
 * @package EventEspresso\core\services\progress_steps
 */
interface ProgressStepInterface {

	public function display();

	public function update();

}
// End of file ProgressStepInterface.php
// Location: /ProgressStepInterface.php