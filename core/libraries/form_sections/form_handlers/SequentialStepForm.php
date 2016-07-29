<?php
namespace EventEspresso\core\libraries\form_sections\form_handlers;

use EventEspresso\core\exceptions\InvalidDataTypeException;
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

	const REDIRECT_TO_NEXT_STEP = 'redirect_to_next_step';
	const REDIRECT_TO_CURRENT_STEP = 'redirect_to_current_step';
	const REDIRECT_TO_PREV_STEP = 'redirect_to_prev_step';
	const REDIRECT_TO_OTHER = 'redirect_to_other';

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
	 * Which step should be redirected to after form processing.
	 * Usually after successfully processing this value would be REDIRECT_TO_NEXT_STEP
	 * If a form is invalid and requires errors to be corrected,
	 * then this value would be REDIRECT_TO_CURRENT_STEP so that form can be resubmitted
	 * Some form handlers do not have a form that is displayable,
	 * and only perform data processing, but if an error occurs,
	 * then this value needs to be set to REDIRECT_TO_PREV_STEP
	 * since the current step has no displayable content.
	 * if the form is completely finished, and needs to redirect to somewhere
	 * completely different, then this value will be REDIRECT_TO_OTHER
	 *
	 * @var string $redirect_to
	 */
	private $redirect_to = SequentialStepForm::REDIRECT_TO_CURRENT_STEP;



	/**
	 * SequentialStepForm constructor
	 *
	 * @param int          $order
	 * @param string       $form_name
	 * @param string       $admin_name
	 * @param string       $slug
	 * @param string       $form_action
	 * @param string       $form_config
	 * @param \EE_Registry $registry
	 */
	public function __construct(
		$order,
		$form_name,
		$admin_name,
		$slug,
		$form_action = '',
		$form_config = 'add_form_tags_and_submit',
		\EE_Registry $registry
	) {
		$this->setOrder( $order );
		parent::__construct( $form_name, $admin_name, $slug, $form_action, $form_config, $registry );
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
				__( 'The redirect argument can not be an empty array.', 'event_espresso' )
			);
		}
		$this->redirect_args = array_merge( $this->redirect_args, (array) $redirect_args );
	}



	/**
	 * @param array $redirect_arg_keys_to_remove
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
	 */
	public function removeRedirectArgs( $redirect_arg_keys_to_remove = array() ) {
		if ( is_object( $redirect_arg_keys_to_remove ) ) {
			throw new InvalidDataTypeException(
				'$redirect_arg_keys_to_remove',
				$redirect_arg_keys_to_remove,
				'anything other than an object was expected.'
			);
		}
		if ( empty( $redirect_arg_keys_to_remove ) ) {
			throw new InvalidArgumentException(
				__( 'The $redirect_arg_keys_to_remove argument can not be an empty array.', 'event_espresso' )
			);
		}
		foreach ( $redirect_arg_keys_to_remove as $redirect_arg_key ) {
			unset( $this->redirect_args[ $redirect_arg_key ] );
		}
	}



	/**
	 * @return string
	 */
	public function redirectTo() {
		return $this->redirect_to;
	}



	/**
	 * @param string $redirect_to
	 */
	public function setRedirectTo( $redirect_to ) {
		if (
			! in_array(
				$redirect_to,
				array(
					SequentialStepForm::REDIRECT_TO_NEXT_STEP,
					SequentialStepForm::REDIRECT_TO_CURRENT_STEP,
					SequentialStepForm::REDIRECT_TO_PREV_STEP,
					SequentialStepForm::REDIRECT_TO_OTHER,
				)
			)
		) {
			throw new InvalidDataTypeException(
				'setRedirectTo()',
				$redirect_to,
				'one of the SequentialStepForm class constants was expected.'
			);
		}
		$this->redirect_to = $redirect_to;
	}


}
// End of file SequentialStepForm.php
// Location: /SequentialStepForm.php