<?php
namespace EventEspresso\core\libraries\form_sections;

use EventEspresso\Core\Exceptions\InvalidDataTypeException;
use InvalidArgumentException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class SequentialStepForm
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class SequentialStepForm extends Form implements SequentialStepFormInterface {

	/**
	 * numerical value used for sorting form steps
	 * 
	 * @var int $order
	 */
	private $order = 1;

	/**
	 * a final URL with all form related parameters added
	 * that will be used to advance to the next step
	 *
	 * @var string $redirect_url
	 */
	private $redirect_url = '';



	/**
	 * SequentialStepForm constructor.
	 *
	 * @param int    $order
	 * @param string $form_name
	 * @param string $admin_name
	 * @param string $slug
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
	 */
	public function __construct( $order, $form_name, $admin_name, $slug ) {
		$this->setOrder( $order );
		parent::__construct( $form_name, $admin_name, $slug );
	}



	/**
	 * @return int
	 */
	public function order() {
		return $this->order;
	}



	/**
	 * @param int $order
	 * @throws InvalidArgumentException
	 */
	public function setOrder( $order ) {
		$order = absint( $order );
		if ( ! $order > 0 ) {
			throw new InvalidArgumentException(
				__( 'The form order property must be a positive integer.', 'event_espresso' )
			);
		}
		$this->order = $order;
	}




	/**
	 * @return string
	 */
	public function redirectUrl() {
		return $this->redirect_url;
	}



	/**
	 * @param string $redirect_url
	 * @throws InvalidDataTypeException
	 * @throws \InvalidArgumentException
	 */
	public function setRedirectUrl( $redirect_url ) {
		if ( ! is_string( $redirect_url ) ) {
			throw new InvalidDataTypeException( '$redirect_url', $redirect_url, 'string' );
		}
		if ( empty( $redirect_url ) ) {
			throw new InvalidArgumentException(
				__( 'The redirect URL can not be an empty string.', 'event_espresso' )
			);
		}
		$this->redirect_url = $redirect_url;
	}



	/**
	 * @param array $redirect_args
	 * @throws InvalidDataTypeException
	 * @throws \InvalidArgumentException
	 */
	public function addRedirectArgs( $redirect_args = array() ) {
		if ( ! is_object( $redirect_args ) ) {
			throw new InvalidDataTypeException( '$redirect_args', $redirect_args, 'anything other than an object' );
		}
		if ( empty( $redirect_args ) ) {
			throw new InvalidArgumentException(
				__( 'The redirect arguments can not be an empty array.', 'event_espresso' )
			);
		}
		$this->setRedirectUrl(
			add_query_arg( $redirect_args, $this->redirect_url )
		);
	}



}
// End of file SequentialStepForm.php
// Location: /SequentialStepForm.php