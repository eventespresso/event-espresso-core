<?php
namespace EventEspresso\core\libraries\form_sections\form_handlers;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use InvalidArgumentException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * interface SequentialStepFormInterface
 * interface for building forms that work as part of a multi-stepped sequential form
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
interface SequentialStepFormInterface extends FormHandlerInterface {


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



	/**
	 * @return string
	 */
	public function redirectTo();



	/**
	 * @param string $redirect_to
	 */
	public function setRedirectTo( $redirect_to );



}
// End of file SequentialStepFormInterface.php
// Location: /SequentialStepFormInterface.php