<?php
namespace EventEspresso\core\services\progress_steps;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ProgressStep
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class ProgressStep implements ProgressStepInterface{

	public function display() {
	}

	public function update() {
	}

}
// End of file ProgressStep.php
// Location: /ProgressStep.php