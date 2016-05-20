<?php
namespace EventEspresso\core\services\progress_steps\display_strategies;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface ProgressStepsDisplayInterface
 * interface for building classes that work with \EventEspresso\core\services\progress_steps\ProgressStepManager
 * and handle displaying the Progress Steps using a particular styling or theme
 *
*@package EventEspresso\core\services\progress_steps\display_strategies
 */
interface ProgressStepsDisplayInterface {

	/**
	 * used for setting up css and js required for the display strategy
	 * ** IMPORTANT **
	 * This needs to be called BEFORE the wp_enqueue_scripts hook point for the frontend
	 * or the admin_enqueue_scripts in the admin.
	 * If setting up steps for the admin, this can be done via the
	 * 'FHEE__EE_Admin_Page___load_page_dependencies__after_load' ACTION
	 * in \EE_Admin_Page::_load_page_dependencies() or the targeted hook that comes after it
	 *
	 * @return void
	 */
	public function enqueueStylesAndScripts();

	/**
	 * loads and returns a full server path to the template used for the display strategy
	 *
	 * @return string
	 */
	public function getTemplate();

}
// End of file ProgressStepsDisplayInterface.php
// Location: /ProgressStepsDisplayInterface.php