<?php
namespace EventEspresso\core\libraries\form_sections;

use EE_Request;
use EventEspresso\Core\Exceptions\BaseException;
use EventEspresso\Core\Exceptions\InvalidClassException;
use EventEspresso\Core\Exceptions\InvalidDataTypeException;
use EventEspresso\Core\Exceptions\InvalidEntityException;
use EventEspresso\Core\Exceptions\InvalidIdentifierException;
use EventEspresso\Core\Exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\progress_steps\ProgressStep;
use EventEspresso\core\services\progress_steps\ProgressStepCollection;
use EventEspresso\core\services\progress_steps\ProgressStepManager;
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
	 * @param string $base_url
	 * @param string      $default_form_step
	 * @param string      $progress_step_style
	 * @param EE_Request $request
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
	 */
	public function __construct( $base_url, $default_form_step, $progress_step_style, EE_Request $request ) {
		$this->setBaseUrl( $base_url );
		$this->setDefaultFormStep( $default_form_step );
		$this->setProgressStepStyle( $progress_step_style );
		$this->request = $request;
		// set the base URL that the redirect URL will be built from
		$this->setBaseUrl( $this->defaultFormStep() );
	}



	/**
	 * @return string
	 */
	public function baseUrl() {
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
	 */
	public function formStepUrlKey() {
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
	 * @return string
	 * @throws BaseException
	 */
	protected function setCurrentStepFromRequest() {
		$current_step = $this->request()->get( $this->formStepUrlKey(), $this->defaultFormStep() );
		if ( ! $this->form_steps->setCurrent( $current_step ) ) {
			throw new BaseException( 'Form Step could not be set' );
		}
		return $current_step;
	}



	/**
	 * @return SequentialStepFormInterface
	 */
	public function getCurrentStep() {
		return $this->form_steps->current();
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
	protected function GenerateProgressSteps( Collection $progress_steps_collection ) {
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
	 * @throws InvalidInterfaceException
	 * @throws InvalidIdentifierException
	 * @throws BaseException
	 * @throws \InvalidArgumentException
	 */
	public function buildCurrentStepFormForDisplay() {
		$this->buildCurrentStepForm();
	}



	/**
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidEntityException
	 * @throws InvalidInterfaceException
	 * @throws InvalidIdentifierException
	 * @throws BaseException
	 * @throws \InvalidArgumentException
	 */
	public function buildCurrentStepFormForProcessing() {
		$this->buildCurrentStepForm( false );
	}



	/**
	 * @param bool $for_display
	 * @throws BaseException
	 * @throws InvalidIdentifierException
	 * @throws InvalidClassException
	 * @throws InvalidDataTypeException
	 * @throws InvalidEntityException
	 * @throws InvalidInterfaceException
	 */
	private function buildCurrentStepForm( $for_display = true ) {
		$this->form_steps = $this->getFormStepsCollection();
		if ( $for_display ) {
			$this->progress_step_manager = $this->GenerateProgressSteps(
				$this->getProgressStepsCollection()
			);
			$this->progress_step_manager->setCurrentStep(
				$this->setCurrentStepFromRequest()
			);
			$this->progress_step_manager->enqueueStylesAndScripts();
		}
		$form_step = $this->getCurrentStep();
		$form_step->generate();
		// \EEH_Debug_Tools::printr( $form_step, '$form_step', __FILE__, __LINE__ );
		if ( $for_display ) {
			$form_step->enqueueStylesAndScripts();
		}
	}



	/**
	 * @param bool $return_as_string
	 * @return string
	 */
	public function displayProgressSteps( $return_as_string = true ) {
		if ( $return_as_string ) {
			return $this->progress_step_manager->displaySteps();
		}
		echo $this->progress_step_manager->displaySteps();
		return '';
	}



	/**
	 * @param array $form_data
	 * @return bool
	 */
	public function processCurrentStepForm( $form_data = array() ) {
		$this->getCurrentStep()->process( $form_data );
	}



	/**
	 * @param bool $return_as_string
	 * @return string
	 */
	public function displayCurrentStepForm( $return_as_string = true ) {
		if ( $return_as_string ) {
			return $this->getCurrentStep()->display();
		}
		echo $this->getCurrentStep()->display();
		return '';
	}


}
// End of file SequentialStepFormManager.php
// Location: /SequentialStepFormManager.php