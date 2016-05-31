<?php
namespace EventEspresso\core\libraries\form_sections;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\commands\CommandBus;
use InvalidArgumentException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class SequentialStepForm
 * abstract parent class for building a form that is one part of a multi-stepped sequential form.
 * it handles storing data about the form step order and where the form should redirect to when completed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class SequentialStepForm extends FormHandler implements SequentialStepFormInterface {

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
	 * URL params in key value pairs
	 *
	 * @var array $redirect_args
	 */
	private $redirect_args = array();



	/**
	 * SequentialStepForm constructor
	 *
	 * @param int        $order
	 * @param string     $form_name
	 * @param string     $admin_name
	 * @param string     $slug
	 * @param string     $form_action
	 * @param string     $form_config
	 * @param CommandBus $command_bus
	 */
	public function __construct(
		$order,
		$form_name,
		$admin_name,
		$slug,
		$form_action = '',
		$form_config = FormHandler::ADD_FORM_TAGS_AND_SUBMIT,
		CommandBus $command_bus = null
	) {
		$this->setOrder( $order );
		parent::__construct( $form_name, $admin_name, $slug, $form_action, $form_config, $command_bus );
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
		return ! empty( $this->redirect_args )
			? add_query_arg( $this->redirect_args, $this->redirect_url )
			: $this->redirect_url;
	}



	/**
	 * @param string $redirect_url
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
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
	 * @throws InvalidArgumentException
	 */
	public function addRedirectArgs( $redirect_args = array() ) {
		if ( is_object( $redirect_args ) ) {
			throw new InvalidDataTypeException(
				'$redirect_args',
				$redirect_args,
				'anything other than an object was expected.'
			);
		}
		if ( empty( $redirect_args ) ) {
			throw new InvalidArgumentException(
				__( 'The redirect arguments can not be an empty array.', 'event_espresso' )
			);
		}
		$this->redirect_args = array_merge( $this->redirect_args, $redirect_args );
	}


}
// End of file SequentialStepForm.php
// Location: /SequentialStepForm.php