<?php
namespace EventEspresso\core\libraries\form_sections\form_handlers;

use EE_Error;
use EE_Request;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\progress_steps\ProgressStep;
use EventEspresso\core\services\progress_steps\ProgressStepCollection;
use EventEspresso\core\services\progress_steps\ProgressStepManager;
use Exception;
use InvalidArgumentException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class SequentialStepFormManager
 * abstract parent class for managing a series of SequentialStepForm classes
 * as well as their corresponding Progress Step classes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class SequentialStepFormManager {

	/**
	 * a simplified URL with no form related parameters
	 * that will be used to build the form's redirect URLs
	 *
	 * @var string $base_url
	 */
	private $base_url = '';

	/**
	 * the key used for the URL param that denotes the current form step
	 * defaults to 'ee-form-step'
	 *
	 * @var string $form_step_url_key
	 */
	private $form_step_url_key = '';

	/**
	 * @var string $default_form_step
	 */
	private $default_form_step = '';

	/**
	 * @var string $form_action
	 */
	private $form_action;

	/**
	 * value of one of the string constant above
	 *
	 * @var string $form_config
	 */
	private $form_config;

	/**
	 * @var string $progress_step_style
	 */
	private $progress_step_style = '';

	/**
	 * @var EE_Request $request
	 */
	private $request;

	/**
	 * @var Collection $form_steps
	 */
	protected $form_steps;

	/**
	 * @var ProgressStepManager $progress_step_manager
	 */
	protected $progress_step_manager;



	/**
	 * @return Collection|null
	 */
	abstract protected function getFormStepsCollection();



	/**
	 * StepsManager constructor
	 *
	 * @param string     $base_url
	 * @param string     $default_form_step
	 * @param string     $form_action
	 * @param string     $form_config
	 * @param EE_Request $request
	 * @param string     $progress_step_style
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
	 */
	public function __construct(
		$base_url,
		$default_form_step,
		$form_action = '',
		$form_config = FormHandler::ADD_FORM_TAGS_AND_SUBMIT,
		$progress_step_style = 'number_bubbles',
		EE_Request $request
	) {
		$this->setBaseUrl( $base_url );
		$this->setDefaultFormStep( $default_form_step );
		$this->setFormAction( $form_action );
		$this->setFormConfig( $form_config );
		$this->setProgressStepStyle( $progress_step_style );
		$this->request = $request;
	}



	/**
	 * @return string
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	public function baseUrl() {
		if ( strpos( $this->base_url, $this->getCurrentStep()->slug() ) === false ) {
			add_query_arg(
				array( $this->form_step_url_key => $this->getCurrentStep()->slug() ),
				$this->base_url
			);
		}
		return $this->base_url;
	}



	/**
	 * @param string $base_url
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
	 */
	protected function setBaseUrl( $base_url ) {
		if ( ! is_string( $base_url ) ) {
			throw new InvalidDataTypeException( '$base_url', $base_url, 'string' );
		}
		if ( empty( $base_url ) ) {
			throw new InvalidArgumentException(
				__( 'The base URL can not be an empty string.', 'event_espresso' )
			);
		}
		$this->base_url = $base_url;
	}



	/**
	 * @return string
	 * @throws InvalidDataTypeException
	 */
	public function formStepUrlKey() {
		if ( empty( $this->form_step_url_key ) ) {
			$this->setFormStepUrlKey();
		}
		return $this->form_step_url_key;
	}



	/**
	 * @param string $form_step_url_key
	 * @throws InvalidDataTypeException
	 */
	public function setFormStepUrlKey( $form_step_url_key = 'ee-form-step' ) {
		if ( ! is_string( $form_step_url_key ) ) {
			throw new InvalidDataTypeException( '$form_step_key', $form_step_url_key, 'string' );
		}
		$this->form_step_url_key = ! empty( $form_step_url_key ) ? $form_step_url_key : 'ee-form-step';
	}



	/**
	 * @return string
	 */
	public function defaultFormStep() {
		return $this->default_form_step;
	}



	/**
	 * @param $default_form_step
	 * @throws InvalidDataTypeException
	 */
	protected function setDefaultFormStep( $default_form_step ) {
		if ( ! is_string( $default_form_step ) ) {
			throw new InvalidDataTypeException( '$default_form_step', $default_form_step, 'string' );
		}
		$this->default_form_step = $default_form_step;
	}



	/**
	 * @return void
	 * @throws \EventEspresso\core\exceptions\InvalidIdentifierException
	 * @throws InvalidDataTypeException
	 */
	protected function setCurrentStepFromRequest() {
		$current_step_slug = $this->request()->get( $this->formStepUrlKey(), $this->defaultFormStep() );
		if ( ! $this->form_steps->setCurrent( $current_step_slug ) ) {
			throw new InvalidIdentifierException(
				$current_step_slug,
				$this->defaultFormStep(),
				$message = sprintf(
					__(
						'The "%1$s" form step could not be set.',
						'event_espresso'
					),
					$current_step_slug
				)
			);
		}
	}



	/**
	 * @return SequentialStepFormInterface
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	public function getCurrentStep() {
		if ( ! $this->form_steps->current() instanceof SequentialStepForm ) {
			throw new InvalidFormHandlerException( $this->form_steps->current() );
		}
		return $this->form_steps->current();
	}



	/**
	 * @return string
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	public function formAction() {
		if ( ! is_string( $this->form_action ) || empty( $this->form_action ) ) {
			$this->form_action = $this->baseUrl();
		}
		return $this->form_action;
	}



	/**
	 * @param string $form_action
	 * @throws InvalidDataTypeException
	 */
	public function setFormAction( $form_action ) {
		if ( ! is_string( $form_action ) ) {
			throw new InvalidDataTypeException( '$form_action', $form_action, 'string' );
		}
		$this->form_action = $form_action;
	}



	/**
	 * @param array $form_action_args
	 * @throws InvalidDataTypeException
	 */
	public function addFormActionArgs( $form_action_args = array() ) {
		if ( ! is_array( $form_action_args ) ) {
			throw new InvalidDataTypeException( '$form_action_args', $form_action_args, 'array' );
		}
		$form_action_args = ! empty( $form_action_args )
			? $form_action_args
			: array( $this->formStepUrlKey() => $this->form_steps->current()->slug() );
		$this->getCurrentStep()->setFormAction(
			add_query_arg( $form_action_args, $this->formAction() )
		);
		$this->form_action = $this->getCurrentStep()->formAction();
	}



	/**
	 * @return string
	 */
	public function formConfig() {
		return $this->form_config;
	}



	/**
	 * @param string $form_config
	 */
	public function setFormConfig( $form_config ) {
		$this->form_config = $form_config;
	}



	/**
	 * @return string
	 */
	public function progressStepStyle() {
		return $this->progress_step_style;
	}



	/**
	 * @param string $progress_step_style
	 */
	public function setProgressStepStyle( $progress_step_style ) {
		$this->progress_step_style = $progress_step_style;
	}


	/**
	 * @return EE_Request
	 */
	public function request() {
		return $this->request;
	}



	/**
	 * @return Collection|null
	 * @throws InvalidInterfaceException
	 */
	protected function getProgressStepsCollection() {
		static $collection = null;
		if ( ! $collection instanceof ProgressStepCollection ) {
			$collection = new ProgressStepCollection();
		}
		return $collection;
	}



	/**
	 * @param Collection $progress_steps_collection
	 * @return ProgressStepManager
	 * @throws InvalidEntityException
	 * @throws InvalidDataTypeException
	 * @throws InvalidClassException
	 * @throws InvalidInterfaceException
	 */
	protected function generateProgressSteps( Collection $progress_steps_collection ) {
		$current_step = $this->getCurrentStep();
		/** @var SequentialStepForm $form_step */
		foreach ( $this->form_steps as $form_step ) {
			// is this step active ?
			if ( ! $form_step->initialize() ) {
				continue;
			}
			$progress_steps_collection->add(
				new ProgressStep(
					$form_step->order(),
					$form_step->slug(),
					$form_step->slug(),
					$form_step->formName()
				),
				$form_step->slug()
			);
		}
		// set collection pointer back to current step
		$this->form_steps->setCurrentUsingObject( $current_step );
		return new ProgressStepManager(
			$this->progressStepStyle(),
			$this->defaultFormStep(),
			$this->formStepUrlKey(),
			$progress_steps_collection
		);
	}



	/**
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidEntityException
	 * @throws InvalidIdentifierException
	 * @throws InvalidInterfaceException
	 * @throws InvalidArgumentException
	 */
	public function buildForm() {
		$this->buildCurrentStepFormForDisplay();
	}



	/**
	 * @param array $form_data
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidEntityException
	 * @throws InvalidIdentifierException
	 * @throws InvalidInterfaceException
	 * @throws InvalidArgumentException
	 */
	public function processForm( $form_data = array() ) {
		$this->buildCurrentStepFormForProcessing();
		$this->processCurrentStepForm( $form_data );
	}



	/**
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidEntityException
	 * @throws InvalidInterfaceException
	 * @throws InvalidIdentifierException
	 * @throws InvalidArgumentException
	 */
	public function buildCurrentStepFormForDisplay() {
		$form_step = $this->buildCurrentStepForm();
		// no displayable content ? then skip straight to processing
		if ( ! $form_step->displayable() ) {
			$this->addFormActionArgs();
			$form_step->setFormAction( $this->formAction() );
			wp_safe_redirect( $form_step->formAction() );
		}
	}



	/**
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidEntityException
	 * @throws InvalidInterfaceException
	 * @throws InvalidIdentifierException
	 * @throws InvalidArgumentException
	 */
	public function buildCurrentStepFormForProcessing() {
		$this->buildCurrentStepForm( false );
	}



	/**
	 * @param bool $for_display
	 * @return \EventEspresso\core\libraries\form_sections\form_handlers\SequentialStepFormInterface
	 * @throws InvalidIdentifierException
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidEntityException
	 * @throws InvalidInterfaceException
	 * @throws InvalidArgumentException
	 */
	private function buildCurrentStepForm( $for_display = true ) {
		$this->form_steps = $this->getFormStepsCollection();
		$this->setCurrentStepFromRequest();
		$form_step = $this->getCurrentStep();
		if ( $form_step->submitBtnText() === __( 'Submit', 'event_espresso' ) ) {
			$form_step->setSubmitBtnText( __( 'Next Step', 'event_espresso' ) );
		}
		if ( $for_display && $form_step->displayable() ) {
			$this->progress_step_manager = $this->generateProgressSteps(
				$this->getProgressStepsCollection()
			);
			$this->progress_step_manager->setCurrentStep(
				$form_step->slug()
			);
			// mark all previous progress steps as completed
			$this->progress_step_manager->setPreviousStepsCompleted();
			$this->progress_step_manager->enqueueStylesAndScripts();
			$this->addFormActionArgs();
			$form_step->setFormAction( $this->formAction() );

		} else {
			$form_step->setRedirectUrl( $this->baseUrl() );
			$form_step->addRedirectArgs(
				array( $this->formStepUrlKey() => $this->form_steps->current()->slug() )
			);
		}
		$form_step->generate();
		if ( $for_display ) {
			$form_step->enqueueStylesAndScripts();
		}
		return $form_step;
	}



	/**
	 * @param bool $return_as_string
	 * @return string
	 */
	public function displayProgressSteps( $return_as_string = true ) {
		$progress_steps = apply_filters(
			'FHEE__EventEspresso_core_libraries_form_sections_form_handlers_SequentialStepFormManager__displayProgressSteps__before_steps',
			''
		);
		$progress_steps .= $this->progress_step_manager->displaySteps();
		$progress_steps .= apply_filters(
			'FHEE__EventEspresso_core_libraries_form_sections_form_handlers_SequentialStepFormManager__displayProgressSteps__after_steps',
			''
		);
		if ( $return_as_string ) {
			return $progress_steps;
		}
		echo $progress_steps;
		return '';
	}



	/**
	 * @param bool $return_as_string
	 * @return string
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	public function displayCurrentStepForm( $return_as_string = true ) {
		if ( $return_as_string ) {
			return $this->getCurrentStep()->display();
		}
		echo $this->getCurrentStep()->display();
		return '';
	}



	/**
	 * @param array $form_data
	 * @return bool
	 * @throws InvalidArgumentException
	 * @throws InvalidDataTypeException
	 */
	public function processCurrentStepForm( $form_data = array() ) {
		// grab instance of current step because after calling next() below,
		// any calls to getCurrentStep() will return the "next" step because we advanced
		$current_step = $this->getCurrentStep();
		try {
			// form processing should either throw exceptions or return true
			$current_step->process( $form_data );
		} catch ( Exception $e ) {
			// something went wrong, so...
			// if WP_DEBUG === true, display the Exception and stack trace right now
			new ExceptionStackTraceDisplay( $e );
			// else convert the Exception to an EE_Error
			EE_Error::add_error( $e->getMessage(), __FILE__, __FUNCTION__, __LINE__ );
			// prevent redirect to next step or other if exception was thrown
			if (
				$current_step->redirectTo() === SequentialStepForm::REDIRECT_TO_NEXT_STEP
				|| $current_step->redirectTo() === SequentialStepForm::REDIRECT_TO_OTHER
			) {
				$current_step->setRedirectTo( SequentialStepForm::REDIRECT_TO_CURRENT_STEP );
			}
		}
		// save notices to a transient so that when we redirect back
		// to the display portion for this step
		// those notices can be displayed
		EE_Error::get_notices( false, true );
		$this->redirectForm( $current_step );
	}



	/**
	 * handles where to go to next
	 *
	 * @param \EventEspresso\core\libraries\form_sections\form_handlers\SequentialStepFormInterface $current_step
	 */
	public function redirectForm( SequentialStepFormInterface $current_step ) {
		$redirect_step = $current_step;
		switch( $current_step->redirectTo() ) {

			case SequentialStepForm::REDIRECT_TO_OTHER :
				// going somewhere else, so just check out now
				wp_safe_redirect( $redirect_step->redirectUrl() );
				exit();
				break;

			case SequentialStepForm::REDIRECT_TO_PREV_STEP :
				$redirect_step = $this->form_steps->previous();
				break;

			case SequentialStepForm::REDIRECT_TO_NEXT_STEP :
				$this->form_steps->next();
				if ( $this->form_steps->valid() ) {
					$redirect_step = $this->form_steps->current();
				}
				break;

			case SequentialStepForm::REDIRECT_TO_CURRENT_STEP :
			default :
				// $redirect_step is already set

		}
		$current_step->setRedirectUrl( $this->baseUrl() );
		$current_step->addRedirectArgs(
			// use the slug for whatever step we are redirecting too
			array( $this->formStepUrlKey() => $redirect_step->slug() )
		);
		wp_safe_redirect( $current_step->redirectUrl() );
		exit();
	}


}
// End of file SequentialStepFormManager.php
// Location: /SequentialStepFormManager.php