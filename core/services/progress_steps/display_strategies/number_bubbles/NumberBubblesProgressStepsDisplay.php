<?php
namespace EventEspresso\core\services\progress_steps\display_strategies\number_bubbles;

use EventEspresso\core\services\progress_steps\display_strategies\ProgressStepsDisplayInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class NumberBubblesProgressStepsDisplay
 * Displays Progress Steps using large numbered "bubbles"
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class NumberBubblesProgressStepsDisplay implements ProgressStepsDisplayInterface {


	/**
	 * used for setting up css and js required for the display strategy
	 *
	 * @return void
	 */
	public function enqueueStylesAndScripts() {
		// core/services/progress_steps/display_strategies/number_bubbles/number_bubbles.css
		wp_enqueue_style(
			'ee_progress_steps_display_number_bubbles',
			plugin_dir_url( __FILE__ ) . 'number_bubbles.css'
		);
	}



	/**
	 * loads and returns a full server path to the template used for the display strategy
	 *
	 * @return string
	 */
	public function getTemplate() {
		// return plugin_dir_path( __FILE__ ) . 'number_bubbles.template.php';
		return __DIR__ . DS .'number_bubbles.template.php';
	}

}
// End of file NumberBubblesProgressStepsDisplay.php
// Location: core/services/progress_steps/display_strategies/number_bubbles/NumberBubblesProgressStepsDisplay.php