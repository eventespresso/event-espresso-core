<?php
namespace EventEspresso\core\libraries\form_sections;

use InvalidArgumentException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * interface SequentialStepFormInterface
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
interface SequentialStepFormInterface extends FormInterface {


	/**
	 * @return int
	 */
	public function order();



	/**
	 * @param int $order
	 * @throws InvalidArgumentException
	 */
	public function setOrder( $order );


}
// End of file SequentialStepFormInterface.php
// Location: /SequentialStepFormInterface.php