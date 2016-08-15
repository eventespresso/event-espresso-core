<?php
namespace EventEspresso\core\services\progress_steps;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface ProgressStepInterface
 * interface for building classes that work with \EventEspresso\core\services\progress_steps\ProgressStepManager
 * and define the details of a particular form step and it's current state within a sequence of form steps
 *
*@package EventEspresso\core\services\progress_steps
 */
interface ProgressStepInterface {

	/**
	 * @return boolean
	 */
	public function isCurrent();

	/**
	 * @param boolean $is_current
	 */
	public function setIsCurrent( $is_current = true );

	/**
	 * @return string
	 */
	public function id();

	/**
	 * @return int
	 */
	public function order();

	/**
	 * @return string
	 */
	public function htmlClass();

	/**
	 * @return string
	 */
	public function text();

}
// End of file ProgressStepInterface.php
// Location: /ProgressStepInterface.php