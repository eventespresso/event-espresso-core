<?php
namespace EventEspresso\core\libraries\form_sections;

use EventEspresso\Core\Exceptions\InvalidDataTypeException;
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



	/**
	 * @return string
	 */
	public function redirectUrl();



	/**
	 * @param string $redirect_url
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
	 */
	public function setRedirectUrl( $redirect_url );



	/**
	 * @param array $redirect_args
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
	 */
	public function addRedirectArgs( $redirect_args = array() );

}
// End of file SequentialStepFormInterface.php
// Location: /SequentialStepFormInterface.php